var SceneLoading = BaseScene.extend({
    ctor: function () {
        this._super();
        //variables
        this.numFilePNG = 0;
        this._numberOfLoadedSprites = 0;
        this._status = 0;
        this._imgProgessBar = null;
        this.listFilePNG = [];
        return true;
    },
    initGui: function () {
        if(this.inited){
            return false;
        }
        this.inited = true;
        this.createBackground();
        //add label
        this.createLabelLoading();
        //load global var before loadTextures
        this.loadGlobalResource();
    },
    loadGlobalResource: function () {
        this.listFilePNG = [];
        for(var x in res) {
            if(res[x].indexOf("png") >= 0) {
                this.listFilePNG.push(res[x]);
            }
        }
    },
    createLabelLoading: function () {
        this._lbLoading = Utility.getLabel(res.FONT_MARKER_FELT, 72);
        this.addChild(this._lbLoading);
        this._lbLoading.attr({
            x: GV.WIN_SIZE.width >>1,
            y: GV.WIN_SIZE.height >>1
        });
    },
    createBackground: function () {
        this._sprBg = new cc.Sprite(res.bg_loading_png);
        this.addChild(this._sprBg);
        this._sprBg.attr({
            x: GV.WIN_SIZE.width >> 1,
            y: GV.WIN_SIZE.height >> 1
        });
        var bgSize = this._sprBg.getContentSize();
        var delta_ratio_x = GV.WIN_SIZE.width / bgSize.width;
        var delta_ratio_y = GV.WIN_SIZE.height / bgSize.height;
        this._sprBg.setScale(delta_ratio_x, delta_ratio_y);
    },

    /**
     *load texture array by String
     * @param {Array} textureArr
     */
    loadTextures: function(textureArr){
        var len = textureArr.length;
        this.numFilePNG = len;
        var texCache = cc.textureCache;
        for(var i = 0; i < len; ++i){
            texCache.addImageAsync(textureArr[i], this.loadingCallBack, this);
        }
    },
    loadingCallBack:function () {
        ++this._numberOfLoadedSprites;
        this._lbLoading.setString(((this._numberOfLoadedSprites / this.numFilePNG) * 100).toFixed(1) + '%');
        if (this._numberOfLoadedSprites == this.numFilePNG) {
            this.loadTextureDone();
        }
    },
    loadTextureDone: function () {
        this.loadPlistTexture();
        this._lbLoading.runAction(Utility.getActionLoading(this._lbLoading, "LOADING"));
        this.loadBaseContent();
        this.runAction(cc.sequence(
            cc.delayTime(1),
            cc.callFunc(function () {
                GV.SCENE_MGR.viewSceneById(GV.SCENE_IDS.LOBBY);
            })
        ));
    },
    loadPlistTexture: function () {
        for(var i in res) {
            if(res[i].indexOf("plist") >= 0) {
                cc.spriteFrameCache.addSpriteFrames(res[i]);
            }
        }
    },
    loadBaseContent: function () {
        //cc.Texture2D.setDefaultAlphaPixelFormat(cc.Texture2D.PIXEL_FORMAT_RGBA8888);
        var shader = cc.GLProgram.create("res/base_content/shaderGray.vsh", "res/base_content/shaderGray.fsh");
        shader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
        shader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
        shader.link();
        shader.updateUniforms();
        cc.shaderCache.addProgram(shader,"kShaderGrayProgram");
    },
    onEnter:function () {
        this._super();
        this.initGui();
        this.loadTextures(this.listFilePNG);
    },
    onEnterTransitionDidFinish: function () {
        this._super();
    }
});



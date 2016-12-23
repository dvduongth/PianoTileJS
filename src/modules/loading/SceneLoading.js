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
        this._sprBg = new cc.Scale9Sprite(res.bg_loading_png);
        this.addChild(this._sprBg);
        this._sprBg.attr({
            x: GV.WIN_SIZE.width >> 1,
            y: GV.WIN_SIZE.height >> 1
        });
        this._sprBg.setContentSize(GV.WIN_SIZE);
        //add label
        this._lbLoading = Utility.getLabel(res.FONT_MARKER_FELT, 72);
        this.addChild(this._lbLoading);
        this._lbLoading.attr({
            x: GV.WIN_SIZE.width >>1,
            y: GV.WIN_SIZE.height >>1
        });
        //load global var
        this.listFilePNG = [];
        for(var x in res) {
            if(res[x].indexOf("png") >= 0) {
                this.listFilePNG.push(res[x]);
            }
        }
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
    onEnter:function () {
        this._super();
        this.initGui();
        this.loadTextures(this.listFilePNG);
    },
    onEnterTransitionDidFinish: function () {
        this._super();
    }
});



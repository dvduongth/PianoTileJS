var SceneLoading = BaseScene.extend({
    ctor: function () {
        this._super();
        this.initGui();
        this.loadPlistTexture();
        return true;
    },
    initGui: function () {
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
    },
    loadPlistTexture: function () {
        cc.spriteFrameCache.addSpriteFrames(res.plist_1);
    },
    onEnter:function () {
        this._super();
        this._lbLoading.runAction(Utility.getActionLoading(this._lbLoading, "LOADING"));
    },
    onEnterTransitionDidFinish: function () {
        this._super();
        this.runAction(cc.sequence(
            cc.delayTime(1),
            cc.callFunc(function () {
                GV.SCENE_MGR.viewSceneById(GV.SCENE_IDS.LOBBY);
            })
        ));
    }
});



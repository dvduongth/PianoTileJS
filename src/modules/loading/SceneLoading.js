var SceneLoading = BaseScene.extend({
    ctor: function () {
        this._super();
        this.initGui();
        this.loadPlistTexture();
        return true;
    },
    initGui: function () {
        this._sprBg = new cc.Sprite(res.bg_loading_png);
        this.addChild(this._sprBg);
        this._sprBg.attr({
            x: GV.WIN_SIZE.width >> 1,
            y: GV.WIN_SIZE.height >> 1,
            width: GV.WIN_SIZE.width,
            height: GV.WIN_SIZE.height
        });
    },
    loadPlistTexture: function () {
        cc.spriteFrameCache.addSpriteFrames(res.plist_1);
    },
    onEnter:function () {
        this._super();
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



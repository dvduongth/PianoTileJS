var SceneLobby = BaseScene.extend({
    ctor: function () {
        this._super();
        this.initGui();
        return true;
    },
    initGui: function () {
        this._sprBg = new cc.Sprite(res.bg_lobby_png);
        this.addChild(this._sprBg);
        this._sprBg.attr({
            x: GV.WIN_SIZE.width >> 1,
            y: GV.WIN_SIZE.height >> 1,
            width: GV.WIN_SIZE.width,
            height: GV.WIN_SIZE.height
        });
    },
    onEnter:function () {
        this._super();
    },
    onEnterTransitionDidFinish: function () {
        this._super();
        this.runAction(cc.sequence(
            cc.delayTime(1),
            cc.callFunc(function () {
                GV.SCENE_MGR.viewSceneById(GV.SCENE_IDS.BATTLE);
            })
        ));
    }
});


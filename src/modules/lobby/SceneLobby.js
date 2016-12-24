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
            y: GV.WIN_SIZE.height >> 1
        });
        var bgSize = this._sprBg.getContentSize();
        var delta_ratio_x = GV.WIN_SIZE.width / bgSize.width;
        var delta_ratio_y = GV.WIN_SIZE.height / bgSize.height;
        this._sprBg.setScale(delta_ratio_x, delta_ratio_y);
        //add label
        this._lbText = Utility.getLabel(res.FONT_MARKER_FELT, 72);
        this.addChild(this._lbText);
        this._lbText.attr({
            x: GV.WIN_SIZE.width >>1,
            y: GV.WIN_SIZE.height >>1
        });
        this._lbText.setString("Scene Lobby Here");
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


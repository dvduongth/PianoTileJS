var GuiPoppLoading = BaseGUI.extend({
    _className: "GuiPoppLoading",

    ctor: function () {
        this._super();
        this.initGui();
    },

    initGui: function () {
        //background
        this._imgBg = new cc.Sprite(res.tile_music_undefined_png);
        this.addChild(this._imgBg);

        //sync
        this.syncAllChildren();
        //update view
        this._rootNode.visible = false;
        this._rootNode.retain();
        this._rootNode.setPosition(GV.WIN_SIZE.width >> 1, GV.WIN_SIZE.height >> 1);
    },
    showGui: function (eff) {
        if(!this.isShowGui()) {
            GV.SCENE_MGR.showFog();
            this._super(eff);
        }
    },
    hideGui: function () {
        if(this.isShowGui()) {
            GV.SCENE_MGR.hideFog();
            this._super();
        }
    },
    isShowGui: function () {
        return this._rootNode.visible;
    }
});

var GuiPopupLoading = BaseGUI.extend({
    _className: "GuiPopupLoading",

    ctor: function () {
        this._super();
        this.initGui();
    },

    initGui: function () {
        //background
        this._sprBg = new cc.Scale9Sprite(res.tile_white_png);
        this.addChild(this._sprBg);

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

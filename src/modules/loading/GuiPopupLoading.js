var GuiPopupLoading = BaseGUI.extend({
    _className: "GuiPopupLoading",

    ctor: function () {
        this._super();
        this.initGui();
    },

    initGui: function () {
        //background
        this.createBackground();
        this.createLabelLoading();

        //sync
        this.syncAllChildren();
        //update view
        this._rootNode.visible = false;
        this._rootNode.retain();
        this._rootNode.setPosition(GV.WIN_SIZE.width >> 1, GV.WIN_SIZE.height >> 1);
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

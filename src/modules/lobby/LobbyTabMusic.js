var LobbyTabMusic = BaseGUI.extend({
    _className: "LobbyTabMusic",

    ctor: function (size) {
        this._super();
        //variables
        if(size) {
            this.BACK_GROUND_SIZE = size;
        }else {
            this.BACK_GROUND_SIZE = cc.size(GV.WIN_SIZE.width, GV.WIN_SIZE.height);
        }
        this.initGui();
    },

    initGui: function () {
        this.createBackground();
        this.createLabelTest();
        //update view
        this.syncAllChildren();
    },
    createBackground: function () {
        //background
        this._sprBg = new cc.Sprite(res.opening_common_play_bg3_png);
        this.addChild(this._sprBg, GV.ZORDER_LEVEL.BG);
        this._sprBg.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0,
            y: 0
        });
        var bgSize = this._sprBg.getContentSize();
        var delta_ratio_x = this.BACK_GROUND_SIZE.width / bgSize.width;
        var delta_ratio_y = this.BACK_GROUND_SIZE.height / bgSize.height;
        this._sprBg.setScale(delta_ratio_x, delta_ratio_y);
    },
    createLabelTest: function () {
        this._lbText = Utility.getLabel(res.FONT_MARKER_FELT, 72);
        this.addChild(this._lbText);
        this._lbText.attr({
            x: 0,
            y: 0
        });
        this._lbText.setString("Lobby Tab Music");
    },
    /**
     * set info
     * */
    setInfo: function (data) {
        if (!data) {
            cc.error("set info lobby tab music with null data");
            return null;
        }
        this.info = data;
    },
    onTouchUIEndEvent: function (sender) {
        //switch (sender) {
        //
        //}
    }
});

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
        this.tableViewMusicSize = cc.size(this.BACK_GROUND_SIZE.width * 0.98, this.BACK_GROUND_SIZE.height);
        this.initGui();
    },

    initGui: function () {
        this.createBackground();
        this.createListMusicView();
        //update view
        this.syncAllChildren();
    },
    createListMusicView: function () {
        if (!this.musicTableView) {
            this.musicTableView = new MusicTableView(1, this.tableViewMusicSize.width, this.tableViewMusicSize.height, cc.SCROLLVIEW_DIRECTION_VERTICAL);
            this.musicTableView.setClassName("musicTableView");
            this.addChild(this.musicTableView, GV.ZORDER_LEVEL.GUI);
            this.musicTableView.attr({
                anchorX: 0,
                anchorY: 0,
                x: (this.BACK_GROUND_SIZE.width - this.tableViewMusicSize.width) * 0.5,
                y: 0
            });
        }
        var arr = [];
        for (var i = 0; i < 10; ++i) {
            arr.push(i +"");
        }
        this.musicTableView.setElementList(arr);
    },
    createBackground: function () {
        //background
        this._sprBg = new cc.Sprite(res.opening_common_play_bg3_png);
        this.addChild(this._sprBg, GV.ZORDER_LEVEL.BG);
        this._sprBg.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });
        var bgSize = this._sprBg.getContentSize();
        var delta_ratio_x = this.BACK_GROUND_SIZE.width / bgSize.width;
        var delta_ratio_y = this.BACK_GROUND_SIZE.height / bgSize.height;
        this._sprBg.setScale(delta_ratio_x, delta_ratio_y);
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

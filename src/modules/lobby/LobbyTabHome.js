var LobbyTabHome = BaseGUI.extend({
    _className: "LobbyTabHome",
    ctor: function (size) {
        this._super();
        //variables
        if (size) {
            this.BACK_GROUND_SIZE = size;
        } else {
            this.BACK_GROUND_SIZE = cc.size(GV.WIN_SIZE.width, GV.WIN_SIZE.height);
        }
        this.nodeInfoSize = cc.size(this.BACK_GROUND_SIZE.width * 0.98, this.BACK_GROUND_SIZE.height * 0.5);
        this.tableViewMusicSize = cc.size(this.BACK_GROUND_SIZE.width * 0.98, this.BACK_GROUND_SIZE.height * 0.5);
        this.iconCDSize = this.nodeInfoSize.width * 0.45;
        this.sizeButtonPlay = cc.size(this.nodeInfoSize.width * 2 / 5, this.nodeInfoSize.height / 8);
        this.initGui();
    },

    initGui: function () {
        //this.createBackground();
        this.createMusicNodeInfo();
        this.createListMusicView();
        //update view
        this.syncAllChildren();
    },
    createMusicNodeInfo: function () {
        this.createBackgroundNodeInfo();
        this.createIconCD();
        this.createButtonPlay();
        this.createLabelMusicTitle();
    },
    createIconCD: function () {
        this._sprIconCD = new cc.Sprite(res.opening_cd_7_png);
        this.addChild(this._sprIconCD, GV.ZORDER_LEVEL.BG);
        this._sprIconCD.setScale(this.iconCDSize / this._sprIconCD.width);
        this._sprIconCD.attr({
            anchorX: 0.5,
            anchorY: 1,
            x: this.BACK_GROUND_SIZE.width >> 1,
            y: this.BACK_GROUND_SIZE.height - 20
        });
    },
    createLabelMusicTitle: function () {
        this._lbMusicTitle = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 48, Utility.getColorByName("white"), true);
        this.addChild(this._lbMusicTitle, GV.ZORDER_LEVEL.GUI);
        var newY = (
                this._btnPlay.y + (1 - this._btnPlay.anchorY) * this._btnPlay["contentSize"].height
                + this._sprIconCD.y - this._sprIconCD.height * this._sprIconCD.anchorY * this._sprIconCD.getScaleX()
            ) * 0.5;
        this._lbMusicTitle.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.BACK_GROUND_SIZE.width >> 1,
            y: newY
        });
        this._lbMusicTitle.setString("Ngay Tet Que Em");
    },
    createBackgroundNodeInfo: function () {
        this._sprBgNodeInfo = new cc.Sprite(res.banner_first_charge_png);
        this.addChild(this._sprBgNodeInfo, GV.ZORDER_LEVEL.BG);

        var deltaRatioWidth = this.nodeInfoSize.width / this._sprBgNodeInfo.width;
        var deltaRatioHeight = this.nodeInfoSize.height / this._sprBgNodeInfo.height;
        this._sprBgNodeInfo.setScale(deltaRatioWidth, deltaRatioHeight);
        this._sprBgNodeInfo.attr({
            anchorX: 0.5,
            anchorY: 1,
            x: this.BACK_GROUND_SIZE.width >> 1,
            y: this.BACK_GROUND_SIZE.height
        });
    },
    createButtonPlay: function () {
        this._btnPlay = Utility.getButton("_btnPlay", this.sizeButtonPlay);
        this.addChild(this._btnPlay, GV.ZORDER_LEVEL.GUI);
        this._btnPlay.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: this.BACK_GROUND_SIZE.width >> 1,
            y: 20 + this.tableViewMusicSize.height
        });
        //bg icon
        this._bgButtonPlay = new cc.Sprite(res.bg_red_bag_open_png);
        this._btnPlay.addChild(this._bgButtonPlay, GV.ZORDER_LEVEL.BG);
        this._bgButtonPlay.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });
        var ratioWidth = this.sizeButtonPlay.width / this._bgButtonPlay.width;
        var ratioHeight = this.sizeButtonPlay.height / this._bgButtonPlay.height;
        this._bgButtonPlay.setScale(ratioWidth, ratioHeight);
        //text
        this._lbButtonPlay = Utility.getLabel("Helvetica", 24, Utility.getColorByName("white"), true);
        this._lbButtonPlay.setString("CHƠI NGAY");
        this._btnPlay.addChild(this._lbButtonPlay, GV.ZORDER_LEVEL.GUI);
        this._lbButtonPlay.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0.5 * this.sizeButtonPlay.width,
            y: 0.5 * this.sizeButtonPlay.height
        });
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
            arr.push(i + "");
        }
        this.musicTableView.setElementList(arr);
    },
    createBackground: function () {
        //background
        this._sprBg = new cc.Sprite(res.xmas_title_bg_png);
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
            cc.error("set info lobby tab home with null data");
            return null;
        }
        this.info = data;
    },
    onTouchUIEndEvent: function (sender) {
        switch (sender) {
            case this._btnPlay:
                GV.MODULE_MGR.startGame();
                break;
        }
    }
});

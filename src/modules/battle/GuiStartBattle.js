var GuiStartBattle = BaseGUI.extend({
    _className: "GuiStartBattle",

    ctor: function () {
        this._super();
        //variables
        this.BACK_GROUND_SIZE = {
            width: GV.WIN_SIZE.width,
            height: GV.WIN_SIZE.height * 0.25
        };
        this.marginLeftIcon = 30;
        this.marginLeftText = 100;
        this.initGui();
    },

    initGui: function () {
        this.createBackground();
        this.createNoticeTitleInfo();
        this.createMusicTitleInfo();
        this.createBestScoreInfo();

        //update view
        this._rootNode = this;
        this._rootNode.visible = false;
        this._rootNode.retain();
    },
    getGuiHeight: function () {
        return this.BACK_GROUND_SIZE.height;
    },
    createLeftIcon: function (url, y) {
        var icon = new cc.Sprite(url);
        this.addChild(icon);
        icon.attr({
            anchorX: 0,
            anchorY: 0,
            x: this.marginLeftIcon - GV.WIN_SIZE.width * 0.5,
            y: y
        });
        return icon;
    },
    createBackground: function () {
        //background
        this._sprBg = new cc.Sprite(res.team_music_bg_white_png);
        this.addChild(this._sprBg);
        this._sprBg.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: 0,
            y: 0
        });
        var bgSize = this._sprBg.getContentSize();
        var delta_ratio_x = 1.2 * this.BACK_GROUND_SIZE.width / bgSize.width;
        var delta_ratio_y = this.BACK_GROUND_SIZE.height / bgSize.height;
        this._sprBg.setScale(delta_ratio_x, delta_ratio_y);
    },
    /**
     * notice title
     * */
    createNoticeTitleInfo: function () {
        this.createNoticeIcon();
        this.createNoticeText();
    },
    createNoticeIcon: function () {
        this._sprNoticeIcon = this.createLeftIcon("#icon_band_loadingsuc_ubody.png", this.BACK_GROUND_SIZE.height * 5 / 7);
    },
    createNoticeText: function () {
        //notice text
        this._lbNoticeTitle = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 36,Utility.getColorByName("blue"),true);
        this.addChild(this._lbNoticeTitle);
        var bgSize = this.BACK_GROUND_SIZE;
        this._lbNoticeTitle.attr({
            anchorX: 0,
            anchorY: 0,
            x: this.marginLeftText - GV.WIN_SIZE.width * 0.5,
            y: bgSize.height * 5 /7
        });
        this.setNoticeTitleText("Best With Headphones");
    },
    /**
     * music title
     * */
    createMusicTitleInfo: function () {
        this.createMusicTileIcon();
        this.createMusicTitleText();
    },
    createMusicTileIcon: function () {
        this._sprMusicTileIcon = this.createLeftIcon("#icon_band_loadingsuc_ubody.png", this.BACK_GROUND_SIZE.height * 3 / 7);
    },
    createMusicTitleText: function () {
        //music title text
        this._lbMusiceTitle = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 36,Utility.getColorByName("black"),true);
        this.addChild(this._lbMusiceTitle);
        this._lbMusiceTitle.attr({
            anchorX: 0,
            anchorY: 0,
            x: this.marginLeftText - GV.WIN_SIZE.width * 0.5,
            y: this.BACK_GROUND_SIZE.height * 3 /7
        });
        this.setMusicTitleText("Music: Ngay Tet Que Em");
    },
    /**
     * best score
     * */
    createBestScoreInfo: function () {
        this.createBestScoreIcon();
        this.createBestScoreText();
    },
    createBestScoreIcon: function () {
        this._sprBestScoreIcon = this.createLeftIcon("#icon_band_loadingsuc_ubody.png", this.BACK_GROUND_SIZE.height * 1 / 7);
    },
    createBestScoreText: function () {
        //best score text
        this._lbBestScore = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 36,Utility.getColorByName("black"),true);
        this.addChild(this._lbBestScore);
        this._lbBestScore.attr({
            anchorX: 0,
            anchorY: 0,
            x: this.marginLeftText - GV.WIN_SIZE.width * 0.5,
            y: this.BACK_GROUND_SIZE.height * 1 /7
        });
        this.setBestScoreText("Best Score: 0");

    },
    /**
     * set info
     * */
    setInfo: function (data) {
        if(!data) {
            cc.error("set info gui start battle with null data");
            return null;
        }
        this.info = data;
        this.noticeTitle = data["notice"];
        this.musicTitle = data["music"];
        this.bestScore = data["score"];
        if(this.noticeTitle) {
            this.setNoticeTitleText(this.noticeTitle);
        }
        if(this.musicTitle) {
            this.setMusicTitleText(this.musicTitle);
        }
        if(this.bestScore) {
            this.setBestScoreText(this.bestScore);
        }
    },
    setNoticeTitleText: function (str) {
        this._lbNoticeTitle.setString(str);
    },
    setMusicTitleText: function (str) {
        this._lbMusiceTitle.setString(str);
    },
    setBestScoreText: function (str) {
        this._lbBestScore.setString(str);
    },
    /**
     * show gui
     * */
    showGui: function (eff) {
        if(!this.isShowGui()) {
            this._rootNode.setPosition(GV.WIN_SIZE.width >> 1, 0);
            this._super(eff);
        }
    },
    /**
     * hide gui
     * */
    hideGui: function () {
        if(this.isShowGui()) {
            var time = 0.25;
            this._rootNode.runAction(cc.sequence(
                cc.moveBy(time, 0, -this.getGuiHeight()),
                cc.callFunc(function () {
                    this._rootNode.visible = false;
                }.bind(this))
            ));
        }
    },
    isShowGui: function () {
        return this._rootNode.visible;
    }
});

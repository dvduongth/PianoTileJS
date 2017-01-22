var GuiStartBattle = BaseGUI.extend({
    _className: "GuiStartBattle",

    ctor: function () {
        this._super();
        //variables
        this.BACK_GROUND_SIZE = {
            width: GV.WIN_SIZE.width,
            height: GV.WIN_SIZE.height * 0.25
        };
        this.marginLeftIcon = 20;
        this.marginLeftText = 100;
        var sz = this.BACK_GROUND_SIZE.height * 5 / 8;
        this.sizeAutoPlay = cc.size(sz,sz);
        this.sizeIcon = 60;
        this.initGui();
    },

    initGui: function () {
        this.createBackground();
        this.createNoticeTitleInfo();
        this.createMusicTitleInfo();
        this.createBestScoreInfo();
        this.createButtonAutoPlay();
        //sync all children
        this.syncAllChildren();
        //update view
        this._rootNode = this;
        this._rootNode.visible = false;
        this._rootNode.retain();
    },
    createButtonAutoPlay: function () {
        this._btnAutoPlay = Utility.getButton("_btnAutoPlay", this.sizeAutoPlay);
        this.addChild(this._btnAutoPlay, GV.ZORDER_LEVEL.GUI);
        this._btnAutoPlay.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: (this.BACK_GROUND_SIZE.width - this.sizeAutoPlay.width) * 0.5 - 10,
            y: this.BACK_GROUND_SIZE.height * 0.5
        });
        //bg icon
        this._bgAutoPlay = new cc.Sprite(res.listening_png);
        this._bgAutoPlay.setBlendFunc(cc.ONE, cc.ONE_MINUS_SRC_ALPHA);
        this._btnAutoPlay.addChild(this._bgAutoPlay, GV.ZORDER_LEVEL.BG);
        this._bgAutoPlay.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });
        var ratioWidth = this.sizeAutoPlay.width / this._bgAutoPlay.width;
        var ratioHeight = this.sizeAutoPlay.height / this._bgAutoPlay.height;
        this._bgAutoPlay.setScale(ratioWidth, ratioHeight);
        //text
        //this._lbAutoPlay = Utility.getLabel("Helvetica", 24, Utility.getColorByName("blue"), true,true);
        //this._lbAutoPlay.setString("NGHE THỬ");
        //this._btnAutoPlay.addChild(this._lbAutoPlay, GV.ZORDER_LEVEL.GUI);
        //this._lbAutoPlay.attr({
        //    anchorX: 0.5,
        //    anchorY: 0.5,
        //    x: 0.5 * this.sizeAutoPlay.width,
        //    y: 0.5 * this.sizeAutoPlay.height
        //});
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
        icon.setScale(this.sizeIcon / icon.width);
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
        this._sprNoticeIcon = this.createLeftIcon("#icon_star_gp.png", this.BACK_GROUND_SIZE.height * 5 / 7);
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
        this._sprMusicTileIcon = this.createLeftIcon("#sound_quality.png", this.BACK_GROUND_SIZE.height * 3 / 7);
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
        this._sprBestScoreIcon = this.createLeftIcon("#icon_crown_card.png", this.BACK_GROUND_SIZE.height * 1 / 7);
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
     * set info is object with properties: notice, music, score
     * eg: {notice: "nhac nho", music: "tet den roi", score: 2017}
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
            this.updateInfo();
            this._super(eff);
            this.updateActionButtonAutoPlay();
        }
    },
    updateInfo: function () {
        var data = {
            "notice":"Best With Headphones",
            "music": GV.MODULE_MGR._curSong["mName"],
            "score": GV.MODULE_MGR._myInfo["bestScore"]
        };
        this.setInfo(data);
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
    },
    onTouchUIEndEvent: function (sender) {
        switch (sender) {
            case this._btnAutoPlay:
                this._btnAutoPlay.stopAllActions();
                this._btnAutoPlay.enabled = false;
                GV.MODULE_MGR.autoPlayGame();
                break;
        }
    },
    updateActionButtonAutoPlay: function () {
        this._btnAutoPlay.enabled = true;
        this._btnAutoPlay.stopAllActions();
        var ACTION_TIME = 1;
        this._btnAutoPlay.runAction(cc.sequence(
            cc.delayTime(0.1),
            cc.scaleTo(ACTION_TIME * 0.2, 1.05),
            cc.scaleTo(ACTION_TIME * 0.8, 0.95)
        ).repeatForever());
    }
});

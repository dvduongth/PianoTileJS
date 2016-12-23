var GuiStartBattle = BaseGUI.extend({
    _className: "GuiStartBattle",

    ctor: function () {
        this._super();
        //variables
        this.BACK_GROUND_SIZE = {
            width: GV.WIN_SIZE.width,
            height: GV.WIN_SIZE.height * 0.25
        };
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
        this._rootNode.setPosition(GV.WIN_SIZE.width >> 1, 0);
    },
    createBackground: function () {
        //background
        this._sprBg = new cc.Scale9Sprite(res.gui_start_battle_bg_png);
        this.addChild(this._sprBg);
        this._sprBg.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: 0,
            y: 0
        });
        this._sprBg.setContentSize(this.BACK_GROUND_SIZE);
    },
    createNoticeTitleInfo: function () {
        this.createNoticeIcon();
        this.createNoticeText();
    },
    createNoticeIcon: function () {
        this._sprNoticeIcon = new cc.Sprite()
    },
    createMusicTitleInfo: function () {
        this.createMusicTitleText();
    },
    createBestScoreInfo: function () {
        this.createBestScoreText();
    },
    createNoticeText: function () {
        //notice text
        this._lbNoticeTitle = Utility.getLabel(res.FONT_MARKER_FELT, 28,Utility.getColorByName("cyan"));
        this.addChild(this._lbNoticeTitle);
        var bgSize = this._sprBg.getContentSize();
        this._lbNoticeTitle.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: 0,
            y: bgSize.height * 0.75
        });
        this.setNoticeTitleText("Best With Headphones");
    },
    createMusicTitleText: function () {
        //music title text
        this._lbMusiceTitle = Utility.getLabel(res.FONT_MARKER_FELT, 28,Utility.getColorByName("black"));
        this.addChild(this._lbMusiceTitle);
        this._lbMusiceTitle.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: 0,
            y: this.BACK_GROUND_SIZE.height * 0.5
        });
        this.setMusicTitleText("Music: Ngay Tet Que Em");
    },
    createBestScoreText: function () {
        //best score text
        this._lbBestScore = Utility.getLabel(res.FONT_MARKER_FELT, 28,Utility.getColorByName("black"));
        this.addChild(this._lbBestScore);
        this._lbBestScore.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: 0,
            y: this.BACK_GROUND_SIZE.height * 0.25
        });
        this.setBestScoreText("Best Score: 0");

    },

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
        this._lbNoticeTitle.setString(str);
    },
    setBestScoreText: function (str) {
        this._lbNoticeTitle.setString(str);
    },

    showGui: function (eff) {
        if(!this.isShowGui()) {
            this._super(eff);
        }
    },
    hideGui: function () {
        if(this.isShowGui()) {
            this._super();
        }
    },
    isShowGui: function () {
        return this._rootNode.visible;
    }
});

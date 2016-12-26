var GuiResultBattle = BaseGUI.extend({
    _className: "GuiResultBattle",

    ctor: function () {
        this._super();
        //variables
        this.listStar = [];
        this.listTextSuggest = [];
        this.BACK_GROUND_SIZE = cc.size(GV.WIN_SIZE.width, GV.WIN_SIZE.height);
        this.timeCountDown = 5;
        this.marginButtonTop = 5;
        this.sizeButtonTop = cc.size(
            (GV.WIN_SIZE.width - 5 * this.marginButtonTop) / 4,
            50
        );
        this.heightButtonBottom = 100;
        this.initGui();
    },

    initGui: function () {
        this.createBackground();
        this.createTopButtonInfo();
        this.createStarInfo();
        this.createScoreInfo();
        this.createButtonOnMiddle();
        this.createButtonBottom();
        //update view
        this.syncAllChildren();
        this._rootNode.visible = false;
        this._rootNode.retain();
        this._rootNode.setPosition(GV.WIN_SIZE.width >> 1, GV.WIN_SIZE.height >> 1);
    },
    createBackground: function () {
        //background
        this._sprBg = new cc.Scale9Sprite(res.bg_share_png);
        this.addChild(this._sprBg, GV.ZORDER_LEVEL.BG);
        this._sprBg.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0,
            y: 0
        });
        //var bgSize = this._sprBg.getContentSize();
        //var delta_ratio_x = this.BACK_GROUND_SIZE.width / bgSize.width;
        //var delta_ratio_y = this.BACK_GROUND_SIZE.height / bgSize.height;
        //this._sprBg.setScale(delta_ratio_x, delta_ratio_y);
        this._sprBg.setContentSize(this.BACK_GROUND_SIZE);
    },
    createTopButtonInfo: function () {
        this.createButtonLevel();
        this.createButtonHeart();
        this.createButtonMusic();
        this.createButtonDiamondCoin();
    },
    getBackgroundTopIcon: function () {
        var bg = new cc.Sprite("#bgglow_diamond.png");
        bg = new cc.Scale9Sprite(bg.getSpriteFrame());
        bg.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });
        //var bgSize = bg.getContentSize();
        //var delta_ratio_x = this.sizeButtonTop.width / bgSize.width;
        //var delta_ratio_y = this.sizeButtonTop.height / bgSize.height;
        //bg.setScale(delta_ratio_x, delta_ratio_y);
        bg.setContentSize(this.sizeButtonTop);
        return bg;
    },
    createButtonLevel: function () {
        this._btnLevel = Utility.getButton("_btnLevel", this.sizeButtonTop);
        this.addChild(this._btnLevel, GV.ZORDER_LEVEL.GUI);
        this._btnLevel.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.marginButtonTop + 0.5 * this.sizeButtonTop.width - 0.5 * this.BACK_GROUND_SIZE.width,
            y: (this.BACK_GROUND_SIZE.height - this.sizeButtonTop.height) * 0.5 - this.marginButtonTop * 2
        });
        //background button
        var bg = this.getBackgroundTopIcon();
        this._btnLevel.addChild(bg, GV.ZORDER_LEVEL.BG);

        this.createProgressLevel();
    },
    createProgressLevel: function () {

    },

    createButtonHeart: function () {
        this._btnHeart = Utility.getButton("_btnHeart", this.sizeButtonTop);
        this.addChild(this._btnHeart, GV.ZORDER_LEVEL.GUI);
        this._btnHeart.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 2 * this.marginButtonTop + 1.5 * this.sizeButtonTop.width - 0.5 * this.BACK_GROUND_SIZE.width,
            y: (this.BACK_GROUND_SIZE.height - this.sizeButtonTop.height) * 0.5 - this.marginButtonTop * 2
        });
        //background button
        var bg = this.getBackgroundTopIcon();
        this._btnHeart.addChild(bg, GV.ZORDER_LEVEL.BG);

    },
    createButtonMusic: function () {
        this._btnMusic = Utility.getButton("_btnMusic", this.sizeButtonTop);
        this.addChild(this._btnMusic, GV.ZORDER_LEVEL.GUI);
        this._btnMusic.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 3 * this.marginButtonTop + 2.5 * this.sizeButtonTop.width - 0.5 * this.BACK_GROUND_SIZE.width,
            y: (this.BACK_GROUND_SIZE.height - this.sizeButtonTop.height) * 0.5 - this.marginButtonTop * 2
        });
        //background button
        var bg = this.getBackgroundTopIcon();
        this._btnMusic.addChild(bg, GV.ZORDER_LEVEL.BG);
    },
    createButtonDiamondCoin: function () {
        this._btnDiamondCoin = Utility.getButton("_btnDiamondCoin", this.sizeButtonTop);
        this.addChild(this._btnDiamondCoin, GV.ZORDER_LEVEL.GUI);
        this._btnDiamondCoin.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 4 * this.marginButtonTop + 3.5 * this.sizeButtonTop.width - 0.5 * this.BACK_GROUND_SIZE.width,
            y: (this.BACK_GROUND_SIZE.height - this.sizeButtonTop.height) * 0.5 - this.marginButtonTop * 2
        });
        //background button
        var bg = this.getBackgroundTopIcon();
        this._btnDiamondCoin.addChild(bg, GV.ZORDER_LEVEL.BG);
    },

    createStarInfo: function () {

    },
    createScoreInfo: function () {

    },
    createButtonOnMiddle: function () {

    },
    createButtonBottom: function () {
        this.createButtonList();
        this.createButtonReplay();
        this.createButtonShare();
    },
    createButtonList: function () {
        var buttonSize = cc.size(this.heightButtonBottom, this.heightButtonBottom);
        this._btnList = Utility.getButton("_btnList", buttonSize);
        this.addChild(this._btnList, GV.ZORDER_LEVEL.GUI);
        this._btnList.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 2 * this.marginButtonTop + 0.5 * buttonSize.width - 0.5 * this.BACK_GROUND_SIZE.width,
            y: (-this.BACK_GROUND_SIZE.height + buttonSize.height) * 0.5 + this.marginButtonTop * 2
        });
        //background button
        var bg = new cc.Sprite("#result_btn_back_normal.png");
        bg.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0.5 * buttonSize.width,
            y: 0.5 * buttonSize.height
        });
        bg.setScale(buttonSize.width / bg.width);
        this._btnList.addChild(bg, GV.ZORDER_LEVEL.BG);
    },
    createButtonReplay: function () {
        var buttonSize = cc.size(this.BACK_GROUND_SIZE.width - 2 * this.heightButtonBottom - 6 * this.marginButtonTop, 100);
        this._btnReplay = Utility.getButton("_btnReplay", buttonSize);
        this.addChild(this._btnReplay, GV.ZORDER_LEVEL.GUI);
        this._btnReplay.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0,
            y: (-this.BACK_GROUND_SIZE.height + buttonSize.height) * 0.5 + this.marginButtonTop * 2
        });
        //background button
        var bg = new cc.Sprite("#btn_pressed.png");
        var originRect = cc.rect(0, 0, bg.width, bg.height);
        var offsetRect = cc.rect(bg.width * 0.3, bg.width * 0.3, bg.width * 0.4, bg.width * 0.4);
        bg = new cc.Scale9Sprite(bg.getSpriteFrame(),originRect,offsetRect);
        bg.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0.5 * buttonSize.width,
            y: 0.5 * buttonSize.height
        });
        //var scaleX = buttonSize.width / bg.width;
        var scaleY = buttonSize.height / bg.height;
        //bg.setScale(scaleX,scaleY);
        bg.setContentSize(buttonSize);
        this._btnReplay.addChild(bg, GV.ZORDER_LEVEL.BG);
        //icon
        var icon = new cc.Sprite("#result_icon_large_again.png");
        icon.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0.5 * buttonSize.width,
            y: 0.5 * buttonSize.height
        });
        icon.setScale(scaleY);
        this._btnReplay.addChild(icon, GV.ZORDER_LEVEL.GUI);
    },
    createButtonShare: function () {
        var buttonSize = cc.size(this.heightButtonBottom, this.heightButtonBottom);
        this._btnShare = Utility.getButton("_btnShare", buttonSize);
        this.addChild(this._btnShare, GV.ZORDER_LEVEL.GUI);
        this._btnShare.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: -2 * this.marginButtonTop - 0.5 * buttonSize.width + 0.5 * this.BACK_GROUND_SIZE.width,
            y: (-this.BACK_GROUND_SIZE.height + buttonSize.height) * 0.5 + this.marginButtonTop * 2
        });
        //background button
        var bg = new cc.Sprite("#result_btn_share_normal.png");
        bg.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0.5 * buttonSize.width,
            y: 0.5 * buttonSize.height
        });
        bg.setScale(buttonSize.width / bg.width);
        this._btnShare.addChild(bg, GV.ZORDER_LEVEL.BG);
    },


    /**
     * set info
     * */
    setInfo: function (data) {
        if (!data) {
            cc.error("set info gui start battle with null data");
            return null;
        }
        this.info = data;
        this.curScore = data.curScore;
        this.myStar = data.myStar;
    },
    /**
     * show gui
     * */
    showGui: function (eff) {
        if (!this.isShowGui()) {
            this._super(eff);
        }
    },
    /**
     * hide gui
     * */
    hideGui: function () {
        if (this.isShowGui()) {
            this._super();
            GV.SCENE_MGR.hideFog();
        }
    },
    isShowGui: function () {
        return this._rootNode.visible;
    },
    onTouchUIEndEvent: function (sender) {
        switch (sender) {
            case this._btnList:
                this.hideGui();
                break;
            case this._btnReplay:
                this.hideGui();
                GV.MODULE_MGR.restartGame();
                break;
        }
    }
});

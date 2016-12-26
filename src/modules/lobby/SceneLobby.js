var SceneLobby = BaseScene.extend({
    ctor: function () {
        this._super();
        this.BACK_GROUND_SIZE = GV.WIN_SIZE;
        this.marginButtonTop = 5;
        this.sizeButtonTop = cc.size(
            (GV.WIN_SIZE.width - 5 * this.marginButtonTop) / 4,
            50
        );
        this.initGui();
        return true;
    },
    initGui: function () {
        this.createBackground();
        this.createTopButtonInfo();

        //add label
        this.createLabelTest();
        //synAllChild
        this.syncAllChildren();
    },
    createBackground: function () {
        this._sprBg = new cc.Sprite(res.bg_lobby_png);
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
            x: this.marginButtonTop + 0.5 * this.sizeButtonTop.width,
            y: this.BACK_GROUND_SIZE.height - this.sizeButtonTop.height * 0.5 - this.marginButtonTop * 2
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
            x: 2 * this.marginButtonTop + 1.5 * this.sizeButtonTop.width,
            y: this.BACK_GROUND_SIZE.height - this.sizeButtonTop.height * 0.5 - this.marginButtonTop * 2
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
            x: 3 * this.marginButtonTop + 2.5 * this.sizeButtonTop.width,
            y: this.BACK_GROUND_SIZE.height - this.sizeButtonTop.height * 0.5 - this.marginButtonTop * 2
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
            x: 4 * this.marginButtonTop + 3.5 * this.sizeButtonTop.width,
            y: this.BACK_GROUND_SIZE.height - this.sizeButtonTop.height * 0.5 - this.marginButtonTop * 2
        });
        //background button
        var bg = this.getBackgroundTopIcon();
        this._btnDiamondCoin.addChild(bg, GV.ZORDER_LEVEL.BG);
    },
    onEnter:function () {
        this._super();
    },
    onExit: function () {
        this._super();
    },
    onEnterTransitionDidFinish: function () {
        this._super();
    },
    createLabelTest: function () {
        this._lbText = Utility.getLabel(res.FONT_MARKER_FELT, 72);
        this.addChild(this._lbText);
        this._lbText.attr({
            x: GV.WIN_SIZE.width >>1,
            y: GV.WIN_SIZE.height >>1
        });
        this._lbText.setString("Scene Lobby Here");
    },
    onTouchUIEndEvent: function (sender) {
        switch (sender) {
            case this._btnLevel:
                break;
            case this._btnHeart:
                break;
            case this._btnMusic:
                break;
            case this._btnDiamondCoin:
                break;

        }
    }
});


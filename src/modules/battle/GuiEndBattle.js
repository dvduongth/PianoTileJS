var GuiEndBattle = BaseGUI.extend({
    _className: "GuiEndBattle",

    ctor: function () {
        this._super();
        //variables
        this.listStar = [];
        this.listTextSuggest = [];
        this.BACK_GROUND_SIZE = {
            width: GV.WIN_SIZE.width * 0.96,
            height: GV.WIN_SIZE.height * 0.4
        };
        this.timeCountDown = 5;
        this.initGui();
    },

    initGui: function () {
        this.createBackground();
        this.createCountTimeInfo();
        this.createButtonClose();
        this.createSuggestInfo();
        this.createButtonContinue();
        //update view
        this.syncAllChildren();
        this._rootNode.visible = false;
        this._rootNode.retain();
    },
    getGuiSize: function () {
        return this.BACK_GROUND_SIZE;
    },
    createBackground: function () {
        //background
        this._sprBg = new cc.Scale9Sprite(res.gui_start_battle_bg_png);
        this.addChild(this._sprBg,GV.ZORDER_LEVEL.BG);
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
    /**
     * count time info
     * */
    createCountTimeInfo: function () {
        this.createImageCircle();
        this.createProgressCircle();
        this.createLabelTime();
    },
    createImageCircle: function () {
        this._sprImageCircle = new cc.Sprite("#opening_circle.png");
        this.addChild(this._sprImageCircle,GV.ZORDER_LEVEL.BG);
        this._sprImageCircle.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0,
            y: this.BACK_GROUND_SIZE.height * 0.5
        });
        this._sprImageCircle.setScale(0.75);
    },
    createProgressCircle: function () {
        //bg progress
        this._sprBgProgress = new cc.Sprite("#loading_empty.png");
        this.addChild(this._sprBgProgress,GV.ZORDER_LEVEL.BG);
        //loading bar progress
        this._sprProgress = new cc.ProgressTimer(new cc.Sprite("#loading_padding.png"));
        this._sprProgress.type = cc.ProgressTimer.TYPE_RADIAL;
        this._sprProgress.setReverseDirection(true);
        this.addChild(this._sprProgress,GV.ZORDER_LEVEL.BG);
        //update position
        this._sprBgProgress.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0,
            y: this.BACK_GROUND_SIZE.height * 0.5
        });
        this._sprProgress.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0,
            y: this.BACK_GROUND_SIZE.height * 0.5
        });
        this._sprBgProgress.setScale(0.85);
        this._sprProgress.setScale(0.85);
    },
    createLabelTime: function () {
        //notice text
        this._lbLabelTime = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 72,Utility.getColorByName("blue"));
        this.addChild(this._lbLabelTime, GV.ZORDER_LEVEL.BG);
        this.setLabelTimeText(this.timeCountDown + "");
        this._lbLabelTime.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0,
            y: this.BACK_GROUND_SIZE.height * 0.5
        });
    },
    /**
     * suggest info
     * */
    createSuggestInfo: function () {
        this.createTextSuggest();
        this.createStar();
    },
    createTextSuggest: function () {
        this.listTextSuggest = [];
        var posY = 50;
        //text 1
        var lbText1 = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 48, Utility.getColorByName("blue"),true,true);
        lbText1.setString("Need");
        this.addChild(lbText1, GV.ZORDER_LEVEL.GUI);
        lbText1.y = posY;
        this.listTextSuggest.push(lbText1);
        //text 2
        var lbText2 = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 72, Utility.getColorByName("red"), true);
        lbText2.setString("0");
        this.addChild(lbText2, GV.ZORDER_LEVEL.GUI);
        lbText2.y = posY;
        this.listTextSuggest.push(lbText2);
        //text 3
        var lbText3 = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 48, Utility.getColorByName("blue"),true,true);
        lbText3.setString("more for");
        this.addChild(lbText3, GV.ZORDER_LEVEL.GUI);
        lbText3.y = posY;
        this.listTextSuggest.push(lbText3);
    },
    setNumberScoreSuggest: function (num) {
        this.listTextSuggest[1].setString(Utility.numToStr(num));
        //calculate total text with
        var t = 0;
        for(var i = 0; i < 3; ++i) {
            t += this.listTextSuggest[i].width;
        }
        //update position
        var x = -(t * 0.5);
        var w0 = 0;
        var w;
        var margin_r = 10;
        for(var j = 0; j < 3; ++j) {
            w = this.listTextSuggest[j].width;
            this.listTextSuggest[j].x = x + (w0 + w) * 0.5;
            w0 = w;
            x = this.listTextSuggest[j].x + margin_r;
        }
    },
    clearAllTextSuggest: function () {
      this._ndStar.y = 0;
        var len = this.listTextSuggest.length;
        for(var i = 0; i < len; ++i) {
            this.listTextSuggest[i].removeFromParent(true);
            this.listTextSuggest[i] = null;
        }
        this.listTextSuggest.splice(0);
        this.listTextSuggest = [];
    },
    createStar: function () {
        this._ndStar = new cc.Node();
        this.addChild(this._ndStar, GV.ZORDER_LEVEL.GUI);
        this._ndStar.setScale(0.7);
    },
    updateNumStar: function (num) {
        if(!num) {
            num = 0;
        }
        this._ndStar.removeAllChildren(true);
        this.listStar.splice(0);
        this.listStar = [];
        for(var j = 0; j < num; ++j) {
            var sprStarIcon = new cc.Sprite(res.star_png);
            this._ndStar.addChild(sprStarIcon, 0);
            this.listStar.push(sprStarIcon);
        }
        //update position
        if(num > 0) {
            var margin = 5;
            var firstStar = this.listStar[0];
            var lineStarWidth = firstStar.width * num + margin * (num - 1);
            this._ndStar.y = - firstStar.height * 0.5 * this._ndStar.getScaleX();
            for (var i = 0; i < num; ++i) {
                var starIcon = this.listStar[i];
                if (starIcon) {
                    starIcon.x = -(lineStarWidth - firstStar.width) * 0.5 + (firstStar.width + margin) * i;
                }
            }
        }
    },
    /**
     * button close
     * */
    createButtonClose: function () {
        var BUTTON_SIZE = 52;
        var sprIconClose = new cc.Sprite("#btn_close.png");
        sprIconClose.setBlendFunc(cc.ZERO, cc.ONE_MINUS_SRC_ALPHA);
        this._btnClose = new ccui.Button();
        this._btnClose.setContentSize(BUTTON_SIZE,BUTTON_SIZE);
        this._btnClose.addChild(sprIconClose, GV.ZORDER_LEVEL.BG);
        sprIconClose.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: BUTTON_SIZE * 0.5,
            y: BUTTON_SIZE * 0.5
        });
        sprIconClose.setScale(BUTTON_SIZE / sprIconClose.width);
        this.addChild(this._btnClose, GV.ZORDER_LEVEL.BG);
        this._btnClose.setName("_btnClose");
        this._btnClose.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.BACK_GROUND_SIZE.width * 0.5 - BUTTON_SIZE,
            y: this.BACK_GROUND_SIZE.height * 0.5 - BUTTON_SIZE
        });
    },
    createButtonContinue: function () {
        var button_size = cc.size(this.BACK_GROUND_SIZE.width * 0.9, 40);
        this._btnContinue = new ccui.Button();
        this.addChild(this._btnContinue, GV.ZORDER_LEVEL.BG);
        this._btnContinue.setContentSize(button_size);
        this._btnContinue.setName("_btnContinue");
        this._btnContinue.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0,
            y: (-this.BACK_GROUND_SIZE.height + this._btnContinue.height) * 0.5 + 50
        });
        //sprite background
        var sprButtonBg = new cc.Scale9Sprite((new cc.Sprite("#btn_normal.png")).getSpriteFrame());
        this._btnContinue.addChild(sprButtonBg, GV.ZORDER_LEVEL.BG);
        sprButtonBg.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: button_size.width >> 1,
            y: button_size.height >> 1
        });
        sprButtonBg.setContentSize(button_size);
        sprButtonBg.setScaleY(0.5);
        //text continue
        var lbText = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 36, Utility.getColorByName("white"));
        lbText.setString("Continue");
        this._btnContinue.addChild(lbText,GV.ZORDER_LEVEL.GUI);
        lbText.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 50,
            y: button_size.height * 0.5
        });
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
        this.curScore = data.curScore;
        this.myStar = data.myStar;
        var d = this.curScore % GV.SCENE_MGR.getCurrentScene().distanceUpStar;
        if(d != 0) {
            this.updateNumStar(this.myStar + 1);
            this.setNumberScoreSuggest(d);
        }else{
            this.updateNumStar(this.myStar);
            this.clearAllTextSuggest();
        }
    },
    setLabelTimeText: function (str) {
        this._lbLabelTime.setString(str);
    },
    /**
     * show gui
     * */
    showGui: function (eff) {
        if(!this.isShowGui()) {
            this._rootNode.setPosition(GV.WIN_SIZE.width >> 1, GV.WIN_SIZE.height >> 1);
            this._super(eff);
            this._sprProgress.runAction(cc.progressFromTo(this.timeCountDown, 0, 100));
            var func = function (i) {
                if(i == 0 ) {
                    this.hideGui();
                    this.restartGame();
                    return false;
                }
                this._lbLabelTime.setString(Utility.numToStr(i));
                this._lbLabelTime.runAction(cc.sequence(
                    cc.delayTime(1),
                    cc.callFunc(function () {
                        func(i - 1);
                    }.bind(this))
                ));
            }.bind(this);
            func(this.timeCountDown);
        }
    },
    /**
     * hide gui
     * */
    hideGui: function () {
        if(this.isShowGui()) {
            this._super();
            GV.SCENE_MGR.hideFog();
        }
    },
    isShowGui: function () {
        return this._rootNode.visible;
    },
    onTouchUIEndEvent: function (sender) {
        switch (sender) {
            case this._btnClose:
                this.hideGui();
                this.restartGame();
                break;
            case this._btnContinue:
                this.hideGui();
                this.restartGame();
                break;
        }
    },
    restartGame: function () {
        var curScene = GV.SCENE_MGR.getCurrentScene();
        GV.MODULE_MGR.resetValues();
        curScene.createStartGameState();
        curScene.resetValues();
    }
});

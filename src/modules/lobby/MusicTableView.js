/**
 * custom table view
 * */
var MusicTableView = CustomTableView.extend({
    _className: "MusicTableView",

    ctor: function (colNum, contentSizeWidth, contentSizeHeight, direction, marginLeft, marginRight, marginTop, marginBottom) {
        this._super(colNum, contentSizeWidth, contentSizeHeight, direction, marginLeft, marginRight, marginTop, marginBottom);
        this._cellHeight = GV.WIN_SIZE.height * 0.25;
    },

    tableCellSizeForIndex: function (table, idx) {
        if(idx) {
            return cc.size(this._contentSizeWidth, this._cellHeight);
        }else{
            return cc.size(this._contentSizeWidth, this._cellHeight - 10);
        }
    },

    tableCellAtIndex: function (table, idx) {
        var cell = table.dequeueCell();
        if (!cell) {
            cell = new MusicCell(this);
        }
        var guiRankElement = cell.getChildByTag(121);
        guiRankElement.setInfo(this._elementList[idx],idx);

        return cell;
    },
    tableCellTouched: function (table, cell) {
        cc.log("touch here", cell.getIdx());
        var cb = {};
        cb["caller"] = GV.MODULE_MGR;
        cb["funcName"] = GV.MODULE_MGR.restartGame;
        cb["args"] = [];
        var listButton = [{btnName: 'ok',btnTitle:"PLAY", hide: true, callback: cb}];
        var content = {"title": "THÔNG BÁO", "text": "Bạn muốn chơi bài " + (cell.getIdx() + 1) + "?"};
        GV.POPUP_MGR.showPopup(content, listButton, true);
    }
});


/**
 * Custom table view cell for table view
 * */
var MusicCell = cc.TableViewCell.extend({
    _className: "MusicCell",
    ctor: function (parent_) {
        this._super();
        this._parentView = parent_;
        if (!this._parentView) return;
        var cellWidth = Math.floor(this._parentView._contentSizeWidth - this._parentView._marginLeft - this._parentView._marginRight);
        this.setContentSize(cellWidth, this._parentView._cellHeight);
        var element = new MusicElement();
        element.setSize(cellWidth, this._parentView._cellHeight - 10);
        element.initGui();
        element.tag = 121;
        this.addChild(element, GV.ZORDER_LEVEL.GUI, element.tag);
    },
    draw: function (ctx) {
        this._super(ctx);
    }
});
/**
 * Element for each cell
 */
var MusicElement = BaseGUI.extend({
    _className: "MusicElement",
    ctor: function () {
        this._super();

        //init values
        this.listStarIcon = [];
        this._data = null;
    },
    initGui: function () {
        this.createButtonElement();
        this.createBackground();
        this.createLabelMusicTitle();
        this.createIconMusic();
        this.createGoldGiftInfo();
        this.createStarInfo();
        //sync all child
        this.syncAllChildren();
        this._btnElement.setZoomScale(-0.01);
    },
    createIconMusic: function () {
        this._sprIconMusic = new cc.Sprite("#sound_quality.png");
        this._btnElement.addChild(this._sprIconMusic, GV.ZORDER_LEVEL.BG);
        this._sprIconMusic.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: this._sprIconMusic.width,
            y: this.contentSize.height >> 1
        });
        this._sprIconMusic.setScale(this.sizeIconMusic / this._sprIconMusic.width);
    },
    createGoldGiftInfo: function () {
        this.createIconGoldGift();
        this.createLabelNumberGold();
    },
    createIconGoldGift: function () {
        this._sprIconGoldGift = new cc.Sprite("#result_icon_coin.png");
        this._btnElement.addChild(this._sprIconGoldGift, GV.ZORDER_LEVEL.BG);
        this._sprIconGoldGift.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: this._sprIconMusic.width * 2 * this._sprIconMusic.getScaleX(),
            y: this.contentSize.height >> 1
        });
        this._sprIconGoldGift.setScale(this.sizeIconGoldGift / this._sprIconGoldGift.width);
    },
    createLabelNumberGold: function () {
        this._lbNumberGold = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32, Utility.getColorByName("black"), true, true);
        this._btnElement.addChild(this._lbNumberGold, GV.ZORDER_LEVEL.GUI);
        this._lbNumberGold.setString("2.017");
        this._lbNumberGold.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: this._sprIconGoldGift.x + (1.5 - this._sprIconGoldGift.anchorX) * this._sprIconGoldGift.width * this._sprIconGoldGift.getScaleX(),
            y: this.contentSize.height >> 1
        });
    },
    createStarInfo: function () {
        //create node star
        this._ndStar = new cc.Node();
        this._btnElement.addChild(this._ndStar, GV.ZORDER_LEVEL.GUI);
        this._ndStar.attr({
            x: this._sprIconMusic.width * 2 * this._sprIconMusic.getScaleX(),
            y: 0
        });
        this._ndStar["oldPos"] = this._ndStar.getPosition();
        //create star
        var widthIconStar = 0;
        var marginLeft = 10;
        for(var i = 0; i < GV.MAX_NUM_STAR; ++i) {
            this["_sprStar_" + i] = new cc.Sprite("#star.png");
            this._ndStar.addChild(this["_sprStar_" + i]);
            this.listStarIcon.push(this["_sprStar_" + i]);
            var ratioScale = this.sizeIconStar / this["_sprStar_" + i].width;
            if(!widthIconStar) {
                widthIconStar = this["_sprStar_" + i].width * ratioScale;
            }
            this["_sprStar_" + i].setScale(ratioScale);
            this["_sprStar_" + i].attr({
                anchorX: 0,
                anchorY: 0,
                x: i * (widthIconStar + marginLeft),
                y: 0
            });
        }
    },

    createButtonElement: function () {
        if(!this._btnElement) {
            this._btnElement = Utility.getButton("_btnElement", this.contentSize);
            this.addChild(this._btnElement, GV.ZORDER_LEVEL.BG);
            this._btnElement.attr({
                anchorX: 0,
                anchorY: 0,
                x: 0,
                y: 0
            });
            this._btnElement.setSwallowTouches(false);
            //config size
            this.sizeIconMusic = this.contentSize.width / 8;
            this.sizeIconGoldGift = this.contentSize.width / 10;
            this.sizeIconStar = this.contentSize.width / 8;
        }
    },
    createBackground: function () {
        this._sprBg = new cc.Sprite(res.item_rand_bg_png);
        this._btnElement.addChild(this._sprBg, GV.ZORDER_LEVEL.BG);

        var deltaRatioWidth = this.contentSize.width / this._sprBg.width;
        var deltaRatioHeight = this.contentSize.height / this._sprBg.height;
        this._sprBg.setScale(deltaRatioWidth, deltaRatioHeight);
        this._sprBg.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });
    },
    createLabelMusicTitle: function () {
        this._lbMusicTitle = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 48, Utility.getColorByName("black"), true, true);
        this._btnElement.addChild(this._lbMusicTitle, GV.ZORDER_LEVEL.GUI);
        this._lbMusicTitle.setString("Ngay Tet Que Em");
        this._lbMusicTitle.attr({
            anchorX: 0.5,
            anchorY: 1,
            x: this.contentSize.width >> 1,
            y: this.contentSize.height - 15
        });
    },
    onTouchUIEndEvent: function (sender) {
    },
    setInfo: function (info, idx) {
        if (!info) {
            cc.error("set info music element with null data");
            return false;
        }
        this._data = info;
    }
});
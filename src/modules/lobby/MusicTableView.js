/**
 * music table view
 * */
var MusicTableView = CustomTableView.extend({
    _className: "MusicTableView",

    ctor: function (colNum, contentSizeWidth, contentSizeHeight, direction, marginLeft, marginRight, marginTop, marginBottom) {
        this._super(colNum, contentSizeWidth, contentSizeHeight, direction, marginLeft, marginRight, marginTop, marginBottom);
        this._cellHeight = GV.WIN_SIZE.height * 0.15;
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
        var element = cell.getChildByTag(121);
        element.setInfo(this._elementList[idx],idx);

        return cell;
    },
    tableCellTouched: function (table, cell) {
        var i = Math.floor(cell.getIdx());
        var cb;
        if(this.functionTouch) {
            if(!this.functionTouch["funcName"]){
                cb = {};
                cb["funcName"] = this.functionTouch;
                cb["caller"] = null;
            }else{
                cb = this.functionTouch;
            }
            cb["args"] = [this._elementList[i]];
            Utility.executeFunction(cb);
        }
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
        this._sprIconGoldGift.setScale(this.sizeIconGoldGift / this._sprIconGoldGift.width);

        this._sprIconGoldGift.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: this._sprIconMusic.width * 2 * this._sprIconMusic.getScaleX(),
            y: this.contentSize.height >> 1
        });
    },
    createLabelNumberGold: function () {
        this._lbNumberGold = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 28, Utility.getColorByName("black"), true, true);
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
            this["_sprStar_" + i] = new cc.Sprite("#r_icon_star_inactive.png");
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
            this.sizeIconMusic = this.contentSize.height >> 1;
            this.sizeIconGoldGift = this.contentSize.height >> 2;
            this.sizeIconStar = this.contentSize.height >> 2;
        }
    },
    createBackground: function () {
        this._sprBg = new cc.Sprite(res.item_bg_png);
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
        this._lbMusicTitle = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32, Utility.getColorByName("black"), true, true);
        this._btnElement.addChild(this._lbMusicTitle, GV.ZORDER_LEVEL.GUI);
        this._lbMusicTitle.setString("Ngay Tet Que Em");
        this._lbMusicTitle.attr({
            anchorX: 0.5,
            anchorY: 1,
            x: this.contentSize.width >> 1,
            y: this.contentSize.height - 5
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
        this.mId = info.mId;
        this.enableState = this._data.mState == GV.ELEMENT_STATE.UNLOCK;
        this._btnElement.enabled = this.enableState;
        this.setMusicTitle(this._data.mName);
        this.setGoldInfo(this._data.mGold);
        if(this.enableState) {
            this.setStarInfo(this._data.mStar);
        }else{
            this.resetStarView();
        }
        this.updateState();
    },
    setMusicTitle: function (mName) {
        if(!mName) {
            mName = "";
            this._data.mName = mName;
        }
        this._lbMusicTitle.setString(mName);
    },
    setGoldInfo: function (mGold) {
        if(!mGold) {
            mGold = 0;
            this._data.mGold = mGold;
        }
        this._lbNumberGold.setString(Utility.numToStr(mGold));
    },
    resetStarView: function () {
        var len = this.listStarIcon.length;
        for(var i = 0; i < len; ++i) {
            this.listStarIcon[i].removeAllChildren();
        }
    },
    setStarInfo: function (mStar) {
        if(!mStar) {
            mStar = 0;
            this._data.mStar = mStar;
        }
        this.resetStarView();
        for(var i = 0; i < mStar; ++i) {
            var sprLightStar = new cc.Sprite("#r_icon_star_highlight.png");
            var parent = this.listStarIcon[i];
            parent.addChild(sprLightStar);
            sprLightStar.attr({
                anchorX: 0.5,
                anchorY: 0.5,
                x: 0.5 * parent.width,
                y: 0.5 * parent.height
            });
        }
    },
    updateState: function () {
        Utility.updateColorSprite(this._sprBg, !this.enableState);
        Utility.updateColorSprite(this._sprIconMusic, !this.enableState);
        Utility.updateColorSprite(this._sprIconGoldGift, !this.enableState);
        //var len = this.listStarIcon.length;
        //for(var i = 0; i <len; ++i) {
        //    Utility.updateColorSprite(this.listStarIcon[i], !this.enableState);
        //}
    }
});
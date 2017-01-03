var GuiPopup = BaseGUI.extend({
    _className: "GuiPopup",

    ctor: function () {
        this._super();
        this._btnClose = null;
        this._btnOk = null;
        this._btnCancel = null;
        this._btnOther = null;

        this._sprBg = null;
        this._lbTitle = null;
        this._lbMsg = null;

        //variables
        this._okCallbackFunc = null;
        this._closeCallbackFunc = null;
        this._cancelCallbackFunc = null;
        this._otherCallbackFunc = null;

        this.nodeContent = null;

        this.popupWidth = GV.WIN_SIZE.width * 0.8;
        this.popupHeight = GV.WIN_SIZE.height * 0.5;
        this.marginButton = 10;
        this.buttonSize = cc.size(this.popupWidth * 0.3, this.popupHeight * 0.25);
        this.BUTTON_POS = {
            1: [{x: 0}],
            2: [{x: -(this.buttonSize.width + this.marginButton) * 0.5}, {x: (this.buttonSize.width + this.marginButton) * 0.5}],
            3: [
                {x: -this.buttonSize.width + this.marginButton},
                {x: 0},
                {x: this.buttonSize.width + this.marginButton}
            ]
        };

        this.initGui();
    },

    initGui: function () {
        //background
        this.createBackground();
        //button
        this.createButton();
        //text
        this.createText();
        this.setContentSize(this.popupWidth, this.popupHeight);
        //sync
        this.syncAllChildren();
        //update view
        this._rootNode.visible = false;
        this._rootNode.retain();
        this._rootNode.setPosition(GV.WIN_SIZE.width >> 1, GV.WIN_SIZE.height >> 1);
    },
    createBackground: function () {
        this._sprBg = new cc.Scale9Sprite(res.bg_red_bag_png);
        this._sprBg.setScale9Enabled(true);
        this._sprBg.setContentSize(this.popupWidth, this.popupHeight);
        this.addChild(this._sprBg, GV.ZORDER_LEVEL.BG);
    },
    createButton: function () {
        //button close
        this.createButtonClose();
        //button bottom
        var posBottom = (this.buttonSize.height - this.popupHeight) * 0.5 + 30;
        //button ok
        this.createButtonOK(posBottom);
        //button cancel
        this.createButtonCancel(posBottom);
        //button other
        this.createButtonOther(posBottom);
    },
    createButtonOther: function (posBottom) {
        this._btnOther = Utility.getButton("_btnOther", this.buttonSize);
        this._btnOther.y = posBottom;
        this.addChild(this._btnOther, GV.ZORDER_LEVEL.GUI);
        //background
        var sprButtonBg = new cc.Sprite("#bg_btn_play_n_pressed.png");
        //sprButtonBg = new cc.Scale9Sprite(sprButtonBg.getSpriteFrame());
        this._btnOther.addChild(sprButtonBg, GV.ZORDER_LEVEL.BG);
        sprButtonBg.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.buttonSize.width >> 1,
            y: this.buttonSize.height >> 1
        });
        //sprButtonBg.setContentSize(this.buttonSize);
        sprButtonBg.setScale(this.buttonSize.width / sprButtonBg.width, this.buttonSize.height / sprButtonBg.height);

        //text
        var lbText = Utility.getLabel(res.FONT_MARKER_FELT, 28, Utility.getColorByName("white"));
        lbText.setString("Other");
        this._btnOther.addChild(lbText, GV.ZORDER_LEVEL.GUI);
        lbText.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.buttonSize.width >> 1,
            y: this.buttonSize.height >> 1
        });
    },
    createButtonCancel: function (posBottom) {
        this._btnCancel = Utility.getButton("_btnCancel", this.buttonSize);
        this._btnCancel.y = posBottom;
        this.addChild(this._btnCancel, GV.ZORDER_LEVEL.GUI);
        //bg
        var sprButtonBg = new cc.Sprite("#bg_btn_play_n_pressed.png");
        //sprButtonBg = new cc.Scale9Sprite(sprButtonBg.getSpriteFrame());
        this._btnCancel.addChild(sprButtonBg, GV.ZORDER_LEVEL.BG);
        sprButtonBg.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.buttonSize.width >> 1,
            y: this.buttonSize.height >> 1
        });
        //sprButtonBg.setContentSize(this.buttonSize);
        sprButtonBg.setScale(this.buttonSize.width / sprButtonBg.width, this.buttonSize.height / sprButtonBg.height);

        //text
        var lbText = Utility.getLabel(res.FONT_MARKER_FELT, 28, Utility.getColorByName("white"));
        lbText.setString("Cancel");
        this._btnCancel.addChild(lbText, GV.ZORDER_LEVEL.GUI);
        lbText.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.buttonSize.width >> 1,
            y: this.buttonSize.height >> 1
        });
    },
    createButtonOK: function (posBottom) {
        this._btnOk = Utility.getButton("_btnOk", this.buttonSize);
        this._btnOk.y = posBottom;
        this.addChild(this._btnOk, GV.ZORDER_LEVEL.GUI);
        //bg
        var sprButtonBg = new cc.Sprite("#bg_btn_play_n_pressed.png");
        //sprButtonBg = new cc.Scale9Sprite(sprButtonBg.getSpriteFrame());
        this._btnOk.addChild(sprButtonBg, GV.ZORDER_LEVEL.BG);
        sprButtonBg.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.buttonSize.width >> 1,
            y: this.buttonSize.height >> 1
        });
        sprButtonBg.setScale(this.buttonSize.width / sprButtonBg.width, this.buttonSize.height / sprButtonBg.height);
        //text
        var lbText = Utility.getLabel(res.FONT_MARKER_FELT, 28, Utility.getColorByName("white"));
        lbText.setString("OK");
        this._btnOk.addChild(lbText, GV.ZORDER_LEVEL.GUI);
        lbText.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.buttonSize.width >> 1,
            y: this.buttonSize.height >> 1
        });
    },
    createButtonClose: function () {
        var buttonCloseSize = 60;
        this._btnClose = Utility.getButton("_btnClose", cc.size(buttonCloseSize, buttonCloseSize));
        this.addChild(this._btnClose, GV.ZORDER_LEVEL.GUI);
        this._btnClose.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: (this.popupWidth - buttonCloseSize) * 0.5 - 30,
            y: (this.popupHeight - buttonCloseSize) * 0.5 - 30
        });
        var sprIconClose = new cc.Sprite("#btn_close.png");
        sprIconClose.setBlendFunc(cc.ZERO, cc.ONE_MINUS_SRC_ALPHA);
        this._btnClose.addChild(sprIconClose, GV.ZORDER_LEVEL.BG);
        sprIconClose.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: buttonCloseSize * 0.5,
            y: buttonCloseSize * 0.5
        });
        sprIconClose.setScale(buttonCloseSize / sprIconClose.width);
    },
    createText: function () {
        //title
        this._lbTitle = Utility.getLabel(res.FONT_ARIAL, 36);
        this.addChild(this._lbTitle, GV.ZORDER_LEVEL.BG);
        this._lbTitle.setString("TITLE");
        this._lbTitle.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0,
            y: 0.5 * (this.popupHeight - this._lbTitle.height) - 30
        });
        //message
        this._lbMsg = Utility.getLabel(res.FONT_ARIAL, 28);
        this._lbMsg.setContentSize(this.popupWidth * 0.8, this.popupHeight);
        this.addChild(this._lbMsg, GV.ZORDER_LEVEL.GUI);
    },

    setContentSize: function (width, height) {
        var deltaHeight = height - this.popupHeight;
        var deltaWidth = width - this.popupWidth;
        this.setDeltaWidthHeightOption(deltaWidth, deltaHeight);
    },
    setDeltaWidthHeightOption: function (deltaWidth, deltaHeight) {
        if (deltaWidth === undefined) {
            deltaWidth = 0;
        }
        if (deltaHeight === undefined) {
            deltaHeight = 0;
        }

        //top info
        this._lbTitle.y += deltaHeight * 0.5;
        this._btnClose.y += deltaHeight * 0.5;
        //bottom info y
        this._btnOk.y -= deltaHeight * 0.5;
        this._btnCancel.y -= deltaHeight * 0.5;
        this._btnOther.y -= deltaHeight * 0.5;

        //message size
        this._sprBg.height += deltaHeight;
        this._sprBg.width += deltaWidth;
        this._lbMsg.height += deltaHeight;
        this._lbMsg.width += deltaWidth;

        //bottom info x
        this._btnCancel.x -= deltaWidth * 0.5;
        this._btnOther.x += deltaWidth * 0.5;
        if (this._btnOk.x != 0) {
            this._btnOk.x += deltaWidth * 0.5;
        }
    },

    resetDefault: function () {
        this.popupWidth = GV.WIN_SIZE.width * 0.8;
        this.popupHeight = GV.WIN_SIZE.height * 0.5;
        this.setContentSize(this.popupWidth, this.popupHeight);
        this.resetViewButton();
    },

    /**
     * listButtonObj:
     *  ex: [{btnName: 'ok', hide: true, callback: {caller: .., funcName: ..., args: [...]}},
     *      ...
     *      ]
     *      btnName: name of button will added and execute the callback when clicked end
     *              'ok', 'cancel', 'other', 'close'
     *      hide: the popup will hide if true
     * content:
     *  ex: {title:"Popup",text: "Popup Text", width: 100, height: 100} or ex: {title: "", node: new cc.Node(), width: 100, height: 100}
     *  default width === undefined, height === undefined,
     *  don't care about width and height of content view
     * @param {Object} content
     * @param {Array} listButtonObj
     * @param {boolean|*} hasClose  ----- has show button close
     */
    setContent: function (content, listButtonObj, hasClose) {
        //reset size
        this.resetDefault();
        //set title
        if (content.title !== undefined) {
            this._lbTitle.setString(content.title);
        } else {
            this._lbTitle.setString("THONG BAO");
        }
        //set button
        if (listButtonObj !== undefined) {
            this._addButtons(listButtonObj);
        }
        //set content view
        if (content.text !== undefined) {
            this._lbMsg.setString(content.text);
        } else {
            if (content.node !== undefined && content.node instanceof cc.Node) {
                this._lbMsg.setString("");
                content.node.removeFromParent(false);
                if (this.nodeContent) {
                    this.nodeContent.removeFromParent(true);
                }
                this.nodeContent = content.node;
                this._rootNode.addChild(this.nodeContent);
            } else {
                //content is string
                this._lbMsg.setString(content + "");
            }
        }
        //set show button close
        this._btnClose.visible = hasClose === true;
        //update content size
        this.updateContentSize(content.width, content.height);
    },
    _addButtons: function (listBtn) {
        if (listBtn) {
            var obj = null;
            var btnName = '';
            var len = listBtn.length;
            var numButton = len;
            for (var i = 0; i < len; ++i) {
                obj = listBtn[i];
                btnName = obj.btnName.toLowerCase();
                switch (btnName) {
                    case 'ok':
                        this._okCallbackFunc = obj.callback;
                        this._btnOk.visible = true;
                        if (obj.hide !== undefined) {
                            this._btnOk.hideGui = obj.hide;
                        } else {
                            this._btnOk.hideGui = true;
                        }
                        break;
                    case 'close':
                        this._closeCallbackFunc = obj.callback;
                        this._btnClose.visible = true;
                        if (obj.hide !== undefined) {
                            this._btnClose.hideGui = obj.hide;
                        } else {
                            this._btnClose.hideGui = true;
                        }
                        numButton -= 1;
                        break;
                    case 'cancel':
                        this._cancelCallbackFunc = obj.callback;
                        this._btnCancel.visible = true;
                        if (obj.hide !== undefined) {
                            this._btnCancel.hideGui = obj.hide;
                        } else {
                            this._btnCancel.hideGui = true;
                        }
                        break;
                    case 'other':
                        this._otherCallbackFunc = obj.callback;
                        this._btnOther.visible = true;
                        if (obj.hide !== undefined) {
                            this._btnOther.hideGui = obj.hide;
                        } else {
                            this._btnOther.hideGui = true;
                        }
                        break;
                }
            }
            this._checkViewButton(numButton);
        }
    },

    resetViewButton: function () {
        this._btnClose.visible = true;
        this._btnClose.hideGui = true;

        this._btnOk.visible = true;
        this._btnOk.hideGui = true;

        this._btnCancel.visible = false;
        this._btnCancel.hideGui = true;

        this._btnOther.visible = false;
        this._btnOther.hideGui = true;
    },

    _checkViewButton: function (numButton) {
        if (numButton > 0) {
            var posInfo = this.BUTTON_POS[numButton];
            var index = 0;
            if (this._btnCancel.visible) {
                this._btnCancel.x = posInfo[index].x;
                index++;
            }
            if (this._btnOk.visible) {
                this._btnOk.x = posInfo[index].x;
                index++;
            }
            if (this._btnOther.visible) {
                this._btnOther.x = posInfo[index].x;
            }
        }
    },

    updateContentSize: function (width, height) {
        var enableUpdate = width !== undefined || height !== undefined;
        if (enableUpdate) {
            if (width === undefined) {
                width = this.popupWidth;
            }
            if (height === undefined) {
                height = this.popupHeight;
            }
            enableUpdate = width != this.popupWidth || height != this.popupHeight;
            if (enableUpdate) {
                this.setContentSize(width, height);
            }
        }
    },

    onTouchUIEndEvent: function (sender) {
        switch (sender) {
            case this._btnClose:
                Utility.executeFunction(this._closeCallbackFunc);
                if (this._btnClose.hideGui) {
                    this.hideGui();
                }
                break;
            case this._btnOk:
                Utility.executeFunction(this._okCallbackFunc);
                if (this._btnOk.hideGui) {
                    this.hideGui();
                }
                break;
            case this._btnCancel:
                Utility.executeFunction(this._cancelCallbackFunc);
                if (this._btnCancel.hideGui) {
                    this.hideGui();
                }
                break;
            case this._btnOther:
                Utility.executeFunction(this._otherCallbackFunc);
                if (this._btnOther.hideGui) {
                    this.hideGui();
                }
                break;
        }
    },
    showGui: function (eff) {
        if (!this.isShowGui()) {
            this._super(eff);
        }
    },
    hideGui: function () {
        if (this.isShowGui()) {
            GV.SCENE_MGR.hideFog();
            this._super();
        }
    },
    isShowGui: function () {
        return this._rootNode.visible;
    }
});
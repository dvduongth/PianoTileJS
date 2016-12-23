var GuiPopup = BaseGUI.extend({
    _className: "GuiPopup",

    ctor: function () {
        this._super();
        this._btnClose = null;
        this._btnOk = null;
        this._btnCancel = null;
        this._btnOther = null;

        this._imgBg = null;
        this._lbTitle = null;
        this._lbMsg = null;

        //variables
        this._okCallbackFunc = null;
        this._closeCallbackFunc = null;
        this._cancelCallbackFunc = null;
        this._otherCallbackFunc = null;

        this.nodeContent = null;

        this.popupWidth = 428;
        this.popupHeight = 150;

        this.BUTTON_POS = {
            1: [{x:0}],
            2: [{x:-89},{x:84}],
            3: [{x:-152},{x:0},{x:152}]
        };

        this.initGui();
    },

    initGui: function () {
        //background
        this._imgBg = new cc.Sprite(res.tile_music_undefined_png);
        this.addChild(this._imgBg);
        //button
        this._btnOk = new ccui.Button();
        this.addChild(this._btnOk);
        this._btnClose = new ccui.Button();
        this.addChild(this._btnClose);
        this._btnCancel = new ccui.Button();
        this.addChild(this._btnCancel);
        this._btnOther = new ccui.Button();
        this.addChild(this._btnOther);
        //text
        this._lbTitle = Utility.getLabel(res.FONT_MARKER_FELT, 28);
        this.addChild(this._lbTitle);
        this._lbMsg = Utility.getLabel();
        this.addChild(this._lbMsg);
        //sync
        this.syncAllChildren();
        //update view
        this._rootNode.visible = false;
        this._rootNode.retain();
        this._rootNode.setPosition(GV.WIN_SIZE.width >> 1, GV.WIN_SIZE.height >> 1);

        this.popupWidth =  this._lbMsg.width;
        this.popupHeight =  this._lbMsg.height;
    },

    setContentSize: function (width, height) {
        this._super(width, height);
        var deltaHeight = height - this.popupHeight;
        var deltaWidth = width - this.popupWidth;
        this.setDeltaWidthHeightOption(deltaWidth, deltaHeight);
    },
    setDeltaWidthHeightOption: function (deltaWidth, deltaHeight) {
        if(deltaWidth === undefined) {
            deltaWidth = 0;
        }
        if(deltaHeight === undefined) {
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
        this._imgBg.height += deltaHeight;
        this._imgBg.width += deltaWidth;
        this._lbMsg.height += deltaHeight;
        this._lbMsg.width += deltaWidth;

        //bottom info x
        this._btnCancel.x -= deltaWidth * 0.5;
        this._btnOther.x += deltaWidth * 0.5;
        if(this._btnOk.x != 0) {
            this._btnOk.x += deltaWidth * 0.5;
        }
    },

    resetDefault: function () {
        this.setContentSize(428, 150);
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
        }
        else {
            this._lbTitle.setString("THONG BAO");
        }
        //set button
        if (listButtonObj !== undefined) {
            this._addButtons(listButtonObj);
        }
        //set content view
        if(content.text !== undefined) {
            this._lbMsg.setString(content.text);
        }else{
            if(content.node !== undefined && content.node instanceof cc.Node) {
                this._lbMsg.setString("");
                content.node.removeFromParent(false);
                if(this.nodeContent) {
                    this.nodeContent.removeFromParent(true);
                }
                this.nodeContent = content.node;
                this._rootNode.addChild(this.nodeContent);
            }else{
                //content is string
                this._lbMsg.setString(content +"");
            }
        }
        //set show button close
        if (hasClose === false) {
            this._btnClose.visible = false;
        }
        //update content size
        this.updateContentSize(content.width, content.height);
    },
    _addButtons: function (listBtn) {
        this.resetViewButton();
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
                        if(obj.hide !== undefined) {
                            this._btnOk.hideGui = obj.hide;
                        }else{
                            this._btnOk.hideGui = true;
                        }
                        break;
                    case 'close':
                        this._closeCallbackFunc = obj.callback;
                        this._btnClose.visible = true;
                        if(obj.hide !== undefined) {
                            this._btnClose.hideGui = obj.hide;
                        }else{
                            this._btnClose.hideGui = true;
                        }
                        numButton -= 1;
                        break;
                    case 'cancel':
                        this._cancelCallbackFunc = obj.callback;
                        this._btnCancel.visible = true;
                        if(obj.hide !== undefined) {
                            this._btnCancel.hideGui = obj.hide;
                        }else{
                            this._btnCancel.hideGui = true;
                        }
                        break;
                    case 'other':
                        this._otherCallbackFunc = obj.callback;
                        this._btnOther.visible = true;
                        if(obj.hide !== undefined) {
                            this._btnOther.hideGui = obj.hide;
                        }else{
                            this._btnOther.hideGui = true;
                        }
                        break;
                }
            }
            this._checkViewButton(numButton);
        }
    },

    resetViewButton: function () {
        this._btnClose.visible = false;
        this._btnClose.hideGui = true;

        this._btnOk.visible = false;
        this._btnOk.hideGui = true;

        this._btnCancel.visible = false;
        this._btnCancel.hideGui = true;

        this._btnOther.visible = false;
        this._btnOther.hideGui = true;
    },

    _checkViewButton: function (numButton) {
        if(numButton > 0) {
            var posInfo = this.BUTTON_POS[numButton];
            var index = 0;
            if(this._btnCancel.visible){
                this._btnCancel.x = posInfo[index].x;
                index++;
            }
            if(this._btnOk.visible){
                this._btnOk.x = posInfo[index].x;
                index++;
            }
            if(this._btnOther.visible){
                this._btnOther.x = posInfo[index].x;
            }
        }
    },

    updateContentSize: function (width, height) {
        var enableUpdate = width !== undefined || height !== undefined;
        if(enableUpdate) {
            if(width === undefined) {
                width = this.popupWidth;
            }
            if(height === undefined) {
                height = this.popupHeight;
            }
            enableUpdate = width != this.popupWidth || height != this.popupHeight;
            if(enableUpdate) {
                this.setContentSize(width, height);
            }
        }
    },

    onTouchUIEndEvent: function (sender) {
        switch (sender) {
            case this._btnClose:
                Utility.executeFunction(this._closeCallbackFunc);
                if(this._btnClose.hideGui) {
                    this.hideGui();
                }
                break;
            case this._btnOk:
                Utility.executeFunction(this._okCallbackFunc);
                if(this._btnOk.hideGui) {
                    this.hideGui();
                }
                break;
            case this._btnCancel:
                Utility.executeFunction(this._cancelCallbackFunc);
                if(this._btnCancel.hideGui) {
                    this.hideGui();
                }
                break;
            case this._btnOther:
                Utility.executeFunction(this._otherCallbackFunc);
                if(this._btnOther.hideGui) {
                    this.hideGui();
                }
                break;
        }
    },
    hideGui: function () {
        if(this.isShowGui()) {
            GV.SCENE_MGR.hideFog();
            this._super();
        }
    },
    isShowGui: function () {
        return this._rootNode.visible;
    }
});
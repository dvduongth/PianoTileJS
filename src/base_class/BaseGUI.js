var BaseGUI = cc.Node.extend({
    _className: "BaseGUI",
    ctor: function () {
        this._super();
        this.listListenerOnBaseGui = [];
        this.listBtnOnBaseGui = [];
        this.scaleRatio = 1;
        this.MAX_SIZE = 1;
    },

    getClassName: function () {
        return this._className;
    },

    syncAllChildren: function () {
        this._rootNode = this;
        this._rootNode.setCascadeOpacityEnabled(true);
        this._syncChildrenInNode(this._rootNode);
        this.enableAllActionPressedButton();
    },

    _syncChildrenInNode: function (node) {
        var allChildren = node.getChildren();

        if (allChildren === null || allChildren.length == 0) return;

        var nameChild;
        //cc.log("length",allChildren.length);
        for (var i = 0; i < allChildren.length; i++) {
            if(allChildren[i].width > this.MAX_SIZE) {
                this.MAX_SIZE = allChildren[i].width;
            }
            if(allChildren[i].height > this.MAX_SIZE) {
                this.MAX_SIZE = allChildren[i].height;
            }
            nameChild = allChildren[i].getName();
            //cc.log("_syncChildrenInNode",nameChild);
            if (nameChild && this[nameChild]) {
                if (nameChild.indexOf("btn") != -1) {
                    if(!this[nameChild].getTitleRenderer()) {
                        this[nameChild].setTitleText(" ");
                        var btnSize = this[nameChild]["contentSize"];
                        if(btnSize) {
                            this[nameChild].setContentSize(btnSize);
                        }
                    }
                    this[nameChild].setScale9Enabled(true);
                    this[nameChild].addTouchEventListener(this._onTouchUIEvent, this);
                    this[nameChild].setPressedActionEnabled(true);
                    this[nameChild].setZoomScale(-0.1);
                    this[nameChild].offsetChildPos = {x: 0, y: 0};
                    this.listBtnOnBaseGui.push(this[nameChild]);
                }
            }
            this._syncChildrenInNode(allChildren[i]);
        }
    },

    enableAllActionPressedButton: function(){
        for(var i = 0; i < this.listBtnOnBaseGui.length; i++){
            this.enableActionPressedButton(this.listBtnOnBaseGui[i]);
        }
    },
    disableAllActionPressedButton: function(){
        for(var i = 0; i < this.listBtnOnBaseGui.length; i++){
            this.disableActionPressedButton(this.listBtnOnBaseGui[i]);
        }
    },

    enableActionPressedButton: function(btn){
        var children = btn.getChildren();

        //if(children.length > 0 && children[0].name.indexOf("lb" == 0)){
        var titleRender = btn.getTitleRenderer();
        if(!titleRender) {
            cc.error("button is not exist title render");
            return null;
        }
        var titleSize = titleRender.getContentSize();
        var labelPos = titleRender.getPosition();
        labelPos.x -= titleSize.width * titleRender.anchorX;
        labelPos.y -= titleSize.height * titleRender.anchorY;
        for(var i = 0; i < children.length; i++){
            if(children[i] === undefined)
                continue;
            children[i].removeFromParent(false);
            var textPos = children[i].getPosition();
            titleRender.addChild(children[i]);
            btn.offsetChildPos = {
                x: - labelPos.x,
                y: - labelPos.y
            };
            children[i].setPosition(textPos.x - labelPos.x, textPos.y - labelPos.y);
        }
    },
    disableActionPressedButton: function(btn){
        var children = btn.getTitleRenderer().getChildren();
        //if(children.length > 0 && children[0].name.indexOf("lb" == 0)){
        for(var i = 0; i < children.length; i++){
            if(children[i] === undefined)
                continue;
            children[i].removeFromParent(false);
            var labelPos = btn.getTitleRenderer().getPosition();
            var textPos = children[i].getPosition();
            btn.addChild(children[i]);
            children[i].setPosition(textPos.x + labelPos.x, textPos.y + labelPos.y);
        }
    },

    _onTouchUIEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                this.onTouchUIBeganEvent(sender);
                break;
            case ccui.Widget.TOUCH_MOVED:
                this.onTouchUIMovedEvent(sender);
                break;
            case ccui.Widget.TOUCH_ENDED:
                this.onTouchUIEndEvent(sender);
                break;
            case ccui.Widget.TOUCH_CANCELED:
                this.onTouchUICancelEvent(sender);
                break;
        }
    },

    onTouchUIBeganEvent: function (sender) {
        // override me
    },

    onTouchUIMovedEvent: function (sender) {
        // override me
    },

    onTouchUIEndEvent: function (sender) {
        // override me
    },

    onTouchUICancelEvent: function (sender) {
        // override me
    },
    showGui: function (eff) {
        var SIZE_MAX = 917;
        if(this.MAX_SIZE > SIZE_MAX){
            this.MAX_SIZE = SIZE_MAX;
        }
        var SMALL_SCALE_TIME = 0.1;
        var BIG_SCALE_TIME = SMALL_SCALE_TIME * 0.75;
        var NORMAL_SCALE_TIME = BIG_SCALE_TIME * 0.75;

        var DELTA_BIG = 0.01 * SIZE_MAX / this.MAX_SIZE;
        var DELTA_SMALL = 0.01 * SIZE_MAX / this.MAX_SIZE;

        var that = this;
        if (eff) {
            this._rootNode.setScale(this.scaleRatio);
            this._rootNode.setCascadeOpacityEnabled(true);
            this._rootNode.setOpacity(0);
            this._rootNode.runAction(
                cc.spawn(
                    cc.sequence(
                        cc.scaleTo(BIG_SCALE_TIME, this.scaleRatio + DELTA_BIG, this.scaleRatio + DELTA_BIG),
                        cc.scaleTo(SMALL_SCALE_TIME, this.scaleRatio - DELTA_SMALL, this.scaleRatio - DELTA_SMALL),
                        cc.scaleTo(NORMAL_SCALE_TIME, this.scaleRatio, this.scaleRatio),
                        cc.callFunc(function (sender) {
                            that.finishEffectShowGui();
                        })
                    ),
                    cc.fadeIn(BIG_SCALE_TIME * 0.5)
                )
            )
        }
        else {
            this._rootNode.setScale(this.scaleRatio);
            this._rootNode.setOpacity(255);
        }
        this._rootNode.visible = true;
        GV.SCENE_MGR.updateParent(this._rootNode, GV.ZORDER_LEVEL.POPUP);
    },
    finishEffectShowGui: function () {
        /**override me**/

    },
    hideGui: function () {
        this._rootNode.visible = false;
        this.removeAllListenerOnBaseGui();
    },
    addListListenerOnBaseGui: function (listener) {
        this.listListenerOnBaseGui.push(listener);
    },
    removeAllListenerOnBaseGui: function () {
        for (var i = 0; i < this.listListenerOnBaseGui.length; i++) {
            if(this.listListenerOnBaseGui[i])
                cc.eventManager.removeListener(this.listListenerOnBaseGui[i]);
        }
        this.listListenerOnBaseGui.splice(0);
        this.listListenerOnBaseGui = [];
    }
});


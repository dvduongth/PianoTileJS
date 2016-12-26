var BaseScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        this.listListenerOnBaseScene = [];
        this.listBtnOnBaseScene = [];
        return true;
    },
    onEnter:function () {
        this._super();
    },
    onEnterTransitionDidFinish: function () {
        this._super();
    },
    onExit: function () {
        this.removeAllListenerOnBaseScene();
        this._super();
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
                    this.listBtnOnBaseScene.push(this[nameChild]);
                }
            }
            this._syncChildrenInNode(allChildren[i]);
        }
    },

    enableAllActionPressedButton: function(){
        for(var i = 0; i < this.listBtnOnBaseScene.length; i++){
            this.enableActionPressedButton(this.listBtnOnBaseScene[i]);
        }
    },
    disableAllActionPressedButton: function(){
        for(var i = 0; i < this.listBtnOnBaseScene.length; i++){
            this.disableActionPressedButton(this.listBtnOnBaseScene[i]);
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
    addListListenerOnBaseScene: function (listener) {
        this.listListenerOnBaseScene.push(listener);
    },
    removeAllListenerOnBaseScene: function () {
        for (var i = 0; i < this.listListenerOnBaseScene.length; i++) {
            if(this.listListenerOnBaseScene[i])
                cc.eventManager.removeListener(this.listListenerOnBaseScene[i]);
        }
        this.listListenerOnBaseScene.splice(0);
        this.listListenerOnBaseScene = [];
    }
});


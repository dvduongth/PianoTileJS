var TileMusicObject = cc.Node.extend({
    ctor: function () {
        this._super();
        //variables
        this._sprBg = null;
        this._sprIcon = null;
        this.data = null;
        this.type = GV.TILE_TYPE.UNDEFINED;
        this.isTouchSuccess = false;
        this.initDefault();
        return true;
    },
    initDefault: function () {
        this._sprBg = new cc.Sprite("#2.png");
        this.addChild(this._sprBg);
        this.updateBackgroundSize();
        this.addListenerForSprite();
    },
    initGui: function () {
        //update icon
        var url;
        switch (this.type) {
            case GV.TILE_TYPE.START:
                //url = res.tile_music_png;
                url = "#tile_black.png";
                break;
            case GV.TILE_TYPE.SHORT:
                //url = res.tile_music_png;
                url = "#tile_black.png";
                break;
            case GV.TILE_TYPE.NORMAL:
                url = "#tile_black.png";
                break;
            case GV.TILE_TYPE.LONG:
                url = "#tile_black.png";
                break;
            //case GV.TILE_TYPE.UNDEFINED:
            //    url = res.tile_music_undefined_png;
                //url = "#2.png";
                //break;
            default :
                return false;//type is null
        }
        this.createIcon(url);
    },
    createIcon: function (url) {
        if(!this._sprIcon) {
            this._sprIcon = new cc.Sprite(url);
            this._sprBg.addChild(this._sprIcon);
            this._sprIcon.attr({
                anchorX: 0.5,
                anchorY: 0.5,
                x: this._sprBg.getContentSize().width * 0.5,
                y: this._sprBg.getContentSize().height * 0.5
            });
        }
    },
    updateBackgroundSize: function () {
        this._sprBg["oldSize"] = this._sprBg.getContentSize();
        var delta = GV.WIN_SIZE.width / GV.NUM_COL - this._sprBg["oldSize"].width;
        this._sprBg.setContentSize(this._sprBg["oldSize"].width + delta, this._sprBg["oldSize"].height + delta);
    },
    addListenerForSprite: function () {
        var self = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                if(GV.END_GAME) {
                    return false;
                }
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    self.onTouchBeganUI(touch, event);
                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch, event) {
                self.onTouchMovedUI(touch, event);
            },
            onTouchEnded: function (touch, event) {
                self.onTouchEndedUI(touch, event);
            }
        });
        cc.eventManager.addListener(listener, this._sprBg);
    },
    getSize: function () {
        if(this._sprBg){
            return this._sprBg.getContentSize();
        }else{
            var spr = new cc.Sprite("#black.png");
            return spr.getContentSize();
        }
    },
    onTouchBeganUI: function (touch, event) {
        if(this.type == GV.TILE_TYPE.UNDEFINED) {
            cc.error("touch error, don't touch white tile");
            this.touchFail(touch, event);
        }else{
            this.touchSuccess(touch, event);
        }
    },
    onTouchMovedUI: function (touch, event) {
        cc.error("onTouchMovedUI");
    },
    onTouchEndedUI: function (touch, event) {
        cc.error("end");
    },
    /**
     * @param data with type
     * */
    setInfo: function(data) {
        if(!data) {
            cc.error("set info tile music object with null data");
            return null;
        }
        this.data = data;
        this.type = data.type;
        this.initGui();
    },
    touchFail: function (touch, event) {
        if(GV.END_GAME) {
            return false;
        }
        GV.SCENE_MGR._currentScene.gameOver();
        this.createIcon("#tile_miss.png");
        this.iconActionFocus();
    },
    touchSuccess: function (touch, event) {
        if(GV.END_GAME) {
            return false;
        }
        this.isTouchSuccess = true;
        if(this._sprIcon) {
            this._sprIcon.runAction(cc.sequence(
                cc.fadeOut(0.5),
                cc.callFunc(this._sprIcon.removeFromParent,this._sprIcon)
            ));
        }
    },

    actionFocusMiss: function () {
        if(this.type != GV.TILE_TYPE.UNDEFINED && !this.isTouchSuccess) {
            this.iconActionFocus();
        }
    },
    iconActionFocus: function () {
        if(this._sprIcon){
            var ACTION_TIME = 1;
            this._sprIcon.stopAllActions();
            this._sprIcon.runAction(cc.spawn(
                cc.sequence(
                    cc.scaleTo(ACTION_TIME * 0.35, 0.98),
                    cc.scaleTo(ACTION_TIME * 0.35, 1.02),
                    cc.scaleTo(ACTION_TIME * 0.3, 1)
                ),
                cc.sequence(
                    cc.fadeTo(ACTION_TIME * 0.5, 230),
                    cc.fadeTo(ACTION_TIME * 0.5, 255)
                )
            ).repeatForever());
        }
    },
    executeCallBack: function (cbFunc) {
        if (!cbFunc) {
            return null;
        }
        if (cbFunc.hasOwnProperty('caller')
            && cbFunc.hasOwnProperty('funcName')
            && cbFunc.hasOwnProperty('args')) {
            cbFunc.funcName.apply(cbFunc.caller, cbFunc.args);
            cbFunc = null;
        } else if (cbFunc instanceof Function) {
            cbFunc();
        } else {
            cc.error("execute call back with none type function");
        }
    }
});

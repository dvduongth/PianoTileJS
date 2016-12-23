var TileMusicObject = cc.Node.extend({
    ctor: function () {
        this._super();
        //variables
        this._sprBg = null;
        this._sprIcon = null;
        this.data = null;
        this.type = GV.TILE_TYPE.UNDEFINED;
        this.isTouchSuccess = false;
        this.margin = 0;
        this.initDefault();
        return true;
    },
    initDefault: function () {
        //this._sprBg = new cc.Scale9Sprite(cc.spriteFrameCache.getSpriteFrame("#2.png"));
        this._sprBg = new cc.Sprite("#2.png");
        this._sprBg.width = GV.WIN_SIZE.width / GV.NUM_COL - this.margin;
        this.addChild(this._sprBg);
    },
    initGui: function () {
        if(this.inited) {
            return null;
        }else{
            this.inited = true;
        }
        //update icon
        var url;
        switch (this.type) {
            case GV.TILE_TYPE.START:
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
            case GV.TILE_TYPE.UNDEFINED:
                url = "#tile_start.png";
                //url = res.tile_white_png;
                break;
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
            this._sprIcon.width = GV.WIN_SIZE.width / GV.NUM_COL - this.margin;
        }
    },
    updateTileSize: function (size,height) {
        var s;
        if(size.width !== undefined) {
            s = size;
        }else{
            s = cc.size(size, height);
        }
        this._sprBg.setContentSize(s);
        this._sprBg["oldSize"] = this._sprBg.getContentSize();
        //icon
        //if(this._sprIcon) {
            this._sprIcon.setContentSize(s);
            this._sprIcon.attr({
                anchorX: 0.5,
                anchorY: 0.5,
                x: s.width * 0.5,
                y: s.height * 0.5
            });
        //}
        //listener
        if(this.listenerSpr) {
            cc.eventManager.removeListener(this.listenerSpr);
            this.listenerSpr = null;
        }
        this.listenerSpr = this.addListenerForSprite(this._sprBg);

        //test
        var color;
        if(GV.C){
            color = "blue";
        }else{
            color = "red";
        }
        GV.C = !GV.C;
        var layer = new cc.LayerColor(Utility.getColorByName(color), s.width, s.height);
        layer.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0,
            y: 0,
            width: s.width,
            height: s.height
        });
        layer.setOpacity(100);
        this.addChild(layer,GV.ZORDER_LEVEL.CURSOR);
    },
    addListenerForSprite: function (obj) {
        var self = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                if(GV.MODULE_MGR._gameState == GV.GAME_STATE.END) {
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
        cc.eventManager.addListener(listener, obj);
    },
    getSize: function () {
        return this._sprBg.getContentSize();
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
        if(GV.MODULE_MGR._gameState == GV.GAME_STATE.END) {
            return false;
        }

        GV.SCENE_MGR._currentScene.gameOver();
        this.createIcon("#tile_miss.png");
        this.iconActionFocus();
    },
    touchSuccess: function (touch, event) {
        var self = this;
        if(GV.MODULE_MGR._gameState == GV.GAME_STATE.END) {
            return false;
        }
        this.isTouchSuccess = true;
        GV.MODULE_MGR._myInfo.curScore++;
        if(this._sprIcon) {
            this._sprIcon.runAction(cc.sequence(
                cc.fadeOut(0.5),
                cc.callFunc(function () {
                    self._sprIcon.removeFromParent(true);
                    self._sprIcon = null;
                })
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
    }
});

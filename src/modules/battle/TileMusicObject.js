var TileMusicObject = cc.Node.extend({
    ctor: function () {
        this._super();
        //variables
        this.listenerSpr = null;
        this._sprBg = null;
        this._sprIcon = null;
        this.data = null;
        this.type = GV.TILE_TYPE.UNDEFINED;
        this.isTouchSuccess = false;
        this.tileSize = cc.size(0, 0);
        this.listenerTag = 2017;
        return true;
    },
    initGui: function () {
        if (this.inited) {
            return null;
        } else {
            this.inited = true;
        }
        //update icon
        var urlIcon, urlBg;
        switch (this.type) {
            case GV.TILE_TYPE.START:
                urlBg = "#4.png";
                urlIcon = "#tile_black.png";
                break;
            case GV.TILE_TYPE.SHORT:
                urlBg = "#4.png";
                urlIcon = "#tile_black.png";
                break;
            case GV.TILE_TYPE.NORMAL:
                urlBg = "#4.png";
                urlIcon = "#tile_black.png";
                break;
            case GV.TILE_TYPE.LONG:
                urlBg = "#4.png";
                urlIcon = "#tile_black.png";
                break;
            case GV.TILE_TYPE.UNDEFINED:
                urlBg = res.tile_white_png;
                //urlIcon = res.tile_white_png;
                break;
            default :
                cc.error("create tile music with type null");
                return false;
        }
        if (urlBg) {
            this.createBackground(urlBg);
        }
        if (urlIcon) {
            this.createIcon(urlIcon);
        }
    },
    createBackground: function (url) {
        this._sprBg = new cc.Sprite(url);
        this.addChild(this._sprBg, GV.ZORDER_LEVEL.BG);
    },
    createIcon: function (url) {
        if (this._sprIcon) {
            this._sprIcon.removeFromParent(true);
            this._sprIcon = null;
        }
        this._sprIcon = new cc.Sprite(url);
        this.addChild(this._sprIcon, GV.ZORDER_LEVEL.GUI);
    },
    updateTileSize: function (size, height) {
        if (size === undefined) {
            size = cc.size(0, 0);
        }
        if (size.width !== undefined) {
            this.tileSize = size;
        } else {
            if (height === undefined) {
                height = 0;
            }
            this.tileSize = cc.size(size, height);
        }
        //update backgound view
        this.updateSpriteBackground();
        //update icon view
        this.updateSpriteIcon();
        //listener
        if (this.listenerSpr) {
            cc.eventManager.removeListener(this.listenerSpr);
            this.removeChildByTag(this.listenerTag);
            this.listenerSpr = null;
        }
        var layer = new cc.Layer();
        layer.attr({
            tag: this.listenerTag,
            anchorX: 0,
            anchorY: 0,
            x: -this.tileSize.width * 0.5,
            y: -this.tileSize.height * 0.5,
            width: this.tileSize.width,
            height: this.tileSize.height
        });
        this.addChild(layer, GV.ZORDER_LEVEL.CURSOR);
        this.listenerSpr = this.addListenerForTile(layer);
    },
    updateSpriteBackground: function () {
        if (this._sprBg) {
            var bgSize = this._sprBg.getContentSize();
            var delta_ratio_x = this.tileSize.width / bgSize.width;
            var delta_ratio_y = this.tileSize.height / bgSize.height;
            this._sprBg.setScale(delta_ratio_x, delta_ratio_y);
        }
    },
    updateSpriteIcon: function () {
        if (this._sprIcon) {
            var iconSize = this._sprIcon.getContentSize();
            var delta_ratio_x = this.tileSize.width / iconSize.width;
            var delta_ratio_y = this.tileSize.height / iconSize.height;
            this._sprIcon.setScale(delta_ratio_x, delta_ratio_y);
            this._sprIcon["oldScale"] = cc.p(delta_ratio_x, delta_ratio_y);
        }
    },
    addListenerForTile: function (obj) {
        var self = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                if (GV.MODULE_MGR._gameState == GV.GAME_STATE.END) {
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
        return this.tileSize;
    },
    onTouchBeganUI: function (touch, event) {
        if (this.type == GV.TILE_TYPE.UNDEFINED) {
            cc.error("touch error, don't touch white tile");
            this.touchFail(touch, event);
        } else {
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
    setInfo: function (data) {
        if (!data) {
            cc.error("set info tile music object with null data");
            return null;
        }
        this.data = data;
        this.type = data.type;
        this.initGui();
    },
    touchFail: function (touch, event) {
        if (GV.MODULE_MGR._gameState == GV.GAME_STATE.END) {
            return false;
        }

        GV.SCENE_MGR._currentScene.gameOver();
        this.createIcon("#tile_miss.png");
        this.updateSpriteIcon();
        this.iconActionFocus();
    },
    touchSuccess: function (touch, event) {
        var self = this;
        if (GV.MODULE_MGR._gameState == GV.GAME_STATE.END) {
            return false;
        }
        if(!this.isHidePopup){
            this.isHidePopup = true;
            GV.MODULE_MGR.guiStartBattle.hideGui();
        }
        GV.MODULE_MGR._gameState = GV.GAME_STATE.RUNNING;
        this.isTouchSuccess = true;
        GV.MODULE_MGR._myInfo.curScore++;
        if (this._sprIcon) {
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
        if (this.type != GV.TILE_TYPE.UNDEFINED && !this.isTouchSuccess) {
            this.iconActionFocus();
        }
    },
    iconActionFocus: function () {
        if (this._sprIcon) {
            var ACTION_TIME = 1;
            this._sprIcon.stopAllActions();
            var oldRatioScale = this._sprIcon["oldScale"];
            if (!oldRatioScale) {
                oldRatioScale = cc.p(1, 1);
            }
            var ratioX = oldRatioScale.x;
            var ratioY = oldRatioScale.y;
            this._sprIcon.runAction(cc.spawn(
                cc.sequence(
                    cc.scaleTo(ACTION_TIME * 0.35, ratioX - 0.02, ratioY - 0.02),
                    cc.scaleTo(ACTION_TIME * 0.35, ratioX + 0.02, ratioY + 0.02),
                    cc.scaleTo(ACTION_TIME * 0.3, ratioX, ratioY)
                ),
                cc.sequence(
                    cc.fadeTo(ACTION_TIME * 0.5, 230),
                    cc.fadeTo(ACTION_TIME * 0.5, 255)
                )
            ).repeatForever());
        }
    }
});

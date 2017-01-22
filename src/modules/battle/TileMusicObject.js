var TileMusicObject = cc.Node.extend({
    ctor: function () {
        this._super();
        //element gui
        this._sprBg = null;
        this._sprIcon = null;
        this._sprTouchLong = null;
        //variables
        this.listenerSpr = null;
        this.data = null;
        this.type = GV.TILE_TYPE.UNDEFINED;
        this.isTouchSuccess = false;
        this.tileSize = cc.size(0, 0);
        this.listenerTag = 2017;
        this._isRequireScale = true;
        this.extraScore = 0;
        this.getExtraScore = 0;
        this.deltaTouchPosY = 90;
        this.listDotScore = [];
        return true;
    },
    initGui: function () {
        if (this.inited) {
            return null;
        } else {
            this.inited = true;
        }
        //update background
        this.updateBackground();
        //update icon
        this.updateIcon();
    },
    updateBackground: function () {
        var urlBg;
        urlBg = "#4.png";
        switch (this.type) {
            case GV.TILE_TYPE.UNDEFINED:
                urlBg = res.tile_white_png;
                break;
        }
        this.createBackground(urlBg);
    },
    updateIcon: function () {
        this._isRequireScale = false;
        var urlIcon;
        switch (this.type) {
            case GV.TILE_TYPE.UNDEFINED:
                this._isRequireScale = true;
                break;
            case GV.TILE_TYPE.START:
                cc.log("tile start here");
                urlIcon = "#tile_start.png";
                this._isRequireScale = true;
                break;
            case GV.TILE_TYPE.SHORT:
                cc.log("tile short here");
                urlIcon = "#tile_black.png";
                this._isRequireScale = true;
                break;
            case GV.TILE_TYPE.NORMAL:
                cc.log("tile normal here");
                urlIcon = "#long_head.png";
                this.extraScore = 2;
                break;
            case GV.TILE_TYPE.LONG:
                cc.log("tile long here");
                urlIcon = "#long_head.png";
                this.extraScore = 3;
                break;
            /*case GV.TILE_TYPE.abc:
                cc.log("loại nốt gì đó ở đây");
                urlIcon = "#long_head.png";//nếu k muốn đổi ảnh thì dùng luôn urlIcon này
                this.extraScore = 3;//thay đổi số dot có trong 1 nốt nhạc
                break;
            */
            default :
                cc.error("create tile music with type null");
                return false;
        }
        if (urlIcon) {
            this.createIcon(urlIcon);
            if (this.type == GV.TILE_TYPE.START) {
                this.showTextStart();
            }
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
        if (!this._isRequireScale) {
            var minRect = cc.rect(0, 0, this._sprIcon.width * 0.5, this._sprIcon.height * 0.5);
            var offsetRect = cc.rect(10, 10, 10, 10);
            this._sprIcon = new cc.Scale9Sprite(this._sprIcon.getSpriteFrame(), minRect, offsetRect);
        }
        if(this.extraScore >= 2) {
            this.createLongTileLightIcon();
        }
        this.addChild(this._sprIcon, GV.ZORDER_LEVEL.GUI);
    },
    showTextStart: function () {
        if(this._sprIcon && this.type != GV.TILE_TYPE.UNDEFINED) {
            this.lbStart = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 70, Utility.getColorByName('white'), true, true);
            this.lbStart.setString("START");
            this._sprIcon.addChild(this.lbStart, GV.ZORDER_LEVEL.POPUP);
            this.lbStart.attr({
                anchorX: 0.5,
                anchorY: 0.5,
                x: this._sprIcon.width * 0.5,
                y: this._sprIcon.height * 0.5
            });
        }
    },
    createLongTileLightIcon: function () {
        this._sprLongTileLight = new cc.Sprite("#black.png");
        this.addChild(this._sprLongTileLight, this._sprIcon.getLocalZOrder() - 1);
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
        this.updateSpriteBackgroundSize();
        //update icon view
        this.updateSpriteIconSize();
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
    updateSpriteBackgroundSize: function () {
        if (this._sprBg) {
            var bgSize = this._sprBg.getContentSize();
            var delta_ratio_x = this.tileSize.width / bgSize.width;
            var delta_ratio_y = this.tileSize.height / bgSize.height;
            this._sprBg.setScale(delta_ratio_x, delta_ratio_y);
        }
    },
    updateSpriteIconSize: function () {
        if (this._sprIcon) {
            if (this._isRequireScale) {
                var iconSize = this._sprIcon.getContentSize();
                var delta_ratio_x = this.tileSize.width / iconSize.width;
                var delta_ratio_y = this.tileSize.height / iconSize.height;
                this._sprIcon.setScale(delta_ratio_x, delta_ratio_y);
                this._sprIcon["oldScale"] = cc.p(delta_ratio_x, delta_ratio_y);
            } else {
                this._sprIcon.setContentSize(this.tileSize);
                this.updateSpriteLongTileLightSize();
            }
        }
    },
    updateSpriteLongTileLightSize: function () {
        if (this._sprLongTileLight) {
            var iconSize = this._sprLongTileLight.getContentSize();
            var delta_ratio_x = this.tileSize.width / iconSize.width;
            var delta_ratio_y = this.tileSize.height / iconSize.height;
            this._sprLongTileLight.setScale(delta_ratio_x, delta_ratio_y);
            this._sprLongTileLight["oldScale"] = cc.p(delta_ratio_x, delta_ratio_y);
        }
    },
    addListenerForTile: function (obj) {
        var self = this;
        this.listener = cc.EventListener.create({
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
                    return self.onTouchBeganUI(touch, event);
                    //return true;
                }
                return false;
            },
            onTouchMoved: function (touch, event) {
                self.onTouchMovedUI(touch, event);
            },
            onTouchEnded: function (touch, event) {
                self.onTouchEndedUI(touch, event);
                cc.eventManager.removeListener(self.listener);
            }
        });
        cc.eventManager.addListener(this.listener, obj);
    },
    getSize: function () {
        return this.tileSize;
    },
    onTouchBeganUI: function (touch, event) {
        this.isTouching = true;
        //update parent local zOrder
        var parent = this.getParent();
        if (parent) {
            parent.setLocalZOrder(parent.getLocalZOrder() + 1);
        }
        //set action touch
        if (this.type == GV.TILE_TYPE.UNDEFINED) {
            return this.touchFail(touch, event);
        } else {
            return this.touchSuccess(touch, event);
        }
    },
    onTouchMovedUI: function (touch, event) {
        cc.log("touch move");
    },
    onTouchEndedUI: function (touch, event) {
        this.isTouching = false;
        this.increaseMyScore(this.getExtraScore);
        this.getExtraScore = 0;
        cc.log("touch end end");
        if(this._sprTouchSuccess) {
            this._sprTouchSuccess.removeFromParent(true);
            this._sprTouchSuccess = null;
        }
    },
    /**
     * @param data with type
     * @param isShowStartText
     * */
    setInfo: function (data,isShowStartText) {
        if (!data) {
            cc.error("set info tile music object with null data");
            return null;
        }
        this.data = data;
        this.type = data.type;
        this.initGui();
        if(isShowStartText) {
            this.showTextStart();
        }
    },
    touchFail: function (touch, event) {
        if (GV.MODULE_MGR._gameState == GV.GAME_STATE.END || GV.MODULE_MGR._gameState == GV.GAME_STATE.START) {
            return false;
        }
        cc.error("touch fail, don't touch white tile");
        GV.SCENE_MGR._currentScene.gameOver();
        this.createIcon("#tile_miss.png");
        this.updateSpriteIconSize();
        this.iconActionFocus(true);
        return true;
    },
    touchSuccess: function (touch, event) {
        if (GV.MODULE_MGR._gameState == GV.GAME_STATE.END) {
            return false;
        }
        if (GV.MODULE_MGR._gameState == GV.GAME_STATE.START) {
            if (this.type != GV.TILE_TYPE.START && !this.lbStart) {
                return false;
            }
        }
        //hide text start
        if(this.lbStart) {
            this.lbStart.removeFromParent(true);
            this.lbStart = null;
        }
        //hide bottom info if has
        if (GV.MODULE_MGR.guiStartBattle.isShowGui()) {
            GV.MODULE_MGR.guiStartBattle.hideGui();
        }
        //update game state
        GV.MODULE_MGR._gameState = GV.GAME_STATE.RUNNING;
        GV.SCENE_MGR.getCurrentScene().isRequireUpStar = true;
        this.isTouchSuccess = true;
        //increase score
        this.increaseMyScore(1);
        //update icon action
        if (this.extraScore >= 2) {
            this.createEffectTouchLong(touch, event);
        } else {
            this.fadeOutIcon();
        }
        this.actionTouchSuccess(touch, event);
        return true;
    },
    actionTouchSuccess: function (touch, event) {
        var ACTION_TIME = 0.05;
        if(this._sprTouchSuccess) {
            this._sprTouchSuccess.removeFromParent(true);
            this._sprTouchSuccess = null;
        }
        this._sprTouchSuccess = new cc.Sprite(res.crazy_circle_png);
        this.addChild(this._sprTouchSuccess, GV.ZORDER_LEVEL.CURSOR);
        var target = event.getCurrentTarget();
        var locationInNode = this.convertToNodeSpace(touch.getLocation());
        this._sprTouchSuccess.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: locationInNode.x,
            y: locationInNode.y + this._sprTouchSuccess.height * 0.2
        });
        //this._sprTouchSuccess.setScale(0);
        this._sprTouchSuccess.setOpacity(0);
        this._sprTouchSuccess.setScale(0.5);
        this._sprTouchSuccess.runAction(cc.sequence(
            cc.spawn(
                cc.fadeTo(ACTION_TIME,100),
                cc.scaleTo(ACTION_TIME,1)
            ),
            cc.callFunc(function () {
                this._sprTouchSuccess.removeFromParent(true);
                this._sprTouchSuccess = null;
            }.bind(this))
        ));
    },
    increaseMyScore: function (num) {
        if(GV.MODULE_MGR._gameMode == GV.GAME_MODE.AUTO) {
            //cc.log("increaseMyScore with mode game auto play");
            return 0;
        }
        if (!num) {
            num = 0;
        }
        GV.MODULE_MGR._myInfo.curScore += num;
    },
    fadeOutIcon: function () {
        if (this._sprIcon) {
            var timeFadeOut = 0.2;
            this._sprIcon.runAction(cc.sequence(
                cc.fadeOut(timeFadeOut),
                cc.callFunc(function () {
                    this._sprIcon.removeFromParent(true);
                    this._sprIcon = null;
                }.bind(this))
            ));
        }
    },
    createEffectTouchLong: function (touch, event) {
        var minHeight = 50;
        var minRect = cc.rect(minHeight, minHeight, minHeight, this.getSize().width);
        var offsetRect = cc.rect(minHeight, minHeight, minHeight, minHeight);
        this._sprTouchLong = new cc.Scale9Sprite((new cc.Sprite("#long_light.png")).getSpriteFrame(), minRect, offsetRect);
        this.addChild(this._sprTouchLong, GV.ZORDER_LEVEL.EFFECT);
        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        this._sprTouchLong.attr({
            anchorX: 0.5,
            anchorY: 1,
            x: 0,
            width: this.getSize().width
        });
        var h = locationInNode.y + this.deltaTouchPosY;
        if (h < minHeight) {
            h = minHeight;
        } else if (h > this.getSize().height) {
            h = this.getSize().height;
        }
        this._sprTouchLong.height = h;
        this._sprTouchLong.y = h - this.getSize().height * 0.5;
        this.createDotScore();
    },

    createDotScore: function () {
        this.clearSpriteDot();
        var space = this.getSize().height / (this.extraScore + 1);
        for (var i = 1; i <= this.extraScore; ++i) {
            var sprDot = new cc.Sprite("#dot.png");
            this.addChild(sprDot, this._sprTouchLong.getLocalZOrder() + 1);
            sprDot.attr({
                anchorX: 0.5,
                anchorY: 0.5,
                x: 0,
                y: space * (i + 0.5) - this.getSize().height * 0.5
            });
            //sprDot.setBlendFunc(cc.ONE, cc.ONE);
            this.listDotScore.push(sprDot);
        }
    },
    clearSpriteDot: function () {
        var len = this.listDotScore.length;
        for (var i = 0; i < len; ++i) {
            var sprDot = this.listDotScore[i];
            if (sprDot) {
                sprDot.removeFromParent(true);
            }
        }
        this.listDotScore.splice(0);
        this.listDotScore = [];
    },

    updateTouchLong: function (dt) {
        if (this._sprTouchLong && this.isTouching && this._sprIcon) {
            this._sprTouchLong.y += GV.SCENE_MGR.getCurrentScene().curSpeed;
            this._sprTouchLong.height += GV.SCENE_MGR.getCurrentScene().curSpeed;
            if (this._sprTouchLong.height >= this.getSize().height) {
                this._sprIcon.removeFromParent(true);
                this._sprIcon = null;
                this._sprTouchLong.removeFromParent(true);
                this._sprTouchLong = null;
                this._sprLongTileLight.removeFromParent(true);
                this._sprLongTileLight = null;
                this.clearSpriteDot();
                //show effect add score
                this.showEffectScoreAddMore(this.extraScore);
            } else {
                var len = this.listDotScore.length;
                var deltaGet = 20;
                for (var i = 0; i < len; ++i) {
                    var sprDot = this.listDotScore[i];
                    if (sprDot) {
                        if(sprDot.actionState == GV.ACTION_STATE.RUNNING) {
                            sprDot.y += GV.SCENE_MGR.getCurrentScene().curSpeed;
                        }
                        if (sprDot.y <= (this._sprTouchLong.y + deltaGet)) {
                            this.actionDot(sprDot.y >= (this._sprTouchLong.y - deltaGet), sprDot, i);
                        }
                    }
                }
            }
        }
    },
    actionDot: function (isGet, sprDot, i) {
        this.getExtraScore++;
        if (isGet) {
            if(sprDot.actionState != GV.ACTION_STATE.RUNNING) {
                sprDot.actionState = GV.ACTION_STATE.RUNNING;
                sprDot.setTexture(res.dot_light_png);
                var actionTime = 0.1;
                var animation = new cc.Animation();
                animation.addSpriteFrameWithFile(res.circle_light_png);
                animation.addSpriteFrameWithFile(res.glow_png);
                animation.setDelayPerUnit(actionTime * 0.5);
                animation.setRestoreOriginalFrame(true);
                var action = cc.animate(animation);
                //run action
                sprDot.setCascadeOpacityEnabled(true);
                sprDot.runAction(cc.sequence(
                    action,
                    cc.callFunc(function () {
                        sprDot.removeFromParent(true);
                        //clear data
                        this.listDotScore[i] = null;
                        this.listDotScore.splice(i, 1);
                    }.bind(this))
                ));
                this.actionGetDot();
            }
        } else {
            sprDot.removeFromParent(true);
            //clear data
            this.listDotScore[i] = null;
            this.listDotScore.splice(i, 1);
        }
    },
    /**
     * to do action get dot here
     * */
    actionGetDot: function () {

    },

    actionFocusMiss: function () {
        if (this.type != GV.TILE_TYPE.UNDEFINED && !this.isTouchSuccess) {
            this.iconActionFocus();
        }
    },
    iconActionFocus: function (eff) {
        if (this._sprIcon) {
            var ACTION_TIME = 1;
            this._sprIcon.stopAllActions();
            this._sprIcon.runAction(cc.sequence(
                cc.blink(ACTION_TIME, 3).repeat(3),
                cc.callFunc(function () {
                    if (eff) {
                        this._sprIcon.removeFromParent(true);
                        this._sprIcon = null;
                    }
                }.bind(this))
            ));
        }
    },
    showEffectScoreAddMore: function (score) {
        var lbScoreExtra = Utility.getLabel(res.FONT_ARIAL, 50, Utility.getColorByName("sky_blue"), true);
        lbScoreExtra.setString("+" + Utility.numToStr(score));
        lbScoreExtra.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0,
            y: this.getSize().height * 0.5 + lbScoreExtra.height + this.deltaTouchPosY * 0.5
        });
        lbScoreExtra.runAction(Utility.getActionScaleForAppear(lbScoreExtra, function () {
            lbScoreExtra.runAction(cc.sequence(
                cc.delayTime(0.2),
                cc.fadeOut(0.3)
            ));
        }.bind(this)));
        this.addChild(lbScoreExtra, GV.ZORDER_LEVEL.EFFECT);
    }
});

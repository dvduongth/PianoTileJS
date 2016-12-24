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
        this.extraScore = 3;
        this.deltaTouchPosY = 50;
        this.listDotScore = [];
        return true;
    },
    initGui: function () {
        if (this.inited) {
            return null;
        } else {
            this.inited = true;
        }
        //update icon
        this._isRequireScale = true;
        var urlIcon, urlBg;
        urlBg = "#4.png";
        switch (this.type) {
            case GV.TILE_TYPE.START:
                cc.error("tile start here");
                urlIcon = "#tile_start.png";
                break;
            case GV.TILE_TYPE.SHORT:
                cc.error("tile short here");
                urlIcon = "#tile_black.png";
                break;
            case GV.TILE_TYPE.NORMAL:
                cc.error("tile normal here");
                urlIcon = "#long_head.png";
                this._isRequireScale = false;
                this.extraScore = 2;
                break;
            case GV.TILE_TYPE.LONG:
                cc.error("tile long here");
                urlIcon = "#long_head.png";
                this._isRequireScale = false;
                this.extraScore = 3;
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
        if(!this._isRequireScale) {
            var minRect = cc.rect(0,0,this._sprIcon.width * 0.5,this._sprIcon.height * 0.5);
            var offsetRect = cc.rect(10,10,10,10);
            this._sprIcon = new cc.Scale9Sprite(this._sprIcon.getSpriteFrame(),minRect,offsetRect);
            this.createLongTileLightIcon();
        }
        this.addChild(this._sprIcon, GV.ZORDER_LEVEL.GUI);
        if(this.type == GV.TILE_TYPE.START) {
            var lbStart = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 70,Utility.getColorByName('white'),true,true);
            lbStart.setString("START");
            this._sprIcon.addChild(lbStart,GV.ZORDER_LEVEL.GUI);
            lbStart.attr({
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
            if(this._isRequireScale) {
                var iconSize = this._sprIcon.getContentSize();
                var delta_ratio_x = this.tileSize.width / iconSize.width;
                var delta_ratio_y = this.tileSize.height / iconSize.height;
                this._sprIcon.setScale(delta_ratio_x, delta_ratio_y);
                this._sprIcon["oldScale"] = cc.p(delta_ratio_x, delta_ratio_y);
            }else{
                this._sprIcon.setContentSize(this.tileSize);
                this.updateSpriteLongTileLightSize();
            }
        }
    },
    updateSpriteLongTileLightSize: function () {
        if(this._sprLongTileLight) {
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
        if(parent) {
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
        cc.error("touch move");
    },
    onTouchEndedUI: function (touch, event) {
        this.isTouching = false;
        cc.error("touch end end");
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
        if (GV.MODULE_MGR._gameState == GV.GAME_STATE.END || GV.MODULE_MGR._gameState == GV.GAME_STATE.START) {
            return false;
        }
        cc.error("touch error, don't touch white tile");
        GV.SCENE_MGR._currentScene.gameOver();
        this.createIcon("#tile_miss.png");
        this.updateSpriteIconSize();
        this.iconActionFocus();
		return true;
    },
    touchSuccess: function (touch, event) {
        if (GV.MODULE_MGR._gameState == GV.GAME_STATE.END) {
            return false;
        }
        if (GV.MODULE_MGR._gameState == GV.GAME_STATE.START) {
            if (this.type != GV.TILE_TYPE.START) {
                return false;
            }
        }
        //hide bottom info if has
        if(!this.isHidePopup){
            this.isHidePopup = true;
            GV.MODULE_MGR.guiStartBattle.hideGui();
        }
        //update game state
        GV.MODULE_MGR._gameState = GV.GAME_STATE.RUNNING;
        GV.SCENE_MGR.getCurrentScene().isRequireUpSpeed = true;
        this.isTouchSuccess = true;
        //increase score
        GV.MODULE_MGR._myInfo.curScore++;
        //update icon action
        if(this.type == GV.TILE_TYPE.NORMAL || this.type == GV.TILE_TYPE.LONG) {
            this.createEffectTouchLong(touch, event);
        }else{
            this.fadeOutIcon();
        }
		return true;
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
        var minRect = cc.rect(minHeight,minHeight,minHeight,this.getSize().width);
        var offsetRect = cc.rect(minHeight,minHeight,minHeight,minHeight);
        this._sprTouchLong = new cc.Scale9Sprite((new cc.Sprite("#long_light.png")).getSpriteFrame(),minRect,offsetRect);
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
        if(h < minHeight) {
            h = minHeight;
        }else if(h > this.getSize().height) {
            h = this.getSize().height;
        }
        this._sprTouchLong.height = h;
        this._sprTouchLong.y = h - this.getSize().height * 0.5;
        this.createDotScore();
    },

    createDotScore: function () {
        this.clearSpriteDot();
        var space = this.getSize().height * 0.5 / this.extraScore;
        for(var i = 0; i < this.extraScore; ++i) {
            var sprDot = new cc.Sprite("#dot.png");
            this.addChild(sprDot, this._sprTouchLong.getLocalZOrder() + 1);
            sprDot.attr({
                anchorX: 0.5,
                anchorY: 0.5,
                x: 0,
                y: space * i
            });
            sprDot.setBlendFunc(cc.ONE, cc.ONE);
            this.listDotScore.push(sprDot);
        }
    },
    clearSpriteDot: function () {
        var len = this.listDotScore.length;
        for(var i = 0; i < len; ++i) {
            var sprDot = this.listDotScore[i];
            if(sprDot) {
                sprDot.removeFromParent(true);
            }
        }
        this.listDotScore.splice(0);
        this.listDotScore = [];
    },

    updateTouchLong: function (dt) {
        if(this._sprTouchLong && this.isTouching) {
            this._sprTouchLong.y += GV.SCENE_MGR.getCurrentScene().curSpeed;
            this._sprTouchLong.height += GV.SCENE_MGR.getCurrentScene().curSpeed;
            if(this._sprTouchLong.height >= this.getSize().height) {
                this._sprIcon.removeFromParent(true);
                this._sprIcon = null;
                this._sprTouchLong.removeFromParent(true);
                this._sprTouchLong = null;
                this._sprLongTileLight.removeFromParent(true);
                this._sprLongTileLight = null;
                this.clearSpriteDot();
                //show effect add score
                this.showEffectScoreAddMore(this.extraScore);
            }else{
                var len = this.listDotScore.length;
                for(var i = 0; i < len; ++i) {
                    var sprDot = this.listDotScore[i];
                    if(sprDot) {
                        if(sprDot.y <= this._sprTouchLong.y){
                            var actionTime = 0.2;
                            sprDot.runAction(cc.sequence(
                                cc.scaleTo(actionTime,6),
                                cc.fadeOut(actionTime * 0.5),
                                cc.callFunc(sprDot.removeFromParent,sprDot)
                            ));
                            this.listDotScore[i] = null;
                            this.listDotScore.splice(i, 1);
                        }
                    }
                }
            }
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
            this._sprIcon.runAction(cc.blink(ACTION_TIME,3).repeatForever());
        }
    },
    showEffectScoreAddMore: function (score) {
        var lbScoreExtra = Utility.getLabel(res.FONT_ARIAL, 50, Utility.getColorByName("text_green"),true);
        lbScoreExtra.setString("+" + Utility.numToStr(score));
        lbScoreExtra.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0,
            y: this.getSize().height * 0.5 + lbScoreExtra.height + this.deltaTouchPosY * 0.5
        });
        lbScoreExtra.runAction(Utility.getActionScaleForAppear(lbScoreExtra, function () {
            GV.MODULE_MGR._myInfo.curScore += score;
            lbScoreExtra.runAction(cc.sequence(
                cc.delayTime(0.2),
                cc.fadeOut(0.3)
            ));
        }.bind(this)));
        this.addChild(lbScoreExtra, GV.ZORDER_LEVEL.EFFECT);
    }
});

var SceneBattle = BaseScene.extend({
    ctor: function () {
        this._super();
        //element gui
        this._sprBg = null;
        //variables
        this.curScore = 0;
        this.count_time = 0;
        this.listConfigData = [];
        this.listCloneConfigData = [];
        this.list_node_music = [];
        this.marginTop = 0;
        this.createStartState = false;
        this.isRequireUpSpeed = false;
        this.starLevel = 0;
        this.upSpeedDelta = 1;
        this.moveSpeed = GV.MOVE_SPEED;
        this.curSpeed = this.moveSpeed;
        this.distanceUpStar = GV.DISTANCE_UP_STAR_LEVEL;
        this.listStar = [];
        this.initGui();
        return true;
    },
    initGui: function () {
        //background
        this.createBackground();
        //label score
        this.createTextScore();
        //node star
        this.createNodeStar();
        //set schedule update
        this.schedule(this.update);
    },
    /**
     * purpose to get list config row
     * each row: contain list_type
     * each list_type: contain type and index
     * eg: list_type = [
     *                  {"index": 0, "type": GV.TILE_TYPE.SHORT}
     *                  ,
     *                  {"index": 3, "type": GV.TILE_TYPE.SHORT},
     *                  ... more here
     *                  ]
     * */
    loadConfigData: function () {
        var len = this.listConfigData.length;
        if(len > 0) {
            this.listConfigData.splice(0);
            this.listConfigData = [];
        }
        len = GV.DISTANCE_UP_STAR_LEVEL;//suppose config has GV.DISTANCE_UP_STAR_LEVEL row
        for(var r = 0; r < len; ++r) {
            var numTile = 1;//each row has numTile without white tile
            var list_type = [];
            if (r == 0) {
                //push info into list
                var startInfo = {
                    "type": GV.TILE_TYPE.START,
                    "index": Math.floor(4 * Math.random())
                };
                list_type.push(startInfo);
            } else {
                for (var i = 0; i < numTile; ++i) {
                    var type, index;
                    var rd1 = Math.random();
                    var rd2 = Math.random();
                    //type
                    if (rd1 > 0.6) {
                        type = GV.TILE_TYPE.LONG;
                    } else if (rd1 > 0.3) {
                        type = GV.TILE_TYPE.NORMAL;
                    } else {
                        type = GV.TILE_TYPE.SHORT;
                    }
                    //index
                    if (rd2 > 0.75) {
                        index = 3;
                    } else if (rd2 > 0.5) {
                        index = 2;
                    } else if (rd2 > 0.25) {
                        index = 1;
                    } else {
                        index = 0;
                    }
                    //push info into list
                    var info = {
                        "type": type,
                        "index": index
                    };
                    list_type.push(info);
                }
            }
            this.listConfigData.push(list_type);
        }
    },
    /**
     * clone data to support info for show gui
     * */
    cloneDataFromListDataConfig: function (skipFirstData) {
        if(!this.listConfigData) {
            cc.error("config data is not exist");
            return null;
        }
        var len = this.listCloneConfigData.length;
        if(len > 0) {
            this.listCloneConfigData.splice(0);
            this.listCloneConfigData = [];
        }
        len = this.listConfigData.length;
        var i = skipFirstData ? 1 : 0;
        for(; i < len; ++i) {
            this.listCloneConfigData.push(this.listConfigData[i]);
        }
    },
    createBackground: function () {
        //background
        this._sprBg = new cc.Sprite(res.battle_background_png);
        this.addChild(this._sprBg, GV.ZORDER_LEVEL.BG);
        this._sprBg.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: GV.WIN_SIZE.width / 2,
            y: GV.WIN_SIZE.height / 2
        });
        var bgSize = this._sprBg.getContentSize();
        var delta_ratio_x = GV.WIN_SIZE.width / bgSize.width;
        var delta_ratio_y = GV.WIN_SIZE.height / bgSize.height;
        this._sprBg.setScale(delta_ratio_x, delta_ratio_y);
    },
    createEffectBall: function () {
        //effect ball
        if(!this._sprEffectBall) {
            this._sprEffectBall = new cc.Sprite(res.ball_small_dot_png);
            this.addChild(this._sprEffectBall, GV.ZORDER_LEVEL.BG);
            this._sprEffectBall.setBlendFunc(cc.ONE, cc.ONE);
            this._sprEffectBall.attr({
                anchorX: 0.5,
                anchorY: 0.5,
                x: GV.WIN_SIZE.width / 2,
                y: GV.WIN_SIZE.height / 2
            });
            var ballSize = this._sprEffectBall.getContentSize();
            //var delta_ratio_x = GV.WIN_SIZE.width / ballSize.width;
            var delta_ratio_y = GV.WIN_SIZE.height / ballSize.height;
            this._sprEffectBall.setScale(delta_ratio_y);
            this._sprEffectBall["oldScale"] = cc.p(delta_ratio_y,delta_ratio_y);
        }else{
            this._sprEffectBall.stopAllActions();
        }
        this._sprEffectBall.runAction(cc.rotateBy(1, -10).repeatForever());
    },
    createTextScore: function () {
        var fontSize = Math.floor(GV.WIN_SIZE.height * 0.1);
        this._lbScore = Utility.getLabel(res.FONT_FUTURA_CONDENSED, fontSize, Utility.getColorByName("red"));
        this._lbScore.setString(Utility.numToStr(this.curScore));
        this.addChild(this._lbScore, GV.ZORDER_LEVEL.EFFECT);
        this._lbScore.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: GV.WIN_SIZE.width >> 1,
            y: GV.WIN_SIZE.height - fontSize
        });
    },
    createNodeStar: function () {
        this._ndStar = new cc.Node();
        this.addChild(this._ndStar, GV.ZORDER_LEVEL.EFFECT);
        this._ndStar.attr({
            x: GV.WIN_SIZE.width >> 1,
            y: GV.WIN_SIZE.height * 7 / 8
        });
    },
    createListNodeMusic: function () {
        var len = this.list_node_music.length;
        for (var i = 0; i < len; ++i) {
            if (this.list_node_music[i]) {
                this.list_node_music[i].removeFromParent(true);
            }
        }
        this.list_node_music.splice(0);
        this.list_node_music = [];
        this.nextRow();
    },
    nextRow: function () {
        var rowNodeMusic = new RowNodeMusic();
        this.addChild(rowNodeMusic, GV.ZORDER_LEVEL.GUI);
        this.list_node_music.push(rowNodeMusic);
        if(this.listCloneConfigData.length <= 0) {
            this.cloneDataFromListDataConfig(true);
        }
        rowNodeMusic.setInfo({"list_type": this.listCloneConfigData[0]});
        this.listCloneConfigData.splice(0, 1);
        rowNodeMusic.attr({
            x: GV.WIN_SIZE.width * 0.5,
            y: GV.WIN_SIZE.height + rowNodeMusic.getRowHeight() * 0.5
        });
    },
    deleteDownRow: function () {
        if (this.list_node_music.length > 0) {
            var nodeMusic = this.list_node_music[0];
            if (nodeMusic.checkMissActionTouch()) {
                cc.error("miss action");
                this.actionFocusRowMiss();
                this.gameOver();
            } else {
                nodeMusic.removeFromParent(true);
                this.list_node_music.splice(0, 1);
            }
        }
    },
    gameOver: function () {
        GV.MODULE_MGR.endGame();
    },
    actionFocusRowMiss: function () {
        var len = this.list_node_music.length;
        if (len > 0) {
            var upHeight;
            if (this.list_node_music[0]) {
                upHeight = this.list_node_music[0].getRowHeight();
            }
            for (var i = 0; i < len; ++i) {
                var cb;
                var row = this.list_node_music[i];
                if (row) {
                    if (i == 0) {
                        cb = {
                            "caller": row,
                            "funcName": row.runActionFocusMissElement,
                            "args": []
                        };
                    }
                    row.runActionUpAHeight(upHeight, cb);
                }
            }
        }
    },
    calculateTotalTileRowHeight: function () {
        var result = 0;
        var len = this.list_node_music.length;
        for (var i = 0; i < len; ++i) {
            if (this.list_node_music[i]) {
                result += this.list_node_music[i].getRowHeight();
            }
        }
        return result;
    },
    createStartGameState: function () {
        this.cloneDataFromListDataConfig();
        //show game info
        GV.MODULE_MGR.showGuiStartBattle();
        var minPos = GV.MODULE_MGR.guiStartBattle.getGuiHeight();
        GV.MODULE_MGR._gameState = GV.GAME_STATE.START;
        this.createStartState = false;
        //create row tile
        var totalHeightMax = GV.WIN_SIZE.height - minPos;
        this.createListNodeMusic();
        var totalTileHeight = this.calculateTotalTileRowHeight();
        while (totalTileHeight < totalHeightMax) {
            this.nextRow();
            totalTileHeight += this.list_node_music[this.list_node_music.length - 1].getRowHeight();
        }
        //update view row tile position
        var posY = minPos;
        posY = posY + this.list_node_music[0].getRowHeight() * 0.5;
        this.list_node_music[0].y = posY;
        this.followFirstRow();
    },
    continuePlayGame: function () {
        GV.MODULE_MGR._gameState = GV.GAME_STATE.START;
        //reset state
        var len = this.list_node_music.length;
        var showTextStart = !this.list_node_music[0].isTouchTileSuccess();
        for(var i = 0; i < len; ++i) {
            var nd = this.list_node_music[i];
            if(nd) {
                if(showTextStart) {
                    nd.setInfo(nd.getInfo(), i == 0);
                }else{
                    showTextStart = !nd.isTouchTileSuccess();
                    nd.setInfo(nd.getInfo(), showTextStart);
                }
            }
        }
        //update view row tile position
        this.list_node_music[0].y = this.list_node_music[0].getRowHeight() * 0.5;
        this.followFirstRow();
    },
    onEnter: function () {
        this._super();
        this.loadConfigData();
        this.createStartGameState();
        this.createEffectBall();
    },
    onExit: function () {
        this._super();
    },
    onEnterTransitionDidFinish: function () {
        this._super();
        //GV.MODULE_MGR._gameState = GV.GAME_STATE.RUNNING;
    },
    update: function (dt) {
        this._super(dt);
        switch (GV.MODULE_MGR._gameState) {
            case GV.GAME_STATE.START:
            case GV.GAME_STATE.END:
                return false;
            case GV.GAME_STATE.RUNNING:
                this.moveTile(dt);
                break
        }
        this.updateResource(dt);
    },
    updateResource: function (dt) {
        if (!GV.MODULE_MGR._myInfo) {
            return false;
        }
        //update score
        this.updateScore(dt);
        //update speed
        this.updateMoveSpeed(dt);
    },
    updateScore: function (dt) {
        var myScore = GV.MODULE_MGR._myInfo.curScore;
        var d = 1;
        if (this.curScore != myScore) {
            if (myScore > this.curScore) {
                //this.curScore += Math.round((curScore - this.curScore) / d);
                this.curScore += d;
            } else {
                //this.curScore -= Math.round((this.curScore - curScore) / d);
                this.curScore -= d;
            }
            this._lbScore.setString(Utility.numToStr(this.curScore));
            this.playEffectScore();
        }
        if (this.isRequireUpSpeed && (myScore % this.distanceUpStar == 0)) {
            this.isRequireUpSpeed = false;
            this.upSpeed();
        }
    },
    updateMoveSpeed: function (dt) {
        var d = 0.1;
        if (this.curSpeed != this.moveSpeed) {
            if (this.curSpeed > this.moveSpeed) {
                this.curSpeed -= d;
            } else {
                this.curSpeed += d;
            }
        }
    },
    followFirstRow: function (dt) {
        var ndObject, temp;
        var len = this.list_node_music.length;
        this.list_node_music[0].updateChild(dt);
        for (var i = 1; i < len; ++i) {
            ndObject = this.list_node_music[i];
            if (ndObject) {
                temp = this.list_node_music[i - 1];
                ndObject.y = this.marginTop + temp.y + (temp.getRowHeight() + ndObject.getRowHeight()) * 0.5;
                //update child
                ndObject.updateChild(dt);
            }
        }
    },
    moveTile: function (dt) {
        var ndObject = this.list_node_music[0];
        if (ndObject) {
            ndObject.y -= this.curSpeed;
            this.followFirstRow(dt);
        }

        var len = this.list_node_music.length;
        if (len > 0) {
            var ndObj = this.list_node_music[len - 1];
            if (ndObj) {
                var maxY = GV.WIN_SIZE.height - ndObj.getRowHeight() * 0.5;
                if (ndObj.y <= maxY) {
                    this.nextRow();
                }
            }
            ndObj = this.list_node_music[0];
            if (ndObj) {
                var minY = -(ndObj.getRowHeight() * 0.5);
                if (ndObj.y <= minY) {
                    this.deleteDownRow();
                }
            }
        }
    },
    upSpeed: function () {
        if(this.starLevel >= GV.MAX_NUM_STAR) {
            cc.log("get max star: ", this.starLevel, " STAR");
            return false;
        }
        this.moveSpeed += this.upSpeedDelta;
        this.starLevel++;
        this.distanceUpStar *= 4;//up difficult hard core
        this.playEffectUpStar();
        cc.error("up speed");
    },
    resetValues: function () {
        this.moveSpeed = GV.MOVE_SPEED;
        this.curSpeed = this.moveSpeed;
        this.curScore = 0;
        this.distanceUpStar = GV.DISTANCE_UP_STAR_LEVEL;
        this._ndStar.removeAllChildren(true);
        this.listStar = [];
        this._lbScore.setString("0");
    },
    playEffectScore: function () {
        this._lbScore.visible = true;
        //this._ndStar.visible = false;
        this._lbScore.runAction(Utility.getActionScaleForAppear());
        this.playEffectBackgroundBall();
    },
    playEffectBackgroundBall: function () {
        if(this._sprEffectBall) {
            this._sprEffectBall.runAction(Utility.getActionScaleForAppear(this._sprEffectBall));
        }
    },

    playEffectUpStar: function () {
        this._lbScore.visible = false;
        this._lbScore.setLocalZOrder(this._ndStar.getLocalZOrder() + 1);
        //this._ndStar.visible = true;
        this._ndStar.stopAllActions();
        this._ndStar.setCascadeOpacityEnabled(true);
        this._ndStar.setOpacity(255);
        var sprStarIcon = new cc.Sprite(res.star_light_png);
        this._ndStar.addChild(sprStarIcon, 0);
        this.listStar.push(sprStarIcon);
        var len = this.listStar.length;
        GV.MODULE_MGR._myInfo.myStar = this.listStar.length;//save to my info
        var margin = 5;
        var firstStar = this.listStar[0];
        var lineStarWidth = firstStar.width * len + margin * (len - 1);
        for (var i = 0; i < len; ++i) {
            var starIcon = this.listStar[i];
            if (starIcon) {
                starIcon.x = -(lineStarWidth - firstStar.width) * 0.5 + (firstStar.width + margin) * i;
            }
        }
        sprStarIcon.setScale(10);
        sprStarIcon.runAction(Utility.getActionScaleForAppear2(undefined, function () {
            var starIcon = new cc.Sprite(res.star_png);
            this._ndStar.addChild(starIcon);
            starIcon.setPosition(sprStarIcon.getPosition());
            this.listStar[this.listStar.length -1] = starIcon;
            sprStarIcon.removeFromParent(true);
            this._ndStar.runAction(cc.sequence(
                cc.delayTime(0.5),
                cc.fadeOut(1),
                cc.callFunc(function () {
                    this._lbScore.visible = true;
                }.bind(this))
            ));
        }.bind(this)));
    }
});
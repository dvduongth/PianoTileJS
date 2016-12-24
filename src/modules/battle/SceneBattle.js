var SceneBattle = BaseScene.extend({
    ctor: function () {
        this._super();
        //variables
        this.curScore = 0;
        this.count_time = 0;
        this._sprBg = null;
        this.list_node_music = [];
        this.initGui();
        this.SPEED = GV.MOVE_SPEED;
        this.marginTop = 0;
        this.createStartState = false;
        return true;
    },
    initGui: function () {
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

        //label score
        this._lbScore = Utility.getLabel(res.FONT_MARKER_FELT, 72, Utility.getColorByName("red"));
        this._lbScore.setString(Utility.numToStr(this.curScore));
        this.addChild(this._lbScore, GV.ZORDER_LEVEL.GUI);
        this._lbScore.attr({
            anchorX: 0.5,
            anchorY: 1,
            x: GV.WIN_SIZE.width >> 1,
            y: GV.WIN_SIZE.height * 15 / 16
        });

        this.schedule(this.update);
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
        this.addChild(rowNodeMusic);
        this.list_node_music.push(rowNodeMusic);
        //set info
        var numTile = 1;
        var list_type = [];
        if(!this.createStartState) {
            this.createStartState = true;
            //push info into list
            var startInfo = {
                "type": GV.TILE_TYPE.START,
                "index": Math.floor(4 * Math.random())
            };
            list_type.push(startInfo);
        }else{
            //var numTile = Math.random() > 0.5 ? 2 : 1;

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

        rowNodeMusic.setInfo({"list_type": list_type});
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
    createStartGameState: function (minPos) {
        this.createStartState = false;
        var totalHeightMax = GV.WIN_SIZE.height - minPos;
        this.createListNodeMusic();
        var totalTileHeight = this.calculateTotalTileRowHeight();
        while(totalTileHeight < totalHeightMax){
            this.nextRow();
            totalTileHeight += this.list_node_music[this.list_node_music.length - 1].getRowHeight();
        }

        var posY = minPos;
        posY = posY + this.list_node_music[0].getRowHeight() * 0.5;
        this.list_node_music[0].y = posY;
        this.followFirstRow();
    },
    onEnter: function () {
        this._super();
        GV.MODULE_MGR.showGuiStartBattle();
        var minPos = GV.MODULE_MGR.guiStartBattle.getGuiHeight();
        this.createStartGameState(minPos);
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
        var curScore = GV.MODULE_MGR._myInfo.curScore;
        var d = 2;

        if (this.curScore != curScore) {
            if (curScore > this.curScore) {
                //this.curScore += Math.round((curScore - this.curScore) / d);
                this.curScore++;
            } else {
                //this.curScore -= Math.round((this.curScore - curScore) / d);
                this.curScore--;
            }
            this._lbScore.setString(Utility.numToStr(this.curScore));
        }
    },
    followFirstRow: function () {
        var ndObject, temp;
        var len = this.list_node_music.length;
        for (var i = 1; i < len; ++i) {
            ndObject = this.list_node_music[i];
            if (ndObject) {
                temp = this.list_node_music[i-1];
                ndObject.y =this.marginTop + temp.y + (temp.getRowHeight() + ndObject.getRowHeight()) * 0.5 ;
            }
        }
    },
    moveTile: function (dt) {
        var ndObject = this.list_node_music[0];
        if(ndObject) {
            ndObject.y -= GV.MOVE_SPEED;
            this.followFirstRow();
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
        this.count_time++;
        if (this.count_time % GV.UP_SPEED_DURATION == 0) {
            this.count_time = 1;
            this.upSpeed();
        }
    },
    upSpeed: function () {
        this.SPEED += 0.5;
        cc.error("up speed");
    }
});
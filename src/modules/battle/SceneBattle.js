var SceneBattle = BaseScene.extend({
    ctor: function () {
        this._super();
        //variables
        this.count_time = 0;
        this.bg_battle = null;
        this.list_node_music = [];
        this.initGui();
        this.SPEED = GV.MOVE_SPEED;
        return true;
    },
    onEnter: function () {
        this._super();
    },
    onEnterTransitionDidFinish: function () {
        this._super();
    },
    initGui: function () {
        var size = GV.WIN_SIZE;
        //background
        this.bg_battle = new cc.Sprite(res.battle_background_png);
        this.bg_battle.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.bg_battle);
        this.createListNodeMusic();
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
        this.nextRow();
    },
    nextRow: function () {
        var rowNodeMusic = new RowNodeMusic();
        this.addChild(rowNodeMusic);
        this.list_node_music.push(rowNodeMusic);
        //set info
        //var numTile = Math.random() > 0.5 ? 2 : 1;
        var numTile = 1;
        var list_type = [];
        for(var i = 0; i < numTile; ++i) {
            var type, index;
            var rd1 = Math.random();
            var rd2 = Math.random();
            //type
            if(rd1 > 0.6) {
                type = GV.TILE_TYPE.LONG;
            }else if(rd1 > 0.3) {
                type = GV.TILE_TYPE.NORMAL;
            }else{
                type = GV.TILE_TYPE.SHORT;
            }
            //index
            if(rd2 > 0.75) {
                index = 3;
            }else if(rd2 > 0.5) {
                index = 2;
            }else if(rd2 > 0.25) {
                index = 1;
            }else{
                index = 0;
            }
            //push info into list
            var info = {
                "type":type,
                "index": index
            };
            list_type.push(info);
        }
        rowNodeMusic.setInfo({"list_type": list_type});
        rowNodeMusic.attr({
            x: GV.WIN_SIZE.width * 0.5,
            y: GV.WIN_SIZE.height + rowNodeMusic.getRowHeight() * 0.5
        });
    },
    deleteDownRow: function () {
        if(this.list_node_music.length > 0) {
            var nodeMusic = this.list_node_music[0];
            if(nodeMusic.checkMissActionTouch()) {
                cc.error("miss action");
                this.actionFocusRowMiss();
                this.gameOver();
            }else{
                nodeMusic.removeFromParent(true);
                this.list_node_music.splice(0, 1);
            }
        }
    },
    gameOver: function () {
        GV.END_GAME = true;
    },
    actionFocusRowMiss: function () {
        var len = this.list_node_music.length;
        if(len > 0) {
            var upHeight;
            if(this.list_node_music[0]) {
                upHeight= this.list_node_music[0].getRowHeight();
            }
            for(var i = 0; i < len; ++i) {
                var cb;
                var row = this.list_node_music[i];
                if(row) {
                    if(i == 0) {
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
    update: function (dt) {
        this._super(dt);
        if(GV.END_GAME) {
            return false;
        }
        var len = this.list_node_music.length;
        for(var i = 0; i < len; ++i) {
            var ndObject = this.list_node_music[i];
            if(ndObject) {
                ndObject.y -= this.SPEED;
            }
        }
        if(len > 0) {
            var ndObj = this.list_node_music[len - 1];
            if(ndObj) {
                var maxY = GV.WIN_SIZE.height - ndObj.getRowHeight() * 0.5;
                if(ndObj.y <= maxY){
                    this.nextRow();
                }
            }
            ndObj = this.list_node_music[0];
            if(ndObj) {
                var minY = -(ndObj.getRowHeight() * 0.5);
                if(ndObj.y <= minY){
                    this.deleteDownRow();
                }
            }
        }
        this.count_time++;
        if(this.count_time % GV.UP_SPEED_DURATION == 0) {
            this.count_time = 1;
            this.upSpeed();
        }
    },
    upSpeed: function () {
        this.SPEED += 0.5;
        cc.error("up speed");
    }
});
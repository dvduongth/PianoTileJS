var RowNodeMusic = cc.Node.extend({
    ctor: function (num) {
        this._super();
        //variables
        if(!num) {
            num = GV.NUM_COL;
        }else{
            GV.NUM_COL = num;
        }
        this.NUM_NODE = num;
        GV.NUM_COL = num;
        this.list_element = [];
        this.list_type = [];
        this.heightType = GV.TILE_TYPE.UNDEFINED;
        return true;
    },
    initGui: function () {
        if(this.inited) {
            return null;
        }else{
            this.inited = true;
        }
        //music tile
        for(var j = 0; j < this.NUM_NODE; ++j) {
            var tileMusic = new TileMusicObject();
            this.addChild(tileMusic);
            this.list_element.push(tileMusic);
        }
    },
    /**
     * @param data with list_type
     * list_type is has type and index
     * */
    setInfo: function (data) {
        if(!data) {
            cc.error("set info tile music object with null data");
            return null;
        }
        this.list_type = [];//luu index co type
        if(data.list_type){
            this.list_type = data["list_type"];
        }
        this.initGui();
        this.updateChildInfo();
    },
    updateChildInfo: function () {
        var len = this.list_element.length;
        for(var i = 0; i < len; ++i) {
            var info = this.findDataForIndex(i);
            var tileMusic = this.list_element[i];
            if(tileMusic) {
                if(info) {
                    tileMusic.setInfo(info);
                    var h = GV.TILE_HEIGHT_TYPE[info["type"]];
                    if(h > GV.TILE_HEIGHT_TYPE[this.heightType]) {
                        this.heightType = info["type"];
                    }
                }else{
                    tileMusic.setInfo({"type": GV.TILE_TYPE.UNDEFINED});
                }
            }
        }
        this.updateChildSize();
    },
    updateChildSize: function () {
        var tileWidth = GV.WIN_SIZE.width / this.NUM_NODE;
        var tileHeight = GV.TILE_HEIGHT_TYPE[this.heightType];
        var len = this.list_element.length;
        for(var i = 0; i < len; ++i) {
            var tileObj = this.list_element[i];
            if(tileObj) {
                tileObj.updateTileSize(tileWidth, tileHeight);
            }
        }
        if(len > 0) {
            var firstTile = this.list_element[0];
            if(firstTile) {
                firstTile.x = -(GV.WIN_SIZE.width - firstTile.getSize().width) * 0.5;
                this.followFirstTile();
            }
        }
    },
    followFirstTile: function () {
        var len = this.list_element.length;
        for(var i = 1; i < len; ++i) {
            var tileObj = this.list_element[i];
            if(tileObj) {
                var prevTile = this.list_element[i - 1];
                tileObj.x = prevTile.x + (prevTile.getSize().width + tileObj.getSize().width) * 0.5;
            }
        }
    },
    findDataForIndex: function (index) {
        var len = this.list_type.length;
        for(var i = 0; i < len; ++i) {
            var info = this.list_type[i];
            if(info) {
                if(info["index"] == index) {
                    return info;
                }
            }
        }
        return null;
    },
    getRowHeight: function () {
        return GV.TILE_HEIGHT_TYPE[this.heightType];
    },
    checkMissActionTouch: function () {
        var len = this.list_element.length;
        for(var i = 0; i < len; ++i) {
            var element = this.list_element[i];
            if(element) {
                if(element.type != GV.TILE_TYPE.UNDEFINED && !element.isTouchSuccess){
                    return true;
                }
            }
        }
        return false;
    },
    runActionUpAHeight: function (height,callFunc) {
        var ACTION_TIME = 0.5;
        if(height === undefined) {
            height = this.getRowHeight();
        }
        this.stopAllActions();
        this.runAction(cc.sequence(
            cc.moveBy(ACTION_TIME,0,height),
            cc.callFunc(function () {
                Utility.executeFunction(callFunc);
            }.bind(this))
        ));
    },
    runActionFocusMissElement: function () {
        var len = this.list_element.length;
        for(var i = 0; i < len; ++i) {
            var element = this.list_element[i];
            if(element) {
                element.actionFocusMiss();
            }
        }
    }
});
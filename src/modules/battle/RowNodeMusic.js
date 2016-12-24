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
        this.TOTAL_WIDTH_SIZE = 0;
        this.rowHeightType = GV.TILE_TYPE.UNDEFINED;
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
    calculateTotalTileWidth: function () {
        var t = 0;
        var len = this.list_element.length;
        for(var i = 0; i < len; ++i) {
            t += this.list_element[i].getSize().width;
        }
        this.TOTAL_WIDTH_SIZE = t;
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
        this.updateChildSizeAndPos();
    },
    updateChildInfo: function () {
        var len = this.list_element.length;
        for(var i = 0; i < len; ++i) {
            var info = this.findDataForIndex(i);
            var tileMusic = this.list_element[i];
            if(tileMusic) {
                if(info) {
                    tileMusic.setInfo(info);
                    var h = tileMusic.getSize().height;
                    if(h > GV.TILE_TYPE_HEIGHT[this.rowHeightType]) {
                        this.rowHeightType = info["type"];
                    }
                }else{
                    tileMusic.setInfo({"type": GV.TILE_TYPE.UNDEFINED});
                }
            }
        }
    },
    updateChildSizeAndPos: function () {
        this.calculateTotalTileWidth();
        var len = this.list_element.length;
        var margin = 0;
        for(var i = 0; i < len; ++i) {
            var tileMusic = this.list_element[i];
            if(tileMusic) {
                var tileWidth = tileMusic.getSize().width;
                tileMusic.updateTileSize(cc.size(tileWidth, GV.TILE_TYPE_HEIGHT[this.rowHeightType]));
                var x = tileWidth * 0.5 + margin + this.TOTAL_WIDTH_SIZE * (i / this.NUM_NODE - 0.5);
                tileMusic.attr({
                    x: x,
                    y: 0
                });
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
        return GV.TILE_TYPE_HEIGHT[this.rowHeightType];
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
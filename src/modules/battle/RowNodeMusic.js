var RowNodeMusic = cc.Node.extend({
    ctor: function (num) {
        this._super();
        //variables
        if(!num) {
            num = GV.NUM_COL;
        }
        this.NUM_NODE = num;
        GV.NUM_COL = num;
        this.list_element = [];
        this.list_type = [];
        this.TOTAL_WIDTH_SIZE = 0;
        return true;
    },
    initGui: function () {
        //music tile
        for(var j = 0; j < this.NUM_NODE; ++j) {
            var tileMusic = new TileMusicObject();
            this.addChild(tileMusic);
            this.list_element.push(tileMusic);
        }
        this.TOTAL_WIDTH_SIZE = this.list_element[0].getSize().width * this.NUM_NODE;
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
        var len = this.list_element.length;
        var margin = 0;
        for(var i = 0; i < len; ++i) {
            var info = this.findDataForIndex(i);
            var tileMusic = this.list_element[i];
            if(tileMusic) {
                if(info) {
                    tileMusic.setInfo(info);
                }else{
                    tileMusic.setInfo({"type": GV.TILE_TYPE.UNDEFINED});
                }
                var x = tileMusic.getSize().width * 0.5 + margin + this.TOTAL_WIDTH_SIZE * (i / this.NUM_NODE - 0.5);
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
        var len = this.list_element.length;
        if(len > 0) {
            return this.list_element[0].getSize().height;
        }else{
            return 0;
        }
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
                this.executeCallBack(callFunc);
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
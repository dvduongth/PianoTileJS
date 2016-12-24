var ModuleMgr = cc.Class.extend({
    ctor: function(){
        this._myInfo = null;
        this._gameState = null;
        this.resetValues();
        return true;
    },
    resetValues: function () {
        this._myInfo = new MyInfoData();
        this._gameState = GV.GAME_STATE.START;
    },
    showGuiStartBattle: function () {
        if(!this.guiStartBattle){
            this.guiStartBattle = new GuiStartBattle();
        }
        this.guiStartBattle.showGui();
    },
    endGame: function () {
        this._gameState = GV.GAME_STATE.END;
        cc.error("Game Over");
        var timeWait = 5;
        var curScene = GV.SCENE_MGR.getCurrentScene();
        curScene.runAction(cc.sequence(
            cc.delayTime(timeWait),
            cc.callFunc(function () {
                this.resetValues();
                curScene.createStartGameState();
                curScene.resetValues();
            }.bind(this))
        ))
    }
});
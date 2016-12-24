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
    showGuiEndBattle: function () {
        if(!this.guiEndBattle){
            this.guiEndBattle = new GuiEndBattle();
        }
        this.guiEndBattle.setInfo(this._myInfo);
        GV.SCENE_MGR.showFog();
        this.guiEndBattle.showGui(true);
    },

    endGame: function () {
        this._gameState = GV.GAME_STATE.END;
        cc.error("Game Over");
        var timeWait = 3;
        var curScene = GV.SCENE_MGR.getCurrentScene();
        curScene.runAction(cc.sequence(
            cc.delayTime(timeWait),
            cc.callFunc(function () {
                this.showGuiEndBattle();
            }.bind(this))
        ))
    }
});
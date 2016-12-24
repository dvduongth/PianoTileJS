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
        GV.MODULE_MGR._gameState = GV.GAME_STATE.END;
    }
});
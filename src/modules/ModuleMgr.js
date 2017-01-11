var ModuleMgr = cc.Class.extend({
    ctor: function(){
        this._myInfo = new MyInfoData();
        this._gameState = GV.GAME_STATE.START;
        this._gameMode = GV.GAME_MODE.MANUAL;
        this.resetValues();
        return true;
    },
    resetValues: function () {
        if(!this._myInfo) {
            this._myInfo = new MyInfoData();
        }else{
            this._myInfo.curScore = 0;
            this._myInfo.myStar = 0;
        }
        this._gameState = GV.GAME_STATE.START;
        this._gameMode = GV.GAME_MODE.MANUAL;
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
    showGuiResultBattle: function () {
        if(!this.guiResultBattle){
            this.guiResultBattle = new GuiResultBattle();
        }
        this.guiResultBattle.setInfo(this._myInfo);
        GV.SCENE_MGR.showFog();
        this.guiResultBattle.showGui(false);
    },
    showPopup: function (text, title) {
        var listButton = [{btnName: 'ok', hide: true}];
        var content = {"title": title, "text": text};
        GV.POPUP_MGR.showPopup(content, listButton, true);
    },
    startGame: function () {
        GV.SCENE_MGR.viewSceneById(GV.SCENE_IDS.BATTLE);
        this.resetValues();
    },
    endGame: function () {
        this._gameState = GV.GAME_STATE.END;
        cc.log("Game Over");
        var timeWait = 3;
        var curScene = GV.SCENE_MGR.getCurrentScene();
        curScene.runAction(cc.sequence(
            cc.delayTime(timeWait),
            cc.callFunc(function () {
                this.showGuiEndBattle();
            }.bind(this))
        ))
    },
    restartGame: function () {
        GV.SCENE_MGR.viewSceneById(GV.SCENE_IDS.BATTLE,true);
        this.resetValues();
    },
    continueGame: function () {
        var curScene = GV.SCENE_MGR.getCurrentScene();
        curScene.continuePlayGame();
    },
    autoPlayGame: function () {
        GV.SCENE_MGR.viewSceneById(GV.SCENE_IDS.BATTLE);
        this.resetValues();
        this._gameMode = GV.GAME_MODE.AUTO;
    },
    /**
     * @param {Number} numMusicGold
     * @param {Number} numDiamondCoin
     * */
    updateMyTopInfo: function (numMusicGold, numDiamondCoin) {
        if(!numMusicGold) {
            numMusicGold = 0;
        }
        if(!numDiamondCoin) {
            numDiamondCoin = 0;
        }
        this._myInfo.myMusicGold = numMusicGold;
        this._myInfo.myDiamondCoin = numDiamondCoin;
    }
});
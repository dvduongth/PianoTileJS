var ModuleMgr = cc.Class.extend({
    ctor: function(){
        this._myInfo = new MyInfoData();
        this._gameState = GV.GAME_STATE.START;
        this._gameMode = GV.GAME_MODE.MANUAL;
        this._curSong = {mId: 1,mGold: 2017, mName: "Xuan Da Ve", mStar: 3, mState: GV.ELEMENT_STATE.UNLOCK};
        this.requireSaveOldContentOffset = false;
        this.curTabLobby = GV.TAB_LOBBY_INDEX.HOME;
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
        //show game info
        GV.MODULE_MGR.showGuiStartBattle();
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
        //show game info
        GV.MODULE_MGR.showGuiStartBattle();
    },
    continueGame: function () {
        var curScene = GV.SCENE_MGR.getCurrentScene();
        curScene.continuePlayGame();
    },
    autoPlayGame: function () {
        this.resetValues();
        this._gameMode = GV.GAME_MODE.AUTO;
        this._gameState = GV.GAME_STATE.RUNNING;
        var curScene = GV.SCENE_MGR.getCurrentScene();
        curScene.showButtonStopAutoPlay(true);
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
    },
    /**
     * @param {object} data with properties: mId, mName, mGold, mStar, mState
     * */
    updateCurrentMusicTabHome: function (data) {
        var curScene = GV.SCENE_MGR.getCurrentScene();
        if(curScene.sceneId == GV.SCENE_IDS.LOBBY) {
            curScene.lobbyTabHome.setNodeMusicInfo(data);
        }
    },
    /**
     * @param {array} list
     * list contain object with properties: mId, mName, mGold, mStar, mState
     * eg: list = [ {mId: 1, mName: "Ngay tet que em", mGold: 100, mStar: 3, mState: GV.ELEMENT_STATE.UNLOCK}, ... ]
     * */
    updateListMusicTabHome: function (list) {
        //test
        var list = [];
        for (var i = 0; i < 10; ++i) {
            var r = Math.floor(Math.random() * 3);
            var state = Math.random() > 0.5 ? GV.ELEMENT_STATE.UNLOCK : GV.ELEMENT_STATE.LOCK;
            var mName = Math.random() > 0.5 ? "Ngay Tet Que Em" : "Le Chua Dau Nam";
            list.push({mId: i, mName: mName, mGold: 20177, mStar: r, mState: state});
        }
        //end test

        var curScene = GV.SCENE_MGR.getCurrentScene();
        if(curScene.sceneId == GV.SCENE_IDS.LOBBY) {
            curScene.lobbyTabHome.updateListMusic(list);
        }
    },
    /**
     * @param {array} list
     * list contain object with properties: mId, mName, mGold, mStar, mState
     * eg: list = [ {mId: 1, mName: "Ngay tet que em", mGold: 100, mStar: 3, mState: GV.ELEMENT_STATE.UNLOCK}, ... ]
     * */
    updateListMusicTabMusic: function (list) {
        //test
        var list = [];
        for (var i = 0; i < 10; ++i) {
            var r = Math.floor(Math.random() * 3);
            var state = Math.random() > 0.5 ? GV.ELEMENT_STATE.UNLOCK : GV.ELEMENT_STATE.LOCK;
            list.push({mId: i, mName: "Le Hoi Dau Nam", mGold: 20178, mStar: r, mState: state});
        }
        //end test

        var curScene = GV.SCENE_MGR.getCurrentScene();
        if(curScene.sceneId == GV.SCENE_IDS.LOBBY) {
            curScene.lobbyTabMusic.updateListMusic(list);
        }
    },
    returnCity: function (isShowGuiResultBattle) {
        GV.SCENE_MGR.viewSceneById(GV.SCENE_IDS.LOBBY);
        if(isShowGuiResultBattle) {
            GV.MODULE_MGR.showGuiResultBattle();
        }
    }
});
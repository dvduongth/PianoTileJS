var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        SCENE_MGR.BATTLE = new SceneBattle();
        this.addChild(SCENE_MGR.BATTLE);
    }
});


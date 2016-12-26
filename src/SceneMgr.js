var SceneMgr = cc.Class.extend({
    ctor: function () {
        this._currentScene = null;
        this._fog = null;
        this._fogListener = null;
        this._zoderFog = 2016;
        return true;
    },

    viewSceneById: function (sceneId, skipTransition) {
        var scene;
        switch (sceneId) {
            case GV.SCENE_IDS.LOADING:
                scene = new SceneLoading();
                break;
            case GV.SCENE_IDS.LOBBY:
                scene = new SceneLobby();
                break;
            case GV.SCENE_IDS.BATTLE:
                scene = new SceneBattle();
                break;

        }
        if (scene) {
            this._currentScene = scene;
            if (skipTransition) {
                cc.director.runScene(this._currentScene);
            } else {
                var pTransition = new cc.TransitionFade(1.0, this._currentScene, cc.color(0, 0, 0, 255));
                cc.director.runScene(pTransition);
            }
        }
    },

    /**
     *
     * @returns {cc.Scene}
     */
    getCurrentScene: function () {
        return this._currentScene;
    },

    _createFog: function () {
        this._fog = new cc.LayerColor(cc.color("black"), GV.WIN_SIZE.width, GV.WIN_SIZE.height);
        this._fog.retain();
        this._fog.setOpacity(128);
        this._fog.setVisible(false);

        this._fogListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                return cc.rectContainsPoint(rect, locationInNode);
            }
        });
        cc.eventManager.addListener(this._fogListener, this._fog);
    },

    /**
     * show the fog with opacity
     * @param opacity
     */
    showFog: function (opacity) {
        if (this._currentScene) {
            var fog = this.getFog();
            //update view
            fog.setVisible(true);
            this.updateParent(fog, GV.ZORDER_LEVEL.POPUP);
            if (opacity !== undefined) {
                fog.setOpacity(opacity);
            } else {
                fog.setOpacity(128);
            }
            //listener
            this._fogListener.setEnabled(true);
        }
    },

    hideFog: function () {
        var fog = this.getFog();
        fog.setVisible(false);
        this._fogListener.setEnabled(false);
    },

    /**
     * get the fog
     * @returns {cc.LayerColor}
     */
    getFog: function () {
        if (this._fog == null) {
            this._createFog();
        }
        return this._fog;
    },
    updateParent: function (child, zOrder) {
        if (!zOrder) {
            zOrder = GV.ZORDER_LEVEL.BG;
        }
        if (child) {
            var curScene = this.getCurrentScene();
            if (curScene) {
                if (child.parent != curScene) {
                    child.removeFromParent(false);
                    curScene.addChild(child, zOrder);
                } else {
                    child.setLocalZOrder(zOrder);
                }
            }
        }
    }
});
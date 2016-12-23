var PopupsMgr = cc.Class.extend({
    _init: false,
    ctor: function () {
        return true;
    },
    /**
     * @private
     */
    init: function () {
        this._init = true;
        this._guiPopUp = new GuiPopup();
        this._guiPopUp.retain();
    },
    /**
     * EG:
     * var cb = function () {
     *       GV.SCENE_MGR.viewSceneById(GV.SCENE_IDS.BATTLE);
     *  };
     * var list_button = [
     * {"btnName": "OK","callback": cb},
     * {"btnName": "Cancel","callback": null}
     * ];
     * GV.POPUP_MGR.showPopup("test",list_button);
     **/
    showPopup: function (content, listButtonObj, hasClose) {
        if (!this._init) {
            this.init();
        }
        GV.SCENE_MGR.showFog();
        this._guiPopUp.setContent(content, listButtonObj, hasClose);
        this._guiPopUp.showGui(true);
        this._updateParent();
    },
    /**
     *
     * @private
     */
    _updateParent: function () {
        GV.SCENE_MGR.updateParent(this._guiPopUp._rootNode,GV.ZORDER_LEVEL.POPUP);
    }
});
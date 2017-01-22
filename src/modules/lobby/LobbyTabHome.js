var LobbyTabHome = BaseGUI.extend({
    _className: "LobbyTabHome",
    ctor: function (size) {
        this._super();
        //variables
        if (size) {
            this.BACK_GROUND_SIZE = size;
        } else {
            this.BACK_GROUND_SIZE = cc.size(GV.WIN_SIZE.width, GV.WIN_SIZE.height);
        }
        this.nodeInfoSize = cc.size(this.BACK_GROUND_SIZE.width, this.BACK_GROUND_SIZE.height * 0.5);
        this.tableViewMusicSize = cc.size(this.BACK_GROUND_SIZE.width * 0.98, this.BACK_GROUND_SIZE.height * 0.5);
        this.iconCDSize = this.nodeInfoSize.width * 0.45;
        this.sizeButtonPlay = cc.size(this.nodeInfoSize.width * 2 / 5, this.nodeInfoSize.height / 8);
        this.initGui();
    },

    initGui: function () {
        //this.createBackground();
        this.createMusicNodeInfo();
        this.createListMusicView();
        this.createListenerListView();
        //update view
        this.syncAllChildren();
        this.saveOldValues();
    },
    saveOldValues: function () {
        this._ndNodeCurSong["oldPos"] = this._ndNodeCurSong.getPosition();
        this._sprBgNodeInfo["oldPos"] = this._sprBgNodeInfo.getPosition();
        this._sprIconCD["oldPos"] = this._sprIconCD.getPosition();
        this._btnPlay["oldPos"] = this._btnPlay.getPosition();
        this._lbMusicTitle["oldPos"] = this._lbMusicTitle.getPosition();
        this.musicTableView["oldSize"] = cc.size(this.musicTableView._contentSizeWidth, this.musicTableView._contentSizeHeight);
    },
    createListenerListView: function () {
        var self = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                return cc.rectContainsPoint(rect, locationInNode);
            },
            onTouchMoved: function (touch, event) {
                var delta = touch.getDelta();

                if(delta.y > 0) {
                    var contentOffset = self.musicTableView.getContentOffset();
                    var minRequire = self.musicTableView._contentSizeHeight - self.musicTableView.getTableSize().height;
                    if( contentOffset.y <= minRequire) {
                        self.musicTableView.setContentOffset(cc.p(contentOffset.x, contentOffset.y + delta.y));
                    }
                    var maxHeight = self.musicTableView["oldSize"].height + self.nodeInfoSize.height - 5;
                    if(self.musicTableView._contentSizeHeight < maxHeight) {
                        self.musicTableView.setViewSize(self.musicTableView["oldSize"].width,self.musicTableView._contentSizeHeight + delta.y);
                    }
                    self._ndNodeCurSong.y += delta.y;
                }else{
                    if(self._ndNodeCurSong.y > self._ndNodeCurSong["oldPos"].y) {
                        self._ndNodeCurSong.y += delta.y;
                    }
                }

            },
            onTouchEnded: function (touch, event) {
                self.checkUpCD();
            }
        });
        cc.eventManager.addListener(listener, this.musicTableView);
    },
    moveUpCDInfo: function (isUp) {
        var ACTION_TIME = 0.1;
        var deltaY = 0;
        if(isUp) {
            deltaY = this.nodeInfoSize.height;
        }
        //stop action
        this._ndNodeCurSong.stopAllActions();
        //run action
        this._ndNodeCurSong.runAction(cc.sequence(
            cc.callFunc(function () {
                this.musicTableView.setContentSize(this.musicTableView["oldSize"].width,this.musicTableView["oldSize"].height + deltaY - 5);
                //if(!isUp){
                //    this.musicTableView.reloadData();
                //}
            }.bind(this)),
            cc.moveTo(ACTION_TIME,this._ndNodeCurSong["oldPos"].x,this._ndNodeCurSong["oldPos"].y + deltaY)
        ));
    },
    createMusicNodeInfo: function () {
        this._ndNodeCurSong = new cc.Node();
        this.addChild(this._ndNodeCurSong, GV.ZORDER_LEVEL.GUI + 1);
        this._ndNodeCurSong.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.BACK_GROUND_SIZE.width >> 1,
            y: this.BACK_GROUND_SIZE.height - this.nodeInfoSize.height * 0.5
        });
        this.createBackgroundNodeInfo();
        this.createIconCD();
        this.createButtonPlay();
        this.createLabelMusicTitle();
    },
    createIconCD: function () {
        this._sprIconCD = new cc.Sprite(res.opening_cd_7_png);
        this._ndNodeCurSong.addChild(this._sprIconCD, GV.ZORDER_LEVEL.BG);
        this._sprIconCD.setScale(this.iconCDSize / this._sprIconCD.width);
        this._sprIconCD.attr({
            anchorX: 0.5,
            anchorY: 1,
            x: 0,
            y: this.nodeInfoSize.height * 0.5 - 20
        });
    },
    createLabelMusicTitle: function () {
        this._lbMusicTitle = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 48, Utility.getColorByName("white"), true);
        this._ndNodeCurSong.addChild(this._lbMusicTitle, GV.ZORDER_LEVEL.GUI);
        var newY = (
                this._btnPlay.y + (1 - this._btnPlay.anchorY) * this._btnPlay["contentSize"].height
                + this._sprIconCD.y - this._sprIconCD.height * this._sprIconCD.anchorY * this._sprIconCD.getScaleX()
            ) * 0.5;
        this._lbMusicTitle.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0,
            y: newY
        });
        this._lbMusicTitle.setString("Ngay Tet Que Em");
    },
    createBackgroundNodeInfo: function () {
        this._sprBgNodeInfo = new cc.Sprite(res.banner_first_charge_png);
        this._ndNodeCurSong.addChild(this._sprBgNodeInfo, GV.ZORDER_LEVEL.BG);

        var deltaRatioWidth = this.nodeInfoSize.width / this._sprBgNodeInfo.width;
        var deltaRatioHeight = this.nodeInfoSize.height / this._sprBgNodeInfo.height;
        this._sprBgNodeInfo.setScale(deltaRatioWidth, deltaRatioHeight);
        this._sprBgNodeInfo.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0,
            y: 0
        });
    },
    createButtonPlay: function () {
        this._btnPlay = Utility.getButton("_btnPlay", this.sizeButtonPlay);
        this._ndNodeCurSong.addChild(this._btnPlay, GV.ZORDER_LEVEL.GUI);
        this._btnPlay.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: 0,
            y: 20 - this.nodeInfoSize.height * 0.5
        });
        //bg icon
        this._bgButtonPlay = new cc.Sprite(res.bg_red_bag_open_png);
        this._btnPlay.addChild(this._bgButtonPlay, GV.ZORDER_LEVEL.BG);
        this._bgButtonPlay.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });
        var ratioWidth = this.sizeButtonPlay.width / this._bgButtonPlay.width;
        var ratioHeight = this.sizeButtonPlay.height / this._bgButtonPlay.height;
        this._bgButtonPlay.setScale(ratioWidth, ratioHeight);
        //text
        this._lbButtonPlay = Utility.getLabel("Helvetica", 24, Utility.getColorByName("white"), true);
        this._lbButtonPlay.setString("CHƠI NGAY");
        this._btnPlay.addChild(this._lbButtonPlay, GV.ZORDER_LEVEL.GUI);
        this._lbButtonPlay.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0.5 * this.sizeButtonPlay.width,
            y: 0.5 * this.sizeButtonPlay.height
        });
    },
    createListMusicView: function () {
        if (!this.musicTableView) {
            this.musicTableView = new MusicTableView(1, this.tableViewMusicSize.width, this.tableViewMusicSize.height, cc.SCROLLVIEW_DIRECTION_VERTICAL);
            this.musicTableView.setClassName("musicTableView");
            this.addChild(this.musicTableView, GV.ZORDER_LEVEL.GUI);
            this.musicTableView.attr({
                anchorX: 0,
                anchorY: 0,
                x: (this.BACK_GROUND_SIZE.width - this.tableViewMusicSize.width) * 0.5,
                y: 0
            });
            this.musicTableView.setTouchEventListener(this.onTouchItemMusic.bind(this));
        }
    },
    updateListMusic: function (list) {
        this.musicTableView.setElementList(list);
    },
    createBackground: function () {
        //background
        this._sprBg = new cc.Sprite(res.xmas_title_bg_png);
        this.addChild(this._sprBg, GV.ZORDER_LEVEL.BG);
        this._sprBg.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });
        var bgSize = this._sprBg.getContentSize();
        var delta_ratio_x = this.BACK_GROUND_SIZE.width / bgSize.width;
        var delta_ratio_y = this.BACK_GROUND_SIZE.height / bgSize.height;
        this._sprBg.setScale(delta_ratio_x, delta_ratio_y);
    },
    /**
     * set info
     * */
    setInfo: function (data) {
        if (!data) {
            cc.error("set info lobby tab home with null data");
            return null;
        }
        this.info = data;
    },
    setNodeMusicInfo: function (data) {
        if(!data) {
            cc.error("set node music info with null");
            return null;
        }
        this.curSong = data;
        this._lbMusicTitle.setString(data.mName);
    },
    onTouchUIEndEvent: function (sender) {
        switch (sender) {
            case this._btnPlay:
                GV.MODULE_MGR._curSong = this.curSong;
                GV.MODULE_MGR.startGame();
                break;
        }
    },
    /**
     * @param {object} data: with properties {mId, mName, mGold, mStar, mState}
     * */
    onTouchItemMusic: function (data) {
        if(!data || data.mState == GV.ELEMENT_STATE.LOCK) {
            GV.MODULE_MGR.showPopup("Mở khóa để chơi bài này");
            return false;
        }
        GV.MODULE_MGR._curSong = data;
        /**
         * to do anything here
         * */
        var cb = {};
        cb["caller"] = GV.MODULE_MGR;
        cb["funcName"] = GV.MODULE_MGR.startGame;
        cb["args"] = [];
        var listButton = [{btnName: 'ok',btnTitle:"PLAY", hide: true, callback: cb}];
        var content = {"title": "THÔNG BÁO", "text": "Home: bài hát \n" + data.mName + "?"};
        GV.POPUP_MGR.showPopup(content, listButton, true);
        GV.CUR_CONTENT_OFFSET = this.musicTableView.getContentOffset();
        GV.MODULE_MGR.requireSaveOldContentOffset = GV.TAB_LOBBY_INDEX.HOME;
        GV.MODULE_MGR.curTabLobby = GV.TAB_LOBBY_INDEX.HOME;
    },
    update: function(dt) {
    },
    checkUpCD: function () {
        var curPosY = this._ndNodeCurSong.y;
        var minPosY = this._ndNodeCurSong["oldPos"].y + this.nodeInfoSize.height * 0.5;
        if(curPosY > minPosY) {
            //scroll to top
            //if(this.musicTableView.viewState != GV.ACTION_STATE.RUNNING) {
            //    this.musicTableView.viewState = GV.ACTION_STATE.RUNNING;
                this.moveUpCDInfo(true);
            //}
        }else{
            //scroll to bottom
            //if(this.musicTableView.viewState != GV.ACTION_STATE.FREEDOM) {
            //    this.musicTableView.viewState = GV.ACTION_STATE.FREEDOM;
                this.moveUpCDInfo(false);
            //}
        }
    }
});

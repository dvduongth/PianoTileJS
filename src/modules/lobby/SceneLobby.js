var SceneLobby = BaseScene.extend({
    ctor: function () {
        this._super();
        this.BACK_GROUND_SIZE = GV.WIN_SIZE;
        this.NUM_TAB_LOBBY = 4;
        this.marginButtonTop = 5;
        this.sizeButtonTop = cc.size(
            (GV.WIN_SIZE.width - 5 * this.marginButtonTop) / 4,
            50
        );
        this.sizeBottomTab = cc.size(0, 0);
        this.sizeBottomButtonTab = cc.size(0, 0);
        this.initGui();
        return true;
    },
    initGui: function () {
        this.createBackground();
        this.createTopButtonInfo();
        this.createBottomTab();

        this._initTabGui();
        //add label
        //this.createLabelTest();
        //synAllChild
        this.syncAllChildren();
    },
    _initTabGui: function () {
        //create page view
        this.createPageView();
        //create page for page view
        var contentSize = this._pageView.getContentSize();
        for (var i = 0; i < this.NUM_TAB_LOBBY; ++i) {
            var layout = new ccui.Layout();
            layout.setContentSize(contentSize);
            var tabObj = this._createTabGuiForIndex(i);
            if (tabObj != null) {
                layout.addChild(tabObj);
                tabObj.attr({
                    x: contentSize.width >> 1,
                    y: contentSize.height >> 1
                });
            }
            this._pageView.addPage(layout);
        }
        this._checkCurrentTab();
    },
    createPageView: function () {
        this.sizePageView = cc.size(
            GV.WIN_SIZE.width,
            GV.WIN_SIZE.height - (
                //2 * this.marginButtonTop
                + this.sizeButtonTop.height
                + this.sizeBottomTab.height
                //+ this.sizeBottomButtonTab.height
            )
        );
        this._pageView = new ccui.PageView();
        this.addChild(this._pageView, GV.ZORDER_LEVEL.BG);
        this._pageView.setContentSize(this.sizePageView);
        this._pageView.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: GV.WIN_SIZE.width >> 1,
            y: GV.WIN_SIZE.height >> 1
        });
        this._pageView.setTouchEnabled(false);
    },
    _createTabGuiForIndex: function (index) {
        var guiObj = null;
        switch (index) {
            case 0:
                if(!this.lobbyTabHome) {
                    this.lobbyTabHome = new LobbyTabHome(this.sizePageView);
                }
                guiObj = this.lobbyTabHome;
                break;
            case 1:
                if(!this.lobbyTabMusic) {
                    this.lobbyTabMusic = new LobbyTabMusic(this.sizePageView);
                }
                guiObj = this.lobbyTabMusic;
                break;
            case 2:
                if(!this.lobbyTabHall) {
                    this.lobbyTabHall = new LobbyTabHall(this.sizePageView);
                }
                guiObj = this.lobbyTabHall;
                break;
            case 3:
                if(!this.lobbyTabSetting) {
                    this.lobbyTabSetting = new LobbyTabSetting(this.sizePageView);
                }
                guiObj = this.lobbyTabSetting;
                break;
        }
        return guiObj;
    },
    createBottomTab: function () {
        this.createBgBottomTab();
        this.createButtonTabHome();
        this.createButtonTabMusic();
        this.createButtonTabHall();
        this.createButtonTabSetting();
    },
    createBgBottomTab: function () {
        var bg = new cc.Sprite("#bg_tab.png");
        bg = new cc.Scale9Sprite(bg.getSpriteFrame());
        this.addChild(bg, GV.ZORDER_LEVEL.BG);
        this.sizeBottomTab.width = GV.WIN_SIZE.width;
        this.sizeBottomTab.height = bg.height;
        bg.setContentSize(this.sizeBottomTab);
        bg.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });
        this.sizeBottomButtonTab.height = this.sizeBottomTab.height;
        this.sizeBottomButtonTab.width = this.sizeBottomTab.width / 4;
    },
    createButtonTabHome: function () {
        this._btnTabHome = Utility.getButton("_btnTabHome", this.sizeBottomButtonTab);
        this.addChild(this._btnTabHome, GV.ZORDER_LEVEL.GUI);
        this._btnTabHome.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0.5 * this.sizeBottomButtonTab.width,
            y: 0.75 * this.sizeBottomTab.height
        });
        //bg icon
        this._bgTabHome = new cc.Sprite("#home_1.png");
        this._btnTabHome.addChild(this._bgTabHome,GV.ZORDER_LEVEL.BG);
        this._bgTabHome.attr({
            anchorX: 0.5,
            anchorY: 1,
            x: 0.5 * this.sizeBottomButtonTab.width,
            y: this.sizeBottomButtonTab.height
        });
        //text
        var lb = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32,Utility.getColorByName("blue"),true,true);
        lb.setString("Home");
        this._btnTabHome.addChild(lb,GV.ZORDER_LEVEL.GUI);
        lb.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: 0.5 * this.sizeBottomButtonTab.width,
            y: - 0.25 * this.sizeBottomButtonTab.height
        });
    },
    createButtonTabMusic: function () {
        this._btnTabMusic = Utility.getButton("_btnTabMusic", this.sizeBottomButtonTab);
        this.addChild(this._btnTabMusic, GV.ZORDER_LEVEL.GUI);
        this._btnTabMusic.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 1.5 * this.sizeBottomButtonTab.width,
            y: 0.75 * this.sizeBottomTab.height
        });
        //bg icon
        this._bgTabMusic = new cc.Sprite("#music_1.png");
        this._btnTabMusic.addChild(this._bgTabMusic,GV.ZORDER_LEVEL.BG);
        this._bgTabMusic.attr({
            anchorX: 0.5,
            anchorY: 1,
            x: 0.5 * this.sizeBottomButtonTab.width,
            y: this.sizeBottomButtonTab.height
        });
        //text
        var lb = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32,Utility.getColorByName("blue"),true,true);
        lb.setString("Music");
        this._btnTabMusic.addChild(lb,GV.ZORDER_LEVEL.GUI);
        lb.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: 0.5 * this.sizeBottomButtonTab.width,
            y: - 0.25 * this.sizeBottomButtonTab.height
        });
    },
    createButtonTabHall: function () {
        this._btnTabHall = Utility.getButton("_btnTabHall", this.sizeBottomButtonTab);
        this.addChild(this._btnTabHall, GV.ZORDER_LEVEL.GUI);
        this._btnTabHall.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 2.5 * this.sizeBottomButtonTab.width,
            y: 0.75 * this.sizeBottomTab.height
        });
        //bg icon
        this._bgTabHall = new cc.Sprite("#hall_1.png");
        this._btnTabHall.addChild(this._bgTabHall,GV.ZORDER_LEVEL.BG);
        this._bgTabHall.attr({
            anchorX: 0.5,
            anchorY: 1,
            x: 0.5 * this.sizeBottomButtonTab.width,
            y: this.sizeBottomButtonTab.height
        });
        //text
        var lb = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32,Utility.getColorByName("blue"),true,true);
        lb.setString("Hall");
        this._btnTabHall.addChild(lb,GV.ZORDER_LEVEL.GUI);
        lb.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: 0.5 * this.sizeBottomButtonTab.width,
            y: - 0.25 * this.sizeBottomButtonTab.height
        });
    },
    createButtonTabSetting: function () {
        this._btnTabSetting = Utility.getButton("_btnTabSetting", this.sizeBottomButtonTab);
        this.addChild(this._btnTabSetting, GV.ZORDER_LEVEL.GUI);
        this._btnTabSetting.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 3.5 * this.sizeBottomButtonTab.width,
            y: 0.75 * this.sizeBottomTab.height
        });
        //bg icon
        this._bgTabSetting = new cc.Sprite("#setting_1.png");
        this._btnTabSetting.addChild(this._bgTabSetting,GV.ZORDER_LEVEL.BG);
        this._bgTabSetting.attr({
            anchorX: 0.5,
            anchorY: 1,
            x: 0.5 * this.sizeBottomButtonTab.width,
            y: this.sizeBottomButtonTab.height
        });
        //text
        var lb = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32,Utility.getColorByName("blue"),true,true);
        lb.setString("Settings");
        this._btnTabSetting.addChild(lb,GV.ZORDER_LEVEL.GUI);
        lb.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: 0.5 * this.sizeBottomButtonTab.width,
            y: - 0.25 * this.sizeBottomButtonTab.height
        });
    },

    createBackground: function () {
        this._sprBg = new cc.Sprite(res.bg_lobby_png);
        this.addChild(this._sprBg, GV.ZORDER_LEVEL.BG);
        this._sprBg.attr({
            x: GV.WIN_SIZE.width >> 1,
            y: GV.WIN_SIZE.height >> 1
        });
        var bgSize = this._sprBg.getContentSize();
        var delta_ratio_x = GV.WIN_SIZE.width / bgSize.width;
        var delta_ratio_y = GV.WIN_SIZE.height / bgSize.height;
        this._sprBg.setScale(delta_ratio_x, delta_ratio_y);
    },
    createTopButtonInfo: function () {
        this.createButtonLevel();
        this.createButtonHeart();
        this.createButtonMusic();
        this.createButtonDiamondCoin();
    },
    getBackgroundTopIcon: function () {
        var bg = new cc.Sprite("#bgglow_diamond.png");
        bg = new cc.Scale9Sprite(bg.getSpriteFrame());
        bg.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });
        //var bgSize = bg.getContentSize();
        //var delta_ratio_x = this.sizeButtonTop.width / bgSize.width;
        //var delta_ratio_y = this.sizeButtonTop.height / bgSize.height;
        //bg.setScale(delta_ratio_x, delta_ratio_y);
        bg.setContentSize(this.sizeButtonTop);
        return bg;
    },
    createButtonLevel: function () {
        this._btnLevel = Utility.getButton("_btnLevel", this.sizeButtonTop);
        this.addChild(this._btnLevel, GV.ZORDER_LEVEL.GUI);
        this._btnLevel.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.marginButtonTop + 0.5 * this.sizeButtonTop.width,
            y: this.BACK_GROUND_SIZE.height - this.sizeButtonTop.height * 0.5 - this.marginButtonTop * 2
        });
        //background button
        var bg = this.getBackgroundTopIcon();
        this._btnLevel.addChild(bg, GV.ZORDER_LEVEL.BG);

        this.createProgressLevel();
    },
    createProgressLevel: function () {

    },
    createButtonHeart: function () {
        this._btnHeart = Utility.getButton("_btnHeart", this.sizeButtonTop);
        this.addChild(this._btnHeart, GV.ZORDER_LEVEL.GUI);
        this._btnHeart.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 2 * this.marginButtonTop + 1.5 * this.sizeButtonTop.width,
            y: this.BACK_GROUND_SIZE.height - this.sizeButtonTop.height * 0.5 - this.marginButtonTop * 2
        });
        //background button
        var bg = this.getBackgroundTopIcon();
        this._btnHeart.addChild(bg, GV.ZORDER_LEVEL.BG);

    },
    createButtonMusic: function () {
        this._btnMusic = Utility.getButton("_btnMusic", this.sizeButtonTop);
        this.addChild(this._btnMusic, GV.ZORDER_LEVEL.GUI);
        this._btnMusic.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 3 * this.marginButtonTop + 2.5 * this.sizeButtonTop.width,
            y: this.BACK_GROUND_SIZE.height - this.sizeButtonTop.height * 0.5 - this.marginButtonTop * 2
        });
        //background button
        var bg = this.getBackgroundTopIcon();
        this._btnMusic.addChild(bg, GV.ZORDER_LEVEL.BG);
    },
    createButtonDiamondCoin: function () {
        this._btnDiamondCoin = Utility.getButton("_btnDiamondCoin", this.sizeButtonTop);
        this.addChild(this._btnDiamondCoin, GV.ZORDER_LEVEL.GUI);
        this._btnDiamondCoin.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 4 * this.marginButtonTop + 3.5 * this.sizeButtonTop.width,
            y: this.BACK_GROUND_SIZE.height - this.sizeButtonTop.height * 0.5 - this.marginButtonTop * 2
        });
        //background button
        var bg = this.getBackgroundTopIcon();
        this._btnDiamondCoin.addChild(bg, GV.ZORDER_LEVEL.BG);
    },
    onEnter:function () {
        this._super();
    },
    onExit: function () {
        this._super();
    },
    onEnterTransitionDidFinish: function () {
        this._super();
    },
    createLabelTest: function () {
        this._lbText = Utility.getLabel(res.FONT_MARKER_FELT, 72);
        this.addChild(this._lbText);
        this._lbText.attr({
            x: GV.WIN_SIZE.width >>1,
            y: GV.WIN_SIZE.height >>1
        });
        this._lbText.setString("Scene Lobby Here");
    },
    onTouchUIEndEvent: function (sender) {
        switch (sender) {
            case this._btnLevel:
                //break;
            case this._btnHeart:
                //break;
            case this._btnDiamondCoin:
                //break;
            case this._btnMusic:
                GV.MODULE_MGR.restartGame();
                break;
            case this._btnTabHome:
                this._pageView.setCurPageIndex(0);
                this._checkCurrentTab();
                break;
            case this._btnTabMusic:
                this._pageView.setCurPageIndex(1);
                this._checkCurrentTab();
                break;
            case this._btnTabHall:
                this._pageView.setCurPageIndex(2);
                this._checkCurrentTab();
                break;
            case this._btnTabSetting:
                this._pageView.setCurPageIndex(3);
                this._checkCurrentTab();
                break;

        }
        //GV.MODULE_MGR.showPopup("Chức năng này chưa code", "THÔNG BÁO");
    },
    _checkCurrentTab: function () {
        var index = this._pageView.getCurPageIndex();
        //tab 0
        var enable = index != 0;
        this._btnTabHome.enabled = enable;
        //tab 1
        enable = index != 1;
        this._btnTabMusic.enabled = enable;
        //tab 2
        enable = index != 2;
        this._btnTabHall.enabled = enable;
        //tab 3
        enable = index != 3;
        this._btnTabSetting.enabled = enable;
    }
});


var SceneLobby = BaseScene.extend({
    ctor: function () {
        this._super();
        this.BACK_GROUND_SIZE = GV.WIN_SIZE;
        this.NUM_TAB_LOBBY = 3;
        this.marginButtonTop = 5;
        this.sizeButtonTop = cc.size(
            (GV.WIN_SIZE.width - 5 * this.marginButtonTop) / 4,
            50
        );
        this.sizeBottomTab = cc.size(0, 0);
        this.sizeBottomButtonTab = cc.size(0, 0);
        this.sizeIconMusicGold = this.sizeButtonTop.height * 0.7;
        this.sizeIconDiamondCoin = this.sizeButtonTop.height * 0.7;
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
                    x: 0,
                    y: 0
                });
                tabObj.setSize(contentSize);
            }
            this._pageView.addPage(layout);
        }
    },
    createPageView: function () {
        this.sizePageView = cc.size(
            GV.WIN_SIZE.width,
            GV.WIN_SIZE.height - (
                //2 * this.marginButtonTop
                +this.sizeButtonTop.height
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
            case GV.TAB_LOBBY_INDEX.HOME:
                if (!this.lobbyTabHome) {
                    this.lobbyTabHome = new LobbyTabHome(this.sizePageView);
                }
                guiObj = this.lobbyTabHome;
                break;
            case GV.TAB_LOBBY_INDEX.MUSIC:
                if (!this.lobbyTabMusic) {
                    this.lobbyTabMusic = new LobbyTabMusic(this.sizePageView);
                }
                guiObj = this.lobbyTabMusic;
                break;
            case GV.TAB_LOBBY_INDEX.SETTING:
                if (!this.lobbyTabSetting) {
                    this.lobbyTabSetting = new LobbyTabSetting(this.sizePageView);
                }
                guiObj = this.lobbyTabSetting;
                break;
        }
        return guiObj;
    },
    createBottomTab: function () {
        //background
        this.createBgBottomTab();
        //button tab
        this.createButtonTabHome();
        this.createButtonTabMusic();
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
        this.sizeBottomButtonTab.width = this.sizeBottomTab.width / this.NUM_TAB_LOBBY;
    },
    createButtonTabHome: function () {
        this._btnTabHome = Utility.getButton("_btnTabHome", this.sizeBottomButtonTab);
        this.addChild(this._btnTabHome, GV.ZORDER_LEVEL.GUI);
        this._btnTabHome.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0.5 * this.sizeBottomButtonTab.width,
            y: 0.7 * this.sizeBottomTab.height
        });
        //bg icon
        this._bgTabHome = new cc.Sprite("#home_1.png");
        this._btnTabHome.addChild(this._bgTabHome, GV.ZORDER_LEVEL.BG);
        this._bgTabHome.attr({
            anchorX: 0.5,
            anchorY: 1,
            x: 0.5 * this.sizeBottomButtonTab.width,
            y: 0.9 * this.sizeBottomButtonTab.height
        });
        //text
        this._lbTabHome = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 28, Utility.getColorByName("blue"), true, true);
        this._lbTabHome.setString("Home");
        this._btnTabHome.addChild(this._lbTabHome, GV.ZORDER_LEVEL.GUI);
        this._lbTabHome.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: 0.5 * this.sizeBottomButtonTab.width,
            y: -0.2 * this.sizeBottomButtonTab.height
        });
    },
    createButtonTabMusic: function () {
        this._btnTabMusic = Utility.getButton("_btnTabMusic", this.sizeBottomButtonTab);
        this.addChild(this._btnTabMusic, GV.ZORDER_LEVEL.GUI);
        this._btnTabMusic.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 1.5 * this.sizeBottomButtonTab.width,
            y: 0.7 * this.sizeBottomTab.height
        });
        //bg icon
        this._bgTabMusic = new cc.Sprite("#music_1.png");
        this._btnTabMusic.addChild(this._bgTabMusic, GV.ZORDER_LEVEL.BG);
        this._bgTabMusic.attr({
            anchorX: 0.5,
            anchorY: 1,
            x: 0.5 * this.sizeBottomButtonTab.width,
            y: 0.9 * this.sizeBottomButtonTab.height
        });
        //text
        this._lbTabMusic = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 28, Utility.getColorByName("blue"), true, true);
        this._lbTabMusic.setString("Music");
        this._btnTabMusic.addChild(this._lbTabMusic, GV.ZORDER_LEVEL.GUI);
        this._lbTabMusic.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: 0.5 * this.sizeBottomButtonTab.width,
            y: -0.2 * this.sizeBottomButtonTab.height
        });
    },
    createButtonTabSetting: function () {
        this._btnTabSetting = Utility.getButton("_btnTabSetting", this.sizeBottomButtonTab);
        this.addChild(this._btnTabSetting, GV.ZORDER_LEVEL.GUI);
        this._btnTabSetting.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 2.5 * this.sizeBottomButtonTab.width,
            y: 0.7 * this.sizeBottomTab.height
        });
        //bg icon
        this._bgTabSetting = new cc.Sprite("#setting_1.png");
        this._btnTabSetting.addChild(this._bgTabSetting, GV.ZORDER_LEVEL.BG);
        this._bgTabSetting.attr({
            anchorX: 0.5,
            anchorY: 1,
            x: 0.5 * this.sizeBottomButtonTab.width,
            y: 0.9 * this.sizeBottomButtonTab.height
        });
        //text
        this._lbTabSetting = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 28, Utility.getColorByName("blue"), true, true);
        this._lbTabSetting.setString("Setting");
        this._btnTabSetting.addChild(this._lbTabSetting, GV.ZORDER_LEVEL.GUI);
        this._lbTabSetting.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: 0.5 * this.sizeBottomButtonTab.width,
            y: -0.2 * this.sizeBottomButtonTab.height
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
        //this.createButtonLevel();
        //this.createButtonHeart();
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
            x: 2 * this.marginButtonTop + 1.5 * this.sizeButtonTop.width,
            y: this.BACK_GROUND_SIZE.height - this.sizeButtonTop.height * 0.5 - this.marginButtonTop * 2
        });
        //background button
        var bg = this.getBackgroundTopIcon();
        this._btnMusic.addChild(bg, GV.ZORDER_LEVEL.BG);

        this.createIconMusicGold(this._btnMusic);
        this.createLabelNumberMusicGold(this._btnMusic);
    },
    createIconMusicGold: function (btnObj) {
        this._sprIconMusicGold = new cc.Sprite("#result_icon_coin.png");
        btnObj.addChild(this._sprIconMusicGold, GV.ZORDER_LEVEL.BG);
        this._sprIconMusicGold.setScale(this.sizeIconMusicGold / this._sprIconMusicGold.width);

        this._sprIconMusicGold.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 10,
            y: this.sizeButtonTop.height >> 1
        });
    },
    createLabelNumberMusicGold: function (btnObj) {
        this._lbNumberGold = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32, Utility.getColorByName("black"), true, true);
        btnObj.addChild(this._lbNumberGold, GV.ZORDER_LEVEL.GUI);
        this._lbNumberGold.setString("2.017");
        this._lbNumberGold.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: this._sprIconMusicGold.x + (1.1 - this._sprIconMusicGold.anchorX) * this._sprIconMusicGold.width * this._sprIconMusicGold.getScaleX(),
            y: this.sizeButtonTop.height >> 1
        });
    },
    createButtonDiamondCoin: function () {
        this._btnDiamondCoin = Utility.getButton("_btnDiamondCoin", this.sizeButtonTop);
        this.addChild(this._btnDiamondCoin, GV.ZORDER_LEVEL.GUI);
        this._btnDiamondCoin.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 3 * this.marginButtonTop + 2.5 * this.sizeButtonTop.width,
            y: this.BACK_GROUND_SIZE.height - this.sizeButtonTop.height * 0.5 - this.marginButtonTop * 2
        });
        //background button
        var bg = this.getBackgroundTopIcon();
        this._btnDiamondCoin.addChild(bg, GV.ZORDER_LEVEL.BG);
        this.createIconDiamondCoin(this._btnDiamondCoin);
        this.createLabelNumberDiamondCoin(this._btnDiamondCoin);
    },
    createIconDiamondCoin: function (btnObj) {
        this._sprIconDiamondCoin = new cc.Sprite("#icon_diamond.png");
        btnObj.addChild(this._sprIconDiamondCoin, GV.ZORDER_LEVEL.BG);
        this._sprIconDiamondCoin.setScale(this.sizeIconDiamondCoin / this._sprIconDiamondCoin.width);

        this._sprIconDiamondCoin.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 10,
            y: this.sizeButtonTop.height >> 1
        });
    },
    createLabelNumberDiamondCoin: function (btnObj) {
        this._lbNumberGold = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32, Utility.getColorByName("black"), true, true);
        btnObj.addChild(this._lbNumberGold, GV.ZORDER_LEVEL.GUI);
        this._lbNumberGold.setString("2.017");
        this._lbNumberGold.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: this._sprIconDiamondCoin.x + (1.1 - this._sprIconDiamondCoin.anchorX) * this._sprIconDiamondCoin.width * this._sprIconDiamondCoin.getScaleX(),
            y: this.sizeButtonTop.height >> 1
        });
    },
    setCurTabView: function () {
        this._pageView.setCurPageIndex(GV.MODULE_MGR.curTabLobby);
        this._checkCurrentTab();
        GV.MODULE_MGR.curTabLobby = GV.TAB_LOBBY_INDEX.HOME;
    },
    onEnter: function () {
        this._super();
        GV.MODULE_MGR.updateListMusicTabHome([]);
        GV.MODULE_MGR.updateListMusicTabMusic([]);
        this.schedule(this.update.bind(this), 0.04);
        switch (GV.MODULE_MGR.requireSaveOldContentOffset){
            case GV.TAB_LOBBY_INDEX.HOME:
                this.lobbyTabHome.musicTableView.setContentOffset(GV.CUR_CONTENT_OFFSET);
                break;
            case GV.TAB_LOBBY_INDEX.MUSIC:
                this.lobbyTabMusic.musicTableView.setContentOffset(GV.CUR_CONTENT_OFFSET);
                break;
        }
        GV.MODULE_MGR.requireSaveOldContentOffset = false;
        this.setCurTabView();
        GV.MODULE_MGR.updateCurrentMusicTabHome(GV.MODULE_MGR._curSong);
    },
    onExit: function () {
        this._super();
    },
    onEnterTransitionDidFinish: function () {
        this._super();
    },
    onTouchUIEndEvent: function (sender) {
        switch (sender) {
            case this._btnMusic:
                break;
            case this._btnDiamondCoin:
            break;

            case this._btnTabHome:
                this._pageView.setCurPageIndex(GV.TAB_LOBBY_INDEX.HOME);
                this._checkCurrentTab();
                break;
            case this._btnTabMusic:
                this._pageView.setCurPageIndex(GV.TAB_LOBBY_INDEX.MUSIC);
                this._checkCurrentTab();
                break;
            case this._btnTabSetting:
                this._pageView.setCurPageIndex(GV.TAB_LOBBY_INDEX.SETTING);
                this._checkCurrentTab();
                break;

        }
        //GV.MODULE_MGR.showPopup("Chức năng này chưa code", "THÔNG BÁO");
    },
    _checkCurrentTab: function () {
        var index = this._pageView.getCurPageIndex();
        //tab 0 _btnTabHome
        enable = index != GV.TAB_LOBBY_INDEX.HOME;
        this._btnTabHome.enabled = enable;
        this.setBrightBottomTabButton("Home", enable);
        //tab 1 _btnTabMusic
        var enable = index != GV.TAB_LOBBY_INDEX.MUSIC;
        this._btnTabMusic.enabled = enable;
        this.setBrightBottomTabButton("Music", enable);
        //tab 2 _btnTabSetting
        enable = index != GV.TAB_LOBBY_INDEX.SETTING;
        this._btnTabSetting.enabled = enable;
        this.setBrightBottomTabButton("Setting", enable);
    },
    setBrightBottomTabButton: function (type, enable) {
        if (!type || !this["_bgTab" + type]) {
            cc.error("set bright for button with null args");
            return null;
        }
        //this["_lbTab" + type].visible = enable;
        this["_bgTab" + type].stopAllActions();
        var imgName = type.toLowerCase() + "_";
        var action;
        if (!enable) {
            //var animCache = cc.animationCache;
            var animation;
            var actionTime = 0.01;
            //animation = animCache.getAnimation(type);
            if (animation) {
                animation.setRestoreOriginalFrame(true);
            } else {
                var animFrames = [];
                var str, frame;
                for (var i = 1; i <= 7; ++i) {
                    str = imgName + i + ".png";
                    frame = cc.spriteFrameCache.getSpriteFrame(str);
                    animFrames.push(frame);
                }
                animation = new cc.Animation(animFrames, actionTime);
                animation.retain();
                // Add an animation to the Cache
                cc.animationCache.addAnimation(animation, type);
            }
            action = cc.animate(animation);
            this["_bgTab" + type].runAction(action);
            this["_lbTab" + type].setColor(Utility.getColorByName("white"));
            this["_lbTab" + type].setFontSize(32);
        } else {
            action = new cc.Animation([cc.spriteFrameCache.getSpriteFrame(imgName + "1.png")], 0.01);
            action = cc.animate(action);
            this["_bgTab" + type].runAction(action);
            this["_lbTab" + type].setColor(Utility.getColorByName("blue"));
            this["_lbTab" + type].setFontSize(28);
        }
    },
    update: function (dt) {
        this.lobbyTabHome.update(dt);
    }
});


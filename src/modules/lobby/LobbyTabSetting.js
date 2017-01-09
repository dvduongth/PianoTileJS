var LobbyTabSetting = BaseGUI.extend({
    _className: "LobbyTabSetting",

    ctor: function (size) {
        this._super();
        //variables
        if(size) {
            this.BACK_GROUND_SIZE = size;
        }else {
            this.BACK_GROUND_SIZE = cc.size(GV.WIN_SIZE.width, GV.WIN_SIZE.height);
        }
        this.listViewSize = cc.size(this.BACK_GROUND_SIZE.width * 0.98, this.BACK_GROUND_SIZE.height);
        this.elementSize = cc.size(this.listViewSize.width, GV.WIN_SIZE.height * 0.15);
        this.initGui();
    },

    initGui: function () {
        //this.createBackground();
        this.createSettingListView();
        this.createSoundSetting();
        this.createGameBackgroundSetting();
        this.createTileColorSetting();
        this.createGameModeSetting();
        this.createTileEffectSetting();
        this.createUpgradeVersionSetting();
        this.createShareFunctionSetting();
        this.createRateFunctionSetting();

        //this.createLabelTest();
        //update view
        this.syncAllChildren();
    },
    getBackgroundButtonElement: function () {
        var sprBgButton = new cc.Sprite(res.item_like_bg_png);
        var deltaRatioWidth = this.elementSize.width / sprBgButton.width;
        var deltaRatioHeight = this.elementSize.height / sprBgButton.height;
        sprBgButton.setScale(deltaRatioWidth, deltaRatioHeight);
        sprBgButton.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });
        return sprBgButton;
    },
    getButtonElement: function (buttonName) {
        if(!buttonName) {
            buttonName = "_btn";
        }
        var btnElement = Utility.getButton(buttonName, this.elementSize);
        btnElement.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });
        btnElement.setSwallowTouches(false);
        var bgName = buttonName.replace("_btn","_sprBg");
        this[bgName] = this.getBackgroundButtonElement();
        btnElement.addChild(this[bgName],GV.ZORDER_LEVEL.BG);
        btnElement.setZoomScale(-0.01);
        return btnElement;
    },
    createSoundSetting: function () {
        this._btnSound = this.getButtonElement("_btnSound");
        var layout = ccui.Layout();
        layout.setContentSize(this._btnSound["contentSize"].width, this._btnSound["contentSize"].height);
        layout.addChild(this._btnSound);
        //create sound icon
        this._sprSoundIcon = new cc.Sprite("#icon_sound.png");
        this._btnSound.addChild(this._sprSoundIcon, GV.ZORDER_LEVEL.BG);
        var iconSize = this._btnSound["contentSize"].height * 0.5;
        this._sprSoundIcon.setScale(iconSize / this._sprSoundIcon.width);

        this._sprSoundIcon.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 20,
            y: this._btnSound["contentSize"].height >> 1
        });
        //create label sound title
        this._lbSoundTitle = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32, Utility.getColorByName("black"), true, true);
        this._btnSound.addChild(this._lbSoundTitle, GV.ZORDER_LEVEL.GUI);
        this._lbSoundTitle.setString("SOUND");
        this._lbSoundTitle.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: this._sprSoundIcon.x + this._sprSoundIcon.width * this._sprSoundIcon.getScaleX() + 20,
            y: this._btnSound["contentSize"].height >> 1
        });
        //create label sound state
        this._lbSoundState = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32, Utility.getColorByName("black"), true, true);
        this._btnSound.addChild(this._lbSoundState, GV.ZORDER_LEVEL.GUI);
        this._lbSoundState.setString("ON");
        this._lbSoundState.attr({
            anchorX: 1,
            anchorY: 0.5,
            x: this._btnSound["contentSize"].width - 40,
            y: this._btnSound["contentSize"].height >> 1
        });
        //add to list view
        this.settingListView.pushBackCustomItem(layout);
    },
    createGameBackgroundSetting: function () {
        this._btnGameBackground = this.getButtonElement("_btnGameBackground");
        var layout = ccui.Layout();
        layout.setContentSize(this._btnGameBackground["contentSize"].width, this._btnGameBackground["contentSize"].height + 10);
        layout.addChild(this._btnGameBackground);
        //create icon
        this._sprGameBackground = new cc.Sprite("#icon_language.png");
        this._btnGameBackground.addChild(this._sprGameBackground, GV.ZORDER_LEVEL.BG);
        var iconSize = this._btnGameBackground["contentSize"].height * 0.5;
        this._sprGameBackground.setScale(iconSize / this._sprGameBackground.width);

        this._sprGameBackground.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 20,
            y: this._btnGameBackground["contentSize"].height >> 1
        });
        //create label title
        this._lbGameBackgroundTitle = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32, Utility.getColorByName("black"), true, true);
        this._btnGameBackground.addChild(this._lbGameBackgroundTitle, GV.ZORDER_LEVEL.GUI);
        this._lbGameBackgroundTitle.setString("Game Background");
        this._lbGameBackgroundTitle.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: this._sprGameBackground.x + this._sprGameBackground.width * this._sprGameBackground.getScaleX() + 20,
            y: this._btnGameBackground["contentSize"].height >> 1
        });
        //create label state
        this._lbGameBackgroundState = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32, Utility.getColorByName("black"), true, true);
        this._btnGameBackground.addChild(this._lbGameBackgroundState, GV.ZORDER_LEVEL.GUI);
        this._lbGameBackgroundState.setString("Normal");
        this._lbGameBackgroundState.attr({
            anchorX: 1,
            anchorY: 0.5,
            x: this._btnGameBackground["contentSize"].width - 40,
            y: this._btnGameBackground["contentSize"].height >> 1
        });
        //add to list view
        this.settingListView.pushBackCustomItem(layout);
    },
    createTileColorSetting: function () {
        this._btnTileColor = this.getButtonElement("_btnTileColor");
        var layout = ccui.Layout();
        layout.setContentSize(this._btnTileColor["contentSize"].width, this._btnTileColor["contentSize"].height + 10);
        layout.addChild(this._btnTileColor);
        //create icon
        this._sprTileColor = new cc.Sprite("#level_progress_bar.png");
        this._btnTileColor.addChild(this._sprTileColor, GV.ZORDER_LEVEL.BG);
        var iconSize = this._btnTileColor["contentSize"].height * 0.5;
        this._sprTileColor.setScale(iconSize / this._sprTileColor.width);

        this._sprTileColor.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 20,
            y: this._btnTileColor["contentSize"].height >> 1
        });
        //create label title
        this._lbTileColorTitle = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32, Utility.getColorByName("black"), true, true);
        this._btnTileColor.addChild(this._lbTileColorTitle, GV.ZORDER_LEVEL.GUI);
        this._lbTileColorTitle.setString("Tile Color");
        this._lbTileColorTitle.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: this._sprTileColor.x + this._sprTileColor.width * this._sprTileColor.getScaleX() + 20,
            y: this._btnTileColor["contentSize"].height >> 1
        });
        //create label state
        this._lbTileColorState = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32, Utility.getColorByName("black"), true, true);
        this._btnTileColor.addChild(this._lbTileColorState, GV.ZORDER_LEVEL.GUI);
        this._lbTileColorState.setString("Light Blue");
        this._lbTileColorState.attr({
            anchorX: 1,
            anchorY: 0.5,
            x: this._btnTileColor["contentSize"].width - 40,
            y: this._btnTileColor["contentSize"].height >> 1
        });
        //add to list view
        this.settingListView.pushBackCustomItem(layout);
    },
    createGameModeSetting: function () {
        this._btnGameMode = this.getButtonElement("_btnGameMode");
        var layout = ccui.Layout();
        layout.setContentSize(this._btnGameMode["contentSize"].width, this._btnGameMode["contentSize"].height + 10);
        layout.addChild(this._btnGameMode);
        //create icon
        this._sprGameMode = new cc.Sprite("#icon_game.png");
        this._btnGameMode.addChild(this._sprGameMode, GV.ZORDER_LEVEL.BG);
        var iconSize = this._btnGameMode["contentSize"].height * 0.5;
        this._sprGameMode.setScale(iconSize / this._sprGameMode.width);

        this._sprGameMode.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 20,
            y: this._btnGameMode["contentSize"].height >> 1
        });
        //create label title
        this._lbGameModeTitle = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32, Utility.getColorByName("black"), true, true);
        this._btnGameMode.addChild(this._lbGameModeTitle, GV.ZORDER_LEVEL.GUI);
        this._lbGameModeTitle.setString("Game Mode");
        this._lbGameModeTitle.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: this._sprGameMode.x + this._sprGameMode.width * this._sprGameMode.getScaleX() + 20,
            y: this._btnGameMode["contentSize"].height >> 1
        });
        //create label state
        this._lbGameModeState = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32, Utility.getColorByName("black"), true, true);
        this._btnGameMode.addChild(this._lbGameModeState, GV.ZORDER_LEVEL.GUI);
        this._lbGameModeState.setString("Easy \(score: x1\)");
        this._lbGameModeState.attr({
            anchorX: 1,
            anchorY: 0.5,
            x: this._btnGameMode["contentSize"].width - 40,
            y: this._btnGameMode["contentSize"].height >> 1
        });
        //add to list view
        this.settingListView.pushBackCustomItem(layout);
    },
    createTileEffectSetting: function () {
        this._btnTileEffect = this.getButtonElement("_btnTileEffect");
        var layout = ccui.Layout();
        layout.setContentSize(this._btnTileEffect["contentSize"].width, this._btnTileEffect["contentSize"].height + 10);
        layout.addChild(this._btnTileEffect);
        //create icon
        this._sprTileEffect = new cc.Sprite("#icon_invitefriends.png");
        this._btnTileEffect.addChild(this._sprTileEffect, GV.ZORDER_LEVEL.BG);
        var iconSize = this._btnTileEffect["contentSize"].height * 0.5;
        this._sprTileEffect.setScale(iconSize / this._sprTileEffect.width);

        this._sprTileEffect.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 20,
            y: this._btnTileEffect["contentSize"].height >> 1
        });
        //create label title
        this._lbTileEffectTitle = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32, Utility.getColorByName("black"), true, true);
        this._btnTileEffect.addChild(this._lbTileEffectTitle, GV.ZORDER_LEVEL.GUI);
        this._lbTileEffectTitle.setString("Tile Effect");
        this._lbTileEffectTitle.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: this._sprTileEffect.x + this._sprTileEffect.width * this._sprTileEffect.getScaleX() + 20,
            y: this._btnTileEffect["contentSize"].height >> 1
        });
        //create label state
        this._lbTileEffectState = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32, Utility.getColorByName("black"), true, true);
        this._btnTileEffect.addChild(this._lbTileEffectState, GV.ZORDER_LEVEL.GUI);
        this._lbTileEffectState.setString("Heart");
        this._lbTileEffectState.attr({
            anchorX: 1,
            anchorY: 0.5,
            x: this._btnTileEffect["contentSize"].width - 40,
            y: this._btnTileEffect["contentSize"].height >> 1
        });
        //add to list view
        this.settingListView.pushBackCustomItem(layout);
    },
    createUpgradeVersionSetting: function () {
        this._btnUpgradeVersion = this.getButtonElement("_btnUpgradeVersion");
        var layout = ccui.Layout();
        layout.setContentSize(this._btnUpgradeVersion["contentSize"].width, this._btnUpgradeVersion["contentSize"].height + 10);
        layout.addChild(this._btnUpgradeVersion);
        //create icon
        this._sprUpgradeVersion = new cc.Sprite("#icon_star_gp.png");
        this._btnUpgradeVersion.addChild(this._sprUpgradeVersion, GV.ZORDER_LEVEL.BG);
        var iconSize = this._btnUpgradeVersion["contentSize"].height * 0.5;
        this._sprUpgradeVersion.setScale(iconSize / this._sprUpgradeVersion.width);

        this._sprUpgradeVersion.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 20,
            y: this._btnUpgradeVersion["contentSize"].height >> 1
        });
        //create label title
        this._lbUpgradeVersionTitle = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32, Utility.getColorByName("black"), true, true);
        this._btnUpgradeVersion.addChild(this._lbUpgradeVersionTitle, GV.ZORDER_LEVEL.GUI);
        this._lbUpgradeVersionTitle.setString("Upgrade Premium");
        this._lbUpgradeVersionTitle.attr({
            anchorX: 0,
            anchorY: 1,
            x: this._sprUpgradeVersion.x + this._sprUpgradeVersion.width * this._sprUpgradeVersion.getScaleX() + 20,
            y: this._btnUpgradeVersion["contentSize"].height - 20
        });
        //create label state
        this._lbUpgradeVersionState = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 24, Utility.getColorByName("black"), true, true);
        this._btnUpgradeVersion.addChild(this._lbUpgradeVersionState, GV.ZORDER_LEVEL.GUI);
        this._lbUpgradeVersionState.attr({
            anchorX: 0,
            anchorY: 1,
            x: this._lbUpgradeVersionTitle.x,
            y: this._lbUpgradeVersionTitle.y - this._lbUpgradeVersionTitle.height - 5
        });
        this._lbUpgradeVersionState.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM);
        this._lbUpgradeVersionState.setTextAreaSize(cc.size(
            this._btnUpgradeVersion["contentSize"].width - (this._sprUpgradeVersion.x + this._sprUpgradeVersion.width * this._sprUpgradeVersion.getScaleX() + 30),
            0
        ));
        this._lbUpgradeVersionState.setString("Buy us a coffee. You will be able to play all songs,\nremove ads and get more new songs in the future.");
        //add to list view
        this.settingListView.pushBackCustomItem(layout);
    },
    createShareFunctionSetting: function () {
        this._btnShareFunction = this.getButtonElement("_btnShareFunction");
        var layout = ccui.Layout();
        layout.setContentSize(this._btnShareFunction["contentSize"].width, this._btnShareFunction["contentSize"].height + 10);
        layout.addChild(this._btnShareFunction);
        //create icon
        this._sprShareFunction = new cc.Sprite("#rank_button_social_blue.png");
        this._btnShareFunction.addChild(this._sprShareFunction, GV.ZORDER_LEVEL.BG);
        var iconSize = this._btnShareFunction["contentSize"].height * 0.5;
        this._sprShareFunction.setScale(iconSize / this._sprShareFunction.width);

        this._sprShareFunction.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 20,
            y: this._btnShareFunction["contentSize"].height >> 1
        });
        //create label title
        this._lbShareFunctionTitle = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32, Utility.getColorByName("black"), true, true);
        this._btnShareFunction.addChild(this._lbShareFunctionTitle, GV.ZORDER_LEVEL.GUI);
        this._lbShareFunctionTitle.setString("Share");
        this._lbShareFunctionTitle.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: this._sprShareFunction.x + this._sprShareFunction.width * this._sprShareFunction.getScaleX() + 20,
            y: this._btnShareFunction["contentSize"].height >> 1
        });
        //create label state
        this._lbShareFunctionState = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32, Utility.getColorByName("black"), true, true);
        this._btnShareFunction.addChild(this._lbShareFunctionState, GV.ZORDER_LEVEL.GUI);
        this._lbShareFunctionState.setString("Facebook");
        this._lbShareFunctionState.attr({
            anchorX: 1,
            anchorY: 0.5,
            x: this._btnShareFunction["contentSize"].width - 40,
            y: this._btnShareFunction["contentSize"].height >> 1
        });
        //add to list view
        this.settingListView.pushBackCustomItem(layout);
    },
    createRateFunctionSetting: function () {
        this._btnRateFunction = this.getButtonElement("_btnRateFunction");
        var layout = ccui.Layout();
        layout.setContentSize(this._btnRateFunction["contentSize"].width, this._btnRateFunction["contentSize"].height + 10);
        layout.addChild(this._btnRateFunction);
        //create icon
        this._sprRateFunction = new cc.Sprite("#icon_thanks.png");
        this._btnRateFunction.addChild(this._sprRateFunction, GV.ZORDER_LEVEL.BG);
        var iconSize = this._btnRateFunction["contentSize"].height * 0.5;
        this._sprRateFunction.setScale(iconSize / this._sprRateFunction.width);

        this._sprRateFunction.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 20,
            y: this._btnRateFunction["contentSize"].height >> 1
        });
        //create label title
        this._lbRateFunctionTitle = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 32, Utility.getColorByName("black"), true, true);
        this._btnRateFunction.addChild(this._lbRateFunctionTitle, GV.ZORDER_LEVEL.GUI);
        this._lbRateFunctionTitle.setString("Rate Us");
        this._lbRateFunctionTitle.attr({
            anchorX: 0,
            anchorY: 1,
            x: this._sprRateFunction.x + this._sprRateFunction.width * this._sprRateFunction.getScaleX() + 20,
            y: this._btnRateFunction["contentSize"].height - 20
        });
        //create label state
        this._lbRateFunctionState = Utility.getLabel(res.FONT_FUTURA_CONDENSED, 24, Utility.getColorByName("black"), true, true);
        this._btnRateFunction.addChild(this._lbRateFunctionState, GV.ZORDER_LEVEL.GUI);
        this._lbRateFunctionState.attr({
            anchorX: 0,
            anchorY: 1,
            x: this._lbRateFunctionTitle.x,
            y: this._lbRateFunctionTitle.y - this._lbRateFunctionTitle.height - 5
        });
        this._lbRateFunctionState.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        this._lbRateFunctionState.setTextAreaSize(cc.size(
            this._btnRateFunction["contentSize"].width - (this._sprRateFunction.x + this._sprRateFunction.width * this._sprRateFunction.getScaleX() + 30),
            0
        ));
        this._lbRateFunctionState.setString("If you like this app, please rate to support us.");
        //add to list view
        this.settingListView.pushBackCustomItem(layout);
    },
    createSettingListView: function () {
        if (!this.settingListView) {
            this.settingListView = new ccui.ListView();
            // set list view ex direction
            this.settingListView.setDirection(ccui.ScrollView.DIR_VERTICAL);
            this.settingListView.setTouchEnabled(true);
            this.settingListView.setBounceEnabled(true);
            this.settingListView.setScrollBarEnabled(false);
            this.settingListView.setContentSize(this.listViewSize);
            this.settingListView._className = "settingListView";
            this.addChild(this.settingListView, GV.ZORDER_LEVEL.GUI);
            this.settingListView.attr({
                anchorX: 0,
                anchorY: 0,
                x: (this.BACK_GROUND_SIZE.width - this.listViewSize.width) * 0.5,
                y: 0
            });
        }
    },
    createBackground: function () {
        //background
        this._sprBg = new cc.Sprite(res.bg_share_png);
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
    createLabelTest: function () {
        this._lbText = Utility.getLabel(res.FONT_MARKER_FELT, 72);
        this.addChild(this._lbText);
        this._lbText.attr({
            x: GV.WIN_SIZE.width >> 1,
            y: GV.WIN_SIZE.height >> 1
        });
        this._lbText.setString("Lobby Tab Setting");
    },
    /**
     * set info
     * */
    setInfo: function (data) {
        if (!data) {
            cc.error("set info lobby tab setting with null data");
            return null;
        }
        this.info = data;
    },
    onTouchUIEndEvent: function (sender) {
        //switch (sender) {
        //
        //}
    }
});

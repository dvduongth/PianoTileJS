var res = {
    //png
    Battle_Background_png : "res/xmas_map_bg.png",
    tile_music_png : "res/1.png",
    tile_music_undefined_png : "res/perlin_noise.png",

    //plist
    plist_1: "res/plist/1.plist",

    //GUI
    GUI_POPUP: "res/popup/GuiPopup.json"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

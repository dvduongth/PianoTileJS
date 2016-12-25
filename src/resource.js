var res = {
    //png
    battle_background_png : "res/resource/UIOpenning/opening_commonplaybg2.png",
    tile_music_png : "res/1.png",
    tile_white_png : "res/resource/GameImage/tile_white.png",
    gui_start_battle_bg_png : "res/resource/UITeam/classroom/teammusic_bg_white.png",
    bg_loading_png: "res/resource/UIOpenning/bg_small.jpg",
    bg_lobby_png: "res/resource/UIOpenning/bg_small_f.png",
    star_png: "res/resource/UIBattleMaster/star.png",
    star_light_png: "res/resource/UIBattleMaster/starlight.png",
    ball_small_dot_png: "res/resource/UIBattle/Effect/ballballball_smalldot.png",
    dot_light_png: "res/resource/Animation/dot_light.png",
    circle_light_png: "res/resource/Animation/circle_light.png",
    crazy_circle_png: "res/resource/Animation/crazy_circle.png",
    glow_png: "res/resource/GameImage/glow.png",

    //plist
    plist_1: "res/plist/1.plist",
    plist_band: "res/resource/UIPlist/Plist_band.plist",
    plist_content: "res/resource/UIPlist/Plist_content.plist",
    plist_battle_result: "res/resource/UIPlist/Battle_Result/Battle_Result.plist",
    plist_opening: "res/resource/UIOpenning/Plist_openning.plist",

    //font
    FONT_ARIAL: "res/fonts/arial.ttf",
    FONT_FUTURA_CONDENSED: "res/fonts/futura_condensed.ttf",
    FONT_MARKER_FELT: "res/fonts/marker_felt.ttf",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

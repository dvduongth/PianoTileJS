var GV = GV || {};
GV.WIN_SIZE = null;
GV.MODULE_MGR = null;
GV.SCENE_MGR = null;
GV.SCENE_IDS = {
    LOADING: 0,
    LOBBY: 1,
    BATTLE: 2
};
GV.ZORDER_LEVEL = {
    BG: 0,
    GUI: 100,
    EFFECT: 200,
    POPUP: 300,
    LOADING: 400,
    CURSOR: 500
};
GV.POPUP_MGR = null;

GV.NUM_COL = 4;
GV.TILE_TYPE = {
    UNDEFINED: "UNDEFINED",
    START: "START",
    SHORT: "SHORT",
    NORMAL: "NORMAL",
    LONG: "LONG"
};
/**
 * GV.TILE_HEIGHT_TYPE with values of GV.WIN_SIZE.height percent number
 * and calculate in main.js file on function cc.game.onStart
 * */
GV.TILE_HEIGHT_TYPE = {
    UNDEFINED: 25,
    START: 25,
    SHORT: 25,
    NORMAL: 35,
    LONG: 50
};
/**
 * game state
 * */
GV.GAME_STATE = {
    START: 0,
    RUNNING: 1,
    END: 2
};
/**
 * distant score to require up star level
 * */
GV.DISTANCE_UP_STAR_LEVEL = 15;
GV.MOVE_SPEED = 10;

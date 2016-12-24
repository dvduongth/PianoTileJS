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
    GUI: 1,
    EFFECT: 2,
    POPUP: 3,
    LOADING: 4,
    CURSOR: 5
};
GV.POPUP_MGR = null;

GV.NUM_COL = 4;
GV.MOVE_SPEED = 6;
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
    UNDEFINED: 20,
    START: 20,
    SHORT: 20,
    NORMAL: 30,
    LONG: 50
};

GV.UP_SPEED_DURATION = 100;
GV.GAME_STATE = {
    START: 0,
    RUNNING: 1,
    END: 2
};
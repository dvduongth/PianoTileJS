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
GV.TAB_LOBBY_INDEX = {
    HOME: 0,
    MUSIC: 1,
    SETTING: 2
};
GV.NUM_COL = 4;
GV.TILE_TYPE = {
    UNDEFINED: -1,
    START: 0,
    SHORT: 1,
    NORMAL: 2,
    LONG: 3
};
GV.CUR_CONTENT_OFFSET = cc.p(0,0);
/**
 * GV.TILE_HEIGHT_TYPE with values of GV.WIN_SIZE.height percent number
 * and calculate in main.js file on function cc.game.onStart
 * */
GV.TILE_HEIGHT_TYPE = {
    "-1": 25,
    "0": 25,
    "1": 25,
    "2": 70,
    "3": 120
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
GV.DISTANCE_UP_STAR_LEVEL = 50;
GV.MOVE_SPEED = 25;
GV.MAX_NUM_STAR = 3;
/**
 * game mode
 * */
GV.GAME_MODE = {
    AUTO: 1,
    MANUAL: 2
};
GV.ELEMENT_STATE = {
    LOCK: 0,
    UNLOCK: 1
};
GV.ACTION_STATE = {
    FREEDOM: 1,
    RUNNING: 2
};

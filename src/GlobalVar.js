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
GV.MOVE_SPEED = 5;
GV.TILE_TYPE = {
    UNDEFINED: -1,
    START: 0,
    SHORT: 1,
    NORMAL: 2,
    LONG: 3
};
GV.UP_SPEED_DURATION = 100;
GV.GAME_STATE = {
    START: 0,
    RUNNING: 1,
    END: 2
};
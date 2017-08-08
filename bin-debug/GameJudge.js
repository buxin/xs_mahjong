var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*/////////////////////////////////////////////////////////////////////////////////////

//公共属性
-----------
ownPartake:boolean;//自己是否坐下（只读）
----------
userPartake:boolean;//是否有用户坐下（只读）
-------------
userFull:boolean;//是否4个位置已经全部坐满（只读）
//公共方法

/////////////////////////////////////////////////////////////////////////////////////*/
var GameJudge = (function () {
    function GameJudge() {
    }
    Object.defineProperty(GameJudge, "ownPartake", {
        get: function () {
            for (var i = 0; i < GameData.userNumber; i++) {
                if (GameData.plays[i].tid == GameData.tid) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameJudge, "userPartake", {
        get: function () {
            for (var i = 0; i < GameData.userNumber; i++) {
                if (GameData.plays[i].tid != 0) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameJudge, "userFull", {
        get: function () {
            for (var i = 0; i < GameData.userNumber; i++) {
                if (GameData.plays[i].tid == 0) {
                    return false;
                }
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return GameJudge;
}());
__reflect(GameJudge.prototype, "GameJudge");
//# sourceMappingURL=GameJudge.js.map
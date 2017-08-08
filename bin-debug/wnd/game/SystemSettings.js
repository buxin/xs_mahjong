var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*/////////////////////////////////////////////////////////////////////////////////////

//公共方法

/////////////////////////////////////////////////////////////////////////////////////*/
var SystemSettings = (function (_super) {
    __extends(SystemSettings, _super);
    function SystemSettings() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/systemsettings.exml";
        return _this;
    }
    SystemSettings.prototype.onComplete = function () {
        this.init();
    };
    SystemSettings.prototype.init = function () {
        if (egret.localStorage.getItem("mjSetGameSound") != null) {
            GameData.gameSound = egret.localStorage.getItem("mjSetGameSound") == "true";
        }
        if (egret.localStorage.getItem("mjSetDialectSound") != null) {
            GameData.dialectSound = egret.localStorage.getItem("mjSetDialectSound");
        }
        this.soundButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begin, this);
        this.dialectButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.dialectClick, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeThis, this);
        //  console.log("?-------",GameData.gameSound, GameData.dialectSound)
        this.soundSelectChange();
    };
    SystemSettings.prototype.dialectClick = function (e) {
        if (GameData.dialectSound == "") {
            GameData.dialectSound = "a";
        }
        else
            GameData.dialectSound = "";
        egret.localStorage.setItem("mjSetDialectSound", GameData.dialectSound);
        this.soundSelectChange();
    };
    SystemSettings.prototype.begin = function (e) {
        GameData.gameSound = GameData.gameSound == false;
        egret.localStorage.setItem("mjSetGameSound", GameData.gameSound.toString());
        //  console.log(egret.localStorage.getItem("mjSetGameSound"))
        this.soundSelectChange();
    };
    SystemSettings.prototype.soundSelectChange = function () {
        if (GameData.gameSound) {
            this.soundIco.x = 402;
        }
        else
            this.soundIco.x = 461;
        if (GameData.dialectSound == "") {
            this.dialectIco.x = 402;
        }
        else
            this.dialectIco.x = 461;
    };
    //移除自己的时候
    SystemSettings.prototype.removeThis = function (e) {
        this.soundButton.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begin, this);
        this.dialectButton.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.dialectClick, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeThis, this);
    };
    return SystemSettings;
}(eui.Component));
__reflect(SystemSettings.prototype, "SystemSettings");
//# sourceMappingURL=SystemSettings.js.map
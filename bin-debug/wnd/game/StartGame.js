var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*/////////////////////////////////////////////////////////////////////////////////////
//公共事件
事件对象类型: CardsEvent
属性： CardsEvent.CLICK //牌点击事件
参数： name:点击的牌的编号
       值:start 点了开始按钮
                invitation 点了邀请按钮
-------------

//公共属性
-----------
startEnabled:boolean//是否显示开始按钮
//公共方法
switchButton(type:string);//切换按钮
type:"invitation" 显示邀请按钮
type:"start"  开始按钮
------------------

/////////////////////////////////////////////////////////////////////////////////////*/
var StartGame = (function (_super) {
    __extends(StartGame, _super);
    //
    function StartGame() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/startgame.exml";
        return _this;
    }
    StartGame.prototype.onComplete = function () {
        this.init();
    };
    StartGame.prototype.init = function () {
        this.startButton.name = "start";
        this.startButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startClick, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeThis, this);
    };
    StartGame.prototype.startClick = function (e) {
        var event = new ButtonEvent(ButtonEvent.CLICK);
        event.name = e.currentTarget.name;
        this.dispatchEvent(event);
    };
    Object.defineProperty(StartGame.prototype, "startEnabled", {
        get: function () {
            return this.startButton.visible;
        },
        //
        set: function (type) {
            this.startButton.visible = type;
        },
        enumerable: true,
        configurable: true
    });
    StartGame.prototype.switchButton = function (type) {
        if (type == "start") {
            this.startButton.texture = RES.getRes("buuton02_png");
            this.startButton.name = "start";
        }
        else {
            this.startButton.texture = RES.getRes("buuton03_png");
            this.startButton.name = "invitation";
        }
    };
    //
    //移除自己的时候
    StartGame.prototype.removeThis = function (e) {
        this.startButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startClick, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeThis, this);
        console.log("移除游戏内容");
    };
    return StartGame;
}(eui.Component));
__reflect(StartGame.prototype, "StartGame");
//# sourceMappingURL=StartGame.js.map
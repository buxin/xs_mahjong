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

-------------

//公共属性
direction://设置方向 0表示没有 1是东 2是西 3是南 4是北
-----------
eastPlace:number;//东边的方向设置0-4
//公共方法
timerPlay(timer:number);
-------
lightHide();隐藏光
---------
stop();//停止播放
/////////////////////////////////////////////////////////////////////////////////////*/
var UserDirection = (function (_super) {
    __extends(UserDirection, _super);
    function UserDirection() {
        var _this = _super.call(this) || this;
        _this._timer = 0;
        //
        _this.eastPlaceValue = 0;
        //倒计时播放
        _this._timerPlay = false;
        //
        _this.directionValue = 0;
        _this.bg = MyUtils.createMovieClipByName("direction");
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/userdirection.exml";
        return _this;
    }
    UserDirection.prototype.onComplete = function () {
        this.init();
    };
    UserDirection.prototype.init = function () {
        this.timerTxt.textAlign = egret.HorizontalAlign.CENTER;
        // this.bnumsTxt.textAlign=egret.HorizontalAlign.CENTER;
        this.bg.x = 61;
        this.bg.y = 61;
        this.addChildAt(this.bg, 0);
    };
    Object.defineProperty(UserDirection.prototype, "eastPlace", {
        get: function () {
            return this.eastPlaceValue;
        },
        set: function (value) {
            this.eastPlaceValue = value;
            this.bg.rotation = value * -90;
        },
        enumerable: true,
        configurable: true
    });
    UserDirection.prototype.timerPlay = function (timer) {
        this._timer = timer;
        this.timerTxt.text = this._timer.toString();
        this._timerPlay = true;
    };
    UserDirection.prototype.timer = function () {
        if (this._timerPlay) {
            if (this._timer > 0) {
                this._timer--;
                this.timerTxt.text = this._timer.toString();
                if (4 > this._timer) {
                    WndManager.root.main.soundGamePlay("s");
                }
            }
            else {
                this.timerPlay(10);
            }
        }
    };
    Object.defineProperty(UserDirection.prototype, "direction", {
        get: function () {
            return this.directionValue;
        },
        set: function (value) {
            //console.log(value)
            this.timerPlay(10);
            this.directionValue = value;
            this.bg.gotoAndStop(this.directionValue + 1);
        },
        enumerable: true,
        configurable: true
    });
    UserDirection.prototype.stop = function () {
        this._timerPlay = false;
        this._timer = 0;
        this.bg.gotoAndStop(1);
    };
    UserDirection.prototype.lightHide = function () {
        //  console.log("隐藏光")
        this.bg.gotoAndStop(1);
    };
    return UserDirection;
}(eui.Component));
__reflect(UserDirection.prototype, "UserDirection");
//# sourceMappingURL=UserDirection.js.map
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
事件对象类型: ClickEvent
属性： ClickEvent.CLICK  当按钮被点击的时候执行
参数： name:点击的按钮昵称
       值:close  点击的退出
          emkji  点击表情按钮
             值:codeStr 表情编号
-------------

//公共属性
-----------

//公共方法
UILayout();//UI布局
/////////////////////////////////////////////////////////////////////////////////////*/
var SendEmoji = (function (_super) {
    __extends(SendEmoji, _super);
    function SendEmoji() {
        var _this = _super.call(this) || this;
        _this.ico = [];
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/sendemoji.exml";
        return _this;
    }
    SendEmoji.prototype.onComplete = function () {
        this.init();
    };
    SendEmoji.prototype.init = function () {
        var ico;
        var l = GameData.userEmojiList.length;
        var _x = 0;
        var _y = 0;
        for (var i = 0; i < l; i++) {
            var button = GameData.userEmojiList[i].button;
            var num = GameData.userEmojiList[i].number;
            for (var t = 0; t < num; t++) {
                ico = new eui.Image(RES.getRes(button + t));
                ico.x = 20 + _x * 101;
                ico.y = 20 + _y * 90;
                this._group.addChild(ico);
                this.ico.push(ico);
                ico.name = "i" + i + "0" + t;
                ico.addEventListener(egret.TouchEvent.TOUCH_TAP, this.icoClick, this);
                ico = null;
                _x++;
                if (_x > 5) {
                    _x = 0;
                    _y++;
                }
            }
        }
        this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClick, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeThis, this);
    };
    //发送表情
    SendEmoji.prototype.icoClick = function (e) {
        var event = new ButtonEvent(ButtonEvent.CLICK);
        event.name = "emkji";
        event.codeStr = e.currentTarget.name.substr(1);
        this.dispatchEvent(event);
    };
    //点击关闭按钮
    SendEmoji.prototype.closeClick = function (e) {
        var event = new ButtonEvent(ButtonEvent.CLICK);
        event.name = "close";
        this.dispatchEvent(event);
    };
    //移除自己的时候
    SendEmoji.prototype.removeThis = function (e) {
        this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClick, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeThis, this);
        var l = this.ico.length;
        for (var i = 0; i < l; i++) {
            this.ico[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.icoClick, this);
            this.ico[i] = null;
        }
        this.ico = null;
        console.log("移除发送表情");
    };
    return SendEmoji;
}(eui.Component));
__reflect(SendEmoji.prototype, "SendEmoji");
//# sourceMappingURL=SendEmoji.js.map
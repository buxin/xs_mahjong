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
                write  点击的自己写入的文本
          txt  点击文本按钮
             值:code 文本编号
-------------

//公共属性
-----------
writeText:string //用户输入的文本数据

//公共方法
UILayout();//UI布局
/////////////////////////////////////////////////////////////////////////////////////*/
var SendTxt = (function (_super) {
    __extends(SendTxt, _super);
    function SendTxt() {
        var _this = _super.call(this) || this;
        _this.list = [];
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/sendtxt.exml";
        return _this;
    }
    SendTxt.prototype.onComplete = function () {
        this.init();
    };
    SendTxt.prototype.init = function () {
        var list;
        var txt;
        var line;
        var l = GameData.userTextList.length;
        for (var i = 0; i < l; i++) {
            list = new eui.Component();
            txt = new eui.Label();
            txt.width = 511;
            txt.height = 53;
            txt.text = GameData.userTextList[i].txt;
            list.addChild(txt);
            this.txtWnd.addChild(list);
            txt.textAlign = egret.HorizontalAlign.CENTER;
            txt.verticalAlign = egret.VerticalAlign.MIDDLE;
            txt.size = 28;
            list.y = i * 53;
            list.name = "i" + i;
            if (i != 0) {
                line = new egret.Shape();
                list.addChild(line);
                line.graphics.lineStyle(2, 0xDEBC37);
                line.graphics.moveTo(0, 0);
                line.graphics.lineTo(511, 0);
                line = null;
            }
            list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listClick, this);
            this.list.push(list);
            list = null;
            txt = null;
        }
        this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClick, this);
        this.sendButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClick, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeThis, this);
    };
    //发送语音文本
    SendTxt.prototype.listClick = function (e) {
        var event = new ButtonEvent(ButtonEvent.CLICK);
        event.name = "txt";
        event.code = e.currentTarget.name.substr(1);
        this.dispatchEvent(event);
    };
    //发送文本 
    SendTxt.prototype.sendClick = function (e) {
        var event = new ButtonEvent(ButtonEvent.CLICK);
        event.name = "write";
        this.dispatchEvent(event);
        //	}
    };
    Object.defineProperty(SendTxt.prototype, "writeText", {
        get: function () {
            return this.txt.text;
        },
        enumerable: true,
        configurable: true
    });
    //点击关闭按钮
    SendTxt.prototype.closeClick = function (e) {
        var event = new ButtonEvent(ButtonEvent.CLICK);
        event.name = "close";
        this.dispatchEvent(event);
    };
    //移除自己的时候
    SendTxt.prototype.removeThis = function (e) {
        this.sendButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClick, this);
        this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClick, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeThis, this);
        var l = this.list.length;
        for (var i = 0; i < l; i++) {
            this.list[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.listClick, this);
            this.list[i] = null;
        }
        this.list = null;
        console.log("移除发送文本");
    };
    return SendTxt;
}(eui.Component));
__reflect(SendTxt.prototype, "SendTxt");
//# sourceMappingURL=SendTxt.js.map
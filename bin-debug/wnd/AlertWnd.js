var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*/////////////////////////////////////////////////////////////////////////////////////
//提示面板，类似于js alert()
//公共事件
事件对象类型: ClickEvent
属性： ClickEvent.CLICK  当按钮被点击的时候执行
参数： code:点击的按钮编号
------------
//公共属性
-----------

//公共方法
UILayout();//UI布局
----------
show(txt:string,buttonData:any) //设置内容
txt:文本内容
buttonData:按钮信息 [{texture:"按钮纹理",code:按钮返回的事件编号Number}...]
--------
close();//关闭
/////////////////////////////////////////////////////////////////////////////////////*/
var AlertWnd = (function (_super) {
    __extends(AlertWnd, _super);
    //
    function AlertWnd() {
        var _this = _super.call(this) || this;
        _this.button = [];
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/hint.exml";
        return _this;
    }
    AlertWnd.prototype.onComplete = function () {
        this.init();
    };
    AlertWnd.prototype.init = function () {
        //
        this.visible = false;
        //
        this.UILayout();
    };
    AlertWnd.prototype.show = function (txt, buttonData) {
        //清除以前的数据
        var l = this.button.length;
        for (var i = 0; i < l; i++) {
            this._group.removeChild(this.button[i]);
            this.button[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
            this.button[i] = null;
        }
        this.button = [];
        //添加新数据
        this.txt.text = txt;
        this.visible = true;
        var button;
        l = buttonData.length;
        for (i = 0; i < l; i++) {
            button = new egret.Bitmap(RES.getRes(buttonData[i].texture));
            button.name = "i" + buttonData[i].code;
            button.anchorOffsetX = 73;
            button.anchorOffsetY = 32;
            button.x = 391 + i * 160 - (l * 160 / 2);
            button.y = 239;
            this._group.addChild(button);
            this.button.push(button);
            button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
            button.touchEnabled = true;
            button = null;
        }
        if (this.txt.numLines == 1) {
            this.txt.textAlign = egret.HorizontalAlign.CENTER;
        }
        else {
            this.txt.textAlign = egret.HorizontalAlign.LEFT;
        }
    };
    AlertWnd.prototype.click = function (e) {
        //	egret.Tween.removeTweens(e.currentTarget);
        //		e.currentTarget.scaleX=e.currentTarget.scaleY=GameData.stageScale/2;
        //	egret.Tween.get(e.currentTarget).to({scaleX:GameData.stageScale,scaleY:GameData.stageScale},800,egret.Ease.backOut);
        var event = new ButtonEvent(ButtonEvent.CLICK);
        event.code = Number(e.currentTarget.name.substr(1));
        this.dispatchEvent(event);
    };
    AlertWnd.prototype.close = function () {
        this.visible = false;
    };
    AlertWnd.prototype.UILayout = function () {
        this.bg.width = GameData.stageWidth;
        this.bg.height = GameData.stageHeight;
        this._group.scaleX = this._group.scaleY = GameData.stageScale;
        this._group.x = GameData.stageWidth * 0.23;
        this._group.y = GameData.stageHeight * 0.29;
    };
    return AlertWnd;
}(WinBase));
__reflect(AlertWnd.prototype, "AlertWnd");
//# sourceMappingURL=AlertWnd.js.map
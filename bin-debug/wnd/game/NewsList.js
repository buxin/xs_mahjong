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
size(width:number,height:number);//设置大小
------
setHeight(value:number);//设置高度
-------
show(data:any);//显示数据
-----
ruleOpen(str:string);//打开规则面板
-----
hide();//隐藏窗口
-------
watchShow(data:any);//显示观战数据
/////////////////////////////////////////////////////////////////////////////////////*/
var NewsList = (function (_super) {
    __extends(NewsList, _super);
    function NewsList() {
        var _this = _super.call(this) || this;
        _this.listObject = [];
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/newslist.exml";
        return _this;
    }
    NewsList.prototype.onComplete = function () {
        this.init();
    };
    NewsList.prototype.init = function () {
        this.visible = false;
        var r = new egret.Rectangle(23, 89, 408, 524);
        this.bg.scale9Grid = r;
        this.watchObject = new WatchObject();
        //this.bg.height=6440;
    };
    NewsList.prototype.setHeight = function (value) {
        this.bg.height = value;
        this._scroller.height = value - 84 - 10;
    };
    NewsList.prototype.ruleOpen = function (str) {
        this.title.text = "游戏规则";
        var l = this.listObject.length;
        for (var i = 0; i < l; i++) {
            this.listObject[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.listClick, this);
            this.listObject[i] = null;
        }
        this.listObject = [];
        this._group.removeChildren();
        var txt = new eui.Label();
        txt.width = 438;
        txt.textColor = 0xffffff;
        txt.size = 20;
        txt.text = str;
        txt.y = 8;
        txt.lineSpacing = 12;
        //  console.log(str);
        this._group.addChild(txt);
        this.visible = true;
        this._scroller.viewport.scrollV = 0;
    };
    NewsList.prototype.show = function (data) {
        this.title.text = "消息列表";
        var l = this.listObject.length;
        for (var i = 0; i < l; i++) {
            this.listObject[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.listClick, this);
            this.listObject[i] = null;
        }
        this.listObject = [];
        this._group.removeChildren();
        // console.log(data)
        l = data.length;
        var _y = 0;
        for (i = l; i > 0; i--) {
            this.newsListObject = new NewsListObject();
            this._group.addChild(this.newsListObject);
            this.newsListObject.y = _y * 109;
            _y++;
            this.newsListObject.head = data[i - 1].headimg;
            if (data[i - 1].type == 1) {
                this.newsListObject.txt.textFlow = [
                    { text: data[i - 1].nick + "\n", style: { "textColor": 0xffffff, size: 28 } },
                    { text: "(" + data[i - 1].date + ")\n", style: { "textColor": 0xffffff, size: 22 } },
                    { text: data[i - 1].nick + "进入房间", style: { "textColor": 0x51b051, size: 22 } }
                ];
            }
            else {
                this.newsListObject.txt.textFlow = [
                    { text: "房间号:", style: { "textColor": 0x51b051, size: 28 } },
                    { text: data[i - 1].roomid, style: { "textColor": 0xBD1B05, size: 28 } },
                    { text: "未开局,退还", style: { "textColor": 0x51b051, size: 28 } },
                    { text: data[i - 1].gold, style: { "textColor": 0xBD1B05, size: 28 } },
                    { text: "钻石.", style: { "textColor": 0x51b051, size: 28 } }
                ];
                this.newsListObject.txt.verticalAlign = egret.VerticalAlign.MIDDLE;
            }
            this.listObject.push(this.newsListObject);
            this.newsListObject.name = "i" + (i - 1);
            this.newsListObject.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listClick, this);
            this.newsListObject = null;
        }
        this.watchObject.y = _y * 109 - 2;
        this.watchObject.bg.height = 90;
        this._group.addChild(this.watchObject);
        //
        this.visible = true;
        this._scroller.viewport.scrollV = 0;
        //
        WndManager.root.main.spush.watchUser();
        //
    };
    NewsList.prototype.listClick = function (e) {
        var value = Number(e.currentTarget.name.substr(1));
        // console.log(value);
        GameData.newslistData.splice(value, 1);
        this.show(GameData.newslistData);
        // GameData.newslistData.split(value)
    };
    NewsList.prototype.hide = function () {
        this._group.removeChildren();
        this.visible = false;
    };
    NewsList.prototype.watchShow = function (data) {
        this.watchObject.wnd.removeChildren();
        var l = data.length;
        var _x = 0;
        var _y = 0;
        var headImage;
        for (var i = 0; i < l; i++) {
            headImage = new HeadImage();
            headImage.head = data[i].headimg;
            headImage.x = 12 + _x * 86;
            headImage.y = 9 + _y * 79;
            this.watchObject.wnd.addChild(headImage);
            _x++;
            if (_x >= 5) {
                _x = 0;
                _y++;
            }
            var nick = new egret.TextField();
            nick.width = 64;
            nick.height = 20;
            nick.textColor = 0xffffff;
            nick.textAlign = egret.HorizontalAlign.CENTER;
            nick.verticalAlign = egret.VerticalAlign.MIDDLE;
            nick.size = 12;
            nick.text = data[i].nick;
            nick.y = headImage.y + 64;
            nick.x = headImage.x;
            this.watchObject.wnd.addChild(nick);
        }
        this.watchObject.bg.height = 9 + _y * 79 + 90;
    };
    return NewsList;
}(eui.Component));
__reflect(NewsList.prototype, "NewsList");
//# sourceMappingURL=NewsList.js.map
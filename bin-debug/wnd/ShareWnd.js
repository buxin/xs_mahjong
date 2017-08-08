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
----------
//公共属性
-----------
-------------
//公共方法
UILayout();//UI布局
/////////////////////////////////////////////////////////////////////////////////////*/
var ShareWnd = (function (_super) {
    __extends(ShareWnd, _super);
    //
    function ShareWnd() {
        var _this = _super.call(this) || this;
        _this.headBim = new egret.Bitmap;
        _this.headDara = null;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/share.exml";
        return _this;
    }
    ShareWnd.prototype.onComplete = function () {
        this.init();
    };
    ShareWnd.prototype.init = function () {
        //
        var str = RES.getRes("configure_json").loginlink + "oauth2.do?roomkey=" + GameData.roomKey + "&gametype=" + RES.getRes("configure_json").gameType + "&ghtid=" + GameData.ghtid + "&gname=" + GameData.gname;
        //  console.log(str);
        this.QR = qr.QRCode.create(str, 300, 300);
        this.QR.x = 87;
        this.QR.y = 122;
        this.QR.visible = false;
        this._group.addChild(this.QR);
        this.share1.visible = false;
        this._group.addChild(this.headBim);
        //
        this.loader = new egret.URLLoader();
        //设置加载方式为纹理
        this.loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        //添加加载完成侦听
        this.loader.addEventListener(egret.Event.COMPLETE, this.imageComplete, this);
        // console.log("GameData.head",GameData.head)
        var request = new egret.URLRequest(GameData.head);
        //开始加载
        this.loader.load(request);
        this.txt.text = GameData.nickname + GameData.textJson[1] + GameData.roomid + "\n" + GameData.nickname + GameData.textJson[2];
        //
        this.linkButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
        this.QRCodeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
        //
        this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeButtonClick, this);
        //
        this.UILayout();
        //
    };
    ShareWnd.prototype.imageComplete = function (e) {
        this.loader.removeEventListener(egret.Event.COMPLETE, this.imageComplete, this);
        this.headDara = e.target.data;
        this.headBim.texture = this.headDara;
        this.headBim.x = 36;
        this.headBim.y = 294;
        this.headBim.width = 86;
        this.headBim.height = 86;
        this.loader = null;
    };
    ShareWnd.prototype.UILayout = function () {
        this.bg.width = GameData.stageWidth;
        this.bg.height = GameData.stageHeight;
        this._group.scaleX = this._group.scaleY = GameData.stageScale;
        this._group.x = GameData.stageWidth * 0.29;
        this._group.y = GameData.stageHeight * 0.08;
        this.closeButton.scaleX = this.closeButton.scaleY = GameData.stageScale;
        this.closeButton.x = GameData.stageWidth * 0.69;
        this.closeButton.y = GameData.stageHeight * 0.08;
    };
    //
    ShareWnd.prototype.closeButtonClick = function (e) {
        WndManager.switchWnd(ShareWnd, WIN_OPERATOR.WIN_CLOSE_DELETE);
    };
    //
    ShareWnd.prototype.click = function (e) {
        if (e.currentTarget == this.linkButton) {
            this.share1.visible = false;
            this.share0.visible = true;
            this.txt.visible = true;
            this.headBim.visible = true;
            this.QR.visible = false;
        }
        else {
            this.share1.visible = true;
            this.share0.visible = false;
            this.txt.visible = false;
            this.headBim.visible = false;
            this.QR.visible = true;
        }
    };
    //删除对象的时候
    ShareWnd.prototype.Destroy = function () {
        _super.prototype.Destroy.call(this);
        console.log("删除分享");
        if (this.loader != null) {
            this.loader.removeEventListener(egret.Event.COMPLETE, this.imageComplete, this);
            this.loader = null;
        }
        if (this.headDara != null) {
            this.headDara.dispose();
            this.headDara = null;
        }
        this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeButtonClick, this);
        this.linkButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
        this.QRCodeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
        //  RES.getResByUrl(url,this.loadComp,this,RES.ResourceItem.TYPE_IMAGE)
    };
    return ShareWnd;
}(WinBase));
__reflect(ShareWnd.prototype, "ShareWnd");
//# sourceMappingURL=ShareWnd.js.map
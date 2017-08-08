var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////*/
var HeadImage = (function (_super) {
    __extends(HeadImage, _super);
    function HeadImage() {
        var _this = _super.call(this) || this;
        _this.headBim = new egret.Bitmap;
        _this.headDara = null;
        _this.headUrl = "";
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/headimage.exml";
        return _this;
    }
    HeadImage.prototype.onComplete = function () {
        this.init();
    };
    HeadImage.prototype.init = function () {
        this.addChild(this.headBim);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeThis, this);
    };
    Object.defineProperty(HeadImage.prototype, "head", {
        get: function () {
            return this.headUrl;
        },
        set: function (url) {
            this.headUrl = url;
            if (this.headDara != null) {
                this.headDara.dispose();
                this.headDara = null;
            }
            //  RES.getResByUrl(url,this.loadComp,this,RES.ResourceItem.TYPE_IMAGE)
            if (this.loader != null) {
                this.loader.removeEventListener(egret.Event.COMPLETE, this.imageComplete, this);
                this.loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.imageError, this);
                this.loader = null;
            }
            this.loader = new egret.URLLoader();
            //设置加载方式为纹理
            this.loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
            //添加加载完成侦听
            this.loader.addEventListener(egret.Event.COMPLETE, this.imageComplete, this);
            this.loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.imageError, this);
            var request = new egret.URLRequest(this.headUrl);
            //开始加载
            this.loader.load(request);
        },
        enumerable: true,
        configurable: true
    });
    HeadImage.prototype.imageError = function (e) {
        this.loader.removeEventListener(egret.Event.COMPLETE, this.imageComplete, this);
        this.loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.imageError, this);
        this.loader = null;
    };
    HeadImage.prototype.imageComplete = function (e) {
        this.loader.removeEventListener(egret.Event.COMPLETE, this.imageComplete, this);
        this.loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.imageError, this);
        this.headDara = e.target.data;
        this.headBim.texture = this.headDara;
        // this.headBim.x=21;
        // this.headBim.y=24;
        this.headBim.width = 64;
        this.headBim.height = 64;
        this.headBim.mask = this.maskMc;
        this.loader = null;
    };
    //移除自己的时候
    HeadImage.prototype.removeThis = function (e) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeThis, this);
        if (this.headDara != null) {
            this.headDara.dispose();
            this.headDara = null;
        }
        //  RES.getResByUrl(url,this.loadComp,this,RES.ResourceItem.TYPE_IMAGE)
        if (this.loader != null) {
            this.loader.removeEventListener(egret.Event.COMPLETE, this.imageComplete, this);
            this.loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.imageError, this);
            this.loader = null;
        }
        console.log("移除消息对象");
    };
    return HeadImage;
}(eui.Component));
__reflect(HeadImage.prototype, "HeadImage");
//# sourceMappingURL=HeadImage.js.map
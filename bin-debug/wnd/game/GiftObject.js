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
var GiftObject = (function (_super) {
    __extends(GiftObject, _super);
    function GiftObject() {
        var _this = _super.call(this) || this;
        _this.jewel = 0;
        _this.gid = 0;
        _this.clickEnabled = true;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/giftobject.exml";
        return _this;
    }
    GiftObject.prototype.onComplete = function () {
        this.init();
    };
    GiftObject.prototype.init = function () {
    };
    return GiftObject;
}(eui.Component));
__reflect(GiftObject.prototype, "GiftObject");
//# sourceMappingURL=GiftObject.js.map
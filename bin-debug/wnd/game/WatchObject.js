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
var WatchObject = (function (_super) {
    __extends(WatchObject, _super);
    function WatchObject() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/watchobject.exml";
        return _this;
    }
    WatchObject.prototype.onComplete = function () {
        this.init();
    };
    WatchObject.prototype.init = function () {
    };
    return WatchObject;
}(eui.Component));
__reflect(WatchObject.prototype, "WatchObject");
//# sourceMappingURL=WatchObject.js.map
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
var EatList = (function (_super) {
    __extends(EatList, _super);
    function EatList() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/eatlist.exml";
        return _this;
    }
    EatList.prototype.onComplete = function () {
        this.init();
    };
    EatList.prototype.init = function () {
        this.bg.scale9Grid = new egret.Rectangle(11, 11, 133, 72);
    };
    return EatList;
}(eui.Component));
__reflect(EatList.prototype, "EatList");
//# sourceMappingURL=EatList.js.map
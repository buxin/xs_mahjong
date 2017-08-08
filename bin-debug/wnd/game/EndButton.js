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
var EndButton = (function (_super) {
    __extends(EndButton, _super);
    function EndButton() {
        var _this = _super.call(this) || this;
        _this.tid = 0;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/endbutton.exml";
        return _this;
    }
    EndButton.prototype.onComplete = function () {
        this.init();
    };
    EndButton.prototype.init = function () {
    };
    return EndButton;
}(eui.Component));
__reflect(EndButton.prototype, "EndButton");
//# sourceMappingURL=EndButton.js.map
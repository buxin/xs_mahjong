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

/////////////////////////////////////////////////////////////////////////////////////*/
var SpeechHint = (function (_super) {
    __extends(SpeechHint, _super);
    function SpeechHint() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/speechhint.exml";
        return _this;
    }
    SpeechHint.prototype.onComplete = function () {
        this.init();
    };
    SpeechHint.prototype.init = function () {
    };
    return SpeechHint;
}(eui.Component));
__reflect(SpeechHint.prototype, "SpeechHint");
//# sourceMappingURL=SpeechHint.js.map
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
var TextDialogue = (function (_super) {
    __extends(TextDialogue, _super);
    function TextDialogue() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/textdialogue.exml";
        return _this;
    }
    TextDialogue.prototype.onComplete = function () {
        this.init();
    };
    TextDialogue.prototype.init = function () {
        this.border.scale9Grid = new egret.Rectangle(14, 5, 191, 33);
        //this.txt.mask=this.maskMc;
    };
    return TextDialogue;
}(eui.Component));
__reflect(TextDialogue.prototype, "TextDialogue");
//# sourceMappingURL=TextDialogue.js.map
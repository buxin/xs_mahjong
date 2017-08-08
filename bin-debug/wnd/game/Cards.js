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
var Cards = (function (_super) {
    __extends(Cards, _super);
    //
    function Cards() {
        var _this = _super.call(this) || this;
        _this.cid = 0;
        _this.id = 0;
        _this.id = Math.random();
        return _this;
    }
    return Cards;
}(egret.Bitmap));
__reflect(Cards.prototype, "Cards");
//# sourceMappingURL=Cards.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by qingzhu on 15/7/1.
 */
var qr;
(function (qr) {
    var QRMaskPattern = (function () {
        function QRMaskPattern() {
        }
        return QRMaskPattern;
    }());
    QRMaskPattern.PATTERN000 = 0;
    QRMaskPattern.PATTERN001 = 1;
    QRMaskPattern.PATTERN010 = 2;
    QRMaskPattern.PATTERN011 = 3;
    QRMaskPattern.PATTERN100 = 4;
    QRMaskPattern.PATTERN101 = 5;
    QRMaskPattern.PATTERN110 = 6;
    QRMaskPattern.PATTERN111 = 7;
    qr.QRMaskPattern = QRMaskPattern;
    __reflect(QRMaskPattern.prototype, "qr.QRMaskPattern");
})(qr || (qr = {}));
//# sourceMappingURL=QRMaskPattern.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var JssdkEvent = (function (_super) {
    __extends(JssdkEvent, _super);
    function JssdkEvent(type) {
        var _this = _super.call(this, type) || this;
        _this._code = ""; //事件的code
        _this._name = ""; //事件的名称
        return _this;
    }
    Object.defineProperty(JssdkEvent.prototype, "code", {
        get: function () {
            return this._code;
        },
        set: function (value) {
            this._code = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JssdkEvent.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    return JssdkEvent;
}(egret.Event));
JssdkEvent.SENDSOUND = "sendsound";
JssdkEvent.SOUNDEND = "soundend";
__reflect(JssdkEvent.prototype, "JssdkEvent");
//# sourceMappingURL=JssdkEvent.js.map
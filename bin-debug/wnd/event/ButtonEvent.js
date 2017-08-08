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
var ButtonEvent = (function (_super) {
    __extends(ButtonEvent, _super);
    function ButtonEvent(type) {
        var _this = _super.call(this, type) || this;
        _this._code = -1; //事件的code
        _this._name = ""; //事件的名称
        _this._timer = 0; //时间
        _this._codeStr = "";
        return _this;
    }
    Object.defineProperty(ButtonEvent.prototype, "timer", {
        get: function () {
            return this._timer;
        },
        set: function (value) {
            this._timer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonEvent.prototype, "code", {
        get: function () {
            return this._code;
        },
        set: function (value) {
            this._code = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonEvent.prototype, "codeStr", {
        get: function () {
            return this._codeStr;
        },
        set: function (str) {
            this._codeStr = str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonEvent.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonEvent.prototype, "targetObject", {
        get: function () {
            return this._targetObject;
        },
        set: function (value) {
            this._targetObject = value;
        },
        enumerable: true,
        configurable: true
    });
    return ButtonEvent;
}(egret.Event));
ButtonEvent.CLICK = "click";
__reflect(ButtonEvent.prototype, "ButtonEvent");
//# sourceMappingURL=ButtonEvent.js.map
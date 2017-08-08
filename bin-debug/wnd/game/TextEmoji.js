var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*/////////////////////////////////////////////////////////////////////////////////////
文本,表情,花牌提示
//公共事件

//公共属性
zhnum:number 正花设置
------
yhnum:number 野花设置

//公共方法
setTextDialogue(txt:string) //设置聊天文本内容
-------------
addAnimation(movieClipData:egret.MovieClipData,x:number,y:number,time:number);添加动画内容
movieClipData:动画资源
x:动画X坐标
y:动画Y坐标
time:播放时间(毫秒)
--------------

/////////////////////////////////////////////////////////////////////////////////////*/
var TextEmoji = (function (_super) {
    __extends(TextEmoji, _super);
    function TextEmoji(place) {
        var _this = _super.call(this) || this;
        //
        _this._place = 0;
        _this.zhnumValue = 0;
        _this.yhnumValue = 0;
        _this.txtStr = "";
        _this.txtI = 0;
        _this._place = place;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/textemoji.exml";
        return _this;
    }
    TextEmoji.prototype.onComplete = function () {
        this.init();
    };
    TextEmoji.prototype.init = function () {
        this.textDialogue = new TextDialogue();
        this.textDialogue.y = -32;
        if (this._place == 1) {
            this.textDialogue.x = -154;
            this.textDialogue.bg.scaleX = -1;
        }
        else {
            this.textDialogue.x = 28;
        }
        this.addChild(this.textDialogue);
        this.textDialogueTxt = this.textDialogue.txt;
        this.textDialogueTxt.multiline = false;
        this.textDialogueTxt.wordWrap = false;
        this.textDialogue.visible = false;
        //
        var xy = [{ bim0x: 141 - 20, bim0y: 16 + 55, txt0x: 181 - 20, txt0y: 18 + 55, bim1x: 142 - 20, bim1y: 55 + 45, txt1x: 181 - 20, txt1y: 58 + 45 },
            { bim0x: -15 + 20, bim0y: -92 + 210, txt0x: 25 + 20, txt0y: -89 + 210, bim1x: -12 + 20, bim1y: -53 + 200, txt1x: 23 + 20, txt1y: -51 + 200 },
            { bim0x: 63 + 15, bim0y: 90 - 30, txt0x: 103 + 15, txt0y: 92 - 30, bim1x: 63 + 15, bim1y: 90 - 40 + 40, txt1x: 103 + 15, txt1y: 93 - 40 + 40 },
            { bim0x: -5, bim0y: 123, txt0x: 34, txt0y: 125, bim1x: -5, bim1y: 152, txt1x: 33, txt1y: 154 }];
        this.zhnumBim.x = xy[this._place].bim0x;
        this.zhnumBim.y = xy[this._place].bim0y;
        this.zhnumTxt.x = xy[this._place].txt0x;
        this.zhnumTxt.y = xy[this._place].txt0y;
        this.yhnumBim.x = xy[this._place].bim1x;
        this.yhnumBim.y = xy[this._place].bim1y;
        this.yhnumTxt.x = xy[this._place].txt1x;
        this.yhnumTxt.y = xy[this._place].txt1y;
        this.zhnumBim.visible = false;
        this.zhnumTxt.visible = false;
        this.yhnumBim.visible = false;
        this.yhnumTxt.visible = false;
        this.zhnumTxt.scaleX = this.zhnumTxt.scaleY = this.yhnumTxt.scaleX = this.yhnumTxt.scaleY = 0.8;
    };
    Object.defineProperty(TextEmoji.prototype, "zhnum", {
        get: function () {
            return this.zhnumValue;
        },
        set: function (value) {
            this.zhnumValue = value;
            if (value == 0) {
                this.zhnumBim.visible = false;
                this.zhnumTxt.visible = false;
            }
            else {
                this.zhnumBim.visible = true;
                this.zhnumTxt.visible = true;
                this.zhnumTxt.text = "x" + value.toString();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextEmoji.prototype, "yhnum", {
        get: function () {
            return this.yhnumValue;
        },
        set: function (value) {
            this.yhnumValue = value;
            if (value == 0) {
                this.yhnumBim.visible = false;
                this.yhnumTxt.visible = false;
            }
            else {
                this.yhnumBim.visible = true;
                this.yhnumTxt.visible = true;
                this.yhnumTxt.text = "x" + value.toString();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextEmoji.prototype, "place", {
        get: function () {
            return this._place;
        },
        enumerable: true,
        configurable: true
    });
    TextEmoji.prototype.setTextDialogue = function (txt) {
        egret.Tween.removeTweens(this);
        this.txtStr = txt;
        this.txtI = txt.length;
        var txtWidth = 0;
        this.textDialogue.visible = true;
        this.textDialogue.border.x = 0;
        this.textDialogueTxt.x = 7;
        this.textDialogueTxt.text = txt;
        this.textDialogue.border.width = Math.min(218, this.textDialogueTxt.textWidth + 30);
        if (this.textDialogueTxt.numLines > 1) {
            egret.Tween.get(this).wait(1500).to({ txtPlay: this.txtI }, this.txtI * 200).call(this.textDialogueClose, this);
        }
        else {
            if (this.textDialogue.bg.scaleX == -1) {
                this.textDialogue.border.x = 218 - this.textDialogue.border.width;
                this.textDialogueTxt.x = this.textDialogue.border.x + 7;
            }
            egret.Tween.get(this).to({ endPlay: 3000 }, 3000).call(this.textDialogueClose, this);
        }
    };
    Object.defineProperty(TextEmoji.prototype, "txtPlay", {
        get: function () {
            return 0;
        },
        set: function (value) {
            this.textDialogueTxt.text = this.txtStr.substr(Math.floor(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextEmoji.prototype, "endPlay", {
        get: function () {
            return 0;
        },
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    TextEmoji.prototype.textDialogueClose = function () {
        this.textDialogue.visible = false;
    };
    //
    //
    TextEmoji.prototype.addAnimation = function (movieClipData, x, y, time) {
        var _this = this;
        var mc = new egret.MovieClip();
        mc.movieClipData = movieClipData;
        mc.x = x;
        mc.y = y;
        this.addChild(mc);
        mc.play(-1);
        egret.setTimeout(function () {
            _this.removeChild(mc);
            mc = null;
        }, this, time);
    };
    return TextEmoji;
}(eui.Component));
__reflect(TextEmoji.prototype, "TextEmoji");
//# sourceMappingURL=TextEmoji.js.map
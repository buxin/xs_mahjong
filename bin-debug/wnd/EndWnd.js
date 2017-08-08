var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*/////////////////////////////////////////////////////////////////////////////////////
//游戏界面

//公共方法

------------------
UILayout();//布局
/////////////////////////////////////////////////////////////////////////////////////*/
var EndWnd = (function (_super) {
    __extends(EndWnd, _super);
    //
    function EndWnd() {
        var _this = _super.call(this) || this;
        _this.endButton = [];
        _this.cardsMc = new egret.Sprite;
        _this.currendTid = -1;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/end.exml";
        return _this;
    }
    EndWnd.prototype.onComplete = function () {
        this.init();
    };
    EndWnd.prototype.init = function () {
        //
        var r = new egret.Rectangle(23, 20, 572, 254);
        this.bg.scale9Grid = r;
        this.bg.width = 972;
        this.bg.height = 591;
        this.htsTxt.x = 97;
        this.htsTxt.y = 167;
        this.htsTxt.width = 786;
        this.htsTxt.height = 151;
        //
        this.hcid = GameData.endData.hcid;
        this.sps = GameData.endData.sps; //玩家结算数据
        this.scs = GameData.endData.scs; //胡的牌
        this.hts = GameData.endData.hts; //提示语
        //
        this.totalTxt.width = 786;
        this.totalTxt.x = 97;
        this.totalTxt.y = 167 + 80;
        //
        //添加玩家数据按钮
        var l = this.sps.length;
        var endButton;
        var clickI = -1;
        this.nullImage.visible = GameData.result == 3;
        for (var i = 0; i < l; i++) {
            endButton = new EndButton();
            this.addChild(endButton);
            this.endButton.push(endButton);
            endButton.tid = this.sps[i].tid;
            endButton.nickTxt.text = this.sps[i].nick;
            if (this.sps[i].type == 1) {
                endButton.hp.visible = true;
                endButton.ico.visible = true;
                if (clickI == -1) {
                    clickI = i;
                    this.addCards(this.sps[i].tid);
                }
            }
            else if (this.sps[i].type == 2) {
                endButton.dp.visible = true;
            }
            if (this.sps[i].wol > 0) {
                endButton.wolTxt.font = RES.getRes("end1Font_fnt");
            }
            endButton.wolTxt.text = this.sps[i].wol.toString();
            endButton.x = 48 + i * 225;
            endButton.y = 324;
            this._group.addChild(endButton);
            endButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buttonClick, this);
            endButton = null;
        }
        //
        this.cardsMc.y = 58;
        this._group.addChild(this.cardsMc);
        //
        this.ok.addEventListener(egret.TouchEvent.TOUCH_TAP, this.okClick, this);
        this.UILayout();
    };
    EndWnd.prototype.okClick = function (e) {
        // this.addCards(e.currentTarget.tid);
        GameData.endButtonClick = true;
        if (GameData.gameEndTimer) {
            if (GameJudge.ownPartake) {
                WndManager.root.main.alert.show(GameData.textJson[4], [{ texture: "go_png", code: 1001 }, { texture: "ck_png", code: 1002 }]);
            }
            else {
                WndManager.root.main.alert.show(GameData.textJson[13], [{ texture: "go_png", code: 1001 }]);
            }
        }
        else {
            WndManager.switchWnd(EndWnd, WIN_OPERATOR.WIN_CLOSE_DELETE);
            WndManager.root.main.spush.playAgin();
        }
    };
    EndWnd.prototype.buttonClick = function (e) {
        this.addCards(e.currentTarget.tid);
    };
    EndWnd.prototype.addCards = function (tid) {
        if (this.currendTid == tid)
            return;
        //  console.log("添加牌");
        var l = this.scs.length;
        For: for (var i = 0; i < l; i++) {
            if (this.scs[i].tid == tid) {
                //
                this.totalTxt.text = "(合计: " + this.scs[i].total + " 台)";
                this.cardsMc.removeChildren();
                this.currendTid = tid;
                var cl = this.scs[i].cts.length;
                var cardsl = 0;
                var cardsNum = 0;
                var cardsW = 0;
                var space = 0;
                var tcid = 0;
                var cid = 0;
                var h = true;
                for (var t = 0; t < cl; t++) {
                    cardsl = this.scs[i].cts[t].cards.length;
                    tcid = this.scs[i].cts[t].tcid;
                    for (var j = 0; j < cardsl; j++) {
                        cid = this.scs[i].cts[t].cards[j].cid;
                        var cards = new Cards();
                        cards.texture = RES.getRes("c0_" + cid);
                        if (cid == this.hcid) {
                            if (tcid == 0 && h) {
                                cards.texture = RES.getRes("black_c0_" + cid);
                                h = false;
                            }
                        }
                        cards.width = 54;
                        cards.height = 81;
                        cards.x = space + cardsNum * 54;
                        this.cardsMc.addChild(cards);
                        cards = null;
                        cardsNum++;
                    }
                    if (tcid > 0)
                        space += 25;
                }
                //
                var hts = this.scs[i].hts;
                cl = hts.length;
                this.htsTxt.text = "";
                for (t = 0; t < cl; t++) {
                    if (hts[t].tai != 0)
                        this.htsTxt.appendText(GameData.htsJson[hts[t].type] + " " + hts[t].tai + GameData.textJson[3] + "   ");
                }
                //
                //  cardsW=cardsNum*54+space;
                //
                this.cardsMc.x = 972 / 2 - this.cardsMc.width / 2;
                break For;
            }
        }
    };
    EndWnd.prototype.UILayout = function () {
        this._group.scaleX = this._group.scaleY = GameData.stageScale;
        this._group.x = GameData.stageWidth / 2 - (972 * GameData.stageScale / 2);
        this._group.y = GameData.stageHeight / 2 - (591 * GameData.stageScale / 2);
        this.bg0.width = GameData.stageWidth;
        this.bg0.height = GameData.stageHeight;
    };
    //删除对象的时候
    EndWnd.prototype.Destroy = function () {
        _super.prototype.Destroy.call(this);
        var l = this.endButton.length;
        for (var i = 0; i < l; i++) {
            this.endButton[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buttonClick, this);
        }
        this.ok.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.okClick, this);
        this.endButton = null;
        console.log("删除结算");
    };
    return EndWnd;
}(WinBase));
__reflect(EndWnd.prototype, "EndWnd");
//# sourceMappingURL=EndWnd.js.map
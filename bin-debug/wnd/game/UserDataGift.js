var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*/////////////////////////////////////////////////////////////////////////////////////
//公共属性
tirenEnabled:boolean;//踢人是否激活
//公共方法
setUserData(tid:number,nick:string,headimg:string)//设置用户数据
tid 用户ID
nick 昵称
headimg 头像
----------
showRecordData(total:number,winNumber:number,flatNumber:number,failNumber:number);//显示战绩
total 总局数
winNumber 赢的局数
flatNumber 平的局数
failNumber 输的局数
---------
hideRecordData()//隐藏战绩数据
/////////////////////////////////////////////////////////////////////////////////////*/
var UserDataGift = (function (_super) {
    __extends(UserDataGift, _super);
    function UserDataGift() {
        var _this = _super.call(this) || this;
        _this.maskMc = new egret.Shape;
        _this.headContent = new egret.Sprite;
        _this.headBim = new egret.Bitmap;
        _this.headDara = null;
        _this.headUrl = "";
        //
        _this.tid = 0;
        _this.loadGift = true;
        _this.giftNumber = 0;
        _this.giftObject = [];
        _this.theTime = 0;
        _this.theTime1 = 0;
        _this.theTime2 = 0;
        _this.angle = 0;
        _this.gameNumber = 0;
        _this.winNumber = 0;
        _this.failNumber = 0;
        _this.flatNumber = 0;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/userdatagift.exml";
        return _this;
    }
    UserDataGift.prototype.onComplete = function () {
        this.init();
    };
    UserDataGift.prototype.init = function () {
        this.tirenButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tirenClick, this);
        this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClick, this);
        // this.page_left.addEventListener(egret.TouchEvent.TOUCH_TAP,this.pageEvent,this);
        // this.page_right.addEventListener(egret.TouchEvent.TOUCH_TAP,this.pageEvent,this);
        this.visible = false;
        this.maskMc.mask = this.gules;
        this.addChild(this.maskMc);
        this.addChild(this.headContent);
        this.headContent.addChild(this.headBim);
        this.headContent.mask = this.headMasMc;
        // this.timestamp=new Date().getTime();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeThis, this);
    };
    UserDataGift.prototype.setUserData = function (tid, nick, headimg) {
        this.tid = tid;
        this.nameTxt.text = nick;
        this.head(headimg);
        this.giftNumber = GameData.glist.length;
        if (this.loadGift) {
            this.loadGift = false;
            //  GameData.glist=[{id:0,jewel:3},{id:1,jewel:2},{id:2,jewel:2},{id:3,jewel:3},{id:4,jewel:5},{id:5,jewel:5}];
            var giftObject;
            for (var i = 0; i < this.giftNumber; i++) {
                giftObject = new GiftObject();
                giftObject.x = i * 77;
                giftObject.jewel = GameData.glist[i].jewel;
                giftObject.txt.text = GameData.glist[i].jewel.toString();
                giftObject.gid = GameData.glist[i].id;
                giftObject.ico.texture = RES.getRes("giftico" + GameData.glist[i].id);
                this._group.addChild(giftObject);
                this.giftObject.push(giftObject);
                giftObject.addEventListener(egret.TouchEvent.TOUCH_TAP, this.giftClick, this);
                giftObject = null;
            }
        }
        //礼物是否可以点击
        var giftEnabled = true;
        var texture = "giftico";
        this.nameTxt.height = 66;
        this.crownTimer.visible = false;
        if (this.tid == GameData.tid) {
            giftEnabled = false;
            texture = "gifticonull";
            if (GameData.packLeftTime > 0) {
                this.nameTxt.height = 30;
                this.crownTimer.visible = true;
                this.timerRefresh();
            }
        }
        else if (GameJudge.ownPartake == false) {
            giftEnabled = false;
            texture = "gifticonull";
        }
        for (var i = 0; i < this.giftNumber; i++) {
            // console.log(texture+GameData.glist[i].id)
            this.giftObject[i].ico.texture = RES.getRes(texture + GameData.glist[i].id);
            this.giftObject[i].clickEnabled = giftEnabled;
        }
        //
        this._scroller.viewport.scrollH = 0;
        //皇冠时间
        // console.log(tid);
        for (i = 0; i < GameData.userNumber; i++) {
            if (GameData.plays[i].tid == this.tid) {
                this.crownImg.visible = GameData.plays[i].packLeftTime > 0;
            }
        }
        // if(this.tid==)
    };
    UserDataGift.prototype.timers = function () {
        GameData.packLeftTime--;
        //  var unixTimestamp = new Date( this.timestamp+GameData.packLeftTime) ;
        //  var commonTime = unixTimestamp.toLocaleString();
        //  console.log(commonTime);
        if (GameData.packLeftTime > -1) {
            this.timerRefresh();
        }
    };
    UserDataGift.prototype.timerRefresh = function () {
        //  console.log(GameData.packLeftTime);
        this.timerT.width = 200 * GameData.packLeftTime / GameData.packTotalTime;
        this.theTime = GameData.packLeftTime;
        if (this.theTime > 60) {
            this.theTime1 = Math.floor(this.theTime / 60);
            this.theTime = Math.floor(this.theTime % 60);
            // alert(theTime1+"-"+theTime); 
            if (this.theTime1 > 60) {
                this.theTime2 = Math.floor(this.theTime1 / 60);
                this.theTime1 = Math.floor(this.theTime1 % 60);
            }
            else
                this.theTime2 = 0;
        }
        else
            this.theTime1 = 0;
        this.timerText.text = "会员倒计时 " + Math.floor(this.theTime2) + ":" + Math.floor(this.theTime1) + ":" + Math.floor(this.theTime);
    };
    UserDataGift.prototype.giftClick = function (e) {
        if (e.currentTarget.clickEnabled) {
            if (GameData.jewel - e.currentTarget.jewel < 0) {
                // return;
                this.visible = false;
                WndManager.root.main.alert.show(GameData.textJson[9], [{ texture: "ok_png", code: 100 }]);
            }
            else {
                this.visible = false;
                GameData.jewel -= e.currentTarget.jewel;
                WndManager.root.main.spush.sendGift(this.tid, e.currentTarget.gid);
            }
        }
    };
    UserDataGift.prototype.pageEvent = function (e) {
        var value = Math.ceil(this._scroller.viewport.scrollH / 77);
        //  console.log(value,this.giftNumber);
        if (e.currentTarget == this.page_left) {
            if (value > 0) {
                value = this.giftNumber - (this.giftNumber - value) - 1;
            }
        }
        else {
            if (this.giftNumber > value + 5) {
                value = this.giftNumber - (this.giftNumber - value) + 1;
            }
        }
        //   console.log(value);
        this._scroller.viewport.scrollH = value * 77;
    };
    UserDataGift.prototype.head = function (url) {
        this.headUrl = url;
        if (this.headDara != null) {
            this.headDara.dispose();
            this.headDara = null;
        }
        //  RES.getResByUrl(url,this.loadComp,this,RES.ResourceItem.TYPE_IMAGE)
        if (this.loader != null) {
            this.loader.removeEventListener(egret.Event.COMPLETE, this.imageComplete, this);
            this.loader = null;
        }
        this.loader = new egret.URLLoader();
        //设置加载方式为纹理
        this.loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        //添加加载完成侦听
        this.loader.addEventListener(egret.Event.COMPLETE, this.imageComplete, this);
        var request = new egret.URLRequest(this.headUrl);
        //开始加载
        this.loader.load(request);
    };
    UserDataGift.prototype.imageComplete = function (e) {
        this.loader.removeEventListener(egret.Event.COMPLETE, this.imageComplete, this);
        this.headDara = e.target.data;
        this.headBim.texture = this.headDara;
        this.headBim.x = 127;
        this.headBim.y = 20;
        this.headBim.width = 64;
        this.headBim.height = 64;
        this.loader = null;
    };
    //踢人
    UserDataGift.prototype.tirenClick = function (e) {
        var event = new ButtonEvent(ButtonEvent.CLICK);
        event.name = "tiren";
        event.code = this.tid;
        this.dispatchEvent(event);
    };
    //点击关闭按钮
    UserDataGift.prototype.closeClick = function (e) {
        var event = new ButtonEvent(ButtonEvent.CLICK);
        event.name = "close";
        this.dispatchEvent(event);
    };
    Object.defineProperty(UserDataGift.prototype, "tirenEnabled", {
        get: function () {
            return this.tirenButton.visible;
        },
        set: function (type) {
            this.tirenButton.visible = type;
        },
        enumerable: true,
        configurable: true
    });
    UserDataGift.prototype.hideRecordData = function () {
        this.gameNumberTxt.text = "";
        this.stateNumberTxt.text = "";
        this.maskMc.graphics.clear();
    };
    UserDataGift.prototype.showRecordData = function (total, winNumber, flatNumber, failNumber) {
        this.gameNumber = total;
        this.winNumber = winNumber;
        this.flatNumber = flatNumber;
        this.failNumber = failNumber;
        //
        this.gameNumberTxt.text = this.gameNumber.toString();
        this.stateNumberTxt.text = this.winNumber.toString() + "/" + this.failNumber.toString() + "/" + this.flatNumber.toString();
        //
        this.angle = -1 * ((this.winNumber / this.gameNumber) * 360);
        this.drawSector(this.maskMc, 219, 219, 150, this.angle, -90, 0xFF4F4F);
    };
    UserDataGift.prototype.drawSector = function (mc, x, y, r, angle, startFrom, color) {
        if (x === void 0) { x = 200; }
        if (y === void 0) { y = 200; }
        if (r === void 0) { r = 100; }
        if (angle === void 0) { angle = 27; }
        if (startFrom === void 0) { startFrom = 270; }
        if (color === void 0) { color = 0xff0000; }
        mc.graphics.clear();
        mc.graphics.beginFill(color, 1);
        //remove this line to unfill the sector  
        /* the border of the secetor with color 0xff0000 (red) , you could replace it with any color
        * you want like 0x00ff00(green) or 0x0000ff (blue).
        */
        // mc.graphics.lineStyle(0,0xff0000);  //自定义颜色  
        mc.graphics.lineStyle(2, color); //使用传递进来的颜色  
        mc.graphics.moveTo(x, y);
        angle = (Math.abs(angle) > 360) ? 360 : angle;
        var n = Math.ceil(Math.abs(angle) / 45);
        var angleA = angle / n;
        angleA = angleA * Math.PI / 180;
        startFrom = startFrom * Math.PI / 180;
        mc.graphics.lineTo(x + r * Math.cos(startFrom), y + r * Math.sin(startFrom));
        for (var i = 1; i <= n; i++) {
            startFrom += angleA;
            var angleMid = startFrom - angleA / 2;
            var bx = x + r / Math.cos(angleA / 2) * Math.cos(angleMid);
            var by = y + r / Math.cos(angleA / 2) * Math.sin(angleMid);
            var cx = x + r * Math.cos(startFrom);
            var cy = y + r * Math.sin(startFrom);
            mc.graphics.curveTo(bx, by, cx, cy);
        }
        if (angle != 360) {
            mc.graphics.lineTo(x, y);
        }
        mc.graphics.endFill(); // if you want a sector without filling color , please remove this line. 
    };
    UserDataGift.prototype.removeThis = function (e) {
        this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClick, this);
        this.tirenButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tirenClick, this);
        //  this.page_left.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.pageEvent,this);
        // this.page_right.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.pageEvent,this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeThis, this);
        if (this.loader != null) {
            this.loader.removeEventListener(egret.Event.COMPLETE, this.imageComplete, this);
            this.loader = null;
        }
        console.log("移除用户数据窗口");
    };
    return UserDataGift;
}(eui.Component));
__reflect(UserDataGift.prototype, "UserDataGift");
//# sourceMappingURL=UserDataGift.js.map
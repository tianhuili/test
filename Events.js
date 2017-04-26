/**
 * Created by zqx-04 on 2017/2/7.
 */
var downX, downY, oldL, oldT, tempWH, tempL, tempT, dxMax,tempMaxL,tempMaxT;
var file, imgtype, imgsize, imgW, imgH, imgP, imgURL;
var bigimgL, bigimgT;
var moveboxWH, moveboxL, moveboxT, moveboxMinL, moveboxMinT, moveboxMaxL, moveboxMaxT;
var moveimgL, moveimgT;
var topL, topT;
var gen = {
    _moveboxWH:null,
    _moveboxL: null,
    _moveboxT: null,
};
/* one.avatar Events start */
var avatar_click = function () {
    one.upfile = document.createElement("input");
    setAttr2(one.upfile, "type", "file", "id", "upfile");
    this.parentNode.appendChild(one.upfile);
    Click(one.upfile);
    one.upfile.onchange = function () {
        file = this.files[0];
        imgtype = file.type;
        if (!fun.check_imgtype()) {
            return;
        } //检查文件类型
        imgsize = file.size;
        if (!fun.check_imgsize()) {
            return;
        }; //检查图片大小
        var reader = new FileReader();
        reader.onload = function () {
            fun.setImgWH(this.result, imgtype);
            delete (reader);
        };
        reader.readAsDataURL(file);
        ///////////////////////////
        this.parentNode.removeChild(one.upfile);
    };
};
var avatar_mouseover = function () {
    setStyle2(one.avatar, "border", "2px solid #46AFDC", "box-shadow", "0 0 5px #46AFDC");
};
var avatar_mouseleave = function () {
    delStyle2(one.avatar, "border", "box-shadow");
};
/* one.avatar Events end */

/* one.top Events start */
var topLimit = function () {
    if (topL < 0)
        topL = 1;
    else if (topL > one.bodyW - 432)
        topL = one.bodyW - 432 - 1;
    if (topT < 0)
        topT = 1;
    else if (topT > one.screenH - 402)
        topT = one.screenH - 402 - 1;
};
var top_mousedown = function (e) {
    if (e.button > 0) {
        top_mouseup();
        return false;
    }
    downX = e.clientX;
    downY = e.clientY;
    oldL = one.main.offsetLeft;
    oldT = one.main.offsetTop;
    AddEvent2(document, EventsType[2], top_mouseup, EventsType[5], doc_top_mousemove);
};
var doc_top_mousemove = function (e) {
    topL = oldL + e.clientX - downX;
    topT = oldT + e.clientY - downY;
    topLimit();
    setLT(one.main, topL, topT);
};
var top_mouseup = function () {
    DelEvent2(document, EventsType[2], top_mouseup, EventsType[5], doc_top_mousemove);
};
/* one.top Events end */

/* one.movebox Events start */
var moveboxLimit = function () {
    if (moveboxL <= moveboxMinL)
        moveboxL = moveboxMinL;
    else if (moveboxL >= moveboxMaxL)
        moveboxL = moveboxMaxL;
    if (moveboxT <= moveboxMinT)
        moveboxT = moveboxMinT;
    else if (moveboxT > moveboxMaxT)
        moveboxT = moveboxMaxT;
};
var movebox_mousedown = function (e) {
    if (e.button > 0) {
        movebox_mouseup();
        return false;
    }
    e.preventDefault && e.preventDefault();
    downX = e.clientX;
    downY = e.clientY;
    oldL = moveboxL;
    oldT = moveboxT;
    AddEvent2(document, EventsType[2], movebox_mouseup, EventsType[5], doc_movebox_mousemove);
};
var doc_movebox_mousemove = function (e) {
    moveboxL = oldL + e.clientX - downX;
    moveboxT = oldT + e.clientY - downY;
    moveboxLimit();
    setLT(one.movebox, moveboxL, moveboxT);
    fun.setimg();
    fun.set_dxx();
};
var movebox_mouseup = function () {
    DelEvent2(document, EventsType[2], movebox_mouseup, EventsType[5], doc_movebox_mousemove);
};
/* one.movebox Events end */

/* 拉伸事件开始 */
var TopLeft_mousedown = function (e) {
    if (e.button > 0) {
        TopLeft_mouseup();
        return false;
    }
    e.preventDefault && e.preventDefault();
    downX = e.clientX;
    downY = e.clientY;
    oldL = moveboxL;
    oldT = moveboxL;
    tempWH = moveboxWH;
    tempL = moveboxL - bigimgL;
    tempT = moveboxT - bigimgT;
    tempMaxL = moveboxMaxL;
    tempMaxT = moveboxMaxT;
    dxMax = tempL >= tempT ? tempT : tempL;
    AddEvent2(document, EventsType[2], TopLeft_mouseup, EventsType[5], doc_TopLeft_mousemove);
};
var doc_TopLeft_mousemove = function (e) {
    movebox_mouseup();//移动事件屏蔽，非常重要
    var dx = e.clientY - downY;
    if (dx < 0 && Math.abs(dx) > dxMax) {
        dx = -dxMax;
    }
    else if (dx > 0 && dx > tempWH - pic.pwh_min) {
        dx = tempWH - pic.pwh_min;
    }
    moveboxMaxL = tempMaxL + dx;
    moveboxMaxT = tempMaxT + dx;
    moveboxL = oldL + dx;
    moveboxT = oldT + dx;
    moveboxWH = tempWH - dx;
    setLT(one.movebox, moveboxL, moveboxT);
    setWH(one.movebox, moveboxWH , moveboxWH);
    fun.setimg();
    fun.set_dxx();
};
var TopLeft_mouseup = function () {
    DelEvent2(document, EventsType[2], TopLeft_mouseup, EventsType[5], doc_TopLeft_mousemove);
};

var TopRight_mousedown = function (e) {
    if (e.button > 0) {
        TopRight_mouseup();
        return false;
    }
    e.preventDefault && e.preventDefault();
    downX = e.clientX;
    downY = e.clientY;
    oldL = moveboxL;
    oldT = moveboxL;
    tempWH = moveboxWH;
    tempL = imgW - (moveboxL - bigimgL) - moveboxWH;
    tempT = moveboxT - bigimgT;
    tempMaxL = moveboxMaxL;
    tempMaxT = moveboxMaxT;
    dxMax = tempL >= tempT ? tempT : tempL;
    AddEvent2(document, EventsType[2], TopRight_mouseup, EventsType[5], doc_TopRight_mousemove);
};
var doc_TopRight_mousemove = function (e) {
    movebox_mouseup();//移动事件屏蔽，非常重要
    var dx = e.clientY - downY;
    if (dx < 0 && Math.abs(dx) > dxMax) {
        dx = -dxMax;
    }
    else if (dx > 0 && dx > tempWH - pic.pwh_min) {
        dx = tempWH - pic.pwh_min;
    }
    moveboxMaxL = tempMaxL + dx;
    moveboxMaxT = tempMaxT + dx;
    moveboxL = oldL;
    moveboxT = oldT + dx;
    moveboxWH = tempWH - dx;
    setLT(one.movebox, moveboxL, moveboxT);
    setWH(one.movebox, moveboxWH, moveboxWH);
    fun.setimg();
    fun.set_dxx();
};
var TopRight_mouseup = function () {
    DelEvent2(document, EventsType[2], TopRight_mouseup, EventsType[5], doc_TopRight_mousemove);
};

var BottomRight_mousedown = function (e) {
    if (e.button > 0) {
        BottomRight_mouseup();
        return false;
    }
    e.preventDefault && e.preventDefault();
    downX = e.clientX;
    downY = e.clientY;
    oldL = moveboxL;
    oldT = moveboxL;
    tempWH = moveboxWH;
    tempL = imgW - (moveboxL - bigimgL) - moveboxWH;
    tempT = imgH - (moveboxT - bigimgT) - moveboxWH;
    tempMaxL = moveboxMaxL;
    tempMaxT = moveboxMaxT;
    dxMax = tempL >= tempT ? tempT : tempL;
    AddEvent2(document, EventsType[2], BottomRight_mouseup, EventsType[5], doc_BottomRight_mousemove);
};
var doc_BottomRight_mousemove = function (e) {
    movebox_mouseup();//移动事件屏蔽，非常重要
    var dx = e.clientY - downY;
    if (dx > 0 && dx > dxMax) {
        dx = dxMax;
    }
    else if (dx < 0 && Math.abs(dx) > tempWH - pic.pwh_min) {
        dx = -(tempWH - pic.pwh_min);
    }
    moveboxMaxL = tempMaxL - dx;
    moveboxMaxT = tempMaxT - dx;
    moveboxL = oldL;
    moveboxT = oldT;
    moveboxWH = tempWH + dx;
    setLT(one.movebox, moveboxL, moveboxT);
    setWH(one.movebox, moveboxWH, moveboxWH);
    fun.setimg();
    fun.set_dxx();
};
var BottomRight_mouseup = function () {
    DelEvent2(document, EventsType[2], BottomRight_mouseup, EventsType[5], doc_BottomRight_mousemove);
};

var BottomLeft_mousedown = function (e) {
    if (e.button > 0) {
        BottomLeft_mouseup();
        return false;
    }
    e.preventDefault && e.preventDefault();
    downX = e.clientX;
    downY = e.clientY;
    oldL = moveboxL;
    oldT = moveboxL;
    tempWH = moveboxWH;
    tempL = moveboxL - bigimgL;
    tempT = imgH - (moveboxT - bigimgT) - moveboxWH;
    tempMaxL = moveboxMaxL;
    tempMaxT = moveboxMaxT;
    dxMax = tempL >= tempT ? tempT : tempL;
    AddEvent2(document, EventsType[2], BottomLeft_mouseup, EventsType[5], doc_BottomLeft_mousemove);
};
var doc_BottomLeft_mousemove = function (e) {
    movebox_mouseup();//移动事件屏蔽，非常重要
    var dx = e.clientY - downY;
    if (dx > 0 && dx > dxMax) {
        dx = dxMax;
    }
    else if (dx < 0 && Math.abs(dx) > tempWH - pic.pwh_min) {
        dx = -(tempWH - pic.pwh_min);
    }
    moveboxMaxL = tempMaxL - dx;
    moveboxMaxT = tempMaxT - dx;
    moveboxL = oldL - dx;
    moveboxT = oldT;
    moveboxWH = tempWH + dx;
    setLT(one.movebox, moveboxL, moveboxT);
    setWH(one.movebox, moveboxWH, moveboxWH);
    fun.setimg();
    fun.set_dxx();
};
var BottomLeft_mouseup = function () {
    DelEvent2(document, EventsType[2], BottomLeft_mouseup, EventsType[5], doc_BottomLeft_mousemove);
};
/* 拉伸事件结束 */

/* 两个按钮事件开始 */
var callback = function () {
    var txt = xmlReq.responseText;
    one.avatar_img.src = "../saveimg/"+txt;
    Hide(one.main);
    Show(one.avatar);
};
var create_msg = function () {
    var msg = "moveboxL=" + (moveboxL - bigimgL) + "&moveboxT=" + (moveboxT - bigimgT) + "&moveboxWH=" + moveboxWH;
    msg += "&imgURL=" + imgURL;
    return msg;
};
var p2_click = function () {
    // url="../Avatar/AJAX_saveimg";
    url="Avatar/AJAX_saveimg";
    method = "post";
    msg = create_msg();
    AJAX(url, method, msg, callback);
};
var p3_click = function () {
    Hide(one.main);
    Show(one.avatar);
};
/* 两个按钮事件结束 */
var Events = function () {
    AddEvent3(one.avatar, EventsType[0], avatar_click, EventsType[3], avatar_mouseover, EventsType[4], avatar_mouseleave);//avatar
    AddEvent(one.top, EventsType[1], top_mousedown);//top
    AddEvent(one.movebox, EventsType[1], movebox_mousedown);//movebox
    AddEvent(one.TopLeft, EventsType[1], TopLeft_mousedown);//TopLeft
    AddEvent(one.TopRight, EventsType[1], TopRight_mousedown);//TopRight
    AddEvent(one.BottomRight, EventsType[1], BottomRight_mousedown);//BottomRight
    AddEvent(one.BottomLeft, EventsType[1], BottomLeft_mousedown);//BottomLeft
    AddEvent(one.p2, EventsType[0], p2_click);//p2
    AddEvent(one.p3, EventsType[0], p3_click);//p3
    /* =========================================== END =========================================== */
    AddEvent(document, EventsType[5], cannotselect);//最后添加整个页面无法选中事件
};
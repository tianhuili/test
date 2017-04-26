/**
 * Created by zqx-04 on 2017/2/7.
 */
/* cxc.js 频繁操作公共接口 */
var $ = function (id) {
    return document.getElementById(id);
}; //通过id获取dom对象
var A = function (msg) {
    alert(msg);
}; //alert的简写
var EmptyFun = function () {
}; // 空方法
var setL = function (dom, L) {
    dom.style.left = L + "px";
}; // 设置 dom 的 left
var setT = function (dom, T) {
    dom.style.top = T + "px";
}; // 设置 dom 的 top
var setLT = function (dom, L, T) {
    dom.style.left = L + "px";
    dom.style.top = T + "px";
}; //同时设置 dom 的 left top
var getLT = function (dom) {
    return [parseInt(dom.style.left), parseInt(dom.style.top)];
}; // 返回dom的left和top值，类型为整型数组[int,int]
var setW = function (W) {
    dom.style.width = W + "px";
};  // 设置 dom 的 width
var setH = function (H) {
    dom.style.height = H + "px";
};  // 设置 dom 的 height
var setWH = function (dom, W, H) {
    dom.style.width = W + "px";
    dom.style.height = H + "px";
};  //同时设置 dom 的 width height
var getWH = function (dom) {
    return [parseInt(dom.style.width), parseInt(dom.style.height)];
}; // 返回dom的 width 和 height 值，类型为整型数组[int,int]
var setLTWH = function (dom, L, T, W, H) {
    dom.style.left = L + "px";
    dom.style.top = T + "px";
    dom.style.width = W + "px";
    dom.style.height = H + "px";
}; //同时设置 dom 的 left top width height
var getLTWH = function (dom) {
    return [parseInt(dom.style.left), parseInt(dom.style.top), parseInt(dom.style.width), parseInt(dom.style.height)]
};  // 返回dom的 left top width height 值，类型为整型数组[int,int,int,int]
var setcursor = function (dom,shape) {
    dom.style.cursor = shape;
}; //设置鼠标经过dom的指针形状
var EventsType = ["click", "mousedown", "mouseup", "mouseover", "mouseleave", "mousemove"];//事件类型
var AddEvent = function (dom, type, fun) {
    dom.addEventListener(type, fun, false);
};  //添加dom对象的事件监听方法
var AddEvent2 = function (dom, type1, fun1, type2, fun2) {
    dom.addEventListener(type1, fun1, false);
    dom.addEventListener(type2, fun2, false);
};  //一次添加dom的两个事件监听方法
var AddEvent3 = function (dom, type1, fun1, type2, fun2, type3, fun3) {
    dom.addEventListener(type1, fun1, false);
    dom.addEventListener(type2, fun2, false);
    dom.addEventListener(type3, fun3, false);
}; //一次添加dom的三个事件监听方法
var DelEvent = function (dom, type, fun) {
    dom.removeEventListener(type, fun, false);
}; // 删除dom对象的事件监听方法
var DelEvent2 = function (dom, type1, fun1, type2, fun2) {
    dom.removeEventListener(type1, fun1, false);
    dom.removeEventListener(type2, fun2, false);
}; //一次删除dom对象的两个事件监听方法
var DelEvent3 = function (dom, type1, fun1, type2, fun2, type3, fun3) {
    dom.removeEventListener(type1, fun1, false);
    dom.removeEventListener(type2, fun2, false);
    dom.removeEventListener(type3, fun3, false);
}; //一次删除dom对象的三个事件监听方法
var inArray = function (str, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (str == arr[i]) {
            return true;
        }
    }
    return false;
}; // 判断字符串str是否存在于数组arr
var cannotselect = function () {
    window.getSelection().removeAllRanges();
}; //页面元素（文字、图片等）不能被选中
var setStyle = function (dom, styleName, styleValue) {
    dom.setAttribute("style", styleName + ":" + styleValue + ";");
}; //设置dom的 一个style 属性值
var setStyle2 = function (dom, styleName1, styleValue1, styleName2, styleValue2) {
    dom.setAttribute("style", styleName1 + ":" + styleValue1 + ";" + styleName2 + ":" + styleValue2 + ";");
};//一次设置dom的 两个style 属性值
var delStyle = function (dom, styleName) {
    dom.removeAttribute("style", styleName);
};//删除dom的 一个style 属性值
var delStyle2 = function (dom, styleName1, styleName2) {
    dom.removeAttribute("style", styleName1);
    dom.removeAttribute("style", styleName2);
};//一次删除dom的 两个style 属性值
var setAttr = function (dom, attrName, attrValue) {
    dom.setAttribute(attrName, attrValue);
};// 设置dom的 一个属性值
var setAttr2 = function (dom, attrName1, attrValue1, attrName2, attrValue2) {
    dom.setAttribute(attrName1, attrValue1);
    dom.setAttribute(attrName2, attrValue2);
};//一次设置dom的 两个属性值
var delAttr = function (dom, attrName) {
    dom.removeAttribute(attrName);
};//删除dom的 一个属性值
var delAttr2 = function (dom, attrName1, attrName2) {
    dom.removeAttribute(attrName1);
    dom.removeAttribute(attrName2);
};//删除dom 的两个属性值
var Click = function (dom) {
    dom.click();
};// 点击dom
var Hide = function (dom) {
    dom.style.display = "none";
};// 隐藏dom
var Show = function (dom) {
    dom.style.display = "inline";
}; // 显示dom
/* cxc.js 频繁操作公共接口 */

/* AJAX 接口 */
var url, method, msg;
var xmlReq = new XMLHttpRequest();
var AJAX = function (url, method, msg, callback) {
    xmlReq.open(method, url, true);
    xmlReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlReq.onreadystatechange = function () {
        if (xmlReq.readyState == 4) {
            if (xmlReq.status == 200) {
                callback();
            }
            else {
                A("bad status is " + xmlReq.status);
            }
        }
    };
    xmlReq.send(msg);
};
/* AJAX 接口 */
/**
 * Created by zqx-04 on 2017/2/7.
 */
/* one.js */
/* my website philosophy */
/*
 注：一般网站，浏览器最大化时，没有横向滚动条，有纵向滚动条，页面缩放按比例只在合适的地方用到
 <html>标签 不必加css和js控制 <body>标签 作为总父标签 用它控制整个页面的宽度和高度
 <body>的宽度 一般为100%(考虑滚动条存在与否) 而高度可根据页面需求自定义
 也就是说body的宽高就是页面的宽高 页面高度如果超出 浏览器窗口高度 出现滚动条
 */
var one = {
    screenW: null, //可用浏览器窗口的宽度
    screenH: null, //可用浏览器窗口的高度
    body: null,  //document.body对象
    bodyW: null,  //body的宽度
    bodyH: null,  //body的高度
    avatar: null, //默认头像div
    avatar_img:null,
    main: null,  //处理上传图片的主要父div
    mainW: 430,  //main的宽度
    mainH:400,  //main的高度
    mainL: null,  //main 的left位置
    mainT:null,  //main 的top位置
    top: null,
    upfile:null,
    center:null,
    bigimg: null,
    movebox: null,
    moveimg: null,
    d11: null,
    d22: null,
    d33: null,
    TopLeft: null,
    TopRight: null,
    BottomRight: null,
    BottomLeft: null,
    p2: null,
    p3:null
};
var Init = function () {
    //////////////////////////////////////////////////////////////////
    one.screenW = window.innerWidth;
    one.screenH = window.innerHeight;
    one.body = document.body;
    one.bodyW = one.body.offsetWidth;
    one.bodyH = one.screenH; //定义body的高度等于可用浏览器窗口的高度
    one.body.setAttribute("style", "height:" + one.bodyH + "px;");
    //////////////////////////////////////////////////////////////////
    one.avatar = $("avatar");
    one.avatar_img = $("avatar_img");
    one.main = $("main");
    one.mainL = (one.bodyW - one.mainW) / 2;
    one.mainT = (one.screenH - one.mainH) / 2;
    ///////////////////////////////////////////////////////////
    one.top = $("top");
    one.center = $("center");
    one.bigimg = $("bigimg");
    one.movebox = $("movebox");
    one.moveimg = $("moveimg");
    one.d11 = $("d11");
    one.d22 = $("d22");
    one.d33 = $("d33");
    ///////////////////////////////////////////////////////////
    one.TopLeft = $("TopLeft");
    one.TopRight = $("TopRight");
    one.BottomRight = $("BottomRight");
    one.BottomLeft = $("BottomLeft");
    ///////////////////////////////////////////////////////////
    one.p2 = $("p2");
    one.p3 = $("p3");
    ///////////////////////////////////////////////////////////
    setLT(one.main, one.mainL, one.mainT);
    Hide(one.main);
};
var End = function () {

};
window.onload = function () {
    Init(); //初始化，获取页面上所有需要处理的标签对象，并赋初始值
    Events(); //定义页面中的所有事件
    End(); //js文件加载完成之后的处理工作
};//dom元素全部加载完成，执行此方法
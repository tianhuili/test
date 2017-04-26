/**
 * Created by zqx-04 on 2017/2/7.
 */
var pic = {
    pwh_max: 299, //图片最大宽高
    pwh_min: 30,  //图片最小宽高
    P:10/1,   //图片宽高比
    movediv_min: 30, //截框最小宽高
    movediv_default: 100,//截框初始宽高
    W_H: false, //宽大于高？
    imgtype: ["image/jpeg", "image/png", "image/gif", "image/bmp"],//支持这4种类型图片
    imgsize: 5 * 1024 * 1024, //最大5M
    d11WH: 119,
    d22WH: 99,
    d33WH: 71,
    URL:window.URL || window.webkitURL || window.mozURL || window.msURL || false,
};
var fun = {
    FormBlob: function (dataURI) {
        var byteString, splits = false, splits1 = dataURI.replace(new RegExp("^data:.*base64,"), function () {
            splits = true;
            return "";
        });
        byteString = atob(splits1);
        var byteStringlength = byteString.length, ia = new Uint8Array(byteStringlength);
        for (var i = 0; i < byteStringlength; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], {
            type: imgtype
        });
    },
    check_imgtype: function () {
        if (!inArray(imgtype, pic.imgtype)) {
            one.upfile.parentNode.removeChild(one.upfile);
            alert("请选择正确的图片类型");
            return false;
        } else { return true;}
    },
    check_imgsize: function () {
        if (imgsize > pic.imgsize) {
            this.parentNode.removeChild(this);
            alert("图片不能超过5M");
            return false;
        } else { return true;}
    },
    setImgWH: function (src,type) {
        var image = new Image();
        image.onload = function () {
            var newcanvas = document.createElement("canvas");
            newcanvas.style.display = "none";
            var bodys = document.body;
            bodys.appendChild(newcanvas);
            var ctx = newcanvas.getContext("2d");
            var width = this.width, height = this.height;//图片的宽高
            var w, h; //选取图片的宽高
            var cw, ch;//画布的宽高
            var P = width / height;
            imgP = P;
            pic.W_H = width > height ? true : false;
            if (pic.W_H) {
                if (P >= 10) {
                    ch = pic.pwh_min;
                    cw = pic.pwh_max;
                    h = height;
                    w = h * pic.pwh_max / pic.pwh_min;
                }
                else {
                    if (height <= pic.pwh_min) {
                        ch = pic.pwh_min;
                        cw = Math.round(ch * P);
                        h = height;
                        w = width;
                    }
                    else if (width >= pic.pwh_max) {
                        cw = pic.pwh_max;
                        ch = Math.round(cw / P);
                        h = height;
                        w = width;
                    }
                    else {
                        cw = width;
                        ch = height;
                        h = height;
                        w = width;
                    }
                }
            }
            else {
                if (P <= 1 / 10) {
                    cw = pic.pwh_min;
                    ch = pic.pwh_max;
                    w = width;
                    h = w * pic.pwh_max / pic.pwh_min;
                }
                else {
                    if (width <= pic.pwh_min) {
                        cw = pic.pwh_min;
                        ch = Math.round(cw / P);
                        w = width;
                        h = height;
                    }
                    else if (height >= pic.pwh_max) {
                        ch = pic.pwh_max;
                        cw = Math.round(ch * P);
                        w = width;
                        h = height;
                    }
                    else {
                        cw = width;
                        ch = height;
                        h = height;
                        w = width;
                    }
                }
            }
            /////////////////////////////////////////////////////
            imgW = newcanvas.width = cw;
            imgH = newcanvas.height = ch;
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, cw, ch);
            ctx.drawImage(image, 0, 0, w, h, 0, 0,cw, ch);
            imgURL = newcanvas.toDataURL(type, 1);
            //imgURL = pic.URL.createObjectURL(fun.FormBlob(imgURL));
            one.d11.src = one.d22.src = one.d33.src = one.bigimg.src = one.moveimg.src = imgURL;
            ctx.clearRect(0, 0, cw, ch);
            bodys.removeChild(newcanvas);
            delete DATA;
            delete image;
            fun.setStart();
        };
        image.onerror = function () {
            alert("图片已损坏，请上传正确图片");
        };
        image.src = src;
    },
    setStart: function () {
        Hide(one.avatar);
        Show(one.main);
        fun.set_bigimg();
        fun.set_movebox();
        fun.set_dxx();
    },
    set_bigimg: function () {
        bigimgL = Math.round((pic.pwh_max - imgW) / 2);
        bigimgT = Math.round((pic.pwh_max - imgH) / 2);
        setLT(one.bigimg,bigimgL,bigimgT);
    },
    set_movebox: function () {
        if (pic.W_H) {
            moveboxWH = imgH <= pic.movediv_default ? imgH : pic.movediv_default;
        }
        else {
            moveboxWH = imgW <= pic.movediv_default ? imgW : pic.movediv_default;
        }
        moveboxL = Math.round((pic.pwh_max - moveboxWH) / 2);
        moveboxT = Math.round((pic.pwh_max - moveboxWH) / 2);
        moveboxMinL = bigimgL;
        moveboxMinT = bigimgT;
        moveboxMaxL = Math.round(pic.pwh_max - moveboxWH - bigimgL);
        moveboxMaxT = Math.round(pic.pwh_max - moveboxWH - bigimgT);
        setLT(one.movebox, moveboxL, moveboxT);
        setWH(one.movebox, moveboxWH, moveboxWH);
        moveimgL = -Math.round((imgW - moveboxWH) / 2);
        moveimgT = -Math.round((imgH - moveboxWH) / 2);
        setLT(one.moveimg, moveimgL, moveimgT);
    },
    set_dxx: function () {
        var P1 = pic.d11WH / moveboxWH;
        var P2 = pic.d22WH / moveboxWH;
        var P3 = pic.d33WH / moveboxWH;
        var d11W = Math.round(imgW * P1);
        var d22W = Math.round(imgW * P2);
        var d33W = Math.round(imgW * P3);
        var d11H = Math.round(imgH * P1);
        var d22H = Math.round(imgH * P2);
        var d33H = Math.round(imgH * P3);
        setWH(one.d11, d11W, d11H);
        setWH(one.d22, d22W, d22H);
        setWH(one.d33, d33W, d33H);
        var d11L = Math.round(moveimgL * P1);
        var d22L = Math.round(moveimgL * P2);
        var d33L = Math.round(moveimgL * P3);
        var d11T = Math.round(moveimgT * P1);
        var d22T = Math.round(moveimgT * P2);
        var d33T = Math.round(moveimgT * P3);
        setLT(one.d11, d11L, d11T);
        setLT(one.d22, d22L, d22T);
        setLT(one.d33, d33L, d33T);
    },
    setimg: function () {
        moveimgL = bigimgL - one.movebox.offsetLeft;
        moveimgT = bigimgT - one.movebox.offsetTop;
        setLT(one.moveimg, moveimgL, moveimgT);
    },
};
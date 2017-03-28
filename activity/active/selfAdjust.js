/**
 * Created by admin on 2016/3/14.
 */
(function(win,doc){
    var docEl = doc.documentElement;
    var appVersion = win.navigator.appVersion;
    var isAndroid = appVersion.match(/android/gi);
    var isIPhone = appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;
    var dpr = 1,scale = 1;
    if (isIPhone) {
        if (devicePixelRatio >= 3) {
            dpr = 3;
        } else if (devicePixelRatio >= 2){
            dpr = 2;
        } else {
            dpr = 1;
        }
    } else {
        dpr = 1;
    }
    scale = 1 / dpr;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    if(!metaEl){
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }
    if(dpr != 1){
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    }
    window.DPR = dpr;
})(window,document);

/*rem adaptation*/
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth >= window.DPR * 640 ? window.DPR * 640 : docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 10*(clientWidth / 320) + 'px';
            docEl.style.maxWidth = clientWidth + 'px';
        };
    recalc();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);

//获取url参数函数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
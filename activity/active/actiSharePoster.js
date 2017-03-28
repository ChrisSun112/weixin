/**
 * Created by admin on 2016/9/18.
 */
$(function () {
    var aid = getAid();
    //是否已经分享
    var hasShare = false;
    if($('#shareLogo').attr('src')){
        $("#shareLogo").show();
    }
    if($('#showImg').attr('src')){
        $("#showImg").show();
    }
    if($('#desc-title').html()){
        $("#desc-title").show();
    }
    if($('#desc-content').html()){
        $("#desc-content").show();
    }
    if($('#share-btn').attr('src')){
        $("#share-btn").show();
    }
    if(isWeiXin()){
        $.ajax({
            url:'/activity/getWxJsConfig.do?time='+new Date(),
            method:"POST",
            data:{'aid':aid,'url':window.location.href.split('#')[0]},
            dataType:'json',
            success:function(res){
                if(res.code == 1){
                    wx.config({
//                                        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: res.data.appId, // 必填，公众号的唯一标识
                        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                        signature: res.data.signature,// 必填，签名，见附录1
                        jsApiList: ['hideOptionMenu','showOptionMenu','scanQRCode','closeWindow','getLocation','hideMenuItems','onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.ready(function() {
                        wx.hideMenuItems({
                            menuList: ['menuItem:favorite', 'menuItem:copyUrl', 'menuItem:openWithQQBrowser', 'menuItem:openWithSafari', 'menuItem:share:QZone', 'menuItem:share:qq', 'menuItem:share:email'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                        });
                        var actiImg = '';
                        var actiTitle = '';
                        var shareUrl = '';
                        if($("#actiImg").val()){
                            actiImg = 'http://'+window.location.host+$("#actiImg").val();
                        }
                        if($("#actiTitle").val()){
                            actiTitle = $("#actiTitle").val();
                        }
                        if( $("#shareUrl").val()){
                            shareUrl = $("#shareUrl").val();
                        }
                        var shareFlag = false;
                        if(window.atob(window.localStorage.getItem(aid+'m')) == '888888'){
                            shareFlag = true;
                        }
                        if($("#shareCircle").val()==1 && $("#shareFriends").val() == 1) {
                            wx.onMenuShareTimeline({
                                title: actiTitle, // 分享标题
                                link: shareUrl, // 分享链接
                                imgUrl: actiImg, // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                    if(!hasShare){
                                        if(shareFlag){
                                            return;
                                        }
                                        hasShare = true;
                                        if(getUrlParam('isPreview')){
                                            if(window.localStorage.getItem(aid)){
                                                window.location.href='/activity/posterToActivitPage.do?aid='+aid+"&isPreview=true&m="+window.btoa(window.localStorage.getItem(aid))+"";
                                            }else{
                                                window.location.href='/activity/posterToActivitPage.do?aid='+aid+"&isPreview=true";
                                            }
                                        }else{
                                            if(window.localStorage.getItem(aid)){
                                                window.location.href='/activity/posterToActivitPage.do?aid='+aid+"&m="+window.btoa(window.localStorage.getItem(aid))+"";
                                            }else{
                                                window.location.href='/activity/posterToActivitPage.do?aid='+aid;
                                            }
                                        }
                                    }
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                            wx.onMenuShareAppMessage({
                                title: actiTitle, // 分享标题
                                link: shareUrl, // 分享链接
                                imgUrl: actiImg, // 分享图标
                                desc:'关注新华社公众号了解最新的两会动态，更有免费流量赠送',
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                    if(!hasShare){
                                        if(shareFlag){
                                            return;
                                        }
                                        hasShare = true;
                                        if(getUrlParam('isPreview')){
                                            if(window.localStorage.getItem(aid)){
                                                window.location.href='/activity/posterToActivitPage.do?aid='+aid+"&isPreview=true&m="+window.btoa(window.localStorage.getItem(aid))+"";
                                            }else{
                                                window.location.href='/activity/posterToActivitPage.do?aid='+aid+"&isPreview=true";
                                            }
                                        }else{
                                            if(window.localStorage.getItem(aid)){
                                                window.location.href='/activity/posterToActivitPage.do?aid='+aid+"&m="+window.btoa(window.localStorage.getItem(aid))+"";
                                            }else{
                                                window.location.href='/activity/posterToActivitPage.do?aid='+aid;
                                            }
                                        }
                                    }
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                        }else if($("#shareCircle").val()==1){
                            wx.onMenuShareTimeline({
                                title: actiTitle, // 分享标题
                                link: shareUrl, // 分享链接
                                imgUrl: actiImg, // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                    if(!hasShare){
                                        if(shareFlag){
                                            return;
                                        }
                                        hasShare = true;
                                        if(getUrlParam('isPreview')){
                                            if(window.localStorage.getItem(aid)){
                                                window.location.href='/activity/posterToActivitPage.do?aid='+aid+"&isPreview=true&m="+window.btoa(window.localStorage.getItem(aid))+"";
                                            }else{
                                                window.location.href='/activity/posterToActivitPage.do?aid='+aid+"&isPreview=true";
                                            }
                                        }else{
                                            if(window.localStorage.getItem(aid)){
                                                window.location.href='/activity/posterToActivitPage.do?aid='+aid+"&m="+window.btoa(window.localStorage.getItem(aid))+"";
                                            }else{
                                                window.location.href='/activity/posterToActivitPage.do?aid='+aid;
                                            }
                                        }
                                    }
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                            wx.onMenuShareAppMessage({
                                title: actiTitle, // 分享标题
                                link: shareUrl, // 分享链接
                                imgUrl: actiImg, // 分享图标
                                desc:'关注新华社公众号了解最新的两会动态，更有免费流量赠送',
                                success: function () {
                                    // 用户确认分享后执行的回调函数

                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                        }else{
                            wx.onMenuShareAppMessage({
                                title: actiTitle, // 分享标题
                                link: shareUrl, // 分享链接
                                imgUrl: actiImg, // 分享图标
                                desc:'关注新华社公众号了解最新的两会动态，更有免费流量赠送',
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                    if(!hasShare){
                                        if(shareFlag){
                                            return;
                                        }
                                        hasShare = true;
                                        if(getUrlParam('isPreview')){
                                            if(window.localStorage.getItem(aid)){
                                                window.location.href='/activity/posterToActivitPage.do?aid='+aid+"&isPreview=true&m="+window.btoa(window.localStorage.getItem(aid))+"";
                                            }else{
                                                window.location.href='/activity/posterToActivitPage.do?aid='+aid+"&isPreview=true";
                                            }
                                        }else{
                                            if(window.localStorage.getItem(aid)){
                                                window.location.href='/activity/posterToActivitPage.do?aid='+aid+"&m="+window.btoa(window.localStorage.getItem(aid))+"";
                                            }else{
                                                window.location.href='/activity/posterToActivitPage.do?aid='+aid;
                                            }
                                        }
                                    }
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                            wx.onMenuShareTimeline({
                                title: actiTitle, // 分享标题
                                link: shareUrl, // 分享链接
                                imgUrl: actiImg, // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数

                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                        }
                    })
                }else{
//                                    alert(res.message);
                }
            }
        });
    }
});

(function($) {

    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        a256 = '',
        r64 = [256],
        r256 = [256],
        i = 0;

    var UTF8 = {

        /**
         * Encode multi-byte Unicode string into utf-8 multiple single-byte characters
         * (BMP / basic multilingual plane only)
         *
         * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars
         *
         * @param {String} strUni Unicode string to be encoded as UTF-8
         * @returns {String} encoded string
         */
        encode: function(strUni) {
            // use regular expressions & String.replace callback function for better efficiency
            // than procedural approaches
            var strUtf = strUni.replace(/[\u0080-\u07ff]/g, // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
                function(c) {
                    var cc = c.charCodeAt(0);
                    return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
                })
                .replace(/[\u0800-\uffff]/g, // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
                function(c) {
                    var cc = c.charCodeAt(0);
                    return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
                });
            return strUtf;
        },

        /**
         * Decode utf-8 encoded string back into multi-byte Unicode characters
         *
         * @param {String} strUtf UTF-8 string to be decoded back to Unicode
         * @returns {String} decoded string
         */
        decode: function(strUtf) {
            // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
            var strUni = strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, // 3-byte chars
                function(c) { // (note parentheses for precence)
                    var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
                    return String.fromCharCode(cc);
                })
                .replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, // 2-byte chars
                function(c) { // (note parentheses for precence)
                    var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
                    return String.fromCharCode(cc);
                });
            return strUni;
        }
    };

    while(i < 256) {
        var c = String.fromCharCode(i);
        a256 += c;
        r256[i] = i;
        r64[i] = b64.indexOf(c);
        ++i;
    }

    function code(s, discard, alpha, beta, w1, w2) {
        s = String(s);
        var buffer = 0,
            i = 0,
            length = s.length,
            result = '',
            bitsInBuffer = 0;

        while(i < length) {
            var c = s.charCodeAt(i);
            c = c < 256 ? alpha[c] : -1;

            buffer = (buffer << w1) + c;
            bitsInBuffer += w1;

            while(bitsInBuffer >= w2) {
                bitsInBuffer -= w2;
                var tmp = buffer >> bitsInBuffer;
                result += beta.charAt(tmp);
                buffer ^= tmp << bitsInBuffer;
            }
            ++i;
        }
        if(!discard && bitsInBuffer > 0) result += beta.charAt(buffer << (w2 - bitsInBuffer));
        return result;
    }

    var Plugin = $.base64 = function(dir, input, encode) {
        return input ? Plugin[dir](input, encode) : dir ? null : this;
    };

    Plugin.btoa = Plugin.encode = function(plain, utf8encode) {
        plain = Plugin.raw === false || Plugin.utf8encode || utf8encode ? UTF8.encode(plain) : plain;
        plain = code(plain, false, r256, b64, 8, 6);
        return plain + '===='.slice((plain.length % 4) || 4);
    };

    Plugin.atob = Plugin.decode = function(coded, utf8decode) {
        coded = String(coded).split('=');
        var i = coded.length;
        do {--i;
            coded[i] = code(coded[i], true, r64, a256, 6, 8);
        } while (i > 0);
        coded = coded.join('');
        return Plugin.raw === false || Plugin.utf8decode || utf8decode ? UTF8.decode(coded) : coded;
    };
}(jQuery));

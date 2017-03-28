/**
 * Created by admin on 2016/3/9.
 */
function startmarquee(lh, speed, delay, index) {
	/*
	 函数startmarquee的参数：
	 lh：文字一次向上滚动的距离或高度；
	 speed：滚动速度；
	 delay：滚动停顿的时间间隔；
	 index：可以使封装后的函数应用于页面当中不同的元素；
	 */
	var t;
	var p = false;
	var o = document.getElementById(index);
	//获取文档中的滚动区域对象，赋值给变量o；
	o.innerHTML += o.innerHTML; //对象中的实际内容被复制了一份，包含了两个ul，当然li标签也
	//由原来的3行，变为6行；复制的目的在于给文字不间断向上滚动提供过渡。
	//o.onmouseover=function(){p=true}
	//鼠标滑过，停止滚动；
	//    o.onmouseout=function(){p=false}
	//鼠标离开，开始滚动；p是true还是false直接影响到下面start()函数的执行；
	o.scrollTop = 0;
	//文字内容顶端与滚动区域顶端的距离，初始值为0；
	function start() {
		t = setInterval(scrolling, speed); //每隔一段时间，setInterval便会执行一次
		//scrolling函数；speed越大，滚动时间间隔越大，滚动速度越慢；
		if(!p) {
			o.scrollTop += 1;
		}
		//滚动停止或开始，取决于p传来的布尔值；
	}

	function scrolling() {
		if(o.scrollTop % lh >= 1) {
			//if(o.scrollTop%lh!=0){
			//如果不被整除，即一次上移的高度达不到lh，则内容会继续往上滚动；
			o.scrollTop += 1;
			if(o.scrollTop >= o.scrollHeight / 2 - 5) o.scrollTop = 0;
			//对象o中的内容之前被复制了一次，所以它的滚动高度，其实是原来内容的两倍高度；
			//当内容向上滚动到scrollHeight/2的高度时，全部3行文字已经显示了一遍，至此整块内容
			//scrollTop归0；再等待下一轮的滚动，从而达到文字不间断向上滚动的效果；
		} else {
			clearInterval(t);
			//否则清除t，暂停滚动
			setTimeout(start, delay);
			//经过delay间隔后，启动start() 再连续滚动
		}
	}
	setTimeout(start, delay);
	//第一次启动滚动；setTimeout会在一定的时间后执行函数start()，且只执行一次
}
//传递参数
//startmarquee(25,30,3000,0);
//带停顿效果
//不间断连续
//startmarquee(25,40,0,'marqueebox');

//根据两点经纬度计算距离 单位：米
var EARTH_RADIUS = 6378137.0; //单位M
var PI = Math.PI;

function getRad(d) {
	return d * PI / 180.0;
}

/**
 * caculate the great circle distance
 * @param {Object} lat1
 * @param {Object} lng1
 * @param {Object} lat2
 * @param {Object} lng2
 */
function getGreatCircleDistance(lat1, lng1, lat2, lng2) {
	var radLat1 = getRad(lat1);
	var radLat2 = getRad(lat2);

	var a = radLat1 - radLat2;
	var b = getRad(lng1) - getRad(lng2);

	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
	s = s * EARTH_RADIUS;
	s = Math.round(s * 10000) / 10000.0;

	return s;
}
/*共用的判断位置方法 是否采集gps 判断是否能够执行活动*/
function positionFunc() {
	var dataMap;
	if(document.getElementById("positionData") != null) {
		dataMap = document.getElementById("positionData").dataset;
	}
	/************ 位置限制 ************/
	// 获取当前位置坐标信息
	//是否开启流量采集
	var isOpenGPSPosition = $('#isOpenGps').val();
	//是否在范围之内 bool
	//var inPositionRange = false;
	var isLimitPosition = false;
	if(dataMap && dataMap.isLimitPosi == 1 && dataMap.lngLatValidRange > 0 && dataMap.lngLatPointsRange.length > 0) {
		isLimitPosition = true;
	}
	// 获取位置信息
	if((isOpenGPSPosition == 1) || isLimitPosition) {
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {
				// 指示浏览器获取高精度的位置，默认为false
				enableHighAcuracy: false,
				// 指定获取地理位置的超时时间，默认不限时，单位为毫秒
				timeout: 5000,
				// 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
				maximumAge: 3000
			});
		} else if(isLimitPosition) {
			alert("您的浏览器无法支持定位功能，无法成功领取流量！");
		}
	}

	// 获取位置成功
    function locationSuccess(position) {
        $("#longitude").val(position.coords.longitude);
        $("#latitude").val(position.coords.latitude);
        hasGetPosition = 1;
    }
	// 获取位置失败
	function locationError(error) {
		//如果限制了领取位置限制才提示
		if(isLimitPosition) {
            hasGetPosition = 1;
		}
	}
}

function regretModalClose() {
	$('#self-center-regret-modal').hide();
	$("#self-center-mask").hide();
	$("#self-center-regret-modal #regret-content #regret-type-one").hide();
	$("#self-center-regret-modal #regret-content #regret-type-two").hide();
	$("#self-center-regret-modal #regret-content #regret-type-three").hide();
	$("#self-center-regret-modal #regret-content #regret-type-four").hide();
	sharkable = true;
	wheeling = false
}

function packetModalClose() {
	$('#self-center-packet-modal').hide();
	$("#self-center-mask").hide();
	$("#self-center-packet-modal #packet-type-one").hide();
	$("#self-center-packet-modal #packet-type-two").hide();
	$("#self-center-packet-modal #packet-type-three").hide();
	sharkable = true;
	wheeling = false
}

function cardModalClose() {
	$('#self-center-card-modal').hide();
	$("#self-center-mask").hide();
	$("#self-center-card-modal #card-type-one").hide();
	$("#self-center-card-modal #card-type-two").hide();
	$("#self-center-card-modal #card-type-three").hide();
	sharkable = true;
	wheeling = false
}

function giftModalClose() {
	$('#self-center-gift-modal').hide();
	$("#self-center-mask").hide();
	$("#self-center-gift-modal #gift-type-one").hide();
	$("#self-center-gift-modal #gift-type-two").hide();
	$("#self-center-gift-modal #gift-type-three").hide();
	sharkable = true;
	wheeling = false
}

//关闭弹窗事件绑定
$('#self-center-regret-modal #regret-close').on('click', function() {
	$('#self-center-regret-modal').hide();
	$("#self-center-mask").hide();
	$("#self-center-regret-modal #regret-content #regret-type-one").hide();
	$("#self-center-regret-modal #regret-content #regret-type-two").hide();
	$("#self-center-regret-modal #regret-content #regret-type-three").hide();
	$("#self-center-regret-modal #regret-content #regret-type-four").hide();
	sharkable = true;
	wheeling = false
});
$('#self-center-packet-modal .congra-close').on('click', function() {
	$('#self-center-packet-modal').hide();
	$("#self-center-mask").hide();
	$("#self-center-packet-modal #packet-type-one").hide();
	$("#self-center-packet-modal #packet-type-two").hide();
	$("#self-center-packet-modal #packet-type-three").hide();
	sharkable = true;
	wheeling = false
});
$('#self-center-card-modal .congra-close').on('click', function() {
	$('#self-center-card-modal').hide();
	$("#self-center-mask").hide();
	$("#self-center-card-modal #card-type-one").hide();
	$("#self-center-card-modal #card-type-two").hide();
	$("#self-center-card-modal #card-type-three").hide();
	sharkable = true;
	wheeling = false
});
$("#self-center-pick-modal #pick-close").on('click', function() {
	$("#self-center-pick-modal").hide();
	$("#self-center-mask").hide();
});
$('#self-center-gift-modal .congra-close').on('click', function() {
	$('#self-center-gift-modal').hide();
	$("#self-center-mask").hide();
	$("#self-center-gift-modal #gift-type-one").hide();
	$("#self-center-gift-modal #gift-type-two").hide();
	$("#self-center-gift-modal #gift-type-three").hide();
	sharkable = true;
	wheeling = false
});
//1 可再抽  2 分享可抽  3查看钱包（不能再抽）  4确定
if(typeof showModel == "undefined") {
	var showModel = {
		CAN_PLAY: 1,
		SHARE_PLAY: 2,
		PACKAGE: 3,
		SURE: 4
	}
}
// 显示很遗憾弹窗
function showRegretModal(message, type) {
	//1 可再抽  2 分享可抽  3查看钱包（不能再抽）  4确定
	if(type == showModel.CAN_PLAY) {
		$("#self-center-regret-modal #regret-content .desc").html(message);
		$("#self-center-regret-modal #regret-content #regret-type-one").show();
		$("#self-center-regret-modal").show();
		$("#self-center-mask").show();
	} else if(type == showModel.SHARE_PLAY) {
		$("#self-center-regret-modal #regret-content .desc").html(message);
		$("#self-center-regret-modal #regret-content #regret-type-two").show();
		$("#self-center-regret-modal").show();
		$("#self-center-mask").show();
	} else if(type == showModel.PACKAGE) {
		$("#self-center-regret-modal #regret-content .desc").html(message);
		$("#self-center-regret-modal #regret-content #regret-type-three").show();
		$("#self-center-regret-modal").show();
		$("#self-center-mask").show();
	} else {
		$("#self-center-regret-modal #regret-content .desc").html(message);
		$("#self-center-regret-modal #regret-content #regret-type-four").show();
		$("#self-center-regret-modal").show();
		$("#self-center-mask").show();
	}
}
// 显示流量（包）成功弹窗
function showPacketCongraModal(traffic, type,canUse) {
	//1 可再抽  2 分享可抽  3 不能再抽
	if(type == showModel.CAN_PLAY) {
		$("#self-center-packet-modal .traffic-number").html(traffic);
		$("#self-center-packet-modal #congra-packet-number span").html(traffic);
		$("#self-center-packet-modal").show();
		$("#self-center-packet-modal #packet-type-one").show();
		$("#self-center-mask").show();
	} else if(type == showModel.SHARE_PLAY) {
		$("#self-center-packet-modal .traffic-number").html(traffic);
		$("#self-center-packet-modal #congra-packet-number span").html(traffic);
		$("#self-center-packet-modal").show();
		$("#self-center-packet-modal #packet-type-two").show();
		$("#self-center-mask").show();
	} else {
		$("#self-center-packet-modal .traffic-number").html(traffic);
		$("#self-center-packet-modal #congra-packet-number span").html(traffic);
		$("#self-center-packet-modal").show();
		$("#self-center-packet-modal #packet-type-three").show();
		$("#self-center-mask").show();
	}
	if(!canUse){
		$('.acti-get-prize').remove();
		$('.congra-coupon').css({"marginTop":$(window).width()/640*100+"px"});
		$('.congra-one-more').css({"width":"100%"});
		$('#canuse').show();
	}
}
//显示流量卡（零散流量）中奖
function showCardCongraModal(traffic, type) {
	//1 可再抽  2 分享可抽  3 不能再抽
	if(type == showModel.CAN_PLAY) {
		$("#self-center-card-modal .traffic-number").html(traffic);
		$("#self-center-card-modal #congra-card-number span").html(traffic);
		$("#self-center-card-modal").show();
		$("#self-center-card-modal #card-type-one").show();
		$("#self-center-mask").show();
	} else if(type == showModel.SHARE_PLAY) {
		$("#self-center-card-modal .traffic-number").html(traffic);
		$("#self-center-card-modal #congra-card-number span").html(traffic);
		$("#self-center-card-modal").show();
		$("#self-center-card-modal #card-type-two").show();
		$("#self-center-mask").show();
	} else {
		$("#self-center-card-modal .traffic-number").html(traffic);
		$("#self-center-card-modal #congra-card-number span").html(traffic);
		$("#self-center-card-modal").show();
		$("#self-center-card-modal #card-type-three").show();
		$("#self-center-mask").show();
	}
}
//显示实物券领取成功弹窗 只有抽奖送有
function showGiftCongraModal(traffic, type) {
	//1 可再抽  2 分享可抽  3 不能再抽
	if(type == showModel.CAN_PLAY) {
		$("#self-center-gift-modal").show();
		$("#self-center-gift-modal #gift-type-one").show();
		$("#self-center-gift-modal #congra-gift-number").html(traffic);
		$("#self-center-mask").show();
	} else if(type == showModel.SHARE_PLAY) {
		$("#self-center-gift-modal").show();
		$("#self-center-gift-modal #gift-type-two").show();
		$("#self-center-gift-modal #congra-gift-number").html(traffic);
		$("#self-center-mask").show();
	} else {
		$("#self-center-gift-modal").show();
		$("#self-center-gift-modal #gift-type-three").show();
		$("#self-center-gift-modal #congra-gift-number").html(traffic);
		$("#self-center-mask").show();
	}
}

//显示提取成功提示框
function showPickSuccessModal(message) {
	$("#self-center-pick-modal #pick-content p").html(message);
	$("#self-center-pick-modal").show();
	$("#self-center-mask").show();
}
//获取url参数函数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return unescape(r[2]);
	return null; //返回参数值
}

//获取 aid
function getAid() {

	var aid = '';
	var testArr = window.location.href;
	aid = $('#aid').val();
	if(!aid) {
		if(getUrlParam('aid')) {
			aid = getUrlParam('aid');
		} else if(testArr.lastIndexOf('a/') != -1){
            aid = testArr.substr(testArr.lastIndexOf('a/') + 2, 6);
        }else {
			aid = false;
		}
	}
	return aid;
}

//点击 个人中心或者 查看钱包 获取aid并进入个人中心
$(".congra-check-packet.acti-self-center,.regret-check-packet.acti-self-center,.actionBtn.acti-self-center,.acti-direct #pick-share,.acti-card #pick-share").on('click', function() {
	if(getUrlParam('isPreview')) {
		showRegretModal('预览模式下不能进入个人中心', 4);
	} else {
		var aid = $("#aid").val();
		//未参与活动没有手机号码不能进入手机中心
		if(window.localStorage.getItem(aid)) {
			window.location.href = '/mobile/html/selfCenter/redBee/selfCenter.html?aid=' + aid;
		} else {
			showRegretModal('请先参与活动再进入个人中心！', 4);
		}
	}
});
//点击确认按钮 关闭modal
$(".regret-check-packet.acti-confirm").on('click', function() {
	$('#self-center-regret-modal #regret-close').trigger('click');
});
//点击活动规则 进入规则页面 acti-rule
$('.acti-rule').on('click', function() {
	var aid = $("#aid").val();
	window.location.href = '/mobile/static/'+aid+'/activityRule.html?aid=' + aid;
});

//var isTouch = 'ontouchstart' in window,
//    events = {
//        start: isTouch ? 'touchstart' : 'mousedown',
//        move: isTouch ? 'touchmove' : 'mousemove',
//        end: isTouch ? 'touchend' : 'mouseup'
//    };

//移动端海报页面定位 插件
//
(function($) {
	$.fn.setElePosi = function(obj) { //options 经常用这个表示有许多个参数。
		return this.each(function() {
			var selObject = $(this); //获取当前对象
			if(obj.width != undefined) {
				selObject.css({
					'width': $(window).width() / 640 * obj.width + 'px'
				});
			}
			if(obj.left != undefined) {
				selObject.css({
					'left': $(window).width() / 640 * obj.left + 'px'
				});
			}
			if(obj.right != undefined) {
				selObject.css({
					'right': $(window).width() / 640 * obj.right + 'px'
				});
			}
			if(obj.top != undefined) {
				selObject.css({
					'top': $(window).width() / 640 * obj.top + 'px'
				});
			}
			if(obj.bottom != undefined) {
				selObject.css({
					'bottom': $(window).width() / 640 * obj.bottom + 'px'
				});
			}
			if(obj.lineHeight != undefined) {
				selObject.css({
					'lineHeight': $(window).width() / 640 * obj.lineHeight + 'px'
				});
			}
			if(obj.fontSize != undefined) {
				selObject.css({
					'fontSize': $(window).width() / 640 * obj.fontSize + 'px'
				});
			}
		});
	}
})(jQuery);

//判断当前浏览器是否是微信浏览器
function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}

//orange风格表单活动页面提示框 公共方法 type->1成功 2失败  message对成功为traffic  对失败为失败信息 isReg->是否为注册送
function showOrangeFormModal(type, message, isReg,canUse) {
	if(type == 1) {
		$('#formCommonModal #content-img').addClass('active');
		$('#self-center-mask').show();
		$('#formCommonModal #content-message').html(message);
		if(isReg) {
			$('#formCommonModal #formModalAction').addClass('active');
		}
	} else if(type == 2) {
		$('#formCommonModal #content-img').removeClass('active');
		$('#self-center-mask').show();
		$('#formCommonModal #content-message').html(message);
		if(isReg) {
			$('#formCommonModal #formModalAction').removeClass('active');
		}
	}
	if(!canUse){
		$('.acti-get-prize').remove();
		$('#connect-service').css({'width':'100%'});
	}
	$('#formCommonModal').show();
}
//orange风格表单活动页面提示框 关闭方法
$('#formCommonModal #modalClose').on('click', function() {
	$('#self-center-mask').hide();
	$('#formCommonModal').hide();
});
$('#connect-service').on('click',function(){
    $('#self-center-mask').hide();
    $('#formCommonModal').hide();
});
//中奖信息分享页面
var sharerprizeURL ='http://'+window.location.host+'/mobile/html/selfCenter/redBee/sharePrize.html?playId=';
// jsConfig 公共方法
function wxConfigCommon(){
    var aid = getAid();
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
							menuList: ['menuItem:favorite', 'menuItem:copyUrl', 'menuItem:openWithQQBrowser', 'menuItem:openWithSafari', 'menuItem:share:QZone', 'menuItem:share:qq', 'menuItem:share:email','menuItem:share:timeline'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
						});
						var actiImg = '';
						var actiTitle = '';
						var shareUrl = '';
						if($("#actiImg").val()){
							actiImg = 'http://'+window.location.host+'/'+$("#actiImg").val();
						}
						if($("#actiTitle").val()){
							actiTitle = $("#actiTitle").val();
						}
						if( $("#shareUrl").val()){
							shareUrl = $("#shareUrl").val();
						}
						if($("#sharePrize").val()){
	                        shareUrl = $("#sharePrize").val();
	                    }
						if($("#shareCircle").val()==1 && $("#shareFriends").val() == 1) {
							wx.onMenuShareTimeline({
								title: actiTitle, // 分享标题
								link: shareUrl, // 分享链接
								imgUrl: actiImg, // 分享图标
								success: function () {
									// 用户确认分享后执行的回调函数
									if(!hasShare){
										hasShare = true;
//                                                        window.location.href = '/mobile/activity/actiCommon.html?aid=' + aid + '&share=yes';
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
								success: function () {
									// 用户确认分享后执行的回调函数
									if(!hasShare){
										hasShare = true;
//                                                        window.location.href = '/mobile/activity/actiCommon.html?aid=' + aid + '&share=yes';
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
										hasShare = true;
//                                                        window.location.href = '/mobile/activity/actiCommon.html?aid=' + aid + '&share=yes';
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
								success: function () {
									// 用户确认分享后执行的回调函数
									if(!hasShare){
										hasShare = true;
//                                                        window.location.href = '/mobile/activity/actiCommon.html?aid=' + aid + '&share=yes';
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
						};
                        $('#scanQRCode').show();
					})
				}else{
//                                    alert(res.message);
				}
			}
		});
	}
}

//获取客服电话公共方法
function  getServicePhone(obj,aid){
    $.ajax({
        type:'post',
        url:'/activity/getServicePhone.do',
        data:{'aid':aid},
        dataType:'json',
        success:function(res){
            if(res.code == 1){
                $(obj).attr('href','tel:'+res.data.servicePhone);
            }
        },
        error:function(error){

        }
    })
}

//设置背景图片公共方法
function getImage(url,obj){
    var img = new Image();
    img.src = url;
    // 如果图片被缓存，则直接返回缓存数据
    if(img.complete){
        $(obj).css({'background-image':'url('+img.src+')'});
    }else{
        // 完全加载完毕的事件
        img.onload = function(){
            $(obj).css({'background-image':'url('+img.src+')'});
        }
    }
}
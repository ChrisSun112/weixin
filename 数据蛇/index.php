<!doctype html>
<html class="no-js">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="流量穿山甲为淘宝店主生成宝贝短链，方便提供给别人通过微信、QQ或手机浏览器访问是转到手淘">
  <meta name="keywords" content="流量穿山甲,数据蛇,淘宝短链,刷单短链,卡首屏">
  <meta name="viewport"
        content="width=device-width, initial-scale=1">
  <title>流量穿山甲</title>
  <link rel="stylesheet" href="http://cdn.amazeui.org/amazeui/2.7.2/css/amazeui.min.css"/>
  </head>
<body>
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-88036950-2', 'auto');
  ga('send', 'pageview');
    </script>
<header class="am-topbar am-topbar-inverse">
  <h1 class="am-topbar-brand">
    <a href="index.php" class="">流量穿山甲</a>
  </h1>
  <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only"
            data-am-collapse="{target: '#doc-topbar-collapse-4'}"><span class="am-sr-only">导航切换</span> <span
        class="am-icon-bars"></span></button>

    <div class="am-collapse am-topbar-collapse" id="doc-topbar-collapse-4">
      <ul class="am-nav am-nav-pills am-topbar-nav">
        <li class="am-active"><a href="index.php">首页</a></li>
        <li><a href="she.php">多关键字短链</a></li>
        
      </ul>
    </div>
</header>

<div class="am-form"  style="width:50%;margin-top:1rem;margin-left:25%">
  <fieldset>
  
  <div class="am-form-group">
      <label for="doc-ipt-email-1">宝贝链接<span style="color:red">*</span></label>
      <input type="text" class="" id="doc-baobei" name="link" placeholder="请输入宝贝链接">
    </div>

  <div class="am-form-group">
      <label for="doc-ipt-email-1">关键字<span style="color:red">*</span></label>
      <input type="text" class="" id="doc-keywords" name="keywords" placeholder="请输入搜索关键字">
    </div>

	<div class="am-form-group">
      <label for="doc-ipt-email-1">微信图片地址(图片地址)</label>
      <input type="text" class="" id="doc-ipt-email-1" name="img_url" placeholder="微信图片地址">
    </div>
    
 
	<!--
    <div class="am-form-group am-form-file">
      <label for="doc-ipt-file-2">Amaze UI 文件上传域</label>
      <div>
        <button type="button" class="am-btn am-btn-default am-btn-sm">
          <i class="am-icon-cloud-upload"></i> 选择要上传的文件</button>
      </div>
      <input type="file" id="doc-ipt-file-2">
    </div>
-->
   

   
    <p><input type="submit" id="submit_btn" name="submit" class="am-btn am-btn-default" style='width:40%;;margin-left:30%' value="提交"></input></p>
  </fieldset>
  
  <div id="result"></div>
  
</div>

<footer class="amz-footer" style="text-align: center;background: #555;height:8rem;position:fixed;bottom:0;width:100%;color:#fff;">
	<p style="margin-top:2rem;margin-bottom:0.1rem;">
Copyright © 2016 <a href="http://www.yshizi.cn/">流量穿山甲</a>. All Rights Reserved ｜备案号：<a href="http://www.miitbeian.gov.cn/">粤ICP备16116056号</a> 
</p>
<p style="margin-top:0.5rem;">QQ交流群&nbsp;：200325654</p>
</footer>

<script src="//cdn.bootcss.com/jquery/3.0.0/jquery.min.js"></script>
<script >
$("#submit_btn").click(function(){
	var url = $("#doc-baobei").val();
	var keywords = $("#doc-keywords").val();
	var img_url = $("#doc-ipt-email-1").val();
	if(url==""||keywords==""){
		alert("宝贝链接和关键字不能为空");
		return;
	}
	
	$.ajaxSetup({
		contentType: "application/x-www-form-urlencoded; charset=utf-8"
	});

	$.post("./single.php",{link:url,keywords:keywords,img_url:img_url},function(result){
		if(result.indexOf("数据失败")>0){
           alert(result);
		}else{
			$("#result").html("<p>请复制下面的链接在微信打开</p><p class='am-text-danger'>"+result+"</p>");
			$("#doc-baobei").val("");
			$("#doc-keywords").val("");
			$("#doc-ipt-email-1").val("");
		}
		//alert(result);
	})
})
</script>
</body>
</html>

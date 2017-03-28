<!doctype html>
<html class="no-js">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title></title>

  <style>
header, section, footer, aside, nav, article, figure
{
    display: block;
} 

article{ padding-left:30px; padding-right:30px;}
header p{ color:#999;}
body{ font-family: "Arial Black", Helvetica, sans-serif;
  color: black;
font-size:2em;
}
h1{ text-align:center;}
header p{ text-align:center;text-size-adjust: 100%; height:1px; background:#CCC;}

	.weixin-tip img{max-width: 100%; height: auto;}
	.weixin-tip{display: none; position: fixed; left:0; top:0; bottom:0; background: rgba(0,0,0,0.8); filter:alpha(opacity=80);  height: 100%; width: 100%; z-index: 100;}
	.weixin-tip p{text-align: center; margin-top: 10%; padding:0 5%;}

.ct{ width:100%; height:100%;}
.ct img{vertical-align: middle;max-width: 800px; width: expression(this.width >800 && this.height < this.width ? 800: true); }

	</style>
	  <script type="text/javascript" src="jquery.js"></script>
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

<img id="weixinimgxx" src="https://img.alicdn.com/imgextra/i4/2455472232/TB20xKubCOI.eBjSspmXXatOVXa_!!2455472232.jpg_430x430q90.jpg" width="1" height="1">


	<div class="weixin-tip">
		<p>
			<img id="weixinimg" src="">
		</p>
	</div>


	<script type="text/javascript">
	
	var ua = navigator.userAgent.toLowerCase();	
	if (/iphone|ipad|ipod/.test(ua)) {
		    //alert("iphone");	
			document.getElementById("weixinimg").src="http://www.yshizi.cn/weixin2.png";
	} else if (/android/.test(ua)) {
		    
			document.getElementById("weixinimg").src="http://www.yshizi.cn/weixin.png";
			
	}else{
		
		alert("请在手机浏览器或手机微信中打开此网页！");
   }
	
        $(window).on("load",function(){
	        var winHeight = $(window).height();
			function is_weixin() {
			    var ua = navigator.userAgent.toLowerCase();
			    if (ua.match(/MicroMessenger/i) == "micromessenger") {
					
			        return true;
			    } else {
					
			        return false;
			    }
			}
			var isWeixin = is_weixin();
			if(isWeixin){
				$(".weixin-tip").css("height",winHeight);
	            $(".weixin-tip").show();
			}
        })
	</script> 
<article>
 
  
<div class="ct" >

<?php include_once("ds-config.php") ?>
<?php
    $id=(int)$_GET['id'];
	
    $num="";
    if(isset($_GET['num'])){
        $num=$_GET['num'];
    }

    $conn=mysql_connect(constant("DB_HOST"),constant("DB_USER"),constant("DB_PASSWORD")); //杩炴帴鏁版嵁搴�
    
    if (!$conn) 
    { 
      echo "数据库连接出错 " . mysql_error(); 
      return;
    }
    
 
    mysql_query("set names 'utf8'"); //鏁版嵁搴撹緭鍑虹紪鐮�
 
    mysql_select_db(constant("DB_NAME"),$conn); //鎵撳紑鏁版嵁搴�
	 
    $sql = "select goods_id,keyword,imag_url from multi_data where id=".$id;
     
	
	
    $result = mysql_query($sql,$conn);
    
	if($row = mysql_fetch_array($result))
    {
		echo "<header><h1 style='font-size:2rem;'></h1></header><div class='ct'>";
		if($num==""){
		    echo "<a href='murl.php?id=".$id."' target='_blank'><img src='".$row['imag_url']."' alt='' style='width: 80%;margin-left: 10%;'></a>";
		}else{
		    echo "<a href='murl.php?id=".$id."&num=".$num."' target='_blank'><img src='".$row['imag_url']."' alt='' style='width: 80%;margin-left: 10%;'></a>";
		}
		
		echo "<p style='font-size:1.5rem;'>请点击上面的图片</p>";
		
     //echo "gogo('http://s.m.taobao.com/h5?q=".$row['keyword']."&nid=".$row['goods_id']."')";
    }
	
    mysql_close($conn); //鍏抽棴MySQL杩炴帴
	
?>
 </div>

</article>
    
<footer class="amz-footer" style="text-align: center;position:fixed;bottom:0;width:100%;font-size:1rem;">
	<p style="margin-top:0.2rem;margin-bottom:0.3rem;">
此网页由 <a href="http://www.yshizi.cn/">流量穿山甲</a>  创建
</p>

</footer>
</body>

</body>
</html>
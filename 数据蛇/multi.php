<?php header('Content-Type:text/html; charset=utf-8'); ?>
<?php include_once("ds-config.php") ?>
<?php

if($_POST )
{
	$conn=mysql_connect(constant("DB_HOST"),constant("DB_USER"),constant("DB_PASSWORD")); //连接数据库
    
    if (!$conn) 
    { 
      echo "数据库连接失败: " . mysql_error(); 
      return;
    }
    
 
    mysql_query("set names 'utf8'"); //数据库输出编码
 
    mysql_select_db(constant("DB_NAME"),$conn); //打开数据库
	
	
	$link=$_POST["link"];
	
	preg_match("/id=(?<right>.*)&/", $link, $matches);
	
	
	$tem = $matches["right"];
	$index = strpos($tem,"&");
	
	if(!$index){
		$good_id=$tem;
		
	}else{
		
		$good_id=substr($tem,0,$index);
		
	}
	
    $keywords=$_POST["keywords"];
	$imag_url = $_POST["img_url"];
     
	 if($imag_url==""){
		 $imag_url="http://yshizi.cn/taobao.jpg";
	 }
    $sql = "insert into multi_data(goods_id,keyword,imag_url) values('".$good_id."','".$keywords."','".$imag_url."')";
 
	 if(!mysql_query($sql,$conn)){
		echo "添加数据失败：".mysql_error();
	 } else {
		echo "<p>随机链接(随机显示关键字)</p><p class='am-text-danger'>".constant("RootUrl")."/mwx.php?id=".mysql_insert_id()."</p>";
	}
 
    mysql_close($conn); //关闭MySQL连接
	

} 
?>

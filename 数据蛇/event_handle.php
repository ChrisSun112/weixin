<?php

define('DB_NAME', 'bdm256312168_db');

/** MySQL数据库用户名 */
define('DB_USER', 'bdm256312168');

/** MySQL数据库密码 */
define('DB_PASSWORD', 'china881108');

/** MySQL主机 */
define('DB_HOST', 'bdm256312168.my3w.com:3306');

 class eventHandle{
	 
	 public function subscribe($fromUsername, $toUsername){
		 
          
         
		 $textTpl = "<xml>
						<ToUserName><![CDATA[%s]]></ToUserName>
						<FromUserName><![CDATA[%s]]></FromUserName>
						<CreateTime>%s</CreateTime>
						<MsgType><![CDATA[%s]]></MsgType>
						<Content><![CDATA[%s]]></Content>
						<FuncFlag>0</FuncFlag>
					</xml>";  
		$msgType = "text";
		$contentStr = "感谢您关注都昌本地宝";
		$time = time();
		$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);	
		echo $resultStr;
		
		//订阅后将用户openid插入数据库
		 $conn=mysql_connect(constant("DB_HOST"),constant("DB_USER"),constant("DB_PASSWORD")); //连接数据库
    
    if (!$conn) 
    { 
      echo "数据库连接失败: " . mysql_error(); 
      return;
    }
    
 
    mysql_query("set names 'utf8'"); //数据库输出编码
 
    mysql_select_db(constant("DB_NAME"),$conn); //打开数据库
    
    $sql = "select count(id) from wx_user where openid='".$fromUsername."'";
     
	
    $result = mysql_query($sql,$conn);
    
    error_log(mysql_result($result,0),   3,   "errors.log"); 
    
	if(mysql_result($result,0)>0)
    {
       $sql = "update wx_user set status=0 where openid='".$fromUsername."'";
	   
     }else{
		 $sql = "insert into wx_user(openid,createtime,status) values('".$fromUsername."',NOW(),0)";
	 }
	
	mysql_query($sql,$conn);
	
    mysql_close($conn); //关闭MySQL连接
		
	 }
     
      public function unsubscribe($fromUsername){
		
			//取消订阅后 设置status为1
		 $conn=mysql_connect(constant("DB_HOST"),constant("DB_USER"),constant("DB_PASSWORD")); //连接数据库
    
		if (!$conn) 
		{ 
			echo "数据库连接失败: " . mysql_error(); 
			return;
		}
    
		mysql_query("set names 'utf8'"); //数据库输出编码
 
		mysql_select_db(constant("DB_NAME"),$conn); //打开数据库
    
		$sql = "select count(id) from wx_user where openid='".$fromUsername."'";
    
		$result = mysql_query($sql,$conn);
    
		if(mysql_result($result,0)>0)
		{
			$sql = "update wx_user set status=1 where openid='".$fromUsername."'";
	   
		}else{
			$sql = "insert into wx_user(openid,createtime,status) values('".$fromUsername."',NOW(),1)";
	 }
	
		mysql_query($sql,$conn);
	
		mysql_close($conn); //关闭MySQL连接
	 }
 } 

?>
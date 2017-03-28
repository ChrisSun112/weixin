<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!-- saved from url=(0040)http://www.dsyy.vip/url/url.php?id=t1507 -->
<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title></title>
<script src="ajax.js" type="text/JavaScript"></script> 
<script type="text/javascript" src="ajax_url.js"></script>

<script language="javascript">

 var strurl="";
 var urlurl="";
 var intervalId;
 var tempStr = [];
 tempStr[0]="s.m.taobao.com/h5?";
 tempStr[1]="detail.m.tmall.com";
 tempStr[2]="m.taobao.com";
 
function gogo(url)
{



var bool1 = url.indexOf("s.m.taobao.com/h5?");

var bool2 = url.indexOf("h5.m.taobao.com/awp");



  if(IsURL(url))
  {
	  //alert("1");
	  var urls = url.split('://');
	  
	   for(i=0;i<urls.length;i++)
	   {
		   if(i!=0)
		   {
			  strurl=urls[i]+strurl; 
		   }
	   }
	   
   if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))
			  {
			   window.location.href = "taobao://"+strurl;
			   window.setTimeout(function() {
				   window.location.href = url;
			   }, 3000)
			  }
		   if(navigator.userAgent.match(/android/i))
		   {
			   window.location.href = "taobao://"+strurl;
			   window.setTimeout(function() {
				   window.location.href = url;
			   }, 3000)    
		   }else {
			   alert("请在手机端打开此网页");
		   }
  
  
  }
  else
  {
  
	  window.location.href=url;
	   
  }

}


function IsURL (str_url) { 
var bool=0;

  for(i=0;i<tempStr.length;i++)
  {
	  //alert(str_url.indexOf(tempStr[i]));
	  if(str_url.indexOf(tempStr[i])>0)
	  {
		  bool=1;
		  break;
	  }
  }
  
  if(bool==1)
  {
  return true;
  }
  else
  {
	   return false;
  }

} 


</script>


</head>

<body>




<script language="javascript">
<?php include_once("ds-config.php") ?>
<?php
    $id=$_GET['id'];
    
    $num="";
    if(isset($_GET['num'])){
        $num=$_GET['num'];
    }

	 $conn=mysql_connect(constant("DB_HOST"),constant("DB_USER"),constant("DB_PASSWORD")); //连接数据库
    
    if (!$conn) 
    { 
      echo "数据库连接失败: " . mysql_error(); 
      return;
    }
    
 
    mysql_query("set names 'utf8'"); //数据库输出编码
 
    mysql_select_db(constant("DB_NAME"),$conn); //打开数据库
    
    $sql = "select goods_id,keyword from multi_data where id=".$id;
     
	
    $result = mysql_query($sql,$conn);
    
    
    
	if($row = mysql_fetch_array($result))
    {
        if($num!=""){
            $keywords = explode('|',$row['keyword']);
            echo "gogo('http://s.m.taobao.com/h5?q=".$keywords[(int)$num]."&nid_up=".$row['goods_id']."')";
        }else{
            $keywords = explode('|',$row['keyword']);
            echo "gogo('http://s.m.taobao.com/h5?q=".$keywords[rand(0,count($keywords)-1)]."&nid_up=".$row['goods_id']."')";
        }
     }
	
    mysql_close($conn); //关闭MySQL连接
	
?>

</script></body></html>

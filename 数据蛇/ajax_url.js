var ajaxurl=new AJAXRequest();
function lo_url(url) {	
	ajaxurl.get(
              "go_url.php?url="+url,
              function(obj) {gogo(obj.responseText);});
}


var ajaxurl2=new AJAXRequest();
function lo_url2(url) {	
	ajaxurl2.get("go_url2.php?url="+url);
}
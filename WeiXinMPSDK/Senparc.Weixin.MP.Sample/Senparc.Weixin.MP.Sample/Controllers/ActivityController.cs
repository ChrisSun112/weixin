using Senparc.Weixin.HttpUtility;
using Senparc.Weixin.MP.Entities.JsonResult;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Senparc.Weixin.MP.Sample.Controllers
{
    public class ActivityController : Controller
    {
        //
        // GET: /Activity/

        public ActionResult Share(string code)
        {
            string url = string.Format("https://api.weixin.qq.com/sns/oauth2/access_token?appid={0}&secret={1}&code={2}&grant_type=authorization_code ", ConfigurationManager.AppSettings["WeixinAppId"], ConfigurationManager.AppSettings["WeixinAppSecret"], code);

            //获取openid
            var openidResult = Get.GetJson<GetOpenidResult>(url);


            return this.Redirect("Contact/List?openid=" + openidResult.openid);
            
        }

    }
}

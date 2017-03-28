using Senparc.Weixin.HttpUtility;
using Senparc.Weixin.MP.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace rxyt.weixin.data
{
    public class WeixinApi
    {
        /// <summary>
        /// 用户信息接口
        /// </summary>
        /// <param name="accessTokenOrAppId"></param>
        /// <param name="openId"></param>
        /// <returns></returns>
        public static WeixinUserInfoResult GetUserInfo(string accessToken, string openId)
        {
                   
            var url = string.Format("http://api.weixin.qq.com/cgi-bin/user/info?access_token={0}&openid={1}",
                                        accessToken.AsUrlData(), openId.AsUrlData());
            WeixinUserInfoResult result = Get.GetJson<WeixinUserInfoResult>(url);
            return result;

            
        }
    }
}

using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using rxyt.weixin.data;
using System.Configuration;

namespace Senparc.Weixin.MP.Sample.Tests.Controllers
{
    [TestClass]
    public class AccessTokenHelperTest
    {
        [TestMethod]
        public void GetAccessTokenTest()
        {
            string appid = ConfigurationManager.AppSettings["WeixinAppId"];
            string secret = ConfigurationManager.AppSettings["WeixinAppSecret"];
            string access_token = AccessTokenHelper.GetTokenForSqlServer(appid, secret);

            Assert.IsNotNull(access_token);
        }
    }
}

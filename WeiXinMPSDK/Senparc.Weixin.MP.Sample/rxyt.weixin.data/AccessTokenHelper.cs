using Senparc.Weixin.HttpUtility;
using Senparc.Weixin.MP.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace rxyt.weixin.data
{
    public class AccessTokenHelper
    {

        /// <summary>
        /// 获取凭证接口
        /// </summary>
        /// <param name="grant_type">获取access_token填写client_credential</param>
        /// <param name="appid">第三方用户唯一凭证</param>
        /// <param name="secret">第三方用户唯一凭证密钥，既appsecret</param>
        /// <returns></returns>
        private static AccessTokenResult GetToken(string appid, string secret, string grant_type = "client_credential")
        {
            //注意：此方法不能再使用ApiHandlerWapper.TryCommonApi()，否则会循环
            var url = string.Format("https://api.weixin.qq.com/cgi-bin/token?grant_type={0}&appid={1}&secret={2}",
                                    grant_type.AsUrlData(), appid.AsUrlData(), secret.AsUrlData());

            AccessTokenResult result = Get.GetJson<AccessTokenResult>(url);
            return result;
        }

        private static bool UpdateAccessToken(string appid,AccessTokenResult accessToken)
        {

            string sqlStr = "update wx_AccessToken set accessToken=@accessToken,createtime=@createtime where appid=@appid";

            SqlParameter[] parameters = { new SqlParameter("@accessToken", accessToken.access_token), new SqlParameter("@createtime", DateTime.Now.AddSeconds(accessToken.expires_in-60000)), new SqlParameter("@appid", appid) };

            if (SQLServerHepler.ExecuteNonQuery(SQLServerHepler.GetConnectionStringByConfig(), System.Data.CommandType.Text, sqlStr, parameters) > 0)
            {
                return true;
            }
            else
            {
                return false;
            }            

        }

        private static bool InsertAccessToken(string appid, AccessTokenResult accessToken)
        {
            string sqlStr = "insert into [wx_AccessToken]([appid] ,[accessToken] ,[createtime] ) VALUES(@appid,@accessToken,@createtime) ";

            SqlParameter[] parameters = { new SqlParameter("@appid", appid),new SqlParameter("@accessToken", accessToken.access_token), new SqlParameter("@createtime", DateTime.Now.AddSeconds(accessToken.expires_in - 60)) };

            if (SQLServerHepler.ExecuteNonQuery(SQLServerHepler.GetConnectionStringByConfig(), System.Data.CommandType.Text, sqlStr, parameters) > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }


        public static string GetTokenForSqlServer(string appid,string secret)
        {
            string sqlStr = "select top 1 accessToken,createtime from wx_AccessToken where appid=appid";

            SqlParameter[] parameters = { new SqlParameter("appid", appid) };

            
            string access_token = string.Empty;
            DateTime? expireDateTime = null;

            using(SqlDataReader reader =SQLServerHepler.ExecuteReader(SQLServerHepler.GetConnectionStringByConfig(), System.Data.CommandType.Text, sqlStr, parameters)){

                while(reader.Read()){
                    access_token = reader.GetString(0);
                    expireDateTime = reader.GetDateTime(1);
                }
            }
            //数据库中不存在accessToken 
            if(string.IsNullOrEmpty(access_token)){
                
                AccessTokenResult result = GetToken(appid,secret);

                InsertAccessToken(appid,result);

                return result.access_token;

            }else if(expireDateTime<DateTime.Now){ //accessToken已过期

                AccessTokenResult result = GetToken(appid,secret);

                UpdateAccessToken(appid,result);

                return result.access_token;
            }else{
                return access_token;
            }    
            
        }
    }
}

using rxyt.weixin.data;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Senparc.Weixin.MP.Sample.Controllers
{
    public class BookingController : Controller
    {
        [HttpPost]
        public ActionResult Add(string username, string mobile)
        {
            string sqlStr = "insert into [wx_bookinguser]([username] ,[mobile]  ) VALUES(@username,@mobile) ";

            SqlParameter[] parameters = { new SqlParameter("@username", username), new SqlParameter("@mobile", mobile) };

            if (SQLServerHepler.ExecuteNonQuery(SQLServerHepler.GetConnectionStringByConfig(), System.Data.CommandType.Text, sqlStr, parameters) > 0)
            {
                return Json(new { status = 1 });
            }
            else
            {
                return Json(new { status = 0 });
            }

            
        }

    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senparc.Weixin.MP.Entities.JsonResult
{
     [Serializable]
    public class GetOpenidResult
    {
         public string access_token { get; set; }

         public int expires_in { get; set; }

         public string refresh_token { get; set; }

         public string openid { get; set; }

         public string scope { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using System.Net;
using System.Net.Http;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace MVCColoringBook.Controllers
{
   public class HomeController : Controller
   {
      public IActionResult Index()
      {
         return View();
      }

      public JsonResult UploadImage(string urlString)
      {
         string error = "";
         if (urlString == null)
         {
            error = "Url is Null";
            return Json(new { success = false, error });
         }

         try
         {
            string result = System.IO.Path.GetFileName(urlString);
            string directory = System.IO.Directory.GetCurrentDirectory();
            using (var client = new WebClient())
            {
               byte[] buffer = client.DownloadData(urlString);
               System.IO.File.WriteAllBytes(directory + @"\images\" + result, buffer);
            }

            return Json(new { success = true, result });
         }
         catch (Exception ex)
         {
            error = ex.Message;
            return Json(new { success = false, error });
         }
      }

      public IActionResult Error()
      {
         return View();
      }
   }
}

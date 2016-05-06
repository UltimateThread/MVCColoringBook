using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using System.Net;
using System.Net.Http;
using System.IO;
using Microsoft.Extensions.Configuration;
using System.Drawing;
using System.Drawing.Imaging;
using System.Text;

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
         string extension = "";
         var gif = Encoding.ASCII.GetBytes("GIF");
         var png = new byte[] { 137, 80, 78, 71 };
         var jpeg = new byte[] { 255, 216, 255, 224 };
         var jpeg2 = new byte[] { 255, 216, 255, 225 };

         // Ensure the URL passed in has content
         if (urlString == null)
         {
            error = "Url is Null";
            return Json(new { success = false, error });
         }

         try
         {
            // Get the image file name from the URL
            string fileName = System.IO.Path.GetFileName(urlString);
            // Get the directory the images will be stored in
            string directory = System.IO.Directory.GetCurrentDirectory();

            using (var client = new WebClient())
            {
               // Get the image buffer from the URL
               byte[] buffer = client.DownloadData(urlString);

               // If the URL does not contain a file extension, get the image type
               if (jpeg.SequenceEqual(buffer.Take(jpeg.Length)))
                  extension = ".jpeg";
               else if (jpeg2.SequenceEqual(buffer.Take(jpeg2.Length)))
                  extension = ".jpeg";
               else if (gif.SequenceEqual(buffer.Take(gif.Length)))
                  extension = ".gif";
               else if (png.SequenceEqual(buffer.Take(png.Length)))
                  extension = ".png";
               else
               {
                  // Error out if the image type that was passed in is not supported
                  error = "Image Format Not Supported";
                  return Json(new { success = false, error });
               }

               // Add the extension to the end of the file name if it does not already exist
               if (!Path.HasExtension(fileName))
                  fileName = fileName + extension;

               // Write the image file to disk to avoid CORS issues
               System.IO.File.WriteAllBytes(directory + @"\images\ColoringPages\" + fileName, buffer);
            }

            // Return the file name to the client so that it knows which image to load
            return Json(new { success = true, fileName });
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

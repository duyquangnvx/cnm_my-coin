using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Simple_Caro
{
    class ImageSearch
    {
        [DllImport("User32.dll", SetLastError = true)]
        [return: MarshalAs(UnmanagedType.Bool)]
        static extern bool PrintWindow(IntPtr hwnd, IntPtr hDC, uint nFlags);

        [DllImport("user32.dll")]
        static extern bool GetWindowRect(IntPtr handle, ref Rectangle rect);

        [DllImport("user32.dll", SetLastError = true)]

        public static extern IntPtr FindWindow(string lpClassName, string lpWindowName);
        static public string CaptureWindow(IntPtr handle)
        {
            string path = System.IO.Path.GetTempPath();


            // Get the size of the window to capture
            Rectangle rect = new Rectangle();
            GetWindowRect(handle, ref rect);

            // GetWindowRect returns Top/Left and Bottom/Right, so fix it
            rect.Width = rect.Width - rect.X;
            rect.Height = rect.Height - rect.Y;

            // Create a bitmap to draw the capture into
            using (Bitmap bitmap = new Bitmap(rect.Width, rect.Height))
            {
                // Use PrintWindow to draw the window into our bitmap
                using (Graphics g = Graphics.FromImage(bitmap))
                {
                    IntPtr hdc = g.GetHdc();
                    if (!PrintWindow(handle, hdc, 0))
                    {
                        int error = Marshal.GetLastWin32Error();
                        var exception = new System.ComponentModel.Win32Exception(error);
                        Debug.WriteLine("ERROR: " + error + ": " + exception.Message);
                        // TODO: Throw the exception?
                    }
                    g.ReleaseHdc(hdc);
                }
                //return bitmap;
                // Save it as a .png just to demo this
                bitmap.Save(path + "a.png");
                Console.WriteLine("Capture Window path: " + path + "a.png");
            }
            return path + "a.png";
        }


        public static Point Search(string windowTitle, string imgTargetPath, double accuracy = 0.9, bool isTest = false)
        {
            Point point = new Point();
            IntPtr hwnd = FindWindow(null, windowTitle);//, "YouTube - Google Chrome");
            string imgSource = CaptureWindow(hwnd);
            string imgSearch = imgTargetPath;// Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + @"\a.png";//inputImageTargetPath.Text;

            Image<Bgr, byte> source = new Image<Bgr, byte>(imgSource); // Image B
            Image<Bgr, byte> template = new Image<Bgr, byte>(imgSearch); // Image A
            Image<Bgr, byte> imageToShow = source.Copy();

            using (Image<Gray, float> result = source.MatchTemplate(template, Emgu.CV.CvEnum.TemplateMatchingType.CcoeffNormed))

            {
                double[] minValues, maxValues;
                Point[] minLocations, maxLocations;
                result.MinMax(out minValues, out maxValues, out minLocations, out maxLocations);

                if (isTest)
                {
                    // This is a match. Do something with it, for example draw a rectangle around it.
                    Rectangle match = new Rectangle(maxLocations[0], template.Size);
                    imageToShow.Draw(match, new Bgr(Color.Red), 3);

                    // Show imageToShow in an ImageBox (here assumed to be called imageBox1)
                    Bitmap bitmap = imageToShow.ToBitmap();
                    bitmap.Save(Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + @"\Detected.png");
                }

                // accuracy: You can try different values of the threshold. I guess somewhere between 0.75 and 0.95 would be good.
                if (maxValues[0] > accuracy)
                {


                    //result.X = minLocations[0].X+template.Size.
                    return maxLocations[0];
                }
                else
                {
                    throw new ApplicationException("Not found!");
                }
            }
        }
    }
}

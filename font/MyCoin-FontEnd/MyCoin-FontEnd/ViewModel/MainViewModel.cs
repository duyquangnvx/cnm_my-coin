using Simple_Caro.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace MyCoin_FontEnd.ViewModel
{
    public class MainViewModel : BaseViewModel
    {
        public ICommand ConnectSocketServer { get; set; }

        public MainViewModel()
        {
            Connector.Init();
            Connector.Instance.Connect();


        }
    }
}

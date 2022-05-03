using MyCoin_FontEnd.SocketClient;
using SocketIOClient;
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
            SocketClient.SocketClient.Connector.Connect();
            SocketClient.SocketClient.Connector.OnReceived += OnReceived;

            InitCommands();
        }

        private void InitCommands()
        {
            ConnectSocketServer = new RelayCommand<object>(
                (p) =>
                {
                    return true;
                },
                (p) =>
                {
                    var packet = new OutPacket(SocketClient.SocketClient.EventName.CREATE_NEW_WALLET);
                    SocketClient.SocketClient.Connector.SendPacket(packet);
                }
            );
        }

        private void OnReceived(string eventName, SocketIOResponse response)
        {
            switch (eventName)
            {
                case SocketClient.SocketClient.EventName.CREATE_NEW_WALLET:
                    ProcessCreateWallet(response);
                    break;
            }
        }

        private void ProcessCreateWallet(SocketIOResponse response)
        {
            var packet = new InPacket(response);
            var data = packet.Data;
        }
    }
}

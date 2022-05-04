using MyCoin_FontEnd.SocketClient;
using MyCoin_FontEnd.ViewModel;
using SocketIOClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace MyCoin_FontEnd.ViewModel
{
    public class LoginViewModel : BaseViewModel
    {
        #region Private members
        private string _privateKey = String.Empty;
        private string _password = String.Empty;

        private CreateWalletSuccessWindow guiCreateWalletSuccess;
        private InputPrivateKeyWindow guiInputPrivateKey;
        #endregion

        #region Properties
        public string PrivateKey { get => _privateKey; set { _privateKey = value; OnPropertyChanged(); } }

        #endregion

        #region Commands
        public ICommand CreateWalletCmd { get; set; }
        public ICommand InputPrivateKeyCmd { get; set; }
        public ICommand AccessWalletCmd { get; set; }
        public ICommand CopyPrivateKeyCmd { get; set; }
        #endregion
        public LoginViewModel()
        {
            SocketClient.SocketClient.Connector.Connect();
            SocketClient.SocketClient.Connector.OnReceived += OnReceived;
            InitCommands();
        }

        private void InitCommands()
        {
            CreateWalletCmd = new RelayCommand<object[]>(
                (p) => { return true; },
                (p) =>
                {
                    var packet = new OutPacket(SocketClient.SocketClient.EventName.CREATE_NEW_WALLET);
                    SocketClient.SocketClient.Connector.SendPacket(packet);
                });

            InputPrivateKeyCmd = new RelayCommand<object>(
                (p) => { return true; },
                (p) =>
                {
                    PrivateKey = "";
                    this.ShowGuiInputPrivateKey();
                });

            AccessWalletCmd = new RelayCommand<object>(
                (p) => { return true; },
                (p) =>
                {
                    
                });

            CopyPrivateKeyCmd = new RelayCommand<object>(
                (p) => { return true; },
                (p) =>
                {
                    Clipboard.SetDataObject(PrivateKey);
                    this.HideGuiCreateWalletSuccessful();
                });
        }

        public void ShowGuiCreateWalletSuccessful()
        {
            if (this.guiCreateWalletSuccess == null)
            {
                this.guiCreateWalletSuccess = new CreateWalletSuccessWindow();
                this.guiCreateWalletSuccess.DataContext = this;
            }

            guiCreateWalletSuccess.ShowDialog();              
        }
        public void HideGuiCreateWalletSuccessful()
        {
            if (this.guiCreateWalletSuccess != null)
            {
                this.guiCreateWalletSuccess.Hide();
            }
        }

        public void ShowGuiInputPrivateKey()
        {
            if (this.guiInputPrivateKey == null)
            {
                this.guiInputPrivateKey = new InputPrivateKeyWindow();
                this.guiInputPrivateKey.DataContext = this;
            }

            guiInputPrivateKey.ShowDialog();
        }
        public void HideGuiInputPrivateKey()
        {
            if (this.guiInputPrivateKey != null)
            {
                this.guiInputPrivateKey.Hide();
            }
        }

        [STAThread]
        private void OnReceived(string eventName, SocketIOResponse response)
        {
            switch (eventName)
            {
                case SocketClient.SocketClient.EventName.CREATE_NEW_WALLET:
                    ProcessCreateWallet(response);
                    break;
                case SocketClient.SocketClient.EventName.ACCESS_MY_WALLET:
                    ProcessAccessWallet(response);
                    break;
            }
        }
        private void ProcessCreateWallet(SocketIOResponse response)
        {
            var packet = new InPacket(response);
            var data = packet.Data;
            Console.WriteLine($"[ProcessCreateWallet] {data}");
            PrivateKey = data.GetProperty("privateKey").ToString();
            this.ShowGuiCreateWalletSuccessful();
        }

        private void ProcessAccessWallet(SocketIOResponse response)
        {
            var packet = new InPacket(response);
            var data = packet.Data;
            Console.WriteLine($"[ProcessAccessWallet] {data}");
            PrivateKey = data.GetProperty("privateKey").ToString();
         
        }
    }
}

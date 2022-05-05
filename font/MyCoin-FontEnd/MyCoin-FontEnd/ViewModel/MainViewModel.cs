﻿using MyCoin_FontEnd.SocketClient;
using MyCoin_FontEnd.UC;
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
        #region Private members
        private string _privateKey = String.Empty;
        private string _publicKey = String.Empty;
        private float _balance = 0f;
        private float _transactionAmount = 0f;
        private string _transactionToAddress = String.Empty;
        private string _transactionPrivateKey = String.Empty;

        public MainWindow MainWindow { get; set; }
        public InputTransactionWindow InputTransactionWindow { get; set; }
        #endregion

        #region Properties
        public UserControl CurrentUC { get; set; }
        public UserControl PreviousUC { get; set; }
        public string PrivateKey { get => _privateKey; set { _privateKey = value; OnPropertyChanged(); } }
        public string PublicKey { get => _publicKey; set { _publicKey = value; OnPropertyChanged(); } }
        public float Balance { get => _balance; set { _balance = value; OnPropertyChanged(); } }
        public string TransactionPrivateKey { get => _transactionPrivateKey; set { _transactionPrivateKey = value; OnPropertyChanged(); } }
        public float TransactionAmount { get => _transactionAmount; set { _transactionAmount = value; OnPropertyChanged(); } }
        public string TransactionToAddress { get => _transactionToAddress; set { _transactionToAddress = value; OnPropertyChanged(); } }
        #endregion

        #region Commands
        public ICommand CloseWindowCommand { get; set; }
        public ICommand BackToPrevScreenCmd { get; set; }
        public ICommand CreateWalletCmd { get; set; }
        public ICommand InputPublicKeyCmd { get; set; }
        public ICommand GetWalletDataCmd { get; set; }
        public ICommand CopyPrivateKeyCmd { get; set; }
        public ICommand InputTransactionCmd { get; set; }
        public ICommand MiningBlockCmd { get; set; }
        public ICommand CreateTransactionCmd { get; set; }
        #endregion

        public MainViewModel()
        {
            SocketClient.SocketClient.Connector.Connect();
            SocketClient.SocketClient.Connector.OnReceived += OnReceived;
            InitCommands();
        }


        private void InitCommands()
        {
            InputTransactionCmd = new RelayCommand<object[]>(
                (p) => { return true; },
                (p) =>
                {
                    var window = new InputTransactionWindow();
                    window.DataContext = this;
                    window.ShowDialog();
                    InputTransactionWindow = window;
                });
            CreateTransactionCmd = new RelayCommand<object[]>(
                (p) => { return TransactionAmount != 0 && !String.IsNullOrEmpty(TransactionPrivateKey) && !String.IsNullOrEmpty(TransactionToAddress); },
                (p) =>
                {
                    Console.WriteLine($"Transaction amount: {TransactionAmount}");
                    Console.WriteLine($"Transaction to address: {TransactionToAddress}");

                    var packet = new OutPacket(SocketClient.SocketClient.EventName.CREATE_TRANSACTION, TransactionPrivateKey, PublicKey, TransactionToAddress, TransactionAmount);
                    SocketClient.SocketClient.Connector.SendPacket(packet);

                    TransactionPrivateKey = String.Empty;
                    TransactionToAddress = String.Empty;
                    TransactionAmount = 0;
               
                    if (this.InputTransactionWindow != null)
                    {
                        this.InputTransactionWindow.Close();
                    }
                });
            MiningBlockCmd = new RelayCommand<object[]>(
                (p) => { return PreviousUC != null; },
                (p) =>
                {
                    
                });
            BackToPrevScreenCmd = new RelayCommand<object[]>(
                (p) => { return PreviousUC != null; },
                (p) =>
                {
                    SwitchScreen(PreviousUC);
                    PreviousUC = null;
                });
            CloseWindowCommand = new RelayCommand<object[]>(
                (p) => { return true; },
                (p) =>
                {
                    
                });

            CreateWalletCmd = new RelayCommand<object[]>(
                (p) => { return true; },
                (p) =>
                {
                    var packet = new OutPacket(SocketClient.SocketClient.EventName.CREATE_NEW_WALLET);
                    SocketClient.SocketClient.Connector.SendPacket(packet);
                });

            InputPublicKeyCmd = new RelayCommand<object>(
                (p) => { return true; },
                (p) =>
                {
                    PrivateKey = "";
                    PublicKey = "";
                    this.ShowGuiInputPublicKey();
                });

            GetWalletDataCmd = new RelayCommand<object>(
                (p) => { return !String.IsNullOrEmpty(PublicKey); },
                (p) =>
                {
                    var packet = new OutPacket(SocketClient.SocketClient.EventName.GET_WALLET_DATA, PublicKey);
                    SocketClient.SocketClient.Connector.SendPacket(packet);
                    this.ShowGuiDashboard();
                });

            CopyPrivateKeyCmd = new RelayCommand<object>(
                (p) => { return true; },
                (p) =>
                {
                    var text = String.Format($"Publib Key: {PublicKey}\nPrivate Key: {PrivateKey}");
                    Clipboard.SetDataObject(text);
                    ShowGuiDashboard();
                });
        }
        internal void SwitchScreen(object sender)
        {
            var screen = (UserControl)sender;

            if (screen != null)
            {
                if (CurrentUC != null)
                {
                    PreviousUC = CurrentUC;
                }
                CurrentUC = screen;
                CurrentUC.DataContext = this;
                OnPropertyChanged(CurrentUC.Name);
            }
        }
 
        public void HideGui(Window gui)
        {
            if (gui != null)
            {
                gui.Hide();
            }
        }
        public void ShowGuiLogin()
        {
            var uc = new LoginUC();
            SwitchScreen(uc);
        }

        public void ShowGuiCreateWalletSuccessful()
        {
            var uc = new CreateWalletSuccessUC();
            SwitchScreen(uc);
        }

        public void ShowGuiInputPublicKey()
        {
            var uc = new InputPublicKeyUC();
            SwitchScreen(uc);
        }

        public void ShowGuiDashboard()
        {
            var uc = new DashboardUC();
            SwitchScreen(uc);
        }

        [STAThread]
        private void OnReceived(string eventName, SocketIOResponse response)
        {
            var packet = new InPacket(response);
            var data = packet.Data;
            switch (eventName)
            {
                case SocketClient.SocketClient.EventName.CONNECT_SUCCESS:
                    ShowGuiLogin();
                    break;
                case SocketClient.SocketClient.EventName.CREATE_NEW_WALLET:
                    PrivateKey = data.GetProperty("privateKey").ToString();
                    PublicKey = data.GetProperty("publicKey").ToString();                  
                    this.ShowGuiCreateWalletSuccessful();
                    break;
                case SocketClient.SocketClient.EventName.GET_WALLET_DATA:
                    Balance = (float)data.GetProperty("balance").GetDecimal();
                    break;
                case SocketClient.SocketClient.EventName.CREATE_TRANSACTION:
                    ProcessCreateTransaction(response);
                    break;
                case SocketClient.SocketClient.EventName.PENDING_TRANSACTIONS:
                    
                    var pendingTransactions = data.GetProperty("pendingTransactions");
                    Console.WriteLine($"pendingTransactions: {pendingTransactions}");
                    break;
            }
        }
        private void ProcessCreateTransaction(SocketIOResponse response)
        {
            var packet = new InPacket(response);
            var data = packet.Data;
            Console.WriteLine($"[ProcessCreateWallet] {data}");
           
        }


    }
}

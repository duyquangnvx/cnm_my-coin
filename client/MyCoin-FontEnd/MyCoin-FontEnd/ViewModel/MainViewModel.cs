using MyCoin_FontEnd.Model;
using MyCoin_FontEnd.SocketClient;
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
        private int numOfNetworkNodes = 0;
        private bool _isMining = false;
        private List<Transaction> pendingTransactions;
        private List<Transaction> transactions;
        private List<Transaction> history;
        private List<Block> blocks;
        public MainWindow MainWindow { get; set; }
        public InputTransactionWindow InputTransactionWindow { get; set; }
        #endregion

        #region Properties
        public int NumOfNetworkNodes { get => numOfNetworkNodes; set { numOfNetworkNodes = value; OnPropertyChanged(); } }
        public List<Transaction> PendingTransactions { get => pendingTransactions; set { pendingTransactions = value; OnPropertyChanged(); } }
        public List<Transaction> Transactions { get => transactions; set { transactions = value; OnPropertyChanged(); } }
        public List<Transaction> History { get => history; set { history = value; OnPropertyChanged(); } }
        public List<Block> Blocks { get => blocks; set { blocks = value; OnPropertyChanged(); } }
        public UserControl CurrentTableUC { get; set; }
        public UserControl CurrentUC { get; set; }
        public UserControl PreviousUC { get; set; }
        public string PrivateKey { get => _privateKey; set { _privateKey = value; OnPropertyChanged(); } }
        public string PublicKey { get => _publicKey; set { _publicKey = value; OnPropertyChanged(); } }
        public float Balance { get => _balance; set { _balance = value; OnPropertyChanged(); } }
        public string TransactionPrivateKey { get => _transactionPrivateKey; set { _transactionPrivateKey = value; OnPropertyChanged(); } }
        public float TransactionAmount { get => _transactionAmount; set { _transactionAmount = value; OnPropertyChanged(); } }
        public string TransactionToAddress { get => _transactionToAddress; set { _transactionToAddress = value; OnPropertyChanged(); } }
        public bool IsMining { get => _isMining; set { _isMining = value; OnPropertyChanged(); } }
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
        public ICommand CopyPublicKeyCmd { get; set; }
        public ICommand LogoutCmd { get; set; }
        public ICommand LoadBlocksCmd { get; set; }
        public ICommand LoadTransactionsCmd { get; set; }
        public ICommand LoadPendingTransactionCmd { get; set; }
        public ICommand LoadHistoryCmd { get; set; }
        #endregion

        public MainViewModel()
        {
            SocketClient.SocketClient.Connector.Connect();
            SocketClient.SocketClient.Connector.OnReceived += OnReceived;
            InitCommands();

            PendingTransactions = new List<Transaction>();
            Transactions = new List<Transaction>();
            History = new List<Transaction>();
            Blocks = new List<Block>();
        }



        private void InitCommands()
        {
            InputTransactionCmd = new RelayCommand<object[]>(
                (p) => { return true; },
                (p) =>
                {
                    var window = new InputTransactionWindow();
                    window.DataContext = this;
                    window.Owner = Application.Current.MainWindow;
                    window.ShowDialog();
                    this.InputTransactionWindow = window;
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
                (p) => { return !IsMining; },
                (p) =>
                {
                    IsMining = true;
                    var packet = new OutPacket(SocketClient.SocketClient.EventName.MINE_BLOCK, PublicKey);
                    SocketClient.SocketClient.Connector.SendPacket(packet);

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
                    SocketClient.SocketClient.Connector.Disconnect();
                    Console.WriteLine("CloseWindowCommand-Disconnect");
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
                    RequestGetWalletData();
                    this.ShowGuiDashboard();
                });

            CopyPrivateKeyCmd = new RelayCommand<object>(
                (p) => { return true; },
                (p) =>
                {
                    var text = String.Format($"Public Key: {PublicKey}\nPrivate Key: {PrivateKey}");
                    Clipboard.SetDataObject(text);
                    ShowGuiDashboard();
                });

            CopyPublicKeyCmd = new RelayCommand<object>(
                (p) => { return true; },
                (p) =>
                {
                    Clipboard.SetDataObject(PublicKey);
                    ShowGuiDashboard();
                });

            LogoutCmd = new RelayCommand<object>(
                (p) => { return true; },
                (p) =>
                {
                    var packet = new OutPacket(SocketClient.SocketClient.EventName.LOGOUT);
                    SocketClient.SocketClient.Connector.SendPacket(packet);
                    ShowGuiLogin();
                });
            LoadPendingTransactionCmd = new RelayCommand<object>(
                (p) => { return true; },
                (p) =>
                {
                    SwitchTable(new TablePendingTransaction());
                });
            LoadBlocksCmd = new RelayCommand<object>(
               (p) => { return true; },
               (p) =>
               {
                   SwitchTable(new TableBlock());
               });
            LoadTransactionsCmd = new RelayCommand<object>(
               (p) => { return true; },
               (p) =>
               {
                   SwitchTable(new TableTransaction());
               });
            LoadHistoryCmd = new RelayCommand<object>(
               (p) => { return true; },
               (p) =>
               {
                   SwitchTable(new TableHistory());
               });
        }

        private void RequestGetWalletData()
        {
            var packet = new OutPacket(SocketClient.SocketClient.EventName.GET_WALLET_DATA, PublicKey);
            SocketClient.SocketClient.Connector.SendPacket(packet);
        }

        internal List<Transaction> UnpackTransactions(System.Text.Json.JsonElement jsonTransactions)
        {
            var tempList = jsonTransactions.EnumerateArray().ToList();
            var transactions = new List<Transaction>();
            for (int i = 0; i < tempList.Count; i++)
            {
                var transaction = new Transaction();
                transaction.TransactionId = tempList[i].GetProperty("transactionId").GetString();
                transaction.Timestamp = tempList[i].GetProperty("timestamp").GetDecimal();
                transaction.Amount = (float)tempList[i].GetProperty("amount").GetDecimal();
                transaction.Sender = tempList[i].GetProperty("sender").GetString();
                transaction.Recipient = tempList[i].GetProperty("recipient").GetString();
                transactions.Add(transaction);
            }
            return transactions;
        }
        internal List<Block> UnpackBlock(System.Text.Json.JsonElement jsonBlock)
        {
            var tempList = jsonBlock.EnumerateArray().ToList();
            var blocks = new List<Block>();
            for (int i = 0; i < tempList.Count; i++)
            {
                var block = new Block();
                block.Index = tempList[i].GetProperty("index").GetInt32();
                block.Timestamp = tempList[i].GetProperty("timestamp").GetDecimal();           
                block.Nonce = tempList[i].GetProperty("nonce").GetInt32();
                block.Hash = tempList[i].GetProperty("hash").GetString();
               
                block.TransactionLength = tempList[i].GetProperty("transactions").GetArrayLength();
                blocks.Add(block);
            }
            return blocks;
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
                    var addressTransactions = data.GetProperty("addressTransactions");
                    History = UnpackTransactions(addressTransactions);

                    var allTransaction = data.GetProperty("allTransaction");
                    Transactions = UnpackTransactions(allTransaction);

                    var blocks = data.GetProperty("blocks");
                    Blocks = UnpackBlock(blocks);
                    break;
                case SocketClient.SocketClient.EventName.MINE_BLOCK:
                    IsMining = false;
                    var reward = data.GetProperty("reward").GetDecimal();
                    MessageBox.Show($"You get {reward} coin reward", "Mining Success");
                    break;
                case SocketClient.SocketClient.EventName.CREATE_TRANSACTION:
                    ProcessCreateTransaction(response);
                    break;
                case SocketClient.SocketClient.EventName.PENDING_TRANSACTIONS:
                    var pendingTransactions = data.GetProperty("pendingTransactions");
                    Console.WriteLine($"pendingTransactions: {pendingTransactions}");

                    PendingTransactions = UnpackTransactions(pendingTransactions);

                    RequestGetWalletData();
                    break;
                case SocketClient.SocketClient.EventName.NUM_OF_NETWORK_NODE:
                    NumOfNetworkNodes = data.GetProperty("numOfNetworkNodes").GetInt32();
                    break;
            }
        }
        private void ProcessCreateTransaction(SocketIOResponse response)
        {
            var packet = new InPacket(response);
            var data = packet.Data;
            Console.WriteLine($"[ProcessCreateWallet] {data}");
           
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


        internal void SwitchTable(object sender)
        {
            var screen = (UserControl)sender;

            if (screen != null)
            {
                CurrentTableUC = screen;
                CurrentTableUC.DataContext = this;
                OnPropertyChanged(CurrentTableUC.Name);
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
            PreviousUC = null;
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
            PreviousUC = null;
        }
    }
}

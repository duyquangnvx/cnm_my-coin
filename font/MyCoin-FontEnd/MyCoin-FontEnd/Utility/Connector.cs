using SocketIOClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace Simple_Caro.Utility
{
    public class Connector
    {
        private static Connector instance = null;
        public static Connector Instance
        {
            get
            {
                return Init();
            }
        }

        public static Connector Init()
        {
            if (instance == null)
            {
                instance = new Connector();
            }
            return instance;
        }

        class ConnectorListener
        {
            public ConnectorListener()
            {

            }

            public void OnFinishConnect(object sender, EventArgs e)
            {

            }
            public void OnDisconnected(object sender, string e)
            {

            }
            public void OnReceived(string eventName, SocketIOResponse response)
            {
                switch (eventName)
                {

                }
            }
            public void OnReceivedPacket()
            {

            }
        }

        private SocketIO socketClient;
        private ConnectorListener connectorListener;
        private Connector()
        {
            socketClient = new SocketIO("http://localhost:3000");
            connectorListener = new ConnectorListener();
            socketClient.OnConnected += connectorListener.OnFinishConnect;
            socketClient.OnDisconnected += connectorListener.OnDisconnected;
            socketClient.OnAny(new OnAnyHandler((eventName, reponse) => connectorListener.OnReceived(eventName, reponse)));
        }
        public SocketIO getNetwork()
        {
            return socketClient;
        }
        public void Connect()
        {
            if (!socketClient.Connected)
            {
                socketClient.ConnectAsync();
            }
        }
        public void Disconnect()
        {
            socketClient.DisconnectAsync();
        }
        public void SendPacket()
        {

        }
    }
}

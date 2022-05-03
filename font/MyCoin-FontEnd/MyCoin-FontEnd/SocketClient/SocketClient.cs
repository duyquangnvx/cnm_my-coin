using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using SocketIOClient;
using SocketIOClient.Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCoin_FontEnd.SocketClient
{
    public static class SocketClient
    {
        public static Connector Connector { get => connector; }
        private static Connector connector;
        static SocketClient()
        {
            connector = new Connector();
        }

        public static class EventName
        {
            public const string CREATE_NEW_WALLET = "CREATE_NEW_WALLET";
        }
    }

    public class Connector
    {
        private SocketIO socketClient;
        public Action<string, SocketIOResponse> OnReceived;
        public Connector()
        {
            var uri = new Uri("http://localhost:3000/");
            socketClient = new SocketIO(uri);
            socketClient.OnConnected += OnFinishConnect;
            socketClient.OnDisconnected += OnDisconnected;
            socketClient.OnAny((eventName, reponse) => OnReceived(eventName, reponse));

            var jsonSerializer = new NewtonsoftJsonSerializer();
            jsonSerializer.OptionsProvider = () => new JsonSerializerSettings
            {
                ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new CamelCaseNamingStrategy()
                }
            };
            socketClient.JsonSerializer = jsonSerializer;

            OnReceived += OnReceivedPacket;
        }
        public SocketIO getNetwork()
        {
            return socketClient;
        }
        public async void Connect()
        {
            if (!socketClient.Connected)
            {
                await socketClient.ConnectAsync();
            }
        }
        public void Disconnect()
        {
            socketClient.DisconnectAsync();
        }
        public void SendPacket(OutPacket packet)
        {
            packet.PackData();
            socketClient.EmitAsync(packet.EventName, packet.Data);
            Console.WriteLine($"Send Packet {packet.EventName}");
        }

        private void OnFinishConnect(object sender, EventArgs e)
        {
            Console.WriteLine("OnFinishConnect");
        }
        private void OnDisconnected(object sender, string e)
        {
            Console.WriteLine($"OnDisconnected {e}");
        }
        public void OnReceivedPacket(string eventName, SocketIOResponse response)
        {
            Console.WriteLine($"OnReceivedPacket {eventName}");
        }
    }

    public class OutPacket {
        public string EventName { get; set; }
        public object Data { get; set; }
        public OutPacket(string eventName, params object[] data)
        {
            EventName = eventName;
            Data = data;
        }

        public void PackData()
        {

        }
    }

    public class InPacket
    {
        public System.Text.Json.JsonElement Data { get; private set; }
        public InPacket(SocketIOResponse response)
        {
            UnpackData(response);
        }
        private void UnpackData(SocketIOResponse response)
        {
            Data = new System.Text.Json.JsonElement();
            if (response.Count > 0)
            {
                Data = response.GetValue();
            }
        }  
    }
}

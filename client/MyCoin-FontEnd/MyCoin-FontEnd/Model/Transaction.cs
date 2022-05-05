using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCoin_FontEnd.Model
{
    public class Transaction
    {
        public string TransactionId { get; set; }
        public float Amount { get; set; }
        public Decimal Timestamp { get; set; }
        public string Sender { get; set; }
        public string Recipient { get; set; }
    }
}

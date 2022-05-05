using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCoin_FontEnd.Model
{
    public class Block
    {
        public int Index { get; set; }
        public Decimal Timestamp { get; set; }
        public int TransactionLength { get; set; }
        public int Nonce { get; set; }
        public string Hash { get; set; }
    }
}

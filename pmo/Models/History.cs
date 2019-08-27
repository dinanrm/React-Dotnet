using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace pmo.Models
{
    public partial class History
    {
        public History()
        {
            HistoryModifiedDate = DateTime.Now;
        }

        public int HistoryId { get; set; }
        public int? ProjectId { get; set; }
        public int? UserId { get; set; }
        public DateTime HistoryModifiedDate { get; set; }
        public int StatusBefore { get; set; }
        public int StatusAfter { get; set; }
        public string Comment { get; set; }

        [JsonIgnore]
        public virtual Project Project { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }
    }
}

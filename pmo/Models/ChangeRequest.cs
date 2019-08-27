using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace pmo.Models
{
    public class ChangeRequest
    {
        public ChangeRequest()
        {
            ChangeRequestData = new HashSet<ChangeRequestData>();

            CRCreatedDate = DateTime.Now;
            CRModifiedDate = DateTime.Now;
        }

        public int ChangeRequestId { get; set; }
        public int? ProjectId { get; set; }
        public int? UserId { get; set; }
        public string CustomId { get; set; }
        public string ChangeRequestName { get; set; }
        public string Requester { get; set; }

        [DataType(DataType.Date)]
        [JsonConverter(typeof(JsonDateConverter))]
        public DateTime? RaisedDate { get; set; }

        [DataType(DataType.Date)]
        [JsonConverter(typeof(JsonDateConverter))]
        public DateTime? ApprovalReqDate { get; set; }

        [DataType(DataType.Date)]
        [JsonConverter(typeof(JsonDateConverter))]
        public DateTime? ApprovedDate { get; set; }

        public int? Status { get; set; }
        public DateTime CRCreatedDate { get; set; }
        public DateTime CRModifiedDate { get; set; }

        [JsonIgnore]
        public virtual Project Project { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }

        [JsonIgnore]
        public virtual ICollection<ChangeRequestData> ChangeRequestData { get; set; }
    }
}

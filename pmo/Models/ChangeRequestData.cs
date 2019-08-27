using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pmo.Models
{
    public class ChangeRequestData
    {
        public ChangeRequestData()
        {
            CRDataCreatedDate = DateTime.Now;
            CRDataModifiedDate = DateTime.Now;
        }

        public int CRDataId { get; set; }
        public int? ChangeRequestId { get; set; }
        public int? CRCategoryId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CRDataCreatedDate { get; set; }
        public DateTime CRDataModifiedDate { get; set; }

        [JsonIgnore]
        public virtual ChangeRequest ChangeRequest { get; set; }
        [JsonIgnore]
        public virtual ChangeRequestCategory ChangeRequestCategory { get; set; }
    }
}

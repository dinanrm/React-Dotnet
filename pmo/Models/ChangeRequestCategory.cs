using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pmo.Models
{
    public class ChangeRequestCategory
    {
        public ChangeRequestCategory()
        {
            ChangeRequestData = new HashSet<ChangeRequestData>();

            CRCategoryCreatedDate = DateTime.Now;
            CRCategoryModifiedDate = DateTime.Now;
        }

        public int CRCategoryId { get; set; }
        public string CRCategoryName { get; set; }
        public DateTime CRCategoryCreatedDate { get; set; }
        public DateTime CRCategoryModifiedDate { get; set; }

        [JsonIgnore]
        public virtual ICollection<ChangeRequestData> ChangeRequestData { get; set; }
    }
}

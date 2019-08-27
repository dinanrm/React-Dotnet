using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace pmo.Models
{
    public class Milestone
    {
        public Milestone()
        {
            MilestoneCreatedDate = DateTime.Now;
            MilestoneModifiedDate = DateTime.Now;
        }

        public int MilestoneId { get; set; }
        public int? ProjectId { get; set; }
        public int? ProjectCategoryId { get; set; }
        public string MilestoneDescription { get; set; }
        [DataType(DataType.Date)]
        [JsonConverter(typeof(JsonDateConverter))]
        public DateTime? EstimatedEndTime { get; set; }
        [DataType(DataType.Date)]
        [JsonConverter(typeof(JsonDateConverter))]
        public DateTime? CompletedTime { get; set; }
        public DateTime MilestoneCreatedDate { get; set; }
        public DateTime MilestoneModifiedDate { get; set; }

        [JsonIgnore]
        public virtual Project Project { get; set; }
        [JsonIgnore]
        public virtual ProjectCategory ProjectCategory { get; set; }
    }
}

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace pmo.Models
{
    public partial class Assign
    {
        public Assign()
        {
            AssignCreatedDate = DateTime.Now;
            AssignModifiedDate = DateTime.Now;
        }

        public int AssignId { get; set; }
        public int? UserId { get; set; }
        public int? RoleId { get; set; }
        public int? ProjectId { get; set; }
        public DateTime AssignCreatedDate { get; set; }
        public DateTime AssignModifiedDate { get; set; }

        [JsonIgnore]
        public virtual Project Project { get; set; }
        [JsonIgnore]
        public virtual Role Role { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }
    }
}

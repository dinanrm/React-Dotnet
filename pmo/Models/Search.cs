using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace pmo.Models
{
    public class Search
    {
        // Searching Feature
        public string Keyword { get; set; }
        //Filter Feature
        public int? ProjectCategoryId { get; set; }
        public int? ProjectStatus { get; set; }
        public int? RoleId { get; set; }
        //RangeDate
        [DataType(DataType.Date)]
        [JsonConverter(typeof(JsonDateConverter))]
        public DateTime? StartDate { get; set; }
        [DataType(DataType.Date)]
        [JsonConverter(typeof(JsonDateConverter))]
        public DateTime? EndDate { get; set; }
    }
}

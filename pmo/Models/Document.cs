using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace pmo.Models
{
    public partial class Document
    {
        public Document()
        {
            DocCreatedDate = DateTime.Now;
            DocModifiedDate = DateTime.Now;
        }

        public int DocId { get; set; }
        public int? CategoryId { get; set; }
        public int? LessonLearnedId { get; set; }
        public int? ProjectId { get; set; }
        public string DocName { get; set; }
        public string DocDescription { get; set; }
        public int? DocStatus { get; set; }
        public long? DocSize { get; set; }
        public string DocType { get; set; }
        public byte[] DocStream { get; set; }
        public int? Month { get; set; }
        public DateTime DocCreatedDate { get; set; }
        public DateTime DocModifiedDate { get; set; }

        [JsonIgnore]
        public virtual Category Category { get; set; }
        [JsonIgnore]
        public virtual LessonLearned LessonLearned { get; set; }
        [JsonIgnore]
        public virtual Project Project { get; set; }
    }
}

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pmo.Models
{
    public partial class LessonLearned
    {
        public LessonLearned()
        {
            Document = new HashSet<Document>();
            LessonLearnedCreatedDate = DateTime.Now;
            LessonLearnedModifiedDate = DateTime.Now;
        }

        public int LessonLearnedId { get; set; }
        public int? LLCategoryId { get; set; }
        public int? UserId { get; set; }
        public int? ProjectId { get; set; }
        public int? ProjectCategoryId { get; set; }
        public string Title { get; set; }
        public string Impact { get; set; }
        public string LessonLearnedText { get; set; }
        public string Recommendation { get; set; }
        public DateTime LessonLearnedCreatedDate { get; set; }
        public DateTime LessonLearnedModifiedDate { get; set; }

        [JsonIgnore]
        public virtual LessonLearnedCategory LessonLearnedCategory { get; set; }
        [JsonIgnore]
        public virtual Project Project { get; set; }
        [JsonIgnore]
        public virtual ProjectCategory ProjectCategory { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }

        [JsonIgnore]
        public virtual ICollection<Document> Document { get; set; }
    }
}

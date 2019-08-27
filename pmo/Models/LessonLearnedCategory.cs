using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pmo.Models
{
    public class LessonLearnedCategory
    {
        public LessonLearnedCategory()
        {
            LessonLearned = new HashSet<LessonLearned>();

            LLCategoryCreatedDate = DateTime.Now;
            LLCategoryModifiedDate = DateTime.Now;
        }

        public int LLCategoryId { get; set; }
        public string LLCategoryName { get; set; }
        public DateTime LLCategoryCreatedDate { get; set; }
        public DateTime LLCategoryModifiedDate { get; set; }

        [JsonIgnore]
        public virtual ICollection<LessonLearned> LessonLearned { get; set; }
    }
}

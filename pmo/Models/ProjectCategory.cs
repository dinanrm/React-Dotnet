using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pmo.Models
{
    public class ProjectCategory
    {
        public ProjectCategory()
        {
            ProjectCategoryCreatedDate = DateTime.Now;
            ProjectCategoryModifiedDate = DateTime.Now;
        }

        public int ProjectCategoryId { get; set; }
        public string ProjectCategoryName { get; set; }
        public DateTime ProjectCategoryCreatedDate { get; set; }
        public DateTime ProjectCategoryModifiedDate { get; set; }

        [JsonIgnore]
        public virtual ICollection<LessonLearned> LessonLearned { get; set; }
        [JsonIgnore]
        public virtual ICollection<Milestone> Milestone { get; set; }
    }
}

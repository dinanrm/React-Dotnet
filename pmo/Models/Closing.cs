using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pmo.Models
{
    public class Closing
    {
        public int ProjectId { get; set; }
        public string ProjectDescription { get; set; }
        public string ScopeStatement { get; set; }
        public List<Milestone> Milestone { get; set; }
        public List<LessonLearned> LessonLearned { get; set; }
    }
}

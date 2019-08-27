using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pmo.Models
{
    public class Month
    {
        public MonthlyProject January { get; set; }
        public MonthlyProject February { get; set; }
        public MonthlyProject March { get; set; }
        public MonthlyProject April { get; set; }
        public MonthlyProject May { get; set; }
        public MonthlyProject June { get; set; }
        public MonthlyProject July { get; set; }
        public MonthlyProject August { get; set; }
        public MonthlyProject September { get; set; }
        public MonthlyProject October { get; set; }
        public MonthlyProject November { get; set; }
        public MonthlyProject December { get; set; }
    }

    public class MonthlyProject
    {
        public int Month { get; set; }
        public int InitiatedProject { get; set; }
        public int FinishedProject { get; set; }
    }
}

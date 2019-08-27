using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace pmo.Models
{
    public partial class User
    {
        public User()
        {
            Assign = new HashSet<Assign>();
            ChangeRequest = new HashSet<ChangeRequest>();
            History = new HashSet<History>();
            LessonLearned = new HashSet<LessonLearned>();

            UserCreatedDate = DateTime.Now;
            UserModifiedDate = DateTime.Now;
        }

        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string UserPassword { get; set; }    
        public bool? UserStatus { get; set; }
        public DateTime UserCreatedDate { get; set; }
        public DateTime UserModifiedDate { get; set; }

        [JsonIgnore]
        public virtual ICollection<Assign> Assign { get; set; }
        [JsonIgnore]
        public virtual ICollection<ChangeRequest> ChangeRequest { get; set; }
        [JsonIgnore]
        public virtual ICollection<History> History { get; set; }
        [JsonIgnore]
        public virtual ICollection<LessonLearned> LessonLearned { get; set; }
    }
}

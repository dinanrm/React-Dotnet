using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pmo.Models
{
    public partial class Project
    {
        public Project()
        {
            Assign = new HashSet<Assign>();
            ChangeRequest = new HashSet<ChangeRequest>();
            Document = new HashSet<Document>();
            History = new HashSet<History>();
            LessonLearned = new HashSet<LessonLearned>();
            Milestone = new HashSet<Milestone>();
            ProjectCreatedDate = DateTime.Now;
            ProjectModifiedDate = DateTime.Now;
        }

        public int ProjectId { get; set; }
        public int ProjectStatus { get; set; }
        //Initiating
        public string InitiativeTitle { get; set; }
        [DataType(DataType.Date)]
        [JsonConverter(typeof(JsonDateConverter))]
        public DateTime? PreparedDate { get; set; }
        public string BackgroundInformation { get; set; }
        public string ObjectiveBenefit { get; set; }
        public int LandCompensation { get; set; }
        public int LandImprovement { get; set; }
        public int Building { get; set; }
        public int Infrastructure { get; set; }
        public int PlantMachine { get; set; }
        public int Equipment { get; set; }
        public int ExpenseUnderDevelopment { get; set; }
        public int WorkingCapital { get; set; }
        public int Contingency { get; set; }
        public int Total { get; set; }
        public string Timeline { get; set; }
        public int? RequestedBy { get; set; }
        public int? AcknowledgedBy { get; set; }
        public int? AgreedBy { get; set; }
        public string ExecutiveSummary { get; set; }
        public string ProjectDefinition { get; set; }
        public string Vision { get; set; }
        public string Objective { get; set; }
        //Planning
        public string ProjectManagementPlan { get; set; }
        public string ExecutiveSummaryOfProjectInitiative { get; set; }
        public string Assumption { get; set; }
        public string ChangeControlManagement { get; set; }
        public string ScheduleAndTimeDescription { get; set; }
        //Closing
        public string ProjectDescription { get; set; }
        public string ScopeStatement { get; set; }

        public DateTime ProjectCreatedDate { get; set; }
        public DateTime ProjectModifiedDate { get; set; }

        [NotMapped]
        public int UserId { get; set; }
        [NotMapped]
        public string Comment { get; set; }

        [JsonIgnore]
        public virtual ICollection<Assign> Assign { get; set; }
        [JsonIgnore]
        public virtual ICollection<ChangeRequest> ChangeRequest { get; set; }
        [JsonIgnore]
        public virtual ICollection<Document> Document { get; set; }
        [JsonIgnore]
        public virtual ICollection<History> History { get; set; }
        [JsonIgnore]
        public virtual ICollection<LessonLearned> LessonLearned { get; set; }
        [JsonIgnore]
        public virtual ICollection<Milestone> Milestone { get; set; }
    }

    public class JsonDateConverter : IsoDateTimeConverter
    {
        public JsonDateConverter()
        {
            DateTimeFormat = "yyyy-MM-dd";
        }
    }
}

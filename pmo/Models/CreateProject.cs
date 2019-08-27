using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace pmo.Models
{
    public class CreateProject
    {
        public CreateProject()
        {
            ProjectCreatedDate = DateTime.Now;
            ProjectModifiedDate = DateTime.Now;
            AssignCreatedDate = DateTime.Now;
            AssignModifiedDate = DateTime.Now;
        }

        public int ProjectStatus { get; set; }
        //Initiating
        public string InitiativeTitle { get; set; }
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
        //public int ProjectId { get; set; }
        public string ProjectDescription { get; set; }
        public string ScopeStatement { get; set; }
        public List<Milestone> Milestone { get; set; }
        public List<LessonLearned> LessonLearned { get; set; }

        public DateTime ProjectCreatedDate { get; set; }
        public DateTime ProjectModifiedDate { get; set; }

        public int? UserId { get; set; }
        public int? RoleId { get; set; }
        public int? ProjectId { get; set; }
        public List<Users> Users { get; set; }

        [NotMapped]
        public string Comment { get; set; }

        public DateTime AssignCreatedDate { get; set; }
        public DateTime AssignModifiedDate { get; set; }
    }

    public class Users
    {
        public int RoleId { get; set; }
        public List<int?> UserId { get; set; }
    }
}

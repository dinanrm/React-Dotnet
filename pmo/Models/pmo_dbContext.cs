using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace pmo.Models
{
    public partial class pmo_dbContext : DbContext
    {
        public pmo_dbContext()
        {
        }

        public pmo_dbContext(DbContextOptions<pmo_dbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Assign> Assign { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<ChangeRequest> ChangeRequest { get; set; }
        public virtual DbSet<ChangeRequestCategory> ChangeRequestCategory { get; set; }
        public virtual DbSet<ChangeRequestData> ChangeRequestData { get; set; }
        public virtual DbSet<Document> Document { get; set; }
        public virtual DbSet<History> History { get; set; }
        public virtual DbSet<LessonLearned> LessonLearned { get; set; }
        public virtual DbSet<LessonLearnedCategory> LessonLearnedCategory { get; set; }
        public virtual DbSet<Milestone> Milestone { get; set; }
        public virtual DbSet<Permission> Permission { get; set; }
        public virtual DbSet<Project> Project { get; set; }
        public virtual DbSet<ProjectCategory> ProjectCategory { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<RoleHasPermission> RoleHasPermission { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.2-servicing-10034");

            modelBuilder.Entity<Assign>(entity =>
            {
                entity.ToTable("ASSIGN");

                entity.HasIndex(e => e.ProjectId)
                    .HasName("RELATIONSHIP_1_FK");

                entity.HasIndex(e => e.RoleId)
                    .HasName("RELATIONSHIP_2_FK");

                entity.HasIndex(e => e.UserId)
                    .HasName("RELATIONSHIP_3_FK");

                entity.Property(e => e.AssignId).HasColumnName("ASSIGN_ID");

                entity.Property(e => e.AssignCreatedDate)
                    .HasColumnName("ASSIGN_CREATED_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.AssignModifiedDate)
                    .HasColumnName("ASSIGN_MODIFIED_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.ProjectId).HasColumnName("PROJECT_ID");

                entity.Property(e => e.RoleId).HasColumnName("ROLE_ID");

                entity.Property(e => e.UserId).HasColumnName("USER_ID");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.Assign)
                    .HasForeignKey(d => d.ProjectId)
                    .HasConstraintName("FK_ASSIGN_RELATIONS_PROJECT");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Assign)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK_ASSIGN_RELATIONS_ROLE");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Assign)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_ASSIGN_RELATIONS_USER");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("CATEGORY");

                entity.Property(e => e.CategoryId).HasColumnName("CATEGORY_ID");

                entity.Property(e => e.CategoryName)
                    .HasColumnName("CATEGORY_NAME")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CategoryDescription)
                    .HasColumnName("CATEGORY_DESCRIPTION")
                    .HasColumnType("text");

                entity.Property(e => e.CategoryCreatedDate)
                    .HasColumnName("CATEGORY_CREATED_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.CategoryModifiedDate)
                    .HasColumnName("CATEGORY_MODIFIED_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.FileStream).HasColumnName("FILE_STREAM");
            });

            modelBuilder.Entity<ChangeRequest>(entity =>
            {
                entity.HasKey(e => e.ChangeRequestId);

                entity.ToTable("CHANGE_REQUEST");

                entity.HasIndex(e => e.ProjectId)
                    .HasName("RELATIONSHIP_24_FK");

                entity.HasIndex(e => e.UserId)
                    .HasName("RELATIONSHIP_25_FK");

                entity.Property(e => e.ChangeRequestId).HasColumnName("CHANGE_REQUEST_ID");

                entity.Property(e => e.ProjectId).HasColumnName("PROJECT_ID");

                entity.Property(e => e.UserId).HasColumnName("USER_ID");

                entity.Property(e => e.CustomId)
                    .HasColumnName("CUSTOM_ID")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.ChangeRequestName)
                    .HasColumnName("CHANGE_REQUEST_NAME")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Requester)
                    .HasColumnName("REQUESTER")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.RaisedDate)
                    .HasColumnName("RAISED_DATE")
                    .HasColumnType("date");

                entity.Property(e => e.ApprovalReqDate)
                    .HasColumnName("APPROVAL_REQ_DATE")
                    .HasColumnType("date");

                entity.Property(e => e.ApprovedDate)
                    .HasColumnName("APPROVED_DATE")
                    .HasColumnType("date");

                entity.Property(e => e.Status).HasColumnName("STATUS");

                entity.Property(e => e.CRCreatedDate)
                    .HasColumnName("CR_CREATED_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.CRModifiedDate)
                    .HasColumnName("CR_MODIFIED_DATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.ChangeRequest)
                    .HasForeignKey(d => d.ProjectId)
                    .HasConstraintName("FK_CR_RELATIONS_PROJECT");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ChangeRequest)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_CR_RELATIONS_USER");
            });

            modelBuilder.Entity<ChangeRequestCategory>(entity =>
            {
                entity.HasKey(e => e.CRCategoryId);

                entity.ToTable("CHANGE_REQUEST_CATEGORY");

                entity.Property(e => e.CRCategoryId).HasColumnName("CR_CATEGORY_ID");

                entity.Property(e => e.CRCategoryName)
                    .HasColumnName("CR_CATEGORY_NAME")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CRCategoryCreatedDate)
                    .HasColumnName("CR_CATEGORY_CREATED_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.CRCategoryModifiedDate)
                    .HasColumnName("CR_CATEGORY_MODIFIED_DATE")
                    .HasColumnType("datetime");
            });

            modelBuilder.Entity<ChangeRequestData>(entity =>
            {
                entity.HasKey(e => e.CRDataId);

                entity.ToTable("CHANGE_REQUEST_DATA");

                entity.HasIndex(e => e.ChangeRequestId)
                    .HasName("RELATIONSHIP_26_FK");

                entity.HasIndex(e => e.CRCategoryId)
                    .HasName("RELATIONSHIP_27_FK");

                entity.Property(e => e.CRDataId).HasColumnName("CR_DATA_ID");

                entity.Property(e => e.ChangeRequestId).HasColumnName("CHANGE_REQUEST_ID");

                entity.Property(e => e.CRCategoryId).HasColumnName("CR_CATEGORY_ID");

                entity.Property(e => e.Title).HasColumnName("TITLE");

                entity.Property(e => e.Description).HasColumnName("DESCRIPTION");

                entity.Property(e => e.CRDataCreatedDate)
                    .HasColumnName("CR_DATA_CREATED_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.CRDataModifiedDate)
                    .HasColumnName("CR_DATA_MODIFIED_DATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.ChangeRequest)
                    .WithMany(p => p.ChangeRequestData)
                    .HasForeignKey(d => d.ChangeRequestId)
                    .HasConstraintName("FK_CRDATA_RELATIONS_CR");

                entity.HasOne(d => d.ChangeRequestCategory)
                    .WithMany(p => p.ChangeRequestData)
                    .HasForeignKey(d => d.CRCategoryId)
                    .HasConstraintName("FK_CRDATA_RELATIONS_CRC");
            });

            modelBuilder.Entity<Document>(entity =>
            {
                entity.HasKey(e => e.DocId);

                entity.ToTable("DOCUMENT");

                entity.HasIndex(e => e.CategoryId)
                    .HasName("RELATIONSHIP_15_FK");

                entity.HasIndex(e => e.LessonLearnedId)
                    .HasName("RELATIONSHIP_20_FK");

                entity.HasIndex(e => e.ProjectId)
                    .HasName("RELATIONSHIP_14_FK");

                entity.Property(e => e.DocId).HasColumnName("DOC_ID");

                entity.Property(e => e.DocCreatedDate)
                    .HasColumnName("DOC_CREATED_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.DocDescription)
                    .HasColumnName("DOC_DESCRIPTION")
                    .HasColumnType("text");

                entity.Property(e => e.DocModifiedDate)
                    .HasColumnName("DOC_MODIFIED_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.DocName)
                    .HasColumnName("DOC_NAME")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DocStatus).HasColumnName("DOC_STATUS");

                entity.Property(e => e.DocSize).HasColumnName("DOC_SIZE");

                entity.Property(e => e.DocType)
                    .HasColumnName("DOC_TYPE")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.DocStream).HasColumnName("DOC_STREAM");

                entity.Property(e => e.Month).HasColumnName("MONTH");

                entity.Property(e => e.CategoryId).HasColumnName("CATEGORY_ID");

                entity.Property(e => e.LessonLearnedId).HasColumnName("LESSON_LEARNED_ID");

                entity.Property(e => e.ProjectId).HasColumnName("PROJECT_ID");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Document)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK_DOCUMENT_RELATIONS_CATEGORY");

                entity.HasOne(d => d.LessonLearned)
                    .WithMany(p => p.Document)
                    .HasForeignKey(d => d.LessonLearnedId)
                    .HasConstraintName("FK_DOCUMENT_RELATIONS_LESSON_LEARNED");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.Document)
                    .HasForeignKey(d => d.ProjectId)
                    .HasConstraintName("FK_DOCUMENT_RELATIONS_PROJECT");
            });
            
            modelBuilder.Entity<History>(entity =>
            {
                entity.HasKey(e => e.HistoryId);

                entity.ToTable("HISTORY");

                entity.HasIndex(e => e.ProjectId)
                     .HasName("RELATIONSHIP_17_FK");

                entity.HasIndex(e => e.UserId)
                    .HasName("RELATIONSHIP_18_FK");

                entity.Property(e => e.HistoryId).HasColumnName("HISTORY_ID");

                entity.Property(e => e.ProjectId).HasColumnName("PROJECT_ID");

                entity.Property(e => e.UserId).HasColumnName("USER_ID");

                entity.Property(e => e.HistoryModifiedDate)
                    .HasColumnName("HISTORY_MODIFIED_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.StatusBefore).HasColumnName("STATUS_BEFORE");

                entity.Property(e => e.StatusAfter).HasColumnName("STATUS_AFTER");

                entity.Property(e => e.Comment)
                    .HasColumnName("COMMENT")
                    .HasColumnType("text");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.History)
                    .HasForeignKey(d => d.ProjectId)
                    .HasConstraintName("FK_HISTORY_RELATIONS_PROJECT");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.History)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_HISTORY_RELATIONS_USER");

            });

            modelBuilder.Entity<LessonLearned>(entity =>
            {
                entity.HasKey(e => e.LessonLearnedId);

                entity.ToTable("LESSON_LEARNED");

                entity.HasIndex(e => e.LLCategoryId)
                    .HasName("RELATIONSHIP_21_FK");

                entity.HasIndex(e => e.ProjectId)
                    .HasName("RELATIONSHIP_16_FK");

                entity.HasIndex(e => e.ProjectCategoryId)
                    .HasName("RELATIONSHIP_23_FK");

                entity.HasIndex(e => e.UserId)
                    .HasName("RELATIONSHIP_22_FK");

                entity.Property(e => e.LessonLearnedId).HasColumnName("LESSON_LEARNED_ID");

                entity.Property(e => e.LLCategoryId).HasColumnName("LL_CATEGORY_ID");

                entity.Property(e => e.UserId).HasColumnName("USER_ID");

                entity.Property(e => e.ProjectId).HasColumnName("PROJECT_ID");

                entity.Property(e => e.ProjectCategoryId).HasColumnName("PROJECT_CATEGORY_ID");

                entity.Property(e => e.Title)
                    .HasColumnName("TITLE")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Impact)
                    .HasColumnName("IMPACT")
                    .HasColumnType("text");

                entity.Property(e => e.LessonLearnedText)
                    .HasColumnName("LESSON_LEARNED_TEXT")
                    .HasColumnType("text");

                entity.Property(e => e.Recommendation)
                    .HasColumnName("RECOMMENDATION")
                    .HasColumnType("text");

                entity.Property(e => e.LessonLearnedCreatedDate)
                    .HasColumnName("LL_CREATED_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.LessonLearnedModifiedDate)
                    .HasColumnName("LL_MODIFIED_DATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.LessonLearnedCategory)
                    .WithMany(p => p.LessonLearned)
                    .HasForeignKey(d => d.LLCategoryId)
                    .HasConstraintName("FK_LESSONLEARNED_RELATION_LLCATEGORY");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.LessonLearned)
                    .HasForeignKey(d => d.ProjectId)
                    .HasConstraintName("FK_LESSONLEARNED_RELATIONS_PROJECT");

                entity.HasOne(d => d.ProjectCategory)
                    .WithMany(p => p.LessonLearned)
                    .HasForeignKey(d => d.ProjectCategoryId)
                    .HasConstraintName("FK_LESSONLEARNED_RELATION_PROJECTCATEGORY");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.LessonLearned)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_LESSONLEARNED_RELATION_USER");
            });

            modelBuilder.Entity<LessonLearnedCategory>(entity =>
            {
                entity.HasKey(e => e.LLCategoryId);

                entity.ToTable("LESSON_LEARNED_CATEGORY");

                entity.Property(e => e.LLCategoryId).HasColumnName("LLCATEGORY_ID");

                entity.Property(e => e.LLCategoryName)
                    .HasColumnName("LLCATEGORY_NAME")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.LLCategoryCreatedDate)
                    .HasColumnType("datetime");

                entity.Property(e => e.LLCategoryModifiedDate)
                    .HasColumnType("datetime");
            });

            modelBuilder.Entity<Milestone>(entity =>
            {
                entity.ToTable("MILESTONE");

                entity.HasIndex(e => e.ProjectId)
                     .HasName("RELATIONSHIP_19_FK");

                entity.HasIndex(e => e.ProjectCategoryId)
                    .HasName("RELATIONSHIP_28_FK");

                entity.Property(e => e.MilestoneId).HasColumnName("MILESTONE_ID");

                entity.Property(e => e.ProjectId).HasColumnName("PROJECT_ID");

                entity.Property(e => e.ProjectCategoryId).HasColumnName("PROJECT_CATEGORY_ID");

                entity.Property(e => e.MilestoneDescription)
                .HasColumnName("MILESTONE_DESCRIPTION")
                .HasColumnType("text");

                entity.Property(e => e.EstimatedEndTime)
                .HasColumnName("ESTIMATED_END_TIME")
                .HasColumnType("date");

                entity.Property(e => e.CompletedTime)
                .HasColumnName("COMPLETED_TIME")
                .HasColumnType("date");

                entity.Property(e => e.MilestoneCreatedDate)
                .HasColumnName("MILESTONE_CREATED_DATE")
                .HasColumnType("datetime");

                entity.Property(e => e.MilestoneModifiedDate)
                .HasColumnName("MILESTONE_MODIFIED_DATE")
                .HasColumnType("datetime");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.Milestone)
                    .HasForeignKey(d => d.ProjectId)
                    .HasConstraintName("FK_MILESTONE_RELATIONS_PROJECT");

                entity.HasOne(d => d.ProjectCategory)
                    .WithMany(p => p.Milestone)
                    .HasForeignKey(d => d.ProjectCategoryId)
                    .HasConstraintName("FK_MILESTONE_RELATIONS_PROJECT_CATEGORY");
            });

            modelBuilder.Entity<Permission>(entity =>
            {
                entity.ToTable("PERMISSION");

                entity.Property(e => e.PermissionId).HasColumnName("PERMISSION_ID");

                entity.Property(e => e.PermissionCreatedDate)
                    .HasColumnName("PERMISSION_CREATED_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.PermissionModifiedDate)
                    .HasColumnName("PERMISSION_MODIFIED_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.PermissionName)
                    .HasColumnName("PERMISSION_NAME")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.ToTable("PROJECT");

                entity.Property(e => e.ProjectId).HasColumnName("PROJECT_ID");

                entity.Property(e => e.ProjectStatus).HasColumnName("PROJECT_STATUS");

                entity.Property(e => e.InitiativeTitle)
                    .HasColumnName("INITIATIVE_TITLE")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PreparedDate)
                    .HasColumnName("PREPARED_DATE")
                    .HasColumnType("date");

                entity.Property(e => e.BackgroundInformation)
                    .HasColumnName("BACKGROUND_INFORMATION")
                    .HasColumnType("text");

                entity.Property(e => e.ObjectiveBenefit)
                    .HasColumnName("OBJECTIVE_BENEFIT")
                    .HasColumnType("text");

                entity.Property(e => e.LandCompensation)
                    .HasColumnName("LAND_COMPENSATION");

                entity.Property(e => e.LandImprovement)
                    .HasColumnName("LAND_IMPROVEMENT");

                entity.Property(e => e.Building)
                    .HasColumnName("BUILDING");

                entity.Property(e => e.Infrastructure)
                    .HasColumnName("INFRASTRUCTURE");

                entity.Property(e => e.PlantMachine)
                    .HasColumnName("PLANT_MACHINE");

                entity.Property(e => e.Equipment)
                    .HasColumnName("EQUIPMENT");

                entity.Property(e => e.ExpenseUnderDevelopment)
                    .HasColumnName("EXPENSE_UNDER_DEVELOPMENT");

                entity.Property(e => e.WorkingCapital)
                    .HasColumnName("WORKING_CAPITAL");

                entity.Property(e => e.Contingency)
                    .HasColumnName("CONTINGENCY");

                entity.Property(e => e.Total)
                    .HasColumnName("TOTAL");

                entity.Property(e => e.Timeline)
                    .HasColumnName("TIMELINE")
                    .HasColumnType("text");

                entity.Property(e => e.RequestedBy).HasColumnName("REQUESTED_BY");

                entity.Property(e => e.AcknowledgedBy).HasColumnName("ACKNOWLEDGED_BY");

                entity.Property(e => e.AgreedBy).HasColumnName("AGREED_BY");

                entity.Property(e => e.ExecutiveSummary)
                    .HasColumnName("EXECUTIVE_SUMMARY")
                    .HasColumnType("text");

                entity.Property(e => e.ProjectDefinition)
                    .HasColumnName("PROJECT_DEFINITION")
                    .HasColumnType("text");

                entity.Property(e => e.Vision)
                    .HasColumnName("VISION")
                    .HasColumnType("text");

                entity.Property(e => e.Objective)
                    .HasColumnName("OBJECTIVE")
                    .HasColumnType("text");

                entity.Property(e => e.ProjectManagementPlan)
                    .HasColumnName("PROJECT_MANAGEMENT_PLAN")
                    .HasColumnType("text");

                entity.Property(e => e.ExecutiveSummaryOfProjectInitiative)
                    .HasColumnName("EXECUTIVE_SUMMARY_OF_PROJECT_INITIATIVE")
                    .HasColumnType("text");

                entity.Property(e => e.Assumption)
                    .HasColumnName("ASSUMPTION")
                    .HasColumnType("text");

                entity.Property(e => e.ChangeControlManagement)
                    .HasColumnName("CHANGE_CONTROL_MANAGEMENT")
                    .HasColumnType("text");

                entity.Property(e => e.ScheduleAndTimeDescription)
                    .HasColumnName("SCHEDULE_TIME_DESCRIPTION")
                    .HasColumnType("text");

                entity.Property(e => e.ProjectDescription)
                    .HasColumnName("PROJECT_DESCRIPTION")
                    .HasColumnType("text");

                entity.Property(e => e.ScopeStatement)
                    .HasColumnName("SCOPE_STATEMENT")
                    .HasColumnType("text");

                entity.Property(e => e.ProjectCreatedDate)
                    .HasColumnName("PROJECT_CREATED_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.ProjectModifiedDate)
                    .HasColumnName("PROJECT_MODIFIED_DATE")
                    .HasColumnType("datetime");
            });

            modelBuilder.Entity<ProjectCategory>(entity =>
            {
                entity.ToTable("PROJECT_CATEGORY");

                entity.HasKey(e => e.ProjectCategoryId);

                entity.Property(e => e.ProjectCategoryId).HasColumnName("PROJECT_CATEGORY_ID");

                entity.Property(e => e.ProjectCategoryName)
                    .HasColumnName("PROJECT_CATEGORY_NAME")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ProjectCategoryCreatedDate)
                    .HasColumnName("PROJECT_CATEGORY_CREATED_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.ProjectCategoryModifiedDate)
                    .HasColumnName("PROJECT_CATEGORY_MODIFIED_DATE")
                    .HasColumnType("datetime");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("ROLE");

                entity.Property(e => e.RoleId).HasColumnName("ROLE_ID");

                entity.Property(e => e.RoleName)
                    .HasColumnName("ROLE_NAME")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.RoleCreatedDate)
                    .HasColumnName("ROLE_CREATED_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.RoleModifiedDate)
                    .HasColumnName("ROLE_MODIFIED_DATE")
                    .HasColumnType("datetime");
            });

            modelBuilder.Entity<RoleHasPermission>(entity =>
            {
                entity.HasKey(e => new { e.RhpId, e.RoleId, e.PermissionId });

                entity.ToTable("ROLE_HAS_PERMISSION");

                entity.HasIndex(e => e.PermissionId)
                    .HasName("RELATIONSHIP_5_FK");

                entity.HasIndex(e => e.RoleId)
                    .HasName("RELATIONSHIP_4_FK");

                entity.Property(e => e.RhpId)
                    .HasColumnName("RHP_ID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.RoleId).HasColumnName("ROLE_ID");

                entity.Property(e => e.PermissionId).HasColumnName("PERMISSION_ID");

                entity.Property(e => e.RhpCreatedDate)
                    .HasColumnName("RHP_CREATED_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.RhpModifiedDate)
                    .HasColumnName("RHP_MODIFIED_DATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.Permission)
                    .WithMany(p => p.RoleHasPermission)
                    .HasForeignKey(d => d.PermissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ROLE_HAS_RELATIONS_PERMISSI");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.RoleHasPermission)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ROLE_HAS_RELATIONS_ROLE");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("USER");

                entity.Property(e => e.UserId).HasColumnName("USER_ID");

                entity.Property(e => e.UserCreatedDate)
                    .HasColumnName("USER_CREATED_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.UserEmail)
                    .HasColumnName("USER_EMAIL")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.UserModifiedDate)
                    .HasColumnName("USER_MODIFIED_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.UserName)
                    .HasColumnName("USER_NAME")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.UserPassword)
                    .HasColumnName("USER_PASSWORD")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.UserStatus)
                    .HasColumnName("USER_STATUS")
                    .HasColumnType("bit");
            });
        }
    }
}

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using pmo.Models;

namespace pmo.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class ProjectsController : ControllerBase
    {
        private readonly pmo_dbContext _context;
        private readonly IHostingEnvironment he;

        public ProjectsController(pmo_dbContext context, IHostingEnvironment e)
        {
            _context = context;
            he = e;
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProject()
        {
            var data = await _context.Project.OrderByDescending(a => a.ProjectId).ToListAsync();

            var initiating = await _context.Project
                .Where(p => p.ProjectStatus >= 11 && p.ProjectStatus <= 15)
                .CountAsync();

            var planning = await _context.Project
                .Where(p => p.ProjectStatus >= 21 && p.ProjectStatus <= 24)
                .CountAsync();

            var executing = await _context.Project
                .Where(p => p.ProjectStatus >= 31 && p.ProjectStatus <= 34)
                .CountAsync();

            var closing = await _context.Project
                .Where(p => p.ProjectStatus >= 41 && p.ProjectStatus <= 45)
                .CountAsync();

            var finished = await _context.Project
                .Where(p => p.ProjectStatus == 50)
                .CountAsync();

            var disapproved = await _context.Project
                .Where(p => p.ProjectStatus >= 51 && p.ProjectStatus <= 54)
                .CountAsync();

            var result = new
            {
                total = data.Count(),
                initiating,
                planning,
                executing,
                closing,
                finished,
                disapproved,
                data,
            };

            return Ok(result);
        }

        // GET: api/Projects/Initiating/5
        [HttpGet("{action}/{id}")]
        public async Task<ActionResult<Project>> Initiating (int id)
        {
            var project = await _context.Project
                .Where(p => p.ProjectId == id)
                .Select(p => new
                {
                    p.ProjectId,
                    p.ProjectStatus,
                    p.InitiativeTitle,
                    preparedDate = DateTimeConverter(p.PreparedDate),
                    p.BackgroundInformation,
                    p.ObjectiveBenefit,
                    p.LandCompensation,
                    p.LandImprovement,
                    p.Building,
                    p.Infrastructure,
                    p.PlantMachine,
                    p.Equipment,
                    p.ExpenseUnderDevelopment,
                    p.WorkingCapital,
                    p.Contingency,
                    p.Total,
                    p.Timeline,
                    p.RequestedBy,
                    p.AcknowledgedBy,
                    p.AgreedBy,
                    p.ExecutiveSummary,
                    p.ProjectDefinition,
                    p.Vision,
                    p.Objective,
                    p.ProjectCreatedDate,
                    p.ProjectModifiedDate,
                    p.Assign,
                    document = p.Document
                    .Where(d => d.CategoryId == 1)
                    .ToList(),
                })
                .FirstOrDefaultAsync();

            return Ok(project);
        }

        // GET: api/Projects/Planning/5
        [HttpGet("{action}/{id}")]
        public async Task<ActionResult<Project>> Planning (int id)
        {
            var project = await _context.Project
                .Where(p => p.ProjectId == id)
                .Select(p => new
                {
                    p.ProjectId,
                    p.ProjectStatus,
                    p.InitiativeTitle,
                    preparedDate = DateTimeConverter(p.PreparedDate),
                    p.ProjectManagementPlan,
                    p.ExecutiveSummaryOfProjectInitiative,
                    p.Assumption,
                    p.ChangeControlManagement,
                    p.ScheduleAndTimeDescription,
                    p.ProjectCreatedDate,
                    p.ProjectModifiedDate,
                    p.Assign,
                    document = p.Document
                    .Where(d => d.CategoryId > 20 && d.CategoryId < 30)
                    .ToList(),
                })
                .FirstOrDefaultAsync();

            return Ok(project);
        }

        // GET: api/Projects/Executing/5
        [HttpGet("{action}/{id}")]
        public async Task<ActionResult<Project>> Executing(int id)
        {
            var project = await _context.Project
                .Where(p => p.ProjectId == id)
                .Select(p => new
                {
                    p.ProjectId,
                    p.ProjectStatus,
                    p.InitiativeTitle,
                    preparedDate = DateTimeConverter(p.PreparedDate),
                    p.ProjectCreatedDate,
                    p.ProjectModifiedDate,
                    p.Assign,
                    document = p.Document
                    .Where(d => d.CategoryId == 31)
                    .ToList(),
                    p.ChangeRequest
                })
                .FirstOrDefaultAsync();

            return Ok(project);
        }

        // GET: api/Projects/Closing/5
        [HttpGet("{action}/{id}")]
        public async Task<ActionResult<Project>> Closing(int id)
        {
            var project = await _context.Project
                .Where(p => p.ProjectId == id)
                .Select(p => new
                {
                    p.ProjectId,
                    p.ProjectStatus,
                    p.InitiativeTitle,
                    preparedDate = DateTimeConverter(p.PreparedDate),
                    p.ProjectDescription,
                    p.ScopeStatement,
                    p.ProjectCreatedDate,
                    p.ProjectModifiedDate,

                    assign = p.Assign
                    .Select(a => new
                    {
                        a.Role.RoleId,
                        a.Role.RoleName,
                        a.User.UserId,
                        a.User.UserName
                    })
                    .ToList(),

                    milestone = p.Milestone
                    .Select(m => new
                    {
                        m.MilestoneId,
                        m.ProjectCategoryId,
                        m.MilestoneDescription,
                        estimatedEndTime = DateTimeConverter(m.EstimatedEndTime),
                        completedTime = DateTimeConverter(m.CompletedTime),
                    }),

                    lessonLearned = p.LessonLearned
                    .Where(l => l.ProjectCategoryId == 4)
                    .Select(l => new
                    {
                        l.LessonLearnedId,
                        l.UserId,
                        l.Impact,
                        l.LessonLearnedText,
                        l.Recommendation,
                    }),

                    document = p.Document
                    .Where(d => d.CategoryId == 41)
                    .Select(d => new
                    {
                        d.DocId,
                        d.DocName,
                        d.DocDescription,
                        d.DocStatus,
                        d.DocType,
                        d.DocSize,
                    }),

                    history = p.History
                    .Where(h => h.Project.ProjectStatus > 40 && h.Project.ProjectStatus < 50)
                    .Select(h => new
                    {
                        h.HistoryId,
                        h.UserId,
                        h.StatusBefore,
                        h.StatusAfter,
                        h.Comment,
                        h.HistoryModifiedDate,
                    })
                })
                .FirstOrDefaultAsync();

            return Ok(project);
        }

        // GET: api/Projects/List/5
        [HttpGet("{action}/{userId}")]
        public async Task<ActionResult<Project>> List(int userId)
        {
            var projects = await _context.Project
                .Where(p => p.Assign.Any(a => a.UserId == userId) && p.ProjectStatus < 50)
                .OrderByDescending(x => x.ProjectId)
                .Select(p => new
                {
                    p.ProjectId,
                    p.ProjectStatus,
                    p.InitiativeTitle,
                    preparedDate = DateTimeConverter(p.PreparedDate),
                    p.ProjectCreatedDate,
                    Assign = p.Assign
                    .Where(u => u.UserId == userId)
                    .ToList()
                })
                .ToListAsync();

            if (projects == null)
            {
                return NotFound();
            }
            
            var result = new
            {
                total = projects.Count(),
                data = projects,
            };

            return Ok(result);
        }

        // GET: api/Projects/Limit/5/1
        [HttpGet("{action}/{userId}/{page}")]
        public async Task<ActionResult<Project>> Limit (int userId, int page)
        {
            if(page < 1)
            {
                return BadRequest();
            }

            var projects = await _context.Project
                .Where(p => p.Assign.Any(a => a.UserId == userId) && p.ProjectStatus < 50)
                .OrderByDescending(p => p.ProjectId)
                .Select(p => new
                {
                    p.ProjectId,
                    p.ProjectStatus,
                    p.InitiativeTitle,
                    preparedDate = DateTimeConverter(p.PreparedDate),
                    p.ProjectCreatedDate,
                    Assign = p.Assign
                    .Where(u => u.UserId == userId)
                    .ToList()
                })
                .ToListAsync();

            if (projects == null)
            {
                return NotFound();
            }

            // For skip method to pass a number of data
            int number = (page * 10) - 10;

            var data = projects
                .Skip(number)
                .Take(10);

            var result = new
            {
                total = projects.Count(),
                page,
                data
            };

            return Ok(result);
        }

        // POST: api/Projects/Search
        [HttpPost("{action}/{userId}/{page}")]
        public async Task<ActionResult<Project>> Search(int userId, int page, Search search)
        {
            if (page < 1)
            {
                return BadRequest();
            }

            var projects = await _context.Project
                .Where(p => p.Assign.Any(a => a.UserId == userId))
                .OrderByDescending(p => p.ProjectId)
                .Select(p => new
                {
                    p.ProjectId,
                    p.ProjectStatus,
                    p.InitiativeTitle,
                    preparedDate = DateTimeConverter(p.PreparedDate),
                    p.ProjectCreatedDate,
                    Assign = p.Assign
                    .Where(u => u.UserId == userId)
                    .ToList()
                })
                .ToListAsync();

            if (projects == null)
            {
                return NotFound();
            }

            if (!String.IsNullOrEmpty(search.Keyword))
            {
                /* CASE SENSITIVE */
                //projects = projects.Where(p => p.InitiativeTitle.Contains(search.Keyword)).ToList();

                /* CASE INSENSITIVE */
                projects = projects.Where(p => p.InitiativeTitle.ToLower().Contains(search.Keyword.ToLower())).ToList();
                //projects = projects.Where(p => EF.Functions.Like(p.InitiativeTitle, $"%{search.Keyword}%")).ToList();
            }

            if (search.ProjectStatus != null)
            {
                if(search.ProjectStatus < 10)
                {
                    //Still Active
                    if (search.ProjectStatus == 0)
                    {
                        projects = projects.Where(p => p.ProjectStatus < 50).ToList();
                    }
                    //Finished
                    if (search.ProjectStatus == 1)
                    {
                        projects = projects.Where(p => p.ProjectStatus == 50).ToList();
                    }
                    //Disapproved
                    if (search.ProjectStatus == 2)
                    {
                        projects = projects.Where(p => p.ProjectStatus > 50).ToList();
                    }
                }
                else
                {
                    projects = projects.Where(p => p.ProjectStatus == search.ProjectStatus).ToList();
                }
            }

            if (search.RoleId != null)
            {
                projects = projects
                    .Where(p => p.Assign.Any(a => a.RoleId == search.RoleId))
                    .ToList();
            }

            if (search.StartDate != null || search.EndDate != null)
            {
                projects = projects
                    .Where(p => p.ProjectCreatedDate >= search.StartDate & p.ProjectCreatedDate <= search.EndDate.Value.AddDays(1).AddSeconds(-1))
                    .ToList();
            }

            // For skip method to pass a number of data
            int number = (page * 10) - 10;

            var data = projects
                .Skip(number)
                .Take(10);

            var result = new
            {
                total = projects.Count(),
                page,
                data,
            };

            return Ok(result);
        }

        // POST: api/Projects
        [HttpPost]
        public async Task<ActionResult<Project>> PostProject(CreateProject createProject)
        {
            Project project = new Project
            {
                ProjectStatus = createProject.ProjectStatus,
                InitiativeTitle = createProject.InitiativeTitle,
                PreparedDate = createProject.PreparedDate,
                BackgroundInformation = createProject.BackgroundInformation,
                ObjectiveBenefit = createProject.ObjectiveBenefit,
                LandCompensation = createProject.LandCompensation,
                LandImprovement = createProject.LandImprovement,
                Building = createProject.Building,
                Infrastructure = createProject.Infrastructure,
                PlantMachine = createProject.PlantMachine,
                Equipment = createProject.Equipment,
                ExpenseUnderDevelopment = createProject.ExpenseUnderDevelopment,
                WorkingCapital = createProject.WorkingCapital,
                Contingency = createProject.Contingency,
                Total = createProject.Total,
                Timeline = createProject.Timeline,
                RequestedBy = createProject.RequestedBy,
                AcknowledgedBy = createProject.AcknowledgedBy,
                AgreedBy = createProject.AgreedBy,
                ExecutiveSummary = createProject.ExecutiveSummary,
                ProjectDefinition = createProject.ProjectDefinition,
                Vision = createProject.Vision,
                Objective = createProject.Objective,
                ProjectManagementPlan = createProject.ProjectManagementPlan,
                ExecutiveSummaryOfProjectInitiative = createProject.ExecutiveSummaryOfProjectInitiative,
                Assumption = createProject.Assumption,
                ChangeControlManagement = createProject.ChangeControlManagement,
                ScheduleAndTimeDescription = createProject.ScheduleAndTimeDescription
            };
            _context.Project.Add(project);

            foreach (var a in createProject.Users)
            {
                foreach (var b in a.UserId)
                {
                    Assign assign = new Assign
                    {
                        ProjectId = project.ProjectId,
                        RoleId = a.RoleId,
                        UserId = b
                    };

                    _context.Assign.Add(assign);
                }
            }
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProject", new { id = project.ProjectId }, project);
        }

        // PUT: api/Projects/UpdateStatus/1
        [HttpPut("{action}/{id}")]
        public async Task<IActionResult> UpdateStatus(int id, Project project)
        {
            if (id != project.ProjectId)
            {
                return BadRequest();
            }

            var p = _context.Project.Find(id);

            History history = new History
            {
                ProjectId = id,
                UserId = project.UserId,
                StatusBefore = p.ProjectStatus,
                StatusAfter = project.ProjectStatus,
                Comment = project.Comment
            };
            _context.History.Add(history);

            p.ProjectStatus = project.ProjectStatus;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(history);
        }

        // PUT: api/Projects/1
        [HttpPut("{id}")]
        public async Task<ActionResult<Project>> UpdateProject(int id, CreateProject createProject)
        {
            if (id != createProject.ProjectId)
            {
                return BadRequest();
            }

            var project = _context.Project.Find(id);

            if (project == null)
            {
                return NotFound();
            }
            
            // Closing Form
            if(createProject.ProjectDescription != null)
            {
                project.ProjectDescription = createProject.ProjectDescription;
                project.ScopeStatement = createProject.ScopeStatement;

                History history = new History
                {
                    ProjectId = id,
                    UserId = createProject.UserId,
                    StatusBefore = project.ProjectStatus,
                    StatusAfter = createProject.ProjectStatus,
                    Comment = createProject.Comment
                };
                _context.History.Add(history);
                project.ProjectStatus = createProject.ProjectStatus;

                foreach (var x in createProject.Milestone)
                {
                    Milestone milestone = new Milestone
                    {
                        ProjectId = createProject.ProjectId,
                        ProjectCategoryId = 4,
                        MilestoneDescription = x.MilestoneDescription,
                        EstimatedEndTime = x.EstimatedEndTime,
                        CompletedTime = x.CompletedTime,
                    };
                    _context.Milestone.Add(milestone);
                }

                foreach (var x in createProject.LessonLearned)
                {
                    LessonLearned lessonLearned = new LessonLearned
                    {
                        ProjectId = createProject.ProjectId,
                        LLCategoryId = x.LLCategoryId,
                        UserId = x.UserId,
                        ProjectCategoryId = 4, // 4=closing
                        Title = x.Title,
                        Impact = x.Impact,
                        LessonLearnedText = x.LessonLearnedText,
                        Recommendation = x.Recommendation,
                    };
                    _context.LessonLearned.Add(lessonLearned);
                }
            }
            // Planning Form
            else if (createProject.ProjectManagementPlan != null)
            {
                History history = new History
                {
                    ProjectId = id,
                    UserId = createProject.UserId,
                    StatusBefore = project.ProjectStatus,
                    StatusAfter = createProject.ProjectStatus,
                    Comment = createProject.Comment
                };
                _context.History.Add(history);

                project.ProjectStatus = createProject.ProjectStatus;
                project.ProjectManagementPlan = createProject.ProjectManagementPlan;
                project.ExecutiveSummaryOfProjectInitiative = createProject.ExecutiveSummaryOfProjectInitiative;
                project.Assumption = createProject.Assumption;
                project.ChangeControlManagement = createProject.ChangeControlManagement;
                project.ScheduleAndTimeDescription = createProject.ScheduleAndTimeDescription;
            }
            // Initiating Form
            else
            {
                project.ProjectStatus = createProject.ProjectStatus;
                project.InitiativeTitle = createProject.InitiativeTitle;
                project.PreparedDate = createProject.PreparedDate;
                project.BackgroundInformation = createProject.BackgroundInformation;
                project.ObjectiveBenefit = createProject.ObjectiveBenefit;
                project.LandCompensation = createProject.LandCompensation;
                project.LandImprovement = createProject.LandImprovement;
                project.Building = createProject.Building;
                project.Infrastructure = createProject.Infrastructure;
                project.PlantMachine = createProject.PlantMachine;
                project.Equipment = createProject.Equipment;
                project.ExpenseUnderDevelopment = createProject.ExpenseUnderDevelopment;
                project.WorkingCapital = createProject.WorkingCapital;
                project.Contingency = createProject.Contingency;
                project.Total = createProject.Total;
                project.Timeline = createProject.Timeline;
                project.RequestedBy = createProject.RequestedBy;
                project.AcknowledgedBy = createProject.AcknowledgedBy;
                project.AgreedBy = createProject.AgreedBy;
                project.ExecutiveSummary = createProject.ExecutiveSummary;
                project.ProjectDefinition = createProject.ProjectDefinition;
                project.Vision = createProject.Vision;
                project.Objective = createProject.Objective;

                var assigned = _context.Assign.Where(a => a.ProjectId == id).ToList();
                foreach (var x in assigned)
                {
                    _context.Assign.Remove(x);
                }

                foreach (var a in createProject.Users)
                {
                    foreach (var b in a.UserId)
                    {
                        Assign assign = new Assign
                        {
                            ProjectId = project.ProjectId,
                            RoleId = a.RoleId,
                            UserId = b
                        };
                        _context.Assign.Add(assign);
                    }
                }
            }//end of else

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(project);
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Project>> DeleteProject(int id)
        {
            var project = await _context.Project.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            var assign = _context.Assign.Where(a => a.ProjectId == id).ToList();
            foreach(var x in assign)
            {
                _context.Assign.Remove(x);
            }

            var document = _context.Document.Where(d => d.ProjectId == id).ToList();
            foreach(var x in document)
            {
                _context.Document.Remove(x);
                var filePath = Path.Combine(he.WebRootPath, "files", x.DocName);

                System.IO.File.Delete(filePath);
            }

            var history = _context.History.Where(h => h.ProjectId == id).ToList();
            foreach(var x in history)
            {
                _context.History.Remove(x);
            }

            var lesson_learned = _context.LessonLearned.Where(l => l.ProjectId == id).ToList();
            foreach(var x in lesson_learned)
            {
                _context.LessonLearned.Remove(x);
            }

            var milestone = _context.Milestone.Where(m => m.ProjectId == id).ToList();
            foreach(var x in milestone)
            {
                _context.Milestone.Remove(x);
            }

            var changeRequestData = _context.ChangeRequestData.Where(crd => crd.ChangeRequest.ProjectId == id).ToList();
            foreach(var x in changeRequestData)
            {
                _context.ChangeRequestData.Remove(x);
            }

            var changeRequest = _context.ChangeRequest.Where(cr => cr.ProjectId == id).ToList();
            foreach(var x in changeRequest)
            {    
                _context.ChangeRequest.Remove(x);
            }

            _context.Project.Remove(project);
            await _context.SaveChangesAsync();

            return project;
        }

        /* ----------------- WARNING ------------------- */
        // DELETE: api/Projects/DeleteAll
        [HttpDelete("{action}")]
        public async Task<ActionResult<Project>> DeleteAll()
        {
            var project = await _context.Project.ToListAsync();
            if (project == null)
            {
                return NotFound();
            }

            foreach(var p in project)
            {
                var assign = _context.Assign.Where(a => a.ProjectId == p.ProjectId).ToList();
                foreach (var x in assign)
                {
                    _context.Assign.Remove(x);
                }

                var document = _context.Document.Where(d => d.ProjectId == p.ProjectId).ToList();
                foreach (var x in document)
                {
                    _context.Document.Remove(x);
                    var filePath = Path.Combine(he.WebRootPath, "files", x.DocName);

                    System.IO.File.Delete(filePath);
                }

                var history = _context.History.Where(h => h.ProjectId == p.ProjectId).ToList();
                foreach (var x in history)
                {
                    _context.History.Remove(x);
                }

                var lesson_learned = _context.LessonLearned.Where(l => l.ProjectId == p.ProjectId).ToList();
                foreach (var x in lesson_learned)
                {
                    _context.LessonLearned.Remove(x);
                }

                var milestone = _context.Milestone.Where(m => m.ProjectId == p.ProjectId).ToList();
                foreach (var x in milestone)
                {
                    _context.Milestone.Remove(x);
                }

                var changeRequestData = _context.ChangeRequestData.Where(crd => crd.ChangeRequest.ProjectId == p.ProjectId).ToList();
                foreach (var x in changeRequestData)
                {
                    _context.ChangeRequestData.Remove(x);
                }

                var changeRequest = _context.ChangeRequest.Where(cr => cr.ProjectId == p.ProjectId).ToList();
                foreach (var x in changeRequest)
                {
                    _context.ChangeRequest.Remove(x);
                }

                _context.Project.Remove(p);
            }
            
            await _context.SaveChangesAsync();

            return Ok(project);
        }

        private bool ProjectExists(int id)
        {
            return _context.Project.Any(e => e.ProjectId == id);
        }

        public string DateTimeConverter(DateTime? param)
        {
            var data = param?.ToString("yyyy-MM-dd");

            return data;
        }
    }
}

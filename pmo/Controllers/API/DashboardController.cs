using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pmo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pmo.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly pmo_dbContext _context;

        public DashboardController(pmo_dbContext context)
        {
            _context = context;
        }

        // GET: api/Dashboard/Statistics
        [HttpGet("{action}")]
        public async Task<ActionResult<IEnumerable<Project>>> Statistics()
        {
            var total = await _context.Project
                .OrderByDescending(a => a.ProjectId)
                .CountAsync();

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
                total,
                initiating,
                planning,
                executing,
                closing,
                finished,
                disapproved,
            };

            return Ok(result);
        }

        // GET: api/Dashboard/RecentApprovedProjects
        [HttpGet("{action}")]
        public async Task<ActionResult<IEnumerable<History>>> RecentApprovedProjects()
        {
            var history = await _context.History
                .Where(h => h.StatusAfter == 21 || h.StatusAfter == 31 || h.StatusAfter == 41)
                .Select(x => new
                {
                    x.HistoryId,
                    x.StatusBefore,
                    x.StatusAfter,
                    x.HistoryModifiedDate,
                    x.ProjectId,
                    x.Project.InitiativeTitle,
                    x.Project.ProjectCreatedDate,
                })
                .OrderByDescending(x => x.HistoryId)
                .Take(5)
                .ToListAsync();

            return Ok(history);
        }

        // GET: api/Dashboard/RecentDisapprovedProjects
        [HttpGet("{action}")]
        public async Task<ActionResult<IEnumerable<History>>> RecentDisapprovedProjects()
        {
            var history = await _context.History
                .Where(h => h.StatusAfter >= 51 && h.StatusAfter <= 54)
                .Select(x => new
                {
                    x.HistoryId,
                    x.StatusBefore,
                    x.StatusAfter,
                    x.HistoryModifiedDate,
                    x.ProjectId,
                    x.Project.InitiativeTitle,
                    x.Project.ProjectCreatedDate,
                })
                .OrderByDescending(x => x.HistoryId)
                .Take(5)
                .ToListAsync();

            return Ok(history);
        }

        // GET: api/Dashboard/UserTask
        [HttpGet("{action}/{userId}")]
        public async Task<ActionResult<IEnumerable<Project>>> UserTasks (int userId)
        {
            var projects = await _context.Project
                .Where(p => p.Assign.Any(a =>
                //Initiating
                   (a.UserId == userId && a.RoleId == 1 && p.ProjectStatus == 12)
                || (a.UserId == userId && a.RoleId == 4 && p.ProjectStatus == 13)
                || (a.UserId == userId && a.RoleId == 2 && p.ProjectStatus == 14)
                || (a.UserId == userId && a.RoleId == 5 && p.ProjectStatus == 14)
                //Planning
                || (a.UserId == userId && a.RoleId == 1 && p.ProjectStatus == 22)
                || (a.UserId == userId && a.RoleId == 4 && p.ProjectStatus == 23)
                || (a.UserId == userId && a.RoleId == 2 && p.ProjectStatus == 24)
                || (a.UserId == userId && a.RoleId == 5 && p.ProjectStatus == 24)
                ))
                .Select(x => new
                {
                    x.ProjectId,
                    x.InitiativeTitle,
                    x.ProjectStatus,
                    x.ProjectCreatedDate,
                    role = x.Assign
                    .Where(a => a.UserId == userId)
                    .Select(a => new
                    {
                        a.RoleId,
                        a.Role.RoleName,
                    })
                    .ToList()
                })
                .ToListAsync();

            var changeRequests = await _context.ChangeRequest
                .Where(cr =>
                cr.Status == 1 && cr.Project.Assign.Any(p => p.UserId == userId && p.RoleId == 1)
                || cr.Status == 2 && cr.Project.Assign.Any(p => p.UserId == userId && p.RoleId == 4))
                .Select(x => new
                {
                    x.ChangeRequestId,
                    x.ChangeRequestName,
                    x.Status,
                    x.CRCreatedDate,
                    project = new
                    {
                        x.ProjectId,
                        x.Project.InitiativeTitle
                    },
                    role = x.Project.Assign
                    .Where(a => a.UserId == userId)
                    .Select(a => new
                    {
                        a.RoleId,
                        a.Role.RoleName,
                    })
                })
                .OrderBy(cr => cr.ChangeRequestId)
                .ToListAsync();

            var userTasks = new
            {
                projects = new
                {
                    total = projects.Count(),
                    data = projects,
                },
                changeRequests = new
                {
                    total = changeRequests.Count(),
                    data = changeRequests,
                }
            };

            return Ok(userTasks);
        }

        // GET: api/Dashboard/Chart
        [HttpGet("{action}")]
        public async Task<ActionResult<IEnumerable<Project>>> Chart()
        {
            List<MonthlyProject> monthlyProjects = new List<MonthlyProject>();

            for (int i = 1; i <= 12; i++)
            {
                MonthlyProject monthlyProject = new MonthlyProject();
                DateTime start = new DateTime(2019, i, 1);
                DateTime end;
                if (i != 12)
                {
                    end = new DateTime(2019, i + 1, 1);
                }
                else
                {
                    end = new DateTime(2019, 12, 31);
                }

                monthlyProject.Month = i;

                monthlyProject.InitiatedProject = await _context.Project
                    .Where(p =>
                    p.ProjectCreatedDate >= start &&
                    p.ProjectCreatedDate <= end.AddDays(-1))
                    .CountAsync();

                monthlyProject.FinishedProject = await _context.Project
                    .Where(p =>
                    p.ProjectStatus == 50 &&
                    p.History.Any(a =>
                        a.HistoryModifiedDate >= start &&
                        a.HistoryModifiedDate <= end.AddDays(-1)))
                    .CountAsync();

                monthlyProjects.Add(monthlyProject);
            };
            return Ok(monthlyProjects);
        }

    }
}

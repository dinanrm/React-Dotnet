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
using pmo.Models;

namespace pmo.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LessonLearnedController : ControllerBase
    {
        private readonly pmo_dbContext _context;
        private readonly IHostingEnvironment he;

        public LessonLearnedController(pmo_dbContext context, IHostingEnvironment e)
        {
            _context = context;
            he = e;
        }

        // GET: api/LessonLearned
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LessonLearned>>> GetLessonLearned()
        {
            var lessonLearned = await _context.LessonLearned
                .Select(x => new
                {
                    x.LessonLearnedId,
                    x.Title,
                    x.Impact,
                    x.LessonLearnedText,
                    x.Recommendation,
                    x.LessonLearnedCreatedDate,
                    x.LessonLearnedModifiedDate,
                    lessonLearnedCategory = new
                    {
                        x.LessonLearnedCategory.LLCategoryId,
                        x.LessonLearnedCategory.LLCategoryName
                    },
                    project = new
                    {
                        x.Project.ProjectId,
                        x.Project.InitiativeTitle
                    },
                    projectCategory = new
                    {
                        x.ProjectCategory.ProjectCategoryId,
                        x.ProjectCategory.ProjectCategoryName
                    },
                    user = new
                    {
                        x.User.UserId,
                        x.User.UserName,
                        x.User.UserEmail
                    },
                })
                .ToListAsync();

            return Ok(lessonLearned);
        }

        // GET: api/LessonLearned/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LessonLearned>> GetLessonLearned(int id)
        {
            var lessonLearned = await _context.LessonLearned
                .Where(l => l.LessonLearnedId == id)
                .Select(x => new
                {
                    x.LessonLearnedId,
                    x.Title,
                    x.Impact,
                    x.LessonLearnedText,
                    x.Recommendation,
                    x.LessonLearnedCreatedDate,
                    x.LessonLearnedModifiedDate,
                    lessonLearnedCategory = new
                    {
                        x.LessonLearnedCategory.LLCategoryId,
                        x.LessonLearnedCategory.LLCategoryName
                    },
                    project = new
                    {
                        x.Project.ProjectId,
                        x.Project.InitiativeTitle
                    },
                    projectCategory = new
                    {
                        x.ProjectCategory.ProjectCategoryId,
                        x.ProjectCategory.ProjectCategoryName
                    },
                    user = new
                    {
                        x.User.UserId,
                        x.User.UserName,
                        x.User.UserEmail
                    },
                })
                .FirstOrDefaultAsync();

            if (lessonLearned == null)
            {
                return NotFound();
            }

            return Ok(lessonLearned);
        }

        // GET: api/LessonLearned/byProject/1
        [HttpGet("{action}/{projectId}")]
        public async Task<ActionResult<LessonLearned>> ByProject(int projectId)
        {
            var lessonLearned = await _context.LessonLearned
                .Where(l => l.ProjectId == projectId)
                .Select(x => new
                {
                    x.LessonLearnedId,
                    x.Title,
                    x.Impact,
                    x.LessonLearnedText,
                    x.Recommendation,
                    x.LessonLearnedCreatedDate,
                    x.LessonLearnedModifiedDate,
                    lessonLearnedCategory = new
                    {
                        x.LessonLearnedCategory.LLCategoryId,
                        x.LessonLearnedCategory.LLCategoryName
                    },
                    project = new
                    {
                        x.Project.ProjectId,
                        x.Project.InitiativeTitle
                    },
                    projectCategory = new
                    {
                        x.ProjectCategory.ProjectCategoryId,
                        x.ProjectCategory.ProjectCategoryName
                    },
                    user = new
                    {
                        x.User.UserId,
                        x.User.UserName,
                        x.User.UserEmail
                    },
                })
                .ToListAsync();

            if (lessonLearned == null)
            {
                return NotFound();
            }

            return Ok(lessonLearned);
        }

        // POST: api/LessonLearned
        [HttpPost]
        public async Task<ActionResult<LessonLearned>> PostLessonLearned(LessonLearned lessonLearned)
        {
            _context.LessonLearned.Add(lessonLearned);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLessonLearned", new { id = lessonLearned.LessonLearnedId }, lessonLearned);
        }

        // POST : api/LessonLearned/Search
        [HttpPost("{action}/{projectId}/{page}")]
        public async Task<ActionResult<LessonLearned>> Search (int projectId, int page, Search search)
        {
            if (page < 1)
            {
                return BadRequest();
            }

            var lessonLearned = await _context.LessonLearned
                .Where(l => l.ProjectId == projectId)
                .Select(x => new
                {
                    x.LessonLearnedId,
                    x.Title,
                    x.Impact,
                    x.LessonLearnedText,
                    x.Recommendation,
                    x.LessonLearnedCreatedDate,
                    x.LessonLearnedModifiedDate,
                    lessonLearnedCategory = new
                    {
                        x.LessonLearnedCategory.LLCategoryId,
                        x.LessonLearnedCategory.LLCategoryName
                    },
                    project = new
                    {
                        x.Project.ProjectId,
                        x.Project.InitiativeTitle
                    },
                    projectCategory = new
                    {
                        x.ProjectCategory.ProjectCategoryId,
                        x.ProjectCategory.ProjectCategoryName
                    },
                    user = new
                    {
                        x.User.UserId,
                        x.User.UserName,
                        x.User.UserEmail
                    },
                })
                .ToListAsync();

            if (!String.IsNullOrEmpty(search.Keyword))
            {
                lessonLearned = lessonLearned.Where(p => p.Title.ToLower().Contains(search.Keyword.ToLower())).ToList();
            }

            switch (search.ProjectCategoryId)
            {
                case 1:
                    lessonLearned = lessonLearned.Where(p => p.projectCategory.ProjectCategoryId == 1).ToList();
                    break;
                case 2:
                    lessonLearned = lessonLearned.Where(p => p.projectCategory.ProjectCategoryId == 2).ToList();
                    break;
                case 3:
                    lessonLearned = lessonLearned.Where(p => p.projectCategory.ProjectCategoryId == 3).ToList();
                    break;
                case 4:
                    lessonLearned = lessonLearned.Where(p => p.projectCategory.ProjectCategoryId == 4).ToList();
                    break;
            }

            if (search.StartDate != null || search.EndDate != null)
            {
                lessonLearned = lessonLearned
                    .Where(p => p.LessonLearnedCreatedDate >= search.StartDate & p.LessonLearnedCreatedDate <= search.EndDate.Value.AddDays(1).AddSeconds(-1))
                    .ToList();
            }

            // For skip method to pass a number of data
            int number = (page * 10) - 10;

            var data = lessonLearned
                .Skip(number)
                .Take(10);

            var result = new
            {
                total = lessonLearned.Count(),
                page,
                data,
            };

            return Ok(result);
        }

        // PUT: api/LessonLearned/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLessonLearned(int id, LessonLearned lessonLearned)
        {
            if (id != lessonLearned.LessonLearnedId)
            {
                return BadRequest();
            }

            _context.Entry(lessonLearned).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LessonLearnedExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(lessonLearned);
        }

        // DELETE: api/LessonLearned/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LessonLearned>> DeleteLessonLearned(int id)
        {
            var lessonLearned = await _context.LessonLearned.FindAsync(id);
            if (lessonLearned == null)
            {
                return NotFound();
            }

            var document = await _context.Document.Where(d => d.LessonLearnedId == id).ToListAsync();
            foreach(var x in document)
            {
                _context.Document.Remove(x);
                var filePath = Path.Combine(he.WebRootPath, "files", x.DocName);
                System.IO.File.Delete(filePath);
            }

            _context.LessonLearned.Remove(lessonLearned);
            await _context.SaveChangesAsync();

            return lessonLearned;
        }

        private bool LessonLearnedExists(int id)
        {
            return _context.LessonLearned.Any(e => e.LessonLearnedId == id);
        }
    }
}

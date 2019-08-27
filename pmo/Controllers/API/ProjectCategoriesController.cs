using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pmo.Models;

namespace pmo.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProjectCategoriesController : ControllerBase
    {
        private readonly pmo_dbContext _context;

        public ProjectCategoriesController(pmo_dbContext context)
        {
            _context = context;
        }

        // GET: api/ProjectCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectCategory>>> GetProjectCategory()
        {
            return await _context.ProjectCategory.ToListAsync();
        }

        // GET: api/ProjectCategories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectCategory>> GetProjectCategory(int id)
        {
            var projectCategory = await _context.ProjectCategory.FindAsync(id);

            if (projectCategory == null)
            {
                return NotFound();
            }

            return projectCategory;
        }

        // PUT: api/ProjectCategories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectCategory(int id, ProjectCategory projectCategory)
        {
            if (id != projectCategory.ProjectCategoryId)
            {
                return BadRequest();
            }

            _context.Entry(projectCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectCategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ProjectCategories
        [HttpPost]
        public async Task<ActionResult<ProjectCategory>> PostProjectCategory(ProjectCategory projectCategory)
        {
            _context.ProjectCategory.Add(projectCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjectCategory", new { id = projectCategory.ProjectCategoryId }, projectCategory);
        }

        // DELETE: api/ProjectCategories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProjectCategory>> DeleteProjectCategory(int id)
        {
            var projectCategory = await _context.ProjectCategory.FindAsync(id);
            if (projectCategory == null)
            {
                return NotFound();
            }

            _context.ProjectCategory.Remove(projectCategory);
            await _context.SaveChangesAsync();

            return projectCategory;
        }

        private bool ProjectCategoryExists(int id)
        {
            return _context.ProjectCategory.Any(e => e.ProjectCategoryId == id);
        }
    }
}

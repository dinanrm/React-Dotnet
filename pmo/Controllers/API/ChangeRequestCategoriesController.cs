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
    public class ChangeRequestCategoriesController : ControllerBase
    {
        private readonly pmo_dbContext _context;

        public ChangeRequestCategoriesController(pmo_dbContext context)
        {
            _context = context;
        }

        // GET: api/ChangeRequestCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChangeRequestCategory>>> GetChangeRequestCategory()
        {
            return await _context.ChangeRequestCategory.ToListAsync();
        }

        // GET: api/ChangeRequestCategories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChangeRequestCategory>> GetChangeRequestCategory(int id)
        {
            var changeRequestCategory = await _context.ChangeRequestCategory.FindAsync(id);

            if (changeRequestCategory == null)
            {
                return NotFound();
            }

            return changeRequestCategory;
        }

        // PUT: api/ChangeRequestCategories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChangeRequestCategory(int id, ChangeRequestCategory changeRequestCategory)
        {
            if (id != changeRequestCategory.CRCategoryId)
            {
                return BadRequest();
            }

            _context.Entry(changeRequestCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChangeRequestCategoryExists(id))
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

        // POST: api/ChangeRequestCategories
        [HttpPost]
        public async Task<ActionResult<ChangeRequestCategory>> PostChangeRequestCategory(ChangeRequestCategory changeRequestCategory)
        {
            _context.ChangeRequestCategory.Add(changeRequestCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChangeRequestCategory", new { id = changeRequestCategory.CRCategoryId }, changeRequestCategory);
        }

        // DELETE: api/ChangeRequestCategories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ChangeRequestCategory>> DeleteChangeRequestCategory(int id)
        {
            var changeRequestCategory = await _context.ChangeRequestCategory.FindAsync(id);
            if (changeRequestCategory == null)
            {
                return NotFound();
            }

            _context.ChangeRequestCategory.Remove(changeRequestCategory);
            await _context.SaveChangesAsync();

            return changeRequestCategory;
        }

        private bool ChangeRequestCategoryExists(int id)
        {
            return _context.ChangeRequestCategory.Any(e => e.CRCategoryId == id);
        }
    }
}

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
    public class LessonLearnedCategoriesController : ControllerBase
    {
        private readonly pmo_dbContext _context;

        public LessonLearnedCategoriesController(pmo_dbContext context)
        {
            _context = context;
        }

        // GET: api/LessonLearnedCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LessonLearnedCategory>>> GetLessonLearnedCategory()
        {
            return await _context.LessonLearnedCategory.ToListAsync();
        }

        // GET: api/LessonLearnedCategories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LessonLearnedCategory>> GetLessonLearnedCategory(int id)
        {
            var lessonLearnedCategory = await _context.LessonLearnedCategory.FindAsync(id);

            if (lessonLearnedCategory == null)
            {
                return NotFound();
            }

            return lessonLearnedCategory;
        }

        // PUT: api/LessonLearnedCategories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLessonLearnedCategory(int id, LessonLearnedCategory lessonLearnedCategory)
        {
            if (id != lessonLearnedCategory.LLCategoryId)
            {
                return BadRequest();
            }

            _context.Entry(lessonLearnedCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LessonLearnedCategoryExists(id))
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

        // POST: api/LessonLearnedCategories
        [HttpPost]
        public async Task<ActionResult<LessonLearnedCategory>> PostLessonLearnedCategory(LessonLearnedCategory lessonLearnedCategory)
        {
            _context.LessonLearnedCategory.Add(lessonLearnedCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLessonLearnedCategory", new { id = lessonLearnedCategory.LLCategoryId }, lessonLearnedCategory);
        }

        // DELETE: api/LessonLearnedCategories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LessonLearnedCategory>> DeleteLessonLearnedCategory(int id)
        {
            var lessonLearnedCategory = await _context.LessonLearnedCategory.FindAsync(id);
            if (lessonLearnedCategory == null)
            {
                return NotFound();
            }

            _context.LessonLearnedCategory.Remove(lessonLearnedCategory);
            await _context.SaveChangesAsync();

            return lessonLearnedCategory;
        }

        private bool LessonLearnedCategoryExists(int id)
        {
            return _context.LessonLearnedCategory.Any(e => e.LLCategoryId == id);
        }
    }
}

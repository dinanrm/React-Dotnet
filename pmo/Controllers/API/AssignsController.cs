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
    public class AssignsController : ControllerBase
    {
        private readonly pmo_dbContext _context;

        public AssignsController(pmo_dbContext context)
        {
            _context = context;
        }

        // GET: api/Assigns
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Assign>>> GetAssign()
        {
            return await _context.Assign.ToListAsync();
        }

        // GET: api/Assigns/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Assign>> GetAssign(int id)
        {
            var assign = await _context.Assign.FindAsync(id);

            if (assign == null)
            {
                return NotFound();
            }

            return assign;
        }

        // PUT: api/Assigns/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAssign(int id, Assign assign)
        {
            if (id != assign.AssignId)
            {
                return BadRequest();
            }

            _context.Entry(assign).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssignExists(id))
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

        // POST: api/Assigns
        [HttpPost]
        public async Task<ActionResult<Assign>> PostAssign(Assign assign)
        {
            _context.Assign.Add(assign);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAssign", new { id = assign.AssignId }, assign);
        }

        // DELETE: api/Assigns/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Assign>> DeleteAssign(int id)
        {
            var assign = await _context.Assign.FindAsync(id);
            if (assign == null)
            {
                return NotFound();
            }

            _context.Assign.Remove(assign);
            await _context.SaveChangesAsync();

            return assign;
        }

        private bool AssignExists(int id)
        {
            return _context.Assign.Any(e => e.AssignId == id);
        }
    }
}

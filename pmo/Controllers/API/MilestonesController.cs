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
    public class MilestonesController : ControllerBase
    {
        private readonly pmo_dbContext _context;

        public MilestonesController(pmo_dbContext context)
        {
            _context = context;
        }

        // GET: api/Milestones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Milestone>>> GetMilestone()
        {
            return await _context.Milestone.ToListAsync();
        }

        // GET: api/Milestones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Milestone>> GetMilestone(int id)
        {
            var milestone = await _context.Milestone.FindAsync(id);

            if (milestone == null)
            {
                return NotFound();
            }

            return milestone;
        }

        // GET: api/Milestones/byProject/5
        [HttpGet("{action}/{id}")]
        public async Task<ActionResult<Milestone>> ByProject(int id)
        {
            var milestone = await _context.Milestone
                .Where(p => p.ProjectId == id)
                .ToListAsync();

            if (milestone == null)
            {
                return NotFound();
            }

            return Ok(milestone);
        }

        // PUT: api/Milestones/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMilestone(int id, Milestone milestone)
        {
            if (id != milestone.MilestoneId)
            {
                return BadRequest();
            }

            _context.Entry(milestone).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MilestoneExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(milestone);
        }

        // POST: api/Milestones
        [HttpPost]
        public async Task<ActionResult<Milestone>> PostMilestone(Milestone milestone)
        {
            _context.Milestone.Add(milestone);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMilestone", new { id = milestone.MilestoneId }, milestone);
        }

        // DELETE: api/Milestones/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Milestone>> DeleteMilestone(int id)
        {
            var milestone = await _context.Milestone.FindAsync(id);
            if (milestone == null)
            {
                return NotFound();
            }

            _context.Milestone.Remove(milestone);
            await _context.SaveChangesAsync();

            return milestone;
        }

        private bool MilestoneExists(int id)
        {
            return _context.Milestone.Any(e => e.MilestoneId == id);
        }
    }
}

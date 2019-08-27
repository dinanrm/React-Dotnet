using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public class HistoriesController : ControllerBase
    {
        private readonly pmo_dbContext _context;

        public HistoriesController(pmo_dbContext context)
        {
            _context = context;
        }

        // GET: api/Histories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<History>>> GetHistory()
        {
            return await _context.History.ToListAsync();
        }

        // GET: api/Histories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<History>> GetHistory(int id)
        {
            var history = await _context.History.FindAsync(id);

            if (history == null)
            {
                return NotFound();
            }

            return history;
        }

        // GET: api/Histories/byProject/1
        [HttpGet("{action}/{projectId}")]
        public async Task<ActionResult<History>> ByProject(int projectId)
        {
            var history = await _context.History
                .Where(x => x.ProjectId == projectId
                & x.User.Assign.Any(y => y.ProjectId == projectId))
                .Select(x => new
                {
                    x.HistoryId,
                    x.ProjectId,
                    x.StatusBefore,
                    x.StatusAfter,
                    x.Comment,
                    x.HistoryModifiedDate,
                    user = new
                    {
                        x.User.UserId,
                        x.User.UserName,
                        x.User.UserEmail,
                        role = x.User.Assign
                        .Where(a => a.ProjectId == projectId)
                        .FirstOrDefault()
                        .Role
                    },
                })
                .ToListAsync();

            return Ok(history);
        }

        // GET: api/Histories/byProject/1
        [HttpGet("{action}/{projectId}/{roleId}")]
        public async Task<ActionResult<History>> Planning (int projectId, int roleId)
        {
            var history = await _context.History
                .Where(x => x.ProjectId == projectId 
                & x.StatusBefore > 20 & x.StatusBefore <30 
                & x.User.Assign.Any(y => y.RoleId == roleId & y.ProjectId == projectId))
                .Select(x => new
                {
                    x.HistoryId,
                    x.ProjectId,
                    x.StatusBefore,
                    x.StatusAfter,
                    x.Comment,
                    x.HistoryModifiedDate,
                    user = new
                    {
                        x.User.UserId,
                        x.User.UserName,
                        x.User.UserEmail,
                    }
                })
                .ToListAsync();

            var role = await _context.Role
                .Where(r => r.RoleId == roleId)
                .FirstOrDefaultAsync();

            var data = new
            {
                role,
                history
            };

            return Ok(data);
        }

        // PUT: api/Histories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHistory(int id, History history)
        {
            if (id != history.HistoryId)
            {
                return BadRequest();
            }

            _context.Entry(history).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HistoryExists(id))
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

        // POST: api/Histories
        [HttpPost]
        public async Task<ActionResult<History>> PostHistory(History history)
        {
            _context.History.Add(history);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHistory", new { id = history.HistoryId }, history);
        }

        // DELETE: api/Histories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<History>> DeleteHistory(int id)
        {
            var history = await _context.History.FindAsync(id);
            if (history == null)
            {
                return NotFound();
            }

            _context.History.Remove(history);
            await _context.SaveChangesAsync();

            return history;
        }

        private bool HistoryExists(int id)
        {
            return _context.History.Any(e => e.HistoryId == id);
        }
    }
}

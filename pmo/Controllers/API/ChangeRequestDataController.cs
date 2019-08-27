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
    public class ChangeRequestDataController : ControllerBase
    {
        private readonly pmo_dbContext _context;

        public ChangeRequestDataController(pmo_dbContext context)
        {
            _context = context;
        }

        // GET: api/ChangeRequestData
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChangeRequestData>>> GetChangeRequestData()
        {
            return await _context.ChangeRequestData.ToListAsync();
        }

        // GET: api/ChangeRequestData/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChangeRequestData>> GetChangeRequestData(int id)
        {
            var changeRequestData = await _context.ChangeRequestData.FindAsync(id);

            if (changeRequestData == null)
            {
                return NotFound();
            }

            return changeRequestData;
        }

        // PUT: api/ChangeRequestData/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChangeRequestData(int id, ChangeRequestData changeRequestData)
        {
            if (id != changeRequestData.CRDataId)
            {
                return BadRequest();
            }

            _context.Entry(changeRequestData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChangeRequestDataExists(id))
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

        // POST: api/ChangeRequestData
        [HttpPost]
        public async Task<ActionResult<ChangeRequestData>> PostChangeRequestData(ChangeRequestData changeRequestData)
        {
            _context.ChangeRequestData.Add(changeRequestData);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChangeRequestData", new { id = changeRequestData.CRDataId }, changeRequestData);
        }

        // DELETE: api/ChangeRequestData/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ChangeRequestData>> DeleteChangeRequestData(int id)
        {
            var changeRequestData = await _context.ChangeRequestData.FindAsync(id);
            if (changeRequestData == null)
            {
                return NotFound();
            }

            _context.ChangeRequestData.Remove(changeRequestData);
            await _context.SaveChangesAsync();

            return changeRequestData;
        }

        private bool ChangeRequestDataExists(int id)
        {
            return _context.ChangeRequestData.Any(e => e.CRDataId == id);
        }
    }
}

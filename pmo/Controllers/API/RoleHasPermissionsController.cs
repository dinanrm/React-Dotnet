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
    public class RoleHasPermissionsController : ControllerBase
    {
        private readonly pmo_dbContext _context;

        public RoleHasPermissionsController(pmo_dbContext context)
        {
            _context = context;
        }

        // GET: api/RoleHasPermissions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleHasPermission>>> GetRoleHasPermission()
        {
            return await _context.RoleHasPermission.ToListAsync();
        }

        // GET: api/RoleHasPermissions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RoleHasPermission>> GetRoleHasPermission(int id)
        {
            var roleHasPermission = await _context.RoleHasPermission.FindAsync(id);

            if (roleHasPermission == null)
            {
                return NotFound();
            }

            return roleHasPermission;
        }

        // PUT: api/RoleHasPermissions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoleHasPermission(int id, RoleHasPermission roleHasPermission)
        {
            if (id != roleHasPermission.RhpId)
            {
                return BadRequest();
            }

            _context.Entry(roleHasPermission).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoleHasPermissionExists(id))
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

        // POST: api/RoleHasPermissions
        [HttpPost]
        public async Task<ActionResult<RoleHasPermission>> PostRoleHasPermission(RoleHasPermission roleHasPermission)
        {
            _context.RoleHasPermission.Add(roleHasPermission);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoleHasPermission", new { id = roleHasPermission.RhpId }, roleHasPermission);
        }

        // DELETE: api/RoleHasPermissions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RoleHasPermission>> DeleteRoleHasPermission(int id)
        {
            var roleHasPermission = await _context.RoleHasPermission.FindAsync(id);
            if (roleHasPermission == null)
            {
                return NotFound();
            }

            _context.RoleHasPermission.Remove(roleHasPermission);
            await _context.SaveChangesAsync();

            return roleHasPermission;
        }

        private bool RoleHasPermissionExists(int id)
        {
            return _context.RoleHasPermission.Any(e => e.RhpId == id);
        }
    }
}

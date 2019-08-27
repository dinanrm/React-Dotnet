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
    public class ChangeRequestsController : ControllerBase
    {
        private readonly pmo_dbContext _context;

        public ChangeRequestsController(pmo_dbContext context)
        {
            _context = context;
        }

        // GET: api/ChangeRequests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChangeRequest>>> GetChangeRequest()
        {
            return await _context.ChangeRequest.ToListAsync();
        }

        // GET: api/ChangeRequests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChangeRequest>> GetChangeRequest(int id)
        {
            var changeRequest = await _context.ChangeRequest
                .Where(cr => cr.ChangeRequestId == id)
                .Select(cr => new
                {
                    cr.ChangeRequestId,
                    cr.ProjectId,
                    cr.UserId,
                    cr.CustomId,
                    cr.ChangeRequestName,
                    cr.Requester,
                    raisedDate = DateTimeConverter(cr.RaisedDate),
                    approvalReqDate = DateTimeConverter(cr.ApprovalReqDate),
                    approvedDate = DateTimeConverter(cr.ApprovedDate),
                    cr.Status,
                    cr.CRCreatedDate,
                    cr.CRModifiedDate,
                    cr.ChangeRequestData,
                })
                .FirstOrDefaultAsync();

            if (changeRequest == null)
            {
                return NotFound();
            }

            return Ok(changeRequest);
        }

        // GET: api/ChangeRequests/byProject
        [HttpGet("{action}/{projectId}")]
        public async Task<ActionResult<ChangeRequest>> ByProject(int projectId)
        {
            var changeRequest = await _context.ChangeRequest
                .Where(cr => cr.ProjectId == projectId)
                .Select(cr => new
                {
                    cr.ChangeRequestId,
                    cr.ProjectId,
                    cr.UserId,
                    cr.CustomId,
                    cr.ChangeRequestName,
                    cr.Requester,
                    raisedDate = DateTimeConverter(cr.RaisedDate),
                    approvalReqDate = DateTimeConverter(cr.ApprovalReqDate),
                    approvedDate = DateTimeConverter(cr.ApprovedDate),
                    cr.Status,
                    cr.CRCreatedDate,
                    cr.CRModifiedDate,
                    cr.ChangeRequestData,
                })
                .ToListAsync();

            return Ok(changeRequest);
        }

        // POST: api/ChangeRequests
        [HttpPost]
        public async Task<ActionResult<ChangeRequest>> PostChangeRequest(CreateChangeRequest param)
        {
            ChangeRequest cr = new ChangeRequest
            {
                ProjectId = param.ProjectId,
                UserId = param.UserId,
                ChangeRequestName = param.ChangeRequestName,
                Requester = param.Requester,
                ApprovalReqDate = param.ApprovalReqDate,
                ApprovedDate = param.ApprovedDate,
                Status = param.Status,
            };

            _context.ChangeRequest.Add(cr);
            await _context.SaveChangesAsync();

            if(param.Status != 0)
            {
                cr.CustomId = CustomId(param.ProjectId, 0);

                if(param.Status == 1 && cr.RaisedDate == null)
                {
                    cr.RaisedDate = DateTime.Now;
                }
            }

            foreach (ChangeRequestData x in param.ChangeRequestData)
            {
                ChangeRequestData crd = new ChangeRequestData
                {
                    ChangeRequestId = cr.ChangeRequestId,
                    CRCategoryId = x.CRCategoryId,
                    Title = x.Title,
                    Description = x.Description
                };
                _context.ChangeRequestData.Add(crd);
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChangeRequest", new { id = cr.ChangeRequestId }, cr);
        }

        // PUT: api/ChangeRequests/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChangeRequest(int id, CreateChangeRequest param)
        {
            if (id != param.ChangeRequestId)
            {
                return BadRequest();
            }

            var cr = await _context.ChangeRequest.FindAsync(id);
            cr.ProjectId = param.ProjectId;
            cr.UserId = param.UserId;
            cr.ChangeRequestName = param.ChangeRequestName;
            cr.Requester = param.Requester;
            cr.ApprovalReqDate = param.ApprovalReqDate;
            cr.ApprovedDate = param.ApprovedDate;
            cr.Status = param.Status;

            if (param.Status != 0)
            {
                if (cr.CustomId == null)
                {
                    cr.CustomId = CustomId(cr.ProjectId, 1);
                }

                if (param.Status == 1 && cr.RaisedDate == null)
                {
                    cr.RaisedDate = DateTime.Now;
                }
            }
            else
            {
                cr.CustomId = param.CustomId;
            }

            var crd = await _context.ChangeRequestData
                .Where(x => x.ChangeRequestId == id)
                .ToListAsync();
            
            foreach(var x in crd)
            {
                _context.ChangeRequestData.Remove(x);
            }

            foreach (ChangeRequestData x in param.ChangeRequestData)
            {
                ChangeRequestData crd2 = new ChangeRequestData
                {
                    ChangeRequestId = cr.ChangeRequestId,
                    CRCategoryId = x.CRCategoryId,
                    Title = x.Title,
                    Description = x.Description
                };
                _context.ChangeRequestData.Add(crd2);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChangeRequestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(cr);
        }

        // PUT: api/UpdateStatus/5
        [HttpPut("{action}/{id}")]
        public async Task<IActionResult> UpdateStatus (int id, ChangeRequest changeRequest)
        {
            if (id != changeRequest.ChangeRequestId)
            {
                return BadRequest();
            }

            var cr = await _context.ChangeRequest.FindAsync(id);

            cr.Status = changeRequest.Status;

            if (changeRequest.Status != 0)
            {
                if (cr.CustomId == null)
                {
                    cr.CustomId = CustomId(cr.ProjectId, 2);
                }

                if (changeRequest.Status == 1 && cr.RaisedDate == null)
                {
                    cr.RaisedDate = DateTime.Now;
                }
                if (changeRequest.Status == 3)
                {
                    cr.ApprovedDate = DateTime.Now;
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChangeRequestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(cr);
        }

        // DELETE: api/ChangeRequests/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ChangeRequest>> DeleteChangeRequest(int id)
        {
            var changeRequest = await _context.ChangeRequest.FindAsync(id);
            if (changeRequest == null)
            {
                return NotFound();
            }

            var changeRequestData = await _context.ChangeRequestData
                .Where(crd => crd.ChangeRequestId == id)
                .ToListAsync();

            foreach(var x in changeRequestData)
            {
                _context.ChangeRequestData.Remove(x);
            }

            _context.ChangeRequest.Remove(changeRequest);
            await _context.SaveChangesAsync();

            return changeRequest;
        }

        private bool ChangeRequestExists(int id)
        {
            return _context.ChangeRequest.Any(e => e.ChangeRequestId == id);
        }

        public string DateTimeConverter(DateTime? param)
        {
            var data = param?.ToString("yyyy-MM-dd");

            return data;
        }

        public string CustomId(int? projectId, int? clue)
        {
            var lastId = _context.ChangeRequest
                    .Where(cr => cr.ProjectId == projectId && cr.Status != 0)
                    .Count();

            if (clue != 0)
            {
                lastId++;
            }

            var customId = DateTime.Now.Year
            + "-"
            + projectId
            + "-"
            + lastId.ToString().PadLeft(3, '0');

            return customId;
        }
    }
}

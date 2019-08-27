using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using pmo.Models;

namespace pmo.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DocumentsController : ControllerBase
    {
        private readonly pmo_dbContext _context;
        private readonly IHostingEnvironment he;

        public DocumentsController(pmo_dbContext context, IHostingEnvironment e)
        {
            _context = context;
            he = e;
        }

        // GET: api/Documents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Document>>> GetDocument()
        {
            return await _context.Document.ToListAsync();
        }

        // GET: api/Documents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Document>> GetDocument(int id)
        {
            var document = await _context.Document.FindAsync(id);

            if (document == null)
            {
                return NotFound();
            }

            return document;
        }

        // GET: api/Documents/byProject/1
        [HttpGet("{action}/{id}")]
        public async Task<ActionResult<Document>> ByProject(int id)
        {
            var document = await _context.Document
                .Where(d => d.ProjectId == id)
                .ToListAsync();

            if (document == null)
            {
                return NotFound();
            }

            return Ok(document);
        }

        // GET: api/Documents/byParam/71/1
        [HttpGet("{action}/{projectId}/{categoryId}")]
        public async Task<ActionResult<Document>> ByParam(int projectId, int categoryId)
        {
            var document = await _context.Document
                .Where(d => d.ProjectId == projectId && d.CategoryId == categoryId)
                .ToListAsync();

            if (document == null)
            {
                return NotFound();
            }

            return Ok(document);
        }

        // GET: api/Documents/byLessonLearned/71/1
        [HttpGet("{action}/{projectId}/{lessonLearnedId}")]
        public async Task<ActionResult<Document>> ByLessonLearned(int projectId, int lessonLearnedId)
        {
            var document = await _context.Document
                .Where(d => d.ProjectId == projectId && d.CategoryId == 60 && d.LessonLearnedId == lessonLearnedId)
                .ToListAsync();

            if (document == null)
            {
                return NotFound();
            }

            return Ok(document);
        }

        // GET: api/Documents/Executing/71/1
        [HttpGet("{action}/{projectId}/{month}")]
        public async Task<ActionResult<Document>> Executing (int projectId, int? month)
        {
            List<Document> document = new List<Document>();

            if(month != null)
            {
                document = await _context.Document
                .Where(d => d.ProjectId == projectId && d.CategoryId == 31 && d.Month == month)
                .ToListAsync();
            }
            else
            {
                document = await _context.Document
                .Where(d => d.ProjectId == projectId && d.CategoryId == 31)
                .ToListAsync();
            }

            if (document == null)
            {
                return NotFound();
            }

            return Ok(document);
        }

        private bool DocumentExists(int id)
        {
            return _context.Document.Any(e => e.DocId == id);
        }

        //--- UPLOAD ---///
        [HttpPost("{action}")]
        public async Task<IActionResult> Upload (List<IFormFile> files, [FromForm] int? ProjectId, [FromForm] int? CategoryId, [FromForm] int? LessonLearnedId, [FromForm] int? DocStatus, [FromForm] string Description)
        {
            if(files == null || files.Count == 0)
            {
                return Content("Files not selected");
            }

            if (ProjectId == null || CategoryId == null )
            {
                return Content("ForeignKey is empty");
            }

            List<Document> documents = new List<Document>();

            foreach (var formFile in files)
            {
                var uniqueName = GetUniqueFileName(formFile.FileName);

                var filePath = Path.Combine(he.WebRootPath, "files", uniqueName);

                var size = formFile.Length;

                Document document = new Document
                {
                    ProjectId = ProjectId,
                    CategoryId = CategoryId,
                    LessonLearnedId = LessonLearnedId,
                    DocName = uniqueName,
                    DocStatus = DocStatus,
                    DocDescription = Description,
                    DocType = GetContentType(filePath),
                    DocSize = size,
                };

                if (formFile.Length > 0)
                    using (var stream = new FileStream(filePath, FileMode.Create))
                        await formFile.CopyToAsync(stream);

                document.DocStream = Encoding.ASCII.GetBytes(filePath);

                documents.Add(document);

                _context.Document.Add(document);
            }
            await _context.SaveChangesAsync();

            return Ok(documents);
        }

        private string GetUniqueFileName(string fileName)
        {
            fileName = Path.GetFileName(fileName);
            return Path.GetFileNameWithoutExtension(fileName)
                      + "_"
                      + Guid.NewGuid().ToString().Substring(0, 7)
                      + Path.GetExtension(fileName);
        }

        //--- DOWNLOAD --//
        [HttpGet("{action}/{id}")]
        public async Task<ActionResult<Document>> Download(int id)
        {
            var document = await _context.Document.FindAsync(id);

            if (document == null)
            {
                return NotFound();
            }

            var filename = document.DocName;

            var path = Path.Combine(
                           Directory.GetCurrentDirectory(),
                           "wwwroot/files", filename);

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;

            Response.Headers.Add("Filename", filename);

            //System.Net.Mime.ContentDisposition cd = new System.Net.Mime.ContentDisposition
            //{
            //    FileName = filename,
            //    Inline = true  // false = prompt the user for downloading;  true = browser to try to show the file inline
            //};
            //Response.Headers.Add("Content-Disposition", cd.ToString());

            //Response.Headers.Add("Content-Disposition", "inline;filename=filename");

            return File(memory, GetContentType(path), Path.GetFileName(path));
        }

        private string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return types[ext];
        }

        private Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
            {
                {".txt", "text/plain"},
                {".pdf", "application/pdf"},
                {".doc", "application/vnd.ms-word"},
                {".docx", "application/vnd.ms-word"},
                {".xls", "application/vnd.ms-excel"},
                {".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
                {".ppt", "application/vnd.ms-powerpoint" },
                {".pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"},
                {".png", "image/png"},
                {".jpg", "image/jpeg"},
                {".jpeg", "image/jpeg"},
                {".gif", "image/gif"},
                {".csv", "text/csv"}
            };
        }

        // PUT: api/Documents/
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, List<IFormFile> files, [FromForm] int DocId, [FromForm] int? ProjectId, [FromForm] int? CategoryId, [FromForm] int? DocStatus, [FromForm] string Description)
        {
            Document document = _context.Document.Find(DocId);

            if (id != DocId)
            {
                return BadRequest();
            }

            if (document == null)
            {
                return NotFound();
            }
            if (ProjectId != null)
            {
                document.ProjectId = ProjectId;
            }
            if (CategoryId != null)
            {
                document.CategoryId = CategoryId;
            }
            if (DocStatus != null)
            {
                document.DocStatus = DocStatus;
            }
            if (Description != null)
            {
                document.DocDescription = Description;
            }

            if (files != null)
            {
                foreach (var formFile in files)
                {

                    document.DocName = GetUniqueFileName(formFile.FileName);

                    var filePath = Path.Combine(he.WebRootPath, "files", document.DocName);

                    if (formFile.Length > 0)
                        using (var stream = new FileStream(filePath, FileMode.Create))
                            await formFile.CopyToAsync(stream);

                    document.DocStream = Encoding.ASCII.GetBytes(filePath);
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DocumentExists(DocId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(document);
        }

        // DELETE: api/Documents/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Document>> DeleteDocument(int id)
        {
            var document = await _context.Document.FindAsync(id);
            if (document == null)
            {
                return NotFound();
            }

            var filePath = Path.Combine(he.WebRootPath, "files", document.DocName);

            System.IO.File.Delete(filePath);

            _context.Document.Remove(document);
            await _context.SaveChangesAsync();

            return document;
        }
    }
}

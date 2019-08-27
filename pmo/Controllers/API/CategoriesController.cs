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
using Microsoft.EntityFrameworkCore;
using pmo.Models;

namespace pmo.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoriesController : ControllerBase
    {
        private readonly pmo_dbContext _context;
        private readonly IHostingEnvironment he;

        public CategoriesController(pmo_dbContext context, IHostingEnvironment e)
        {
            _context = context;
            he = e;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategory()
        {
            return await _context.Category.ToListAsync();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _context.Category.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        private bool CategoryExists(int id)
        {
            return _context.Category.Any(e => e.CategoryId == id);
        }

        // POST: api/Categories
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            _context.Category.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategory", new { id = category.CategoryId }, category);
        }

        //--- UPLOAD ---///
        [HttpPost("{action}")]
        public async Task<IActionResult> Upload (List<IFormFile> files, [FromForm] string Description)
        {
            if (files == null || files.Count == 0)
            {
                return Content("Files not selected");
            }

            if (Description == null)
            {
                return Content("Description is empty");
            }

            List<Category> categories = new List<Category>();

            foreach (var formFile in files)
            {
                Category category = new Category();

                var filePath = Path.Combine(he.WebRootPath, "templates", Path.GetFileName(formFile.FileName));

                if (formFile.Length > 0)
                    using (var stream = new FileStream(filePath, FileMode.Create))
                        await formFile.CopyToAsync(stream);

                category.CategoryName = formFile.FileName;
                category.CategoryDescription = Description;
                category.FileStream = Encoding.ASCII.GetBytes(filePath);

                categories.Add(category);

                _context.Category.Add(category);
            }
            await _context.SaveChangesAsync();

            return Ok(categories);
        }

        //--- DOWNLOAD --//
        [HttpGet("{action}/{id}")]
        public async Task<ActionResult<Category>> Download(int id)
        {
            var category = await _context.Category.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            var filename = category.CategoryName;

            var path = Path.Combine(
                           Directory.GetCurrentDirectory(),
                           "wwwroot/templates", filename);

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;

            //Request.HttpContext.Response.Headers.Add("Category", category.ToString());

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

        // PUT: api/Categories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, Category category)
        {
            if (id != category.CategoryId)
            {
                return BadRequest();
            }

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(category);
        }

        // PUT: api/Categories
        [HttpPut("{action}/{id}")]
        public async Task<IActionResult> Files (int id, List<IFormFile> files, [FromForm] int categoryId, [FromForm] string description)
        {
            Category category = _context.Category.Find(categoryId);

            if (id != categoryId)
            {
                return BadRequest();
            }

            if (category == null)
            {
                return NotFound();
            }

            if(description != null)
            {
                category.CategoryDescription = description;
            }

            if (files != null)
            {
                foreach (var formFile in files)
                {
                    var filePath = Path.Combine(he.WebRootPath, "templates", Path.GetFileName(formFile.FileName));

                    if (formFile.Length > 0)
                        using (var stream = new FileStream(filePath, FileMode.Create))
                            await formFile.CopyToAsync(stream);

                    category.CategoryName = formFile.FileName;
                    category.FileStream = Encoding.ASCII.GetBytes(filePath);
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(categoryId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(category);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Category>> DeleteCategory(int id)
        {
            var category = await _context.Category.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            // Delete File
            if (category.FileStream != null)
            {
                var filePath = Path.Combine(he.WebRootPath, "templates", Path.GetFileName(category.CategoryName));
                System.IO.File.Delete(filePath);
            }

            _context.Category.Remove(category);
            await _context.SaveChangesAsync();

            return category;
        }

        private bool ProjectExists(int id)
        {
            return _context.Project.Any(e => e.ProjectId == id);
        }
    }
}

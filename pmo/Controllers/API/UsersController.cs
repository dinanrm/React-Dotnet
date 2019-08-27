using System;
using System.Collections.Generic;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using pmo.Models;

namespace pmo.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly pmo_dbContext _context;

        public UsersController(pmo_dbContext context, IConfiguration configuration)
        {
            _context = context;
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.User.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // GET: api/Users/Login
        [HttpGet("{action}")]
        public async Task<IActionResult> Login ([FromQuery] string returnUrl)
        {
            var data = User.FindAll(c => c.Type == "scope_data");

            var user = new User();

            foreach(var x in data)
            {
                var scopeData = JsonConvert.DeserializeObject<ScopeData>(x.Value);
                if(scopeData.Id == "mail")
                {
                    user.UserEmail = scopeData.Value;
                }
                if(scopeData.Id == "username")
                {
                    user.UserName = scopeData.Value;
                }

                user.UserStatus = true;
            }

            var result = _context.User
                .FirstOrDefault(u => u.UserName == user.UserName);

            if (result != null)
            {
                result.UserModifiedDate = DateTime.Now;
                //returnUrl = returnUrl + "/callback/" + EncodeBase64(result.UserId);
                //return Redirect(returnUrl + "?token=" + GenerateToken(result));
                return Redirect(returnUrl);
            }

            _context.User.Add(user);
            await _context.SaveChangesAsync();

            //returnUrl = returnUrl + "/callback/" + EncodeBase64(user.UserId);
            //return Redirect(returnUrl + "?token=" + GenerateToken(user));
            return Redirect(returnUrl);
        }

        // GET: api/Users/LogOut
        [HttpGet("{action}")]
        public async Task<IActionResult> LogOut([FromQuery] string returnUrl)
        {
            await HttpContext.SignOutAsync();
            //await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            //await HttpContext.SignOutAsync("PMO");

            return Redirect(returnUrl);
        }

        // GET: api/Users/GetId
        [HttpGet("{action}")]
        public async Task<IActionResult> GetId ()
        {
            var data = User.FindAll(c => c.Type == "scope_data");

            var user = new User();

            foreach (var x in data)
            {
                var scopeData = JsonConvert.DeserializeObject<ScopeData>(x.Value);
                if (scopeData.Id == "mail")
                {
                    user.UserEmail = scopeData.Value;
                }
                if (scopeData.Id == "username")
                {
                    user.UserName = scopeData.Value;
                }
            }

            var result = await _context.User
                .FirstOrDefaultAsync(u => u.UserName == user.UserName);

            if(result == null)
            {
                return NotFound();
            }

            return Ok(result.UserId);
        }

        // POST: api/Users/Login
        [HttpPost("{action}")]
        public async Task<ActionResult<User>> Login(User user)
        {
            var result = await _context.User.FirstOrDefaultAsync(u =>
                u.UserName == user.UserName && u.UserPassword == user.UserPassword);

            if (result == null)
            {
                return NotFound();
            }

            return result;
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            var users = await _context.User.FindAsync(id);
            user.UserStatus = users.UserStatus;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.UserStatus = false;

            //_context.User.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.UserId == id);
        }

        public string EncodeBase64(int param)
        {
            byte[] encodedBytes = System.Text.Encoding.Unicode.GetBytes(param.ToString());
            string encodedTxt = Convert.ToBase64String(encodedBytes);
            return encodedTxt;
        }

        private string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Configuration["PMO:JwtSecret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                               new Claim(ClaimTypes.Name, user.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

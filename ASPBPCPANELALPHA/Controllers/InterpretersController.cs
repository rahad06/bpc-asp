using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using ASPBPCPANELALPHA.Data;
using ASPBPCPANELALPHA.Models;
using Newtonsoft.Json;
using JsonSerializer = Newtonsoft.Json.JsonSerializer;

namespace ASPBPCPANELALPHA.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class InterpretersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public InterpretersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Interpreter>>> GetIndustries(
            [FromQuery(Name = "searchQuery")] string? searchQuery = "",
            [FromQuery] int pageIndex = 0,
            [FromQuery] int pageSize = 10)
        {
            var queryable = _context.Industries.AsQueryable();

            // Apply search
            if (!string.IsNullOrEmpty(searchQuery))
            {
                queryable = queryable.Where(c =>
                    c.Name.Contains(searchQuery));
            }

            // Apply pagination
            queryable = queryable.Skip(pageIndex * pageSize).Take(pageSize);

            var interpreters = await queryable.ToListAsync();

            return Ok(interpreters);
        }

        // GET: api/Interpreters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Interpreter>> GetInterpreter(int id)
        {
            var interpreter = await _context.Interpreters.FindAsync(id);

            if (interpreter == null)
            {
                return NotFound();
            }

            return interpreter;
        }

        // POST: api/Interpreters/Create
        [HttpPost("Create")]
        public async Task<ActionResult<Interpreter>> CreateInterpreter(Interpreter interpreter)
        {
            _context.Interpreters.Add(interpreter);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInterpreter", new { id = interpreter.Id }, interpreter);
        }


        // PUT: api/Interpreters/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInterpreter(int id, Interpreter interpreter)
        {
            if (id != interpreter.Id)
            {
                return BadRequest();
            }

            _context.Entry(interpreter).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InterpreterExists(id))
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

        // DELETE: api/Interpreters/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInterpreter(int id)
        {
            var interpreter = await _context.Interpreters.FindAsync(id);
            if (interpreter == null)
            {
                return NotFound();
            }

            _context.Interpreters.Remove(interpreter);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // GET: api/Interpreters/{id}/Companies
        [HttpGet("{id}/Companies")]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompaniesByInterpreter(int id)
        {
            var interpreter = await _context.Interpreters
                .Include(i => i.Meetings)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (interpreter == null)
            {
                return NotFound();
            }

            var json = JsonConvert.SerializeObject(interpreter.Meetings, Formatting.None, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                MaxDepth = 32 // Adjust the maximum depth value as needed
            });

            var companies = JsonConvert.DeserializeObject<List<Company>>(json);

            return Ok(companies); // Explicitly return Ok with the companies list
        }


        private bool InterpreterExists(int id)
        {
            return _context.Interpreters.Any(e => e.Id == id);
        }
    }
}

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
    public class IndustriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public IndustriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Industry>>> GetIndustries(
            [FromQuery(Name = "searchQuery")] string? searchQuery = "",
            [FromQuery] int pageIndex = 0,
            [FromQuery] int pageSize = 10000)
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

            var industries = await queryable.ToListAsync();

            return industries;
        }

        // GET: api/Industries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Industry>> GetIndustry(int id)
        {
            var industry = await _context.Industries.FindAsync(id);

            if (industry == null)
            {
                return NotFound();
            }

            return industry;
        }

        // POST: api/Industries/Create
        [HttpPost("Create")]
        public async Task<ActionResult<Industry>> CreateIndustry(Industry industry)
        {
            _context.Industries.Add(industry);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIndustry", new { id = industry.Id }, industry);
        }


        // PUT: api/Industries/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIndustry(int id, Industry industry)
        {
            if (id != industry.Id)
            {
                return BadRequest();
            }

            _context.Entry(industry).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IndustryExists(id))
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

        // DELETE: api/Industries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIndustry(int id)
        {
            var industry = await _context.Industries.FindAsync(id);
            if (industry == null)
            {
                return NotFound();
            }

            _context.Industries.Remove(industry);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // GET: api/Industries/{id}/Companies
        [HttpGet("{id}/Companies")]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompaniesByIndustry(int id)
        {
            var industry = await _context.Industries
                .Include(i => i.Companies)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (industry == null)
            {
                return NotFound();
            }

            var json = JsonConvert.SerializeObject(industry.Companies, Formatting.None, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                MaxDepth = 32 // Adjust the maximum depth value as needed
            });

            var companies = JsonConvert.DeserializeObject<List<Company>>(json);

            return Ok(companies); // Explicitly return Ok with the companies list
        }


        private bool IndustryExists(int id)
        {
            return _context.Industries.Any(e => e.Id == id);
        }
    }
}

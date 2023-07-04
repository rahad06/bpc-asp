using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPBPCPANELALPHA.Data;
using ASPBPCPANELALPHA.Models;

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

        // GET: api/Industries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Industry>>> GetIndustries()
        {
            return await _context.Industries.ToListAsync();
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

        private bool IndustryExists(int id)
        {
            return _context.Industries.Any(e => e.Id == id);
        }
    }
}

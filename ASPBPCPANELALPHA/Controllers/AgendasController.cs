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
    public class AgendasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AgendasController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Agenda>>> GetAgendas(
            [FromQuery(Name = "searchQuery")] string? searchQuery = "",
            [FromQuery] int pageIndex = 0,
            [FromQuery] int pageSize = 10)
        {
            var queryable = _context.Agendas.AsQueryable();

            // Apply search
            if (!string.IsNullOrEmpty(searchQuery))
            {
                queryable = queryable.Where(c =>
                    c.Name.Contains(searchQuery));
            }

            // Apply pagination
            queryable = queryable.Skip(pageIndex * pageSize).Take(pageSize);

            var agendas = await queryable.ToListAsync();

            return Ok(agendas);
        }

        // GET: api/Agendas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Agenda>> GetAgenda(int id)
        {
            var agenda = await _context.Agendas.FindAsync(id);

            if (agenda == null)
            {
                return NotFound();
            }

            return agenda;
        }

        // POST: api/Agendas/Create
        [HttpPost("Create")]
        public async Task<ActionResult<Agenda>> CreateAgenda(Agenda agenda)
        {
            _context.Agendas.Add(agenda);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAgenda", new { id = agenda.Id }, agenda);
        }


        // PUT: api/Agendas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAgenda(int id, Agenda agenda)
        {
            if (id != agenda.Id)
            {
                return BadRequest();
            }

            _context.Entry(agenda).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AgendaExists(id))
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

        // DELETE: api/Agendas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAgenda(int id)
        {
            var agenda = await _context.Agendas.FindAsync(id);
            if (agenda == null)
            {
                return NotFound();
            }

            _context.Agendas.Remove(agenda);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // // GET: api/Agendas/{id}/Companies
        // [HttpGet("{id}/Companies")]
        // public async Task<ActionResult<IEnumerable<Company>>> GetCompaniesByAgenda(int id)
        // {
        //     var interpreter = await _context.Agendas
        //         .Include(i => i.Meetings)
        //         .FirstOrDefaultAsync(i => i.Id == id);
        //
        //     if (interpreter == null)
        //     {
        //         return NotFound();
        //     }
        //
        //     var json = JsonConvert.SerializeObject(interpreter.Meetings, Formatting.None, new JsonSerializerSettings
        //     {
        //         ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
        //         MaxDepth = 32 // Adjust the maximum depth value as needed
        //     });
        //
        //     var companies = JsonConvert.DeserializeObject<List<Company>>(json);
        //
        //     return Ok(companies); // Explicitly return Ok with the companies list
        // }

        // [HttpGet("{id}/Clients")]
        // public async Task<ActionResult<IEnumerable<Company>>> GetClientsByAgenda(int id)
        // {
        //     var interpreter = await _context.Agendas
        //         .Include(i => i.Meetings)
        //         .FirstOrDefaultAsync(i => i.Id == id);
        //
        //     if (interpreter == null)
        //     {
        //         return NotFound();
        //     }
        //
        //     var json = JsonConvert.SerializeObject(interpreter.Meetings, Formatting.None, new JsonSerializerSettings
        //     {
        //         ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
        //         MaxDepth = 32 // Adjust the maximum depth value as needed
        //     });
        //
        //     var clients = JsonConvert.DeserializeObject<List<Client>>(json);
        //
        //     return Ok(clients); // Explicitly return Ok with the companies list
        // }


        private bool AgendaExists(int id)
        {
            return _context.Agendas.Any(e => e.Id == id);
        }
    }
}

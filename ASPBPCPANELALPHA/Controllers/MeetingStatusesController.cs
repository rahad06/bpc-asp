using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ASPBPCPANELALPHA.Data;
using ASPBPCPANELALPHA.Models;

namespace ASPBPCPANELALPHA.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MeetingStatusesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MeetingStatusesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/MeetingStatuses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MeetingStatus>>> GetMeetingStatuses()
        {
            return await _context.MeetingStatuses.ToListAsync();
        }

        // GET: api/MeetingStatuses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MeetingStatus>> GetMeetingStatus(int id)
        {
            var meetingStatus = await _context.MeetingStatuses.FindAsync(id);

            if (meetingStatus == null)
            {
                return NotFound();
            }

            return meetingStatus;
        }

        // POST: api/MeetingStatuses
        [HttpPost]
        public async Task<ActionResult<MeetingStatus>> CreateMeetingStatus(MeetingStatus meetingStatus)
        {
            _context.MeetingStatuses.Add(meetingStatus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMeetingStatus", new { id = meetingStatus.MeetingStatusId }, meetingStatus);
        }

        // PUT: api/MeetingStatuses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMeetingStatus(int id, MeetingStatus meetingStatus)
        {
            if (id != meetingStatus.MeetingStatusId)
            {
                return BadRequest();
            }

            _context.Entry(meetingStatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MeetingStatusExists(id))
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

        // DELETE: api/MeetingStatuses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeetingStatus(int id)
        {
            var meetingStatus = await _context.MeetingStatuses.FindAsync(id);
            if (meetingStatus == null)
            {
                return NotFound();
            }

            _context.MeetingStatuses.Remove(meetingStatus);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MeetingStatusExists(int id)
        {
            return _context.MeetingStatuses.Any(e => e.MeetingStatusId == id);
        }
    }
}

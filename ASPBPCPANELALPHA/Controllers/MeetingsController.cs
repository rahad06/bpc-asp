using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPBPCPANELALPHA.Data;
using ASPBPCPANELALPHA.Models;
using ExcelDataReader;

namespace ASPBPCPANELALPHA.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MeetingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MeetingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Meetings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Meeting>>> GetMeetings()
        {
            return await _context.Meetings.ToListAsync();
        }

        // GET: api/Meetings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Meeting>> GetMeeting(int id)
        {
            var meeting = await _context.Meetings.FindAsync(id);

            if (meeting == null)
            {
                return NotFound();
            }

            return meeting;
        }

        // POST: api/Meetings
        [HttpPost]
        public async Task<ActionResult<Meeting>> CreateMeeting(Meeting meeting)
        {
            _context.Meetings.Add(meeting);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMeeting", new { id = meeting.MeetingId }, meeting);
        }

        // PUT: api/Meetings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMeeting(int id, Meeting meeting)
        {
            if (id != meeting.MeetingId)
            {
                return BadRequest();
            }

            _context.Entry(meeting).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MeetingExists(id))
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

// GET: api/Meetings/Client/{clientId}
        [HttpGet("Client/{clientId}")]
        public async Task<ActionResult<IEnumerable<Meeting>>> GetMeetingsByClientId(int clientId)
        {
            var clientMeetings = await _context.Meetings
                .Where(m => m.ClientId == clientId)
                .ToListAsync();

            if (clientMeetings.Count == 0)
            {
                return NotFound(); // Return 404 Not Found if no meetings are found for the client
            }

            return clientMeetings;
        }

        // GET: api/Meetings?meetingTime=2023-07-04T12:41:07.178Z&meetingStatusId=1
        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<Meeting>>> FilterMeetings(DateTime? meetingTime,
            int? meetingStatusId)
        {
            var query = _context.Meetings.AsQueryable();

            if (meetingTime.HasValue)
            {
                query = query.Where(m => m.MeetingDate == meetingTime.Value);
            }

            if (meetingStatusId.HasValue)
            {
                query = query.Where(m => m.MeetingStatusId == meetingStatusId.Value);
            }

            var meetings = await query.ToListAsync();

            return meetings;
        }

// GET: api/Meetings/Today
        [HttpGet("Today")]
        public async Task<ActionResult<IEnumerable<Meeting>>> GetTodayMeetings()
        {
            var todayMeetings = await _context.Meetings
                .Where(m => m.MeetingDate.Date == DateTime.Today)
                .ToListAsync();

            return todayMeetings;
        }

// GET: api/Meetings/Tomorrow
        [HttpGet("Tomorrow")]
        public async Task<ActionResult<IEnumerable<Meeting>>> GetTomorrowMeetings()
        {
            var tomorrowMeetings = await _context.Meetings
                .Where(m => m.MeetingDate.Date == DateTime.Today.AddDays(1))
                .ToListAsync();

            return tomorrowMeetings;
        }

        // GET: api/Meetings/Clients/Today
        [HttpGet("Clients/Today")]
        public async Task<ActionResult<IEnumerable<Client?>>> GetClientsWithTodayMeetings()
        {
            var todayMeetings = await _context.Meetings
                .Where(m => m.MeetingDate.Date == DateTime.Today)
                .Include(m => m.Client)
                .Select(m => m.Client)
                .ToListAsync();

            return todayMeetings;
        }

        // GET: api/Meetings/Clients/Tomorrow
        [HttpGet("Clients/Tomorrow")]
        public async Task<ActionResult<IEnumerable<Client?>>> GetClientsWithTomorrowMeetings()
        {
            var tomorrowMeetings = await _context.Meetings
                .Where(m => m.MeetingDate.Date == DateTime.Today.AddDays(1))
                .Include(m => m.Client)
                .Select(m => m.Client)
                .ToListAsync();

            return tomorrowMeetings;
        }


        [HttpPost("ImportExcel")]
        public IActionResult ImportExcel()
        {
            // Get the uploaded Excel file
            var file = Request.Form.Files[0];

            // Read the Excel file using ExcelDataReader
            using (var stream = file.OpenReadStream())
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    // Get the header row from the Excel file
                    reader.Read();
                    var headerRow = new List<string>();
                    for (var i = 0; i < reader.FieldCount; i++)
                    {
                        headerRow.Add(reader.GetString(i));
                    }

                    // Define the column mapping
                    var columnMapping = new Dictionary<string, string>()
                    {
                        { "№", "MeetingId" },
                        { "MEETING DATES", "MeetingDate" },
                        { "MEETING STATUS", "MeetingStatusId" },
                        { "NAME OF THE COMPANY", "CompanyName" },
                        // ... mapping for other columns
                    };

                    // Iterate over the rows in the Excel file
                    while (reader.Read())
                    {
                        // Create a new Meeting object
                        var meeting = new Meeting();

                        // Map the column values to the corresponding properties
                        foreach (var header in headerRow)
                        {
                            if (columnMapping.ContainsKey(header))
                            {
                                var columnName = columnMapping[header];

                                // Handle specific column mappings
                                switch (columnName)
                                {
                                    case "MeetingDate":
                                        var meetingDateIndex = reader.GetOrdinal(header);
                                        if (reader.IsDBNull(meetingDateIndex))
                                        {
                                            meeting.MeetingDate =
                                                new DateTime(2020, 1, 1); // Or assign a default value as needed
                                        }
                                        else
                                        {
                                            meeting.MeetingDate = reader.GetDateTime(meetingDateIndex);
                                        }

                                        break;
                                    case "CompanyName":
                                        var companyNameIndex = reader.GetOrdinal(header);
                                        if (reader.IsDBNull(companyNameIndex))
                                        {
                                            meeting.CompanyName = ""; // Or assign a default value as needed
                                        }
                                        else
                                        {
                                            meeting.CompanyName = reader.GetString(companyNameIndex);
                                        }

                                        break;
                                    case "SpainTime":
                                        var spainTimeIndex = reader.GetOrdinal(header);
                                        if (reader.IsDBNull(spainTimeIndex))
                                        {
                                            meeting.SpainTime =
                                                TimeSpan.MinValue; // Or assign a default value as needed
                                        }
                                        else
                                        {
                                            meeting.SpainTime = TimeSpan.Parse(reader.GetString(spainTimeIndex));
                                        }

                                        break;
                                    case "IranTime":
                                        var iranTimeIndex = reader.GetOrdinal(header);
                                        if (reader.IsDBNull(iranTimeIndex))
                                        {
                                            meeting.IranTime = TimeSpan.MinValue; // Or assign a default value as needed
                                        }
                                        else
                                        {
                                            meeting.IranTime = TimeSpan.Parse(reader.GetString(iranTimeIndex));
                                        }

                                        break;
                                    case "ContactName":
                                        var contactNameIndex = reader.GetOrdinal(header);
                                        if (reader.IsDBNull(contactNameIndex))
                                        {
                                            meeting.CompanyName = null; // Or assign a default value as needed
                                        }
                                        else
                                        {
                                            meeting.CompanyName = reader.GetString(contactNameIndex);
                                        }

                                        break;
                                    // Add cases for other string fields
                                    // ...
                                }
                            }
                        }


                        // Insert the meeting into the database
                        _context.Meetings.Add(meeting);
                        _context.SaveChanges();
                    }
                }
            }

            return Ok();
        }

        // DELETE: api/Meetings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeeting(int id)
        {
            var meeting = await _context.Meetings.FindAsync(id);
            if (meeting == null)
            {
                return NotFound();
            }

            _context.Meetings.Remove(meeting);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MeetingExists(int id)
        {
            return _context.Meetings.Any(e => e.MeetingId == id);
        }
    }
}
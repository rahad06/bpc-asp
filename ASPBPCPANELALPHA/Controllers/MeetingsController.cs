using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ASPBPCPANELALPHA.Data;
using ASPBPCPANELALPHA.Models;
using ExcelDataReader;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;


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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MeetingDto>>> GetMeetings(
            [FromQuery(Name = "searchQuery")] string? searchQuery = "",
            [FromQuery] int pageIndex = 0,
            [FromQuery] int pageSize = 10)
        {
            IQueryable<Meeting> queryable = _context.Meetings
                .Include(m => m.Client)
                .ThenInclude(c => c.Industry)
                .Include(m => m.Company)
                .ThenInclude(c => c.Industry)
                .Include(m => m.MeetingStatus);

            if (!string.IsNullOrEmpty(searchQuery))
            {
                queryable = queryable.Where(m =>
                    m.Client.Name.Contains(searchQuery) ||
                    m.Client.Representative.Contains(searchQuery) ||
                    m.Company.Name.Contains(searchQuery) ||
                    m.MeetingStatus.Status.Contains(searchQuery) ||
                    m.Client.Industry.Name.Contains(searchQuery) ||
                    m.Company.Industry.Name.Contains(searchQuery));
            }

            // Apply pagination
            queryable = queryable.Skip(pageIndex * pageSize).Take(pageSize);

            var meetings = await queryable.ToListAsync();

            var meetingDtos = new List<MeetingDto>();
            int rowNumber = 1;

            foreach (var m in meetings)
            {
                var meetingDto = new MeetingDto
                {
                    RowNumber = rowNumber,
                    MeetingId = m.MeetingId,
                    ClientName = m.Client.Name,
                    CompanyName = m.Company.Name,
                    MeetingDate = m.MeetingDate,
                    MeetingStatus = m.MeetingStatus.Status,
                    Representative = m.Representative,
                    SpainTime = m.SpainTime,
                    IranTime = m.IranTime,
                    Employees = m.Company.Employees,
                    Comments = m.Company.Comments,
                    Address = m.Company.Address,
                    WebPage = m.Company.WebPage,
                    Mobile = m.Company.Mobile,
                    Phone = m.Company.Phone,
                    Email = m.Company.Email,
                    ContactName = m.Company.ContactName,
                    Pusto = m.Company.Pusto,
                    Salutation = m.Company.Salutation,
                    RegistroMercantil = m.Company.RegistroMercantil,
                    IdentificacionNacional = m.Company.IdentificacionNacional
                };

                meetingDtos.Add(meetingDto);
                rowNumber++;
            }

            return meetingDtos;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Meeting>> GetMeeting(int id)
        {
            var meeting = await _context.Meetings
                .Include(m => m.Client)
                .Include(m => m.Company)
                .Include(m => m.MeetingStatus)
                .FirstOrDefaultAsync(m => m.MeetingId == id);

            if (meeting == null)
            {
                return NotFound();
            }

            var settings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };

            var json = JsonConvert.SerializeObject(meeting, settings);
            return Content(json, "application/json");
        }

        // POST: api/Meetings
        [HttpPost]
        public async Task<ActionResult<Meeting>> CreateMeeting(Meeting meeting)
        {
            // Convert the MeetingDateUtc property to DateTime before saving to the database
            meeting.MeetingDate = TimeZoneInfo.ConvertTimeToUtc(meeting.MeetingDate, TimeZoneInfo.Utc);
// Convert SpainTime and IranTime to a DateTime with the same date as DateTime.MinValue

            // Convert SpainTime and IranTime to DateTime
            if (TimeSpan.TryParse(meeting.SpainTime, out var spainTime))
            {
                meeting.SpainTime = new DateTime(DateTime.MinValue.Year, DateTime.MinValue.Month, DateTime.MinValue.Day,
                    spainTime.Hours, spainTime.Minutes, 0).ToString("HH:mm");
            }
            else
            {
                // Handle invalid time format
                ModelState.AddModelError("SpainTime", "Invalid time format for SpainTime");
                return BadRequest(ModelState);
            }

            if (TimeSpan.TryParse(meeting.IranTime, out var iranTime))
            {
                meeting.IranTime = new DateTime(DateTime.MinValue.Year, DateTime.MinValue.Month, DateTime.MinValue.Day,
                    iranTime.Hours, iranTime.Minutes, 0).ToString("HH:mm");
            }
            else
            {
                // Handle invalid time format
                ModelState.AddModelError("IranTime", "Invalid time format for IranTime");
                return BadRequest(ModelState);
            }

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

            // Convert the MeetingDateUtc property to DateTime before saving to the database
            meeting.MeetingDate = meeting.MeetingDateUtc.UtcDateTime;

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

        // GET: api/Meetings/Week
        [HttpGet("Week")]
        public async Task<ActionResult<IEnumerable<DayOfWeekMeetings>>> GetWeekMeetings()
        {
            var timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("Asia/Tehran");

            var now = DateTime.Now;
            var localTimeZone = TimeZoneInfo.Local;
            var startDate = DateTime.Today.ToUniversalTime();


            var endDate = startDate.AddDays(7).ToUniversalTime();

            // Retrieve the week's meetings from the database.
            var weekMeetings = await _context.Meetings
                .Where(m => m.MeetingDate >= startDate && m.MeetingDate < endDate)
                .ToListAsync();

            // Convert the MeetingDate values to UTC.
            foreach (var meeting in weekMeetings)
            {
                meeting.MeetingDate = DateTime.SpecifyKind(meeting.MeetingDate, DateTimeKind.Local);
                meeting.MeetingDate = TimeZoneInfo.ConvertTimeToUtc(meeting.MeetingDate, TimeZoneInfo.Local);
            }

            // Define the custom day order
            var dayOrder = new Dictionary<DayOfWeek, int>()
            {
                { DayOfWeek.Saturday, 0 },
                { DayOfWeek.Sunday, 1 },
                { DayOfWeek.Monday, 2 },
                { DayOfWeek.Tuesday, 3 },
                { DayOfWeek.Wednesday, 4 },
                { DayOfWeek.Thursday, 5 },
                { DayOfWeek.Friday, 6 }
            };

// Group the meetings by day of the week and create the DayOfWeekMeetings objects,
// sorted based on the custom day order.
            var dayOfWeekMeetings = weekMeetings
                .GroupBy(m => TimeZoneInfo.ConvertTime(m.MeetingDate, timeZoneInfo).DayOfWeek)
                .Select(g => new DayOfWeekMeetings
                {
                    DayOfWeek = g.Key.ToString(),
                    Meetings = g.Where(m => m.MeetingStatusId != 3)
                        .ToList()
                })
                .OrderBy(g => g.DayOfWeek != null ? dayOrder[Enum.Parse<DayOfWeek>(g.DayOfWeek)] : int.MaxValue)
                .ToList();


            return dayOfWeekMeetings;
        }


        [HttpPut("UpdateMeetingStatus/{id}")]
        public async Task<IActionResult> UpdateMeetingStatus(int id, int meetingStatusId)
        {
            var meeting = await _context.Meetings.FindAsync(id);
            if (meeting == null)
            {
                return NotFound();
            }

            var newMeetingStatus = await _context.MeetingStatuses.FindAsync(meetingStatusId);
            if (newMeetingStatus == null)
            {
                return NotFound("Invalid meeting status ID");
            }

            meeting.MeetingStatusId = meetingStatusId;

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

            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve
            };
            var updatedMeeting = await _context.Meetings
                .Include(m => m.MeetingStatus)
                .FirstOrDefaultAsync(m => m.MeetingId == id);
            var json = JsonSerializer.Serialize(updatedMeeting, options);
            return Content(json, "application/json");
        }


        [HttpPost("Client/{clientId}")]
        public async Task<ActionResult<IEnumerable<MeetingDto>>> GetMeetingsByClientId(
            int clientId,
            [FromQuery(Name = "fromDate")] DateTime? fromDate,
            [FromQuery(Name = "toDate")] DateTime? toDate,
            [FromBody] List<int> meetingStatusIds)
        {
            var query = _context.Meetings
                .Where(m => m.ClientId == clientId)
                .Include(m => m.Client)
                .Include(m => m.Company);

            var filteredQuery = _context.Meetings
                .Where(m => m.ClientId == clientId);

            if (fromDate.HasValue && toDate.HasValue)
            {
                var utcFromDate = DateTime.SpecifyKind(fromDate.Value, DateTimeKind.Utc);
                var utcToDate = DateTime.SpecifyKind(toDate.Value, DateTimeKind.Utc);

                filteredQuery = filteredQuery.Where(m => m.MeetingDate >= utcFromDate && m.MeetingDate <= utcToDate);
            }

            if (meetingStatusIds.Count > 0)
            {
                filteredQuery = filteredQuery.Where(m => meetingStatusIds.Contains(m.MeetingStatusId));
            }

            var clientMeetings = await filteredQuery
                .Include(m => m.Client)
                .Include(m => m.Company)
                .Include(m => m.MeetingStatus)
                .ToListAsync();

            if (clientMeetings.Count == 0)
            {
                return NotFound(); // Return 404 Not Found if no meetings are found for the client
            }

            var meetingDtos = clientMeetings
                .Select((m, index) => new MeetingDto
                {
                    RowNumber = index + 1,
                    MeetingDate = m.MeetingDate,
                    MeetingStatus = m.MeetingStatus.Status,
                    CompanyName = m.Company.Name,
                    SpainTime = m.SpainTime,
                    IranTime = m.IranTime,
                    ContactName = m.Company.ContactName,
                    Pusto = m.Company.Pusto,
                    Salutation = m.Company.Salutation,
                    Mobile = m.Company.Mobile,
                    Phone = m.Company.Phone,
                    Email = m.Company.Email,
                    WebPage = m.Company.WebPage,
                    Address = m.Company.Address,
                    Comments = m.Company.Comments,
                    Employees = m.Company.Employees,
                    Experience = m.Company.Experience,
                    RegistroMercantil = m.Company.RegistroMercantil,
                    IdentificacionNacional = m.Company.IdentificacionNacional,
                    // MeetingId = m.MeetingId,
                    // ClientName = m.Client.Name,
                    // Representative = m.Representative,
                })
                .ToList();

            var json = JsonConvert.SerializeObject(meetingDtos, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });

            return Content(json, "application/json");
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
            var settings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };

            var todayMeetings = await _context.Meetings
                .Where(m => m.MeetingDate.Date == DateTime.Today)
                .Include(m => m.Client)
                .Include(m => m.Company)
                .Include(m => m.MeetingStatus)
                .OrderBy(m => m.MeetingDate)
                .ToListAsync();

            var json = JsonConvert.SerializeObject(todayMeetings, settings);

            return Content(json, "application/json");
        }


// GET: api/Meetings/Tomorrow
        [HttpGet("Tomorrow")]
        public async Task<ActionResult<IEnumerable<Meeting>>> GetTomorrowMeetings()
        {
            var tomorrowMeetings = await _context.Meetings
                .Where(m => m.MeetingDate.Date == DateTime.Today.AddDays(1))
                .OrderBy(m => m.MeetingDate)
                .ToListAsync();

            return tomorrowMeetings;
        }

        [HttpGet("Clients/ThisMonth")]
        public async Task<ActionResult<IEnumerable<Client?>>> GetClientsThisMonth()
        {
            var startDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1, 0, 0, 0, DateTimeKind.Utc);
            var endDate = startDate.AddMonths(1).AddDays(-1);

            var thisMonthClients = await _context.Meetings
                .Where(m => m.MeetingDate >= startDate && m.MeetingDate <= endDate)
                .Include(m => m.Client)
                .Select(m => m.Client)
                .Distinct()
                .OrderBy(c => c.Name)
                .Take(4)
                .ToListAsync();


            return Ok(thisMonthClients);
        }


// GET: api/Meetings/Clients/Tomorrow
        [HttpGet("Clients/Tomorrow")]
        public async Task<ActionResult<IEnumerable<Client?>>> GetClientsWithTomorrowMeetings()
        {
            var tomorrowMeetings = await _context.Meetings
                .Where(m => m.MeetingDate.Date == DateTime.Today.AddDays(1))
                .Include(m => m.Client)
                .Select(m => m.Client)
                .OrderBy(c => c.Name)
                .Take(2)
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
                                            meeting.Representative = ""; // Or assign a default value as needed
                                        }
                                        else
                                        {
                                            meeting.Representative = reader.GetString(companyNameIndex);
                                        }

                                        break;
                                    case "SpainTime":
                                        var spainTimeIndex = reader.GetOrdinal(header);
                                        if (reader.IsDBNull(spainTimeIndex))
                                        {
                                            meeting.SpainTime =
                                                DateTime.MinValue
                                                    .ToString("HH:mm"); // Or assign a default value as needed
                                        }
                                        else
                                        {
                                            var spainTime = reader.GetDateTime(spainTimeIndex);
                                            meeting.SpainTime = spainTime.ToString("HH:mm");
                                        }

                                        break;

                                    case "IranTime":
                                        var iranTimeIndex = reader.GetOrdinal(header);
                                        if (reader.IsDBNull(iranTimeIndex))
                                        {
                                            meeting.IranTime =
                                                DateTime.MinValue
                                                    .ToString("HH:mm"); // Or assign a default value as needed
                                        }
                                        else
                                        {
                                            var iranTime = reader.GetDateTime(iranTimeIndex);
                                            meeting.IranTime = iranTime.ToString("HH:mm");
                                        }

                                        break;


                                    case "ContactName":
                                        var contactNameIndex = reader.GetOrdinal(header);
                                        if (reader.IsDBNull(contactNameIndex))
                                        {
                                            meeting.Representative = null; // Or assign a default value as needed
                                        }
                                        else
                                        {
                                            meeting.Representative = reader.GetString(contactNameIndex);
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

    public class MeetingDto
    {
        [JsonProperty("RowNumber")] public int RowNumber { get; set; }

        public int MeetingId { get; set; }
        public string ClientName { get; set; }
        public string CompanyName { get; set; }
        public DateTime MeetingDate { get; set; }
        public string MeetingStatus { get; set; }
        public string Representative { get; set; }
        public string SpainTime { get; set; }
        public string IranTime { get; set; }
        public int? Employees { get; set; }
        public string ContactName { get; set; }
        public string Salutation { get; set; }
        public string Comments { get; set; }
        public string Pusto { get; set; }
        public string Mobile { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string WebPage { get; set; }
        public string Address { get; set; }
        public string Experience { get; set; }
        public string RegistroMercantil { get; set; }
        public string IdentificacionNacional { get; set; }
    }
}
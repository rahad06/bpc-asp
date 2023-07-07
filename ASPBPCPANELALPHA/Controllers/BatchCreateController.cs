using ASPBPCPANELALPHA.Data;
using ASPBPCPANELALPHA.Models;
using Microsoft.AspNetCore.Mvc;

namespace ASPBPCPANELALPHA.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BatchCreateController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BatchCreateController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult BatchCreate([FromBody] List<Dictionary<string, object>> payload, [FromQuery] int clientId)
        {
            try
            {
                var companies = new List<Company>();
                var meetings = new List<Meeting>();

                var client = _context.Clients.FirstOrDefault(c => c.Id == clientId);
                if (client == null)
                {
                    return BadRequest($"Client with ID {clientId} not found.");
                }

                var industryId = client.IndustryId ?? 0;
                var headerRow = payload.First();

                var dataRows = payload.Skip(1);

                foreach (var row in dataRows)
                {
                    var companyName = row.TryGetValue("NameOfTheCompany", out var companyNameValue) ? companyNameValue.ToString() : string.Empty;
                    var companyPhone = row.TryGetValue("Phone", out var companyPhoneValue) ? companyPhoneValue.ToString() : string.Empty;
                    var companyEmail = row.TryGetValue("Email", out var companyEmailValue) ? companyEmailValue.ToString() : string.Empty;
                    var contact = row.TryGetValue("ContactName", out var contactValue) ? contactValue.ToString() : string.Empty;
                    var post = row.TryGetValue("Pusto", out var postValue) ? postValue.ToString() : string.Empty;
                    var sal = row.TryGetValue("Salutation", out var salValue) ? salValue.ToString() : string.Empty;
                    var cell = row.TryGetValue("Mobile", out var cellValue) ? cellValue.ToString() : string.Empty;
                    var web = row.TryGetValue("WebPage", out var webValue) ? webValue.ToString() : string.Empty;
                    var addrr = row.TryGetValue("Address", out var addValue) ? addValue.ToString() : string.Empty;
                    var companyComments = row.TryGetValue("Comments", out var companyCommentsValue) ? companyCommentsValue.ToString() : string.Empty;
                    var companyEmployees = row.TryGetValue("Employees", out var companyEmployeesValue) && int.TryParse(companyEmployeesValue.ToString(), out var parsedEmployees) ? parsedEmployees : 0;
                    var experienceYears = row.TryGetValue("Experience", out var experienceYearsValue) ? experienceYearsValue.ToString() : string.Empty;
                    var registrationNo = row.TryGetValue("RegistroMercantil", out var registrationNoValue) ? registrationNoValue.ToString() : string.Empty;
                    var natId = row.TryGetValue("IdentificacionNacional", out var natIdValue) ? natIdValue.ToString() : string.Empty;
                    var meetingDay = row.TryGetValue("Meeting", out var meetingDayValue) ? meetingDayValue.ToString() : string.Empty;
                    var stat = row.TryGetValue("MeetingStatus", out var statValue) ? statValue.ToString() : string.Empty;
                    var meetingStatus = stat.Equals(MeetingStatus.Confirmed, StringComparison.OrdinalIgnoreCase)
                        ? MeetingStatus.Confirmed
                        : string.Empty; // Set a default value if necessary

                    // Check if the company with the same name already exists
                    var existingCompany = _context.Companies.FirstOrDefault(c => c.Name == companyName);
                    if (existingCompany != null)
                    {
                        // Skip adding the company to the list
                        continue;
                    }

                    var company = new Company
                    {
                        Name = companyName,
                        Phone = companyPhone,
                        Mobile = cell,
                        Email = companyEmail,
                        ContactName = contact,
                        Pusto = post,
                        Salutation = sal,
                        WebPage = web,
                        Address = addrr,
                        Comments = companyComments,
                        Employees = companyEmployees,
                        Experience = experienceYears,
                        RegistroMercantil = registrationNo,
                        IdentificacionNacional = natId,
                        IndustryId = industryId
                    };

                    companies.Add(company);
                    _context.Companies.Add(company);
                    _context.SaveChanges();

                    // Create a new meeting for the company
                    try
                    {
                        var meeting = new Meeting
                        {
                            CompanyId = company.Id,
                            ClientId = client.Id,
                            MeetingDate = ParseDateString(meetingDay), // Convert to PostgreSQL datetime
                            MeetingStatusId = _context.MeetingStatuses.FirstOrDefault(ms => ms.Status == meetingStatus)?.MeetingStatusId ?? 0, // Retrieve the MeetingStatusId
                            SpainTime = string.Empty,
                            IranTime = string.Empty
                        };

                        meetings.Add(meeting);
                        _context.Meetings.Add(meeting);
                        _context.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        if (ex.InnerException is Npgsql.PostgresException pgEx && pgEx.SqlState == "23503")
                        {
                            var constraintName = pgEx.Data["ConstraintName"];
                            var referencedTable = pgEx.Data["TableName"];
                            var referencedColumn = pgEx.Data["ColumnName"];

                            return BadRequest($"Foreign key constraint violation. The value provided for {referencedColumn} does not exist in the {referencedTable} table. Please check the {referencedColumn} value.");

                            // You can further customize the error message based on your needs
                        }

                        throw new Exception($"{ex.Message}");
                    }
                }

                // _context.Companies.AddRange(companies);
                // _context.SaveChanges();

               

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        private DateTime ParseDateString(string dateString)
        {
            var parts = dateString.Split('/');
            if (parts.Length == 3 && int.TryParse(parts[0], out var day) && int.TryParse(parts[1], out var month) && int.TryParse(parts[2], out var year))
            {
                return new DateTime(year, month, day, 0, 0, 0, DateTimeKind.Utc);
            }

            throw new ArgumentException("Invalid date format.");
        }

    }
}

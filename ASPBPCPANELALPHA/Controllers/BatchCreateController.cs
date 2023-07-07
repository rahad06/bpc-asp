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
        public IActionResult BatchCreate([FromBody] List<Dictionary<string, object>> payload)
        {
            try
            {
                var companies = new List<Company>();
                var clients = new List<Client>();
                var meetings = new List<Meeting>();

                foreach (var row in payload)
                {
                    var companyName = row["NameOfTheCompany"].ToString();
                    var companyPhone = row["Phone"].ToString();
                    var companyEmail = row["Email"].ToString();
                    var contact = row["ContactName"].ToString();
                    var post = row["Pusto"].ToString();
                    var sal = row["Salutation"].ToString();
                    var cell = row["Mobile"].ToString();
                    var web = row["WebPage"].ToString();
                    var add = row["Address"].ToString();
                    var companyComments = row["Comments"].ToString();
                    var companyEmployees = int.Parse(row["Employees"].ToString());
                    var experienceYears = row["Experience"].ToString();
                    var registrationNo = row["RegistroMercantil"].ToString();
                    var natId = row["IdentificacionNacional"].ToString();
                    var meetingDay = row["Meeting"].ToString();
                    // Extract other company properties accordingly

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
                        Address = add,
                        Comments = companyComments,
                        Employees = companyEmployees,
                        Experience = experienceYears,
                        RegistroMercantil = registrationNo,
                        IdentificacionNacional = natId
                    };

                    companies.Add(company);
                }

                _context.Companies.AddRange(companies);
                _context.Clients.AddRange(clients);
                _context.Meetings.AddRange(meetings);
                _context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

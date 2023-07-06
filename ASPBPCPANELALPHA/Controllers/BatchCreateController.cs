using System;
using System.Collections.Generic;
using System.Linq;
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
        public IActionResult BatchCreate([FromBody] BatchCreateRequest request)
        {
            try
            {
                // Create companies
                var companies = new List<Company>();
                foreach (var companyData in request.Companies)
                {
                    var company = new Company
                    {
                        Name = companyData.Name,
                        // Set other properties accordingly
                    };

                    companies.Add(company);
                }

                // Create clients
                var clients = new List<Client>();
                foreach (var clientData in request.Clients)
                {
                    var client = new Client
                    {
                        Name = clientData.Name,
                        // Set other properties accordingly
                    };

                    clients.Add(client);
                }
                
                // Create industries
                var industries = new List<Industry>();
                foreach (var companyData in request.Companies)
                {
                    if (companyData.Industry != null)
                    {
                        var industry = new Industry
                        {
                            Name = companyData.Industry.Name,
                            // Set other properties accordingly
                        };

                        industries.Add(industry);
                    }
                }

                // Create meeting statuses
                var meetingStatuses = new List<MeetingStatus>();
                foreach (var meetingStatusData in request.MeetingStatuses)
                {
                    var meetingStatus = new MeetingStatus
                    {
                        Status = meetingStatusData.Status,
                        // Set other properties accordingly
                    };

                    meetingStatuses.Add(meetingStatus);
                }

                // Create meetings
                var meetings = new List<Meeting>();
                foreach (var meetingData in request.Meetings)
                {
                    var client = clients.FirstOrDefault(c => c == meetingData.Client);
                    var company = companies.FirstOrDefault(c => c == meetingData.Company);
                    var meetingStatus = meetingStatuses.FirstOrDefault(ms => ms == meetingData.MeetingStatus);

                    if (client != null && company != null && meetingStatus != null)
                    {
                        var meeting = new Meeting
                        {
                            ClientId = client.Id,
                            CompanyId = company.Id,
                            MeetingDate = meetingData.MeetingDate,
                            MeetingStatusId = meetingStatus.MeetingStatusId,
                        };

                        meetings.Add(meeting);
                    }
                }

                // Save entities to the database
                _context.Companies.AddRange(companies);
                _context.Clients.AddRange(clients);
                _context.Industries.AddRange(industries);
                _context.MeetingStatuses.AddRange(meetingStatuses);
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

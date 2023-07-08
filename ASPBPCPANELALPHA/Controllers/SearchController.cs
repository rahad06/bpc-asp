using System;
using System.Collections.Generic;
using System.Linq;
using ASPBPCPANELALPHA.Data;
using Microsoft.AspNetCore.Mvc;
using ASPBPCPANELALPHA.Models;

namespace ASPBPCPANELALPHA.Controllers
{
    [Route("api/search")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SearchController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<object>> Search(string searchTerm)
        {
            var clients = _context.Clients.Where(c =>
                c.Name.Contains(searchTerm) ||
                c.Website.Contains(searchTerm) ||
                c.Representative.Contains(searchTerm) ||
                c.Industry.Name.Contains(searchTerm));

            var companies = _context.Companies.Where(co =>
                co.Name.Contains(searchTerm) ||
                co.ContactName.Contains(searchTerm) ||
                co.Pusto.Contains(searchTerm) ||
                co.Salutation.Contains(searchTerm) ||
                co.Mobile.Contains(searchTerm) ||
                co.Phone.Contains(searchTerm) ||
                co.Email.Contains(searchTerm) ||
                co.WebPage.Contains(searchTerm) ||
                co.Address.Contains(searchTerm) ||
                co.Comments.Contains(searchTerm) ||
                co.Experience.Contains(searchTerm) ||
                co.RegistroMercantil.Contains(searchTerm) ||
                co.IdentificacionNacional.Contains(searchTerm) ||
                co.Industry.Name.Contains(searchTerm));

            var meetingStatuses = _context.MeetingStatuses.Where(ms =>
                ms.Status.Contains(searchTerm));

            var searchResults = new List<object>();
            searchResults.AddRange(clients);
            searchResults.AddRange(companies);
            searchResults.AddRange(meetingStatuses);

            return searchResults;
        }
    }
}
using Microsoft.AspNetCore.Mvc;

using ASPBPCPANELALPHA.Data;
using Microsoft.EntityFrameworkCore;
using ASPBPCPANELALPHA.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ASPBPCPANELALPHA.Models;
using OfficeOpenXml;
namespace ASPBPCPANELALPHA.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompaniesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CompaniesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetClients(
            [FromQuery(Name = "searchQuery")] string? searchQuery = "")
        {
            var queryable = _context.Companies.AsQueryable();

            // Apply search
            if (!string.IsNullOrEmpty(searchQuery))
            {
                queryable = queryable.Where(c =>
                    c.Name.Contains(searchQuery)
                    );
            }


            var companies = await queryable.ToListAsync();

            return companies;
        }



        // GET: api/companies/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> GetCompanyById(int id)
        {
            var company = await _context.Companies.FindAsync(id);

            if (company == null)
            {
                return NotFound();
            }

            return company;
        }

        // POST: api/companies
        [HttpPost]
        public async Task<ActionResult<Company>> CreateCompany(Company company)
        {
            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCompanyById), new { id = company.Id }, company);
        }

        // PUT: api/companies/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> EditCompany(int id, Company company)
        {
            if (id != company.Id)
            {
                return BadRequest();
            }

            _context.Entry(company).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id))
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

        // DELETE: api/companies/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var company = await _context.Companies.FindAsync(id);

            if (company == null)
            {
                return NotFound();
            }

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CompanyExists(int id)
        {
            return _context.Companies.Any(c => c.Id == id);
        }

        // POST: api/companies/upload
        [HttpPost("upload")]
        public async Task<IActionResult> UploadCompanies(IFormFile file)
        {
            if (file == null || file.Length <= 0)
            {
                return BadRequest("No file uploaded.");
            }

            // Read the Excel file from the uploaded file
            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                stream.Position = 0;

                using (var package = new ExcelPackage(stream))
                {
                    var workbook = package.Workbook;
                    var worksheet = workbook.Worksheets.FirstOrDefault();

                    if (worksheet == null)
                    {
                        return BadRequest("No worksheet found in the Excel file.");
                    }

                    var companies = new List<Company>();

                    // Map the column headers from Spanish to English
                    var columnMappings = new Dictionary<string, string>
                    {
                        { "Nombre", "Name" },
                        { "Industria", "IndustryId" },
                        { "Contacto", "ContactName" },
                        { "Saludo", "Salutation" },
                        { "Móvil", "Mobile" },
                        { "Teléfono", "Phone" },
                        { "Correo Electrónico", "Email" },
                        { "Página Web", "WebPage" },
                        { "Dirección", "Address" },
                        { "Comentarios", "Comments" },
                        { "Empleados", "Employees" },
                        { "Experiencia", "Experience" },
                        { "Registro Mercantil", "RegistroMercantil" },
                        { "Identificación Nacional", "IdentificacionNacional" }
                    };

                    var rowStart = worksheet.Dimension.Start.Row + 1; // Exclude header row

                    for (int row = rowStart; row <= worksheet.Dimension.End.Row; row++)
                    {
                        var company = new Company();

                        foreach (var columnMapping in columnMappings)
                        {
                            var columnIndex = worksheet.Cells[row, Convert.ToInt32(columnMapping.Key)].Start.Column;
                            var propertyInfo = typeof(Company).GetProperty(columnMapping.Value);

                            if (propertyInfo != null)
                            {
                                var cellValue = worksheet.Cells[row, columnIndex].Value;
                                if (cellValue != null)
                                {
                                    var stringValue = cellValue.ToString();
                                    propertyInfo.SetValue(company, stringValue);
                                }
                            }
                        }

                        companies.Add(company);
                    }

                    // Add or update the companies in the database
                    foreach (var company in companies)
                    {
                        var existingCompany = await _context.Companies.FirstOrDefaultAsync(c => c.Name == company.Name);

                        if (existingCompany != null)
                        {
                            existingCompany.IndustryId = company.IndustryId;
                            existingCompany.ContactName = company.ContactName;
                            existingCompany.Salutation = company.Salutation;
                            existingCompany.Mobile = company.Mobile;
                            existingCompany.Phone = company.Phone;
                            existingCompany.Email = company.Email;
                            existingCompany.WebPage = company.WebPage;
                            existingCompany.Address = company.Address;
                            existingCompany.Comments = company.Comments;
                            existingCompany.Employees = company.Employees;
                            existingCompany.Experience = company.Experience;
                            existingCompany.RegistroMercantil = company.RegistroMercantil;
                            existingCompany.IdentificacionNacional = company.IdentificacionNacional;
                        }
                        else
                        {
                            _context.Companies.Add(company);
                        }
                    }

                    await _context.SaveChangesAsync();

                    return Ok("Companies uploaded successfully.");
                }
            }
        }
        // GET: api/companies/export-table
        [HttpPost("export-table")]
        public async Task<ActionResult<List<TableData>>> ExportTableData([FromQuery] int clientId, [FromBody] List<int> companyIds)
        {
            var client = await _context.Clients.FindAsync(clientId);

            if (client == null)
            {
                return NotFound("Client not found.");
            }

            var companies = await _context.Companies
                .Where(c => companyIds.Contains(c.Id))
                .ToListAsync();

            var tableData = new List<TableData>();

            // Add client row
            var clientRow = new TableData
            {
                ClientName = client.Name,
                Companies = new List<Company>()
            };

            tableData.Add(clientRow);

            // Add company rows
            foreach (var company in companies)
            {
                var companyData = new Company
                {
                    Name = company.Name,
                    RegistroMercantil = company.RegistroMercantil,
                    IdentificacionNacional = company.IdentificacionNacional,
                    Salutation = company.Salutation,
                    ContactName = company.ContactName,
                    Pusto = company.Pusto,
                    Email = company.Email,
                    WebPage = company.WebPage,
                    Phone = company.Phone,
                    Mobile = company.Mobile,
                    Stage = company.Stage,
                    Industry = company.Industry,
                    Type = company.Type,
                    Address = company.Address,
                    City = company.City,
                    Country = company.Country,
                    Comments = company.Comments,
                    Rating = company.Rating,
                    Research = company.Research,
                    Experience = company.Experience,
                    Employees = company.Employees
                };

                clientRow.Companies.Add(companyData);
            }

            return Ok(tableData);
        }
        // GET: api/companies/export-table
        [HttpPost("export-final")]
        public async Task<ActionResult<List<TableData>>> ExportFinalData([FromQuery] int clientId, [FromBody] List<int> companyIds)
        {
            var client = await _context.Clients.FindAsync(clientId);

            if (client == null)
            {
                return NotFound("Client not found.");
            }

            var companies = await _context.Companies
                .Where(c => companyIds.Contains(c.Id))
                .ToListAsync();

            var tableData = new List<TableData>();

            // Add client row
            var clientRow = new TableData
            {
                ClientName = client.Name,
                Companies = new List<Company>()
            };

            tableData.Add(clientRow);

            // Add company rows
            foreach (var company in companies)
            {
                var companyData = new Company
                {
                    Name = company.Name,
                    Salutation = company.Salutation,
                    ContactName = company.ContactName,
                    Pusto = company.Pusto,
                    Email = company.Email,
                    WebPage = company.WebPage,
                    Phone = company.Phone,
                    Mobile = company.Mobile,
                    Address = company.Address,
                    City = company.City,
                    Country = company.Country,
                    Comments = company.Comments,
                };

                clientRow.Companies.Add(companyData);
            }

            return Ok(tableData);
        }
    }
}

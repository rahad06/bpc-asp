using System.ComponentModel.DataAnnotations;
namespace ASPBPCPANELALPHA.Models;

public class Company
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public int IndustryId { get; set; } // Foreign key for Industry
    public Industry? Industry { get; set; } // Navigation property


    public string ContactName { get; set; }
    public string Pusto { get; set; }

    public string Salutation { get; set; }

    public string Mobile { get; set; }

    public string Phone { get; set; }

    public string Email { get; set; }

    public string WebPage { get; set; }

    public string Address { get; set; }

    public string Comments { get; set; }

    public int? Employees { get; set; }

    public string Experience { get; set; }

    public string RegistroMercantil { get; set; }

    public string IdentificacionNacional { get; set; }
}
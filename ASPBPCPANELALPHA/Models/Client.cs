using System;
using System.ComponentModel.DataAnnotations;

namespace ASPBPCPANELALPHA.Models;

public class Client
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    public string? Website { get; set; }

    public string? Representative { get; set; }


    public int? IndustryId { get; set; } // Foreign key for Industry
    public int? AgendaId { get; set; } // Foreign key for agenda
    public Industry? Industry { get; set; } // Navigation property
    public Agenda? Agenda { get; set; } 
}


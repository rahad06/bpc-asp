using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace ASPBPCPANELALPHA.Models;

public class Industry
{
    [Key]
    public int Id { get; set; }

    public string Name { get; set; }

    public ICollection<Company>? Companies { get; set; }
}
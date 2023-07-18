using System.ComponentModel.DataAnnotations;

namespace ASPBPCPANELALPHA.Models;

public class Interpreter
{
    [Key]
    public int Id { get; set; }

    public string Name { get; set; }

    public ICollection<Meeting>? Meetings { get; set; }
}
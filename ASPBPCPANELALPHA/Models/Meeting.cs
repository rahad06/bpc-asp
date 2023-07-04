using System.ComponentModel.DataAnnotations;

namespace ASPBPCPANELALPHA.Models;

public class Meeting
{
    public int MeetingId { get; set; }
    public int ClientId { get; set; }
    public int CompanyId { get; set; }
    public DateTime MeetingDate { get; set; }
    public int MeetingStatusId { get; set; } // Foreign key to MeetingStatus

    // Navigation properties
    public Client? Client { get; set; }
    public Company? Company { get; set; }
    public MeetingStatus? MeetingStatus { get; set; }

    public string? CompanyName { get; set; }

    [DataType(DataType.Time)]
    public TimeSpan SpainTime { get; set; }

    [DataType(DataType.Time)]
    public TimeSpan IranTime { get; set; }
}
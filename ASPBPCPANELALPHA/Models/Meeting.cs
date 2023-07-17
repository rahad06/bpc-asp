using System.ComponentModel.DataAnnotations;

namespace ASPBPCPANELALPHA.Models;

public class Meeting
{
    public int MeetingId { get; set; }
    public int ClientId { get; set; }
    public int CompanyId { get; set; }
    [DataType(DataType.Date)]
    public DateTime MeetingDate { get; set; }
    public int MeetingStatusId { get; set; } // Foreign key to MeetingStatus

    // Navigation properties
    public Client? Client { get; set; }
    public Company? Company { get; set; }
    public MeetingStatus? MeetingStatus { get; set; }

    public string? Interpreter { get; set; }

    [DataType(DataType.Time)]
    [DisplayFormat(DataFormatString = "{0:HH:mm}", ApplyFormatInEditMode = true)]
    public string? SpainTime { get; set; }

    [DataType(DataType.Time)]
    [DisplayFormat(DataFormatString = "{0:HH:mm}", ApplyFormatInEditMode = true)]
    public string? IranTime { get; set; }

    // Convert MeetingDate to UTC before saving to the database
    public DateTimeOffset MeetingDateUtc => new DateTimeOffset(MeetingDate, TimeSpan.Zero);
}
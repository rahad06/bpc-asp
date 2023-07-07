using System.ComponentModel.DataAnnotations;

namespace ASPBPCPANELALPHA.Models;

public class MeetingStatus
{
    public const string Confirmed = "Confirmed";
    public const string PendingHour = "Confirmed Pending Hour";
    public const string PendingDate = "Pending Conf. Date And Time";
    public const string Probably = "Probably Wont be Confirmed";
    public const string Cancelled = "Cancelled in Last Minute";
    public const string Pending = "Pending";
    public const string InProgress = "In Progress";
    public const string Done = "Done";

    public int MeetingStatusId { get; set; }

    [Required]
    public string Status { get; set; }

    public List<Meeting> Meetings { get; set; } // Navigation property
}
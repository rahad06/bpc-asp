using System.ComponentModel.DataAnnotations;

namespace ASPBPCPANELALPHA.Models;

public class MeetingStatus
{
    public const string Pending = "Pending";
    public const string InProgress = "In Progress";
    public const string Done = "Done";

    public int MeetingStatusId { get; set; }

    [Required]
    public string Status { get; set; }

    public List<Meeting> Meetings { get; set; } // Navigation property
}
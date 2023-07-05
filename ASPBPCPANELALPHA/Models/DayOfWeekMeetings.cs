namespace ASPBPCPANELALPHA.Models;

public class DayOfWeekMeetings
{
    public int Id { get; set; } // Add ID property

    public string? DayOfWeek { get; set; }
    public List<Meeting>? Meetings { get; set; }
}

   

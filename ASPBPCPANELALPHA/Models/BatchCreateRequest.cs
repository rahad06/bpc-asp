namespace ASPBPCPANELALPHA.Models;

public class BatchCreateRequest
{
    public List<Company> Companies { get; set; }
    public List<Client> Clients { get; set; }
    public List<MeetingStatus> MeetingStatuses { get; set; }
    public List<Meeting> Meetings { get; set; }
}

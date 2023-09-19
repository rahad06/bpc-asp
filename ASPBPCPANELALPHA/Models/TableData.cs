namespace ASPBPCPANELALPHA.Models;
public class TableData
{
    public string ClientName { get; set; }
    public Agenda? Agenda { get; set; }
    public List<Company> Companies { get; set; }
}
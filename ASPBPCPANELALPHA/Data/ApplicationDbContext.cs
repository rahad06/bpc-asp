using ASPBPCPANELALPHA.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ASPBPCPANELALPHA.Data;

public class ApplicationDbContext : IdentityDbContext<IdentityUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Company> Companies { get; set; }
    public DbSet<Industry> Industries { get; set; }
    public DbSet<Client> Clients { get; set; }
    public DbSet<MeetingStatus> MeetingStatuses { get; set; }
    public DbSet<Meeting> Meetings { get; set; }
    public DbSet<DayOfWeekMeetings> DayOfWeekMeetings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Seed meeting statuses
        modelBuilder.Entity<MeetingStatus>().HasData(
            new MeetingStatus { MeetingStatusId = 1, Status = MeetingStatus.Confirmed },
            new MeetingStatus { MeetingStatusId = 2, Status = MeetingStatus.Pending },
            new MeetingStatus { MeetingStatusId = 3, Status = MeetingStatus.InProgress },
            new MeetingStatus { MeetingStatusId = 4, Status = MeetingStatus.Done },
            new MeetingStatus { MeetingStatusId = 5, Status = MeetingStatus.PendingHour },
            new MeetingStatus { MeetingStatusId = 6, Status = MeetingStatus.PendingDate },
            new MeetingStatus { MeetingStatusId = 7, Status = MeetingStatus.Probably },
            new MeetingStatus { MeetingStatusId = 8, Status = MeetingStatus.Cancelled }
        );

        // Configure the Company-Industry relationship
        modelBuilder.Entity<Company>()
            .HasOne(c => c.Industry)
            .WithMany(i => i.Companies)
            .HasForeignKey(c => c.IndustryId);

        // Seed days of the week
        modelBuilder.Entity<DayOfWeekMeetings>().HasData(
            new DayOfWeekMeetings { Id = 1, DayOfWeek = "Monday" },
            new DayOfWeekMeetings { Id = 2, DayOfWeek = "Tuesday" },
            new DayOfWeekMeetings { Id = 3, DayOfWeek = "Wednesday" },
            new DayOfWeekMeetings { Id = 4, DayOfWeek = "Thursday" },
            new DayOfWeekMeetings { Id = 5, DayOfWeek = "Friday" },
            new DayOfWeekMeetings { Id = 6, DayOfWeek = "Saturday" },
            new DayOfWeekMeetings { Id = 7, DayOfWeek = "Sunday" }
        );

        base.OnModelCreating(modelBuilder);
    }
}
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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Seed meeting statuses
        modelBuilder.Entity<MeetingStatus>().HasData(
            new MeetingStatus { MeetingStatusId = 1, Status = MeetingStatus.Pending },
            new MeetingStatus { MeetingStatusId = 2, Status = MeetingStatus.InProgress },
            new MeetingStatus { MeetingStatusId = 3, Status = MeetingStatus.Done }
        );

        // Configure the Company-Industry relationship
        modelBuilder.Entity<Company>()
            .HasOne(c => c.Industry)
            .WithMany(i => i.Companies)
            .HasForeignKey(c => c.IndustryId);

        base.OnModelCreating(modelBuilder);
    }
}
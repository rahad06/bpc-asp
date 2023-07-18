﻿// <auto-generated />
using System;
using ASPBPCPANELALPHA.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ASPBPCPANELALPHA.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230718054433_InterpretorModel")]
    partial class InterpretorModel
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("ASPBPCPANELALPHA.Models.Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("IndustryId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Representative")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Website")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("IndustryId");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("ASPBPCPANELALPHA.Models.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Comments")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ContactName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("Employees")
                        .HasColumnType("integer");

                    b.Property<string>("Experience")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("IdentificacionNacional")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("IndustryId")
                        .HasColumnType("integer");

                    b.Property<string>("Mobile")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Pusto")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("RegistroMercantil")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Salutation")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("WebPage")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("IndustryId");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("ASPBPCPANELALPHA.Models.DayOfWeekMeetings", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("DayOfWeek")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("DayOfWeekMeetings");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DayOfWeek = "Monday"
                        },
                        new
                        {
                            Id = 2,
                            DayOfWeek = "Tuesday"
                        },
                        new
                        {
                            Id = 3,
                            DayOfWeek = "Wednesday"
                        },
                        new
                        {
                            Id = 4,
                            DayOfWeek = "Thursday"
                        },
                        new
                        {
                            Id = 5,
                            DayOfWeek = "Friday"
                        },
                        new
                        {
                            Id = 6,
                            DayOfWeek = "Saturday"
                        },
                        new
                        {
                            Id = 7,
                            DayOfWeek = "Sunday"
                        });
                });

            modelBuilder.Entity("ASPBPCPANELALPHA.Models.Industry", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Industries");
                });

            modelBuilder.Entity("ASPBPCPANELALPHA.Models.Interpreter", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Interpreters");
                });

            modelBuilder.Entity("ASPBPCPANELALPHA.Models.Meeting", b =>
                {
                    b.Property<int>("MeetingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("MeetingId"));

                    b.Property<int>("ClientId")
                        .HasColumnType("integer");

                    b.Property<int>("CompanyId")
                        .HasColumnType("integer");

                    b.Property<int?>("DayOfWeekMeetingsId")
                        .HasColumnType("integer");

                    b.Property<string>("Interpreter")
                        .HasColumnType("text");

                    b.Property<int?>("InterpreterId")
                        .HasColumnType("integer");

                    b.Property<string>("IranTime")
                        .HasColumnType("text");

                    b.Property<DateTime>("MeetingDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("MeetingStatusId")
                        .HasColumnType("integer");

                    b.Property<string>("SpainTime")
                        .HasColumnType("text");

                    b.HasKey("MeetingId");

                    b.HasIndex("ClientId");

                    b.HasIndex("CompanyId");

                    b.HasIndex("DayOfWeekMeetingsId");

                    b.HasIndex("InterpreterId");

                    b.HasIndex("MeetingStatusId");

                    b.ToTable("Meetings");
                });

            modelBuilder.Entity("ASPBPCPANELALPHA.Models.MeetingStatus", b =>
                {
                    b.Property<int>("MeetingStatusId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("MeetingStatusId"));

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("MeetingStatusId");

                    b.ToTable("MeetingStatuses");

                    b.HasData(
                        new
                        {
                            MeetingStatusId = 1,
                            Status = "Confirmed"
                        },
                        new
                        {
                            MeetingStatusId = 2,
                            Status = "Pending"
                        },
                        new
                        {
                            MeetingStatusId = 3,
                            Status = "In Progress"
                        },
                        new
                        {
                            MeetingStatusId = 4,
                            Status = "Done"
                        },
                        new
                        {
                            MeetingStatusId = 5,
                            Status = "Confirmed Pending Hour"
                        },
                        new
                        {
                            MeetingStatusId = 6,
                            Status = "Pending Conf. Date And Time"
                        },
                        new
                        {
                            MeetingStatusId = 7,
                            Status = "Probably Wont be Confirmed"
                        },
                        new
                        {
                            MeetingStatusId = 8,
                            Status = "Cancelled in Last Minute"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("text");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .HasColumnType("text");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("ASPBPCPANELALPHA.Models.Client", b =>
                {
                    b.HasOne("ASPBPCPANELALPHA.Models.Industry", "Industry")
                        .WithMany()
                        .HasForeignKey("IndustryId");

                    b.Navigation("Industry");
                });

            modelBuilder.Entity("ASPBPCPANELALPHA.Models.Company", b =>
                {
                    b.HasOne("ASPBPCPANELALPHA.Models.Industry", "Industry")
                        .WithMany("Companies")
                        .HasForeignKey("IndustryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Industry");
                });

            modelBuilder.Entity("ASPBPCPANELALPHA.Models.Meeting", b =>
                {
                    b.HasOne("ASPBPCPANELALPHA.Models.Client", "Client")
                        .WithMany()
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ASPBPCPANELALPHA.Models.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ASPBPCPANELALPHA.Models.DayOfWeekMeetings", null)
                        .WithMany("Meetings")
                        .HasForeignKey("DayOfWeekMeetingsId");

                    b.HasOne("ASPBPCPANELALPHA.Models.Interpreter", null)
                        .WithMany("Meetings")
                        .HasForeignKey("InterpreterId");

                    b.HasOne("ASPBPCPANELALPHA.Models.MeetingStatus", "MeetingStatus")
                        .WithMany("Meetings")
                        .HasForeignKey("MeetingStatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Client");

                    b.Navigation("Company");

                    b.Navigation("MeetingStatus");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ASPBPCPANELALPHA.Models.DayOfWeekMeetings", b =>
                {
                    b.Navigation("Meetings");
                });

            modelBuilder.Entity("ASPBPCPANELALPHA.Models.Industry", b =>
                {
                    b.Navigation("Companies");
                });

            modelBuilder.Entity("ASPBPCPANELALPHA.Models.Interpreter", b =>
                {
                    b.Navigation("Meetings");
                });

            modelBuilder.Entity("ASPBPCPANELALPHA.Models.MeetingStatus", b =>
                {
                    b.Navigation("Meetings");
                });
#pragma warning restore 612, 618
        }
    }
}

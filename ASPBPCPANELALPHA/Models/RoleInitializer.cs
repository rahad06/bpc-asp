using Microsoft.AspNetCore.Identity;

public class RoleInitializer
{
    private readonly RoleManager<IdentityRole> _roleManager;

    public RoleInitializer(RoleManager<IdentityRole> roleManager)
    {
        _roleManager = roleManager;
    }

    public async Task CreateRoles()
    {
        // Check if the roles already exist in the database
        if (!await _roleManager.RoleExistsAsync("Admin"))
        {
            // Create the "Admin" role
            await _roleManager.CreateAsync(new IdentityRole("Admin"));
        }

        if (!await _roleManager.RoleExistsAsync("LimitedRole"))
        {
            // Create the "LimitedRole" role
            await _roleManager.CreateAsync(new IdentityRole("LimitedRole"));
        }
    }
}
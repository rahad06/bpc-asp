using System.ComponentModel.DataAnnotations;

namespace ASPBPCPANELALPHA.Models
{
    public class UserSignUpModel
    {
        [Required]
        public string UserName { get; set; } = "";
        [Required]
        public string Password { get; set; } = "";
    }
}
using System.ComponentModel.DataAnnotations;

namespace PortionMaking.Models.ApiModels
{
    public class CreateUserApiModel
    {
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Display(Name = "Username")]
        public string Username { get; set; }

        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Confirm password")]
        public string ConfirmPassword { get; set; }
    }
}
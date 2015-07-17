namespace PortionMaking.Infrastructure.Services
{
    public interface IAuthService
    {
        void test();
    }
    public class AuthService: IAuthService
    {
        public void test()
        {
            throw new System.NotImplementedException();
        }
    }
}
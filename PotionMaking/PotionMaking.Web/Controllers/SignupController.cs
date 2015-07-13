using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PotionMaking.Web.Controllers
{
    public class SignupController : ApiController
    {
        // GET: api/Signup
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Signup/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Signup
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Signup/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Signup/5
        public void Delete(int id)
        {
        }
    }
}

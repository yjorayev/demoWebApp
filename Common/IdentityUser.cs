using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Security.Claims;
using System.Text;

namespace Common
{
    [DataContract]
    public class IdentityUser
    {
        [DataMember]
        public string SubjectID { get; set; }

        [DataMember]
        public string UserName { get; set; }

        [DataMember]
        public IEnumerable<Claim> Claims { get; set; }
    }
}

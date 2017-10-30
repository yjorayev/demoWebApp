using Managers.Contracts;
using System;
using System.Security.Claims;
using System.Collections.Generic;
using Common;

namespace Managers
{
    public class UserAccountManager : IUserAccountManager
    {
        public IdentityUser FindByCredentials(string userName, string password)
        {
            //get user from db or whereever
            //also needs to check if password is correct
            if (userName == "alice" && password == "password")
            {
                var user = new User()
                {
                    FirstName = "Alice",
                    LastName = "Smith",
                    CreateDate = new DateTime(2012, 12, 12),
                    Email = "asmuth@nomail.com",
                    LastLogin = DateTime.Now,
                    UserName = "alice"
                };

                return TransformUser(user);
            }
            throw new Exception("No match for username and password");
        }

        public IdentityUser FindByExternalProvider(string provider, string userId)
        {
            //this is where user is matched from external provider to native user db
            throw new NotImplementedException();
        }

        public IdentityUser AutoProvisionUser(string provider, string userId, IEnumerable<Claim> claims)
        {
            throw new NotImplementedException();
        }

        protected Common.IdentityUser TransformUser(User user)
        {
            return new IdentityUser
            {
                UserName = user.UserName,
                SubjectID = TransformSubjectIDClaim(user),
                Claims = TransformClaims(user)
            };
        }

        protected IEnumerable<Claim> TransformClaims(User user)
        {
            var claims = new List<Claim>();
            AddToClaimsIfPresent(claims, "sub", TransformSubjectIDClaim(user));
            AddToClaimsIfPresent(claims, "name", $"{ user.FirstName} { user.LastName }");
            AddToClaimsIfPresent(claims, "given_name", user.FirstName);
            AddToClaimsIfPresent(claims, "family_name", user.LastName);
            AddToClaimsIfPresent(claims, "email", user.Email);
            //AddToClaimsIfPresent(claims, "email_verified", user.UserValidated == "Y" ? "true" : "false");
            //AddToClaimsIfPresent(claims, "address", TransformAddressClaim(user));
            //AddToClaimsIfPresent(claims, CustomClaimTypes.CompanyName, user.Company.Name);
            //AddToClaimsIfPresent(claims, CustomClaimTypes.CompanyId, user.CompanyID.ToString());
            
            return claims;
        }

        protected static string TransformSubjectIDClaim(User user)
        {
            return user.UserName;
        }

        private static void AddToClaimsIfPresent(IList<Claim> claims, string claimType, string value)
        {
            if (!string.IsNullOrEmpty(value))
                claims.Add(new Claim(claimType, value));
        }
    }
}

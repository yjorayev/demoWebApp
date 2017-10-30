using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace demoIdentityServer
{
    public static class Config
    {
        public static List<TestUser> GetUsers()
        {
            return new List<TestUser>()
            {
                new TestUser()
                {
                    SubjectId = Guid.NewGuid().ToString(),
                    Username = "Foo",
                    Password = "Bar",
                    Claims = new List<Claim>
                    {
                        new Claim("name", "Foo"),
                        new Claim("lastname", "bar")
                    }
                },
                new TestUser()
                {
                    SubjectId = Guid.NewGuid().ToString(),
                    Username = "John",
                    Password = "Doe",
                    Claims = new List<Claim>
                    {
                        new Claim("name", "John"),
                        new Claim("lastname", "Doe")
                    }
                }
            };
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile()
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>()
            {
                new Client()
                {
                    ClientName = "demo",
                    ClientId = "auth:oidc:clientid",
                    AllowedGrantTypes = GrantTypes.Hybrid,
                    RedirectUris = new List<string>()
                    {
                        "https://localhost:44373/signin-oidc"
                    },
                    PostLogoutRedirectUris = { "http://localhost:5002/signout-callback-oidc" },
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile
                    }
                }
            };
        }
    }
}

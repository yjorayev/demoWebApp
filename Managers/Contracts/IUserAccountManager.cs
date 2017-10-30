using Common;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Managers.Contracts
{
    public interface IUserAccountManager
    {
        IdentityUser FindByCredentials(string userName, string password);

        IdentityUser FindByExternalProvider(string provider, string userId);

        IdentityUser AutoProvisionUser(string provider, string userId, IEnumerable<Claim> claims);
    }
}

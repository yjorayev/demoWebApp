using System.Threading.Tasks;
using IdentityServer4.Validation;

namespace IDP
{
    internal class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        public Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            throw new System.NotImplementedException();
        }
    }
}
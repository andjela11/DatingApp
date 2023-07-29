using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            //next respresents the action that happens, endpoint call
            //and we can do something before the action or after the action finishes
            var resultContext = await next();
            //wait for the API to finish and then update last active

            if(!resultContext.HttpContext.User.Identity.IsAuthenticated) return;

            var userId = resultContext.HttpContext.User.GetUserId();

            var repo = resultContext.HttpContext.RequestServices.GetRequiredService<IUserRepository>();

            var user = await repo.GetUserByIdAsync(userId);

            user.LastActive = DateTime.UtcNow;
            await repo.SaveAllAsync();
        }
    }
}
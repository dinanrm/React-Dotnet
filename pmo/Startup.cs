using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Linq;
using pmo.Models;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;

namespace pmo
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            });
            services.AddCors(
                options =>
                {
                    options.AddPolicy("_myAllowSpecificOrigins",
                    builder => builder
                        .WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowAnyOrigin()
                        .AllowCredentials()
                        );
                }
            );
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            services.AddDbContext<pmo_dbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("pmo_db")));

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = "PMO";
            })
            .AddCookie()
            .AddJwtBearer()
            .AddOAuth("PMO", options =>
            {
                options.ClientId = Configuration["PMO:ClientId"];
                options.ClientSecret = Configuration["PMO:ClientSecret"];
                options.AuthorizationEndpoint = Configuration["PMO:AuthenticationURI"];
                options.TokenEndpoint = Configuration["PMO:TokenURI"];
                options.UserInformationEndpoint = Configuration["PMO:TokenValidationScope"];
                options.CallbackPath = new PathString("/auth/callback");

                options.ClaimActions.MapJsonKey("scope_data", "scope_data");
                options.ClaimActions.MapJsonKey(ClaimTypes.Name, "username");

                options.Events = new OAuthEvents
                {
                    OnCreatingTicket = async context =>
                    {
                        var nvc = new List<KeyValuePair<string, string>>
                        {
                            new KeyValuePair<string, string>("token", context.AccessToken),
                            new KeyValuePair<string, string>("resource_server_id", Configuration["PMO:ResourceServerId"]),
                            new KeyValuePair<string, string>("resource_server_secret", Configuration["PMO:ServerSecret"])
                        };
                        var client = new HttpClient();
                        var req = new HttpRequestMessage(HttpMethod.Post, context.Options.UserInformationEndpoint) { Content = new FormUrlEncodedContent(nvc) };
                        var response = await client.SendAsync(req);

                        response.EnsureSuccessStatusCode();

                        var user = JObject.Parse(await response.Content.ReadAsStringAsync());

                        context.RunClaimActions(user);
                    },
                    OnRemoteFailure = ctx =>
                    {
                        // React to the error here. See the notes below.
                        return Task.CompletedTask;
                    }
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.Use((context, next) =>
            {
                context.Request.Scheme = "https";
                return next();
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors(builder =>
            {
                builder
                .WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                //.AllowAnyOrigin()
                .AllowCredentials();
            });

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseForwardedHeaders();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}

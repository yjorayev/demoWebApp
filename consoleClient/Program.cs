﻿using IdentityModel.Client;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace consoleClient
{
    class Program
    {
        public static void Main(string[] args) => MainAsync().GetAwaiter().GetResult();
        

        public static async Task MainAsync()
        {
            var disco = await DiscoveryClient.GetAsync("http://localhost:5000");
            if (disco.IsError)
            {
                Console.WriteLine(disco.Error);
                return;
            }

            var tokenClient = new TokenClient(disco.TokenEndpoint, "ro.client", "secret");
            var tokenResponse = await tokenClient.RequestResourceOwnerPasswordAsync("alice", "password", "api");

            if (tokenResponse.IsError)
            {
                Console.WriteLine(tokenResponse.Error);
                return;
            }
            Console.WriteLine(tokenResponse.Json);

            var client = new HttpClient();
            client.SetBearerToken(tokenResponse.AccessToken);

            var response = await client.GetAsync("http://localhost:5001/identity");
            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine(response.StatusCode);
            }
            else
            {
                var content = await response.Content.ReadAsStringAsync();
                Console.WriteLine(JArray.Parse(content));
            }
        }
    }
}

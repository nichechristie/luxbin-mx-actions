namespace LuxbinMxActions.Services;

using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

/// <summary>
/// AI integration via OpenAI API. Reads OPENAI_API_KEY from environment.
/// Falls back to mocked responses if the key is missing or the call fails.
/// </summary>
public class AiService
{
    private static readonly HttpClient Client = new();
    private static readonly String? ApiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");

    public String Refactor(String code)
    {
        return Call(
            $"Refactor this code. Be concise. Return only the improved code.\n\n{code}",
            "Refactored: extracted method, removed dead code, improved naming.");
    }

    public String Summarize(String content)
    {
        return Call(
            $"Summarize this in one sentence.\n\n{content}",
            "Summary: This module handles user authentication with JWT tokens and session management.");
    }

    private String Call(String prompt, String fallback)
    {
        if (String.IsNullOrEmpty(ApiKey))
            return fallback;

        try
        {
            var body = JsonSerializer.Serialize(new
            {
                model = "gpt-4o-mini",
                temperature = PluginState.Temperature,
                max_tokens = 200,
                messages = new[]
                {
                    new { role = "user", content = prompt }
                }
            });

            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
            {
                Content = new StringContent(body, Encoding.UTF8, "application/json")
            };
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", ApiKey);

            var response = Client.Send(request);
            var json = JsonDocument.Parse(response.Content.ReadAsStream());
            return json.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString() ?? fallback;
        }
        catch
        {
            return fallback;
        }
    }
}

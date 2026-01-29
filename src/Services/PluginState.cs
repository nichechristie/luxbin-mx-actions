namespace LuxbinMxActions.Services;

/// <summary>
/// Shared state across plugin actions. Temperature is set by the dial
/// and read by AI commands so the creativity level affects responses.
/// </summary>
public static class PluginState
{
    public static Double Temperature { get; set; } = 0.5;
}

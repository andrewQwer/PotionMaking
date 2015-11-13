namespace PortionMaking.Infrastructure.Settings
{
    public interface ISettingsProvider
    {
        SettingsBase PopulateSettings(SettingsBase instance);
    }
}
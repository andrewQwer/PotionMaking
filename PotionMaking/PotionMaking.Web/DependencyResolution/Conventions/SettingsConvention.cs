using System;
using PortionMaking.Infrastructure.Settings;
using StructureMap.Configuration.DSL;
using StructureMap.Graph;

namespace PotionMaking.Web.DependencyResolution.Conventions
{
    public class SettingsConvention : IRegistrationConvention
    {
        public void Process(Type type, Registry registry)
        {
            if (!type.Name.EndsWith("Settings") || !typeof(SettingsBase).IsAssignableFrom(type)) return;

            registry
                .For<SettingsBase>()
                .OnCreationForAll("fill properties from provider",
                    (ctx, original) => ctx.GetInstance<ISettingsProvider>().PopulateSettings(original));
        }
    }
}
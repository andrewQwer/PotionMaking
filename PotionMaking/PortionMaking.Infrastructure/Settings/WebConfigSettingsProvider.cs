using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Reflection;

namespace PortionMaking.Infrastructure.Settings
{
    public class WebConfigSettingsProvider : ISettingsProvider
    {
        public Settings.SettingsBase PopulateSettings(Settings.SettingsBase instance)
        {
            var type = instance.GetType();
            var prefix = type.Name + ".";

            var props = type.GetProperties(BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly)
                            .Where(x => x.CanWrite);

            foreach (var pi in props)
            {
                try
                {
                    var value = ConfigurationManager.AppSettings[prefix + pi.Name];
                    if (value == null)
                    {
                        instance.AddProblem(new ConvertProblem
                        {
                            PropertyName = pi.Name,
                            Exception = new Exception(
                                                string.Format("Property [{0}{1}] not found in web.config", prefix, pi.Name))
                        });
                    }

                    // convert object to property type
                    var converted = GetConvertedValue(pi, value);

                    pi.SetValue(instance, converted, null);
                }
                catch (Exception e)
                {
                    // silently add convert problem to instance
                    // so you can debug it in runtime
                    instance.AddProblem(new ConvertProblem
                    {
                        PropertyName = pi.Name,
                        Exception = e
                    });
                }
            }

            return instance;
        }

        #region Value convertion

        private object GetConvertedValue(PropertyInfo pi, string value)
        {
            var type = pi.PropertyType;
            if (type == typeof(string))
                return value;

            if (type == typeof(bool) ||
                type == typeof(bool?))
                return bool.Parse(value);

            if (type == typeof(int) ||
                type == typeof(int?))
                return int.Parse(value);

            if (type == typeof(long) ||
                type == typeof(long?))
                return long.Parse(value);

            //todo setup culture when variables of this types will be used in web.config
            if (type == typeof(decimal) ||
                type == typeof(decimal?))
                return decimal.Parse(value);

            //todo setup culture when variables of this types will be used in web.config
            if (type == typeof(DateTime) ||
                type == typeof(DateTime?))
                return DateTime.Parse(value);

            if (type == typeof(string[]) ||
                type == typeof(IEnumerable<string>))
                return value == null
                           ? null
                           : value.Split(';');

            throw new Exception("Can't convert property type: " + pi.PropertyType);
        }

        #endregion
    }
}
// --------------------------------------------------------------------------------------------------------------------
// <copyright file="DefaultRegistry.cs" company="Web Advanced">
// Copyright 2012 Web Advanced (www.webadvanced.com)
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

using MediatR;
using Microsoft.Practices.ServiceLocation;
using PortionMaking.Infrastructure.Services;
using PotionMaking.Web.App_Start;
using StructureMap.Configuration.DSL;

namespace PotionMaking.Web.DependencyResolution.Registries {
    public class ServiceRegistry : Registry {
        #region Constructors and Destructors

        public ServiceRegistry() {
            Scan(
                scanner => {
                    scanner.AssemblyContainingType<AuthService>();
                    scanner.AssemblyContainingType<IMediator>();
                    scanner.WithDefaultConventions();
                    scanner.ConnectImplementationsToTypesClosing(typeof(IRequestHandler<,>));
                    scanner.ConnectImplementationsToTypesClosing(typeof(IAsyncRequestHandler<,>));
                    scanner.ConnectImplementationsToTypesClosing(typeof(INotificationHandler<>));
                    scanner.ConnectImplementationsToTypesClosing(typeof(IAsyncNotificationHandler<>));
                });

            For<ServiceLocatorProvider>().Use(new ServiceLocatorProvider(() => StructuremapMvc.StructureMapDependencyScope));
        }

        #endregion
    }
}
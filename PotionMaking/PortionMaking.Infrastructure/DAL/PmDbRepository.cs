using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using EntityFramework.Extensions;

namespace PortionMaking.Infrastructure.DAL
{
    public class PmDbRepository<T> : IRepository<T> where T : class
    {
        private readonly PmDbContext context;

        protected DbSet<T> Set
        {
            get { return context.Set<T>(); }
        }

        public PmDbRepository(PmDbContext context)
        {
            this.context = context;
        }

        public T Get(params object[] id)
        {
            var item = Set.Find(id);
            return item;
        }

        public void Add(T entity)
        {
            Set.Add(entity);
            context.SaveChanges();
        }

        public void AddRange(IEnumerable<T> entities)
        {
            Set.AddRange(entities);
            context.SaveChanges();
        }

        public void Update(T entity)
        {
            Set.Attach(entity);
            context.Entry(entity).State = EntityState.Modified;
            context.SaveChanges();
        }

        public void Save(T entity)
        {
            var entry = context.Entry(entity);
            if (entry.State == EntityState.Detached)
            {
                Set.Add(entity);
            }
            context.SaveChanges();
        }

        public void Remove(T entity)
        {
            if (context.Entry(entity).State == EntityState.Detached)
            {
                Set.Attach(entity);
            }
            Set.Remove(entity);
            context.SaveChanges();
        }

        public IQueryable<T> Query()
        {
            return Set.AsQueryable();
        }

        public void Update(Expression<Func<T, T>> updateExpr, Expression<Func<T, bool>> filterExpr = null)
        {
            if (filterExpr == null)
            {
                Set.Update(updateExpr);
            }
            else
            {
                Set.Update(filterExpr, updateExpr);
            }
        }

        public void Remove(Expression<Func<T, bool>> filterExpr = null)
        {
            if (filterExpr == null)
            {
                Set.Delete();
            }
            else
            {
                Set.Delete(filterExpr);
            }
        }
    }
}
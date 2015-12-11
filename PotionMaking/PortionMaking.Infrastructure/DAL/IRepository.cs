using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace PortionMaking.Infrastructure.DAL
{
    public interface IRepository<T>
    {
        void Add(T entity);
        void AddRange(IEnumerable<T> entities);
        void Update(T entity);
        void Save(T entity);
        void Remove(T entity);
        IQueryable<T> Query();
        void Update(Expression<Func<T, T>> updateExpr, Expression<Func<T, bool>> filterExpr = null);
        void Remove(Expression<Func<T, bool>> filterExpr = null);
    }
}

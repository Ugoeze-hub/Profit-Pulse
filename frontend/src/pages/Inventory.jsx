import React, { useMemo, useState } from 'react';
import { FiSearch, FiFilter, FiHeart } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';


const Inventory = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | low | in-stock

  const [items] = useState([
    { id: 1, name: 'Indomie Noodles (Carton)', quantityLeft: 12, lowStockThreshold: 10 },
    { id: 2, name: 'Pure Water (20 Packs)', quantityLeft: 32, lowStockThreshold: 10 },
    { id: 3, name: 'Rice Bags (50kg)', quantityLeft: 7, lowStockThreshold: 10 },
    { id: 4, name: 'Soft Drinks (Case)', quantityLeft: 20, lowStockThreshold: 10 },
    { id: 5, name: 'Tomato Paste', quantityLeft: 5, lowStockThreshold: 10 },
  ]);


  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return items.filter((it) => {
      if (filter === 'low' && !(it.quantityLeft <= it.lowStockThreshold)) return false;
      if (filter === 'in-stock' && !(it.quantityLeft > it.lowStockThreshold)) return false;

      if (!q) return true;
      return it.name.toLowerCase().includes(q);
    });
  }, [items, search, filter]);



  return (
    <DashboardLayout title="Inventory">
      <div className="space-y-6">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">Stock overview</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Goods and quantity left</h2>
              <p className="mt-3 max-w-2xl text-slate-600">Search your items and spot low stock.</p>

            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="relative">
                <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  placeholder="Search goods"
                  className="input pl-12"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setFilter((prev) => {
                    if (prev === 'all') return 'low';
                    if (prev === 'low') return 'in-stock';
                    return 'all';
                  });
                }}
                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
              >
                <FiFilter />
                {filter === 'all' ? 'All' : filter === 'low' ? 'Low stock' : 'In stock'}
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Items</h3>
              <p className="text-sm text-slate-500">Showing {filtered.length} item{filtered.length === 1 ? '' : 's'}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-sm text-slate-500">
                  <th className="py-3 pr-4">Good</th>
                  <th className="py-3 pr-4">Quantity left</th>
                  <th className="py-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.length ? (
                  filtered.map((it) => {
                    const isLow = it.quantityLeft <= it.lowStockThreshold;
                    return (
                      <tr key={it.id} className="align-middle">
                        <td className="py-4 pr-4">
                          <div className="font-semibold text-slate-900">{it.name}</div>
                        </td>
                        <td className="py-4 pr-4">
                          <div className="text-slate-900 font-semibold text-lg">{it.quantityLeft}</div>
                        </td>
                        <td className="py-4 pr-4">
                          <span
                            className={
                              isLow
                                ? 'inline-flex items-center rounded-full bg-[#ffedd5] px-3 py-1 text-sm font-semibold text-warning'
                                : 'inline-flex items-center rounded-full bg-[#d1fae5] px-3 py-1 text-sm font-semibold text-primary'
                            }
                          >
                            {isLow ? 'Low' : 'Healthy'}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                           
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-sm text-slate-500">
                      No items match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Inventory;


import React, { useState } from 'react';
import { Bell, TrendingUp, DollarSign, Package, CheckCircle, Clock, BarChart3, Settings, History, LayoutDashboard, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Order, OrderStatus } from '../../../shared/types';

interface AdminDashboardProps {
  orders: Order[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
}

type AdminView = 'dashboard' | 'history' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders, updateOrderStatus }) => {
  const [activeView, setActiveView] = useState<AdminView>('dashboard');

  // Dynamic Chart Data Calculation based on real orders
  const baseData = [
    { name: 'Lun', sales: 400 },
    { name: 'Mar', sales: 300 },
    { name: 'Mie', sales: 600 },
    { name: 'Jue', sales: 800 },
    { name: 'Vie', sales: 1200 },
    { name: 'Sab', sales: 1500 },
    { name: 'Hoy', sales: 1100 },
  ];

  const chartData = baseData.map(d => {
    if (d.name === 'Hoy') {
      const todayTotal = orders.reduce((sum, o) => sum + o.total, 0);
      return { ...d, sales: d.sales + todayTotal };
    }
    return d;
  });

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0) + 5900;
  const activeOrders = orders.filter(o => o.status !== 'delivered').length;

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-surface-container p-6 rounded-2xl border border-primary/10 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <p className="text-on-surface-variant text-[10px] uppercase tracking-widest font-label">Ventas Totales</p>
                    <h3 className="text-2xl font-headline font-bold text-on-surface">€{totalSales.toFixed(2)}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <TrendingUp size={16} />
                  <span>+12.5% vs ayer</span>
                </div>
              </div>

              <div className="bg-surface-container p-6 rounded-2xl border border-primary/10 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Package size={24} />
                  </div>
                  <div>
                    <p className="text-on-surface-variant text-[10px] uppercase tracking-widest font-label">Pedidos Activos</p>
                    <h3 className="text-2xl font-headline font-bold text-on-surface">{activeOrders}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary text-sm">
                  <Clock size={16} />
                  <span>Promedio 25min</span>
                </div>
              </div>

              <div className="bg-surface-container p-6 rounded-2xl border border-primary/10 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <p className="text-on-surface-variant text-[10px] uppercase tracking-widest font-label">Completados</p>
                    <h3 className="text-2xl font-headline font-bold text-on-surface">{orders.filter(o => o.status === 'delivered').length}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                  <BarChart3 size={16} />
                  <span>Tasa de éxito 98%</span>
                </div>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-surface-container p-8 rounded-2xl border border-primary/10 shadow-xl mb-12">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h3 className="text-xl font-headline text-on-surface">Rendimiento Económico</h3>
                  <p className="text-on-surface-variant text-sm italic">Flujo de caja semanal proyectado</p>
                </div>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg text-sm font-label font-bold hover:brightness-110 transition-all shadow-md">
                    <Download size={18} />
                    <span>Descargar Registro</span>
                  </button>
                  <select className="bg-surface-container-highest border border-primary/20 rounded-lg px-4 py-2 text-sm text-on-surface outline-none">
                    <option>Últimos 7 días</option>
                    <option>Este mes</option>
                  </select>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(205,127,50,0.1)" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--color-on-surface-variant)', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--color-on-surface-variant)', fontSize: 12}} tickFormatter={(val) => `€${val}`} />
                    <Tooltip contentStyle={{backgroundColor: 'var(--color-surface-container-highest)', border: '1px solid var(--color-primary)', borderRadius: '12px'}} />
                    <Area type="monotone" dataKey="sales" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-surface-container rounded-2xl border border-primary/10 overflow-hidden shadow-xl">
              <div className="p-6 border-b border-primary/10 flex justify-between items-center bg-surface-container-low">
                <h3 className="font-headline text-xl text-on-surface">Gestión de Comandas</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-[10px] font-label uppercase tracking-widest text-primary">Canal en vivo</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-primary/5 text-on-surface-variant font-label text-[10px] uppercase tracking-[0.2em]">
                      <th className="py-6 px-8">ID Pedido</th>
                      <th className="py-6 px-8">Cliente</th>
                      <th className="py-6 px-8">Fecha/Hora</th>
                      <th className="py-6 px-8">Total</th>
                      <th className="py-6 px-8">Estado</th>
                      <th className="py-6 px-8 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-on-surface-variant italic">Esperando nuevos pedidos...</td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="hover:bg-surface-bright transition-colors group">
                          <td className="py-6 px-8 font-body font-bold text-primary">#{order.id.slice(0, 6).toUpperCase()}</td>
                          <td className="py-6 px-8 font-body font-medium">{order.customerName}</td>
                          <td className="py-6 px-8 text-sm text-on-surface-variant">{order.timestamp}</td>
                          <td className="py-6 px-8 font-headline font-bold">€{order.total.toFixed(2)}</td>
                          <td className="py-6 px-8">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                              order.status === 'pending' ? 'bg-primary/10 text-primary border border-primary/20' :
                              order.status === 'preparing' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                              order.status === 'ready' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                              'bg-surface-container-highest text-on-surface-variant opacity-50'
                            }`}>
                              {order.status === 'pending' ? 'Pendiente' : 
                               order.status === 'preparing' ? 'En Cocina' : 
                               order.status === 'ready' ? 'Para Entrega' : 'Entregado'}
                            </span>
                          </td>
                          <td className="py-6 px-8 text-right">
                            <div className="flex justify-end gap-2">
                              {order.status === 'pending' && (
                                <button onClick={() => updateOrderStatus(order.id, 'preparing')} className="h-8 px-4 bg-primary text-background text-[10px] font-bold uppercase rounded-full hover:bg-primary-container transition-all">Empezar</button>
                              )}
                              {order.status === 'preparing' && (
                                <button onClick={() => updateOrderStatus(order.id, 'ready')} className="h-8 px-4 bg-green-500 text-white text-[10px] font-bold uppercase rounded-full hover:bg-green-600 transition-all">Listo</button>
                              )}
                              {order.status === 'ready' && (
                                <button onClick={() => updateOrderStatus(order.id, 'delivered')} className="h-8 px-4 border border-primary/30 text-primary text-[10px] font-bold uppercase rounded-full hover:bg-primary/10 transition-all">Entregar</button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case 'history': return <div className="p-20 text-center text-on-surface-variant italic">Historial de transacciones archivado.</div>;
      case 'settings': return <div className="p-20 text-center text-on-surface-variant italic">Configuración del sistema v2.0.4</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-surface-container-lowest border-r border-primary/20 p-8 flex flex-col gap-10 md:sticky md:top-0 md:h-screen z-20">
        <div className="flex items-center gap-3">
          <img src="/assets/images/logo-gold.png" alt="Logo" className="h-10" />
          <h2 className="font-headline text-xl text-primary italic">Admin</h2>
        </div>
        
        <nav className="flex flex-col gap-2">
          <button onClick={() => setActiveView('dashboard')} className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${activeView === 'dashboard' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:bg-surface-container'}`}>
            <LayoutDashboard size={20} /><span className="font-body text-sm font-bold uppercase tracking-widest">Dashboard</span>
          </button>
          <button onClick={() => setActiveView('history')} className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${activeView === 'history' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:bg-surface-container'}`}>
            <History size={20} /><span className="font-body text-sm font-bold uppercase tracking-widest">Historial</span>
          </button>
          <button onClick={() => setActiveView('settings')} className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${activeView === 'settings' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:bg-surface-container'}`}>
            <Settings size={20} /><span className="font-body text-sm font-bold uppercase tracking-widest">Ajustes</span>
          </button>
        </nav>

        <div className="mt-auto pt-10 border-t border-primary/10">
          <div className="flex items-center gap-4 p-4 bg-surface-container rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">M</div>
            <div>
              <p className="text-xs font-bold text-on-surface">Master Admin</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Online</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-grow min-h-screen">
        <nav className="h-20 bg-background/80 backdrop-blur-md border-b border-primary/10 flex items-center justify-between px-6 md:px-12 sticky top-0 z-10">
          <h1 className="font-headline text-xl text-on-surface capitalize">{activeView}</h1>
          <div className="flex items-center gap-6">
            <button className="relative text-on-surface-variant hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-background text-[8px] font-bold flex items-center justify-center rounded-full">3</span>
            </button>
          </div>
        </nav>

        <div className="p-6 md:p-12 max-w-7xl mx-auto w-full animate-fade-in pb-24">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

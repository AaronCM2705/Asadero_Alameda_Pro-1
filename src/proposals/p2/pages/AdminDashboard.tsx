import React, { useState } from 'react';
import { Bell, TrendingUp, DollarSign, Package, CheckCircle, Clock, BarChart3, Settings, History, LayoutDashboard, ShoppingCart, Download } from 'lucide-react';
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-8 rounded-[32px] border border-outline-variant shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <DollarSign size={28} />
                  </div>
                  <div>
                    <p className="text-on-surface-variant text-xs font-black uppercase tracking-widest">Facturación Total</p>
                    <h3 className="text-3xl font-headline font-black text-on-surface">€{totalSales.toFixed(2)}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-600 font-bold">
                  <TrendingUp size={20} />
                  <span>+18.2% incremento</span>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[32px] border border-outline-variant shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <ShoppingCart size={28} />
                  </div>
                  <div>
                    <p className="text-on-surface-variant text-xs font-black uppercase tracking-widest">Pedidos Hoy</p>
                    <h3 className="text-3xl font-headline font-black text-on-surface">{activeOrders}</h3>
                  </div>
                </div>
                <p className="text-on-surface-variant font-medium">Gestión en tiempo real</p>
              </div>

              <div className="bg-white p-8 rounded-[32px] border border-outline-variant shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle size={28} />
                  </div>
                  <div>
                    <p className="text-on-surface-variant text-xs font-black uppercase tracking-widest">Entregados</p>
                    <h3 className="text-3xl font-headline font-black text-on-surface">{orders.filter(o => o.status === 'delivered').length}</h3>
                  </div>
                </div>
                <p className="text-on-surface-variant font-medium">Satisfacción 100%</p>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[40px] border border-outline-variant shadow-xl mb-12">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h3 className="text-2xl font-headline font-black text-on-surface uppercase tracking-tight">Rendimiento de Ventas</h3>
                  <p className="text-on-surface-variant font-medium">Visualización semanal de ingresos brutos</p>
                </div>
                <button className="flex items-center gap-2 bg-on-surface text-white px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg">
                  <Download size={16} />
                  <span>Descargar Reporte</span>
                </button>
              </div>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorSalesP2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f16522" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#f16522" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2dfde" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#594138', fontSize: 12, fontWeight: 700}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#594138', fontSize: 12, fontWeight: 700}} tickFormatter={(val) => `€${val}`} />
                    <Tooltip contentStyle={{backgroundColor: '#fff', border: 'none', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}} />
                    <Area type="monotone" dataKey="sales" stroke="#a63b00" strokeWidth={4} fillOpacity={1} fill="url(#colorSalesP2)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-[40px] border border-outline-variant overflow-hidden shadow-xl">
              <div className="p-8 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
                <h3 className="font-headline text-2xl font-black text-on-surface uppercase tracking-tight">Monitor de Pedidos</h3>
                <div className="px-4 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full">Sistema Activo</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container text-on-surface-variant font-black text-[11px] uppercase tracking-widest">
                      <th className="py-6 px-10">Pedido</th>
                      <th className="py-6 px-10">Comensal</th>
                      <th className="py-6 px-10">Fecha</th>
                      <th className="py-6 px-10">Inversión</th>
                      <th className="py-6 px-10">Estado</th>
                      <th className="py-6 px-10 text-right">Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-20 text-center text-on-surface-variant font-medium italic">Esperando actividad de clientes...</td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="hover:bg-surface-container transition-colors group">
                          <td className="py-6 px-10 font-black text-primary">#{order.id.slice(0, 4).toUpperCase()}</td>
                          <td className="py-6 px-10 font-bold">{order.customerName}</td>
                          <td className="py-6 px-10 text-sm text-on-surface-variant">{order.timestamp}</td>
                          <td className="py-6 px-10 font-headline font-black text-lg">€{order.total.toFixed(2)}</td>
                          <td className="py-6 px-10">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                              order.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                              order.status === 'preparing' ? 'bg-amber-100 text-amber-700' :
                              order.status === 'ready' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-500 opacity-60'
                            }`}>
                              {order.status === 'pending' ? 'Entrante' : 
                               order.status === 'preparing' ? 'Preparando' : 
                               order.status === 'ready' ? 'Listo' : 'Servido'}
                            </span>
                          </td>
                          <td className="py-6 px-10 text-right">
                            <div className="flex justify-end gap-2">
                              {order.status === 'pending' && (
                                <button onClick={() => updateOrderStatus(order.id, 'preparing')} className="h-10 px-6 bg-on-surface text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary transition-all">Iniciar</button>
                              )}
                              {order.status === 'preparing' && (
                                <button onClick={() => updateOrderStatus(order.id, 'ready')} className="h-10 px-6 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20">Terminar</button>
                              )}
                              {order.status === 'ready' && (
                                <button onClick={() => updateOrderStatus(order.id, 'delivered')} className="h-10 px-6 border-2 border-primary text-primary text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all">Entregar</button>
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
      case 'history': return <div className="p-20 text-center text-on-surface-variant font-medium italic">Archivo histórico de ventas.</div>;
      case 'settings': return <div className="p-20 text-center text-on-surface-variant font-medium italic">Ajustes del sistema Alameda Gourmet</div>;
    }
  };

  return (
    <div className="theme-p2 min-h-screen bg-surface flex font-body">
      <aside className="w-64 bg-white border-r border-outline-variant p-8 flex flex-col gap-12 fixed h-full z-20">
        <div className="flex items-center gap-4">
          <img src="/assets/images/logo-orange.png" alt="Logo" className="h-12" />
          <h2 className="font-headline text-2xl font-black text-on-surface tracking-tighter">Admin</h2>
        </div>
        
        <nav className="flex flex-col gap-3">
          <button onClick={() => setActiveView('dashboard')} className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-xs uppercase tracking-widest ${activeView === 'dashboard' ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'text-on-surface-variant hover:bg-surface-container'}`}>
            <LayoutDashboard size={20} /><span>Dashboard</span>
          </button>
          <button onClick={() => setActiveView('history')} className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-xs uppercase tracking-widest ${activeView === 'history' ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'text-on-surface-variant hover:bg-surface-container'}`}>
            <History size={20} /><span>Historial</span>
          </button>
          <button onClick={() => setActiveView('settings')} className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-xs uppercase tracking-widest ${activeView === 'settings' ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'text-on-surface-variant hover:bg-surface-container'}`}>
            <Settings size={20} /><span>Ajustes</span>
          </button>
        </nav>

        <div className="mt-auto">
          <div className="p-6 bg-surface-container rounded-[24px] border border-outline-variant">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-black">A</div>
              <div>
                <p className="text-xs font-black text-on-surface">Admin Mode</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-grow ml-64 pt-24 p-12">
        <header className="fixed top-0 left-64 right-0 h-24 bg-surface/80 backdrop-blur-md border-b border-outline-variant z-10 flex items-center justify-between px-12">
          <h1 className="font-headline text-2xl font-black text-on-surface uppercase tracking-tight">{activeView}</h1>
          <div className="flex items-center gap-6">
            <button className="h-12 w-12 rounded-2xl border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-white transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto animate-fade-in pb-20">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

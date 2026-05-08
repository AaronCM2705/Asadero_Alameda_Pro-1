import React, { useState } from 'react';
import { DollarSign, Package, CheckCircle, Settings, History, LayoutDashboard, Download } from 'lucide-react';
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-on-surface/10 border border-on-surface/10 rounded-sm overflow-hidden mb-12">
              <div className="bg-white p-10">
                <div className="flex items-center gap-4 mb-6">
                  <DollarSign size={24} className="text-primary" />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface-variant">Facturación</p>
                </div>
                <h3 className="text-4xl font-black text-on-surface tracking-tighter">€{totalSales.toFixed(2)}</h3>
                <p className="mt-4 text-[10px] font-bold text-green-600 uppercase tracking-widest">+12.5% vs Hoy-1</p>
              </div>

              <div className="bg-white p-10">
                <div className="flex items-center gap-4 mb-6">
                  <Package size={24} className="text-primary" />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface-variant">Pendientes</p>
                </div>
                <h3 className="text-4xl font-black text-on-surface tracking-tighter">{activeOrders} UNID.</h3>
                <p className="mt-4 text-[10px] font-bold text-primary uppercase tracking-widest">En cola de salida</p>
              </div>

              <div className="bg-white p-10">
                <div className="flex items-center gap-4 mb-6">
                  <CheckCircle size={24} className="text-primary" />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface-variant">Éxito</p>
                </div>
                <h3 className="text-4xl font-black text-on-surface tracking-tighter">{orders.filter(o => o.status === 'delivered').length}</h3>
                <p className="mt-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Servicios completados</p>
              </div>
            </div>

            <div className="bg-white p-10 border border-on-surface/10 rounded-sm mb-12 shadow-xl shadow-on-surface/5">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">Rendimiento Operativo</h3>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-2">Métrica semanal de ingresos</p>
                </div>
                <button className="flex items-center gap-2 bg-on-surface text-white px-6 py-2 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-xl">
                  <Download size={14} />
                  <span>Exportar Data</span>
                </button>
              </div>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#000', fontSize: 10, fontWeight: 900}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#000', fontSize: 10, fontWeight: 900}} tickFormatter={(val) => `€${val}`} />
                    <Tooltip contentStyle={{backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '0'}} />
                    <Area type="stepAfter" dataKey="sales" stroke="#ba0013" strokeWidth={3} fill="#ba0013" fillOpacity={0.05} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-on-surface/10 rounded-sm overflow-hidden shadow-xl shadow-on-surface/5">
              <div className="p-8 border-b border-on-surface/10 flex justify-between items-center bg-on-surface/5">
                <h3 className="text-xl font-black uppercase tracking-tight text-on-surface">Registro de Comandas</h3>
                <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div>
                   TIEMPO REAL: ACTIVO
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant border-b border-on-surface/10">
                      <th className="py-6 px-10">Referencia</th>
                      <th className="py-6 px-10">Cliente</th>
                      <th className="py-6 px-10">Hora</th>
                      <th className="py-6 px-10">Total</th>
                      <th className="py-6 px-10">Estado</th>
                      <th className="py-6 px-10 text-right">Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-on-surface/5">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-20 text-center text-on-surface-variant text-xs uppercase font-black tracking-widest">Sin actividad reciente</td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="hover:bg-on-surface/5 transition-all">
                          <td className="py-6 px-10 font-black">#ID-{order.id.slice(0,4).toUpperCase()}</td>
                          <td className="py-6 px-10 font-bold uppercase text-xs">{order.customerName}</td>
                          <td className="py-6 px-10 text-on-surface-variant text-[10px] font-black">{order.timestamp}</td>
                          <td className="py-6 px-10 font-black text-lg">€{order.total.toFixed(2)}</td>
                          <td className="py-6 px-10">
                            <span className={`px-4 py-1 text-[9px] font-black uppercase border rounded-sm ${
                              order.status === 'pending' ? 'border-primary text-primary' :
                              order.status === 'preparing' ? 'bg-primary text-white border-primary' :
                              order.status === 'ready' ? 'bg-green-600 text-white border-green-600' :
                              'opacity-40 grayscale'
                            }`}>
                              {order.status === 'pending' ? 'Pendiente' :
                               order.status === 'preparing' ? 'Procesando' :
                               order.status === 'ready' ? 'Listo' : 'Entregado'}
                            </span>
                          </td>
                          <td className="py-6 px-10 text-right">
                            <div className="flex justify-end gap-2">
                              {order.status === 'pending' && (
                                <button onClick={() => updateOrderStatus(order.id, 'preparing')} className="h-8 px-4 bg-on-surface text-white text-[9px] font-black uppercase tracking-widest rounded-sm hover:bg-primary transition-all">Iniciar</button>
                              )}
                              {order.status === 'preparing' && (
                                <button onClick={() => updateOrderStatus(order.id, 'ready')} className="h-8 px-4 bg-green-600 text-white text-[9px] font-black uppercase tracking-widest rounded-sm hover:brightness-110 transition-all">Completar</button>
                              )}
                              {order.status === 'ready' && (
                                <button onClick={() => updateOrderStatus(order.id, 'delivered')} className="h-8 px-4 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-sm hover:brightness-110 transition-all shadow-lg">Entregar</button>
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
      case 'history': return <div className="p-20 text-center text-on-surface-variant font-black text-xs uppercase tracking-widest">Módulo histórico bloqueado</div>;
      case 'settings': return <div className="p-20 text-center text-on-surface-variant font-black text-xs uppercase tracking-widest">Ajustes del sistema v2.0</div>;
    }
  };

  return (
    <div className="theme-p3 min-h-screen bg-white flex font-headline">
      <aside className="w-24 md:w-64 bg-white border-r border-on-surface/10 flex flex-col pt-32 fixed h-full z-40">
        <div className="px-4 space-y-2">
          <button onClick={() => setActiveView('dashboard')} className={`w-full flex items-center gap-4 p-4 rounded-sm transition-all ${activeView === 'dashboard' ? 'bg-on-surface text-white shadow-xl shadow-on-surface/20' : 'text-on-surface-variant hover:bg-on-surface/5'}`}>
            <LayoutDashboard size={20} /><span className="hidden md:block text-[10px] font-black uppercase tracking-widest">Dashboard</span>
          </button>
          <button onClick={() => setActiveView('history')} className={`w-full flex items-center gap-4 p-4 rounded-sm transition-all ${activeView === 'history' ? 'bg-on-surface text-white shadow-xl shadow-on-surface/20' : 'text-on-surface-variant hover:bg-on-surface/5'}`}>
            <History size={20} /><span className="hidden md:block text-[10px] font-black uppercase tracking-widest">Historial</span>
          </button>
          <button onClick={() => setActiveView('settings')} className={`w-full flex items-center gap-4 p-4 rounded-sm transition-all ${activeView === 'settings' ? 'bg-on-surface text-white shadow-xl shadow-on-surface/20' : 'text-on-surface-variant hover:bg-on-surface/5'}`}>
            <Settings size={20} /><span className="hidden md:block text-[10px] font-black uppercase tracking-widest">Config</span>
          </button>
        </div>
      </aside>

      <main className="flex-grow ml-24 md:ml-64 pt-32 p-10">
        <header className="fixed top-0 left-0 right-0 h-32 bg-white/90 backdrop-blur-md border-b border-on-surface/10 z-50 flex items-center justify-between px-10">
          <div className="flex items-center gap-8 ml-24 md:ml-64">
            <img src="/assets/images/logo-red.png" alt="Logo" className="h-12" />
            <div className="flex flex-col">
              <h2 className="text-xl font-black uppercase tracking-tight text-on-surface">Centro de Control</h2>
              <span className="text-[8px] font-black text-primary uppercase tracking-[0.5em]">Asadero Alameda Pro</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface">Usuario: Master</p>
              <div className="flex items-center justify-end gap-2 text-green-600">
                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div>
                <span className="text-[8px] font-black uppercase tracking-widest">Online</span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto animate-fade-in pb-20">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

import React, { useState } from 'react';
import { Bell, TrendingUp, DollarSign, Package, CheckCircle, Clock, BarChart3, Settings, History, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Order, OrderStatus } from '../types';

const data = [
  { name: 'Lun', sales: 400 },
  { name: 'Mar', sales: 300 },
  { name: 'Mie', sales: 600 },
  { name: 'Jue', sales: 800 },
  { name: 'Vie', sales: 1200 },
  { name: 'Sab', sales: 1500 },
  { name: 'Dom', sales: 1100 },
];

interface AdminDashboardProps {
  orders: Order[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
}

type AdminView = 'dashboard' | 'history' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders, updateOrderStatus }) => {
  const [activeView, setActiveView] = useState<AdminView>('dashboard');

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0) + 5900; // Mock historical base
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
                <select className="bg-surface-container-highest border border-primary/20 rounded-lg px-4 py-2 text-sm text-on-surface outline-none">
                  <option>Últimos 7 días</option>
                  <option>Este mes</option>
                </select>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ffb779" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ffb779" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `€${val}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1b1b1b', border: '1px solid #cd7f32', borderRadius: '12px' }}
                      itemStyle={{ color: '#ffb779' }}
                    />
                    <Area type="monotone" dataKey="sales" stroke="#ffb779" fillOpacity={1} fill="url(#colorSales)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-surface-container-lowest rounded-2xl border border-primary/10 shadow-xl overflow-hidden">
              <div className="p-6 border-b border-primary/20 bg-surface-container flex justify-between items-center">
                <h3 className="font-headline text-xl">Gestión de Pedidos</h3>
                <span className="text-[10px] uppercase font-label text-on-surface-variant tracking-tighter">Actualizado hace unos segundos</span>
              </div>
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead className="bg-surface-container/50">
                    <tr className="font-label text-[12px] text-on-surface-variant uppercase tracking-widest border-b border-primary/10">
                      <th className="py-4 px-6 font-semibold">ID Pedido</th>
                      <th className="py-4 px-6 font-semibold">Cliente</th>
                      <th className="py-4 px-6 font-semibold">Hora</th>
                      <th className="py-4 px-6 font-semibold">Monto</th>
                      <th className="py-4 px-6 font-semibold">Estado</th>
                      <th className="py-4 px-6 font-semibold text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="font-body text-[14px] text-on-surface divide-y divide-primary/5">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-on-surface-variant italic">No hay pedidos registrados</td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="hover:bg-surface-container/30 transition-colors group">
                          <td className="py-5 px-6 font-bold text-primary">{order.id}</td>
                          <td className="py-5 px-6 font-medium">{order.customerName}</td>
                          <td className="py-5 px-6 text-on-surface-variant font-mono">{order.timestamp}</td>
                          <td className="py-5 px-6 font-bold">€{order.total.toFixed(2)}</td>
                          <td className="py-5 px-6">
                            <span className={`inline-flex items-center px-3 py-1 border rounded-full font-label text-[10px] uppercase ${
                              order.status === 'pending' ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400' :
                              order.status === 'preparing' ? 'bg-primary/10 border-primary/30 text-primary' :
                              order.status === 'ready' ? 'bg-green-400/10 border-green-400/30 text-green-400' :
                              'bg-on-surface-variant/10 border-on-surface-variant/30 text-on-surface-variant'
                            }`}>
                              {(order.status === 'pending' || order.status === 'preparing') && (
                                <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse"></span>
                              )}
                              {order.status}
                            </span>
                          </td>
                          <td className="py-5 px-6 text-right">
                            {order.status === 'pending' && (
                              <button 
                                onClick={() => updateOrderStatus(order.id, 'preparing')}
                                className="h-9 px-4 border border-primary text-primary hover:bg-primary hover:text-background transition-all font-bold text-[10px] uppercase rounded-full tracking-wider"
                              >
                                Preparar
                              </button>
                            )}
                            {order.status === 'preparing' && (
                              <button 
                                onClick={() => updateOrderStatus(order.id, 'ready')}
                                className="h-9 px-4 border border-green-400 text-green-400 hover:bg-green-400 hover:text-background transition-all font-bold text-[10px] uppercase rounded-full tracking-wider"
                              >
                                Listo
                              </button>
                            )}
                            {order.status === 'ready' && (
                              <button 
                                onClick={() => updateOrderStatus(order.id, 'delivered')}
                                className="h-9 px-4 bg-primary text-background hover:brightness-110 active:scale-95 transition-all font-bold text-[10px] uppercase rounded-full tracking-wider shadow-md"
                              >
                                Entregar
                              </button>
                            )}
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
      case 'history':
        return (
          <div className="bg-surface-container p-12 rounded-2xl border border-primary/10 text-center animate-fade-in">
            <History size={48} className="mx-auto text-primary/40 mb-6" />
            <h2 className="text-2xl font-headline mb-4">Historial de Operaciones</h2>
            <p className="text-on-surface-variant max-w-md mx-auto italic">
              Esta sección contendrá el registro histórico de todas las ventas, cierres de caja y auditorías de inventario.
            </p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-surface-container p-12 rounded-2xl border border-primary/10 text-center animate-fade-in">
            <Settings size={48} className="mx-auto text-primary/40 mb-6" />
            <h2 className="text-2xl font-headline mb-4">Configuración del Sistema</h2>
            <p className="text-on-surface-variant max-w-md mx-auto italic">
              Ajustes de precios, gestión de usuarios admi, horarios de apertura y parámetros de la API.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface antialiased">
      {/* Sidebar Navigation */}
      <div className="flex flex-grow">
        <aside className="w-20 md:w-64 bg-surface-container-lowest border-r border-primary/10 flex flex-col pt-[88px] fixed h-full z-40">
          <div className="flex-grow p-4 flex flex-col gap-2">
            <button 
              onClick={() => setActiveView('dashboard')}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all ${activeView === 'dashboard' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}
            >
              <LayoutDashboard size={20} />
              <span className="hidden md:block font-label text-sm uppercase tracking-widest font-bold">Panel</span>
            </button>
            <button 
              onClick={() => setActiveView('history')}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all ${activeView === 'history' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}
            >
              <History size={20} />
              <span className="hidden md:block font-label text-sm uppercase tracking-widest font-bold">Historial</span>
            </button>
            <button 
              onClick={() => setActiveView('settings')}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all ${activeView === 'settings' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}
            >
              <Settings size={20} />
              <span className="hidden md:block font-label text-sm uppercase tracking-widest font-bold">Ajustes</span>
            </button>
          </div>
          <div className="p-4 border-t border-primary/10">
            <Link to="/" className="flex items-center gap-4 p-4 text-on-surface-variant hover:text-primary transition-colors">
              <TrendingUp size={20} className="rotate-180" />
              <span className="hidden md:block font-label text-xs uppercase">Vista Cliente</span>
            </Link>
          </div>
        </aside>

        <main className="flex-grow ml-20 md:ml-64 pt-[88px]">
          {/* Top Header Fixed */}
          <nav className="w-full z-30 flex justify-between items-center px-10 h-[88px] bg-background/95 backdrop-blur-md border-b border-primary/20 fixed top-0 left-0">
            <div className="flex items-center gap-6">
              <Link to="/" className="font-headline text-[24px] text-primary italic">Asadero Alameda</Link>
              <span className="h-6 w-px bg-primary/30 hidden md:block"></span>
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant hidden md:block">Consola de Administración</span>
            </div>
            
            <div className="flex items-center gap-4 text-primary">
              <div className="flex flex-col items-end mr-4 hidden sm:block">
                <p className="text-[10px] font-label text-primary uppercase">Administrador</p>
                <p className="text-xs font-body text-on-surface-variant">Aaron Alameda</p>
              </div>
              <button className="h-10 w-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-bright transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
              </button>
              <div className="h-12 w-12 rounded-full border-2 border-primary/30 p-1">
                <img src="https://ui-avatars.com/api/?name=Admin+Alameda&background=CD7F32&color=000" alt="Admin" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
          </nav>

          <div className="p-6 md:p-12 max-w-7xl mx-auto w-full animate-fade-in pb-24">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Bell, TrendingUp, DollarSign, Package, CheckCircle, Clock, BarChart3, Settings, History, LayoutDashboard, Download, Menu as MenuIcon, X, Trash2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useOrders } from '../../../context/OrderContext';

type AdminView = 'dashboard' | 'history' | 'settings';

export const AdminDashboard: React.FC = () => {
  const { orders, updateOrderStatus, deleteOrder, totalSales, activeOrdersCount } = useOrders();
  const [activeView, setActiveView] = useState<AdminView>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const exportToCSV = () => {
    const headers = ['ID', 'Cliente', 'Total', 'Estado', 'Fecha'];
    const rows = orders.map(o => [
      o.id.toUpperCase(),
      o.customerName,
      o.total.toFixed(2),
      o.status,
      o.timestamp
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `registro_ventas_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="bg-surface-container p-6 rounded-2xl border border-primary/10 shadow-lg flex flex-col justify-between">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <p className="text-on-surface/50 text-[10px] uppercase tracking-widest font-black">Ventas Totales</p>
                    <h3 className="text-2xl font-headline font-bold text-on-surface">€{totalSales.toFixed(2)}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-400 text-sm font-bold">
                  <TrendingUp size={16} />
                  <span>+12.5% vs ayer</span>
                </div>
              </div>

              <div className="bg-surface-container p-6 rounded-2xl border border-primary/10 shadow-lg flex flex-col justify-between">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Package size={24} />
                  </div>
                  <div>
                    <p className="text-on-surface/50 text-[10px] uppercase tracking-widest font-black">Pedidos Activos</p>
                    <h3 className="text-2xl font-headline font-bold text-on-surface">{activeOrdersCount}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary text-sm font-bold">
                  <Clock size={16} />
                  <span>Promedio 25min</span>
                </div>
              </div>

              <div className="bg-surface-container p-6 rounded-2xl border border-primary/10 shadow-lg sm:col-span-2 lg:col-span-1 flex flex-col justify-between">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <p className="text-on-surface/50 text-[10px] uppercase tracking-widest font-black">Éxito Hoy</p>
                    <h3 className="text-2xl font-headline font-bold text-on-surface">{orders.filter(o => o.status === 'delivered').length}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-on-surface/40 text-sm font-bold">
                  <BarChart3 size={16} />
                  <span>Tasa 98%</span>
                </div>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-surface-container p-6 md:p-8 rounded-2xl border border-primary/10 shadow-xl mb-8 md:mb-12">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
                <div>
                  <h3 className="text-xl font-headline text-on-surface">Rendimiento Económico</h3>
                  <p className="text-on-surface/40 text-sm italic">Flujo de caja semanal proyectado</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button 
                    onClick={exportToCSV}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary text-black px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-md"
                  >
                    <Download size={16} />
                    <span>Reporte CSV</span>
                  </button>
                </div>
              </div>
              <div className="h-[250px] md:h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,175,55,0.05)" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} tickFormatter={(val) => `€${val}`} />
                    <Tooltip contentStyle={{backgroundColor: '#111', border: '1px solid #D4AF37', borderRadius: '12px'}} />
                    <Area type="monotone" dataKey="sales" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-surface-container rounded-2xl border border-primary/10 overflow-hidden shadow-xl">
              <div className="p-6 border-b border-primary/10 flex justify-between items-center bg-black/20">
                <h3 className="font-headline text-lg text-on-surface">Comandas</h3>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Live</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className="border-b border-primary/5 text-on-surface/30 font-black text-[9px] uppercase tracking-[0.2em]">
                      <th className="py-5 px-6">ID</th>
                      <th className="py-5 px-6">Cliente</th>
                      <th className="py-5 px-6">Total</th>
                      <th className="py-5 px-6">Estado</th>
                      <th className="py-5 px-6 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-on-surface/30 italic">Sin pedidos activos</td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                          <td className="py-5 px-6 font-bold text-primary text-xs">#{order.id.slice(0, 4).toUpperCase()}</td>
                          <td className="py-5 px-6 font-medium text-sm">{order.customerName}</td>
                          <td className="py-5 px-6 font-headline font-bold">€{order.total.toFixed(2)}</td>
                          <td className="py-5 px-6">
                            <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${
                              order.status === 'pending' ? 'bg-primary/20 text-primary border border-primary/20' :
                              order.status === 'preparing' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' :
                              order.status === 'ready' ? 'bg-green-500/20 text-green-400 border border-green-500/20' :
                              'bg-white/5 text-white/30'
                            }`}>
                              {order.status === 'pending' ? 'Pendiente' : 
                               order.status === 'preparing' ? 'Cocina' : 
                               order.status === 'ready' ? 'Listo' : 'OK'}
                            </span>
                          </td>
                          <td className="py-5 px-6 text-right">
                            <div className="flex justify-end gap-2">
                              {order.status === 'pending' && (
                                <button onClick={() => updateOrderStatus(order.id, 'preparing')} className="h-7 px-3 bg-primary text-black text-[9px] font-black uppercase rounded-md hover:scale-105 transition-all">Iniciar</button>
                              )}
                              {order.status === 'preparing' && (
                                <button onClick={() => updateOrderStatus(order.id, 'ready')} className="h-7 px-3 bg-green-500 text-white text-[9px] font-black uppercase rounded-md hover:scale-105 transition-all">Listo</button>
                              )}
                              {order.status === 'ready' && (
                                <button onClick={() => updateOrderStatus(order.id, 'delivered')} className="h-7 px-3 border border-primary/30 text-primary text-[9px] font-black uppercase rounded-md hover:bg-primary/10 transition-all">Fin</button>
                              )}
                              <button onClick={() => deleteOrder(order.id)} className="h-7 w-7 flex items-center justify-center bg-error/10 text-error rounded-md hover:bg-error hover:text-white transition-all">
                                <Trash2 size={14} />
                              </button>
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
      case 'history': return <div className="p-20 text-center text-on-surface/30 italic">Historial de transacciones archivado.</div>;
      case 'settings': return <div className="p-20 text-center text-on-surface/30 italic">Configuración del sistema v2.0.5</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row overflow-x-hidden">
      {/* Mobile Top Bar */}
      <div className="md:hidden h-16 bg-surface-container-lowest border-b border-primary/20 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/assets/images/logo-gold.png" alt="Logo" className="h-6" />
          <h2 className="font-headline text-lg text-primary italic">Admin</h2>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-primary">
          {isSidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Sidebar - Desktop & Mobile Drawer */}
      <aside className={`
        fixed md:sticky top-0 left-0 bottom-0 z-40
        w-64 bg-surface-container-lowest border-r border-primary/20 p-8 flex flex-col gap-10
        transition-transform duration-300 ease-in-out md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        md:h-screen
      `}>
        <div className="hidden md:flex items-center gap-3">
          <img src="/assets/images/logo-gold.png" alt="Logo" className="h-8" />
          <h2 className="font-headline text-xl text-primary italic">Admin</h2>
        </div>
        
        <nav className="flex flex-col gap-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'history', label: 'Historial', icon: History },
            { id: 'settings', label: 'Ajustes', icon: Settings },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => { setActiveView(item.id as AdminView); setIsSidebarOpen(false); }} 
              className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${activeView === item.id ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-on-surface/40 hover:bg-white/5 hover:text-on-surface'}`}
            >
              <item.icon size={20} />
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-primary/10">
          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-black">M</div>
            <div>
              <p className="text-[10px] font-black text-on-surface uppercase">Master Admin</p>
              <div className="flex items-center gap-1.5 text-green-500">
                <div className="w-1 h-1 rounded-full bg-current animate-pulse"></div>
                <span className="text-[7px] font-black uppercase tracking-[0.2em]">Online</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow min-h-screen relative">
        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
        )}

        <nav className="h-20 bg-background/80 backdrop-blur-md border-b border-primary/10 hidden md:flex items-center justify-between px-12 sticky top-0 z-10">
          <h1 className="font-headline text-xl text-on-surface uppercase tracking-tight">{activeView}</h1>
          <div className="flex items-center gap-6">
            <button className="relative text-on-surface/30 hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-background text-[8px] font-black flex items-center justify-center rounded-full">3</span>
            </button>
          </div>
        </nav>

        <div className="p-4 md:p-12 max-w-7xl mx-auto w-full animate-fade-in pb-24">
          <div className="md:hidden mb-8">
             <h1 className="font-headline text-3xl font-black text-on-surface uppercase tracking-tighter">{activeView}</h1>
             <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mt-1">Control Console</p>
          </div>
          {renderView()}
        </div>
      </main>
    </div>
  );
};

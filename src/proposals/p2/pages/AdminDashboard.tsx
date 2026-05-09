import React, { useState } from 'react';
import { Bell, TrendingUp, DollarSign, CheckCircle, Settings, History, LayoutDashboard, ShoppingCart, Download, Menu as MenuIcon, X, Trash2 } from 'lucide-react';
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
    link.setAttribute("download", `asadero_gourmet_reporte_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const displaySales = totalSales + 5900;
  const displayActive = activeOrdersCount;

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="bg-white p-6 md:p-8 rounded-[32px] border border-outline-variant shadow-lg flex flex-col justify-between">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <DollarSign size={28} />
                  </div>
                  <div>
                    <p className="text-on-surface font-black text-[10px] uppercase tracking-widest opacity-80">Facturación</p>
                    <h3 className="text-2xl md:text-3xl font-headline font-black text-on-surface">€{displaySales.toFixed(2)}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                  <TrendingUp size={20} />
                  <span>+18.2% incremento</span>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-[32px] border border-outline-variant shadow-lg flex flex-col justify-between">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <ShoppingCart size={28} />
                  </div>
                  <div>
                    <p className="text-on-surface font-black text-[10px] uppercase tracking-widest opacity-80">Pedidos Hoy</p>
                    <h3 className="text-2xl md:text-3xl font-headline font-black text-on-surface">{displayActive}</h3>
                  </div>
                </div>
                <p className="text-on-surface/60 font-bold text-xs uppercase tracking-widest">Gestión Real</p>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-[32px] border border-outline-variant shadow-lg sm:col-span-2 lg:col-span-1 flex flex-col justify-between">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle size={28} />
                  </div>
                  <div>
                    <p className="text-on-surface font-black text-[10px] uppercase tracking-widest opacity-80">Servidos</p>
                    <h3 className="text-2xl md:text-3xl font-headline font-black text-on-surface">{orders.filter(o => o.status === 'delivered').length}</h3>
                  </div>
                </div>
                <p className="text-on-surface/60 font-bold text-xs uppercase tracking-widest">Calidad 100%</p>
              </div>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-[40px] border border-outline-variant shadow-xl mb-8 md:mb-12">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
                <div>
                  <h3 className="text-2xl font-headline font-black text-on-surface uppercase tracking-tight">Rendimiento</h3>
                  <p className="text-on-surface/60 font-bold text-xs uppercase tracking-widest">Ingresos semanales</p>
                </div>
                <button 
                  onClick={exportToCSV}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-on-surface text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg"
                >
                  <Download size={16} />
                  <span>Reporte CSV</span>
                </button>
              </div>
              <div className="h-[250px] md:h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSalesP2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f16522" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#f16522" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2dfde" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#333', fontSize: 10, fontWeight: 900}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#333', fontSize: 10, fontWeight: 900}} tickFormatter={(val) => `€${val}`} />
                    <Tooltip contentStyle={{backgroundColor: '#fff', border: 'none', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}} />
                    <Area type="monotone" dataKey="sales" stroke="#a63b00" strokeWidth={4} fillOpacity={1} fill="url(#colorSalesP2)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-[40px] border border-outline-variant overflow-hidden shadow-xl">
              <div className="p-8 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
                <h3 className="font-headline text-xl font-black text-on-surface uppercase tracking-tight">Pedidos</h3>
                <div className="px-3 py-1 bg-green-100 text-green-700 text-[9px] font-black uppercase tracking-widest rounded-full">Live</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className="bg-surface-container text-on-surface/40 font-black text-[10px] uppercase tracking-widest">
                      <th className="py-5 px-8">ID</th>
                      <th className="py-5 px-8">Cliente</th>
                      <th className="py-5 px-8">Total</th>
                      <th className="py-5 px-8">Estado</th>
                      <th className="py-5 px-8 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-20 text-center text-on-surface/40 font-bold italic">Sin actividad...</td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="hover:bg-surface-container transition-colors group">
                          <td className="py-5 px-8 font-black text-primary text-xs">#{order.id.slice(0, 4).toUpperCase()}</td>
                          <td className="py-5 px-8 font-bold text-sm">{order.customerName}</td>
                          <td className="py-5 px-8 font-headline font-black text-lg">€{order.total.toFixed(2)}</td>
                          <td className="py-5 px-8">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${
                              order.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                              order.status === 'preparing' ? 'bg-amber-100 text-amber-700' :
                              order.status === 'ready' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-500 opacity-60'
                            }`}>
                              {order.status === 'pending' ? 'Nuevo' : 
                               order.status === 'preparing' ? 'Cocina' : 
                               order.status === 'ready' ? 'Listo' : 'OK'}
                            </span>
                          </td>
                          <td className="py-5 px-8 text-right">
                            <div className="flex justify-end gap-2">
                              {order.status === 'pending' && (
                                <button onClick={() => updateOrderStatus(order.id, 'preparing')} className="h-8 px-4 bg-on-surface text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-primary transition-all">Iniciar</button>
                              )}
                              {order.status === 'preparing' && (
                                <button onClick={() => updateOrderStatus(order.id, 'ready')} className="h-8 px-4 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:brightness-110 transition-all shadow-lg">Terminar</button>
                              )}
                              {order.status === 'ready' && (
                                <button onClick={() => updateOrderStatus(order.id, 'delivered')} className="h-8 px-4 border-2 border-primary text-primary text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all">Entregar</button>
                              )}
                              <button onClick={() => deleteOrder(order.id)} className="h-8 w-8 flex items-center justify-center bg-error/10 text-error rounded-xl hover:bg-error hover:text-white transition-all">
                                <Trash2 size={16} />
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
      case 'history': return <div className="p-20 text-center text-on-surface/40 font-bold italic">Archivo histórico de ventas.</div>;
      case 'settings': return <div className="p-20 text-center text-on-surface/40 font-bold italic">Ajustes del sistema Alameda Gourmet</div>;
    }
  };

  return (
    <div className="theme-p2 min-h-screen bg-surface flex flex-col md:flex-row font-body overflow-x-hidden">
      {/* Mobile Top Bar */}
      <div className="md:hidden h-16 bg-white border-b border-outline-variant px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/assets/images/logo-orange.png" alt="Logo" className="h-8" />
          <h2 className="font-headline text-lg font-black text-on-surface">Admin</h2>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-primary">
          {isSidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 bottom-0 z-40
        w-64 bg-white border-r border-outline-variant p-8 flex flex-col gap-10
        transition-transform duration-300 ease-in-out md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        md:h-screen
      `}>
        <div className="hidden md:flex items-center gap-4">
          <img src="/assets/images/logo-orange.png" alt="Logo" className="h-10" />
          <h2 className="font-headline text-xl font-black text-on-surface tracking-tighter">Admin</h2>
        </div>
        
        <nav className="flex flex-col gap-3">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'history', label: 'Historial', icon: History },
            { id: 'settings', label: 'Ajustes', icon: Settings },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => { setActiveView(item.id as AdminView); setIsSidebarOpen(false); }} 
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest ${activeView === item.id ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'text-on-surface/40 hover:bg-surface-container'}`}
            >
              <item.icon size={18} /><span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="p-5 bg-surface-container rounded-[20px] border border-outline-variant">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-black">A</div>
              <div>
                <p className="text-[10px] font-black text-on-surface uppercase">Master Admin</p>
                <div className="flex items-center gap-1.5 text-green-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                  <span className="text-[8px] font-black uppercase tracking-widest">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow min-h-screen relative">
        <header className="hidden md:flex h-24 bg-surface/80 backdrop-blur-md border-b border-outline-variant sticky top-0 z-10 items-center justify-between px-12">
          <h1 className="font-headline text-2xl font-black text-on-surface uppercase tracking-tight">{activeView}</h1>
          <div className="flex items-center gap-6">
            <button className="h-12 w-12 rounded-2xl border border-outline-variant flex items-center justify-center text-on-surface/40 hover:bg-white transition-all relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full"></span>
            </button>
          </div>
        </header>

        <div className="p-4 md:p-12 max-w-7xl mx-auto animate-fade-in pb-20">
          <div className="md:hidden mb-8">
             <h1 className="font-headline text-4xl font-black text-on-surface uppercase tracking-tighter">{activeView}</h1>
             <div className="w-12 h-1 bg-primary mt-2"></div>
          </div>
          {renderView()}
        </div>
      </main>
    </div>
  );
};

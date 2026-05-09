import React, { useState } from 'react';
import { DollarSign, Package, CheckCircle, Settings, History, LayoutDashboard, Download, Menu as MenuIcon, X, Trash2 } from 'lucide-react';
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
    link.setAttribute("download", `asadero_pro_reporte_${new Date().toLocaleDateString()}.csv`);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 bg-on-surface/10 border border-on-surface/10 rounded-sm overflow-hidden mb-8 md:mb-12">
              <div className="bg-white p-6 md:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <DollarSign size={24} className="text-primary" />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface">Facturación</p>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-on-surface tracking-tighter">€{displaySales.toFixed(2)}</h3>
                <p className="mt-4 text-[10px] font-bold text-green-600 uppercase tracking-widest">+12.5% vs Hoy-1</p>
              </div>

              <div className="bg-white p-6 md:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <Package size={24} className="text-primary" />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface">Pendientes</p>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-on-surface tracking-tighter">{displayActive} UNID.</h3>
                <p className="mt-4 text-[10px] font-bold text-primary uppercase tracking-widest">En cola de salida</p>
              </div>

              <div className="bg-white p-6 md:p-10 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-4 mb-6">
                  <CheckCircle size={24} className="text-primary" />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface">Éxito</p>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-on-surface tracking-tighter">{orders.filter(o => o.status === 'delivered').length}</h3>
                <p className="mt-4 text-[10px] font-bold text-on-surface/60 uppercase tracking-widest">Servicios OK</p>
              </div>
            </div>

            <div className="bg-white p-6 md:p-10 border border-on-surface/10 rounded-sm mb-8 md:mb-12 shadow-xl shadow-on-surface/5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">Rendimiento</h3>
                  <p className="text-[10px] font-black text-on-surface/60 uppercase tracking-widest mt-2">Métrica semanal de ingresos</p>
                </div>
                <button 
                  onClick={exportToCSV}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-on-surface text-white px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-xl"
                >
                  <Download size={14} />
                  <span>Exportar CSV</span>
                </button>
              </div>
              <div className="h-[250px] md:h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              <div className="p-6 md:p-8 border-b border-on-surface/10 flex justify-between items-center bg-on-surface/5">
                <h3 className="text-xl font-black uppercase tracking-tight text-on-surface">Comandas</h3>
                <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div>
                   LIVE
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className="text-[10px] font-black uppercase tracking-widest text-on-surface/40 border-b border-on-surface/10">
                      <th className="py-5 px-8">ID</th>
                      <th className="py-5 px-8">Cliente</th>
                      <th className="py-5 px-8">Total</th>
                      <th className="py-5 px-8">Estado</th>
                      <th className="py-5 px-8 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-on-surface/5">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-20 text-center text-on-surface/40 text-xs uppercase font-black tracking-widest">Esperando pedidos</td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="hover:bg-on-surface/5 transition-all">
                          <td className="py-5 px-8 font-black text-xs text-primary">#{order.id.slice(0,4).toUpperCase()}</td>
                          <td className="py-5 px-8 font-bold uppercase text-xs">{order.customerName}</td>
                          <td className="py-5 px-8 font-black text-lg">€{order.total.toFixed(2)}</td>
                          <td className="py-5 px-8">
                            <span className={`px-4 py-1 text-[9px] font-black uppercase border rounded-sm ${
                              order.status === 'pending' ? 'border-primary text-primary' :
                              order.status === 'preparing' ? 'bg-primary text-white border-primary' :
                              order.status === 'ready' ? 'bg-green-600 text-white border-green-600' :
                              'opacity-40 grayscale border-black text-black'
                            }`}>
                              {order.status === 'pending' ? 'Pendiente' :
                               order.status === 'preparing' ? 'Procesando' :
                               order.status === 'ready' ? 'Listo' : 'Entregado'}
                            </span>
                          </td>
                          <td className="py-5 px-8 text-right">
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
                              <button onClick={() => deleteOrder(order.id)} className="h-8 w-8 flex items-center justify-center bg-red-100 text-red-600 rounded-sm hover:bg-red-600 hover:text-white transition-all">
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
      case 'history': return <div className="p-20 text-center text-on-surface/40 font-black text-xs uppercase tracking-widest italic">Archivo de transacciones</div>;
      case 'settings': return <div className="p-20 text-center text-on-surface/40 font-black text-xs uppercase tracking-widest italic">Configuración v2.0</div>;
    }
  };

  return (
    <div className="theme-p3 min-h-screen bg-white flex flex-col md:flex-row font-headline overflow-x-hidden">
      {/* Mobile Top Bar */}
      <div className="md:hidden h-20 bg-white border-b border-on-surface/10 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <img src="/assets/images/logo-red.png" alt="Logo" className="h-8" />
          <h2 className="text-lg font-black uppercase tracking-tight text-on-surface">Admin</h2>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-primary">
          {isSidebarOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 bottom-0 z-40
        w-64 bg-white border-r border-on-surface/10 flex flex-col pt-12 md:pt-32
        transition-transform duration-300 ease-in-out md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:h-screen
      `}>
        <div className="px-6 space-y-3">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'history', label: 'Historial', icon: History },
            { id: 'settings', label: 'Ajustes', icon: Settings },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => { setActiveView(item.id as AdminView); setIsSidebarOpen(false); }} 
              className={`w-full flex items-center gap-4 p-4 rounded-sm transition-all ${activeView === item.id ? 'bg-on-surface text-white shadow-xl shadow-on-surface/20' : 'text-on-surface/40 hover:bg-on-surface/5 hover:text-on-surface'}`}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow min-h-screen relative">
        <header className="hidden md:flex h-32 bg-white/90 backdrop-blur-md border-b border-on-surface/10 sticky top-0 z-10 items-center justify-between px-10">
          <div className="flex items-center gap-8">
            <img src="/assets/images/logo-red.png" alt="Logo" className="h-12" />
            <div className="flex flex-col">
              <h2 className="text-xl font-black uppercase tracking-tight text-on-surface">Centro de Control</h2>
              <span className="text-[8px] font-black text-primary uppercase tracking-[0.5em]">Asadero Alameda Pro</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface">Usuario: Master</p>
              <div className="flex items-center justify-end gap-2 text-green-600">
                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div>
                <span className="text-[8px] font-black uppercase tracking-widest">Online</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-12 max-w-7xl mx-auto animate-fade-in pb-20">
          <div className="md:hidden mb-8">
             <h2 className="text-4xl font-black uppercase tracking-tighter text-on-surface">{activeView}</h2>
             <span className="text-[8px] font-black text-primary uppercase tracking-[0.5em]">Asadero Alameda Pro</span>
          </div>
          {renderView()}
        </div>
      </main>
    </div>
  );
};

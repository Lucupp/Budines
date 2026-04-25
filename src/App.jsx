import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, Users, MessageCircle, Plus, Edit3, Trash2, X, Check, Phone, MapPin, CreditCard, Calendar, TrendingUp, Send, Copy, AlertCircle, Cake, Search, ChevronRight, BarChart3 } from 'lucide-react';

export default function BudinesApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  
  // Estado de datos
  const [budines, setBudines] = useState([]);
  const [compras, setCompras] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [config, setConfig] = useState({ nombreNegocio: 'Italo Bakery' });

  // Cargar datos al iniciar
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [b, c, cl, v, t, cfg] = await Promise.all([
          window.storage.get('budines').catch(() => null),
          window.storage.get('compras').catch(() => null),
          window.storage.get('clientes').catch(() => null),
          window.storage.get('ventas').catch(() => null),
          window.storage.get('templates').catch(() => null),
          window.storage.get('config').catch(() => null),
        ]);

        if (b?.value) setBudines(JSON.parse(b.value));
        else {
          // Datos iniciales de ejemplo
          const iniciales = [
            { id: 'bud_1', nombre: 'Budín de Limón', precio: 3500, stock: 8, descripcion: 'Clásico con glaseado' },
            { id: 'bud_2', nombre: 'Budín de Chocolate', precio: 4000, stock: 5, descripcion: 'Con chips de chocolate' },
            { id: 'bud_3', nombre: 'Budín Marmolado', precio: 3800, stock: 6, descripcion: 'Vainilla y chocolate' },
          ];
          setBudines(iniciales);
        }

        if (c?.value) setCompras(JSON.parse(c.value));
        if (cl?.value) setClientes(JSON.parse(cl.value));
        if (v?.value) setVentas(JSON.parse(v.value));
        if (t?.value) setTemplates(JSON.parse(t.value));
        else {
          const tInicial = [
            { id: 't_1', nombre: 'Confirmación de pedido', mensaje: '¡Hola {nombre}! 🧁 Confirmamos tu pedido de {detalle}. Total: ${total}. ¡Gracias por elegirnos!' },
            { id: 't_2', nombre: 'Aviso de entrega', mensaje: 'Hola {nombre}, tu pedido ya está listo para entregar. ¿Te queda bien hoy? 🚗' },
            { id: 't_3', nombre: 'Recordatorio de pago', mensaje: 'Hola {nombre}, te recuerdo que queda pendiente el pago de ${total} de tu pedido. ¡Saludos!' },
          ];
          setTemplates(tInicial);
        }

        if (cfg?.value) setConfig(JSON.parse(cfg.value));
      } catch (e) {
        console.error('Error cargando:', e);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  // Helpers de guardado
  const guardar = async (key, valor) => {
    try {
      await window.storage.set(key, JSON.stringify(valor));
    } catch (e) {
      console.error('Error guardando', key, e);
    }
  };

  const updateBudines = (nuevos) => { setBudines(nuevos); guardar('budines', nuevos); };
  const updateCompras = (nuevos) => { setCompras(nuevos); guardar('compras', nuevos); };
  const updateClientes = (nuevos) => { setClientes(nuevos); guardar('clientes', nuevos); };
  const updateVentas = (nuevos) => { setVentas(nuevos); guardar('ventas', nuevos); };
  const updateTemplates = (nuevos) => { setTemplates(nuevos); guardar('templates', nuevos); };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FAF6F0' }}>
        <div className="text-center">
          <Cake className="w-12 h-12 mx-auto animate-pulse" style={{ color: '#B85C38' }} />
          <p className="mt-4 text-stone-600" style={{ fontFamily: 'Georgia, serif' }}>Cargando...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Inicio', icon: BarChart3 },
    { id: 'stock', label: 'Stock', icon: Package },
    { id: 'ventas', label: 'Ventas', icon: ShoppingCart },
    { id: 'clientes', label: 'Clientes', icon: Users },
    { id: 'compras', label: 'Compras', icon: TrendingUp },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#FAF6F0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-body { font-family: 'Inter', system-ui, sans-serif; }
        .grain-bg {
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(184, 92, 56, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(212, 165, 116, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(157, 76, 50, 0.03) 0%, transparent 50%);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
        .scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: #F5EFE6; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #D4A574; border-radius: 3px; }
      `}</style>

      <div className="grain-bg min-h-screen">
        {/* Header */}
        <header className="border-b" style={{ borderColor: '#E8DCC8', background: 'rgba(250, 246, 240, 0.85)', backdropFilter: 'blur(8px)', position: 'sticky', top: 0, zIndex: 50 }}>
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#B85C38' }}>
                <Cake className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold" style={{ color: '#3D2817' }}>{config.nombreNegocio}</h1>
                <p className="text-xs font-body tracking-wider uppercase" style={{ color: '#8B6F47' }}>Gestión de Budines</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="px-4 py-2 rounded-full font-body text-sm font-medium transition-all flex items-center gap-2"
                    style={{
                      background: active ? '#3D2817' : 'transparent',
                      color: active ? '#FAF6F0' : '#3D2817',
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
          {/* Mobile nav */}
          <nav className="md:hidden flex overflow-x-auto scrollbar-thin px-4 pb-3 gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-3 py-2 rounded-full font-body text-xs font-medium flex items-center gap-1.5 whitespace-nowrap"
                  style={{
                    background: active ? '#3D2817' : '#F5EFE6',
                    color: active ? '#FAF6F0' : '#3D2817',
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </header>

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {activeTab === 'dashboard' && <Dashboard budines={budines} ventas={ventas} clientes={clientes} compras={compras} setActiveTab={setActiveTab} />}
          {activeTab === 'stock' && <Stock budines={budines} updateBudines={updateBudines} />}
          {activeTab === 'ventas' && <Ventas budines={budines} clientes={clientes} ventas={ventas} updateVentas={updateVentas} updateBudines={updateBudines} updateClientes={updateClientes} />}
          {activeTab === 'clientes' && <Clientes clientes={clientes} updateClientes={updateClientes} ventas={ventas} budines={budines} templates={templates} />}
          {activeTab === 'compras' && <Compras compras={compras} updateCompras={updateCompras} />}
          {activeTab === 'whatsapp' && <WhatsApp templates={templates} updateTemplates={updateTemplates} clientes={clientes} ventas={ventas} budines={budines} />}
        </main>

        <footer className="text-center py-8 text-xs font-body" style={{ color: '#8B6F47' }}>
          <p>Hecho con cariño 🧁 — Tus datos se guardan automáticamente</p>
        </footer>
      </div>
    </div>
  );
}

// ============= DASHBOARD =============
function Dashboard({ budines, ventas, clientes, compras, setActiveTab }) {
  const totalStock = budines.reduce((s, b) => s + (b.stock || 0), 0);
  const valorStock = budines.reduce((s, b) => s + (b.stock || 0) * (b.precio || 0), 0);
  const ventasMes = ventas.filter(v => {
    const d = new Date(v.fecha);
    const ahora = new Date();
    return d.getMonth() === ahora.getMonth() && d.getFullYear() === ahora.getFullYear();
  });
  const ingresoMes = ventasMes.reduce((s, v) => s + (v.total || 0), 0);
  const gastosMes = compras.filter(c => {
    const d = new Date(c.fecha);
    const ahora = new Date();
    return d.getMonth() === ahora.getMonth() && d.getFullYear() === ahora.getFullYear();
  }).reduce((s, c) => s + (c.precio || 0) * (c.cantidad || 1), 0);

  const ventasRecientes = [...ventas].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 5);
  const stockBajo = budines.filter(b => (b.stock || 0) <= 3);

  return (
    <div className="animate-slideUp">
      <div className="mb-8">
        <p className="font-body text-sm tracking-widest uppercase mb-2" style={{ color: '#8B6F47' }}>Resumen general</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: '#3D2817' }}>
          ¿Cómo va el día?
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Stock total" value={totalStock} sub="unidades" color="#B85C38" icon={Package} />
        <StatCard label="Valor en stock" value={`$${valorStock.toLocaleString()}`} color="#D4A574" icon={TrendingUp} />
        <StatCard label="Ventas del mes" value={ventasMes.length} sub={`$${ingresoMes.toLocaleString()}`} color="#6B4423" icon={ShoppingCart} />
        <StatCard label="Clientes" value={clientes.length} color="#9D4C32" icon={Users} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-3xl p-6" style={{ background: '#FFFFFF', border: '1px solid #E8DCC8' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-xl font-bold" style={{ color: '#3D2817' }}>Ventas recientes</h3>
            <button onClick={() => setActiveTab('ventas')} className="text-xs font-body flex items-center gap-1" style={{ color: '#B85C38' }}>
              Ver todas <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          {ventasRecientes.length === 0 ? (
            <p className="font-body text-sm py-8 text-center" style={{ color: '#8B6F47' }}>Aún no hay ventas registradas</p>
          ) : (
            <div className="space-y-3">
              {ventasRecientes.map(v => (
                <div key={v.id} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: '#F5EFE6' }}>
                  <div>
                    <p className="font-body font-medium text-sm" style={{ color: '#3D2817' }}>{v.clienteNombre}</p>
                    <p className="font-body text-xs" style={{ color: '#8B6F47' }}>{new Date(v.fecha).toLocaleDateString('es-AR')}</p>
                  </div>
                  <p className="font-display font-bold" style={{ color: '#B85C38' }}>${v.total.toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-3xl p-6" style={{ background: '#FFFFFF', border: '1px solid #E8DCC8' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-xl font-bold" style={{ color: '#3D2817' }}>Atención al stock</h3>
            <button onClick={() => setActiveTab('stock')} className="text-xs font-body flex items-center gap-1" style={{ color: '#B85C38' }}>
              Gestionar <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          {stockBajo.length === 0 ? (
            <div className="py-8 text-center">
              <Check className="w-8 h-8 mx-auto mb-2" style={{ color: '#7A8B5C' }} />
              <p className="font-body text-sm" style={{ color: '#8B6F47' }}>Todo el stock está en buen nivel</p>
            </div>
          ) : (
            <div className="space-y-3">
              {stockBajo.map(b => (
                <div key={b.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#FDF4EC' }}>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-4 h-4" style={{ color: '#B85C38' }} />
                    <p className="font-body font-medium text-sm" style={{ color: '#3D2817' }}>{b.nombre}</p>
                  </div>
                  <span className="font-display font-bold text-sm" style={{ color: b.stock === 0 ? '#9D4C32' : '#B85C38' }}>
                    {b.stock} {b.stock === 1 ? 'unidad' : 'unidades'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-3xl p-6" style={{ background: 'linear-gradient(135deg, #3D2817 0%, #6B4423 100%)' }}>
        <div className="grid md:grid-cols-3 gap-4 text-center md:text-left">
          <div>
            <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: '#D4A574' }}>Ingresos del mes</p>
            <p className="font-display text-3xl font-bold text-white">${ingresoMes.toLocaleString()}</p>
          </div>
          <div>
            <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: '#D4A574' }}>Gastos del mes</p>
            <p className="font-display text-3xl font-bold text-white">${gastosMes.toLocaleString()}</p>
          </div>
          <div>
            <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: '#D4A574' }}>Balance</p>
            <p className="font-display text-3xl font-bold" style={{ color: ingresoMes - gastosMes >= 0 ? '#A8C58D' : '#E8B4A0' }}>
              ${(ingresoMes - gastosMes).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, color, icon: Icon }) {
  return (
    <div className="rounded-3xl p-5" style={{ background: '#FFFFFF', border: '1px solid #E8DCC8' }}>
      <div className="flex items-start justify-between mb-3">
        <p className="font-body text-xs uppercase tracking-wider" style={{ color: '#8B6F47' }}>{label}</p>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${color}20` }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
      </div>
      <p className="font-display text-2xl md:text-3xl font-bold" style={{ color: '#3D2817' }}>{value}</p>
      {sub && <p className="font-body text-xs mt-1" style={{ color: '#8B6F47' }}>{sub}</p>}
    </div>
  );
}

// ============= STOCK =============
function Stock({ budines, updateBudines }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ nombre: '', precio: '', stock: '', descripcion: '' });

  const abrirNuevo = () => {
    setEditing(null);
    setForm({ nombre: '', precio: '', stock: '', descripcion: '' });
    setShowForm(true);
  };

  const abrirEditar = (b) => {
    setEditing(b.id);
    setForm({ nombre: b.nombre, precio: b.precio, stock: b.stock, descripcion: b.descripcion || '' });
    setShowForm(true);
  };

  const guardar = () => {
    if (!form.nombre.trim() || !form.precio) return;
    const datos = {
      nombre: form.nombre.trim(),
      precio: parseFloat(form.precio) || 0,
      stock: parseInt(form.stock) || 0,
      descripcion: form.descripcion.trim(),
    };
    if (editing) {
      updateBudines(budines.map(b => b.id === editing ? { ...b, ...datos } : b));
    } else {
      updateBudines([...budines, { id: `bud_${Date.now()}`, ...datos }]);
    }
    setShowForm(false);
  };

  const eliminar = (id) => {
    if (confirm('¿Eliminar este budín?')) {
      updateBudines(budines.filter(b => b.id !== id));
    }
  };

  const ajustarStock = (id, delta) => {
    updateBudines(budines.map(b => b.id === id ? { ...b, stock: Math.max(0, (b.stock || 0) + delta) } : b));
  };

  return (
    <div className="animate-slideUp">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="font-body text-sm tracking-widest uppercase mb-2" style={{ color: '#8B6F47' }}>Inventario</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: '#3D2817' }}>Variedades</h2>
        </div>
        <button onClick={abrirNuevo} className="px-5 py-3 rounded-full font-body font-medium text-sm flex items-center gap-2 text-white" style={{ background: '#B85C38' }}>
          <Plus className="w-4 h-4" /> Nuevo budín
        </button>
      </div>

      {budines.length === 0 ? (
        <EmptyState icon={Package} message="Aún no hay variedades cargadas" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {budines.map(b => (
            <div key={b.id} className="rounded-3xl p-6 transition-transform hover:-translate-y-1" style={{ background: '#FFFFFF', border: '1px solid #E8DCC8' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold" style={{ color: '#3D2817' }}>{b.nombre}</h3>
                  {b.descripcion && <p className="font-body text-xs mt-1" style={{ color: '#8B6F47' }}>{b.descripcion}</p>}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => abrirEditar(b)} className="p-2 rounded-full hover:bg-stone-100" style={{ color: '#6B4423' }}>
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => eliminar(b.id)} className="p-2 rounded-full hover:bg-red-50" style={{ color: '#9D4C32' }}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="my-4">
                <p className="font-display text-3xl font-bold" style={{ color: '#B85C38' }}>${b.precio.toLocaleString()}</p>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl" style={{ background: '#FAF6F0' }}>
                <span className="font-body text-xs uppercase tracking-wider" style={{ color: '#8B6F47' }}>Stock</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => ajustarStock(b.id, -1)} className="w-7 h-7 rounded-full flex items-center justify-center font-bold" style={{ background: '#E8DCC8', color: '#3D2817' }}>−</button>
                  <span className="font-display font-bold text-xl w-8 text-center" style={{ color: b.stock === 0 ? '#9D4C32' : '#3D2817' }}>{b.stock}</span>
                  <button onClick={() => ajustarStock(b.id, 1)} className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white" style={{ background: '#B85C38' }}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <Modal onClose={() => setShowForm(false)} title={editing ? 'Editar budín' : 'Nuevo budín'}>
          <div className="space-y-4">
            <Field label="Nombre">
              <input type="text" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} className="w-full px-4 py-3 rounded-2xl font-body" style={{ background: '#FAF6F0', border: '1px solid #E8DCC8', color: '#3D2817' }} placeholder="Ej: Budín de naranja" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Precio">
                <input type="number" value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} className="w-full px-4 py-3 rounded-2xl font-body" style={{ background: '#FAF6F0', border: '1px solid #E8DCC8', color: '#3D2817' }} placeholder="0" />
              </Field>
              <Field label="Stock">
                <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} className="w-full px-4 py-3 rounded-2xl font-body" style={{ background: '#FAF6F0', border: '1px solid #E8DCC8', color: '#3D2817' }} placeholder="0" />
              </Field>
            </div>
            <Field label="Descripción (opcional)">
              <input type="text" value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} className="w-full px-4 py-3 rounded-2xl font-body" style={{ background: '#FAF6F0', border: '1px solid #E8DCC8', color: '#3D2817' }} placeholder="Detalles del producto" />
            </Field>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-2xl font-body font-medium" style={{ background: '#F5EFE6', color: '#3D2817' }}>Cancelar</button>
              <button onClick={guardar} className="flex-1 py-3 rounded-2xl font-body font-medium text-white" style={{ background: '#B85C38' }}>Guardar</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ============= VENTAS =============
function Ventas({ budines, clientes, ventas, updateVentas, updateBudines, updateClientes }) {
  const [showForm, setShowForm] = useState(false);
  const [clienteSel, setClienteSel] = useState('');
  const [clienteNuevo, setClienteNuevo] = useState('');
  const [items, setItems] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [descontarStock, setDescontarStock] = useState(true);

  const total = items.reduce((s, it) => {
    const b = budines.find(x => x.id === it.budinId);
    return s + (b ? b.precio * it.cantidad : 0);
  }, 0);

  const abrirNueva = () => {
    setItems([]);
    setClienteSel('');
    setClienteNuevo('');
    setDescontarStock(true);
    setShowForm(true);
  };

  const agregarItem = (budinId) => {
    const existe = items.find(it => it.budinId === budinId);
    if (existe) {
      setItems(items.map(it => it.budinId === budinId ? { ...it, cantidad: it.cantidad + 1 } : it));
    } else {
      setItems([...items, { budinId, cantidad: 1 }]);
    }
  };

  const cambiarCantidad = (budinId, cant) => {
    if (cant <= 0) {
      setItems(items.filter(it => it.budinId !== budinId));
    } else {
      setItems(items.map(it => it.budinId === budinId ? { ...it, cantidad: cant } : it));
    }
  };

  const guardarVenta = () => {
    if (items.length === 0) return;
    let clienteId = clienteSel;
    let clienteNombre = '';
    let clientesActualizados = clientes;

    if (clienteSel === '__nuevo__' && clienteNuevo.trim()) {
      const nuevo = { id: `cli_${Date.now()}`, nombre: clienteNuevo.trim(), telefono: '', direccion: '', alias: '', notas: '' };
      clientesActualizados = [...clientes, nuevo];
      updateClientes(clientesActualizados);
      clienteId = nuevo.id;
      clienteNombre = nuevo.nombre;
    } else if (clienteSel) {
      const c = clientes.find(x => x.id === clienteSel);
      clienteNombre = c?.nombre || 'Sin nombre';
    } else {
      clienteNombre = 'Cliente sin registrar';
      clienteId = null;
    }

    const itemsConDatos = items.map(it => {
      const b = budines.find(x => x.id === it.budinId);
      return {
        budinId: it.budinId,
        nombre: b?.nombre || 'Desconocido',
        precio: b?.precio || 0,
        cantidad: it.cantidad,
        subtotal: (b?.precio || 0) * it.cantidad,
      };
    });

    const venta = {
      id: `ven_${Date.now()}`,
      clienteId,
      clienteNombre,
      items: itemsConDatos,
      total,
      fecha: new Date().toISOString(),
      pagado: false,
    };

    updateVentas([venta, ...ventas]);

    if (descontarStock) {
      const budinesActualizados = budines.map(b => {
        const item = items.find(it => it.budinId === b.id);
        if (item) return { ...b, stock: Math.max(0, (b.stock || 0) - item.cantidad) };
        return b;
      });
      updateBudines(budinesActualizados);
    }

    setShowForm(false);
  };

  const togglePagado = (id) => {
    updateVentas(ventas.map(v => v.id === id ? { ...v, pagado: !v.pagado } : v));
  };

  const eliminarVenta = (id) => {
    if (confirm('¿Eliminar esta venta?')) {
      updateVentas(ventas.filter(v => v.id !== id));
    }
  };

  const ventasFiltradas = [...ventas]
    .filter(v => !busqueda || v.clienteNombre.toLowerCase().includes(busqueda.toLowerCase()))
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <div className="animate-slideUp">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="font-body text-sm tracking-widest uppercase mb-2" style={{ color: '#8B6F47' }}>Pedidos</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: '#3D2817' }}>Ventas</h2>
        </div>
        <button onClick={abrirNueva} className="px-5 py-3 rounded-full font-body font-medium text-sm flex items-center gap-2 text-white" style={{ background: '#B85C38' }}>
          <Plus className="w-4 h-4" /> Nueva venta
        </button>
      </div>

      <div className="mb-6 relative">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#8B6F47' }} />
        <input type="text" placeholder="Buscar por cliente..." value={busqueda} onChange={e => setBusqueda(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-full font-body text-sm" style={{ background: '#FFFFFF', border: '1px solid #E8DCC8', color: '#3D2817' }} />
      </div>

      {ventasFiltradas.length === 0 ? (
        <EmptyState icon={ShoppingCart} message="No hay ventas registradas" />
      ) : (
        <div className="space-y-4">
          {ventasFiltradas.map(v => (
            <div key={v.id} className="rounded-3xl p-5" style={{ background: '#FFFFFF', border: '1px solid #E8DCC8' }}>
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <div>
                  <h3 className="font-display text-lg font-bold" style={{ color: '#3D2817' }}>{v.clienteNombre}</h3>
                  <p className="font-body text-xs flex items-center gap-1" style={{ color: '#8B6F47' }}>
                    <Calendar className="w-3 h-3" />
                    {new Date(v.fecha).toLocaleString('es-AR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => togglePagado(v.id)} className="px-3 py-1.5 rounded-full text-xs font-body font-medium" style={{ background: v.pagado ? '#D7E5C7' : '#FDE5D5', color: v.pagado ? '#4A6B2C' : '#9D4C32' }}>
                    {v.pagado ? '✓ Pagado' : 'Pendiente'}
                  </button>
                  <button onClick={() => eliminarVenta(v.id)} className="p-2 rounded-full hover:bg-red-50" style={{ color: '#9D4C32' }}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-1 mb-3">
                {v.items.map((it, i) => (
                  <div key={i} className="flex justify-between text-sm font-body py-1" style={{ color: '#3D2817' }}>
                    <span>{it.cantidad} × {it.nombre}</span>
                    <span style={{ color: '#6B4423' }}>${it.subtotal.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: '#F5EFE6' }}>
                <span className="font-body text-xs uppercase tracking-wider" style={{ color: '#8B6F47' }}>Total</span>
                <span className="font-display text-2xl font-bold" style={{ color: '#B85C38' }}>${v.total.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <Modal onClose={() => setShowForm(false)} title="Nueva venta" wide>
          <div className="space-y-4">
            <Field label="Cliente">
              <select value={clienteSel} onChange={e => setClienteSel(e.target.value)} className="w-full px-4 py-3 rounded-2xl font-body" style={{ background: '#FAF6F0', border: '1px solid #E8DCC8', color: '#3D2817' }}>
                <option value="">Sin registrar</option>
                {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                <option value="__nuevo__">+ Crear nuevo cliente</option>
              </select>
            </Field>

            {clienteSel === '__nuevo__' && (
              <Field label="Nombre del nuevo cliente">
                <input type="text" value={clienteNuevo} onChange={e => setClienteNuevo(e.target.value)} className="w-full px-4 py-3 rounded-2xl font-body" style={{ background: '#FAF6F0', border: '1px solid #E8DCC8', color: '#3D2817' }} placeholder="Nombre completo" />
              </Field>
            )}

            <div>
              <p className="font-body text-xs uppercase tracking-wider mb-2" style={{ color: '#8B6F47' }}>Productos</p>
              <div className="grid grid-cols-2 gap-2 mb-4 max-h-48 overflow-y-auto scrollbar-thin">
                {budines.map(b => (
                  <button key={b.id} onClick={() => agregarItem(b.id)} className="text-left p-3 rounded-2xl transition-all hover:-translate-y-0.5" style={{ background: '#FAF6F0', border: '1px solid #E8DCC8' }}>
                    <p className="font-body font-medium text-sm" style={{ color: '#3D2817' }}>{b.nombre}</p>
                    <p className="font-display font-bold text-sm" style={{ color: '#B85C38' }}>${b.precio.toLocaleString()}</p>
                    <p className="font-body text-xs" style={{ color: '#8B6F47' }}>Stock: {b.stock}</p>
                  </button>
                ))}
              </div>
            </div>

            {items.length > 0 && (
              <div className="rounded-2xl p-4" style={{ background: '#FDF4EC' }}>
                <p className="font-body text-xs uppercase tracking-wider mb-3" style={{ color: '#8B6F47' }}>Detalle del pedido</p>
                <div className="space-y-2 mb-3">
                  {items.map(it => {
                    const b = budines.find(x => x.id === it.budinId);
                    if (!b) return null;
                    return (
                      <div key={it.budinId} className="flex items-center justify-between gap-3">
                        <span className="font-body text-sm flex-1" style={{ color: '#3D2817' }}>{b.nombre}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => cambiarCantidad(it.budinId, it.cantidad - 1)} className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#E8DCC8', color: '#3D2817' }}>−</button>
                          <span className="font-display font-bold w-6 text-center text-sm" style={{ color: '#3D2817' }}>{it.cantidad}</span>
                          <button onClick={() => cambiarCantidad(it.budinId, it.cantidad + 1)} className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: '#B85C38' }}>+</button>
                        </div>
                        <span className="font-body font-medium text-sm w-20 text-right" style={{ color: '#6B4423' }}>${(b.precio * it.cantidad).toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="pt-3 border-t flex justify-between items-center" style={{ borderColor: '#E8DCC8' }}>
                  <span className="font-body text-sm uppercase tracking-wider" style={{ color: '#8B6F47' }}>Total</span>
                  <span className="font-display text-2xl font-bold" style={{ color: '#B85C38' }}>${total.toLocaleString()}</span>
                </div>
              </div>
            )}

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={descontarStock} onChange={e => setDescontarStock(e.target.checked)} className="w-4 h-4" />
              <span className="font-body text-sm" style={{ color: '#3D2817' }}>Descontar del stock automáticamente</span>
            </label>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-2xl font-body font-medium" style={{ background: '#F5EFE6', color: '#3D2817' }}>Cancelar</button>
              <button onClick={guardarVenta} disabled={items.length === 0} className="flex-1 py-3 rounded-2xl font-body font-medium text-white disabled:opacity-50" style={{ background: '#B85C38' }}>Registrar venta</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ============= CLIENTES =============
function Clientes({ clientes, updateClientes, ventas, budines, templates }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [verCliente, setVerCliente] = useState(null);
  const [form, setForm] = useState({ nombre: '', telefono: '', direccion: '', alias: '', notas: '' });
  const [busqueda, setBusqueda] = useState('');

  const abrirNuevo = () => {
    setEditing(null);
    setForm({ nombre: '', telefono: '', direccion: '', alias: '', notas: '' });
    setShowForm(true);
  };

  const abrirEditar = (c) => {
    setEditing(c.id);
    setForm({ nombre: c.nombre, telefono: c.telefono || '', direccion: c.direccion || '', alias: c.alias || '', notas: c.notas || '' });
    setShowForm(true);
    setVerCliente(null);
  };

  const guardarCli = () => {
    if (!form.nombre.trim()) return;
    if (editing) {
      updateClientes(clientes.map(c => c.id === editing ? { ...c, ...form, nombre: form.nombre.trim() } : c));
    } else {
      updateClientes([...clientes, { id: `cli_${Date.now()}`, ...form, nombre: form.nombre.trim() }]);
    }
    setShowForm(false);
  };

  const eliminar = (id) => {
    if (confirm('¿Eliminar este cliente? Las ventas asociadas se mantendrán.')) {
      updateClientes(clientes.filter(c => c.id !== id));
      setVerCliente(null);
    }
  };

  const clientesFiltrados = clientes.filter(c => 
    !busqueda || 
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    (c.telefono && c.telefono.includes(busqueda))
  );

  const ventasCliente = (id) => ventas.filter(v => v.clienteId === id).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <div className="animate-slideUp">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="font-body text-sm tracking-widest uppercase mb-2" style={{ color: '#8B6F47' }}>Fichas</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: '#3D2817' }}>Clientes</h2>
        </div>
        <button onClick={abrirNuevo} className="px-5 py-3 rounded-full font-body font-medium text-sm flex items-center gap-2 text-white" style={{ background: '#B85C38' }}>
          <Plus className="w-4 h-4" /> Nuevo cliente
        </button>
      </div>

      <div className="mb-6 relative">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#8B6F47' }} />
        <input type="text" placeholder="Buscar por nombre o teléfono..." value={busqueda} onChange={e => setBusqueda(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-full font-body text-sm" style={{ background: '#FFFFFF', border: '1px solid #E8DCC8', color: '#3D2817' }} />
      </div>

      {clientesFiltrados.length === 0 ? (
        <EmptyState icon={Users} message="Aún no hay clientes registrados" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clientesFiltrados.map(c => {
            const totalVentas = ventas.filter(v => v.clienteId === c.id).reduce((s, v) => s + v.total, 0);
            const cantVentas = ventas.filter(v => v.clienteId === c.id).length;
            return (
              <button key={c.id} onClick={() => setVerCliente(c)} className="text-left rounded-3xl p-5 transition-all hover:-translate-y-1" style={{ background: '#FFFFFF', border: '1px solid #E8DCC8' }}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-white text-lg flex-shrink-0" style={{ background: '#B85C38' }}>
                    {c.nombre.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-bold truncate" style={{ color: '#3D2817' }}>{c.nombre}</h3>
                    {c.telefono && <p className="font-body text-xs flex items-center gap-1 truncate" style={{ color: '#8B6F47' }}><Phone className="w-3 h-3" />{c.telefono}</p>}
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: '#F5EFE6' }}>
                  <div>
                    <p className="font-body text-xs" style={{ color: '#8B6F47' }}>{cantVentas} {cantVentas === 1 ? 'compra' : 'compras'}</p>
                  </div>
                  <p className="font-display font-bold" style={{ color: '#B85C38' }}>${totalVentas.toLocaleString()}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {verCliente && (
        <Modal onClose={() => setVerCliente(null)} title={verCliente.nombre} wide>
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-white text-2xl" style={{ background: '#B85C38' }}>
                {verCliente.nombre.charAt(0).toUpperCase()}
              </div>
              <div className="flex gap-2">
                <button onClick={() => abrirEditar(verCliente)} className="px-4 py-2 rounded-full font-body text-xs font-medium flex items-center gap-1.5" style={{ background: '#F5EFE6', color: '#3D2817' }}>
                  <Edit3 className="w-3 h-3" /> Editar
                </button>
                <button onClick={() => eliminar(verCliente.id)} className="px-4 py-2 rounded-full font-body text-xs font-medium flex items-center gap-1.5" style={{ background: '#FDE5D5', color: '#9D4C32' }}>
                  <Trash2 className="w-3 h-3" /> Eliminar
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {verCliente.telefono && <InfoCard icon={Phone} label="Teléfono" value={verCliente.telefono} />}
              {verCliente.direccion && <InfoCard icon={MapPin} label="Dirección" value={verCliente.direccion} />}
              {verCliente.alias && <InfoCard icon={CreditCard} label="Alias / CBU" value={verCliente.alias} />}
            </div>

            {verCliente.notas && (
              <div className="rounded-2xl p-4" style={{ background: '#FDF4EC' }}>
                <p className="font-body text-xs uppercase tracking-wider mb-2" style={{ color: '#8B6F47' }}>Notas</p>
                <p className="font-body text-sm" style={{ color: '#3D2817' }}>{verCliente.notas}</p>
              </div>
            )}

            <div>
              <p className="font-body text-xs uppercase tracking-wider mb-3" style={{ color: '#8B6F47' }}>Historial de compras</p>
              {ventasCliente(verCliente.id).length === 0 ? (
                <p className="font-body text-sm py-6 text-center" style={{ color: '#8B6F47' }}>Sin compras registradas</p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
                  {ventasCliente(verCliente.id).map(v => (
                    <div key={v.id} className="p-3 rounded-2xl" style={{ background: '#FAF6F0' }}>
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-body text-xs" style={{ color: '#8B6F47' }}>
                          {new Date(v.fecha).toLocaleString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                        <p className="font-display font-bold text-sm" style={{ color: '#B85C38' }}>${v.total.toLocaleString()}</p>
                      </div>
                      <p className="font-body text-xs" style={{ color: '#3D2817' }}>
                        {v.items.map(it => `${it.cantidad}× ${it.nombre}`).join(' · ')}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {verCliente.telefono && templates.length > 0 && (
              <div className="pt-3 border-t" style={{ borderColor: '#F5EFE6' }}>
                <p className="font-body text-xs uppercase tracking-wider mb-2" style={{ color: '#8B6F47' }}>Enviar mensaje rápido</p>
                <div className="flex flex-wrap gap-2">
                  {templates.map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        const ultimaVenta = ventasCliente(verCliente.id)[0];
                        const detalle = ultimaVenta ? ultimaVenta.items.map(it => `${it.cantidad}× ${it.nombre}`).join(', ') : '';
                        const total = ultimaVenta ? ultimaVenta.total : 0;
                        const msj = t.mensaje
                          .replace(/{nombre}/g, verCliente.nombre)
                          .replace(/{detalle}/g, detalle)
                          .replace(/{total}/g, total.toLocaleString());
                        const tel = verCliente.telefono.replace(/[^0-9]/g, '');
                        window.open(`https://wa.me/${tel}?text=${encodeURIComponent(msj)}`, '_blank');
                      }}
                      className="px-3 py-1.5 rounded-full font-body text-xs flex items-center gap-1.5 text-white"
                      style={{ background: '#25D366' }}
                    >
                      <Send className="w-3 h-3" /> {t.nombre}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {showForm && (
        <Modal onClose={() => setShowForm(false)} title={editing ? 'Editar cliente' : 'Nuevo cliente'}>
          <div className="space-y-4">
            <Field label="Nombre">
              <input type="text" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} className="w-full px-4 py-3 rounded-2xl font-body" style={{ background: '#FAF6F0', border: '1px solid #E8DCC8', color: '#3D2817' }} placeholder="Nombre completo" />
            </Field>
            <Field label="Teléfono (con código de país, ej: 5491234567890)">
              <input type="tel" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} className="w-full px-4 py-3 rounded-2xl font-body" style={{ background: '#FAF6F0', border: '1px solid #E8DCC8', color: '#3D2817' }} placeholder="5491234567890" />
            </Field>
            <Field label="Dirección">
              <input type="text" value={form.direccion} onChange={e => setForm({ ...form, direccion: e.target.value })} className="w-full px-4 py-3 rounded-2xl font-body" style={{ background: '#FAF6F0', border: '1px solid #E8DCC8', color: '#3D2817' }} placeholder="Calle, número, ciudad" />
            </Field>
            <Field label="Alias / CBU / Método de pago">
              <input type="text" value={form.alias} onChange={e => setForm({ ...form, alias: e.target.value })} className="w-full px-4 py-3 rounded-2xl font-body" style={{ background: '#FAF6F0', border: '1px solid #E8DCC8', color: '#3D2817' }} placeholder="alias.mercadopago" />
            </Field>
            <Field label="Notas">
              <textarea value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-2xl font-body resize-none" style={{ background: '#FAF6F0', border: '1px solid #E8DCC8', color: '#3D2817' }} placeholder="Preferencias, observaciones, etc." />
            </Field>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-2xl font-body font-medium" style={{ background: '#F5EFE6', color: '#3D2817' }}>Cancelar</button>
              <button onClick={guardarCli} className="flex-1 py-3 rounded-2xl font-body font-medium text-white" style={{ background: '#B85C38' }}>Guardar</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ============= COMPRAS (de insumos) =============
function Compras({ compras, updateCompras }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ item: '', precio: '', cantidad: '1', proveedor: '', notas: '' });

  const abrirNuevo = () => {
    setEditing(null);
    setForm({ item: '', precio: '', cantidad: '1', proveedor: '', notas: '' });
    setShowForm(true);
  };

  const abrirEditar = (c) => {
    setEditing(c.id);
    setForm({ item: c.item, precio: c.precio, cantidad: c.cantidad, proveedor: c.proveedor || '', notas: c.notas || '' });
    setShowForm(true);
  };

  const guardar = () => {
    if (!form.item.trim() || !form.precio) return;
    const datos = {
      item: form.item.trim(),
      precio: parseFloat(form.precio) || 0,
      cantidad: parseFloat(form.cantidad) || 1,
      proveedor: form.proveedor.trim(),
      notas: form.notas.trim(),
      fecha: editing ? compras.find(c => c.id === editing).fecha : new Date().toISOString(),
    };
    if (editing) {
      updateCompras(compras.map(c => c.id === editing ? { ...c, ...datos } : c));
    } else {
      updateCompras([{ id: `com_${Date.now()}`, ...datos }, ...compras]);
    }
    setShowForm(false);
  };

  const eliminar = (id) => {
    if (confirm('¿Eliminar este registro?')) {
      updateCompras(compras.filter(c => c.id !== id));
    }
  };

  // Agrupar por mes
  const porMes = {};
  [...compras].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).forEach(c => {
    const d = new Date(c.fecha);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!porMes[key]) porMes[key] = [];
    porMes[key].push(c);
  });

  const totalGeneral = compras.reduce((s, c) => s + c.precio * c.cantidad, 0);

  return (
    <div className="animate-slideUp">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="font-body text-sm tracking-widest uppercase mb-2" style={{ color: '#8B6F47' }}>Insumos</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: '#3D2817' }}>Compras</h2>
        </div>
        <button onClick={abrirNuevo} className="px-5 py-3 rounded-full font-body font-medium text-sm flex items-center gap-2 text-white" style={{ background: '#B85C38' }}>
          <Plus className="w-4 h-4" /> Registrar compra
        </button>
      </div>

      {compras.length > 0 && (
        <div className="rounded-3xl p-5 mb-6" style={{ background: 'linear-gradient(135deg, #6B4423 0%, #3D2817 100%)' }}>
          <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: '#D4A574' }}>Gastado en total</p>
          <p className="font-display text-4xl font-bold text-white">${totalGeneral.toLocaleString()}</p>
          <p className="font-body text-xs mt-1" style={{ color: '#D4A574' }}>{compras.length} {compras.length === 1 ? 'registro' : 'registros'}</p>
        </div>
      )}

      {compras.length === 0 ? (
        <EmptyState icon={TrendingUp} message="No hay compras de insumos registradas" />
      ) : (
        <div className="space-y-6">
          {Object.entries(porMes).map(([mes, items]) => {
            const [año, m] = mes.split('-');
            const fecha = new Date(parseInt(año), parseInt(m) - 1);
            const subtotal = items.reduce((s, c) => s + c.precio * c.cantidad, 0);
            return (
              <div key={mes}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-lg font-bold capitalize" style={{ color: '#3D2817' }}>
                    {fecha.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })}
                  </h3>
                  <span className="font-display font-bold" style={{ color: '#B85C38' }}>${subtotal.toLocaleString()}</span>
                </div>
                <div className="space-y-2">
                  {items.map(c => (
                    <div key={c.id} className="rounded-2xl p-4 flex items-center gap-4" style={{ background: '#FFFFFF', border: '1px solid #E8DCC8' }}>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-body font-medium" style={{ color: '#3D2817' }}>{c.item}</h4>
                        <p className="font-body text-xs" style={{ color: '#8B6F47' }}>
                          {new Date(c.fecha).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
                          {c.proveedor && ` · ${c.proveedor}`}
                          {c.cantidad > 1 && ` · ${c.cantidad} unidades`}
                        </p>
                        {c.notas && <p className="font-body text-xs italic mt-1" style={{ color: '#8B6F47' }}>{c.notas}</p>}
                      </div>
                      <div className="text-right">
                        <p className="font-display font-bold" style={{ color: '#B85C38' }}>${(c.precio * c.cantidad).toLocaleString()}</p>
                        {c.cantidad > 1 && <p className="font-body text-xs" style={{ color: '#8B6F47' }}>${c.precio.toLocaleString()} c/u</p>}
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => abrirEditar(c)} className="p-2 rounded-full hover:bg-stone-100" style={{ color: '#6B4423' }}>
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => eliminar(c.id)} className="p-2 rounded-full hover:bg-red-50" style={{ color: '#9D4C32' }}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showForm && (
        <Modal onClose={() => setShowForm(false)} title={editing ? 'Editar compra' : 'Registrar compra'}>
          <div className="space-y-4">
            <Field label="Item">
              <input type="text" value={form.item} onChange={e => setForm({ ...form, item: e.target.value })} className="w-full px-4 py-3 rounded-2xl font-body" style={{ background: '#FAF6F0', border: '1px solid #E8DCC8', color: '#3D2817' }} placeholder="Ej: Harina 0000, huevos, manteca..." />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Precio unitario">
                <input type="number" step="0.01" value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} className="w-full px-4 py-3 rounded-2xl font-body" style={{ background: '#FAF6F0', border: '1px solid #E8DCC8', color: '#3D2817' }} placeholder="0" />
              </Field>
              <Field label="Cantidad">
                <input type="number" step="0.01" value={form.cantidad} onChange={e => setForm({ ...form, cantidad: e.target.value })} className="w-full px-4 py-3 rounded-2xl font-body" style={{ background: '#FAF6F0', border: '1px solid #E8DCC8', color: '#3D2817' }} placeholder="1" />
              </Field>
            </div>
            <Field label="Proveedor (opcional)">
              <input type="text" value={form.proveedor} onChange={e => setForm({ ...form, proveedor: e.target.value })} className="w-full px-4 py-3 rounded-2xl font-body" style={{ background: '#FAF6F0', border: '1px solid #E8DCC8', color: '#3D2817' }} placeholder="Dónde lo compraste" />
            </Field>
            <Field label="Notas (opcional)">
              <input type="text" value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} className="w-full px-4 py-3 rounded-2xl font-body" style={{ background: '#FAF6F0', border: '1px solid #E8DCC8', color: '#3D2817' }} placeholder="Marca, observaciones..." />
            </Field>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-2xl font-body font-medium" style={{ background: '#F5EFE6', color: '#3D2817' }}>Cancelar</button>
              <button onClick={guardar} className="flex-1 py-3 rounded-2xl font-body font-medium text-white" style={{ background: '#B85C38' }}>Guardar</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ============= WHATSAPP =============
function WhatsApp({ templates, updateTemplates, clientes, ventas, budines }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ nombre: '', mensaje: '' });
  const [enviarA, setEnviarA] = useState(null);

  const abrirNuevo = () => {
    setEditing(null);
    setForm({ nombre: '', mensaje: '' });
    setShowForm(true);
  };

  const abrirEditar = (t) => {
    setEditing(t.id);
    setForm({ nombre: t.nombre, mensaje: t.mensaje });
    setShowForm(true);
  };

  const guardar = () => {
    if (!form.nombre.trim() || !form.mensaje.trim()) return;
    if (editing) {
      updateTemplates(templates.map(t => t.id === editing ? { ...t, ...form } : t));
    } else {
      updateTemplates([...templates, { id: `t_${Date.now()}`, ...form }]);
    }
    setShowForm(false);
  };

  const eliminar = (id) => {
    if (confirm('¿Eliminar esta plantilla?')) {
      updateTemplates(templates.filter(t => t.id !== id));
    }
  };

  const enviar = (cliente, mensaje) => {
    if (!cliente.telefono) {
      alert('Este cliente no tiene teléfono cargado');
      return;
    }
    const ultimaVenta = ventas.filter(v => v.clienteId === cliente.id).sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];
    const detalle = ultimaVenta ? ultimaVenta.items.map(it => `${it.cantidad}× ${it.nombre}`).join(', ') : '';
    const total = ultimaVenta ? ultimaVenta.total : 0;
    const msj = mensaje
      .replace(/{nombre}/g, cliente.nombre)
      .replace(/{detalle}/g, detalle)
      .replace(/{total}/g, total.toLocaleString());
    const tel = cliente.telefono.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${tel}?text=${encodeURIComponent(msj)}`, '_blank');
    setEnviarA(null);
  };

  const copiar = (texto) => {
    navigator.clipboard.writeText(texto);
  };

  return (
    <div className="animate-slideUp">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="font-body text-sm tracking-widest uppercase mb-2" style={{ color: '#8B6F47' }}>Mensajes automáticos</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: '#3D2817' }}>WhatsApp</h2>
        </div>
        <button onClick={abrirNuevo} className="px-5 py-3 rounded-full font-body font-medium text-sm flex items-center gap-2 text-white" style={{ background: '#B85C38' }}>
          <Plus className="w-4 h-4" /> Nueva plantilla
        </button>
      </div>

      <div className="rounded-3xl p-5 mb-6" style={{ background: '#E7F7EC', border: '1px solid #B8DDC4' }}>
        <div className="flex items-start gap-3">
          <MessageCircle className="w-5 h-5 mt-0.5" style={{ color: '#1A7A3E' }} />
          <div className="flex-1">
            <p className="font-body text-sm font-medium" style={{ color: '#1A4D26' }}>Cómo funciona</p>
            <p className="font-body text-xs mt-1" style={{ color: '#2D5C3A' }}>
              Crea plantillas de mensajes y úsalas con un clic. Los mensajes se abren en WhatsApp Web/App listos para enviar. Puedes usar las variables: <code className="px-1 rounded" style={{ background: '#FFF', color: '#1A7A3E' }}>{'{nombre}'}</code>, <code className="px-1 rounded" style={{ background: '#FFF', color: '#1A7A3E' }}>{'{detalle}'}</code> (último pedido), <code className="px-1 rounded" style={{ background: '#FFF', color: '#1A7A3E' }}>{'{total}'}</code>.
            </p>
          </div>
        </div>
      </div>

      {templates.length === 0 ? (
        <EmptyState icon={MessageCircle} message="No hay plantillas creadas" />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {templates.map(t => (
            <div key={t.id} className="rounded-3xl p-5" style={{ background: '#FFFFFF', border: '1px solid #E8DCC8' }}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display text-lg font-bold flex-1" style={{ color: '#3D2817' }}>{t.nombre}</h3>
                <div className="flex gap-1">
                  <button onClick={() => copiar(t.mensaje)} className="p-2 rounded-full hover:bg-stone-100" style={{ color: '#6B4423' }} title="Copiar">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button onClick={() => abrirEditar(t)} className="p-2 rounded-full hover:bg-stone-100" style={{ color: '#6B4423' }}>
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => eliminar(t.id)} className="p-2 rounded-full hover:bg-red-50" style={{ color: '#9D4C32' }}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="font-body text-sm mb-4 p-3 rounded-2xl whitespace-pre-wrap" style={{ background: '#FAF6F0', color: '#3D2817' }}>{t.mensaje}</p>
              <button onClick={() => setEnviarA(t)} className="w-full py-2.5 rounded-2xl font-body text-sm font-medium flex items-center justify-center gap-2 text-white" style={{ background: '#25D366' }}>
                <Send className="w-4 h-4" /> Enviar a un cliente
              </button>
            </div>
          ))}
        </div>
      )}

      {enviarA && (
        <Modal onClose={() => setEnviarA(null)} title={`Enviar: ${enviarA.nombre}`}>
          <div className="space-y-3">
            <p className="font-body text-sm" style={{ color: '#8B6F47' }}>Selecciona el cliente al que enviar el mensaje</p>
            {clientes.length === 0 ? (
              <p className="font-body text-sm py-6 text-center" style={{ color: '#8B6F47' }}>Aún no hay clientes registrados</p>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-thin">
                {clientes.map(c => (
                  <button
                    key={c.id}
                    onClick={() => enviar(c, enviarA.mensaje)}
                    disabled={!c.telefono}
                    className="w-full text-left p-3 rounded-2xl flex items-center gap-3 transition-all disabled:opacity-50"
                    style={{ background: '#FAF6F0', border: '1px solid #E8DCC8' }}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-white" style={{ background: '#B85C38' }}>
                      {c.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-medium text-sm" style={{ color: '#3D2817' }}>{c.nombre}</p>
                      <p className="font-body text-xs" style={{ color: '#8B6F47' }}>{c.telefono || 'Sin teléfono'}</p>
                    </div>
                    <Send className="w-4 h-4" style={{ color: '#25D366' }} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}

      {showForm && (
        <Modal onClose={() => setShowForm(false)} title={editing ? 'Editar plantilla' : 'Nueva plantilla'}>
          <div className="space-y-4">
            <Field label="Nombre de la plantilla">
              <input type="text" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} className="w-full px-4 py-3 rounded-2xl font-body" style={{ background: '#FAF6F0', border: '1px solid #E8DCC8', color: '#3D2817' }} placeholder="Ej: Confirmación, Recordatorio..." />
            </Field>
            <Field label="Mensaje">
              <textarea value={form.mensaje} onChange={e => setForm({ ...form, mensaje: e.target.value })} rows={6} className="w-full px-4 py-3 rounded-2xl font-body resize-none" style={{ background: '#FAF6F0', border: '1px solid #E8DCC8', color: '#3D2817' }} placeholder="Escribe el mensaje. Usa {nombre}, {detalle}, {total}" />
            </Field>
            <div className="rounded-2xl p-3" style={{ background: '#FDF4EC' }}>
              <p className="font-body text-xs" style={{ color: '#8B6F47' }}>
                💡 Variables: <code style={{ color: '#B85C38' }}>{'{nombre}'}</code> · <code style={{ color: '#B85C38' }}>{'{detalle}'}</code> · <code style={{ color: '#B85C38' }}>{'{total}'}</code>
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-2xl font-body font-medium" style={{ background: '#F5EFE6', color: '#3D2817' }}>Cancelar</button>
              <button onClick={guardar} className="flex-1 py-3 rounded-2xl font-body font-medium text-white" style={{ background: '#B85C38' }}>Guardar</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ============= COMPONENTES AUXILIARES =============
function Modal({ children, onClose, title, wide }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(61, 40, 23, 0.4)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className={`w-full ${wide ? 'max-w-2xl' : 'max-w-md'} rounded-3xl p-6 max-h-[90vh] overflow-y-auto scrollbar-thin animate-slideUp`} style={{ background: '#FAF6F0' }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-2xl font-bold" style={{ color: '#3D2817' }}>{title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-stone-200" style={{ color: '#6B4423' }}>
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="font-body text-xs uppercase tracking-wider mb-1.5 block" style={{ color: '#8B6F47' }}>{label}</label>
      {children}
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl p-3 flex items-center gap-3" style={{ background: '#FAF6F0' }}>
      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FFFFFF' }}>
        <Icon className="w-4 h-4" style={{ color: '#B85C38' }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-body text-xs uppercase tracking-wider" style={{ color: '#8B6F47' }}>{label}</p>
        <p className="font-body text-sm font-medium truncate" style={{ color: '#3D2817' }}>{value}</p>
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, message }) {
  return (
    <div className="rounded-3xl py-16 text-center" style={{ background: '#FFFFFF', border: '1px dashed #E8DCC8' }}>
      <Icon className="w-10 h-10 mx-auto mb-3" style={{ color: '#D4A574' }} />
      <p className="font-body text-sm" style={{ color: '#8B6F47' }}>{message}</p>
    </div>
  );
}


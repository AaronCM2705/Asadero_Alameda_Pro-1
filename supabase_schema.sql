-- CREACIÓN DE LA TABLA DE PEDIDOS
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    items JSONB NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    proposal_version TEXT -- Para saber desde qué diseño se hizo (p1, p2, p3)
);

-- HABILITAR TIEMPO REAL PARA ESTA TABLA
ALTER PUBLICATION supabase_realtime ADD TABLE orders;

-- POLÍTICAS DE SEGURIDAD (RLS)
-- Por ahora, permitimos lectura y escritura pública para facilitar la demo
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir inserción pública" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir lectura pública" ON orders FOR SELECT USING (true);
CREATE POLICY "Permitir actualización pública" ON orders FOR UPDATE USING (true);
CREATE POLICY "Permitir borrado público" ON orders FOR DELETE USING (true);

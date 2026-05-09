import { createClient } from '@supabase/supabase-js';

// Reemplaza estos valores con los de tu proyecto de Supabase para activar la base de datos real
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Comprobación de seguridad para saber si la configuración es real
export const isSupabaseConfigured = 
  supabaseUrl !== 'https://your-project.supabase.co' && 
  supabaseKey !== 'your-anon-key';

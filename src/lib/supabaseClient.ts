import { createClient } from '@supabase/supabase-js'

// Prefer public env vars on the client; fall back to server vars on server
const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL) as string
const supabaseKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY) as string

if (!supabaseUrl) throw new Error('supabaseUrl is required.')
if (!supabaseKey) throw new Error('supabaseKey is required.')

export const supabase = createClient(supabaseUrl, supabaseKey)

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hcixlsvfkbdxhyulinkr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjaXhsc3Zma2JkeGh5dWxpbmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NDM3NzYsImV4cCI6MjA3MDExOTc3Nn0.UAIzQ_XRPbhRxCXTDGpKnvuYTW_WihepW0_O1nmbUoE'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
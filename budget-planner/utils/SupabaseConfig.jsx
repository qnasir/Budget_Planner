
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://rjpkzntsifbezwjyegzv.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqcGt6bnRzaWZiZXp3anllZ3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5Nzc5MTMsImV4cCI6MjAzMDU1MzkxM30.LXPPP1eX9RDzj4JZsYXiisyA8OBczKpR4dPsaMZduwU'
)



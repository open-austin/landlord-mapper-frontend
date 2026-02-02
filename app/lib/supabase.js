import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://kuuvyfrchzsodnqitchn.supabase.co';
const supabaseKey = 'sb_publishable_osW4xJUr2nmNb5aTwEcn_A_JYbLfdjy';

export const supabase = createClient(supabaseUrl, supabaseKey);
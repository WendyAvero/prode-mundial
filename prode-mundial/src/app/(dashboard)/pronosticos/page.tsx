import { createClient } from '@/lib/supabase/server'
import PronosticosClient from './PronosticosClient'

export default async function PronosticosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: matches } = await supabase
    .from('matches')
    .select('*, home_team:teams!home_team_id(*), away_team:teams!away_team_id(*), phase:phases(*)')
    .in('status', ['scheduled', 'live'])
    .order('match_date')
  const { data: predictions } = await supabase
    .from('predictions')
    .select('*')
    .eq('user_id', user!.id)
  return <PronosticosClient matches={matches || []} predictions={predictions || []} userId={user!.id} />
}

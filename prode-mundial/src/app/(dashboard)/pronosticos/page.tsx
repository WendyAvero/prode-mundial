import React from 'react'
export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'
import PronosticosClient from './PronosticosClient'

export default async function PronosticosPage() {
  let matches: any[] = []
  let predictions: any[] = []
  let userId = ''

  try {
    const supabase = await createClient()
    
    const { data: m } = await supabase
      .from('matches')
      .select('*, home_team:teams!home_team_id(*), away_team:teams!away_team_id(*)')
      .in('status', ['scheduled', 'live'])
      .order('match_date')
    matches = m || []

  } catch (e) {
    console.error('Error:', e)
  }

  return <PronosticosClient matches={matches} predictions={predictions} userId={userId} />
}

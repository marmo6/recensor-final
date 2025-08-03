import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lyhaowpsiunvazanxxaw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5aGFvd3BzaXVudmF6YW54eGF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjY5MTQsImV4cCI6MjA2OTY0MjkxNH0.rWjcl2zo0BoKY3o3S0hDnOK-98veZjHNzxh3Hwgwh2Q'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const auth = {
  signUp: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      return { error }
    }
  },

  getUser: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    } catch (error) {
      return null
    }
  }
}

export const profiles = {
  create: async (userId, email) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert({
          id: userId,
          email: email,
          plan: 'free',
          searches_today: 0
        })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  get: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }
}

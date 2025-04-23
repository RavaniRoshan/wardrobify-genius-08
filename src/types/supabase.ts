import { Database as DatabaseGenerated } from './supabase-generated-types'

export type Database = DatabaseGenerated

// Convenience types for your database tables
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Type-safe database functions
export type InsertDTO<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateDTO<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Example usage:
// type User = Tables<'users'>
// type InsertUser = InsertDTO<'users'>
// type UpdateUser = UpdateDTO<'users'> 
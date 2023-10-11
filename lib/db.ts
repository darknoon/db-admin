import { sql } from '@vercel/postgres'
import pgFormat from 'pg-format'

export async function getAllTableNames() {
  const q =
    await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
  return q.rows.map((r) => r.table_name) as string[]
}

export interface Column {
  column_name: string
  ordinal_position: number
  column_default: string
  is_nullable: string
  data_type: string
  is_identity: 'YES' | 'NO'
  comment?: string
}

export async function getTableStructure(table: string) {
  const q =
    await sql`SELECT column_name, ordinal_position, is_nullable, data_type, is_identity, column_default, col_description(table_name::regclass, ordinal_position) as comment FROM information_schema.columns WHERE table_name = ${table}`
  return q.rows as Column[]
}

export async function getRows(
  table: string,
  limit: number = 100,
  offset: number = 0,
) {
  const client = await sql.connect()
  try {
    const q = await client.query(
      pgFormat('SELECT * FROM %I LIMIT %L OFFSET %L', table, limit, offset),
    )
    return q.rows
  } finally {
    client.release()
  }
}

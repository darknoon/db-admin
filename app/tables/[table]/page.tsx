import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Column, getRows, getTableStructure } from '@/lib/db'

export default async function TablePage({
  params: { table },
}: {
  params: { table: string }
}) {
  const columns = await getTableStructure(table)
  return (
    <div>
      <h1 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        {table}
      </h1>
      <h3 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
        schema
      </h3>
      <Structure columns={columns} />
      <h3 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
        data
      </h3>
      <Data table={table} />
    </div>
  )
}

async function Data({
  table,
  limit,
  offset,
}: {
  table: string
  limit?: number
  offset?: number
}) {
  const columns = await getTableStructure(table)
  const rows = await getRows(table, limit, offset)
  return (
    <div>
      <DataRows rows={rows} columns={columns} />
    </div>
  )
}

function Content({ column, value }: { column: Column; value: any }) {
  if (column.data_type === 'date') {
    return <span>{new Date(value).toLocaleDateString()}</span>
  }
  if (typeof value === 'object') {
    return (
      <pre>
        {value.constructor.name ?? 'Object'}
        {JSON.stringify(value, null, 2)}
      </pre>
    )
  }
  return <span>{value}</span>
}

async function DataRows({ columns, rows }: { columns: Column[]; rows: any[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((c) => (
            <TableHead key={c.ordinal_position}>{c.column_name}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={i}>
            {columns.map((c) => (
              <TableCell key={c.ordinal_position}>
                <Content column={c} value={row[c.column_name]} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableCaption>First {rows.length} rows</TableCaption>
    </Table>
  )
}

function Structure({ columns }: { columns: Column[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Column</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Default</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="overflow-scroll max-h-12">
        {columns.map((c) => (
          <TableRow key={c.ordinal_position}>
            <TableCell>
              {c.column_name}
              {c.is_identity === 'YES' && (
                <>
                  <span> </span>
                  <span className="font-semibold opacity-20">:id</span>
                </>
              )}
            </TableCell>
            <TableCell>{c.data_type}</TableCell>
            <TableCell>{c.column_default}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

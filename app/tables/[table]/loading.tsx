import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

function PlaceholderTable() {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Column</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Default</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="overflow-scroll max-h-12">
        <TableRow>
          <TableCell>column_name</TableCell>
          <TableCell>data_type</TableCell>
          <TableCell>column_default</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default function Loading() {
  return (
    <div>
      <h1 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight opacity-30">
        Loading…
      </h1>
      <h3 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
        schema
      </h3>
      <PlaceholderTable />
      <h3 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
        data
      </h3>
      <PlaceholderTable />
    </div>
  )
}

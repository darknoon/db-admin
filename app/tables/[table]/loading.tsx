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
          <TableHead>id</TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="overflow-scroll max-h-12">
        <TableRow>
          <TableCell>loading…</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default function Loading() {
  return (
    <div>
      <span className="opacity-30">Edit structure</span>
      <PlaceholderTable />
    </div>
  )
}

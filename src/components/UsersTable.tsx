import { useUsers } from "@/conetexts/UsersContext";
import { UserDetails } from "@/dtos/userDtos";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import DeleteUserDialog from "./DeleteUserDialog";
import { UserDetailsDialog } from "./UserDetailsDialog";

const columns: ColumnDef<UserDetails>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-between">
        <UserDetailsDialog user={row.original}></UserDetailsDialog>
        <DeleteUserDialog
          userId={row.original.id}
          userName={row.original.name}
        ></DeleteUserDialog>
      </div>
    ),
  },
];

export default function UsersTable() {
  const { data, isPending, pageRequest, setPageRequest, refetch } = useUsers();

  const table = useReactTable({
    data: isPending ? [] : data!.content,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableCell colSpan={columns.length} className="text-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem
                className={
                  !data || data.first
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }
              >
                <PaginationPrevious onClick={decrementPage()} />
              </PaginationItem>
              <PaginationItem>
                {data ? `${data.number + 1}/${data.totalPages}` : "0/0"}
              </PaginationItem>
              <PaginationItem
                className={
                  !data || data.last
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }
              >
                <PaginationNext onClick={incrementPage()} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </TableCell>
      </TableFooter>
    </Table>
  );

  function decrementPage() {
    return () => {
      if (data?.first) {
        return;
      }

      updatePage(-1);
    };
  }

  function incrementPage() {
    return () => {
      if (data?.last) {
        return;
      }

      updatePage(1);
    };
  }

  function updatePage(value: number) {
    setPageRequest({
      ...pageRequest,
      page: pageRequest.page + value,
    });
    setTimeout(refetch);
  }
}

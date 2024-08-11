import DownIcon from "@/assets/icons/downIcon.svg?react";
import EditIcon from "@/assets/icons/editIcon.svg?react";
import TrashcanIcon from "@/assets/icons/trashcan.svg?react";
import UpIcon from "@/assets/icons/upIcon.svg?react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Shop, ShopTableProps } from "../interfaces/shop";

const ShopTable: React.FC<ShopTableProps> = ({ shops, onDelete }) => {
  const navigate = useNavigate();
  const columns = useMemo<ColumnDef<Shop>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <p className="text-center">{row.original.name}</p>,
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
          <p className="text-center">{row.original.location}</p>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
          <p className="text-center">{row.original.description}</p>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2 justify-center">
            <button onClick={() => navigate(`/edit-shop/${row.original.id}`)}>
              <EditIcon width={24} height={24} />
            </button>
            <button onClick={() => onDelete(row.original.id)}>
              <TrashcanIcon width={24} height={24} />
            </button>
          </div>
        ),
      },
    ],
    [onDelete]
  );

  const table = useReactTable({
    data: shops,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full rounded-xl overflow-hidden border border-gray-300">
      <table className="w-full">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b border-gray-300 p-2 text-center"
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: "pointer" }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: <UpIcon className="inline" />,
                    desc: <DownIcon className="inline" />,
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, idx) => (
            <tr
              key={row.id}
              className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border-b border-gray-300 p-2 text-center"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShopTable;

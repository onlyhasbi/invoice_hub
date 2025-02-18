import { nodata } from "@/src/assets";
import { useReady } from "@/src/hooks/useReady";
import { CircularProgress } from "@mui/material";
import MUITable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import React, { Fragment } from "react";

export type Column = {
  id: "invoice_number" | "due_date" | "status" | "amount" | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: unknown) => string;
};

export type ColumnDef = Array<Column>;

type Invoice = {
  invoice_number: string;
  due_date: string;
  status: string;
  amount: number;
  actions: string;
};

export default function Table({
  data,
  columns,
}: {
  data: Array<Invoice>;
  columns: ColumnDef;
}) {
  const isReady = useReady();

  return (
    <Fragment>
      <TableContainer sx={{ maxHeight: 440, boxShadow: "none" }}>
        <MUITable
          stickyHeader
          aria-label="sticky table"
          sx={{ boxShadow: "none" }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  className="!bg-headBlue !font-semibold !text-headNavy"
                  style={{
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={`${row.invoice_number}-${index}`}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MUITable>
      </TableContainer>
      {data.length === 0 && (
        <div className="h-[300px] flex justify-center items-center">
          <div className="flex flex-col gap-2 justify-center items-center text-gray-400 text-sm font-medium">
            {!isReady ? (
              <CircularProgress />
            ) : (
              <React.Fragment>
                <Image src={nodata} width={72} height={72} alt="no-data-icon" />
                <h3>No Data</h3>
              </React.Fragment>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
}

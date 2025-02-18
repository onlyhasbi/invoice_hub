"use client";

import { hamburger, search } from "@/src/assets";
import Table, { ColumnDef } from "@/src/components/invoices/table";
import { openSans } from "@/src/constants/fonts";
import { statusColor } from "@/src/constants/status";
import { useDebounce } from "@/src/hooks/useDebounce";
import useStorage from "@/src/hooks/useStorage";
import { getQueryString } from "@/src/utils/getQueryString";
import { Delete, Edit } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  ListItemIcon,
  Menu,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/id";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
dayjs.locale("id");

function ListInvoice() {
  const { invoices, deleteInvoice } = useStorage();
  const searchParams = useSearchParams();
  const currentPath = usePathname();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      search: searchParams.get("search") ?? "",
      status: searchParams.get("status") ?? "",
    },
  });

  const { debounce } = useDebounce(500);

  const filterCriteria = Object.fromEntries(
    Object.entries({
      name: form.getValues("search"),
      status: form.getValues("status"),
    }).filter(([, value]) => Boolean(value))
  );

  const getFilteredInvoices =
    invoices.length == 0
      ? []
      : invoices
          .filter((item) => {
            const filterEntries = Object.entries(filterCriteria);
            const itemLower = Object.fromEntries(
              Object.keys(filterCriteria).map((key) => [
                key,
                String(item[key as keyof typeof item]).toLowerCase(),
              ])
            );

            for (const [key, filterValue] of filterEntries) {
              if (!itemLower[key].startsWith(filterValue.toLowerCase())) {
                return false;
              }
            }
            return true;
          })
          .map((item) => ({
            status: item.status,
            due_date: item.due_date,
            actions: item.invoice_number,
            invoice_number: [item.invoice_number, item.name].join(","),
            amount: Number(item.amount),
          }));

  const columnns = [
    {
      id: "invoice_number",
      label: "Invoice",
      minWidth: 170,
      align: "left",
      format: (value: string) => {
        const [invoice, name] = value.split(",");
        return (
          <div className="flex flex-col">
            <h3 className="text-[#1C2434] text-[16px]">{name}</h3>
            <p className="text-[#64748B] font-semibold text-sm">{invoice}</p>
          </div>
        );
      },
    },
    {
      id: "due_date",
      label: "Due Date",
      minWidth: 120,
      align: "left",
      format: (value: string) =>
        dayjs(value, { format: "DD/MM/YYYY", locale: "id" })?.format(
          "MMM DD,YYYY"
        ),
    },
    {
      id: "status",
      label: "Status",
      minWidth: 80,
      align: "center",
      format: (value: string) => {
        const status = value as keyof typeof statusColor;
        return (
          <div
            style={{
              fontSize: 14,
              width: statusColor?.[status]?.width,
              background: statusColor?.[status]?.bg,
              color: statusColor?.[status]?.text,
            }}
            className="py-[4px] rounded-full mx-auto"
          >
            {value}
          </div>
        );
      },
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: 160,
      align: "left",
      format: (value: number) =>
        value.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }),
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 100,
      align: "center",
      format: (value: string) => {
        return (
          <Action
            invoice={value}
            onDelete={(invoice) => deleteInvoice(invoice)}
          />
        );
      },
    },
  ];

  const noBorder = {
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none !important",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none !important",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none !important",
    },
  };

  return (
    <div className="flex flex-col gap-[38px]">
      <div className="flex justify-between">
        <h2
          className={`text-[#1C2434] text-[26px] leading-[30px] ${openSans.className} font-semibold`}
        >
          My Invoices
        </h2>
        <div className="flex gap-6">
          <FormControl className="w-[216px]" variant="outlined" size="small">
            <Controller
              name="search"
              control={form.control}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    debounce(() =>
                      router.push(
                        `${currentPath}?${getQueryString(form.getValues())}`
                      )
                    );
                  }}
                  placeholder="Search"
                  className="!rounded-lg bg-white"
                  sx={noBorder}
                  startAdornment={
                    <InputAdornment position="start">
                      <Image
                        src={search}
                        width={18}
                        height={18}
                        alt="search-icon"
                      />
                    </InputAdornment>
                  }
                />
              )}
            />
          </FormControl>
          <FormControl className="w-[135px]" size="small">
            <Controller
              name="status"
              control={form.control}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    router.push(
                      `${currentPath}?${getQueryString(form.getValues())}`
                    );
                  }}
                  displayEmpty
                  sx={noBorder}
                  className="!rounded-lg bg-white"
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <span className="text-[#a2a2a2] font-light text-sm">
                          All status
                        </span>
                      );
                    }
                    return selected;
                  }}
                >
                  {["Paid", "Unpaid", "Pending"].map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </div>
      </div>

      <Paper
        className="p-[30px] text-left border border-regga bg-white"
        elevation={3}
      >
        <Table data={getFilteredInvoices} columns={columnns as ColumnDef} />
      </Paper>
    </div>
  );
}

export default ListInvoice;

const Action = ({
  invoice,
  onDelete,
}: {
  invoice?: string;
  onDelete: (invoice: string) => void;
}) => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);
  const actionId = open ? "actions" : undefined;

  return (
    <Fragment key={`${invoice}`}>
      <IconButton
        aria-describedby={actionId}
        onClick={handleOpen}
        size="small"
        disableRipple
      >
        <Image src={hamburger} width={18} height={12} alt="actions-icon" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id={actionId}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 1px 1px rgba(217, 217, 217, 0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            router.push(`/invoices/add?invoice_number=${invoice}`);
            handleClose();
          }}
        >
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Edit</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (invoice) {
              onDelete(invoice);
            }
            handleClose();
          }}
        >
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Delete</Typography>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

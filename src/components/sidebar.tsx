"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  activeAdd,
  activeList,
  inactiveAdd,
  inactiveList,
  logo,
} from "../assets";
import { useColorScheme } from "@mui/material";
import { openSans } from "../constants/fonts";

function Sidebar() {
  const currentPath = usePathname();
  const { mode } = useColorScheme();

  return (
    <div
      className={`w-[242px] z-50 fixed min-h-screen flex flex-col items-start pl-[38px] justify-start gap-9 ${
        mode !== "dark" ? "bg-deepBlue" : "bg-slate-700"
      }`}
    >
      <Image
        src={logo}
        width={166}
        height={44.466732025146484}
        alt="logo"
        className="py-7"
      />
      <div className={`space-y-4 ${openSans.className}`}>
        <span className="text-disabled">MENU</span>
        <ul className="flex flex-col gap-8">
          {[
            {
              label: "Add Invoice",
              path: "/invoices/add",
              active: activeAdd,
              inactive: inactiveAdd,
            },
            {
              label: "My Invoices",
              path: "/invoices/list",
              active: activeList,
              inactive: inactiveList,
            },
          ].map((item, index) => {
            const { active, inactive, label, path } = item;
            const isActive = currentPath == path;
            return (
              <Link
                key={`${path}-${index}`}
                href={path}
                className={`flex items-center gap-2 ${
                  isActive ? "text-white" : "text-disabled"
                }`}
              >
                <Image
                  src={isActive ? active : inactive}
                  alt={`icon ${label}`}
                  width={18}
                  height={18}
                />
                <span>{label}</span>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

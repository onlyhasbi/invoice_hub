"use client";
import { Avatar, IconButton, useColorScheme } from "@mui/material";
import Image from "next/image";
import { alarm, arrowDown, chat } from "../assets";
import { IOSSwitch } from "./switcher";
import { openSans } from "../constants/fonts";

function Topbar() {
  const { setMode } = useColorScheme();

  return (
    <div className="w-[calc(100vw-242px)] fixed flex bg-white h-[72px] items-center max-h-20 p-4 justify-end gap-7">
      <IOSSwitch
        onChange={(e) => setMode(e.target.checked ? "dark" : "light")}
      />
      <div className="flex gap-3">
        {[
          { icon: alarm, label: "notification", count: 0 },
          { icon: chat, label: "chat", count: 1 },
        ].map(({ icon, label, count }) => (
          <div
            key={label}
            className="bg-reggaLight rounded-full relative border border-regga hover:bg-slate-50"
          >
            <IconButton aria-label={label} disableRipple>
              <Image src={icon} width={18} height={18} alt={`${label}`} />
            </IconButton>
            {count > 0 && (
              <div className="absolute top-0 right-0 w-[10px] h-[10px] rounded-full bg-red-700 border border-white" />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center cursor-pointer">
        <div className={`text-right ${openSans.className}`}>
          <h2 className="text-[#212B36] text-sm leading-5 font-medium">
            John Doe
          </h2>
          <p className="text-[#637381] text-xs leading-[14px]">
            Verified Member
          </p>
        </div>
        <Avatar
          alt="Remy Sharp"
          src="https://i.pravatar.cc/500"
          className="ml-4 mr-[10px]"
        />
        <Image src={arrowDown} width={20} height={20} alt="arrow-down" />
      </div>
    </div>
  );
}

export default Topbar;

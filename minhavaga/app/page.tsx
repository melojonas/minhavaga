"use client";
import Image from "next/image";
import React from "react";

export default function Home() {
  const [searchBarValue, setSearchBarValue] = React.useState("");
  
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-custom-image bg-cover bg-center">
      <div className="relative mt-[274px] flex h-[48px] w-[44%] items-center rounded-[24px] bg-[#ffffff] shadow-[0_1px_2px_0_#0000000c]">
          <Image
          src="images/img_icon_search.svg"
          width={20}
          height={20}
          alt="Icon/search"
          className="h-[20px] w-[20px] object-contain static ml-5"
          />
        <input
          name="Search Bar"
          placeholder={`Curso ou Universidade`}
          value={searchBarValue}
          onChange={(e) => setSearchBarValue(e.target.value)}
          className="h-full w-full pl-[50px] pr-3 font-['Segoe_UI'] text-[16px] text-[#71717a] sm:pl-5 border-none outline-none"
        />
      </div>
    </div>
  );
}
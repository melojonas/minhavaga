"use client";

import Image from "next/image";
import React, { useEffect } from "react";

const universities = [
  { nome: "Universidade de Brasília", sigla: "UnB" },
  { nome: "Universidade Federal do Rio de Janeiro", sigla: "UFRJ" },
  { nome: "Universidade Federal de Minas Gerais", sigla: "UFMG" },
  { nome: "Universidade Federal do Rio Grande do Sul", sigla: "UFRGS" },
  { nome: "Universidade Federal de Santa Catarina", sigla: "UFSC" },
  { nome: "Universidade Federal do Paraná", sigla: "UFPR" },
  { nome: "Universidade Federal da Bahia", sigla: "UFBA" },
  { nome: "Universidade Federal de Pernambuco", sigla: "UFPE" },
  { nome: "Universidade Federal do Ceará", sigla: "UFC" },
  { nome: "Universidade Federal do Pará", sigla: "UFPA" }
];

type University = {
  nome: string;
  sigla: string;
};

export default function Home() {
  const [searchBarValue, setSearchBarValue] = React.useState("");
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<University[]>([]);
  const [suggestion, setSuggestion] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [lastTypedValue, setLastTypedValue] = React.useState<string>("");

  useEffect(() => {
    if (selectedIndex !== null && filteredSuggestions.length > 0) {
      setSearchBarValue(filteredSuggestions[selectedIndex].nome);
  
      // Scroll the selected item into view
      const selectedItem = document.getElementById(`suggestion-${selectedIndex}`);
      if (selectedItem) {
        selectedItem.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedIndex, filteredSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchBarValue(value);

    // Save the typed value before selection starts
    setLastTypedValue(value);

    if (value) {
      const suggestions = universities.filter((uni) =>
        uni.nome.toLowerCase().includes(value.toLowerCase()) ||
        uni.sigla.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
      setSelectedIndex(null); // Reset selected index when input changes
      setSuggestion(suggestions.length > 0 ? suggestions[0].nome : "");
    } else {
      setFilteredSuggestions([]);
      setSelectedIndex(null);
      setSuggestion("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && suggestion) {
      e.preventDefault();
      setSearchBarValue(suggestion);
      setFilteredSuggestions([]);
      setSuggestion("");
    }

    if (e.key === "ArrowDown") {
      if (filteredSuggestions.length > 0) {
        setSelectedIndex((prevIndex) =>
          prevIndex === null
            ? 0
            : Math.min(filteredSuggestions.length - 1, prevIndex + 1)
        );
      }
    }

    if (e.key === "ArrowUp") {
      if (filteredSuggestions.length > 0) {
        const prevIndex = selectedIndex !== null && selectedIndex > 0 ? selectedIndex - 1 : 0;
        setSelectedIndex(prevIndex);

        // When going up, revert to the last typed value
        if (prevIndex === 0) {
          setSearchBarValue(lastTypedValue);
        }
      }
    }

    if (e.key === "Enter" && selectedIndex !== null) {
      const selectedUniversity = filteredSuggestions[selectedIndex];
      setSearchBarValue(selectedUniversity.nome);
      setFilteredSuggestions([]);
      setSuggestion("");
      setSelectedIndex(null);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-standard bg-cover bg-center">
      <div className="relative w-[90%] sm:w-[50%]">
        {/* Search bar */}
        <div className="relative flex h-[48px] items-center rounded-[24px] bg-white shadow-md focus-within:ring-2 focus-within:ring-sky-500">
          <Image
            src="/images/img_icon_search.svg"
            width={20}
            height={20}
            alt="Icon/search"
            className="ml-5 h-[20px] w-[20px] object-contain"
          />
          <div className="relative w-full">
            <input
              name="Search Bar"
              placeholder="Curso ou Universidade"
              value={searchBarValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="h-full w-full bg-transparent pl-[50px] pr-3 text-[16px] font-normal text-black outline-none"
            />
            {suggestion && searchBarValue && suggestion.toLowerCase().startsWith(searchBarValue.toLowerCase()) && (
              <span className="absolute left-[50px] top-0 text-[16px] text-transparent pointer-events-none select-none">
                {searchBarValue}
                <span className="text-gray-400">{suggestion.slice(searchBarValue.length)}</span>
              </span>
            )}
          </div>
        </div>

        {/* Suggestions dropdown */}
        {filteredSuggestions.length > 0 && (
          <div className="absolute mt-4 w-full rounded-[24px] bg-white shadow-md overflow-hidden">
            <div className="px-4 py-2 font-bold text-gray-700 border-none">
              Universidades
            </div>
            <ul className="max-h-48 overflow-y-auto">
              {filteredSuggestions.map((uni, index) => (
                <li
                  id={`suggestion-${index}`}
                  key={index}
                  className={`cursor-pointer px-4 py-2 text-gray-700 ${
                    selectedIndex === index ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setSearchBarValue(uni.nome);
                    setFilteredSuggestions([]);
                    setSuggestion("");
                    setSelectedIndex(null);
                  }}
                >
                  {uni.nome} ({uni.sigla})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

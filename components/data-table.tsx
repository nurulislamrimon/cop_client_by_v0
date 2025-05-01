"use client";

import type React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { IMeta } from "@/interfaces/meta";
import { debounce } from "@/utils/debounce";
import Paginate from "./ui/pagination";

interface DataTableProps<T> {
  data?: T[];
  meta?: IMeta;
  columns: {
    key: string;
    title: string;
    render?: (item: T) => React.ReactNode;
  }[];
  searchKey?: string;
  onRowClick?: (item: T) => void;
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  meta,
  searchKey,
  onRowClick,
}: DataTableProps<T>) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSearch = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const totalPages = meta ? Math.ceil(meta?.total / meta?.limit) : 1;
  const itemsPerPage = meta?.limit || 10;

  const updateInUrl = (field: string, value: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set(field, value.toString());
    router.push(`?${params.toString()}`);
  };

  const updatePage = (page: number) => {
    updateInUrl("page", page);
  };

  const debouncedUpdateInUrl = useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
          params.set("search", value);
        } else {
          params.delete("search");
        }
        router.push(`?${params.toString()}`);
      }, 300),
    [searchParams, router]
  );

  useEffect(() => {
    setSearchQuery(initialSearch);
  }, [initialSearch]);

  return (
    <div className="space-y-4">
      {searchKey && (
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
              debouncedUpdateInUrl(value);
            }}
          />
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.length ? (
              data?.map((item, index) => (
                <TableRow
                  key={index}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={onRowClick ? "cursor-pointer hover:bg-muted" : ""}
                >
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {column.render ? column.render(item) : item[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Paginate
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(p) => updatePage(p)}
      />
    </div>
  );
}

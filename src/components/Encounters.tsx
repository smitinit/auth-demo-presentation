import { Link } from "react-router-dom";

import { EncountersData } from "@/data/encounter";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

export function Encounters() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [consultationFilter, setConsultationFilter] = useState<string>("");

  // get all the consultation options from the data to display in the filter uniquely
  const consultationOptions = Array.from(
    new Set(EncountersData.map((e) => e.consultationType))
  );

  // helper to normalize the date from the original data
  const normalizeDate = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // filtering based on consultation and date
  const filteredData = EncountersData.filter((encounter) => {
    if (
      consultationFilter &&
      encounter.consultationType !== consultationFilter
    ) {
      return false;
    }

    if (dateRange?.from && dateRange?.to) {
      const encounterDate = normalizeDate(new Date(encounter.dateOfService));

      const from = normalizeDate(dateRange.from);
      const to = normalizeDate(dateRange.to);

      if (encounterDate < from || encounterDate > to) {
        return false;
      }
    }

    return true;
  });

  return (
    <>
      <div className="flex flex-row gap-2 items-center justify-end">
        {/* clear filters button */}
        <Button
          variant="outline"
          onClick={() => {
            setConsultationFilter("");
            setDateRange(undefined);
          }}
        >
          Clear Filters
        </Button>

        {/* consultation Filter */}
        <Select
          value={consultationFilter}
          onValueChange={setConsultationFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Consultation Filter" />
          </SelectTrigger>
          <SelectContent>
            {consultationOptions.map((consultation) => (
              <SelectItem key={consultation} value={consultation}>
                {consultation}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* date filter calendar */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-1 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "yyyy-MM-dd")} to{" "}
                    {format(dateRange.to, "yyyy-MM-dd")}
                  </>
                ) : (
                  format(dateRange.from, "yyyy-MM-dd")
                )
              ) : (
                <span>Date of Service</span>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              className="rounded-md border shadow-sm"
              captionLayout="dropdown"
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* data display in table */}
      <Table>
        {filteredData.length !== 0 && (
          <TableCaption>A list of all Encounters.</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead>Date of service</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Consultation type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length !== 0 ? (
            filteredData.map((encounter) => (
              <TableRow key={encounter.id}>
                <TableCell>{encounter.dateOfService}</TableCell>
                <TableCell className="font-medium text-primary">
                  <Link to={`${encounter.id}`}>{encounter.full_name}</Link>
                </TableCell>
                <TableCell>{encounter.consultationType}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="text-center">
              <TableCell colSpan={3} className="p-10">
                No data available, try clearing your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

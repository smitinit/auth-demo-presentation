import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EncountersData } from "@/data/encounter";

export function Encounters() {
  return (
    <Table>
      <TableCaption>A list of all Encounters.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date of service</TableHead>
          <TableHead>Patient Name</TableHead>
          <TableHead>Consultation type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {EncountersData.map((encounter, i) => (
          <TableRow key={i}>
            <TableCell>{encounter.dateOfService}</TableCell>

            <TableCell className="font-medium">{encounter.fullName}</TableCell>
            <TableCell>{encounter.consultationType}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

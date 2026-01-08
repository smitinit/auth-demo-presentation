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
import { Link } from "react-router-dom";

// Todo filter on consultation_type(single select), date_of_service(from - to, eg 2020-05-22)

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
            <TableCell className="font-medium text-primary">
              <Link to={`${encounter.id}`}>{encounter.full_name}</Link>
            </TableCell>
            <TableCell>{encounter.consultationType}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

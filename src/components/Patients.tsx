import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PatientsData } from "@/data/patient";

export function Patients() {
  return (
    <Table>
      <TableCaption>A list of all Patients.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Patient Name</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Referral Program</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {PatientsData.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell>{patient.email}</TableCell>

            <TableCell className="font-medium">
              {patient.patient_name}
            </TableCell>
            <TableCell>{patient.gender}</TableCell>
            <TableCell>{patient.referral_program}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

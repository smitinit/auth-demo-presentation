import { Link } from "react-router-dom";
import { PatientsData } from "@/data/patient";
import { useOutletContext } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "./ui/multi-select";
import { AppFilters } from "@/App";

type FlowContext = {
  filters: AppFilters;
  setFilters: React.Dispatch<React.SetStateAction<AppFilters>>;
};
export function Patients() {
  // const [genderFilter, setGenderFilter] = useState<string[]>([]);
  // const [referralFilter, setReferralFilter] = useState<string>("");

  // get the persisted filters
  const { filters, setFilters } = useOutletContext<FlowContext>();
  const { referralFilter, genderFilter } = filters.patients;

  // get all the consultation options from the data to display in the filter uniquely
  const referralOptions = Array.from(
    new Set(PatientsData.map((p) => p.referral_program))
  );

  // get all types of genders from the data to display in filter uniquely
  const genderOptions = Array.from(new Set(PatientsData.map((p) => p.gender)));

  // filtering based on consultation and date
  const filteredData = PatientsData.filter((patient) => {
    if (referralFilter && patient.referral_program !== referralFilter) {
      return false;
    }
    if (genderFilter.length > 0 && !genderFilter.includes(patient.gender)) {
      return false;
    }
    return true;
  });

  return (
    <>
      <div className="flex flex-row gap-2 items-center justify-end">
        {/* clear filters button */}
        <Button
          variant="outline"
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              patients: {
                referralFilter: "",
                genderFilter: [],
              },
            }))
          }
        >
          Clear Filters
        </Button>

        {/* referral Filter */}
        <Select
          value={referralFilter}
          onValueChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              patients: {
                ...prev.patients,
                referralFilter: value,
              },
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Referral Filter" />
          </SelectTrigger>
          <SelectContent>
            {referralOptions.map((patient) => (
              <SelectItem key={patient} value={patient}>
                {patient}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* multiselect gender filter */}
        <MultiSelect
          values={genderFilter}
          onValuesChange={(values) =>
            setFilters((prev) => ({ ...prev, genderFilter: values }))
          }
        >
          <MultiSelectTrigger>
            <MultiSelectValue placeholder="Gender Filter" />
          </MultiSelectTrigger>

          <MultiSelectContent>
            <MultiSelectGroup>
              {genderOptions.map((gender) => (
                <MultiSelectItem key={gender} value={gender}>
                  {gender}
                </MultiSelectItem>
              ))}
            </MultiSelectGroup>
          </MultiSelectContent>
        </MultiSelect>
      </div>

      <Table>
        {filteredData.length !== 0 && (
          <TableCaption>A list of all Patients.</TableCaption>
        )}

        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Referral Program</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length !== 0 ? (
            filteredData.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.email}</TableCell>
                <TableCell className="font-medium text-primary">
                  <Link
                    to={`${patient.id}`}
                    state={{
                      referralFilter,
                      genderFilter,
                    }}
                  >
                    {patient.full_name}
                  </Link>
                </TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.referral_program}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="text-center">
              <TableCell colSpan={4} className="p-10">
                No data available, try clearing your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

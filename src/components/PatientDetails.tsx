import { Separator } from "@/components/ui/separator";
import { PatientsData, PatientsType } from "@/data/patient";
import { EncountersData, EncounterType } from "@/data/encounter";
import { useEffect, useState } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";

type PatientView = {
  email: string;
  fullName: string;
  dateOfBirth?: string;
  gender: string;
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-3 gap-4 py-3">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="col-span-2 text-sm font-medium text-primary max-w-sm break-all">
      {value}
    </p>
  </div>
);

export const PatientDetails = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();

  const isPatientsRoute = useMatch("/patients/:patientId");
  const isEncountersRoute = useMatch("/encounters/:patientId");

  const [details, setDetails] = useState<PatientView | null>(null);

  useEffect(() => {
    if (!patientId) {
      navigate("/patients", { replace: true });
      return;
    }

    if (isPatientsRoute) {
      const patient = PatientsData.find(
        (p: PatientsType) => p.id === Number(patientId)
      );

      if (!patient) {
        navigate("/patients", { replace: true });
        return;
      }

      setDetails({
        email: patient.email,
        fullName: patient.full_name,
        dateOfBirth: patient.dateOfBirth ?? "Not Defined",
        gender: patient.gender,
      });
      return;
    }

    if (isEncountersRoute) {
      const encounter = EncountersData.find(
        (e: EncounterType) => e.id === Number(patientId)
      );

      if (!encounter) {
        navigate("/encounters", { replace: true });
        return;
      }

      setDetails({
        email: encounter.email,
        fullName: encounter.full_name,
        dateOfBirth: encounter.dateOfBirth ?? "Not Defined",
        gender: encounter.gender,
      });
      return;
    }

    navigate("/patients", { replace: true });
  }, [patientId, isPatientsRoute, isEncountersRoute, navigate]);

  if (!details) {
    return (
      <div className="p-6 text-sm text-muted-foreground">Loading details…</div>
    );
  }

  return (
    <div className="p-6 max-w-3xl">
      <h2 className="text-lg font-semibold mb-4">Patient Details</h2>

      <div className="rounded-lg border px-6">
        <DetailRow label="Email" value={details.email} />
        <Separator />

        <DetailRow label="Full Name" value={details.fullName} />
        <Separator />

        <DetailRow
          label="Date of Birth"
          value={details.dateOfBirth || "Not Specified"}
        />
        <Separator />

        <DetailRow label="Gender" value={details.gender} />
      </div>
    </div>
  );
};

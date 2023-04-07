import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/ui/Select";

interface CompanySelectProps {
  companies: string[];
  onChange: (company: string) => void;
  value: string;
}

export function CompanySelect({
  companies,
  onChange,
  value,
}: CompanySelectProps) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>{value || "Vis alle arbeidsgivere"}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">Vis alle arbeidsgivere</SelectItem>
        <SelectSeparator />
        {companies.map((company) => (
          <SelectItem key={company} value={company}>
            {company}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

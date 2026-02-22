import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

const sortOptions = [
  "max_salary_desc",
  "max_salary_asc",
  "min_salary_desc",
  "min_salary_asc",
] as const;

export type sortOption = (typeof sortOptions)[number];

const sortOptionsStrings: Record<sortOption, string> = {
  max_salary_desc: "Høyeste makslønn",
  max_salary_asc: "Laveste makslønn",
  min_salary_desc: "Høyeste startlønn",
  min_salary_asc: "Laveste startlønn",
};

interface SortPostsProps {
  onChange: (company: sortOption) => void;
  value: sortOption;
}

// if published_desc: just return posts, published_asc: return posts.reverse()
export function SortPosts({ value, onChange }: SortPostsProps) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>{sortOptionsStrings[value]}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {sortOptionsStrings[opt]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

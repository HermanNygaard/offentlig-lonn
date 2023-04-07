import { Post } from "@/lib/scraper";
import { Card } from "./Card";

const formatToThousand = (salary: number) =>
  salary?.toLocaleString("no-NB", { useGrouping: true });

export function Jobpost({ post }: { post: Post }) {
  const { imageUrl, title, salaryMin, salaryMax, location, finnUrl, company } =
    post;
  return (
    <a href={finnUrl} target="_blank">
      <Card>
        <div className="flex items-center justify-center md:h-32 h-32 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element*/}
          <img
            height={100}
            width={100}
            alt={`${company} logo`}
            src={imageUrl}
          />
        </div>
        <div className="line-clamp-2">{title}</div>
        <div className="font-light line-clamp-1">{company}</div>
        <p>
          kr. {formatToThousand(salaryMin)} - {formatToThousand(salaryMax)}
        </p>
      </Card>
    </a>
  );
}

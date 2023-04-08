import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useState } from "react";
import { sortOption, SortPosts } from "@/components/SortPosts";
import { Post, scrapeAds } from "@/lib/scraper";
import { CompanySelect } from "@/components/CompanySelect";
import { Jobpost } from "@/components/JobPost";
import { Heading } from "@/components/Heading";
import { Input } from "@/ui/Input";
import { Favorite } from "@/components/Favorite";
import { useFavorites } from "@/hooks/useFavorites";

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [sortType, setSortType] = useState<sortOption>("max_salary_desc");
  const [companyFilter, setCompanyFilter] = useState(null);
  const [search, setSearch] = useState("");
  const { favorites, setFavorite } = useFavorites();

  const companies = posts
    .reduce<string[]>(
      (prev, { company }) =>
        prev.includes(company) ? prev : [...prev, company],
      []
    )
    .sort();

  const sortedPosts = [...posts]
    .sort((a, b) => {
      switch (sortType) {
        case "max_salary_desc":
          return b.salaryMax - a.salaryMax;
        case "max_salary_asc":
          return a.salaryMax - b.salaryMax;
        case "min_salary_desc":
          return b.salaryMin - a.salaryMin;
        case "min_salary_asc":
          return a.salaryMin - b.salaryMin;
      }
    })
    .filter((p) => (companyFilter ? p.company === companyFilter : p))
    .filter((p) =>
      search ? p.title.toLowerCase().includes(search.toLowerCase()) : p
    );

  return (
    <div className="container">
      <Head>
        <title>Offentlig lønnsoversikt</title>
      </Head>
      <Heading>Offentlig lønn</Heading>
      <h2 className="text-lg text-slate-700 dark:text-slate-300 mb-5 mt-2 pl-0.5">
        Lønnsoversikt over offentlige stillinger innen IT-utvikling.
      </h2>
      <div className="flex gap-x-2 mb-3">
        <CompanySelect
          onChange={(c) => setCompanyFilter(c)}
          companies={companies}
          value={companyFilter}
        />
        <SortPosts value={sortType} onChange={(t) => setSortType(t)} />
      </div>
      <Input
        className="w-30 mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Søk på stillingstittel"
      />
      <div>
        {`Viser ${sortedPosts.length} stilling${
          sortedPosts.length === 1 ? "" : "er"
        }`}
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 mt-5">
        {sortedPosts.map((d) => (
          <Jobpost
            key={d.finnUrl}
            post={d}
            favoriteButton={
              <Favorite
                toggleFavorite={() => setFavorite(d)}
                isFavorite={d.finnUrl in (favorites ?? {})}
              />
            }
          />
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<{
  posts: Post[];
}> = async () => {
  const posts = await scrapeAds();

  return {
    props: {
      posts,
    },
    // Revalidate daily
    revalidate: 60 * 60 * 24,
  };
};

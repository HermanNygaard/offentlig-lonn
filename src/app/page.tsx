import { scrapeAds } from "@/lib/scraper";
import { HomeClient } from "./home-client";

export const revalidate = 86400;

export default async function Page() {
  const posts = await scrapeAds();
  const generatedAt = new Date(Date.now()).toLocaleString("no-NB", {
    year: "numeric",
    month: "long",
    weekday: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return <HomeClient posts={posts} generatedAt={generatedAt} />;
}

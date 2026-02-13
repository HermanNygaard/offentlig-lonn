import { scrapeAds } from "@/lib/scraper";
import { HomeClient } from "./home-client";

export const revalidate = 86400;

export default async function Page() {
  const posts = await scrapeAds();

  return <HomeClient posts={posts} />;
}

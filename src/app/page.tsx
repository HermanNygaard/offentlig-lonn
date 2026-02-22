import { scrapeAds } from "@/lib/scraper";
import { HomeClient } from "./home-client";

export default async function Page() {
  const posts = await scrapeAds();

  return <HomeClient posts={posts} />;
}

import { Post } from "@/lib/scraper";
import { useLocalStorage } from "./useLocalStorage";
import { useMemo } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<Record<string, Post>>(
    "favorites",
    {}
  );

  return useMemo(() => {
    const setFavorite = (post: Post) => {
      const { finnUrl } = post;
      const isFavorite = favorites[finnUrl];
      const newFavorites = { ...favorites };
      if (isFavorite) {
        delete newFavorites[finnUrl];
      } else {
        newFavorites[finnUrl] = post;
      }
      setFavorites(newFavorites);
    };
    return {
      setFavorite,
      favorites,
    };
  }, [favorites, setFavorites]);
}

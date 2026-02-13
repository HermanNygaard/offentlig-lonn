"use client";

import { Favorite } from "@/components/Favorite";
import { Jobpost } from "@/components/JobPost";
import { useFavorites } from "@/hooks/useFavorites";

export default function FavoritterPage() {
  const { favorites, setFavorite } = useFavorites();

  return (
    <div className="container">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 mt-5">
        {Object.values(favorites ?? {}).map((d) => (
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
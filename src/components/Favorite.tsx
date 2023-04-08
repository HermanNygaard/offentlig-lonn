import { cn } from "@/lib/util";
import { Button } from "./ui/Button";
import { Heart } from "lucide-react";

export type FavoriteProps = {
  isFavorite: boolean;
  toggleFavorite: () => void;
};

export function Favorite({ isFavorite, toggleFavorite }: FavoriteProps) {
  return (
    <Button
      aria-label="Toggle favorite"
      onClick={(e) => {
        e.preventDefault();
        toggleFavorite();
      }}
      variant="ghost"
      size="sm"
    >
      <Heart className={cn("text-red-300", isFavorite && "fill-red-300")} />
    </Button>
  );
}

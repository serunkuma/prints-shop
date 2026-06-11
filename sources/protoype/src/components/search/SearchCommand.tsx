import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { artists } from "@/data/artists";
import { drops } from "@/data/drops";
import { products } from "@/data/products";

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange]);

  const normalized = query.trim().toLowerCase();
  const matches = useMemo(() => {
    const productMatches = products.filter((product) =>
      [product.title, product.artist, product.series, product.tags.join(" ")].join(" ").toLowerCase().includes(normalized),
    );
    const seriesMatches = drops.filter((item) => item.title.toLowerCase().includes(normalized));
    const artistMatches = artists.filter((artist) => artist.name.toLowerCase().includes(normalized));
    return { productMatches, seriesMatches, artistMatches };
  }, [normalized]);

  function go(path: string) {
    onOpenChange(false);
    navigate(path);
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search Kumachi Prints"
      description="Search prints, series, and artists"
      className="border-[var(--border-mid)] bg-surface text-text-primary"
    >
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Search prints, drops, artists..."
        className="text-text-primary"
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Recent">
          {products.slice(0, 3).map((product) => (
            <CommandItem key={`recent-${product.handle}`} onSelect={() => go(`/product/${product.handle}`)}>
              {product.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Prints">
          {matches.productMatches.map((product) => (
            <CommandItem key={product.handle} onSelect={() => go(`/product/${product.handle}`)}>
              {product.title} - {product.series}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Series">
          {matches.seriesMatches.map((item) => (
            <CommandItem key={item.handle} onSelect={() => go(`/drops/${item.handle}`)}>
              {item.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Artists">
          {matches.artistMatches.map((artist) => (
            <CommandItem key={artist.id} onSelect={() => go(`/artists/${artist.id}`)}>
              {artist.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

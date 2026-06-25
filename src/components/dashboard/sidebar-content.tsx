"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Code2,
  Sparkles,
  Terminal,
  FileText,
  Paperclip,
  Image,
  Link as LinkIcon,
  Star,
  Settings,
  ChevronDown,
} from "lucide-react";
import { mockItemTypes, mockCollections, mockUser } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TYPE_ICONS: Record<string, React.ElementType> = {
  code: Code2,
  sparkles: Sparkles,
  terminal: Terminal,
  "file-text": FileText,
  paperclip: Paperclip,
  image: Image,
  link: LinkIcon,
};

export function SidebarContent() {
  const [favoritesOpen, setFavoritesOpen] = useState(true);
  const [allCollectionsOpen, setAllCollectionsOpen] = useState(true);

  const favoriteCollections = mockCollections.filter((c) => c.isFavorite);
  const otherCollections = mockCollections.filter((c) => !c.isFavorite);
  const initials = mockUser.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Types */}
      <div className="px-3 py-4">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-1">
          Types
        </p>
        <nav className="space-y-0.5">
          {mockItemTypes.map((type) => {
            const Icon = TYPE_ICONS[type.icon] ?? FileText;
            return (
              <Link
                key={type.id}
                href={`/items/${type.name.toLowerCase()}`}
                className="flex items-center justify-between px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0" />
                  {type.name}s
                </span>
                <span className="text-xs tabular-nums">{type.count}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-border mx-3" />

      {/* Collections */}
      <div className="px-3 py-4 flex-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-2">
          Collections
        </p>

        {/* Favorites */}
        {favoriteCollections.length > 0 && (
          <div className="mb-2">
            <button
              onClick={() => setFavoritesOpen((p) => !p)}
              className="flex items-center justify-between w-full px-2 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <span>Favorites</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  favoritesOpen ? "" : "-rotate-90"
                }`}
              />
            </button>
            {favoritesOpen && (
              <nav className="mt-0.5 space-y-0.5">
                {favoriteCollections.map((col) => (
                  <Link
                    key={col.id}
                    href={`/collections/${col.id}`}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm hover:bg-accent transition-colors"
                  >
                    <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 shrink-0" />
                    <span className="truncate">{col.name}</span>
                  </Link>
                ))}
              </nav>
            )}
          </div>
        )}

        {/* All Collections */}
        <div>
          <button
            onClick={() => setAllCollectionsOpen((p) => !p)}
            className="flex items-center justify-between w-full px-2 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <span>All Collections</span>
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                allCollectionsOpen ? "" : "-rotate-90"
              }`}
            />
          </button>
          {allCollectionsOpen && (
            <nav className="mt-0.5 space-y-0.5">
              {otherCollections.map((col) => (
                <Link
                  key={col.id}
                  href={`/collections/${col.id}`}
                  className="flex items-center justify-between px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <span className="truncate">{col.name}</span>
                  <span className="text-xs tabular-nums">{col.itemCount}</span>
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* User area */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7 shrink-0">
            <AvatarFallback className="text-xs bg-muted">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-none truncate">{mockUser.name}</p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">{mockUser.email}</p>
          </div>
          <button className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

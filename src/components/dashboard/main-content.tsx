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
  Pin,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { mockCollections, mockItems } from "@/lib/mock-data";

const TYPE_ICONS: Record<string, React.ElementType> = {
  code: Code2,
  sparkles: Sparkles,
  terminal: Terminal,
  "file-text": FileText,
  paperclip: Paperclip,
  image: Image,
  link: LinkIcon,
};

const ICON_BORDER_COLORS: Record<string, string> = {
  code: "border-l-blue-500",
  sparkles: "border-l-purple-500",
  terminal: "border-l-green-500",
  "file-text": "border-l-amber-500",
  paperclip: "border-l-orange-500",
  image: "border-l-pink-500",
  link: "border-l-cyan-500",
};

const TYPE_COLORS: Record<string, string> = {
  Snippet: "bg-blue-600",
  Prompt: "bg-purple-600",
  Command: "bg-green-600",
  Note: "bg-yellow-600",
  File: "bg-orange-600",
  Image: "bg-pink-600",
  URL: "bg-cyan-600",
};

const TYPE_ICON_MAP: Record<string, React.ElementType> = {
  Snippet: Code2,
  Prompt: Sparkles,
  Command: Terminal,
  Note: FileText,
  File: Paperclip,
  Image: Image,
  URL: LinkIcon,
};

export function MainContent() {
  const pinnedItems = mockItems.filter((i) => i.isPinned);
  const recentItems = [...mockItems]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Your developer knowledge hub</p>
      </div>

      {/* Collections */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold">Collections</h2>
          <Link
            href="/collections"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {mockCollections.map((col) => {
            const borderColor = ICON_BORDER_COLORS[col.icons[0]] ?? "border-l-border";
            return (
              <Card
                key={col.id}
                className={`border-border border-l-[3px] ${borderColor} bg-card hover:bg-accent/40 transition-colors cursor-pointer`}
              >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-sm font-medium truncate">{col.name}</span>
                    {col.isFavorite && (
                      <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 shrink-0" />
                    )}
                  </div>
                  <button
                    className="shrink-0 text-muted-foreground hover:text-foreground transition-colors -mr-1"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{col.itemCount} items</p>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {col.description}
                </p>
                <div className="flex items-center gap-1.5">
                  {col.icons.map((iconName, i) => {
                    const Icon = TYPE_ICONS[iconName];
                    return Icon ? (
                      <div
                        key={i}
                        className="flex items-center justify-center w-6 h-6 rounded bg-muted"
                      >
                        <Icon className="h-3 w-3 text-muted-foreground" />
                      </div>
                    ) : null;
                  })}
                </div>
              </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Pinned Items */}
      {pinnedItems.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Pin className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-base font-semibold">Pinned</h2>
          </div>
          <div className="space-y-2">
            {pinnedItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Recent Items */}
      <div>
        <h2 className="text-base font-semibold mb-3">Recent Items</h2>
        <div className="space-y-2">
          {recentItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ItemCard({ item }: { item: (typeof mockItems)[number] }) {
  const color = TYPE_COLORS[item.typeName] ?? "bg-muted";
  const Icon = TYPE_ICON_MAP[item.typeName] ?? FileText;

  return (
    <Card className="border-border bg-card hover:bg-accent/40 transition-colors cursor-pointer">
      <CardContent className="p-4 flex items-start gap-3">
        <div className={`flex items-center justify-center w-8 h-8 rounded-md ${color} shrink-0 mt-0.5`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium">{item.title}</span>
            {item.isFavorite && (
              <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 shrink-0" />
            )}
            {item.isPinned && (
              <Pin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{item.description}</p>
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span className="text-xs text-muted-foreground shrink-0 mt-0.5">
          {new Date(item.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </CardContent>
    </Card>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, FolderPlus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Top Bar */}
      <header className="flex items-center gap-3 px-4 h-14 border-b border-border shrink-0">
        <div className="flex items-center gap-2 mr-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-indigo-600 shrink-0">
            <span className="text-white text-xs font-bold leading-none">DS</span>
          </div>
          <span className="font-semibold text-base">DevStash</span>
        </div>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="pl-9 h-8 bg-muted border-0 focus-visible:ring-1"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <FolderPlus className="h-4 w-4" />
            New Collection
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            New Item
          </Button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar placeholder */}
        <aside className="w-60 border-r border-border shrink-0 p-4">
          <h2 className="text-sm font-semibold text-muted-foreground">Sidebar</h2>
        </aside>

        {/* Main area placeholder */}
        <main className="flex-1 overflow-auto p-6">
          <h2 className="text-sm font-semibold text-muted-foreground">Main</h2>
        </main>
      </div>
    </div>
  );
}

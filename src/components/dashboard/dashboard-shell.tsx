"use client";

import { useState, type ReactNode } from "react";
import { PanelLeft, Search, Plus, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SidebarContent } from "./sidebar-content";

export function DashboardShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Top Bar */}
      <header className="flex items-center gap-2 px-4 h-14 border-b border-border shrink-0">
        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 md:hidden"
          onClick={() => setMobileSheetOpen(true)}
        >
          <PanelLeft className="h-4 w-4" />
        </Button>

        {/* Desktop toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex h-8 w-8"
          onClick={() => setSidebarOpen((p) => !p)}
        >
          <PanelLeft className="h-4 w-4" />
        </Button>

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
          <Button variant="outline" size="sm" className="hidden sm:flex gap-1.5">
            <FolderPlus className="h-4 w-4" />
            New Collection
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Item</span>
          </Button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <aside
          className={`hidden md:flex flex-col border-r border-border shrink-0 overflow-hidden transition-all duration-200 ${
            sidebarOpen ? "w-60" : "w-0 border-r-0"
          }`}
        >
          <SidebarContent />
        </aside>

        {/* Mobile Sheet */}
        <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
          <SheetContent side="left" className="w-60 p-0" showCloseButton={false}>
            <SidebarContent />
          </SheetContent>
        </Sheet>

        {/* Main area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

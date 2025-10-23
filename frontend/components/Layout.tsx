import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Navigation from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <Navigation onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>

            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/logo.png" 
                alt="The AGT" 
                className="h-8 w-auto"
              />
              <span className="text-2xl font-bold tracking-tight">
                The AGT
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Navigation />
          </nav>
        </div>
      </header>

      <main className="container px-4 py-8">
        {children}
      </main>

      <footer className="border-t bg-muted/40 mt-12">
        <div className="container px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} The AGT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

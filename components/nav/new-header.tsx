"use client";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

const NewHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <header className="border-b bg-white/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex flex-col items-center">
            <div className="relative w-10 h-10">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BpN18WLcGdiIVWuat3DeawxVcpar2v.png"
                alt="ICC Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xs mt-1 text-gray-600">
              Impact Centre Chrétien
            </span>
          </Link>

          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {[
                  "Cellules",
                  "Zones",
                  "Rapports",
                  "Membres",
                  "Documentation",
                ].map((item) => (
                  <NavigationMenuItem key={item}>
                    <Link href="#" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {item}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="outline"
              className="border-orange-500 text-orange-600 hover:bg-orange-100 hover:text-orange-700"
            >
              Se connecter
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <nav className="container py-4">
            {["Cellules", "Zones", "Rapports", "Membres", "Documentation"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="block py-2 text-gray-600 hover:text-gray-900"
                >
                  {item}
                </Link>
              )
            )}
            <Button
              variant="outline"
              className="w-full mt-4 border-orange-500 text-orange-600 hover:bg-orange-100 hover:text-orange-700"
            >
              Se connecter
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default NewHeader;

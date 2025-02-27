"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

type ComboCelsProps = {
  cellules: any;
};

const ComboCels = ({ cellules }: ComboCelsProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  //console.log("cels", cellules);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between text-black"
        >
          {value
            ? cellules.find(
                (framework: any) => framework.address.street === value
              )?.address.street
            : "Trouverer une cellule..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Trouver une cellule..." />
          <CommandList>
            <CommandEmpty>Aucune cellule trouvée</CommandEmpty>
            <CommandGroup>
              {cellules.map((framework: any) => (
                <CommandItem
                  key={framework.id}
                  value={framework.address.street}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);

                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.address.street
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {framework.address.street}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboCels;

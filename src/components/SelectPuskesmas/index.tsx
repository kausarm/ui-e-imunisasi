import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormControl } from "../ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { cn } from "../../lib/utils";
import { getPuskesmas } from "../../services/api";

interface PuskesmasItem {
  id: string;
  nama: any;
}

interface SelectPuskesmasProps {
  field: {
    value: string;
  };
  form: any;
  hide?: boolean;
  name?: string;
  labelSelect?: string;
}

export default function SelectPuskesmas({
  field,
  form,
  labelSelect,
  name,
}: SelectPuskesmasProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [label, setLabel] = useState(null);

  const { data: puskesmas } = useQuery({
    queryKey: ["puskesmas"],
    queryFn: async () => {
      const res = await getPuskesmas();
      return res?.data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="w-full">
        <FormControl>
          <Button
            variant="outline"
            type="button"
            role="combobox"
            className={cn(
              `w-full justify-between`,
              !field.value && "text-muted-foreground"
            )}
          >
            {label ? label : labelSelect ? labelSelect : "Pilih Puskesmas"}
            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto h-[320px] p-0 overflow-y-auto">
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandEmpty>No Puskesmas found.</CommandEmpty>
          <CommandGroup>
            {puskesmas?.map((item: PuskesmasItem) => (
              <CommandItem
                defaultValue={field?.value}
                value={item?.nama}
                key={item?.id}
                onSelect={() => {
                  setLabel(item?.nama);
                  form.setValue(name, item?.id);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    item?.id === field.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item?.nama}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

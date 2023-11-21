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
import { getKelurahan } from "../../services/api";
import useImunisasiStore from "../../store";

interface PuskesmasItem {
  id: string;
  name: any;
}

interface SelectKelurahanProps {
  field: {
    value: string;
  };
  form: any;
  kecamatan?: any;
  hide?: boolean;
  name?: string;
  labelSelect?: string;
}

export default function SelectKelurahan({
  field,
  form,
  labelSelect,
  kecamatan,
  name,
}: SelectKelurahanProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [label, setLabel] = useState(null);
  const { dataStore }: any = useImunisasiStore();

  const { data: kelurahan } = useQuery({
    queryKey: ["kelurahan", dataStore, kecamatan],
    queryFn: async () => {
      const res = await getKelurahan(dataStore || kecamatan);
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
            {label ? label : labelSelect ? labelSelect : "Pilih kelurahan"}
            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto h-[320px] p-0 overflow-y-auto">
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandEmpty>No kelurahan found.</CommandEmpty>
          <CommandGroup>
            {kelurahan?.map((item: PuskesmasItem) => (
              <CommandItem
                defaultValue={field?.value?.toString()}
                value={item?.name}
                key={item?.id}
                onSelect={() => {
                  setLabel(item?.name);
                  form.setValue(name, item?.id?.toString());
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    item?.id === field.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item?.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

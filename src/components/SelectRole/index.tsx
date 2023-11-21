import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getRole } from "../../services/api";

export function SelectRole({ field }: any) {
  const { data: role } = useQuery({
    queryKey: ["role"],
    queryFn: async () => {
      const res = await getRole();
      return res?.data;
    },
  });

  return (
    <Select
      name="role"
      value={field?.value}
      onValueChange={(selectedOption) => field.onChange(selectedOption)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Pilih Role</SelectLabel>
          {role?.map((item: any, index: number) => {
            return (
              <SelectItem key={index} value={item?.id?.toString()}>
                {item?.nama}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

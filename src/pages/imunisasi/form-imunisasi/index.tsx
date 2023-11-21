import SelectPuskesmas from "../../../components/SelectPuskesmas";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface FormAddImunisasiProps {
  form: UseFormReturn<{
    puskesmas: string;
    regencies: string;
    HBO: string;
    BCG: string;
    POLIO1: string;
    DPT_HB_HIB1: string;
    CAMPAK: string;
    create_by: string;
    create_date: string;
  }>;
  data: any;
}

export default function FormAddImunisasi({
  form,
  data,
}: FormAddImunisasiProps) {
  return (
    <div className="flex space-x-10 wrapper__top__field">
      <div className="w-full space-y-5 inner__wrapper">
        <FormField
          control={form?.control}
          name="puskesmas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Puskesmas</FormLabel>
              <SelectPuskesmas
                disabled={data !== null || data?.puskesma?.nama !== undefined}
                // adjustWidth
                name="puskesmas"
                // keyword
                form={form}
                labelSelect={data?.puskesma?.nama}
                // defaultValue={field.value}
                hide={true}
                field={field}
              />
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="HBO"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>HBO</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan HBO" {...field} type="number" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="BCG"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Atasan BCG</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan BCG" {...field} type="number" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
      {/* SECOND */}
      <div className="w-full space-y-5 inner__wrapper">
        <FormField
          control={form.control}
          name="POLIO1"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Level POLIO1</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan POLIO1" {...field} type="number" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="DPT_HB_HIB1"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>DPT HB HIB1</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan DPT HB HIB1"
                  {...field}
                  type="number"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="CAMPAK"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>CAMPAK</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan CAMPAK" {...field} type="number" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
      {/* SECOND */}
    </div>
  );
}

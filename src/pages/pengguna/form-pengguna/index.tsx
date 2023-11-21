import { useEffect } from "react";
import SelectKecamatan from "../../../components/SelectKecamatan";
import SelectKelurahan from "../../../components/SelectKelurahan";
import { SelectRole } from "../../../components/SelectRole";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { UseFormReturn } from "react-hook-form";
import moment from "moment";
import Cookies from "js-cookie";

interface FormAddImunisasiProps {
  form: UseFormReturn<{
    nik: string;
    nama: string;
    hp: string;
    kabupaten: string;
    kecamatan: string;
    kelurahan: string;
    role: string;
    password: string;
    create_by: string;
    create_date: string;
  }>;
  data: any;
}

export default function FormAddPengguna({ form, data }: FormAddImunisasiProps) {
  const now = moment();

  const date = now?.format("YYYY-MM-DD");

  interface TokenObject {
    tkn?: any;
  }
  const { tkn }: TokenObject = { tkn: Cookies.get("tkn") };
  useEffect(() => {
    form.setValue("create_by", tkn);
    form.setValue("create_date", date);
    form.setValue("nik", data?.nik);
    form.setValue("nama", data?.nama);
    form.setValue("hp", data?.hp);
    form.setValue("kecamatan", data?.kecamatan);
    form.setValue("kelurahan", data?.kelurahan);
    form.setValue("role", data?.level_user?.id?.toString());
  }, [data, date, form, tkn]);

  return (
    <div className="flex space-x-10 wrapper__top__field">
      <div className="w-full space-y-5 inner__wrapper">
        <FormField
          disabled={data?.nik !== undefined}
          control={form.control}
          name="nik"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>NIK</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan NIK" {...field} type="number" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan Nama" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hp"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>HP</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan No HP" {...field} type="number" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form?.control}
          name="kecamatan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kecamatan</FormLabel>
              <SelectKecamatan
                // adjustWidth
                name="kecamatan"
                // keyword
                form={form}
                labelSelect={data?.district?.name}
                // defaultValue={field.value}
                hide={true}
                field={field}
              />
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
      {/* SECOND */}
      <div className="w-full space-y-5 inner__wrapper">
        <FormField
          control={form?.control}
          name="kelurahan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kelurahan</FormLabel>
              <SelectKelurahan
                // adjustWidth
                kecamatan={data?.kecamatan}
                name="kelurahan"
                // keyword
                form={form}
                labelSelect={data?.village?.name}
                // defaultValue={field.value}
                hide={true}
                field={field}
              />
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form?.control}
          name="role"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Role</FormLabel>
              <SelectRole field={field} />
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan Password"
                  {...field}
                  type="password"
                />
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

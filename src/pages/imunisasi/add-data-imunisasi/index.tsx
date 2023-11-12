import { SubmitHandler, useForm } from "react-hook-form";
import Sidebar from "../../../layouts/Sidebar";
import FormAddImunisasi from "../form-imunisasi";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../../../components/ui/form";
import { Button } from "../../../components/ui/button";
import { useNavigate, useParams } from "react-router";
import Cookies from "js-cookie";
import moment from "moment";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getImunisasiById,
  sendImunisasi,
  updateImunisasi,
} from "../../../services/api";
import { toast } from "../../../components/ui/use-toast";
import useImunisasiStore from "../../../store";

interface FormValues {
  puskesmas: string;
  regencies: string;
  HBO: string;
  BCG: string;
  POLIO1: string;
  DPT_HB_HIB1: string;
  CAMPAK: string;
  create_by: string;
  create_date: string;
}

export default function AddDataImunisasi() {
  const { editGlobal, setEditGlobal }: any = useImunisasiStore();
  const { id }: any = useParams();
  const navigate = useNavigate();

  const now = moment();

  const date = now?.format("YYYY-MM-DD");

  interface TokenObject {
    tkn?: any;
  }

  const { tkn }: TokenObject = { tkn: Cookies.get("tkn") };

  const formSchema = z.object({
    puskesmas: z.string().min(1, "Wajib diisi!"),
    regencies: z.string().min(1, "Wajib diisi!"),
    HBO: z.string().min(1, "Wajib diisi!"),
    BCG: z.string().min(1, "Wajib Diisi!"),
    POLIO1: z.string().min(1, "Wajib Diisi!"),
    DPT_HB_HIB1: z.string().min(1, "Wajib Diisi!"),
    CAMPAK: z.string().min(1, "Wajib Diisi!"),
    create_by: z.string().min(1, "Wajib Diisi!"),
    create_date: z.string().min(1, "Wajib Diisi!"),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      puskesmas: "",
      regencies: "1110",
      HBO: "",
      BCG: "",
      POLIO1: "",
      DPT_HB_HIB1: "",
      CAMPAK: "",
      create_by: tkn,
      create_date: date,
    },
  });

  const { data: dataEdit } = useQuery({
    queryKey: ["dataEdit", id],
    queryFn: async () => {
      const res = await getImunisasiById(id);
      return res?.data;
    },
  });

  useEffect(() => {
    form.setValue("create_by", tkn);
    form.setValue("create_date", date);
    form.setValue("puskesmas", dataEdit?.puskesmas?.toString());
    form.setValue("HBO", dataEdit?.HBO?.toString());
    form.setValue("BCG", dataEdit?.BCG?.toString());
    form.setValue("POLIO1", dataEdit?.POLIO1?.toString());
    form.setValue("DPT_HB_HIB1", dataEdit?.DPT_HB_HIB1?.toString());
    form.setValue("CAMPAK", dataEdit?.CAMPAK?.toString());
  }, [
    dataEdit?.BCG,
    dataEdit?.CAMPAK,
    dataEdit?.DPT_HB_HIB1,
    dataEdit?.HBO,
    dataEdit?.POLIO1,
    dataEdit?.puskesmas,
    date,
    form,
    tkn,
  ]);

  const { mutate: createImunisasi, isLoading: loadingImunisasi } = useMutation({
    mutationFn: async (data) => {
      const res = await sendImunisasi(data);
      return res;
    },
    onSuccess: (res: any) => {
      if (res) {
        toast({
          title: res?.message,
        });
        navigate(-1);
      } else {
        toast({
          variant: "destructive",
          title: res?.message,
        });
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Terjadi Kesalahan.",
      });
    },
  });

  const { mutate: editImunisasi, isLoading: loadingEditImunisasi } =
    useMutation({
      mutationFn: async (data) => {
        const res = await updateImunisasi(id, data);
        return res;
      },
      onSuccess: (res: any) => {
        if (res) {
          toast({
            title: res?.message,
          });
          setEditGlobal(false);
          navigate(-1);
        } else {
          toast({
            variant: "destructive",
            title: res?.message,
          });
        }
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: error?.response?.data?.message || "Terjadi Kesalahan.",
        });
      },
    });

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      if (editGlobal) {
        editImunisasi(data);
      } else {
        createImunisasi(data);
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <Sidebar navpage="Data Imunisasi" active="imunisasi">
      <div className="p-5 bg-white border-2 main-wrapper rounded-xl border-soft-blue">
        <h1 className="mt-4 mb-12 text-2xl font-semibold">Data Imunisasi</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <FormAddImunisasi form={form} data={dataEdit} />
            <div className="flex justify-end space-x-6 btn__wrapper">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditGlobal(false);
                  navigate(-1);
                  form.reset();
                }}
              >
                Batal
              </Button>
              <Button type="submit">
                {loadingImunisasi || loadingEditImunisasi
                  ? "Loading..."
                  : "Simpan"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Sidebar>
  );
}

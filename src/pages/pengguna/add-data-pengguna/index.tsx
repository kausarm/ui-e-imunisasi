import { SubmitHandler, useForm } from "react-hook-form";
import Sidebar from "../../../layouts/Sidebar";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../../../components/ui/form";
import { Button } from "../../../components/ui/button";
import { useNavigate, useParams } from "react-router";
import Cookies from "js-cookie";
import moment from "moment";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserById, sendUser, updateUser } from "../../../services/api";
import { toast } from "../../../components/ui/use-toast";
import useImunisasiStore from "../../../store";
import FormAddPengguna from "../form-pengguna";

interface FormValues {
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
}

export default function AddDataPengguna() {
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
    nik: z.string().min(16, "Wajib diisi, Harus 16 angka!"),
    nama: z.string().min(4, "Wajib diisi!"),
    hp: z.string().min(12, "Wajib diisi!"),
    kabupaten: z.string().min(1, "Wajib diisi!"),
    kecamatan: z.string().min(1, "Wajib diisi!"),
    kelurahan: z.string().min(1, "Wajib diisi!"),
    role: z.string().min(1, "Wajib diisi!"),
    password: z.string().min(1, "Wajib diisi!"),
    create_by: z.string().min(1, "Wajib Diisi!"),
    create_date: z.string().min(1, "Wajib Diisi!"),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nik: "",
      nama: "",
      hp: "",
      kabupaten: "1110",
      kecamatan: "",
      kelurahan: "",
      role: "",
      password: "",
      create_by: tkn,
      create_date: date,
    },
  });

  const { data: data_edit_user } = useQuery({
    queryKey: ["data_edit_user", id],
    queryFn: async () => {
      const res = await getUserById(id);
      return res?.data;
    },
  });

  const { mutate: createUser, isLoading: loadingImunisasi } = useMutation({
    mutationFn: async (data) => {
      const res = await sendUser(data);
      return res;
    },
    onSuccess: (res: any) => {
      if (res?.error === false) {
        toast({
          variant: "success",
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
      mutationFn: async () => {
        const res = await updateUser(id, form?.getValues());
        return res;
      },
      onSuccess: (res: any) => {
        if (res?.error === false) {
          toast({
            variant: "success",
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
        editImunisasi();
      } else {
        createUser(data);
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <Sidebar navpage="Tambah Data Pengguna" active="pengguna">
      <div className="p-5 bg-white border-2 main-wrapper rounded-xl border-soft-blue">
        <h1 className="mt-4 mb-12 text-2xl font-semibold">Data Pengguna</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <FormAddPengguna form={form} data={data_edit_user} />
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

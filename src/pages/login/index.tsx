import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import DinkesImg from "../../assets/images/dinkes.jpg";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "../../components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Cookies from "js-cookie";

interface UserData {
  nik: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

  const URL_VITE = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const token = Cookies.get("tkn");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const formSchema = z.object({
    nik: z.string().min(16, "Wajib Diisi!"),
    password: z
      .string()
      .min(8, "Password harus memiliki setidaknya 8 karakter"),
  });

  const { mutate: createLogin, isLoading: loadingLogin } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post<UserData>(`${URL_VITE}/user/login`, data);
      return res?.data;
    },
    onSuccess: (res: any) => {
      Cookies.set("user", JSON.stringify(res?.data));
      const { nik } = res.data;

      Cookies.set("tkn", nik);
      if (res) {
        toast({
          title: "Login Berhasil!",
        });
        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Gagal melakukan login.",
        });
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Terjadi kesalahan.",
      });
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nik: "",
      password: "",
    },
  });

  function onSubmit(values: any) {
    createLogin(values);
  }

  return (
    <div className="grid items-center justify-center w-full min-h-screen grid-cols-12 login__wrapper">
      <div className="hidden h-screen col-span-6 md:block wrapper__img">
        <img
          src={DinkesImg}
          alt="Gambar dinas kesehatan kabupaten bireuen"
          width={"100%"}
          height={"100%"}
          className="object-cover h-screen"
        />
      </div>

      <div className="w-full col-span-12 px-8 md:col-span-6 md:px-28">
        <div className="items-start hidden space-x-2 mb-14 md:flex wrapper__link text-start">
          <Link
            to={"/"}
            className="font-semibold text-slate-600 hover:text-primary"
          >
            Beranda /{" "}
          </Link>
          <Link to={"/auth/login"} className="font-semibold text-primary">
            Login
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center form__wrapper ">
          <div className="flex mb-8 wrapper__title">
            <h1 className="text-4xl font-bold name text-primary">E-</h1>
            <h1 className="text-4xl font-bold name">Imunisasi</h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-8"
            >
              <FormField
                control={form.control}
                name="nik"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIK</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan NIK" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
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
              <Button className="w-full ">
                {loadingLogin ? "Loading..." : "Login"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

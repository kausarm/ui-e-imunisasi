import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import Sidebar from "../../layouts/Sidebar";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import ActionButton from "../../components/action-button";
import Pagination from "../../components/pagination";
import {
  deleteImunisasi,
  getImunisasi,
  getImunisasiFilter,
  getImunisasiKeyword,
  getImunisasiScaller,
} from "../../services/api";
import { toast } from "../../components/ui/use-toast";
import useImunisasiStore from "../../store";
import SelectYear from "../../components/SelectYear";
import { CircleDashed, DownloadIcon } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

export default function Imunisasi() {
  const stringUser: any = Cookies.get("user");
  const user = JSON.parse(stringUser);
  const { setEditGlobal }: any = useImunisasiStore();
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [selectedPage, setSelectedPage] = useState<number>(0);
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const [dataClicked, setDataClicked] = useState<any>();

  const [searchValue] = useDebounce(searchKeyword, 1000);
  const [year, setYear] = useState("");
  const [loadingDownload, setLoadingDonwload] = useState(false);
  const [filter, setFilter] = useState(false);

  const {
    data: imunisasi,
    isLoading,
    isRefetching,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["imunisasi", searchValue, filter, year, offset],
    queryFn: async () => {
      if (searchValue !== "") {
        const res = await getImunisasiKeyword(10, offset, searchValue);
        return res;
      }
      if (filter) {
        const res = await getImunisasiFilter(year);
        return res;
      } else {
        const res = await getImunisasi(10, offset);
        return res;
      }
    },
    refetchOnWindowFocus: false,
  });

  const { data: imunisasiScaller } = useQuery({
    queryKey: ["imunisasi_scaller", searchValue, filter, year, offset],
    queryFn: async () => {
      const res = await getImunisasiScaller(
        year !== "" ? year : 2023,
        10,
        offset
      );
      return res;
    },
  });

  const changePage = (event: any) => {
    const newOffset = event.selected * 10;
    setOffset(newOffset);
    setSelectedPage(event.selected);
  };

  const { mutate: delImunisasi, isLoading: loadingDelete } = useMutation({
    mutationFn: async (id: any) => {
      const res = await deleteImunisasi(id);
      return res;
    },
    onSuccess: (res: any) => {
      if (res) {
        toast({
          title: res?.message,
        });
        refetch();
        setOpenModal(false);
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

  const handleDownload = async () => {
    try {
      // Make a GET request to the download endpoint
      setLoadingDonwload(true);
      const response = await axios.get(
        "http://localhost:3000/imunisasi/download",
        {
          responseType: "blob", // Set the response type to blob
        }
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      setLoadingDonwload(false);

      // Create a link element and trigger a download
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "imunisasi_data.xlsx"; // Set the  file name
      document.body.appendChild(link);
      link.click();

      // Remove the link element from the DOM
      document.body.removeChild(link);
    } catch (error) {
      setLoadingDonwload(false);
    }
  };

  return (
    <>
      <Sidebar navpage="Data Imunisasi" active="imunisasi">
        <Tabs defaultValue="imunisasi" className="w-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="imunisasi">Data Imunisasi</TabsTrigger>
            <TabsTrigger value="normalisasi">Data Normalisasi</TabsTrigger>
          </TabsList>
          <TabsContent value="imunisasi">
            <div className="bg-white border-2 main-wrapper rounded-xl border-soft-blue">
              {/* header wrapper */}
              <div className="justify-between space-y-5 md:flex header__wrapper m-7 md:space-y-0">
                <div className="table__name">
                  <h1 className="font-semibold">Data Imunisasi</h1>
                </div>
                <div className="md:w-1/2 search__wrapper">
                  <Input
                    type="input"
                    placeholder="Cari..."
                    onChange={(e) => {
                      setSearchKeyword(e.target.value);
                    }}
                  />
                </div>
                <div className="flex space-x-8 button__wrapper">
                  <SelectYear
                    onChange={(e: any) => {
                      setFilter(true);
                      setYear(e.target.value);
                    }}
                  />
                  {user?.role === 1 && (
                    <Button
                      onClick={() => {
                        setEditGlobal(false);
                        navigate("/dashboard/imunisasi/add-data-imunisasi");
                      }}
                    >
                      Tambah Data
                    </Button>
                  )}

                  <Button
                    size={"icon"}
                    onClick={() => {
                      handleDownload();
                    }}
                    className={`bg-yellow-500`}
                  >
                    {loadingDownload ? (
                      <CircleDashed className="animate-spin" />
                    ) : (
                      <DownloadIcon />
                    )}
                  </Button>
                </div>
              </div>
              {/* header wrapper */}
              {/* Table */}
              {isLoading || isRefetching ? (
                <>
                  <div className="flex items-center justify-center">
                    Sedang memuat...
                  </div>
                  {isError && (
                    <div className="flex items-center justify-center">
                      Data not found!
                    </div>
                  )}
                </>
              ) : (
                <Table className="mt-5 text-black">
                  <TableHeader>
                    <TableRow className="border-y border-dark-grey-pim bg-table-header">
                      <TableHead>PUSKESMAS</TableHead>
                      <TableHead>TAHUN</TableHead>
                      <TableHead>HBO</TableHead>
                      <TableHead>BCG</TableHead>
                      <TableHead>POLIO</TableHead>
                      <TableHead>DPT HB HIB1</TableHead>
                      <TableHead>CAMPAK</TableHead>
                      {user?.role === 1 && <TableHead>ACTION</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {imunisasi?.data?.data?.map((imns: any, index: string) => (
                      <TableRow
                        className=""
                        key={index}
                        onClick={() => setDataClicked(imns)}
                      >
                        <TableCell className="font-medium">
                          {imns?.puskesma?.nama}
                        </TableCell>
                        <TableCell>{imns?.tahun}</TableCell>
                        <TableCell>{imns?.HBO ?? "-"}</TableCell>
                        <TableCell>{imns?.BCG}</TableCell>
                        <TableCell>{imns?.POLIO1 ?? "-"}</TableCell>
                        <TableCell>{imns?.DPT_HB_HIB1}</TableCell>
                        <TableCell>{imns?.CAMPAK}</TableCell>

                        {user?.role === 1 && (
                          <TableCell>
                            <ActionButton
                              hideView
                              onDelete={() => {
                                setOpenModal(true);
                              }}
                              onEdit={() => {
                                setEditGlobal(true);
                                navigate(
                                  `/dashboard/imunisasi/add-data-imunisasi/${imns?.id}`
                                );
                              }}
                            />
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              {/* Table */}
              <Pagination
                dataLength={Number(imunisasi?.data?.total)}
                changePage={changePage}
                selectedPage={selectedPage}
              />
            </div>
          </TabsContent>
          <TabsContent value="normalisasi">
            <div className="mt-8 bg-white border-2 main-wrapper rounded-xl border-soft-blue">
              {/* header wrapper */}
              <div className="justify-between space-y-5 md:flex header__wrapper m-7 md:space-y-0">
                <div className="table__name">
                  <h1 className="font-semibold">Data Normalisasi</h1>
                </div>
                <div className="flex space-x-8 button__wrapper">
                  <SelectYear
                    onChange={(e: any) => {
                      setFilter(true);
                      setYear(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/* header wrapper */}
              {/* Table */}
              {isLoading || isRefetching ? (
                <>
                  <div className="flex items-center justify-center">
                    Sedang memuat...
                  </div>
                  {isError && (
                    <div className="flex items-center justify-center">
                      Data not found!
                    </div>
                  )}
                </>
              ) : (
                <Table className="mt-5 text-black">
                  <TableHeader>
                    <TableRow className="border-y border-dark-grey-pim bg-table-header">
                      <TableHead>PUSKESMAS</TableHead>
                      <TableHead>HBO</TableHead>
                      <TableHead>BCG</TableHead>
                      <TableHead>POLIO</TableHead>
                      <TableHead>DPT HB HIB1</TableHead>
                      <TableHead>CAMPAK</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {imunisasiScaller?.data?.map((imns: any, index: number) => (
                      <TableRow
                        className=""
                        key={index}
                        // onClick={() => setDataClicked(imns)}
                      >
                        <TableCell className="font-medium">
                          {imns?.puskesmas}
                        </TableCell>
                        <TableCell>
                          {imns?.normalize &&
                            imns.normalize[0]?.toString()?.slice(0, 5)}
                        </TableCell>
                        <TableCell>
                          {imns?.normalize &&
                            imns.normalize[1]?.toString()?.slice(0, 5)}
                        </TableCell>
                        <TableCell>
                          {imns?.normalize &&
                            imns.normalize[2]?.toString()?.slice(0, 5)}
                        </TableCell>
                        <TableCell>
                          {imns?.normalize &&
                            imns.normalize[3]?.toString()?.slice(0, 5)}
                        </TableCell>
                        <TableCell>
                          {imns?.normalize &&
                            imns.normalize[4]?.toString()?.slice(0, 5)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              {/* Table */}
              {/* <Pagination
            dataLength={Number(imunisasi?.data?.total)}
            changePage={changePage}
            selectedPage={selectedPage}
          /> */}
            </div>
          </TabsContent>
        </Tabs>
      </Sidebar>
      {OpenModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div
            // className="fixed inset-0 bg-black bg-opacity-25"
            className="fixed inset-0 z-40 bg-white/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-slate-950/80"
            onClick={() => setOpenModal(false)}
          />
          <div className="relative z-50 w-full max-w-md p-6 transition-all transform bg-white shadow-xl rounded-2xl">
            <>
              <h1 className="mt-6">Anda ingin menghapus item ini?</h1>
              <div className="grid grid-cols-2 gap-4 py-4 my-8">
                <Button
                  variant="destructive"
                  onClick={() => delImunisasi(dataClicked?.id)}
                >
                  {loadingDelete ? "Loading..." : "Hapus"}
                </Button>
                <Button
                  onClick={() => {
                    setOpenModal(!OpenModal);
                  }}
                >
                  Tutup
                </Button>
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
}

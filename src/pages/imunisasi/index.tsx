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
  getImunisasiKeyword,
} from "../../services/api";
import { toast } from "../../components/ui/use-toast";

export default function Imunisasi() {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [selectedPage, setSelectedPage] = useState<number>(0);
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const [dataClicked, setDataClicked] = useState<any>();

  const [searchValue] = useDebounce(searchKeyword, 1000);

  const {
    data: imunisasi,
    isLoading,
    isRefetching,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["imunisasi", searchValue],
    queryFn: async () => {
      if (searchValue !== "") {
        const res = await getImunisasiKeyword(10, offset, searchValue);
        return res;
      } else {
        const res = await getImunisasi(10, offset);
        return res;
      }
    },
    refetchOnWindowFocus: false,
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

  return (
    <>
      <Sidebar navpage="Data Imunisasi" active="imunisasi">
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
            <div className="space-x-8 button__wrapper">
              <Button
                onClick={() => {
                  navigate("/dashboard/imunisasi/add-data-imunisasi");
                }}
              >
                Tambah Data
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
                  <TableHead>NO</TableHead>
                  <TableHead>PUSKESMAS</TableHead>
                  <TableHead>BCG</TableHead>
                  <TableHead>CAMPAK</TableHead>
                  <TableHead>DPT HB HIB1</TableHead>
                  <TableHead>HBO</TableHead>
                  <TableHead>POLIO</TableHead>
                  <TableHead>ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {imunisasi?.data?.map((imns: any, index: string) => (
                  <TableRow
                    className=""
                    key={index}
                    onClick={() => setDataClicked(imns)}
                  >
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {imns?.puskesma?.nama}
                    </TableCell>
                    <TableCell>{imns?.BCG}</TableCell>
                    <TableCell>{imns?.CAMPAK}</TableCell>
                    <TableCell>{imns?.DPT_HB_HIB1}</TableCell>
                    <TableCell>{imns?.HBO ?? "-"}</TableCell>
                    <TableCell>{imns?.POLIO1 ?? "-"}</TableCell>

                    <TableCell>
                      <ActionButton
                        hideView
                        onDelete={() => {
                          setOpenModal(true);
                        }}
                        onEdit={() => {
                          navigate(
                            `/dashboard/imunisasi/add-data-imunisasi/${imns?.id}`
                          );
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {/* Table */}
          <Pagination
            dataLength={Number(imunisasi?.data?.length)}
            changePage={changePage}
            selectedPage={selectedPage}
          />
        </div>
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

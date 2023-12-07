/* eslint-disable no-undef */

import { useMutation, useQuery } from "@tanstack/react-query";
import Sidebar from "../../layouts/Sidebar";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Rectangle,
} from "recharts";
import { getImunisasiFilter, getImunisasiModelData } from "../../services/api";
import CardCluster from "../../components/CardCluster";
import { useState } from "react";
import SelectYear from "../../components/SelectYear";
import moment from "moment";
import DynamicInput from "../../components/DynamicInput";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { toast } from "../../components/ui/use-toast";
import { DownloadIcon } from "lucide-react";

interface ManualData {
  values: number[][];
}

export default function Dashboard() {
  const [year, setYear] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("SEMUA");
  const [dataCluster, setDataCluster] = useState<any>();
  const [filter, setFilter] = useState(false);
  const now = moment();
  const tahun = now?.format("YYYY");

  const { data: imunisasi } = useQuery({
    queryKey: ["imunisasi", year, filter],
    queryFn: async () => {
      if (!filter) {
        const res = await getImunisasiFilter(tahun);
        return res;
      } else {
        const res = await getImunisasiFilter(year);
        return res;
      }
    },
    refetchOnWindowFocus: false,
  });

  const initialArrayCount = 3; // Jumlah form input awal untuk setiap array
  const [manual, setManual] = useState<ManualData[]>([
    {
      values: Array.from({ length: initialArrayCount }, () => [0, 0, 0, 0, 0]),
    },
  ]);

  const updateArrayValue = (
    setIndex: any,
    arrayIndex: any,
    valueIndex: any,
    value: any
  ) => {
    setManual((prevManual) => {
      const updatedManual = [...prevManual];
      updatedManual[setIndex].values[arrayIndex][valueIndex] = value.trim();
      return updatedManual;
    });
  };

  const addInputSet = () => {
    setManual((prevManual) => [
      ...prevManual,
      {
        values: Array.from({ length: initialArrayCount }, () => [
          0, 0, 0, 0, 0,
        ]),
      },
    ]);
  };

  const removeInputSet = (setIndex: any) => {
    setManual((prevManual) => {
      const updatedManual = [...prevManual];
      updatedManual.splice(setIndex, 1);
      return updatedManual;
    });
  };

  const { mutate: proseCluster, isLoading } = useMutation(
    ["mutationKey"], // Key unik untuk query ini
    async (data: { year: any; manualData: any }) => {
      const { year, manualData } = data;
      const res: any = await getImunisasiModelData(year, {
        inputManual: manualData,
      });
      if (res?.error === true) {
        toast({
          variant: "destructive",
          title: res?.message,
        });
      } else {
        toast({
          variant: "success",
          title: "Proses Klaster Berhasil!",
        });
      }
      setDataCluster(res);
      return res;
    }
  );

  const submitData = () => {
    proseCluster({ year: year !== "" ? year : 2023, manualData: manual });
  };

  return (
    <>
      <Sidebar active="DASHBOARD">
        <div className="px-2 space-y-5 md:space-x-5 md:flex md:space-y-0 no-print">
          <div className="wraperr__select">
            <SelectYear
              defaultValue={tahun}
              onChange={(e: any) => {
                setFilter(true);
                setYear(e.target.value);
              }}
            />
          </div>
          <div className="wrapper__card">
            <CardCluster
              label={"SEMUA PUSKESMAS"}
              active={filterStatus === "SEMUA"}
              onClick={() => {
                setFilterStatus("SEMUA");
              }}
              cluster={dataCluster?.data?.length}
            />
          </div>
          <div className="wrapper__card">
            <CardCluster
              label={"TOTAL SELESAI"}
              active={filterStatus === "TOTAL SELESAI"}
              onClick={() => {
                setFilterStatus("TOTAL SELESAI");
              }}
              cluster={
                dataCluster?.data === null
                  ? "0"
                  : dataCluster?.data[0]?.totals?.SELESAI
              }
            />
          </div>
          <div className="wrapper__card">
            <CardCluster
              label={"TOTAL BELUM SELESAI"}
              active={filterStatus === "TOTAL BELUM SELESAI"}
              onClick={() => {
                setFilterStatus("TOTAL BELUM SELESAI");
              }}
              cluster={
                dataCluster?.data === null
                  ? "0"
                  : dataCluster?.data[0]?.totals?.BELUM_SELESAI
              }
            />
          </div>
          <div className="wrapper__card">
            <CardCluster
              label={"TOTAL TIDAK SELESAI"}
              active={filterStatus === "TOTAL TIDAK SELESAI"}
              onClick={() => {
                setFilterStatus("TOTAL TIDAK SELESAI");
              }}
              cluster={
                dataCluster?.data === null
                  ? "0"
                  : dataCluster?.data[0]?.totals?.TIDAK_SELESAI
              }
            />
          </div>
        </div>
        <div className="grid h-full gap-4 mt-16 md:grid-cols-12 main___wrapper">
          <div className="col-span-10 wrapper__chart print-container">
            <h1 className="mb-8 text-center">
              Grafik Imunisasi Kabupaten Bireuen
            </h1>
            <div className="flex justify-end mb-8 wrapper__start__clustering">
              <Button
                size={"icon"}
                className="bg-yellow-400 hover:bg-yellow-400"
                onClick={() => {
                  window.print();
                }}
              >
                <DownloadIcon className="w-5 h-5" />
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={450}>
              <BarChart
                data={imunisasi?.data?.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="puskesma.nama"
                  fontSize={12}
                  angle={-20} // Menyesuaikan sudut teks agar terlihat jelas
                  textAnchor="end"
                  interval={0}
                  height={90} // Menyesuaikan tinggi agar tidak tertutup
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="HBO"
                  barSize={8}
                  fill="#8884d8"
                  activeBar={<Rectangle fill="#8884d8" />}
                />
                <Bar
                  barSize={8}
                  dataKey="BCG"
                  fill="#888236"
                  activeBar={<Rectangle fill="#888236" />}
                />
                <Bar
                  barSize={8}
                  dataKey="POLIO1"
                  fill="#823"
                  activeBar={<Rectangle fill="#823" />}
                />
                <Bar
                  barSize={8}
                  dataKey="DPT_HB_HIB1"
                  fill="#556434"
                  activeBar={<Rectangle fill="#556434" />}
                />
                <Bar
                  barSize={8}
                  dataKey="CAMPAK"
                  fill="#82ca9d"
                  activeBar={<Rectangle fill="#82ca9d" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-ful md:col-span-2 wrapper__cluster no-print">
            <div className="flex justify-end mb-8 wrapper__start__clustering">
              <Button
                variant="default"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Tampilkan Klaster
              </Button>
            </div>
            <h1 className="text-center">Hasil Klaster:</h1>
            <div className="md:flex md:flex-col mt-8 space-y-10 wrapper__list md:h-[500px] md:overflow-y-scroll w-full">
              {dataCluster?.data?.map((item: any, index: number) => {
                if (filterStatus === "SEMUA") {
                  return (
                    <CardCluster
                      key={index}
                      label={item?.puskesmas}
                      cluster={item?.klaster?.toString()}
                    />
                  );
                } else if (filterStatus === "TOTAL SELESAI") {
                  if (item?.klaster?.toString() === "SELESAI") {
                    return (
                      <CardCluster
                        key={index}
                        label={item?.puskesmas}
                        cluster={item?.klaster?.toString()}
                      />
                    );
                  }
                } else if (filterStatus === "TOTAL BELUM SELESAI") {
                  if (item?.klaster?.toString() === "BELUM SELESAI") {
                    return (
                      <CardCluster
                        key={index}
                        label={item?.puskesmas}
                        cluster={item?.klaster?.toString()}
                      />
                    );
                  }
                } else if (filterStatus === "TOTAL TIDAK SELESAI") {
                  if (item?.klaster?.toString() === "TIDAK SELESAI") {
                    return (
                      <CardCluster
                        key={index}
                        label={item?.puskesmas}
                        cluster={item?.klaster?.toString()}
                      />
                    );
                  }
                }
              })}
            </div>
          </div>
        </div>
      </Sidebar>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto ">
          <DialogHeader>
            <DialogTitle className="text-center">
              MASUKKAN CENTROID KMEDOIDS
            </DialogTitle>
            <DialogDescription>
              <DynamicInput
                updateArrayValue={updateArrayValue}
                addInputSet={addInputSet}
                removeInputSet={removeInputSet}
                submitData={submitData}
                manual={manual}
                loading={isLoading}
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

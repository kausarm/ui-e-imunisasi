/* eslint-disable no-undef */

import { useQuery } from "@tanstack/react-query";
import Sidebar from "../../layouts/Sidebar";
import * as XLSX from "xlsx";
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
// import moment from "moment";
// import DynamicInput from "../../components/DynamicInput";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
// import { toast } from "../../components/ui/use-toast";
import { DownloadIcon } from "lucide-react";
// import Cookies from "js-cookie";

// interface ManualData {
//   values: number[][];
// }

export default function Dashboard() {
  const [year, setYear] = useState("2021");
  // const [isOpen, setIsOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("SEMUA");
  // const [dataCluster, setDataCluster] = useState<any>();
  const [filter, setFilter] = useState(false);
  // const now = moment();
  // const tahun = now?.format("YYYY");

  const { data: imunisasi } = useQuery({
    queryKey: ["imunisasi", year, filter],
    queryFn: async () => {
      if (!filter) {
        const res = await getImunisasiFilter("2021");
        return res;
      } else {
        const res = await getImunisasiFilter(year);
        return res;
      }
    },
    refetchOnWindowFocus: false,
  });

  // const initialArrayCount = 3; // Jumlah form input awal untuk setiap array
  // const [manual, setManual] = useState<ManualData[]>([
  //   {
  //     values: Array.from({ length: initialArrayCount }, () => [0, 0, 0, 0, 0]),
  //   },
  // ]);

  // const updateArrayValue = (
  //   setIndex: any,
  //   arrayIndex: any,
  //   valueIndex: any,
  //   value: any
  // ) => {
  //   setManual((prevManual) => {
  //     const updatedManual = [...prevManual];
  //     updatedManual[setIndex].values[arrayIndex][valueIndex] = value.trim();
  //     return updatedManual;
  //   });
  // };

  // const addInputSet = () => {
  //   setManual((prevManual) => [
  //     ...prevManual,
  //     {
  //       values: Array.from({ length: initialArrayCount }, () => [
  //         0, 0, 0, 0, 0,
  //       ]),
  //     },
  //   ]);
  // };

  // const removeInputSet = (setIndex: any) => {
  //   setManual((prevManual) => {
  //     const updatedManual = [...prevManual];
  //     updatedManual.splice(setIndex, 1);
  //     return updatedManual;
  //   });
  // };

  // const { mutate: proseCluster, isLoading } = useMutation(
  //   ["mutationKey"], // Key unik untuk query ini
  //   async (data: { year: any; manualData: any }) => {
  //     const { year, manualData } = data;
  //     const res: any = await getImunisasiModelData(year, {
  //       inputManual: manualData,
  //     });
  //     if (res?.error === true) {
  //       toast({
  //         variant: "destructive",
  //         title: res?.message,
  //       });
  //     } else {
  //       toast({
  //         variant: "success",
  //         title: "Proses Klaster Berhasil!",
  //       });
  //     }
  //     setDataCluster(res);
  //     return res;
  //   }
  // );

  const { data: proseCluster } = useQuery({
    queryKey: ["proses_kluster", year],
    queryFn: async () => {
      const res: any = await getImunisasiModelData(year);
      return res;
    },
    refetchOnWindowFocus: false,
  });

  const NEW_FORMATTER = proseCluster?.data?.map((item: any) => {
    if (item?.klaster === "SELESAI") {
      return {
        // selesai: item?.klaster,
        SELESAI: 30,
        // value: 30,
        puskesmas: item?.puskesmas,
      };
    }
    if (item?.klaster === "BELUM SELESAI") {
      return {
        // belumSelesai: item?.klaster,
        BELUM_SELESAI: 20,
        // value: 20,
        puskesmas: item?.puskesmas,
      };
    }
    if (item?.klaster === "TIDAK SELESAI") {
      return {
        // tidakSelesai: item?.klaster,
        TIDAK_SELESAI: 10,
        // value: 10,
        puskesmas: item?.puskesmas,
      };
    }
  });

  console.log("data::", NEW_FORMATTER);

  const downloadExcel = () => {
    if (proseCluster && proseCluster?.data) {
      const ws = XLSX.utils.json_to_sheet(
        proseCluster.data.map((item: any) => ({
          "Nama Puskesmas": item.puskesmas,
          Klaster: item.klaster?.toString(),
        }))
      );

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Data Cluster.xlsx";
      link.click();
    }
  };

  return (
    <>
      <Sidebar active="DASHBOARD">
        <div className="px-2 space-y-5 md:space-x-5 md:flex md:space-y-0 no-print">
          <div className="wraperr__select">
            <SelectYear
              defaultValue={"2021"}
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
              cluster={proseCluster?.data?.length ?? 20}
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
                proseCluster?.data === null
                  ? "0"
                  : proseCluster?.data[0]?.totals?.SELESAI ?? 0
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
                proseCluster?.data === null
                  ? "0"
                  : proseCluster?.data[0]?.totals?.BELUM_SELESAI ?? 0
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
                proseCluster?.data === null
                  ? "0"
                  : proseCluster?.data[0]?.totals?.TIDAK_SELESAI ?? 0
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
            <div className="mt-20 wrapper_chart_total">
              <ResponsiveContainer width="100%" height={450}>
                <BarChart
                  data={NEW_FORMATTER}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="puskesmas"
                    fontSize={12}
                    angle={-20} // Menyesuaikan sudut teks agar terlihat jelas
                    textAnchor="end"
                    interval={0}
                    height={90}
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value: any, name, props: any) => {
                      console.log("props", value, props);
                      // Hide the value display in the Tooltip
                      return [name];
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="SELESAI"
                    barSize={8}
                    fill="#0ca067"
                    activeBar={<Rectangle fill="#0ca067" />}
                  />
                  <Bar
                    barSize={8}
                    dataKey="BELUM_SELESAI"
                    fill="#e0bc1a"
                    activeBar={<Rectangle fill="#e0bc1a" />}
                  />
                  <Bar
                    barSize={8}
                    dataKey="TIDAK_SELESAI"
                    fill="#f42602"
                    activeBar={<Rectangle fill="#f42602" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* <div className="mt-20 wrapper_chart_total">
              <ResponsiveContainer width="80%" height={450}>
                <BarChart
                  data={formattedData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="totals"
                    angle={-20}
                    textAnchor="end"
                    interval={0}
                    height={90}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="selesai"
                    barSize={8}
                    fill="#0ca067"
                    activeBar={<Rectangle fill="#0ca067" />}
                  />
                  <Bar
                    barSize={8}
                    dataKey="belumSelesai"
                    fill="#e0bc1a"
                    activeBar={<Rectangle fill="#e0bc1a" />}
                  />
                  <Bar
                    barSize={8}
                    dataKey="tidakSelesai"
                    fill="#f42602"
                    activeBar={<Rectangle fill="#f42602" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div> */}
          </div>
          <div className="w-ful md:col-span-2 wrapper__cluster no-print">
            <div className="flex justify-end mb-8 space-x-5 wrapper__start__clustering">
              <Button
                variant="default"
                className="hidden"
                // onClick={() => {
                //   setIsOpen(true);
                // }}
              >
                Show Klaster
              </Button>
              <Button
                // size={"icon"}
                // className="bg-yellow-400 hover:bg-yellow-400"
                onClick={downloadExcel}
              >
                Download <DownloadIcon className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <h1 className="text-center">Hasil Klaster:</h1>
            <div className="md:flex md:flex-col mt-8 space-y-10 wrapper__list md:h-[500px] md:overflow-y-scroll w-full">
              {proseCluster?.data ? (
                proseCluster?.data?.map((item: any, index: number) => {
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
                })
              ) : (
                <h1 className="font-bold text-center">
                  Tidak ada data tahun {year}
                </h1>
              )}
            </div>
          </div>
        </div>
      </Sidebar>
      {/* <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
      </Dialog> */}
    </>
  );
}

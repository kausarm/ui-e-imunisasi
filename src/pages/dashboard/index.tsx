/* eslint-disable no-undef */

import { useQuery } from "@tanstack/react-query";
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
import {
  getImunisasi,
  getImunisasiFilter,
  getImunisasiModel,
} from "../../services/api";
import CardCluster from "../../components/CardCluster";
import { useState } from "react";
import SelectYear from "../../components/SelectYear";

export default function Dashboard() {
  const [year, setYear] = useState("");
  const [filter, setFilter] = useState(false);
  const { data: imunisasi } = useQuery({
    queryKey: ["imunisasi", year, filter],
    queryFn: async () => {
      if (!filter) {
        const res = await getImunisasi(100000, 0);
        return res;
      } else {
        const res = await getImunisasiFilter(year);
        return res;
      }
    },
    refetchOnWindowFocus: false,
  });

  const { data: imunisasi_cluster } = useQuery({
    queryKey: ["imunisasi_cluster", year],
    queryFn: async () => {
      const res = await getImunisasiModel(year || 2023);
      return res;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Sidebar active="DASHBOARD">
      <SelectYear
        onChange={(e: any) => {
          setFilter(true);
          setYear(e.target.value);
        }}
      />
      <div className="grid h-full gap-4 md:grid-cols-12 main___wrapper">
        <div className="col-span-10 wrapper__chart">
          <h1 className="mb-8 text-center">
            Grafik Imunisasi Kabupaten Bireuen
          </h1>
          <ResponsiveContainer width="100%" height={450}>
            <BarChart
              data={imunisasi?.data}
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
        <div className="w-ful md:col-span-2 wrapper__cluster">
          <h1 className="text-center">Hasil Klaster:</h1>
          <div className="md:flex md:flex-col mt-8 space-y-10 wrapper__list md:h-[500px] md:overflow-y-scroll w-full">
            {imunisasi_cluster?.data?.map((item: any, index: number) => {
              return (
                <CardCluster
                  key={index}
                  label={item?.puskesmas}
                  cluster={item?.klaster?.toString()}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

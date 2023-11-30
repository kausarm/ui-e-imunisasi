interface propsCardKlaster {
  label?: string;
  cluster?: string;
}

export default function CardCluster({ label, cluster }: propsCardKlaster) {
  return (
    <div
      className={`w-full p-2 text-center  rounded-lg main_wrapper ${
        cluster === "SELESAI"
          ? "bg-secondary text-white"
          : cluster === "BELUM SELESAI"
          ? "bg-yellow-500 text-white"
          : cluster === "TIDAK SELESAI"
          ? "bg-red-600 text-white"
          : "bg-ternary border-2 text-slate-900"
      }`}
    >
      <h1 className="mb-1 font-semibold uppercase">{label}</h1>
      <h1 className="uppercase">{cluster}</h1>
    </div>
  );
}

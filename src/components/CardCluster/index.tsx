interface propsCardKlaster {
  label?: string;
  cluster?: string;
}

export default function CardCluster({ label, cluster }: propsCardKlaster) {
  return (
    <div className="w-full p-2 text-center text-white rounded-lg main_wrapper bg-secondary">
      <h1 className="mb-1 font-semibold uppercase">{label}</h1>
      <h1 className="uppercase">{cluster}</h1>
    </div>
  );
}

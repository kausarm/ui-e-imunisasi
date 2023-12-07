import React from "react";
import Navbar from "../../components/Navbar";

const AboutUs: React.FC = () => {
  return (
    <main>
      <header className="bg-white">
        <Navbar />
      </header>
      <hr className="text-slate-500 h-[2px] hidden md:block" />
      <div className="container border-2 p-8 mx-auto mt-8 bg-white  shadow-lg md:w-[1140px] px-7 my-10 rounded-xl">
        <h1 className="mb-6 text-4xl font-bold text-center">
          Selamat Datang di Aplikasi Pendataan Imunisasi Kabupaten Bireun!
        </h1>

        <p className="mb-4 text-xl">
          Selamat datang di solusi inovatif yang dirancang untuk meningkatkan
          efisiensi dan akurasi pendataan imunisasi di Kabupaten Bireuen.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          <FeatureCard
            title="Pendataan Imunisasi Berbasis Kecamatan"
            description="Aplikasi ini menggunakan metode k-medoids untuk mengelompokkan data imunisasi tiap kecamatan secara cerdas. Hal ini memudahkan Anda untuk memahami pola imunisasi setiap wilayah dengan lebih mendalam."
          />
          <FeatureCard
            title="Visualisasi Data Interaktif"
            description="Pantau perkembangan imunisasi dengan grafik dan peta interaktif. Dengan tampilan yang user-friendly, Anda dapat dengan mudah mengakses informasi secara real-time."
          />
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">Manfaat Aplikasi:</h2>
          <ul className="list-disc list-inside">
            <li>
              Optimalkan Pelayanan Imunisasi: Identifikasi kebutuhan imunisasi
              setiap kecamatan untuk mengoptimalkan distribusi sumber daya dan
              tenaga kesehatan.
            </li>
            <li>
              Pemantauan Real-time: Pantau perkembangan imunisasi secara
              real-time dan identifikasi area yang memerlukan perhatian khusus.
            </li>
            <li>
              Penyelenggaraan Program yang Efektif: Dengan data yang akurat,
              Anda dapat merancang program imunisasi yang lebih efektif dan
              merata.
            </li>
          </ul>
        </div>

        <p className="mt-8">
          Dengan Aplikasi Pendataan Imunisasi Kabupaten Bireun, kita
          bersama-sama menciptakan masyarakat yang lebih sehat dan terlindungi.
          Mari bergabung dalam upaya meningkatkan kesejahteraan anak-anak
          Kabupaten Bireuen!
        </p>

        <p className="mt-4 text-sm text-gray-500">
          Penting: Aplikasi ini dikembangkan untuk keperluan tugas akhir
          mahasiswa dan bersifat simulasi. Pastikan data imunisasi resmi
          diperoleh dari sumber yang terpercaya.
        </p>
      </div>
    </main>
  );
};

export default AboutUs;

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <div className="p-4 rounded shadow-md bg-primary">
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};

import Styles from "./hero.module.css";
import ImLanding from "../../assets/images/im-landing.png";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

export default function Hero() {
  const token = Cookies.get("tkn");
  const navigate = useNavigate();

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="container md:w-[1140px] mx-auto px-7 lg:px-0">
        <div className="md:flex">
          <div
            className="self-center w-full"
            data-aos="fade-right"
            data-aos-duration="400"
          >
            <div className="items-center py-1 text-xs font-bold text-center rounded-lg __wrapper w-72 bg-primary">
              <p className="text-white">E-Imunisasi</p>
            </div>
            <h1
              className={`${Styles.__descHero} mt-12 mb-5 __descHero font-bold md:text-2xl text-sm`}
            >
              CLUSTERING STATUS PEMBERIAN IMUNISASI DASAR DI DINAS KESEHATAN
              KABUPATEN BIREUEN MENGGUNAKAN METODE K-MEDOIDS
            </h1>
            <h2 className={`mb-12 text-xs md:text-base`}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </h2>
            <Button
              onClick={() => {
                if (token) {
                  navigate("/dashboard");
                } else {
                  navigate("/auth/login");
                }
              }}
            >
              Lihat Dashboard
            </Button>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="400"
            className={`${Styles.__heroImg} __heroImg flex justify-end w-full `}
          >
            <img
              src={ImLanding}
              alt="Gambar Landing page"
              width={500}
              height={200}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

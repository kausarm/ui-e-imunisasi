import Link from "next/link";

export default function NavLink({route,title}) {
  return (
    <div className="nav-links">
      <Link href={route} >
          <p className="text-xs text-justify font-extralight">{title}</p>
      </Link>
    </div>
  );
}

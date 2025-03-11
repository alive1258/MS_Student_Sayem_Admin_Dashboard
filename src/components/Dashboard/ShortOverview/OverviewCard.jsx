// import icon2 from "../../../public/assets/images/Frame.png";
import Image from "next/image";
import Link from "next/link";

const OverviewCard = ({ icon, title, value, link }) => {
  return (
    <>
      <Link
        href={link}
        className="bg-[#111217] border border-[#26272F] rounded-lg pl-5 pr-6 py-2.5 flex items-center justify-between"
      >
        <div
          className="size-16 bg-no-repeat bg-cover flex items-center justify-center"
          style={{
            backgroundImage: "url(/assets/images/Polygon.png)",
          }}
        >
          {/* <Image src={icon2} width={32} height={32} alt="icon" /> */}
        </div>
        <div className="flex flex-col items-end">
          <p className="text-secondary-base"> {title}</p>
          <h1 className="text-2xl text-primary-muted font-semibold">
            {" "}
            {value}
          </h1>
        </div>
      </Link>
    </>
  );
};

export default OverviewCard;

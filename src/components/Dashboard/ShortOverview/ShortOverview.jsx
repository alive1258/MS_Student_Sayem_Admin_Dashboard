import OverviewCard from "./OverviewCard";

const ShortOverview = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OverviewCard title={"Total Student"} link={"/"} value={5000} />
        <OverviewCard title={"Total Student"} link={"/"} value={5000} />
        <OverviewCard title={"Total Student"} link={"/"} value={5000} />
        <OverviewCard title={"Total Student"} link={"/"} value={5000} />
      </div>
    </>
  );
};

export default ShortOverview;

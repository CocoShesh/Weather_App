import React from "react";

const CardSkeleton = () => {
  const [data, setData] = useState(Array.from({ length: 7 }));
  return (
    <div className="grid lg:grid-cols-7 gap-5  mt-14 xl:grid-cols-7 max-sm:grid-cols-2  md:grid-cols-4">
      {data.map((_, index) => (
        <div className="skeleton w-32 h-32"></div>
      ))}
    </div>
  );
};

export default CardSkeleton;

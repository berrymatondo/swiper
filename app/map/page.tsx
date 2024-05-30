"use client";

import dynamic from "next/dynamic";

const LazyMap = dynamic(() => import("@/components/map/map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const MapPage = () => {
  return (
    <div className="">
      <LazyMap />
    </div>
  );
};

export default MapPage;

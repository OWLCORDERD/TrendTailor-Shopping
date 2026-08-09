"use client";

import React, { useEffect, useState } from "react";
import { PiGraph } from "react-icons/pi";

const KeywordForceGraph = () => {
  // const [trendBuildGraphData, setTrendBuildGraphData] = useState(null);

  // useEffect(() => {
  //   if (trendBuildGraphData !== null) return;

  //   getTrendData();
  // }, []);

  // const getTrendData = async () => {
  //   try {
  //     const response = await fetch("/api/monthly-collection", {
  //       headers: {
  //         "x-vercel-cron": 1,
  //       },
  //     });

  //     const data = await response.json();

  //     if (data.status === 200) {
  //       console.log(data.data);
  //       setTrendBuildGraphData(data.data);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  return (
    <div className='keyword-force-graph'>
      <div className='no-data'>
        <div className='no-data-icon'>
          <PiGraph fill='#fff' size={80} />
        </div>
        <p>현재 준비중인 서비스입니다.</p>
      </div>
    </div>
  );
};

export default KeywordForceGraph;

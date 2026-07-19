"use client";

import React from "react";
import { Dashboard as CSS } from "@/styles";

const KPIGraph = () => {
  const dummyData = [
    {
      type: "top-keyword",
      data: {
        title: "블록코어",
        value: "+ 14",
      },
    },
    {
      type: "new-clothes",
      data: {
        title: "7월 신상 의류",
        value: "+ 700",
      },
    },
    {
      type: "new-keyword",
      data: {
        title: "블록코어 외",
        value: "+ 7",
      },
    },
  ];

  const getTypeLabel = (type) => {
    switch (type) {
      case "top-keyword":
        return "TOP 인기상승 키워드";
      case "new-clothes":
        return "신규 등록 아이템";
      case "new-keyword":
        return "신규 등록 키워드";
    }
  };
  return (
    <CSS.KPIGraph>
      {dummyData.map((item, index) => (
        <CSS.KPIGraphItem key={index}>
          <div className='kpi__label'>{getTypeLabel(item.type)}</div>
          <div className='kpi__value'>{item.data.title}</div>
          <div className='kpi__delta'>{item.data.value}</div>
        </CSS.KPIGraphItem>
      ))}
    </CSS.KPIGraph>
  );
};

export default KPIGraph;

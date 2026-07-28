'use client';

import React, { useEffect } from 'react'
import { PiGraph } from "react-icons/pi";

const KeywordForceGraph = () => {
  return (
    <div className='keyword-force-graph'>
        <div className='no-data'>
            <div className='no-data-icon'>
                <PiGraph fill='#fff' size={80} />
            </div>
            <p>현재 준비중인 서비스입니다.</p>
        </div>
    </div>
  )
};

export default KeywordForceGraph;
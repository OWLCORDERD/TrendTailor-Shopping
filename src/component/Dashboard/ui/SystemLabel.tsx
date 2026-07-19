"use client";

import React, { useState } from "react";
import { styled } from "styled-components";

const SystemLabel = ({
  type,
  labelTxt,
  labelTxt_B,
  subTxt,
  subTxt_B,
}: {
  type: string;
  labelTxt?: string;
  labelTxt_B?: string;
  subTxt?: string;
  subTxt_B?: string;
}) => {
  const SystemLabelStyled: any = {};

  SystemLabelStyled.Container = styled.div`
    display: inline-flex;
    max-width: 280px;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: 999px;
    background: var(--bg-elev);
    border: 1px solid var(--border);
    font-size: 12px;
    color: var(--text-muted);

    .B {
      color: var(--text);
      font-weight: 600;
      letter-spacing: -0.01em;
      font-size: 13px;
    }
  `;

  SystemLabelStyled.Eyebrow = styled.span`
    display: inline-block;
    width: 24px;
    height: 1px;
    background-color: var(--accent);
  `;

  SystemLabelStyled.LiveDot = styled.span<{ type: string }>`
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    margin-right: 8px;
    border: none;
    background-color: ${(props) =>
      props.type === "live" ? "#00FF00" : "#FF0000"};
    box-shadow: ${(props) =>
      props.type === "live" ? "0 0 8px #00FF00" : "0 0 8px #FF0000"};
    animation: pulse 2s infinite;

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }

      50% {
        opacity: 0.4;
      }
    }
  `;
  return (
    <SystemLabelStyled.Container>
      {type === "dot" && <SystemLabelStyled.LiveDot type='live' />}
      {type === "eyebrow" && <SystemLabelStyled.Eyebrow />}
      {labelTxt && <span className='label-txt'>{labelTxt}</span>}
      {labelTxt_B && <span className='label-txt B'>{labelTxt_B}</span>}
      {subTxt && <span className='sub-txt'>{subTxt}</span>}
      {subTxt_B && <span className='label-txt B'>{subTxt_B}</span>}
    </SystemLabelStyled.Container>
  );
};

export default SystemLabel;

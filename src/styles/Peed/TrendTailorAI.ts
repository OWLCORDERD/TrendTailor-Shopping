import Container from "@/component/trendlyAI/Container";
import { Component } from "react";
import { styled, StyledObject } from "styled-components";
import { JsxElement } from "typescript";

const styleOptions = {
  ContainerStyle: {
    padding: "6.25rem 8rem",
  } as StyledObject, // 컨테이너 wrapper
  Intro: {
    marginBottom: "6.25rem",
    ".title": {
      display: "block",
      maxWidth: "30rem",
      wordBreak: "keep-all",
      fontFamily: "Raleway, sans-serif",
      fontSize: "36px",
      color: "#fff",
      textTransform: "uppercase",
      marginBottom: "6.25rem",
    },

    ".description": {
      display: "block",
      maxWidth: "30rem",
      wordBreak: "keep-all",
      fontSize: "18px",
      color: "#fff",
    },
  } as StyledObject, // 인트로 대제목, 내용
  Contents: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  } as StyledObject, // 샘플 채팅 및 결과 UI wrapper
  SampleChat: {
    display: "flex",
    flexDirection: "column",
    gap: "2.5rem",
    width: "40%",
  } as StyledObject, // 샘플 채팅 UI wrapper
  UserBubble: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",

    ".profile": {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    ".bubble": {
      width: "calc(100% - 120px)",
      padding: "1.5rem 2rem",
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      borderRadius: "20px",
      fontSize: "18px",
      color: "#fff",
    },
  } as StyledObject, // 사용자 채팅 버블
  GenerateBubble: {
    display: "flex",
    gap: "1.5rem",
    justifyContent: "center",
    alignItems: "center",
    padding: "6rem",
    backgroundColor: "#fff",
    borderRadius: "20px",
    fontSize: "18px",
  } as StyledObject, // 생성 중인 채팅 버블
  AgentBubble: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    ".profile": {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    ".bubble": {
      width: "calc(100% - 120px)",
      padding: "1.5rem 2rem",
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      borderRadius: "20px",
      fontSize: "18px",
      color: "#fff",
      wordBreak: "keep-all",
    },
  } as StyledObject, // 에이전트 채팅 버블
  SampleResult: {} as StyledObject, // 샘플 결과 UI wrapper
};

const TrendTailorAI = {
  Container: styled.div(styleOptions.ContainerStyle),
  Intro: styled.div(styleOptions.Intro),
  Contents: styled.div(styleOptions.Contents),
  SampleChat: styled.div(styleOptions.SampleChat),
  UserBubble: styled.div(styleOptions.UserBubble),
  AgentBubble: styled.div(styleOptions.AgentBubble),
  GenerateBubble: styled.div(styleOptions.GenerateBubble),
  SampleResult: styled.div(styleOptions.SampleResult),
};

export { TrendTailorAI };

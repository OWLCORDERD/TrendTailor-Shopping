import { StyledComponentsConfig } from "next/dist/server/config-shared";
import styled from "styled-components";

const PreviewVideo: any = {};

PreviewVideo.Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 10;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export { PreviewVideo };

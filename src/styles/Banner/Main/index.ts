import styled from "styled-components";

const MainBanner: any = {};

MainBanner.Container = styled.div`
  width: 100%;
  height: 100%;
  color: #000;
  min-height: 100vh;
  padding: 6.25rem;
`;

MainBanner.Index = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: flex-start;
  color: #fff;
`;

MainBanner.Title = styled.h1`
  font-family: "Pacifico", cursive;
  font-size: 50px;
  font-weight: bold;
`;

MainBanner.Subtitle = styled.p`
  font-family: "Raleway", sans-serif;
  font-size: 24px;
  line-height: 1.5;
  font-weight: bold;
  text-transform: uppercase;
`;

interface ActiveIndexProps {
  $containerOpen: number;
}

MainBanner.TimelineNavigator = styled.div<ActiveIndexProps>`
  position: fixed;
  top: 100px;
  right: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: ${(props) => (props.$containerOpen ? "350px" : "200px")};
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  z-index: 999;
`;

MainBanner.TimelineControl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .timeline-title {
    font-family: "Raleway", sans-serif;
    font-size: 18px;
    text-transform: uppercase;
    color: #fff;
  }

  & > svg {
    color: #fff;
    font-size: 24px;
    cursor: pointer;
  }
`;

MainBanner.Timeline = styled.ul<ActiveIndexProps>`
  display: ${(props) => (props.$containerOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 50px;
  width: 100%;
  animation: ${(props) =>
    props.$containerOpen ? "animate 1.5s ease-in-out" : "none"};

  @keyframes animate {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

MainBanner.TimelineItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .timeline-index {
    display: flex;
    gap: 20px;
    align-items: flex-end;
    color: #fff;

    .timeline-en {
      font-size: 22px;
      text-transform: uppercase;
      font-weight: bold;
      font-family: "Raleway", sans-serif;
    }

    .timeline-kr {
      font-size: 14px;
      text-transform: uppercase;
      font-weight: 500;
      padding-bottom: 3px;
    }
  }

  .dot {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid #000;
    background-color: rgba(255, 255, 255, 0.2);
    transition: all 0.2s ease-in-out;

    &.active {
      background-color: #fff;
    }
  }
`;

export { MainBanner };

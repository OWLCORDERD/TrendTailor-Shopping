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

MainBanner.TimelineNavigator = styled.div`
  position: fixed;
  top: 100px;
  right: 100px;
  width: 350px;
`;

MainBanner.Timeline = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 50px;
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
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

export { MainBanner };

import { styled, StyledObject } from "styled-components";
import { motion } from "framer-motion";
import { fontPacifico, fontRaleway } from "@/styles/fontFamilies";

const MainBanner: any = {};
const KeywordPreviewMotion = {
  KeywordPreview: {
    maxWidth: "1450px",
    margin: "0 auto",
    display: "flex",
    gap: "50px",
    minHeight: "550px",
    padding: "2rem 3.25rem",

    ".reset-btn": {
      display: "block",
      width: "25px",
      height: "25px",
      fill: "#fff",
      marginBottom: "20px",
      cursor: "pointer",
    },
  } as StyledObject,
  Keyword: {
    width: "450px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: "20px",
    padding: "30px",
  } as StyledObject,
  KeywordTitle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "18px",
    textTransform: "uppercase",
    color: "#fff",
  } as StyledObject,
  PreviewImage: {
    position: "relative",
    display: "block",
    width: "150px",
    height: "150px",
    backgroundColor: "#eee",
    marginTop: "20px",
    borderRadius: "50%",
    overflow: "hidden",

    "& > img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  } as StyledObject,
  KeywordDescription: {
    display: "block",
    wordWrap: "break-word",
    marginTop: "20px",
    fontSize: "14px",
    fontWeight: "400",
    color: "#fff",
  } as StyledObject,

  RelatedClothes: {
    width: "950px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: "20px",
    padding: "15px 30px",
  } as StyledObject,
};

MainBanner.Container = styled.div`
  position: relative;
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
  font-family: ${fontPacifico};
  font-size: 50px;
  font-weight: bold;
`;

MainBanner.Subtitle = styled.p`
  font-family: ${fontRaleway};
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
    font-family: ${fontRaleway};
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
      font-family: ${fontRaleway};
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

MainBanner.Slider = styled.div`
  position: relative;
  width: 100%;
  height: 20rem;
  overflow: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 20rem;
    padding: 0 5rem;
    overflow: visible;
  }
`;

MainBanner.SlideWrap = styled.div`
  width: 100%;
  height: 100%;

  .swiper-wrapper {
    width: max-content;
  }

  .swiper-pagination {
    position: absolute;
    bottom: 0;
    height: 10px;
    top: inherit;
    background-color: rgb(68, 68, 68);

    .swiper-pagination-progressbar-fill {
      background-color: #fff !important;
    }
  }

  .swiper-slide {
    display: inline-flex;
    width: 250px !important;
  }

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    .swiper-slide {
      width: calc(100% / 4) !important;
    }
  }

  @media screen and (max-width: 768px) {
    .swiper-slide {
      width: 100% !important;
    }
  }
`;

MainBanner.SlideItem = styled.div<{ $mode: string }>`
  position: relative;
  width: 250px;
  height: 20rem;
  padding: 0 2rem;
  border-radius: 20px;

  @media screen and (max-width: 768px) {
    height: 18rem;
    padding: 0;
  }
`;

MainBanner.ClothesImg = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;

  & > img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

MainBanner.ClothesInfo = styled.div`
  width: 100%;
  padding: 20px 10px;

  .title {
    max-width: 230px;
    display: block;
    overflow: hidden;
    font-size: 13px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .brand {
    font-size: 12px;
    color: #9e9e9e;
  }
`;

MainBanner.FilterTab = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 15px;

  .tab-btn {
    width: 80px;
    height: 100%;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    color: rgba(205, 205, 205, 0.5);
    font-size: 14px;
    font-family: ${fontRaleway};
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &.active {
      border-bottom: 2px solid #fff;
      color: #fff;
    }
  }
`;

MainBanner.ControlBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 20px;
  width: 100%;
  margin-top: 20px;
`;

MainBanner.ControlButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background-color: #fff;

  & > svg {
    fill: #000;
  }
`;

MainBanner.KeywordPreview = styled(motion.div)(
  KeywordPreviewMotion.KeywordPreview
);
MainBanner.Keyword = styled(motion.div)(KeywordPreviewMotion.Keyword);
MainBanner.KeywordTitle = styled.div(KeywordPreviewMotion.KeywordTitle);
MainBanner.PreviewImage = styled.div(KeywordPreviewMotion.PreviewImage);
MainBanner.KeywordDescription = styled.div(
  KeywordPreviewMotion.KeywordDescription
);
MainBanner.RelatedClothes = styled(motion.div)(
  KeywordPreviewMotion.RelatedClothes
);

export { MainBanner };

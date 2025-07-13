import { styled } from "styled-components";

const TrendConsultant: any = {};

TrendConsultant.Container = styled.div`
  position: relative;
  width: 100%;
  padding: 5rem 6.25rem;
  background: #000;

  @media screen and (max-width: 768px) {
    padding: 5rem 2rem;
  }
`;

TrendConsultant.Title = styled.p`
  display: block;
  width: 100%;
  line-height: 60px;
  font-size: 40px;
  font-family: "Raleway", sans-serif;
  font-weight: 300;
  color: #fff !important;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 5rem;

  @media screen and (max-width: 768px) {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 2rem;
  }
`;

TrendConsultant.ProfileBox = styled.div`
  position: relative;
  width: 100%;
  height: 750px;

  // 금주 컨설턴트 프로필 이미지
  .channel-img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    width: 650px;
    height: 750px;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      width: 100%;
      height: 100%;
      z-index: 1;
      background: rgba(0, 0, 0, 0.6);
    }
  }

  .channel-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    // 금주 컨설턴트 프로필 이름
    &-name {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2rem;
      width: 30rem;
      margin-top: 5rem;

      .index {
        font-size: 20px;
        font-weight: 300;
        color: #fff;
      }

      .name {
        font-size: 32px;
        font-weight: 500;
        color: #fff;
      }
    }

    &-desc {
      width: 30rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2rem;
      margin-top: 5rem;

      .title {
        font-weight: bold;
        color: #fff;
        font-size: 23px;
      }

      .desc {
        color: #fff;
        font-size: 18px;
        font-weight: 300;
      }
    }
  }

  @media screen and (max-width: 768px) {
    height: max-content;

    .channel-img {
      position: relative;
      width: 100%;
      height: 350px;
    }

    .channel-info {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
      margin: 2rem 0;

      &-name {
        width: 50%;
        margin-top: 0;

        .index {
          font-size: 14px;
        }
        .name {
          font-size: 20px;
        }
      }

      &-desc {
        width: 100%;
        margin-top: 0;

        .title {
          font-size: 16px;
        }
        .desc {
          font-size: 14px;
        }
      }
    }
  }
`;

TrendConsultant.VideoBox = styled.div`
  position: absolute;
  left: 0;
  bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;

  .slide-control {
    position: relative;
    top: 0;
    left: 0;
    width: 20rem;
    display: flex;
    gap: 20px;
    align-items: center;
    padding-left: 6.25rem;

    .slide-pagination {
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      font-family: "TheJamsil", sans-serif;
    }

    .btn-wrap {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .slide-prev,
    .slide-next {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 20px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      border: none;

      &:hover {
        background: rgb(255, 255, 255, 0.8);

        svg {
          fill: #000;
        }
      }
    }
  }

  /* 트렌드 유튜버 비디오 스와이퍼 슬라이드 커스텀 */
  .slide-container {
    .swiper {
      .swiper-wrapper {
        .swiper-slide {
          max-width: 550px;
        }
        .swiper-slide-active {
          width: 100%;
          .trend-video {
            .video-thumbnail {
              &::before {
                opacity: 0;
              }
            }

            .video-infoBox {
              display: flex;
            }
          }
        }
      }
    }

    .trend-video {
      max-width: 700px;

      .video-thumbnail {
        position: relative;
        width: 100%;
        height: 350px;
        cursor: pointer;

        & > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        &::before {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 1;
          content: "";
          width: 100%;
          height: 100%;
          z-index: 1;
          background: rgba(0, 0, 0, 0.6);
        }
      }

      .video-infoBox {
        display: none;
        align-items: flex-start;
        width: 100%;
        height: 130px;
        padding-top: 20px;

        .channel-img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .title-channel {
          width: calc(100% - 50px);
          height: 100%;
          padding-left: 20px;

          .video-title {
            display: block;
            width: 100%;
            height: 70px;

            & > span {
              display: block;
              word-break: keep-all;
              width: 80%;
              color: #fff;
              font-family: "TheJamsil", sans-serif;
              font-size: 16px;
              font-weight: bold;
            }
          }

          .video-channel {
            & > span {
              color: #fff;
              font-size: 14px;
              font-weight: 300;
              line-height: 40px;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    position: relative;
    align-items: flex-end;

    .slide-control {
      width: max-content;
      padding-left: 0;
      margin: 25px 0;
    }

    .slide-container {
      width: 100%;
      .swiper {
        .swiper-wrapper {
          .swiper-slide {
            max-width: 250px;
          }
          .swiper-slide-active {
            width: 100%;
          }
        }
      }

      .trend-video {
        max-width: 250px;

        .video-thumbnail {
          width: 100%;
          height: 150px;
        }

        .video-infoBox {
          align-items: flex-start;
          width: 100%;
          height: 130px;
          padding-top: 20px;

          .channel-img {
            width: 25px;
            height: 25px;
          }

          .title-channel {
            width: calc(100% - 25px);
            height: 100%;
            padding-left: 20px;

            .video-title {
              display: block;
              width: 100%;
              height: 70px;

              & > span {
                display: block;
                word-break: keep-all;
                width: 80%;
                color: #fff;
                font-family: "TheJamsil", sans-serif;
                font-size: 14px;
                font-weight: bold;
              }
            }

            .video-channel {
              & > span {
                color: #fff;
                font-size: 12px;
                font-weight: 300;
                line-height: 40px;
              }
            }
          }
        }
      }
    }
  }
`;

TrendConsultant.VideoItem = styled.div``;

export { TrendConsultant };

import { styled } from "styled-components";

const TrendConsultant: any = {};

TrendConsultant.Container = styled.div`
  position: relative;
  width: 100%;
  padding: 5rem 6.25rem;
  background: #000;
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
`;

TrendConsultant.ProfileBox = styled.div`
  position: relative;
  width: 100%;
  max-height: 750px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  // 금주 컨설턴트 프로필 이름
  .profile-user {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    width: 30rem;
    margin-top: 5rem;

    &-index {
      font-size: 20px;
      font-weight: 300;
      color: #fff;
    }

    &-name {
      font-size: 32px;
      font-weight: 500;
      color: #fff;
    }
  }

  // 금주 컨설턴트 프로필 이미지
  .profile-img {
    position: relative;
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

  .profile-info {
    width: 30rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    margin-top: 5rem;

    &-title {
      font-weight: bold;
      color: #fff;
      font-size: 23px;
    }

    &-desc {
      color: #fff;
      font-size: 18px;
      font-weight: 300;
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
`;

TrendConsultant.VideoItem = styled.div``;

export { TrendConsultant };

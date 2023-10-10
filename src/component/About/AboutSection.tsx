import "styles/about.scss";
import { BsSearch, BsYoutube } from "react-icons/bs";
import { IoShirtSharp } from "react-icons/io5";
import { RiContactsFill } from "react-icons/ri";
import { svgDataList } from "../../component/svgData";

const AboutSection = () => {
  return (
    <section className='MainBanner-container'>
      <article className='AboutWISH-container'>
        <div className='AboutWISH-section'>
          <div className='AboutWISH-titleBox'>
            <div className='AboutWISH-index'>
              <span>our service</span>
            </div>
            <div className='AboutWISH-title'>
              <h1>
                We explore the latest trends in clothing that are changing.
              </h1>
            </div>

            <div className='AboutWISH-info'>
              <p>
                At wish, we are continuously updating through four intensive
                search solutions.
              </p>
            </div>
          </div>

          <div className='AboutWISH-solutions'>
            <a href='#Search' className='solutions-item'>
              <div className='solution-icon'>
                <BsSearch fontSize={60} fill='white' />
              </div>

              <div className='solution-content'>
                <div className='solution-title'>
                  <h1>search trand clothes</h1>
                </div>

                <div className='solution-info'>
                  <p>
                    최근에 유행하고 있는 의류 트렌드 키워드들을 검색엔진을 통해
                    수집합니다.
                  </p>
                </div>
              </div>
            </a>

            <a href='#shop' className='solutions-item'>
              <div className='solution-icon'>
                <IoShirtSharp fontSize={60} fill='white' />
              </div>

              <div className='solution-content'>
                <div className='solution-title'>
                  <h1>seasonal clothing shop</h1>
                </div>

                <div className='solution-info'>
                  <p>
                    시즌별로 트렌드를 분석하여 SHOP 의류 리스트를
                    업데이트합니다.
                  </p>
                </div>
              </div>
            </a>

            <a href='#youtube' className='solutions-item'>
              <div className='solution-icon'>
                <BsYoutube fontSize={60} fill='white' />
              </div>

              <div className='solution-content'>
                <div className='solution-title'>
                  <h1>CLOTHING YOUTUBE INFORMATION COLLECTION</h1>
                </div>

                <div className='solution-info'>
                  <p>
                    최근 많이 조회된 의류 유튜브를 분석하여 유튜버 컬렉션 의류
                    리스트를 업데이트합니다.
                  </p>
                </div>
              </div>
            </a>

            <a href='#Peed' className='solutions-item'>
              <div className='solution-icon'>
                <RiContactsFill fontSize={60} fill='white' />
              </div>

              <div className='solution-content'>
                <div className='solution-title'>
                  <h1>SHARING CLOTHING INFORMATION FEED</h1>
                </div>

                <div className='solution-info'>
                  <p>
                    자신의 스타일을 피드에 올려서 유저들과 의류 추천 및 정보
                    공유를 할 수 있습니다.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </article>

      <article className='AboutSeason-container'>
        <div className='Season-content'>
          <div className='Season-title'>
            <h1>Seasonal Collection</h1>
          </div>
          <div className='Season-info'>
            <p>
              Spring, Summer, Fall, Winter We only sell trendy clothes by
              collecting trendy clothes or new clothes for each season.
            </p>
          </div>
        </div>
        <div className='Season-typeBox'>
          {svgDataList.map(({ name, season, icon }) => {
            return (
              <a href='#SeasonIcons' key={name} className='Season-item'>
                <div className='Season-icon'>{icon()}</div>

                <div className='Season-state'>
                  <div className='Season-name'>
                    <h2>{name}</h2>
                  </div>

                  <div className='Season-date'>
                    <p>{season}</p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </article>
    </section>
  );
};

export default AboutSection;

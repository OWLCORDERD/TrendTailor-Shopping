import React from "react";
import "styles/notice.scss";
import { AiOutlinePlus } from "react-icons/ai";
import Search from "component/Search/Search";

const NoticeBoard = () => {
  return (
    <div className='Notice-container'>
      <Search />
      <div className='Notice-board'>
        <div className='Notice-titleBox'>
          <h1 className='Notice-title'>Notice</h1>

          <div className='viewMore-button'>
            <AiOutlinePlus fontSize={30} />
          </div>
        </div>

        <ul className='board-list'>
          <li>
            <a href='#'>
              <h2>
                [공지사항] WISH 사이트는 현재 개발중에 있습니다. 자세한 사항은
                문의바랍니다.
              </h2>
              <span>2023.08.25</span>
            </a>
          </li>

          <li>
            <a href='#'>
              <h2>
                [공지사항] WISH 사이트는 현재 개발중에 있습니다. 자세한 사항은
                문의바랍니다.
              </h2>
              <span>2023.08.25</span>
            </a>
          </li>

          <li>
            <a href='#'>
              <h2>
                [공지사항] WISH 사이트는 현재 개발중에 있습니다. 자세한 사항은
                문의바랍니다.
              </h2>
              <span>2023.08.25</span>
            </a>
          </li>

          <li>
            <a href='#'>
              <h2>
                [공지사항] WISH 사이트는 현재 개발중에 있습니다. 자세한 사항은
                문의바랍니다.
              </h2>
              <span>2023.08.25</span>
            </a>
          </li>

          <li>
            <a href='#'>
              <h2>
                [공지사항] WISH 사이트는 현재 개발중에 있습니다. 자세한 사항은
                문의바랍니다.
              </h2>
              <span>2023.08.25</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NoticeBoard;

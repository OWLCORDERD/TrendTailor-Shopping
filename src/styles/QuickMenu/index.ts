import { styled } from "styled-components";

const QuickMenu: any = {};

QuickMenu.Menu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  font-family: "TheJamsil", sans-serif;
  border-radius: 20px;

  .menu-item {
    width: 100%;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f8f9fa;
    }

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px;
      font-size: 1rem;
      font-weight: 500;
      color: #333;
      text-decoration: none;

      .menu-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        font-size: 30px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
`;

QuickMenu.AdditionalMenu = styled.div`
  margin: 20px auto 0 auto;
  width: 80px;
`;

QuickMenu.Chatbot = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
  border: none;
  margin-bottom: 20px;

  & > img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;

export { QuickMenu };

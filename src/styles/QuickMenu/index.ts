import { styled } from "styled-components";

const QuickMenu: any = {};

QuickMenu.Container = styled.div`
  position: fixed;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  z-index: 1001;
`;

QuickMenu.Title = styled.p`
  padding: 10px 10px;
  display: block;
  text-align: center;
  margin-bottom: 1rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  font-family: "Pacifico", cursive;
  font-size: 1.3rem;
  background-color: var(--colorMain);
  color: #fff;
  font-weight: 500;
`;

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

export { QuickMenu };

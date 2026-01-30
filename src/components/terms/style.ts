import styled from "@emotion/styled";

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  width: 90%;
  max-width: 480px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      transform: translateY(10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 16px;
  }

  button {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }
`;

export const Content = styled.div`
  padding: 16px;
  max-height: 300px;
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.6;
`;

export const Footer = styled.div`
  padding: 12px 16px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 8px;

  button {
    flex: 1;
    padding: 10px;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
  }

  .cancel {
    border: 1px solid #ccc;
    background: #fff;
  }

  .agree {
    background: #000;
    color: #fff;
    border: none;
  }
`;

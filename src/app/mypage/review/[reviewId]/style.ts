import styled from "@emotion/styled";
import { Button } from "./../../claim/new/style";

export const Wrapper = styled.div`
  flex: 1;
  padding-bottom: 300px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

export const Line = styled.hr`
  display: block;
  border: none; /* 기본 border 제거 */
  height: 1px; /* 두께 */
  background-color: #333;
  margin: 30px 0;
`;

export const ProductCard = styled.div`
  display: flex;
  gap: 14px;
  padding: 30px;
  border: 1px solid #e2e2e2;
  position: relative;
  margin-bottom: 20px;
`;

export const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const P_Info_Top = styled.div`
  font-size: 15px;
`;

export const P_Info_Bottom = styled.div``;

export const P_name = styled.div`
  font-weight: 600;
`;

export const P_option = styled.div`
  color: #555;
`;

export const Section = styled.div`
  margin-bottom: 20px;
`;

export const Date = styled.span`
  position: absolute;
  right: 30px;
  top: 30px;
  font-size: 14px;
  color: #999;
`;

export const ErrorText = styled.span``;

export const Stars = styled.div`
  display: flex;
`;

export const Star = styled.span<{ $active: boolean }>`
  font-size: 15px;
  cursor: pointer;
  color: ${({ $active }) => ($active ? "#ffcc00" : "#ddd")};
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 220px;
  padding: 20px 30px;
  border: 1px solid #ddd;

  &:focus {
    border: 1px solid #ddd; /* 보더 없애기 */
    outline: none; /* 기본 포커스 아웃라인 제거 */
    box-shadow: none; /* 혹시 그림자 있으면 제거 */
  }
`;

export const Container = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const ImageBox = styled.div`
  width: 70px;
  height: 70px;
  border: 1px solid #ddd;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Label = styled.label`
  cursor: pointer;
  font-size: 32px;
  color: #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const FileInput = styled.input`
  display: none;
`;

export const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const B_Cancel = styled.button`
  padding: 12px 15px;
  border-radius: 4px;
  border: 1px solid #ddd;
  cursor: pointer;
`;

export const B_Upload = styled.button`
  padding: 12px 15px;
  border-radius: 4px;
  background: #1e40af;
  color: #fff;
  cursor: pointer;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const Loading = styled.div`
  padding: 40px;
  text-align: center;
`;

export const Error = styled.div`
  padding: 40px;
  text-align: center;
  color: red;
`;

export const Contents = styled.section`
  background-color: #e7e7e7;
  padding: 30px;
  margin-bottom: 40px;
`;

export const Answer = styled.section`
  margin-bottom: 50px;
  h3 {
    margin-bottom: 30px;
    font-size: 18px;
  }
`;

export const ReplyText = styled.div`
  background-color: #f5f5f5;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  margin-top: 8px;
  white-space: pre-wrap; // 줄바꿈 유지
`;

export const Textarea_Admin = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 30px;
  border: 1px solid #ddd;
`;

export const Textarea_User = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 30px;
  border: 1px solid #ddd;
  background-color: #e7e7e7;

  &:focus {
    border: 1px solid #ddd;
  }
`;

export const Button_Wrapper = styled.section`
  display: flex;
  justify-content: center;
  gap: 15px;

  Button {
    padding: 12px 15px;
    border-radius: 4px;
    font-size: 14px;
  }
`;

export const Button_before = styled.button`
  border: 1px solid #ddd;
`;

export const Button_submit = styled.button`
  background-color: #1e40af;
  color: white;
`;

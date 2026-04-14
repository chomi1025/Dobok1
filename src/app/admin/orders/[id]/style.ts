import styled from "@emotion/styled";

export const Inner = styled.div`
  flex: 1;
  margin-bottom: 300px;

  hr {
    border: none;
    height: 1px;
    background-color: #ddd;
    margin: 30px 0;
  }
`;

export const Title = styled.h2`
  margin-bottom: 50px;
`;

export const Section = styled.section`
  background-color: #e7e7e7;
  border-radius: 5px;
  padding: 20px;
`;

export const SectionTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 18px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

export const ItemBox = styled.div`
  padding: 16px;
  margin-bottom: 12px;
  display: flex;

  h4 {
    margin-bottom: 7px;
  }
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  select {
    padding: 10px 33px 10px 15px;
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
`;

export const Select = styled.select`
  border-radius: 5px;
  color: #222;
`;

export const Arrow = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  font-size: 11px;
`;

export const PrimaryButton = styled.button`
  padding: 8px 14px;
  border-radius: 4px;
  border: none;
  background: #222;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 20px;
  border-radius: 6px;
  border: 1px solid #ddd;
  min-height: 150px;
`;

export const Label = styled.div`
  font-size: 13px;
  color: #888;
`;

export const Value = styled.div``;

export const DeliveryBox = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 200px;
`;

export const ErrorText = styled.p`
  margin-top: 8px;
  color: red;
  font-size: 13px;
`;

export const HistoryList = styled.div`
  margin-top: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px 20px;
  max-height: 200px;
  overflow-y: auto;
  background: #fafafa;
`;

export const HistoryItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #e5e5e5;

  &:last-child {
    border-bottom: none;
  }

  span {
    font-size: 12px;
    color: #888;
    display: block;
    margin-bottom: 4px;
  }

  p {
    font-size: 14px;
    color: #333;
  }
`;

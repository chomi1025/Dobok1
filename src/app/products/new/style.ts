import styled from "@emotion/styled";

export const Inner = styled.section`
  width: 1200px;
  padding-top: 90px;
  margin: 0 auto;

  &::after {
    content: "";
    display: flex;
    width: 940px;
    height: 1px;
    background-color: #ddd;
    margin: 150px auto 150px;
  }
`;

export const SectionHeader = styled.div`
  text-align: center;

  h2 {
    font-size: 32px;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #666;
  }

  &::after {
    content: "";
    display: flex;

    width: 940px;
    height: 1px;
    background-color: #ddd;
    margin: 60px auto 120px;
  }
`;

import styled from "@emotion/styled";

export const ProductInfoArea = styled.section`
  padding: 80px 0 150px;
  width: 1040px;
  margin: 0 auto;
`;

export const ProductSummary = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 80px;
  align-items: flex-start;

  > div {
    width: calc(100% / 2);
  }
`;

export const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background-color: #f5f5f5;

  img {
    object-fit: cover;
  }
`;

export const InfoWrapper = styled.div`
  flex: 1;
  h2 {
    color: #222;
    font-weight: 700;
    font-size: 24px;
  }

  hr {
    border: none;
    width: 100%;
    height: 1px;
    background-color: #333;
    margin: 20px 0;
  }
`;

export const Price = styled.div`
  > div {
    margin-bottom: 25px;

    > strong {
      font-size: 24px;
      font-weight: 700;
      margin-right: 5px;
    }
  }
`;

export const Delevery = styled.div`
  margin-bottom: 25px;

  > h3 {
    font-size: 16px;
    color: #222;
    font-weight: 700;
    margin-bottom: 8px;
  }

  > p {
    color: #888888;
    font-size: 14px;
  }
`;
export const OptionWrapper = styled.div`
  > label {
    font-size: 16px;
    display: block;
    font-weight: 700;
    margin-bottom: 10px;
  }
`;

export const Quantity = styled.div``;

export const OptionGroup = styled.div`
  margin-top: 24px;

  label {
    font-weight: 700;
    color: #222;
    display: block;
    margin-bottom: 12px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      padding: 8px 12px;
      border-radius: 5px;
    }
  }
`;

export const OptionChip = styled.li`
  font-size: 14px;
  color: #888;
  border: 1px solid #888;

  &.active {
    background-color: #333;
    color: #fff;
    border: none;
  }

  small {
    font-size: 11px;
    opacity: 0.8;
    margin-left: 4px;
  }
`;

export const SelectedOptions = styled.ul`
  li {
    padding: 20px 0;

    p {
      margin-bottom: 5px;
    }

    input {
      min-height: 35px;
      border-radius: 5px;
      border: 1px solid #888;
    }
  }
`;

export const SelectedListArea = styled.div`
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #f1f1f1;
`;

export const SelectedItem = styled.div`
  background-color: #f8f9fa;
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 4px;
  position: relative;

  .item_header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;

    .option_name {
      font-size: 14px;
      font-weight: 500;
      color: #333;
      padding-right: 20px;
    }

    .remove_btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
      color: #bbb;
      padding: 0;
      line-height: 1;

      &:hover {
        color: #333;
      }
    }
  }

  .item_bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .item_price {
      font-size: 16px;
      font-weight: 700;
      color: #222;
    }
  }
`;

export const Counter = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 2px;

  button {
    width: 28px;
    height: 28px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;

    &:disabled {
      color: #ccc;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background-color: #f5f5f5;
    }
  }

  .count {
    width: 34px;
    text-align: center;
    font-size: 13px;
    font-weight: 500;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    line-height: 28px;
  }
`;

export const TotalAmountArea = styled.div`
  margin-top: 24px;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .total_label {
    font-size: 15px;
    font-weight: 600;
    color: #222;
  }

  .total_price {
    display: flex;
    align-items: baseline;
    gap: 2px;
    color: #000;

    strong {
      font-size: 28px;
      font-weight: 800;
    }

    span {
      font-size: 16px;
      font-weight: 600;
    }
  }
`;

export const ButtonArea = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;

  > button {
    width: calc(100% / 2);
    min-height: 55px;
    font-size: 16px;
    border-radius: 5px;

    &:first-of-type {
      border: 1px solid #888;
      color: #333;
    }
    &:last-of-type {
      background-color: #333;
      color: white;
    }
  }
`;

export const TabArea = styled.nav`
  background-color: white;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  position: sticky;
  top: 0;
  z-index: 100;

  > ul {
    display: flex;
    width: 1040px;
    margin: 0 auto;

    > li {
      cursor: pointer;
      padding: 25px 0;
      text-align: center;
      width: calc(100% / 3);
      color: #666;
      border-bottom: 2px solid #333;
    }
  }
`;

export const DetailArea = styled.section`
  max-width: 1040px;
  margin: 0 auto;
  padding: 100px 0;

  > div {
    margin: 0 auto;
    padding: 100px 0;
    position: relative;
    max-width: 800px;

    > img {
      width: 100%;
      height: auto;
      object-fit: cover;

      &:not(:last-of-type) {
        margin-bottom: 50px;
      }
    }
  }
`;

export const ReviewArea = styled.section`
  width: 1040px;
  margin: 0 auto;
  min-height: 400px;

  > div:first-of-type {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  > hr {
    border: none;
    height: 1px;
    width: 100%;
    background-color: #333;
    margin: 0;
  }
`;

export const ReviewTitleArea = styled.h3`
  font-size: 20px;
  font-weight: 700;
`;

export const ReviewButtonArea = styled.div`
  display: flex;
  gap: 10px;

  button {
    border-radius: 5px;
    width: 150px;
    height: 45px;

    &:first-of-type {
      background-color: #333;
      color: white;
    }
    &:last-of-type {
      border: 1px solid #888;
    }
  }
`;

export const NoReview = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

export const ReviewList = styled.ul``;

export const ReviewRow = styled.li`
  display: flex;
  padding: 22px;
  border-bottom: 1px solid #ddd;
`;

export const Rating = styled.div`
  width: 15%;
  padding: 0 20px;
`;

export const ReviewText = styled.div`
  width: 55%;
  padding: 0 20px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ReviewWriter = styled.div`
  width: 15%;
  padding: 0 20px;
`;

export const ReviewDate = styled.div`
  width: 15%;
  padding: 0 20px;
`;

export const ShoppingGuide = styled.section`
  padding-bottom: 300px;
  margin: 0 auto;
  width: 1040px;
`;

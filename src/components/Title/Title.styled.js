import styled from '@emotion/styled';

export const Title = styled.h1`
  margin-top: 15%;
  text-align: center;
  font-size: 100px;
  color: #2c2c2c;

  animation: title 10s ease infinite;

  @keyframes title {
    0% {
      color: rgb(53, 53, 53);
      margin-bottom: -40px;
    }
    30% {
      letter-spacing: 12px;
      margin-bottom: -40px;
    }
  }
`;

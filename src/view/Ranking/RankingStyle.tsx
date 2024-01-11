import styled from "styled-components";

const RankingWrap = styled.div`
  padding: 2rem;

  select {
    margin-bottom: 2rem;
    width: 200px;
    height: 35px;
    padding: 0 10px;
    border: 1px solid #d3d3d3;
    border-radius: 8px;
  }

  .rankingName {
    margin-bottom: 1rem;
    font-size: 20px;
    font-weight: bold;
  }

  table {
    width: 100%;
    text-align: center;

    thead {
      th {
        border-bottom: 1px solid #d9d9d9;
        border-top: 1px solid #d9d9d9;
        padding: 1rem 0;
        font-weight: bold;
      }
    }

    tbody {
      td {
        padding: 1rem 0;
        vertical-align: middle;
      }

      .user-icon {
        width: 50px;
      }
    }
  }
`;

export { RankingWrap }
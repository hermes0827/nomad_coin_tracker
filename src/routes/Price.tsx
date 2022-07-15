import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

const PriceList = styled.ul``;

const PriceDetail = styled.li`
  background-color: white;
  color: ${(props) => props.theme.backgroundColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Price({ coinId }: ChartProps): any {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return data?.map((price) => (
    <PriceDetail>
      <>
        {new Date(Number(price.time_close) * 1000).toLocaleDateString()} :
        {price.close}
      </>
    </PriceDetail>
  ));
}

export default Price;

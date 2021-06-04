import ReactApexChart from "react-apexcharts";

import "./Chart.scss";

export default function DisplayChart(props) {
  console.log(props.candles)
  
  const candles = props.candles.map(([date, ...values]) => {
    return {x: new Date(date),
    y: values}})
    
    const chartData = {

    series: [{
      data: candles
    }],
    options: {
      chart: {
        type: 'candlestick',
        height: 350
      },
      title: {
        text: props.coinName,
        align: 'left'
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    }
  }

  const chart_width = 700;
  const chart_height = 500;

  return (
    <div className="Chart">
      <div className="content">
        <div>
          <ReactApexChart options={chartData.options} series={chartData.series} type="candlestick" width={chart_width} height={chart_height} />
        </div>
      </div>
    </div>
  );
}

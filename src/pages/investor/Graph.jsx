import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';


const data = [
    { year: '2022', investment: 2.60 },
    { year: '2021', investment: 3.00 },
    { year: '2020', investment: 3.40 },
    { year: '2019', investment: 3.80 },
    { year: '2018', investment: 4.20 },
    { year: '2017', investment: 4.60 },
    { year: '2016', investment: 5.00 },
  ];
  
  export default class Graph extends React.PureComponent {
    constructor(props) {
      super(props);
  
      this.state = {
        data,
      };
    }
  
    render() {
      const { data: chartData } = this.state;
  
      return (
        <Paper>
          <Chart
            data={chartData}
          >
            <ArgumentAxis />
            <ValueAxis max={7} />
  
            <BarSeries
              valueField="investment"
              argumentField="year"
            />
            <Title text="Investment Pattern" />
            <Animation />
          </Chart>
        </Paper>
      );
    }
  }
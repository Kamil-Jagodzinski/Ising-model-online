import React from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';


export default function LineChart( props ) {

const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.title,
        data: props.value,
        backgroundColor: "blue",
        borderColor: "blue",
        borderWidth: 3,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            size: 26,
            style: 'italic'
          },
        },
      },
    },
    scales: {
      x: {
          ticks: {
              font: {
                  size: 16 
              }
          }
      },
      y: {
        ticks: {
            font: {
                size: 16 
            }
        }
    }
  }
};


  return <Line  options={options} 
                style = {styles.singleChart}
                data={data} />;
}

const styles ={
  singleChart:{
    border: 'solid 1px black',
    margin: '10px',
    padding: '10px',
    fontSize: '20px',
  },
}
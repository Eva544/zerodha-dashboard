import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Holdings",
    },
  },
  scales: {
    x: {
      ticks: {
        maxRotation: 0, // prevent tilt
        minRotation: 0, // ensure they stay straight
        autoSkip: false, // optional: show all labels
        font: {
          size: 10, // make font smaller
        },
      },
    },
    y: {
      beginAtZero: true,
    },
  },
};

export function VerticalGraph({ data }) {
  return <Bar options={options} data={data} />;
}

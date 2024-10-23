
// Buttons
export const InconmeCategoryButtons = [
  {
    id: 1,
    text: "Paycheck",
    background: "#3A86FF",
  },
  {
    id: 2,
    text: "Gift",
    background: "#5C3C92 ",
  },
  {
    id: 3,
    text: "Interest",
    background: "#2C6E49",
  },
  {
    id: 4,
    text: "Other",
    background: "#F77F00",
  },
  {
    id: 5,
    text: "Bonus",
    background: "#16A085",
  },
  {
    id: 6,
    text: "Investment",
    background: "#FF5733",
  },
];

export const ExpensesCategoryButtons = [
  {
    id: 1,
    text: "Health",
    background: "#D62828",
  },
  {
    id: 2,
    text: "Leisure",
    background: "#16A085",
  },
  {
    id: 3,
    text: "Home",
    background: "#3A86FF",
  },
  {
    id: 4,
    text: "Cafe",
    background: "#F77F00",
  },
  {
    id: 5,
    text: "Education",
    background: "#5C3C92",
  },
  {
    id: 6,
    text: "Gifts",
    background: "#2C6E49",
  },
  {
    id: 7,
    text: "Groceries",
    background: "#FF5733",
  },
];


// Graphic

export const GRAPHIC_OPTIONS = {
  cutout: "50%",
  responsive: true,
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
      },
    },
  },
};

export const GRAPHIC_BAR_DATA = {
  type: "bar",
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      ticks: {
        autoSkip: true,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};


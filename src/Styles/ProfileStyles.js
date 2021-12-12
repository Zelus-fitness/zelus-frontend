export const Colors = {
  primary: "#ffffff",
  secondary: "#e5e7eb",
  tertiary: "#1f2937",
  darkLight: "#9ca3af",
  brand: "#FFCD38",
  green: "#10b981",
  red: "#ef4444",
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

export default {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItem: "center",
    padding: "50px",
  },

  textField: {
    width: "15vw",
  },

  textFieldContainer: {
    margin: "10px",
  },

  textFieldContainerHeight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "10px",
  },

  textFieldFeet: {
    width: "5%",
    margin: "10px !important",
  },

  textFieldInch: {
    width: "5%",
    margin: "10px !important",
  },

  submitButton: { width: "7.5vw", backgroundColor: `${brand} !important` },
};

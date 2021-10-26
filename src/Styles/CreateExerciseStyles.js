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
  brandHeader: {
    display: "flex",
    flexDirection: "column",
    fontSize: "30px",
    fontWeight: "bold",
    color: brand,
    padding: "10px",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    width: "15vw",
  },
  submitButton: {
    width: "7.5vw",
    height: "5vh",
    display: "flex !important",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${brand} !important`,
  },
  textFieldContainer: {
    margin: "10px",
  },
};

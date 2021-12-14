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
    width: "25%",
  },
  textFieldHeader: {
    margin: "10px",
    fontSize: "17px",
    fontWeight: "700",
  },
  textFieldContainer: {
    margin: "10px",
  },
  oneRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  oneDetailRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
};

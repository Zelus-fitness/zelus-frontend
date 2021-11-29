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
    padding: "1%",
  },

  submitButton: { width: "15vw", backgroundColor: `${brand} !important` },
  workoutContainer: {
    background: "rgb(231, 231, 231)",
    padding: "10px",
    margin: "10px",
    cursor: "pointer",
    borderRadius: "20px",
    position: "relative",
    "&:hover": {
      transition: "box-shadow 0.3s ease-in-out",
      boxShadow: "rgb(0 0 0 / 13%) 0px 0.2rem 1.2rem 0px",
    },
  },
  workoutText:{
    margin:"10px"
  }
};

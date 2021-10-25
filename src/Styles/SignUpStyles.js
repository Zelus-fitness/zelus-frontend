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
    padding: "50px",
  },
  brandHeader: {
    fontSize: "40px",
    fontWeight: "bold",
    color: brand,
    padding: "10px",
  },
  signUpHeader: {
    fontSize: "18px",
    marginBottom: "20px",
    letterSpacing: "1px",
    fontWeight: "bold",
    color: tertiary,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    maxWidth: "25vw",
    width: "100%",
    zIndex: 1,
    margin: "0px auto",
    padding: "80px 32px",
    borderRadius: "4px",
    boxShadow: "rgba(0,0,0,0.9) 0px 1px 3px",
  },
  firstNameInput: { width: "20vw" },
  firstNameTextField: {
    margin: "20px",
  },
  lastNameInput: { width: "20vw" },
  lastNameTextField: {
    margin: "20px",
  },
  emailTextField: {
    margin: "20px",
  },
  emailInput: {
    width: "20vw",
  },
  passwordTextField: {
    margin: "20px",
  },

  passwordInput: { width: "20vw" },
  submitButtonContainer: { marginTop: "30px" },
  submitButton: { width: "7.5vw", backgroundColor: `${brand} !important` },
  signUpLink: {
    paddingTop: "20px",
    fontSize: "16px",
  },
};

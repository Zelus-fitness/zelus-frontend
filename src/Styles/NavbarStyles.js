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
  navbarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    width: "15%",
    boxShadow: "2px 1px 9px 0px rgba(50, 50, 50, 0.69)",
    zIndex: "10",
    background: Colors.brand,
  },

  sideBarLink: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderBottom: "1px solid #9ca3af",
    transition: "all 0.25s ease-in-out",
    textDecoration: "none",
    color: Colors.darkLight,
    height: "75px",
    "&:hover": {
      cursor: "pointer",
      color: Colors.primary,
      boxShadow: "inset 7.5px 0px 0px 0px #FFFFFF",
      transition: "all 0.25s ease-in-out",
    },
  },

  sidebarLinkisActive: {
    background: Colors.brand,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "75px",
    transition: "all 0.25s ease-in-out",
    borderBottom: "1px solid #9ca3af",

    textDecoration: "none",
    color: Colors.primary,
    boxShadow: "inset 7.5px 0px 0px 0px #FFFFFF",
  },
};

export default {
  mainContainer: {
    padding: "1%",
  },
  myExercisesHeaderContainer: {
    margin: "10px",
  },
  exerciseContainer: {
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
  exerciseType: {
    fontSize: "30px",
    fontWeight: "650",
    marginBottom: "-2.5px",
  },
  detailHeader: {
    marginTop: "15px",
    marginBottom: "2.5px",
    fontWeight: "700",
    fontSize: "17px",
  },
  linkDecoration: { textDecoration: "none", color: "black" },
  oneSetRow: { display: "flex", flexDirection: "row" },
  oneSetRowChild: { marginRight: "5px" },
};

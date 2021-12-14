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

  editingWorkoutHeader: {
    margin: "10px",
    fontSize: "30px",
    fontWeight: "700",
  },

  textField: {
    width: "15vw",
  },

  textFieldContainer: {
    margin: "10px",
  },

  exerciseType: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  timer: {
    margin: "10px",
    fontSize: 20,
  },

  switchButton: {
    margin: "10px",
  },

  submitButton: {
    width: "7.5vw",
    height: "5vh",
    display: "flex !important",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${brand} !important`,
  },

  addExerciseButton: {
    width: "7.5vw",
    height: "5vh",
    display: "flex !important",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `#0A9FFA !important`,
  },
  type: { margin: "10px" },

  buttonContainer: {
    margin: "10px",
  },

  addSetButton: {
    width: "7.5vw",
    height: "5vh",
    display: "flex !important",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `#0A9FFA !important`,
  },

  addSetButtonContainer: {
    margin: "10px",
  },

  dropDownMenu: {
    width: "30%",
    margin: "10px",
  },

  exerciseTrashContainer: {
    margin: "10px",
  },

  setTrashContainer: {
    margin: "10px",
  },

  groupOfSets: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  trashIcon: {
    "&:hover": {
      color: "red",
      cursor: "pointer",
    },
  },
};

const arms_options = [
  { value: "Bench Dip", category: "Arms", label: "Bench Dip" },
  {
    value: "Bicep Curl (Barbell)",
    category: "Arms",
    label: "Bicep Curl (Barbell)",
  },
  {
    value: "Bicep Curl (Cable)",
    category: "Arms",
    label: "Bicep Curl (Cable)",
  },
  {
    value: "Bicep Curl (Dumbbell)",
    category: "Arms",
    label: "Bicep Curl (Dumbbell)",
  },
  {
    value: "Bicep Curl (Machine)",
    category: "Arms",
    label: "Bicep Curl (Machine)",
  },
  { value: "Cable Kickback", category: "Arms", label: "Cable Kickback" },
  {
    value: "Concentration Curl (Dumbbell)",
    category: "Arms",
    label: "Concentration Curl (Dumbbell)",
  },
];
const back_options = [
  { value: "Back Extension", category: "Back", label: "Back Extension" },
  {
    value: "Back Extension (Machine)",
    category: "Back",
    label: "Back Extension (Machine)",
  },
  {
    value: "Bent Over One Arm Row (Dumbbell",
    category: "Back",
    label: "Bent Over One Arm Row (Dumbbell",
  },
  {
    value: "Bent Over Row (Band)",
    category: "Back",
    label: "Bent Over Row (Band)",
  },
  {
    value: "Bent Over Row (Barbell)",
    category: "Back",
    label: "Bent Over Row (Barbell)",
  },
  {
    value: "Bent Over Row (Dumbbell)",
    category: "Back",
    label: "Bent Over Row (Dumbbell)",
  },
  {
    value: "Bent Over Row - Underhand (Barbell)",
    category: "Back",
    label: "Bent Over Row - Underhand (Barbell)",
  },
  { value: "Chin Up", category: "Back", label: "Chin Up" },
  {
    value: "Chin Up (Assisted)",
    category: "Back",
    label: "Chin Up (Assisted)",
  },
  {
    value: "Deadlift (Barbell)",
    category: "Back",
    label: "Deadlift (Barbell)",
  },
];
const cable_options = [
  { value: "Cable Crunch", category: "Cable", label: "Cable Crunch" },
];
const cardio_options = [
  { value: "Battle Ropes", category: "Cardio", label: "Battle Ropes" },
  { value: "Climbing", category: "Cardio", label: "Climbing" },
];
const chest_options = [
  {
    value: "Around the World",
    category: "Chest",
    label: "Around the World",
  },
  {
    value: "Bench Press (Barbell)",
    category: "Chest",
    label: "Bench Press (Barbell)",
  },
  {
    value: "Bench Press (Cable)",
    category: "Chest",
    label: "Bench Press (Cable)",
  },
  {
    value: "Bench Press (Dumbbell)",
    category: "Chest",
    label: "Bench Press (Dumbbell)",
  },
  {
    value: "Bench Press (Smith Machine)",
    category: "Chest",
    label: "Bench Press (Smith Machine)",
  },
  {
    value: "Bench Press - Close Grip (Barbell)",
    category: "Chest",
    label: "Bench Press - Close Grip (Barbell)",
  },
  {
    value: "Bench Press - Wide Grip (Barbell)",
    category: "Chest",
    label: "Bench Press - Wide Grip (Barbell)",
  },
  {
    value: "Cable Crossover",
    category: "Chest",
    label: "Cable Crossover",
  },
  { value: "Chest Dip", category: "Chest", label: "Chest Dip" },
  {
    value: "Chest Dip (Assisted)",
    category: "Chest",
    label: "Chest Dip (Assisted)",
  },
  { value: "Chest Fly", category: "Chest", label: "Chest Fly" },
  {
    value: "Chest Fly (Band)",
    category: "Chest",
    label: "Chest Fly (Band)",
  },
  {
    value: "ChestFly (Dumbbell)",
    category: "Chest",
    label: "ChestFly (Dumbbell)",
  },
  {
    value: "Chest Press (Band)",
    category: "Chest",
    label: "Chest Press (Band)",
  },
  {
    value: "Chest Press (Machine)",
    category: "Chest",
    label: "Chest Press (Machine)",
  },
  {
    value: "Decline Bench Press (Barbell)",
    category: "Chest",
    label: "Decline Bench Press (Barbell)",
  },
  {
    value: "Decline Bench Press (Dumbbell)",
    category: "Chest",
    label: "Decline Bench Press (Dumbbell)",
  },
  {
    value: "Decline Bench Press (Smith Machine)",
    category: "Chest",
    label: "Decline Bench Press (Smith Machine)",
  },
  {
    value: "Floor Press (Barbell)",
    category: "Chest",
    label: "Floor Press (Barbell)",
  },
];
const core_options = [
  { value: "Ab Wheel", category: "Core", label: "Ab Wheel" },
  { value: "Bicycle Crunch", category: "Core", label: "Bicycle Crunch" },
  { value: "Cable Twist", category: "Core", label: "Cable Twist" },
  {
    value: "Cross Body Crunch",
    category: "Core",
    label: "Cross Body Crunch",
  },
  { value: "Crunch", category: "Core", label: "Crunch" },
  {
    value: "Crunch (Machine)",
    category: "Core",
    label: "Crunch (Machine)",
  },
  {
    value: "Crunch (Stablility Ball)",
    category: "Core",
    label: "Crunch (Stablility Ball)",
  },
  { value: "Decline Crunch", category: "Core", label: "Decline Crunch" },
  { value: "Flat Knee Raise", category: "Core", label: "Flat Knee Raise" },
  { value: "Flat Leg Raise", category: "Core", label: "Flat Leg Raise" },
];
const fullbody_options = [
  { value: "Ball Slams", category: "Full Body", label: "Ball Slams" },
  { value: "Burpee", category: "Full Body", label: "Burpee" },
];
const legs_options = [
  { value: "Box Jump", category: "Legs", label: "Box Jump" },
  {
    value: "Box Squat (Barbell)",
    category: "Legs",
    label: "Box Squat (Barbell)",
  },
  {
    value: "Bulgarian Split Squat",
    category: "Legs",
    label: "Bulgarian Split Squat",
  },
  {
    value: "Cable Pull Through",
    category: "Legs",
    label: "Cable Pull Through",
  },
  {
    value: "Calf Press on Leg Press",
    category: "Legs",
    label: "Calf Press on Leg Press",
  },
  {
    value: "Calf Press on Seated Leg Press",
    category: "Legs",
    label: "Calf Press on Seated Leg Press",
  },
  { value: "Deadlift (Band)", category: "Legs", label: "Deadlift (Band)" },
  {
    value: "Deadlift (Dumbbell)",
    category: "Legs",
    label: "Deadlift (Dumbbell)",
  },
  {
    value: "Deadlift (Smith Machine)",
    category: "Legs",
    label: "Deadlift (Smith Machine)",
  },
  {
    value: "Deficit Deadlift (Barbell)",
    category: "Legs",
    label: "Deficit Deadlift (Barbell)",
  },
];
const olympic_options = [
  {
    value: "Clean (Barbell)",
    category: "Olympic",
    label: "Clean (Barbell)",
  },
  {
    value: "Clean and Jerk (Barbell)",
    category: "Olympic",
    label: "Clean and Jerk (Barbell)",
  },
  {
    value: "Deadlift High Pull (Barbell)",
    category: "Olympic",
    label: "Deadlift High Pull (Barbell)",
  },
];
const shoulder_options = [
  {
    value: "Arnold Press (Dumbbell)",
    category: "Shoulders",
    label: "Arnold Press (Dumbbell)",
  },
  {
    value: "Face Pull (Cable)",
    category: "Shoulders",
    label: "Face Pull (Cable)",
  },
  {
    value: "Front Raise (Band)",
    category: "Shoulders",
    label: "Front Raise (Band)",
  },
];

export default [
  {
    label: "Arms",
    options: arms_options,
  },
  {
    label: "Back",
    options: back_options,
  },
  {
    label: "Cable",
    options: cable_options,
  },
  {
    label: "Cardio",
    options: cardio_options,
  },
  {
    label: "Chest",
    options: chest_options,
  },
  {
    label: "Core",
    options: core_options,
  },
  {
    label: "Full Body",
    options: fullbody_options,
  },
  {
    label: "Legs",
    options: legs_options,
  },
  {
    label: "Olympic",
    options: olympic_options,
  },
  {
    label: "Shoulder",
    options: shoulder_options,
  },
];

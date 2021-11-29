import React, { Component } from "react";
import Select from "react-select";

export default class CustomSelect extends Component {
  render() {
    const arms_options = [
      { value: "Bench Dip", Catergory: "Arms", label: "Bench Dip" },
      {
        value: "Bicep Curl (Barbell)",
        Catergory: "Arms",
        label: "Bicep Curl (Barbell)",
      },
      {
        value: "Bicep Curl (Cable)",
        Catergory: "Arms",
        label: "Bicep Curl (Cable)",
      },
      {
        value: "Bicep Curl (Dumbbell)",
        Catergory: "Arms",
        label: "Bicep Curl (Dumbbell)",
      },
      {
        value: "Bicep Curl (Machine)",
        Catergory: "Arms",
        label: "Bicep Curl (Machine)",
      },
      { value: "Cable Kickback", Catergory: "Arms", label: "Cable Kickback" },
      {
        value: "Concentration Curl (Dumbbell)",
        Catergory: "Arms",
        label: "Concentration Curl (Dumbbell)",
      },
    ];
    const back_options = [
      { value: "Back Extension", Catergory: "Back", label: "Back Extension" },
      {
        value: "Back Extension (Machine)",
        Catergory: "Back",
        label: "Back Extension (Machine)",
      },
      {
        value: "Bent Over One Arm Row (Dumbbell",
        Catergory: "Back",
        label: "Bent Over One Arm Row (Dumbbell",
      },
      {
        value: "Bent Over Row (Band)",
        Catergory: "Back",
        label: "Bent Over Row (Band)",
      },
      {
        value: "Bent Over Row (Barbell)",
        Catergory: "Back",
        label: "Bent Over Row (Barbell)",
      },
      {
        value: "Bent Over Row (Dumbbell)",
        Catergory: "Back",
        label: "Bent Over Row (Dumbbell)",
      },
      {
        value: "Bent Over Row - Underhand (Barbell)",
        Catergory: "Back",
        label: "Bent Over Row - Underhand (Barbell)",
      },
      { value: "Chin Up", Catergory: "Back", label: "Chin Up" },
      {
        value: "Chin Up (Assisted)",
        Catergory: "Back",
        label: "Chin Up (Assisted)",
      },
      {
        value: "Deadlift (Barbell)",
        Catergory: "Back",
        label: "Deadlift (Barbell)",
      },
    ];
    const cable_options = [
      { value: "Cable Crunch", Catergory: "Cable", label: "Cable Crunch" },
    ];
    const cardio_options = [
      { value: "Battle Ropes", Catergory: "Cardio", label: "Battle Ropes" },
      { value: "Climbing", Catergory: "Cardio", label: "Climbing" },
    ];
    const chest_options = [
      {
        value: "Around the World",
        Catergory: "Chest",
        label: "Around the World",
      },
      {
        value: "Bench Press (Barbell)",
        Catergory: "Chest",
        label: "Bench Press (Barbell)",
      },
      {
        value: "Bench Press (Cable)",
        Catergory: "Chest",
        label: "Bench Press (Cable)",
      },
      {
        value: "Bench Press (Dumbbell)",
        Catergory: "Chest",
        label: "Bench Press (Dumbbell)",
      },
      {
        value: "Bench Press (Smith Machine)",
        Catergory: "Chest",
        label: "Bench Press (Smith Machine)",
      },
      {
        value: "Bench Press - Close Grip (Barbell)",
        Catergory: "Chest",
        label: "Bench Press - Close Grip (Barbell)",
      },
      {
        value: "Bench Press - Wide Grip (Barbell)",
        Catergory: "Chest",
        label: "Bench Press - Wide Grip (Barbell)",
      },
      {
        value: "Cable Crossover",
        Catergory: "Chest",
        label: "Cable Crossover",
      },
      { value: "Chest Dip", Catergory: "Chest", label: "Chest Dip" },
      {
        value: "Chest Dip (Assisted)",
        Catergory: "Chest",
        label: "Chest Dip (Assisted)",
      },
      { value: "Chest Fly", Catergory: "Chest", label: "Chest Fly" },
      {
        value: "Chest Fly (Band)",
        Catergory: "Chest",
        label: "Chest Fly (Band)",
      },
      {
        value: "ChestFly (Dumbbell)",
        Catergory: "Chest",
        label: "ChestFly (Dumbbell)",
      },
      {
        value: "Chest Press (Band)",
        Catergory: "Chest",
        label: "Chest Press (Band)",
      },
      {
        value: "Chest Press (Machine)",
        Catergory: "Chest",
        label: "Chest Press (Machine)",
      },
      {
        value: "Decline Bench Press (Barbell)",
        Catergory: "Chest",
        label: "Decline Bench Press (Barbell)",
      },
      {
        value: "Decline Bench Press (Dumbbell)",
        Catergory: "Chest",
        label: "Decline Bench Press (Dumbbell)",
      },
      {
        value: "Decline Bench Press (Smith Machine)",
        Catergory: "Chest",
        label: "Decline Bench Press (Smith Machine)",
      },
      {
        value: "Floor Press (Barbell)",
        Catergory: "Chest",
        label: "Floor Press (Barbell)",
      },
    ];
    const core_options = [
      { value: "Ab Wheel", Catergory: "Core", label: "Ab Wheel" },
      { value: "Bicycle Crunch", Catergory: "Core", label: "Bicycle Crunch" },
      { value: "Cable Twist", Catergory: "Core", label: "Cable Twist" },
      {
        value: "Cross Body Crunch",
        Catergory: "Core",
        label: "Cross Body Crunch",
      },
      { value: "Crunch", Catergory: "Core", label: "Crunch" },
      {
        value: "Crunch (Machine)",
        Catergory: "Core",
        label: "Crunch (Machine)",
      },
      {
        value: "Crunch (Stablility Ball)",
        Catergory: "Core",
        label: "Crunch (Stablility Ball)",
      },
      { value: "Decline Crunch", Catergory: "Core", label: "Decline Crunch" },
      { value: "Flat Knee Raise", Catergory: "Core", label: "Flat Knee Raise" },
      { value: "Flat Leg Raise", Catergory: "Core", label: "Flat Leg Raise" },
    ];
    const fullbody_options = [
      { value: "Ball Slams", Catergory: "Full Body", label: "Ball Slams" },
      { value: "Burpee", Catergory: "Full Body", label: "Burpee" },
    ];
    const legs_options = [
      { value: "Box Jump", Catergory: "Legs", label: "Box Jump" },
      {
        value: "Box Squat (Barbell)",
        Catergory: "Legs",
        label: "Box Squat (Barbell)",
      },
      {
        value: "Bulgarian Split Squat",
        Catergory: "Legs",
        label: "Bulgarian Split Squat",
      },
      {
        value: "Cable Pull Through",
        Catergory: "Legs",
        label: "Cable Pull Through",
      },
      {
        value: "Calf Press on Leg Press",
        Catergory: "Legs",
        label: "Calf Press on Leg Press",
      },
      {
        value: "Calf Press on Seated Leg Press",
        Catergory: "Legs",
        label: "Calf Press on Seated Leg Press",
      },
      { value: "Deadlift (Band)", Catergory: "Legs", label: "Deadlift (Band)" },
      {
        value: "Deadlift (Dumbbell)",
        Catergory: "Legs",
        label: "Deadlift (Dumbbell)",
      },
      {
        value: "Deadlift (Smith Machine)",
        Catergory: "Legs",
        label: "Deadlift (Smith Machine)",
      },
      {
        value: "Deficit Deadlift (Barbell)",
        Catergory: "Legs",
        label: "Deficit Deadlift (Barbell)",
      },
    ];
    const olympic_options = [
      {
        value: "Clean (Barbell)",
        Catergory: "Olympic",
        label: "Clean (Barbell)",
      },
      {
        value: "Clean and Jerk (Barbell)",
        Catergory: "Olympic",
        label: "Clean and Jerk (Barbell)",
      },
      {
        value: "Deadlift High Pull (Barbell)",
        Catergory: "Olympic",
        label: "Deadlift High Pull (Barbell)",
      },
    ];
    const shoulder_options = [
      {
        value: "Arnold Press (Dumbbell)",
        Catergory: "Shoulders",
        label: "Arnold Press (Dumbbell)",
      },
      {
        value: "Face Pull (Cable)",
        Catergory: "Shoulders",
        label: "Face Pull (Cable)",
      },
      {
        value: "Front Raise (Band)",
        Catergory: "Shoulders",
        label: "Front Raise (Band)",
      },
    ];

    const groupedOptions = [
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
    return (
      <div>
        <Select
          options={groupedOptions}
          onChange={(e) => {
            this.props.temp_type = e;
            this.props.handleChangeType(e);
          }}
        />
      </div>
    );
  }
}

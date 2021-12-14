import jwt_decode from "jwt-decode";

//Leave out the trailing "/"
//CORRECT: yahoo.com
//INCORRECT: yahoo.com/
// const URL = "https://zelus-fitness.herokuapp.com";
const URL = "http://localhost:8002";

export const checkForToken = () => {
  const userToken =
    localStorage.getItem("token") == null ? "" : localStorage.getItem("token");

  return userToken;
};

//Saves token to local storage
export const saveToken = (token, id) => {
  if (token === undefined) {
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    console.log("Error");
  } else {
    var newtoken = token.replace("JWT ", "");
    localStorage.setItem("token", newtoken);
    localStorage.setItem("id", id);
  }
};

//Checks to see if the API returns any error and display an error message on front end
async function checkForErrors(response) {
  try {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else if (
      (response.status >= 400 && response.status <= 499) ||
      !response.ok
    ) {
      let message = await response.json();

      console.log(message);

      throw Error(response.statusText);
    }
    // else if (!response.ok) {
    //   throw Error(response.statusText);
    // }
    else {
      if (response.ok) {
        return response.data;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function logInUser(object) {
  const url = `${URL}/signin`;
  const data = {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(object),
  };

  const loginUser = await fetch(url, data)
    .then((result) => {
      return result.json();
    })
    .catch((err) => {
      console.log(err);
    });

  let token = loginUser.token;
  var id = jwt_decode(token).id;
  console.log(id);
  saveToken(token, id);

  return loginUser;
}

export async function signUpUser(object) {
  const url = `${URL}/signup`;
  const data = {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(object),
  };

  const signUpUser = await fetch(url, data)
    .then((result) => {
      return result.json();
    })
    .catch((err) => {
      console.log(err);
    });

  return signUpUser;
}

export async function createExercise(object) {
  const url = `${URL}/exercise`;
  const data = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "JWT " + `${checkForToken()}`,
    },
    body: JSON.stringify(object),
  };

  const exerciseData = await fetch(url, data)
    .then((response) => checkForErrors(response))
    .then((results) => {
      return results;
    })
    .catch((error) => {
      console.log(error);
    });
  return exerciseData;
}

export async function getExercisesByUser() {
  const url = `${URL}/user/exercise`;
  const data = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "JWT " + `${checkForToken()}`,
    },
  };
  const exerciseData = await fetch(url, data)
    .then((response) => checkForErrors(response))
    .then((results) => {
      return results;
    })
    .catch((error) => {
      console.log(error);
    });
  return exerciseData;
}

export async function getExerciseByID(id) {
  const url = `${URL}/exercise/${id}`;
  const data = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "JWT " + `${checkForToken()}`,
    },
  };

  const exerciseData = await fetch(url, data)
    .then((response) => checkForErrors(response))
    .then((results) => {
      return results;
    })
    .catch((error) => {
      console.log(error);
    });
  return exerciseData;
}

export async function getWorkoutsByUser() {
  const url = `${URL}/user/workout`;
  const data = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "JWT " + `${checkForToken()}`,
    },
  };

  const workoutData = await fetch(url, data)
    .then((response) => checkForErrors(response))
    .then((results) => {
      return results;
    })
    .catch((error) => {
      console.log(error);
    });
  return workoutData;
}

export async function createWorkout(workoutObj) {
  const url = `${URL}/workout`;
  const data = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "JWT " + `${checkForToken()}`,
    },
    body: JSON.stringify(workoutObj),
  };

  const workoutData = await fetch(url, data)
    .then((response) => checkForErrors(response))
    .then((results) => {
      return results;
    })
    .catch((error) => {
      console.log(error);
    });
  return workoutData;
}

export async function getExtendedUserInfo() {
  const url = `${URL}/extendedprofile`;
  const data = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "JWT " + `${checkForToken()}`,
    },
  };

  const workoutData = await fetch(url, data)
    .then((response) => checkForErrors(response))
    .then((results) => {
      return results;
    })
    .catch((error) => {
      console.log(error);
    });
  return workoutData;
}

export async function updateExtendedProfile(object) {
  const url = `${URL}/extendedprofile`;
  const data = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "JWT " + `${checkForToken()}`,
    },
    body: JSON.stringify(object),
  };

  const workoutData = await fetch(url, data)
    .then((response) => checkForErrors(response))
    .then((results) => {
      return results;
    })
    .catch((error) => {
      console.log(error);
    });
  return workoutData;
}

export async function signOutUser() {
  const url = `${URL}/signout`;
  const data = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "JWT " + `${checkForToken()}`,
    },
  };

  const signoutData = await fetch(url, data)
    .then((response) => checkForErrors(response))
    .then((results) => {
      return results;
    })
    .catch((error) => {
      console.log(error);
    });
  return signoutData;
}

export async function findPublicWorkout() {
  const url = `${URL}/publicworkout`;
  const data = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "JWT " + `${checkForToken()}`,
    },
  };

  const workoutData = await fetch(url, data)
    .then((response) => checkForErrors(response))
    .then((results) => {
      return results;
    })
    .catch((error) => {
      console.log(error);
    });
  return workoutData;
}

export async function getWorkoutByID(id) {
  const url = `${URL}/workout/${id}`;
  const data = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "JWT " + `${checkForToken()}`,
    },
  };

  const workoutData = await fetch(url, data)
    .then((response) => checkForErrors(response))
    .then((results) => {
      return results;
    })
    .catch((error) => {
      console.log(error);
    });
  return workoutData;
}

export async function updateWorkout(id, object) {
  const url = `${URL}/workout/${id}`;
  const data = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "JWT " + `${checkForToken()}`,
    },
    body: JSON.stringify(object),
  };

  const workoutData = await fetch(url, data)
    .then((response) => checkForErrors(response))
    .then((results) => {
      return results;
    })
    .catch((error) => {
      console.log(error);
    });
  return workoutData;
}

export async function getFavoriteWorkouts() {
  const url = `${URL}/getfavoriteworkout`;
  const data = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "JWT " + `${checkForToken()}`,
    },
  };

  const workoutData = await fetch(url, data)
    .then((response) => checkForErrors(response))
    .then((results) => {
      return results;
    })
    .catch((error) => {
      console.log(error);
    });
  return workoutData;
}

export async function favoriteWorkoutAPI(id) {
  const url = `${URL}/favoriteworkout/${id}`;
  const data = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "JWT " + `${checkForToken()}`,
    },
  };

  const workoutData = await fetch(url, data)
    .then((response) => checkForErrors(response))
    .then((results) => {
      return results;
    })
    .catch((error) => {
      console.log(error);
    });
  return workoutData;
}

export async function unfavoriteWorkoutAPI(id) {
  const url = `${URL}/unfavoriteworkout/${id}`;
  const data = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "JWT " + `${checkForToken()}`,
    },
  };

  const workoutData = await fetch(url, data)
    .then((response) => checkForErrors(response))
    .then((results) => {
      return results;
    })
    .catch((error) => {
      console.log(error);
    });
  return workoutData;
}

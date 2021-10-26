//Leave out the trailing "/"
//CORRECT: yahoo.com
//INCORRECT: yahoo.com/
const URL = "https://zelus-fitness.herokuapp.com";

export const checkForToken = () => {
  const userToken =
    localStorage.getItem("token") === null ? "" : localStorage.getItem("token");

  return userToken;
};

//Saves token to local storage
export const saveToken = (token) => {
  if (token === undefined) {
    localStorage.removeItem("token");

    console.log("Error");
  } else {
    var newtoken = token.replace("JWT ", "");
    localStorage.setItem("token", newtoken);
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

      console.log("Error");

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

  saveToken(token);

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

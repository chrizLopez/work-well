import Toast from "react-native-toast-message";

export const handleError = (error: any) => {
  if (error.response) {
    console.log(error.response);
    const { status, data } = error.response;
    if (status === 401) {
      Toast.show({
        text1: "Unauthorized",
        text2: "Please login",
        type: "error",
      });
    } else {
      Toast.show({
        text1: "Error",
        text2: "Something went wrong",
        type: "error",
      });
    }
    if (status === 400) {
      const { errors } = data;
      if (errors) {
        if (errors) {
          const firstErrorKey = Object.keys(errors)[0];
          const firstErrorMessage = errors[firstErrorKey][0];
          Toast.show({
            text1: "Error",
            text2: firstErrorMessage,
            type: "error",
          });
        }
      }
      // Unauthorized
    }
    // Request made and server responded\
  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
};

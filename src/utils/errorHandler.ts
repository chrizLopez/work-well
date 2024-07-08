import Toast from "react-native-toast-message";

export const handleError = (error: any) => {
  if (error.response) {
    console.log(error.response);
    const { status } = error.response;
    if (status === 401) {
      Toast.show({
        text1: "Error",
        text2: "Unauthorized",
        type: "error",
      });
    } else {
      Toast.show({
        text1: "Error",
        text2: "Something went wrong",
        type: "error",
      });
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

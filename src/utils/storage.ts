import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeStringData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const storeObjectData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getStringData = (key: string) => {
  try {
    const value = AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

const getObjectData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

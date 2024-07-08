import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from 'react-native-toast-message';
import RootNavigator from "./src/navigators/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AppProvider } from "./src/context/AppProvider";

export default function App() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <AppProvider>
          <RootNavigator />
          <Toast />
        </AppProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

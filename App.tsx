import { GestureHandlerRootView } from "react-native-gesture-handler";
import RootNavigator from "./src/navigators/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AppProvider } from "./src/context/AppProvider";
import DrawerNavigator from "./src/navigators/DrawerNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <AppProvider>
          <DrawerNavigator />
        </AppProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

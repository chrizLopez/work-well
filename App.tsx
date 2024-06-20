import { GestureHandlerRootView } from "react-native-gesture-handler";
import RootNavigator from "./src/navigators/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <RootNavigator />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

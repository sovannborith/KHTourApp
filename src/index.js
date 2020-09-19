import { AppRegistry } from "react-native";
import { name as AppName } from "./app.json";
import FirebaseConfig from "./server/FirebaseConfig";

AppRegistry.registerComponent(AppName, () => FirebaseConfig);

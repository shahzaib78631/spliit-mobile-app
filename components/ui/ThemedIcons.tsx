import { withUnistyles } from "react-native-unistyles";

import {
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons"; // Import more icon libraries

// Wrap the icons with Unistyles
const ThemedMaterialCommunityIcons = withUnistyles(MaterialCommunityIcons);
const ThemedFontAwesome = withUnistyles(FontAwesome);
const ThemedMaterialIcons = withUnistyles(MaterialIcons);
const ThemedIonicons = withUnistyles(Ionicons);

export {
  ThemedMaterialCommunityIcons,
  ThemedFontAwesome,
  ThemedMaterialIcons,
  ThemedIonicons,
};

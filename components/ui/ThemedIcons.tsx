import {
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { Colors } from "@/theme/types";
import { StyleSheet } from "react-native-unistyles";

interface Props {
  /** Name of the icon from the library's glyph map */
  name:
    | keyof typeof MaterialIcons.glyphMap
    | keyof typeof FontAwesome.glyphMap
    | keyof typeof MaterialCommunityIcons.glyphMap
    | keyof typeof Ionicons.glyphMap
    | keyof typeof AntDesign.glyphMap;
  /** Icon color - Can be a string or a key from your theme's color palette */
  color: keyof Colors | (string & {});
  /** Size of the icon */
  size: number;
}

/** A helper to resolve color from theme or fallback to the provided color */
const resolveColor = (
  theme: { colors: Colors },
  color: string | keyof Colors
): string => {
  return theme.colors[color as keyof Colors] ?? color;
};

/** Themed MaterialCommunityIcons */
const ThemedMaterialCommunityIcons = ({ name, color, size }: Props) => {
  return (
    <MaterialCommunityIcons
      name={name as keyof typeof MaterialCommunityIcons.glyphMap}
      color={color}
      size={size}
      style={styles.icon(color)}
    />
  );
};

/** Themed FontAwesome */
const ThemedFontAwesome = ({ name, color, size }: Props) => {
  return (
    <FontAwesome
      name={name as keyof typeof FontAwesome.glyphMap}
      color={color}
      size={size}
      style={styles.icon(color)}
    />
  );
};

/** Themed MaterialIcons */
const ThemedMaterialIcons = ({ name, color, size }: Props) => {
  return (
    <MaterialIcons
      name={name as keyof typeof MaterialIcons.glyphMap}
      color={color}
      size={size}
      style={styles.icon(color)}
    />
  );
};

/** Themed Ionicons */
const ThemedIonicons = ({ name, color, size }: Props) => {
  return (
    <Ionicons
      name={name as keyof typeof Ionicons.glyphMap}
      color={color}
      size={size}
      style={styles.icon(color)}
    />
  );
};

/** Themed AntDesign */
const ThemedAntDesign = ({ name, color, size }: Props) => {
  return (
    <AntDesign
      name={name as keyof typeof AntDesign.glyphMap}
      color={color}
      size={size}
      style={styles.icon(color)}
    />
  );
};

const styles = StyleSheet.create((theme: { colors: Colors }) => ({
  icon: (color: string | keyof Colors) => ({
    color: resolveColor(theme, color),
  }),
}));

export {
  ThemedMaterialCommunityIcons,
  ThemedFontAwesome,
  ThemedMaterialIcons,
  ThemedIonicons,
  ThemedAntDesign,
};

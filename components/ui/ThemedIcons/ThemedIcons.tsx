import {
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { Colors } from "@/theme/types";
import { StyleSheet, withUnistyles } from "react-native-unistyles";

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

// Wrap the icons with Unistyles
const UniThemedMaterialCommunityIcons = withUnistyles(MaterialCommunityIcons);
const UniThemedFontAwesome = withUnistyles(FontAwesome);
const UniThemedMaterialIcons = withUnistyles(MaterialIcons);
const UniThemedIonicons = withUnistyles(Ionicons);
const UniThemedAntDesign = withUnistyles(AntDesign);

/** Themed MaterialCommunityIcons */
const ThemedMaterialCommunityIcons = ({ name, color, size }: Props) => {
  return (
    <UniThemedMaterialCommunityIcons
      name={name as keyof typeof MaterialCommunityIcons.glyphMap}
      size={size}
      uniProps={(theme) => ({
        color: resolveColor(theme, color),
      })}
    />
  );
};

/** Themed FontAwesome */
const ThemedFontAwesome = ({ name, color, size }: Props) => {
  return (
    <UniThemedFontAwesome
      name={name as keyof typeof FontAwesome.glyphMap}
      size={size}
      uniProps={(theme) => ({
        color: resolveColor(theme, color),
      })}
    />
  );
};

/** Themed MaterialIcons */
const ThemedMaterialIcons = ({ name, color, size }: Props) => {
  return (
    <UniThemedMaterialIcons
      name={name as keyof typeof MaterialIcons.glyphMap}
      size={size}
      uniProps={(theme) => ({
        color: resolveColor(theme, color),
      })}
    />
  );
};

/** Themed Ionicons */
const ThemedIonicons = ({ name, color, size }: Props) => {
  return (
    <UniThemedIonicons
      name={name as keyof typeof Ionicons.glyphMap}
      size={size}
      uniProps={(theme) => ({
        color: resolveColor(theme, color),
      })}
    />
  );
};

/** Themed AntDesign */
const ThemedAntDesign = ({ name, color, size }: Props) => {
  return (
    <UniThemedAntDesign
      name={name as keyof typeof AntDesign.glyphMap}
      size={size}
      uniProps={(theme) => ({
        color: resolveColor(theme, color),
      })}
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

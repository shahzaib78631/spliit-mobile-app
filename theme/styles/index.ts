import { Dimensions, I18nManager } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const { width, height } = Dimensions.get("window");

// COMMON STYLESHEET
export const useCommonStyles = () =>
  StyleSheet.create((theme) => ({
    // CONTAINER
    container: {
      paddingHorizontal: theme.padding.lg,
      backgroundColor: theme?.colors?.background,
      flex: 1,
    },

    // WINDOW WIDTH AND HEIGHT
    windowHeight: { height: height },
    windowWidth: { width: width },

    // WIDTHS PERCENTAGE
    width100: { width: "100%" },
    width90: { width: "90%" },
    width80: { width: "80%" },
    width70: { width: "70%" },
    width60: { width: "60%" },
    width50: { width: "50%" },
    width40: { width: "40%" },
    width30: { width: "30%" },
    width20: { width: "20%" },
    width10: { width: "10%" },
    width0: { width: "0%" },

    // HEIGHTS PERCENTAGE
    height100: { height: "100%" },
    height90: { height: "90%" },
    height80: { height: "80%" },
    height70: { height: "70%" },
    height60: { height: "60%" },
    height50: { height: "50%" },
    height40: { height: "40%" },
    height30: { height: "30%" },
    height20: { height: "20%" },
    height10: { height: "10%" },
    height0: { height: "0%" },

    // Flex
    flex1: { flex: 1 },
    flex0: { flex: 0 },

    // Flex grow
    flexGrow1: { flexGrow: 1 },

    // Flex wrap
    flexWrap: { flexWrap: "wrap" },

    // Item Separator
    itemSeparator: {
      height: 1,
      width: "100%",
      backgroundColor: theme?.colors?.outline,
    },

    // Justify content
    justifyCenter: { justifyContent: "center" },
    justifyFlexEnd: { justifyContent: "flex-end" },
    justifyFlexStart: { justifyContent: "flex-start" },
    justifyBetween: { justifyContent: "space-between" },

    // Align Items
    alignCenter: { alignItems: "center" },
    alignLeft: { alignItems: "flex-start" },
    alignRight: { alignItems: "flex-end" },

    // Align Self
    alignSelfCenter: { alignSelf: "center" },
    alignSelfStart: { alignSelf: "flex-start" },
    alignSelfEnd: { alignSelf: "flex-end" },

    // Center Alignment
    center: { justifyContent: "center", alignItems: "center" },

    // Directions
    row: { flexDirection: "row" },
    col: { flexDirection: "column" },

    // Row Alignments
    rowCenter: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    rowSpaceBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    spaceBetween: {
      justifyContent: "space-between",
    },

    rowJustifySpaceBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    rowAlignCenter: {
      flexDirection: "row",
      alignItems: "center",
    },

    // Positions
    absolute: { position: "absolute" },
    relative: { position: "relative" },

    // Absolute Positioning
    top0: { top: 0 },
    bottom0: { bottom: 0 },
    left0: { left: 0 },
    right0: { right: 0 },

    transform: { transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] },

    // Display
    displayNone: { display: "none" },
    displayFlex: { display: "flex" },

    // TEXT ALIGNMENT
    textCenter: { textAlign: "center" },
    textRight: { textAlign: "right" },
    textLeft: { textAlign: "left" },

    //** PADDINGS */

    // Padding Horizontal
    paddingHorizontal24: { paddingHorizontal: 24 },
    paddingHorizontal20: { paddingHorizontal: 20 },
    paddingHorizontal18: { paddingHorizontal: 18 },
    paddingHorizontal16: { paddingHorizontal: 16 },
    paddingHorizontal14: { paddingHorizontal: 14 },
    paddingHorizontal12: { paddingHorizontal: 12 },
    paddingHorizontal10: { paddingHorizontal: 10 },
    paddingHorizontal8: { paddingHorizontal: 8 },
    paddingHorizontal6: { paddingHorizontal: 6 },
    paddingHorizontal4: { paddingHorizontal: 4 },
    paddingHorizontal2: { paddingHorizontal: 2 },
    paddingHorizontal1: { paddingHorizontal: 1 },
    paddingHorizontal0: { paddingHorizontal: 0 },

    // Padding Vertical
    paddingVertical24: { paddingVertical: 24 },
    paddingVertical20: { paddingVertical: 20 },
    paddingVertical18: { paddingVertical: 18 },
    paddingVertical16: { paddingVertical: 16 },
    paddingVertical14: { paddingVertical: 14 },
    paddingVertical12: { paddingVertical: 12 },
    paddingVertical10: { paddingVertical: 10 },
    paddingVertical8: { paddingVertical: 8 },
    paddingVertical6: { paddingVertical: 6 },
    paddingVertical4: { paddingVertical: 4 },
    paddingVertical2: { paddingVertical: 2 },
    paddingVertical1: { paddingVertical: 1 },
    paddingVertical0: { paddingVertical: 0 },

    // Padding Top
    paddingTop24: { paddingTop: 24 },
    paddingTop20: { paddingTop: 20 },
    paddingTop18: { paddingTop: 18 },
    paddingTop16: { paddingTop: 16 },
    paddingTop14: { paddingTop: 14 },
    paddingTop12: { paddingTop: 12 },
    paddingTop10: { paddingTop: 10 },
    paddingTop8: { paddingTop: 8 },
    paddingTop6: { paddingTop: 6 },
    paddingTop4: { paddingTop: 4 },
    paddingTop2: { paddingTop: 2 },
    paddingTop0: { paddingTop: 0 },

    // Padding Bottom
    paddingBottom26: { paddingBottom: 26 },
    paddingBottom24: { paddingBottom: 24 },
    paddingBottom20: { paddingBottom: 20 },
    paddingBottom18: { paddingBottom: 18 },
    paddingBottom16: { paddingBottom: 16 },
    paddingBottom14: { paddingBottom: 14 },
    paddingBottom12: { paddingBottom: 12 },
    paddingBottom10: { paddingBottom: 10 },
    paddingBottom8: { paddingBottom: 8 },
    paddingBottom6: { paddingBottom: 6 },
    paddingBottom4: { paddingBottom: 4 },
    paddingBottom2: { paddingBottom: 2 },

    // Padding Left
    paddingLeft24: { paddingLeft: 24 },
    paddingLeft20: { paddingLeft: 20 },
    paddingLeft18: { paddingLeft: 18 },
    paddingLeft16: { paddingLeft: 16 },
    paddingLeft14: { paddingLeft: 14 },
    paddingLeft12: { paddingLeft: 12 },
    paddingLeft10: { paddingLeft: 10 },
    paddingLeft8: { paddingLeft: 8 },
    paddingLeft6: { paddingLeft: 6 },
    paddingLeft4: { paddingLeft: 4 },
    paddingLeft2: { paddingLeft: 2 },
    paddingLeft0: { paddingLeft: 0 },

    // Padding Right
    paddingRight24: { paddingRight: 24 },
    paddingRight20: { paddingRight: 20 },
    paddingRight18: { paddingRight: 18 },
    paddingRight16: { paddingRight: 16 },
    paddingRight14: { paddingRight: 14 },
    paddingRight12: { paddingRight: 12 },
    paddingRight10: { paddingRight: 10 },
    paddingRight8: { paddingRight: 8 },
    paddingRight6: { paddingRight: 6 },
    paddingRight4: { paddingRight: 4 },
    paddingRight2: { paddingRight: 2 },
    paddingRight0: { paddingRight: 0 },

    // Padding
    padding24: { padding: 24 },
    padding20: { padding: 20 },
    padding18: { padding: 18 },
    padding16: { padding: 16 },
    padding14: { padding: 14 },
    padding12: { padding: 12 },
    padding10: { padding: 10 },
    padding8: { padding: 8 },
    padding6: { padding: 6 },
    padding4: { padding: 4 },
    padding2: { padding: 2 },
    padding1: { padding: 1 },
    padding0: { padding: 0 },
    // Themed Padding
    paddingXxl: {
      padding: theme.padding.xxl,
    },
    paddingXl: {
      padding: theme.padding.xl,
    },
    paddingLg: {
      padding: theme.padding.lg,
    },
    paddingMd: {
      padding: theme.padding.md,
    },
    paddingSm: {
      padding: theme.padding.sm,
    },
    paddingXs: {
      padding: theme.padding.xs,
    },
    paddingNone: {
      padding: theme.padding.none,
    },

    // Padding Left
    paddingLeftXxl: {
      paddingLeft: theme.padding.xxl,
    },
    paddingLeftXl: {
      paddingLeft: theme.padding.xl,
    },
    paddingLeftLg: {
      paddingLeft: theme.padding.lg,
    },
    paddingLeftMd: {
      paddingLeft: theme.padding.md,
    },
    paddingLeftSm: {
      paddingLeft: theme.padding.sm,
    },
    paddingLeftXs: {
      paddingLeft: theme.padding.xs,
    },
    paddingLeftNone: {
      paddingLeft: theme.padding.none,
    },

    // Padding Right
    paddingRightXxl: {
      paddingRight: theme.padding.xxl,
    },
    paddingRightXl: {
      paddingRight: theme.padding.xl,
    },
    paddingRightLg: {
      paddingRight: theme.padding.lg,
    },
    paddingRightMd: {
      paddingRight: theme.padding.md,
    },
    paddingRightSm: {
      paddingRight: theme.padding.sm,
    },
    paddingRightXs: {
      paddingRight: theme.padding.xs,
    },
    paddingRightNone: {
      paddingRight: theme.padding.none,
    },

    // Padding Top
    paddingTopXxl: {
      paddingTop: theme.padding.xxl,
    },
    paddingTopXl: {
      paddingTop: theme.padding.xl,
    },
    paddingTopLg: {
      paddingTop: theme.padding.lg,
    },
    paddingTopMd: {
      paddingTop: theme.padding.md,
    },
    paddingTopSm: {
      paddingTop: theme.padding.sm,
    },
    paddingTopXs: {
      paddingTop: theme.padding.xs,
    },
    paddingTopNone: {
      paddingTop: theme.padding.none,
    },

    // Padding Bottom
    paddingBottomXxl: {
      paddingBottom: theme.padding.xxl,
    },
    paddingBottomXl: {
      paddingBottom: theme.padding.xl,
    },
    paddingBottomLg: {
      paddingBottom: theme.padding.lg,
    },
    paddingBottomMd: {
      paddingBottom: theme.padding.md,
    },
    paddingBottomSm: {
      paddingBottom: theme.padding.sm,
    },
    paddingBottomXs: {
      paddingBottom: theme.padding.xs,
    },
    paddingBottomNone: {
      paddingBottom: theme.padding.none,
    },

    // Padding Horizontal (Left and Right)
    paddingHorizontalXxl: {
      paddingHorizontal: theme.padding.xxl,
    },
    paddingHorizontalXl: {
      paddingHorizontal: theme.padding.xl,
    },
    paddingHorizontalLg: {
      paddingHorizontal: theme.padding.lg,
    },
    paddingHorizontalMd: {
      paddingHorizontal: theme.padding.md,
    },
    paddingHorizontalSm: {
      paddingHorizontal: theme.padding.sm,
    },
    paddingHorizontalXs: {
      paddingHorizontal: theme.padding.xs,
    },
    paddingHorizontalNone: {
      paddingHorizontal: theme.padding.none,
    },

    // Padding Vertical (Top and Bottom)
    paddingVerticalXxl: {
      paddingVertical: theme.padding.xxl,
    },
    paddingVerticalXl: {
      paddingVertical: theme.padding.xl,
    },
    paddingVerticalLg: {
      paddingVertical: theme.padding.lg,
    },
    paddingVerticalMd: {
      paddingVertical: theme.padding.md,
    },
    paddingVerticalSm: {
      paddingVertical: theme.padding.sm,
    },
    paddingVerticalXs: {
      paddingVertical: theme.padding.xs,
    },
    paddingVerticalNone: {
      paddingVertical: theme.padding.none,
    },

    //** MARGINS */
    // Margin Horizontal
    marginHorizontal24: { marginHorizontal: 24 },
    marginHorizontal22: { marginHorizontal: 22 },
    marginHorizontal20: { marginHorizontal: 20 },
    marginHorizontal18: { marginHorizontal: 18 },
    marginHorizontal16: { marginHorizontal: 16 },
    marginHorizontal14: { marginHorizontal: 14 },
    marginHorizontal12: { marginHorizontal: 12 },
    marginHorizontal10: { marginHorizontal: 10 },
    marginHorizontal8: { marginHorizontal: 8 },
    marginHorizontal6: { marginHorizontal: 6 },
    marginHorizontal4: { marginHorizontal: 4 },
    marginHorizontal2: { marginHorizontal: 2 },
    marginHorizontal0: { marginHorizontal: 0 },

    // Margin Vertical
    marginVertical24: { marginVertical: 24 },
    marginVertical22: { marginVertical: 22 },
    marginVertical20: { marginVertical: 20 },
    marginVertical18: { marginVertical: 18 },
    marginVertical16: { marginVertical: 16 },
    marginVertical14: { marginVertical: 14 },
    marginVertical12: { marginVertical: 12 },
    marginVertical10: { marginVertical: 10 },
    marginVertical8: { marginVertical: 8 },
    marginVertical6: { marginVertical: 6 },
    marginVertical4: { marginVertical: 4 },
    marginVertical2: { marginVertical: 2 },
    marginVertical0: { marginVertical: 0 },

    // Margin Top
    marginTopAuto: { marginTop: "auto" },
    marginTop32: { marginTop: 32 },
    marginTop30: { marginTop: 30 },
    marginTop28: { marginTop: 28 },
    marginTop26: { marginTop: 26 },
    marginTop24: { marginTop: 24 },
    marginTop22: { marginTop: 22 },
    marginTop20: { marginTop: 20 },
    marginTop18: { marginTop: 18 },
    marginTop16: { marginTop: 16 },
    marginTop14: { marginTop: 14 },
    marginTop12: { marginTop: 12 },
    marginTop10: { marginTop: 10 },
    marginTop8: { marginTop: 8 },
    marginTop6: { marginTop: 6 },
    marginTop4: { marginTop: 4 },
    marginTop2: { marginTop: 2 },
    marginTop0: { marginTop: 0 },

    // Margin Bottom
    marginBottom24: { marginBottom: 24 },
    marginBottom22: { marginBottom: 22 },
    marginBottom20: { marginBottom: 20 },
    marginBottom18: { marginBottom: 18 },
    marginBottom16: { marginBottom: 16 },
    marginBottom14: { marginBottom: 14 },
    marginBottom12: { marginBottom: 12 },
    marginBottom10: { marginBottom: 10 },
    marginBottom8: { marginBottom: 8 },
    marginBottom6: { marginBottom: 6 },
    marginBottom4: { marginBottom: 4 },
    marginBottom2: { marginBottom: 2 },
    marginBottom0: { marginBottom: 0 },

    // Margin Left
    marginLeftAuto: { marginLeft: "auto" },
    marginLeft24: { marginLeft: 24 },
    marginLeft22: { marginLeft: 22 },
    marginLeft20: { marginLeft: 20 },
    marginLeft18: { marginLeft: 18 },
    marginLeft16: { marginLeft: 16 },
    marginLeft14: { marginLeft: 14 },
    marginLeft12: { marginLeft: 12 },
    marginLeft10: { marginLeft: 10 },
    marginLeft8: { marginLeft: 8 },
    marginLeft6: { marginLeft: 6 },
    marginLeft4: { marginLeft: 4 },
    marginLeft2: { marginLeft: 2 },
    marginLeft0: { marginLeft: 0 },

    // Margin Right
    marginRightAuto: { marginRight: "auto" },
    marginRight24: { marginRight: 24 },
    marginRight22: { marginRight: 22 },
    marginRight20: { marginRight: 20 },
    marginRight18: { marginRight: 18 },
    marginRight16: { marginRight: 16 },
    marginRight14: { marginRight: 14 },
    marginRight12: { marginRight: 12 },
    marginRight10: { marginRight: 10 },
    marginRight8: { marginRight: 8 },
    marginRight6: { marginRight: 6 },
    marginRight4: { marginRight: 4 },
    marginRight2: { marginRight: 2 },
    marginRight0: { marginRight: 0 },

    // Margin
    margin24: { margin: 24 },
    margin22: { margin: 22 },
    margin20: { margin: 20 },
    margin18: { margin: 18 },
    margin16: { margin: 16 },
    margin14: { margin: 14 },
    margin12: { margin: 12 },
    margin10: { margin: 10 },
    margin8: { margin: 8 },
    margin6: { margin: 6 },
    margin4: { margin: 4 },
    margin2: { margin: 2 },
    margin0: { margin: 0 },
    // Themed Margin
    marginXxl: {
      margin: theme.margin.xxl,
    },
    marginXl: {
      margin: theme.margin.xl,
    },
    marginLg: {
      margin: theme.margin.lg,
    },
    marginMd: {
      margin: theme.margin.md,
    },
    marginSm: {
      margin: theme.margin.sm,
    },
    marginXs: {
      margin: theme.margin.xs,
    },

    // Margin Left
    marginLeftXxl: {
      marginLeft: theme.margin.xxl,
    },
    marginLeftXl: {
      marginLeft: theme.margin.xl,
    },
    marginLeftLg: {
      marginLeft: theme.margin.lg,
    },
    marginLeftMd: {
      marginLeft: theme.margin.md,
    },
    marginLeftSm: {
      marginLeft: theme.margin.sm,
    },
    marginLeftXs: {
      marginLeft: theme.margin.xs,
    },

    // Margin Right
    marginRightXxl: {
      marginRight: theme.margin.xxl,
    },
    marginRightXl: {
      marginRight: theme.margin.xl,
    },
    marginRightLg: {
      marginRight: theme.margin.lg,
    },
    marginRightMd: {
      marginRight: theme.margin.md,
    },
    marginRightSm: {
      marginRight: theme.margin.sm,
    },
    marginRightXs: {
      marginRight: theme.margin.xs,
    },

    // Margin Top
    marginTopXxl: {
      marginTop: theme.margin.xxl,
    },
    marginTopXl: {
      marginTop: theme.margin.xl,
    },
    marginTopLg: {
      marginTop: theme.margin.lg,
    },
    marginTopMd: {
      marginTop: theme.margin.md,
    },
    marginTopSm: {
      marginTop: theme.margin.sm,
    },
    marginTopXs: {
      marginTop: theme.margin.xs,
    },

    // Margin Bottom
    marginBottomXxl: {
      marginBottom: theme.margin.xxl,
    },
    marginBottomXl: {
      marginBottom: theme.margin.xl,
    },
    marginBottomLg: {
      marginBottom: theme.margin.lg,
    },
    marginBottomMd: {
      marginBottom: theme.margin.md,
    },
    marginBottomSm: {
      marginBottom: theme.margin.sm,
    },
    marginBottomXs: {
      marginBottom: theme.margin.xs,
    },

    // Margin Horizontal (Left and Right)
    marginHorizontalXxl: {
      marginHorizontal: theme.margin.xxl,
    },
    marginHorizontalXl: {
      marginHorizontal: theme.margin.xl,
    },
    marginHorizontalLg: {
      marginHorizontal: theme.margin.lg,
    },
    marginHorizontalMd: {
      marginHorizontal: theme.margin.md,
    },
    marginHorizontalSm: {
      marginHorizontal: theme.margin.sm,
    },
    marginHorizontalXs: {
      marginHorizontal: theme.margin.xs,
    },

    // Margin Vertical (Top and Bottom)
    marginVerticalXxl: {
      marginVertical: theme.margin.xxl,
    },
    marginVerticalXl: {
      marginVertical: theme.margin.xl,
    },
    marginVerticalLg: {
      marginVertical: theme.margin.lg,
    },
    marginVerticalMd: {
      marginVertical: theme.margin.md,
    },
    marginVerticalSm: {
      marginVertical: theme.margin.sm,
    },
    marginVerticalXs: {
      marginVertical: theme.margin.xs,
    },

    // BORDER RADIUS
    borderRadius24: { borderRadius: 24 },
    borderRadius22: { borderRadius: 22 },
    borderRadius20: { borderRadius: 20 },
    borderRadius18: { borderRadius: 18 },
    borderRadius16: { borderRadius: 16 },
    borderRadius14: { borderRadius: 14 },
    borderRadius12: { borderRadius: 12 },
    borderRadius10: { borderRadius: 10 },
    borderRadius8: { borderRadius: 8 },
    borderRadius6: { borderRadius: 6 },
    borderRadius4: { borderRadius: 4 },
    borderRadius2: { borderRadius: 2 },
    borderRadius0: { borderRadius: 0 },
    // Themed Border Radius
    borderRadiusXxl: {
      borderRadius: theme.borderRadius.xxl,
    },
    borderRadiusXl: {
      borderRadius: theme.borderRadius.xl,
    },
    borderRadiusLg: {
      borderRadius: theme.borderRadius.lg,
    },
    borderRadiusMd: {
      borderRadius: theme.borderRadius.md,
    },
    borderRadiusSm: {
      borderRadius: theme.borderRadius.sm,
    },
    borderRadiusXs: {
      borderRadius: theme.borderRadius.xs,
    },

    // Border Radius Top Left
    borderRadiusTopLeftXxl: {
      borderTopLeftRadius: theme.borderRadius.xxl,
    },
    borderRadiusTopLeftXl: {
      borderTopLeftRadius: theme.borderRadius.xl,
    },
    borderRadiusTopLeftLg: {
      borderTopLeftRadius: theme.borderRadius.lg,
    },
    borderRadiusTopLeftMd: {
      borderTopLeftRadius: theme.borderRadius.md,
    },
    borderRadiusTopLeftSm: {
      borderTopLeftRadius: theme.borderRadius.sm,
    },
    borderRadiusTopLeftXs: {
      borderTopLeftRadius: theme.borderRadius.xs,
    },

    // Border Radius Top Right
    borderRadiusTopRightXxl: {
      borderTopRightRadius: theme.borderRadius.xxl,
    },
    borderRadiusTopRightXl: {
      borderTopRightRadius: theme.borderRadius.xl,
    },
    borderRadiusTopRightLg: {
      borderTopRightRadius: theme.borderRadius.lg,
    },
    borderRadiusTopRightMd: {
      borderTopRightRadius: theme.borderRadius.md,
    },
    borderRadiusTopRightSm: {
      borderTopRightRadius: theme.borderRadius.sm,
    },
    borderRadiusTopRightXs: {
      borderTopRightRadius: theme.borderRadius.xs,
    },

    // Border Radius Bottom Left
    borderRadiusBottomLeftXxl: {
      borderBottomLeftRadius: theme.borderRadius.xxl,
    },
    borderRadiusBottomLeftXl: {
      borderBottomLeftRadius: theme.borderRadius.xl,
    },
    borderRadiusBottomLeftLg: {
      borderBottomLeftRadius: theme.borderRadius.lg,
    },
    borderRadiusBottomLeftMd: {
      borderBottomLeftRadius: theme.borderRadius.md,
    },
    borderRadiusBottomLeftSm: {
      borderBottomLeftRadius: theme.borderRadius.sm,
    },
    borderRadiusBottomLeftXs: {
      borderBottomLeftRadius: theme.borderRadius.xs,
    },

    // Border Radius Bottom Right
    borderRadiusBottomRightXxl: {
      borderBottomRightRadius: theme.borderRadius.xxl,
    },
    borderRadiusBottomRightXl: {
      borderBottomRightRadius: theme.borderRadius.xl,
    },
    borderRadiusBottomRightLg: {
      borderBottomRightRadius: theme.borderRadius.lg,
    },
    borderRadiusBottomRightMd: {
      borderBottomRightRadius: theme.borderRadius.md,
    },
    borderRadiusBottomRightSm: {
      borderBottomRightRadius: theme.borderRadius.sm,
    },
    borderRadiusBottomRightXs: {
      borderBottomRightRadius: theme.borderRadius.xs,
    },

    // Border Radius Horizontal (Left and Right)
    borderRadiusHorizontalXxl: {
      borderTopLeftRadius: theme.borderRadius.xxl,
      borderTopRightRadius: theme.borderRadius.xxl,
      borderBottomLeftRadius: theme.borderRadius.xxl,
      borderBottomRightRadius: theme.borderRadius.xxl,
    },
    borderRadiusHorizontalXl: {
      borderTopLeftRadius: theme.borderRadius.xl,
      borderTopRightRadius: theme.borderRadius.xl,
      borderBottomLeftRadius: theme.borderRadius.xl,
      borderBottomRightRadius: theme.borderRadius.xl,
    },
    borderRadiusHorizontalLg: {
      borderTopLeftRadius: theme.borderRadius.lg,
      borderTopRightRadius: theme.borderRadius.lg,
      borderBottomLeftRadius: theme.borderRadius.lg,
      borderBottomRightRadius: theme.borderRadius.lg,
    },
    borderRadiusHorizontalMd: {
      borderTopLeftRadius: theme.borderRadius.md,
      borderTopRightRadius: theme.borderRadius.md,
      borderBottomLeftRadius: theme.borderRadius.md,
      borderBottomRightRadius: theme.borderRadius.md,
    },
    borderRadiusHorizontalSm: {
      borderTopLeftRadius: theme.borderRadius.sm,
      borderTopRightRadius: theme.borderRadius.sm,
      borderBottomLeftRadius: theme.borderRadius.sm,
      borderBottomRightRadius: theme.borderRadius.sm,
    },
    borderRadiusHorizontalXs: {
      borderTopLeftRadius: theme.borderRadius.xs,
      borderTopRightRadius: theme.borderRadius.xs,
      borderBottomLeftRadius: theme.borderRadius.xs,
      borderBottomRightRadius: theme.borderRadius.xs,
    },

    // Border Radius Vertical (Top and Bottom)
    borderRadiusVerticalXxl: {
      borderTopLeftRadius: theme.borderRadius.xxl,
      borderTopRightRadius: theme.borderRadius.xxl,
      borderBottomLeftRadius: theme.borderRadius.xxl,
      borderBottomRightRadius: theme.borderRadius.xxl,
    },
    borderRadiusVerticalXl: {
      borderTopLeftRadius: theme.borderRadius.xl,
      borderTopRightRadius: theme.borderRadius.xl,
      borderBottomLeftRadius: theme.borderRadius.xl,
      borderBottomRightRadius: theme.borderRadius.xl,
    },
    borderRadiusVerticalLg: {
      borderTopLeftRadius: theme.borderRadius.lg,
      borderTopRightRadius: theme.borderRadius.lg,
      borderBottomLeftRadius: theme.borderRadius.lg,
      borderBottomRightRadius: theme.borderRadius.lg,
    },
    borderRadiusVerticalMd: {
      borderTopLeftRadius: theme.borderRadius.md,
      borderTopRightRadius: theme.borderRadius.md,
      borderBottomLeftRadius: theme.borderRadius.md,
      borderBottomRightRadius: theme.borderRadius.md,
    },
    borderRadiusVerticalSm: {
      borderTopLeftRadius: theme.borderRadius.sm,
      borderTopRightRadius: theme.borderRadius.sm,
      borderBottomLeftRadius: theme.borderRadius.sm,
      borderBottomRightRadius: theme.borderRadius.sm,
    },
    borderRadiusVerticalXs: {
      borderTopLeftRadius: theme.borderRadius.xs,
      borderTopRightRadius: theme.borderRadius.xs,
      borderBottomLeftRadius: theme.borderRadius.xs,
      borderBottomRightRadius: theme.borderRadius.xs,
    },

    // BACKGROUND COLORS
    bgTransparent: { backgroundColor: "transparent" },

    // COLOR
    colorBlack: { color: "black" },

    // Overflow Hidden
    overflowHidden: { overflow: "hidden" },

    // TEXT DECORATION
    textDecorationSolidUnderline: {
      textDecorationStyle: "solid",
      textDecorationLine: "underline",
    },

    // BORDER
    noBorder: { borderWidth: 0 },
    borderBottom0: { borderBottomWidth: 0 },
    borderTop0: { borderTopWidth: 0 },
    borderLeft0: { borderLeftWidth: 0 },
    borderRight0: { borderRightWidth: 0 },
    borderDanger: { borderColor: theme.colors.error, borderWidth: 1 },
    borderPrimary: { borderColor: theme.colors.primaryOutline, borderWidth: 1 },

    borderLeft1: {
      borderLeftWidth: 1,
      borderColor: theme.colors.outline,
    },
    border1: {
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    border2: {
      borderWidth: 2,
      borderColor: theme.colors.outline,
    },
    borderTop1: {
      borderTopWidth: 1,
      borderColor: theme.colors.outline,
    },
    borderBottom1: {
      borderBottomWidth: 1,
      borderColor: theme.colors.outline,
    },
    borderRight1: {
      borderRightWidth: 1,
      borderColor: theme.colors.outline,
    },
    // Themed Gap
    gapXxl: {
      gap: theme.spacing.xxl,
    },
    gapXl: {
      gap: theme.spacing.xl,
    },
    gapLg: {
      gap: theme.spacing.lg,
    },
    gapMd: {
      gap: theme.spacing.md,
    },
    gapSm: {
      gap: theme.spacing.sm,
    },
    gapXs: {
      gap: theme.spacing.xs,
    },

    // Gap Between Rows (Vertical)
    gapVerticalXxl: {
      rowGap: theme.spacing.xxl,
    },
    gapVerticalXl: {
      rowGap: theme.spacing.xl,
    },
    gapVerticalLg: {
      rowGap: theme.spacing.lg,
    },
    gapVerticalMd: {
      rowGap: theme.spacing.md,
    },
    gapVerticalSm: {
      rowGap: theme.spacing.sm,
    },
    gapVerticalXs: {
      rowGap: theme.spacing.xs,
    },

    // Gap Between Columns (Horizontal)
    gapHorizontalXxl: {
      columnGap: theme.spacing.xxl,
    },
    gapHorizontalXl: {
      columnGap: theme.spacing.xl,
    },
    gapHorizontalLg: {
      columnGap: theme.spacing.lg,
    },
    gapHorizontalMd: {
      columnGap: theme.spacing.md,
    },
    gapHorizontalSm: {
      columnGap: theme.spacing.sm,
    },
    gapHorizontalXs: {
      columnGap: theme.spacing.xs,
    },

    tabsContainer: {
      height: 32,
    },

    fontSize1: {
      fontSize: 1,
    },
    fontSize2: {
      fontSize: 2,
    },
    fontSize3: {
      fontSize: 3,
    },
    fontSize4: {
      fontSize: 4,
    },
    fontSize5: {
      fontSize: 5,
    },
    fontSize6: {
      fontSize: 6,
    },
    fontSize7: {
      fontSize: 7,
    },
    fontSize8: {
      fontSize: 8,
    },
    fontSize9: {
      fontSize: 9,
    },
    fontSize10: {
      fontSize: 10,
    },
    fontSize11: {
      fontSize: 11,
    },
    fontSize12: {
      fontSize: 12,
    },
    fontSize13: {
      fontSize: 13,
    },
    fontSize14: {
      fontSize: 14,
    },
    fontSize15: {
      fontSize: 15,
    },
    fontSize16: {
      fontSize: 16,
    },
    fontSize17: {
      fontSize: 17,
    },
    fontSize18: {
      fontSize: 18,
    },
    fontSize19: {
      fontSize: 19,
    },
    fontSize20: {
      fontSize: 20,
    },
    fontSize21: {
      fontSize: 21,
    },
    fontSize22: {
      fontSize: 22,
    },
    fontSize23: {
      fontSize: 23,
    },
    fontSize24: {
      fontSize: 24,
    },
    fontSize25: {
      fontSize: 25,
    },
    fontSize26: {
      fontSize: 26,
    },
    fontSize27: {
      fontSize: 27,
    },
    fontSize28: {
      fontSize: 28,
    },
    fontSize29: {
      fontSize: 29,
    },
    fontSize30: {
      fontSize: 30,
    },
    fontSize31: {
      fontSize: 31,
    },
    fontSize32: {
      fontSize: 32,
    },
    fontSize33: {
      fontSize: 33,
    },
    fontSize34: {
      fontSize: 34,
    },
    fontSize35: {
      fontSize: 35,
    },
    fontSize36: {
      fontSize: 36,
    },
    fontSize37: {
      fontSize: 37,
    },
    fontSize38: {
      fontSize: 38,
    },
    fontSize39: {
      fontSize: 39,
    },
    fontSize40: {
      fontSize: 40,
    },
    fontSize41: {
      fontSize: 41,
    },
    fontSize42: {
      fontSize: 42,
    },
    fontSize43: {
      fontSize: 43,
    },
    fontSize44: {
      fontSize: 44,
    },

    // Themed Font Size
    fontSizeXxl: {
      fontSize: theme.fontSize.xxl,
    },
    fontSizeXl: {
      fontSize: theme.fontSize.xl,
    },
    fontSizeLg: {
      fontSize: theme.fontSize.lg,
    },
    fontSizeMd: {
      fontSize: theme.fontSize.md,
    },
    fontSizeSm: {
      fontSize: theme.fontSize.sm,
    },
    fontSizeXs: {
      fontSize: theme.fontSize.xs,
    },

    // Font Size for Heading (Example)
    headingXxl: {
      fontSize: theme.fontSize.xxl,
      fontFamily: theme.fontFamily.bold,
    },
    headingXl: {
      fontSize: theme.fontSize.xl,
      fontFamily: theme.fontFamily.bold,
    },
    headingLg: {
      fontSize: theme.fontSize.lg,
      fontFamily: theme.fontFamily.bold,
    },

    fontRegular: {
      fontFamily: theme.fontFamily.regular,
    },

    fontMedium: {
      fontFamily: theme.fontFamily.medium,
    },

    fontLight: {
      fontFamily: theme.fontFamily.light,
    },

    fontBold: {
      fontFamily: theme.fontFamily.bold,
    },

    fontThin: {
      fontFamily: theme.fontFamily.thin,
    },

    fontUltraLight: {
      fontFamily: theme.fontFamily.ultraLight,
    },
  }));

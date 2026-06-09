/**
 * Component-specific prop types for all iOS native components
 */

import type { ColorValue, NativeSyntheticEvent } from 'react-native';
import type {
  IOSNativeViewProps,
  IOSButtonType,
  IOSButtonSize,
  IOSDatePickerMode,
  IOSDatePickerStyle,
  IOSActivityIndicatorStyle,
  IOSProgressViewStyle,
  IOSSearchBarStyle,
  IOSSegmentedControlStyle,
  IOSPageControlBackgroundStyle,
  IOSPickerItem,
  IOSAlertAction,
  IOSTabBarItem,
  IOSContextMenuItem,
  IOSToolbarItem,
  IOSTintColors,
  IOSImageSource,
} from './common';

// ─── IOSButton ───────────────────────────────────────────────────────────────

export interface IOSButtonProps extends IOSNativeViewProps {
  title?: string;
  icon?: IOSImageSource;
  type?: IOSButtonType | keyof typeof IOSButtonType;
  sizeStyle?: IOSButtonSize | keyof typeof IOSButtonSize;
  tintColor?: ColorValue;
  backgroundColor?: ColorValue;
  titleColors?: IOSTintColors;
  selected?: boolean;
  highlighted?: boolean;
  onPress?: (event: NativeSyntheticEvent<{ timestamp: number }>) => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

// ─── IOSSwitch ───────────────────────────────────────────────────────────────

export interface IOSSwitchProps extends IOSNativeViewProps {
  value?: boolean;
  onTintColor?: ColorValue;
  thumbTintColor?: ColorValue;
  trackColors?: { true?: ColorValue; false?: ColorValue };
  onValueChange?: (event: NativeSyntheticEvent<{ value: boolean }>) => void;
}

// ─── IOSSlider ───────────────────────────────────────────────────────────────

export interface IOSSliderProps extends IOSNativeViewProps {
  value?: number;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  minimumTrackTintColor?: ColorValue;
  maximumTrackTintColor?: ColorValue;
  thumbTintColor?: ColorValue;
  minimumValueImage?: IOSImageSource;
  maximumValueImage?: IOSImageSource;
  onValueChange?: (event: NativeSyntheticEvent<{ value: number }>) => void;
  onSlidingComplete?: (event: NativeSyntheticEvent<{ value: number }>) => void;
}

// ─── IOSStepper ──────────────────────────────────────────────────────────────

export interface IOSStepperProps extends IOSNativeViewProps {
  value?: number;
  minimumValue?: number;
  maximumValue?: number;
  stepValue?: number;
  wraps?: boolean;
  continuous?: boolean;
  tintColor?: ColorValue;
  backgroundColor?: ColorValue;
  dividerColor?: ColorValue;
  onValueChange?: (event: NativeSyntheticEvent<{ value: number }>) => void;
}

// ─── IOSProgressView ─────────────────────────────────────────────────────────

export interface IOSProgressViewProps extends IOSNativeViewProps {
  progress?: number;
  styleType?: IOSProgressViewStyle | keyof typeof IOSProgressViewStyle;
  progressTintColor?: ColorValue;
  trackTintColor?: ColorValue;
  progressImage?: IOSImageSource;
  trackImage?: IOSImageSource;
  animated?: boolean;
}

// ─── IOSActivityIndicatorView ────────────────────────────────────────────────

export interface IOSActivityIndicatorProps extends IOSNativeViewProps {
  animating?: boolean;
  indicatorStyle?: IOSActivityIndicatorStyle | keyof typeof IOSActivityIndicatorStyle;
  hidesWhenStopped?: boolean;
  color?: ColorValue;
}

// ─── IOSDatePicker ───────────────────────────────────────────────────────────

export interface IOSDatePickerProps extends IOSNativeViewProps {
  value?: string;
  mode?: IOSDatePickerMode | keyof typeof IOSDatePickerMode;
  pickerStyle?: IOSDatePickerStyle | keyof typeof IOSDatePickerStyle;
  minimumDate?: string;
  maximumDate?: string;
  minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30;
  locale?: string;
  timeZone?: string;
  countDownDuration?: number;
  onDateChange?: (event: NativeSyntheticEvent<{ date: string; timestamp: number }>) => void;
}

// ─── IOSPicker ───────────────────────────────────────────────────────────────

export interface IOSPickerProps<T = string> extends IOSNativeViewProps {
  selectedIndex?: number;
  items: IOSPickerItem<T>[];
  wheelStyle?: boolean;
  componentWidths?: number[];
  textColor?: ColorValue;
  onValueChange?: (event: NativeSyntheticEvent<{
    selectedIndex: number; selectedValue: T
  }>) => void;
}

// ─── IOSSearchBar ────────────────────────────────────────────────────────────

export interface IOSSearchBarProps extends IOSNativeViewProps {
  value?: string;
  placeholder?: string;
  barStyle?: IOSSearchBarStyle | keyof typeof IOSSearchBarStyle;
  showsCancelButton?: boolean;
  showsBookmarkButton?: boolean;
  showsSearchResultsButton?: boolean;
  searchResultsButtonSelected?: boolean;
  barTintColor?: ColorValue;
  tintColor?: ColorValue;
  textColor?: ColorValue;
  scopeButtonTitles?: string[];
  selectedScopeButtonIndex?: number;
  autoCapitalize?: 'none' | 'words' | 'sentences' | 'allCharacters';
  onChangeText?: (event: NativeSyntheticEvent<{ text: string }>) => void;
  onSearchButtonPress?: (event: NativeSyntheticEvent<{ text: string }>) => void;
  onCancelButtonPress?: () => void;
  onBookmarkButtonPress?: () => void;
  onScopeChange?: (event: NativeSyntheticEvent<{ selectedIndex: number }>) => void;
}

// ─── IOSSegmentedControl ─────────────────────────────────────────────────────

export interface IOSSegmentedControlProps extends IOSNativeViewProps {
  selectedIndex?: number;
  titles: string[];
  controlStyle?: IOSSegmentedControlStyle | keyof typeof IOSSegmentedControlStyle;
  selectedSegmentTintColor?: ColorValue;
  tintColor?: ColorValue;
  textColor?: ColorValue;
  selectedTextColor?: ColorValue;
  isMomentary?: boolean;
  onValueChange?: (event: NativeSyntheticEvent<{
    selectedIndex: number; title: string
  }>) => void;
}

// ─── IOSPageControl ──────────────────────────────────────────────────────────

export interface IOSPageControlProps extends IOSNativeViewProps {
  numberOfPages?: number;
  currentPage?: number;
  hidesForSinglePage?: boolean;
  pageIndicatorTintColor?: ColorValue;
  currentPageIndicatorTintColor?: ColorValue;
  backgroundStyle?: IOSPageControlBackgroundStyle | keyof typeof IOSPageControlBackgroundStyle;
  allowsContinuousInteraction?: boolean;
  showsPageIndicator?: boolean;
  onPageChange?: (event: NativeSyntheticEvent<{ currentPage: number }>) => void;
}

// ─── IOSAlert / ActionSheet ─────────────────────────────────────────────────

export interface IOSAlertProps {
  /** Alert title */
  title?: string;
  /** Alert message */
  message?: string;
  /** Alert style */
  style?: 'alert' | 'actionSheet';
  /** Actions to display */
  actions: IOSAlertAction[];
  /** Text field configuration for alert with input */
  textFields?: Array<{
    placeholder?: string;
    defaultValue?: string;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'asciiCapable' | 'numbersAndPunctuation' |
      'URL' | 'numberPad' | 'phonePad' | 'namePhonePad' | 'emailAddress'
      | 'decimalPad' | 'twitter' | 'webSearch' | 'asciiCapableNumberPad';
  }>;
  /** Called when an action is pressed */
  onDismiss?: (actionIndex: number, textFieldValues?: string[]) => void;
}

// ─── IOSTabBar ───────────────────────────────────────────────────────────────

export interface IOSTabBarProps extends IOSNativeViewProps {
  items: IOSTabBarItem[];
  selectedIndex?: number;
  tintColor?: ColorValue;
  unselectedItemTintColor?: ColorValue;
  barTintColor?: ColorValue;
  isTranslucent?: boolean;
  barStyle?: 'default' | 'black';
  showBadge?: boolean;
  onTabChange?: (event: NativeSyntheticEvent<{
    selectedIndex: number; item: IOSTabBarItem
  }>) => void;
}

// ─── IOSNavigationBar ────────────────────────────────────────────────────────

export interface IOSNavigationBarProps extends IOSNativeViewProps {
  title?: string;
  largeTitle?: string;
  largeTitleDisplayMode?: 'automatic' | 'always' | 'never';
  leftItems?: IOSToolbarItem[];
  rightItems?: IOSToolbarItem[];
  prefersLargeTitles?: boolean;
  barTintColor?: ColorValue;
  tintColor?: ColorValue;
  titleColor?: ColorValue;
  translucent?: boolean;
  hidden?: boolean;
  animated?: boolean;
  hideBackButton?: boolean;
  backTitle?: string;
  onLeftItemPress?: (index: number) => void;
  onRightItemPress?: (index: number) => void;
}

// ─── IOSToolbar ──────────────────────────────────────────────────────────────

export interface IOSToolbarProps extends IOSNativeViewProps {
  items: IOSToolbarItem[];
  position?: 'top' | 'bottom';
  barTintColor?: ColorValue;
  tintColor?: ColorValue;
  translucent?: boolean;
  animated?: boolean;
  onItemPress?: (index: number) => void;
}

// ─── IOSBadge ────────────────────────────────────────────────────────────────

export interface IOSBadgeProps extends IOSNativeViewProps {
  text?: string | number;
  badgeColor?: ColorValue;
  textColor?: ColorValue;
  font?: { size: number; weight?: string };
  offset?: { x: number; y: number };
  position?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
  hidden?: boolean;
}

// ─── IOSContextMenu ──────────────────────────────────────────────────────────

export interface IOSContextMenuProps extends IOSNativeViewProps {
  menuItems: IOSContextMenuItem[];
  previewSize?: 'small' | 'medium' | 'large';
  previewBackgroundColor?: ColorValue;
  /** Element that triggers the context menu */
  children?: React.ReactNode;
}

// ─── IOSTooltip ──────────────────────────────────────────────────────────────

export interface IOSTooltipProps extends IOSNativeViewProps {
  text: string;
  arrowDirection?: 'up' | 'down' | 'left' | 'right' | 'any' | 'unknown';
  placement?: 'top' | 'bottom' | 'leading' | 'trailing' | 'automatic';
  showImmediately?: boolean;
  dismissOnTap?: boolean;
  /** Element the tooltip points to */
  targetId?: string;
}

// ─── IOSGlassEffect (UIGlassEffectView - Liquid Glass, iOS 26+) ─────────────

/** Liquid Glass effect style (iOS 26.0+) */
export type IOSGlassEffectStyle =
  | 'regular'
  | 'thin'
  | 'ultraThin'
  | 'regularWithBlur'
  | 'thinWithBlur'
  | 'ultraThinWithBlur';

export interface IOSGlassEffectProps extends IOSNativeViewProps {
  /** The glass material style to apply */
  glassStyle?: IOSGlassEffectStyle;
  /** Tint color applied to the glass */
  tintColor?: ColorValue;
  /** Whether the glass effect responds to user interaction (hover/tap) */
  isInteractive?: boolean;
  /** Content rendered inside the glass container */
  children?: React.ReactNode;
}

// ─── IOSPullToRefresh / RefreshControl ───────────────────────────────────────

export interface IOSPullToRefreshProps extends IOSNativeViewProps {
  refreshing: boolean;
  tintColor?: ColorValue;
  titleColor?: ColorValue;
  title?: string;
  progressBackgroundColor?: ColorValue;
  progressTintColor?: ColorValue;
  onRefresh?: () => void;
}

// ─── IOSTextField (UITextField) ──────────────────────────────────────────────

/** Keyboard type for IOSTextField */
export type IOSKeyboardType =
  | 'default'
  | 'asciiCapable'
  | 'numbersAndPunctuation'
  | 'URL'
  | 'numberPad'
  | 'phonePad'
  | 'namePhonePad'
  | 'emailAddress'
  | 'decimalPad'
  | 'twitter'
  | 'webSearch'
  | 'asciiCapableNumberPad';

/** Return key type for IOSTextField */
export type IOSReturnKeyType =
  | 'default'
  | 'go'
  | 'google'
  | 'join'
  | 'next'
  | 'route'
  | 'search'
  | 'send'
  | 'yahoo'
  | 'done'
  | 'emergencyCall';

/** Auto capitalize type for IOSTextField */
export type IOSAutoCapitalizeType = 'none' | 'words' | 'sentences' | 'allCharacters';

/** Clear button mode for IOSTextField */
export type IOSClearButtonMode = 'never' | 'whileEditing' | 'unlessEditing' | 'always';

/** Font configuration for text components */
export interface IOSFontConfig {
  size?: number;
  weight?: string;
  family?: string;
}

export interface IOSTextFieldProps extends IOSNativeViewProps {
  value?: string;
  placeholder?: string;
  placeholderColor?: ColorValue;
  textColor?: ColorValue;
  font?: IOSFontConfig;
  keyboardType?: IOSKeyboardType;
  returnKeyType?: IOSReturnKeyType;
  secureTextEntry?: boolean;
  autoCapitalize?: IOSAutoCapitalizeType;
  autoCorrect?: boolean;
  editable?: boolean;
  borderColor?: ColorValue;
  borderWidth?: number;
  cornerRadius?: number;
  backgroundColor?: ColorValue;
  clearButtonMode?: IOSClearButtonMode;
  leftView?: React.ReactNode;
  rightView?: React.ReactNode;
  onChangeText?: (event: NativeSyntheticEvent<{ text: string }>) => void;
  onSubmitEditing?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

// ─── IOSColorWell (UIColorWell) ───────────────────────────────────────────────

export interface IOSColorWellProps extends IOSNativeViewProps {
  selectedColor?: string;
  supportsAlpha?: boolean;
  onColorChange?: (event: NativeSyntheticEvent<{ color: string }>) => void;
}

// ─── IOSLabel (UILabel) ──────────────────────────────────────────────────────

/** Line break mode for IOSLabel */
export type IOSLineBreakMode =
  | 'byWordWrapping'
  | 'byCharWrapping'
  | 'clipping'
  | 'truncatingHead'
  | 'truncatingTail'
  | 'truncatingMiddle';

/** Text alignment for IOSLabel */
export type IOSTextAlignment = 'left' | 'center' | 'right' | 'justified' | 'natural';

export interface IOSLabelProps extends IOSNativeViewProps {
  text?: string;
  textColor?: ColorValue;
  font?: IOSFontConfig;
  numberOfLines?: number;
  lineBreakMode?: IOSLineBreakMode;
  textAlignment?: IOSTextAlignment;
  adjustsFontSizeToFitWidth?: boolean;
  minimumScaleFactor?: number;
  shadowColor?: ColorValue;
  shadowOffset?: { width: number; height: number };
}

// ─── IOSImageView (UIImageView) ──────────────────────────────────────────────

/** Content mode for image view */
export type IOSContentMode =
  | 'scaleToFill'
  | 'scaleAspectFit'
  | 'scaleAspectFill'
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

/** Image source for IOSImageView */
export interface IOSImageViewSource {
  uri?: string;
  systemName?: string;
  bundle?: string;
}

export interface IOSImageViewProps extends IOSNativeViewProps {
  source?: IOSImageViewSource;
  contentMode?: IOSContentMode;
  tintColor?: ColorValue;
  cornerRadius?: number;
  clipsToBounds?: boolean;
  backgroundColor?: ColorValue;
  imageOpacity?: number;
  highlightedImage?: IOSImageViewSource;
}

// ─── IOSShapeView (UIView with shape) ────────────────────────────────────────

/** Shape type for IOSShapeView */
export type IOSShapeType = 'rectangle' | 'roundedRect' | 'circle' | 'capsule';

export interface IOSShapeViewProps extends IOSNativeViewProps {
  shape?: IOSShapeType;
  fillColor?: ColorValue;
  strokeColor?: ColorValue;
  strokeWidth?: number;
  cornerRadius?: number;
  shadowColor?: ColorValue;
  shadowOffset?: { width: number; height: number };
  shadowRadius?: number;
  shadowOpacity?: number;
}

// ─── IOSScrollView (UIScrollView) ────────────────────────────────────────────

/** Scroll indicator style */
export type IOSScrollIndicatorStyle = 'default' | 'black' | 'white';

/** Content inset for scroll views */
export interface IOSContentInset {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

export interface IOSScrollViewProps extends IOSNativeViewProps {
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  bounces?: boolean;
  bouncesZoom?: boolean;
  pagingEnabled?: boolean;
  scrollEnabled?: boolean;
  minimumZoomScale?: number;
  maximumZoomScale?: number;
  contentInset?: IOSContentInset;
  indicatorStyle?: IOSScrollIndicatorStyle;
  directionalLockEnabled?: boolean;
  children?: React.ReactNode;
  onScrollBeginDrag?: () => void;
  onScrollEndDrag?: () => void;
  onMomentumScrollBegin?: () => void;
  onMomentumScrollEnd?: () => void;
}

// ─── IOSCollectionView (UICollectionView) ────────────────────────────────────

/** Collection view item data */
export interface IOSCollectionViewItem {
  id: string | number;
  [key: string]: unknown;
}

export interface IOSCollectionViewProps extends IOSNativeViewProps {
  items?: IOSCollectionViewItem[];
  numColumns?: number;
  horizontal?: boolean;
  itemSpacing?: number;
  lineSpacing?: number;
  contentInset?: IOSContentInset;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  onItemPress?: (event: NativeSyntheticEvent<{ index: number; item: IOSCollectionViewItem }>) => void;
  renderItem?: (item: IOSCollectionViewItem, index: number) => React.ReactNode;
}

// ─── IOSWebView (WKWebView) ──────────────────────────────────────────────────

/** Web view source configuration */
export interface IOSWebViewSource {
  url?: string;
  htmlString?: string;
}

export interface IOSWebViewProps extends IOSNativeViewProps {
  source?: IOSWebViewSource;
  allowsBackForwardNavigationGestures?: boolean;
  showsScrollIndicator?: boolean;
  javaScriptEnabled?: boolean;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  onLoadError?: (event: NativeSyntheticEvent<{ error: string }>) => void;
  onMessage?: (event: NativeSyntheticEvent<{ message: string }>) => void;
}

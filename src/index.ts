/**
 * rn-ios-native-components
 *
 * All iOS native UIKit/HIG components, ready to use in React Native.
 *
 * @example
 * ```tsx
 * import {
 *   IOSButton,
 *   IOSSwitch,
 *   IOSSlider,
 *   IOSStepper,
 *   IOSProgressView,
 *   IOSActivityIndicator,
 *   IOSDatePicker,
 *   IOSPicker,
 *   IOSSearchBar,
 *   IOSSegmentedControl,
 *   IOSPageControl,
 *   IOSBadge,
 *   IOSPullToRefresh,
 *   IOSTabBar,
 *   IOSNavigationBar,
 *   IOSToolbar,
 *   IOSAlert,
 *   IOSContextMenu,
 *   IOSTooltip,
 *   IOSTextField,
 *   IOSColorWell,
 *   IOSLabel,
 *   IOSImageView,
 *   IOSShapeView,
 *   IOSScrollView,
 *   IOSCollectionView,
 *   IOSWebView,
 * } from 'rn-ios-native-components';
 *
 * // Also re-exports all types
 * ```
 */

// ─── Components ──────────────────────────────────────────────────────────────
export * from './components';

// ─── Types ───────────────────────────────────────────────────────────────────
export type {
  IOSButtonProps,
  IOSSwitchProps,
  IOSSliderProps,
  IOSStepperProps,
  IOSProgressViewProps,
  IOSActivityIndicatorProps,
  IOSDatePickerProps,
  IOSPickerProps,
  IOSSearchBarProps,
  IOSSegmentedControlProps,
  IOSPageControlProps,
  IOSAlertProps,
  IOSTabBarProps,
  IOSNavigationBarProps,
  IOSToolbarProps,
  IOSBadgeProps,
  IOSContextMenuProps,
  IOSTooltipProps,
  IOSPullToRefreshProps,
  IOSTextFieldProps,
  IOSColorWellProps,
  IOSLabelProps,
  IOSImageViewProps,
  IOSShapeViewProps,
  IOSScrollViewProps,
  IOSCollectionViewProps,
  IOSWebViewProps,
} from './types/components';

export {
  IOSTextStyle,
  IOSButtonType,
  IOSButtonSize,
  IOSDatePickerMode,
  IOSDatePickerStyle,
  IOSActivityIndicatorStyle,
  IOSProgressViewStyle,
  IOSSearchBarStyle,
  IOSSegmentedControlStyle,
  IOSPageControlBackgroundStyle,
  IOSPickerComponentStyle,
  IOSAlertStyle,
  IOSBadgePosition,
} from './types/common';

export type {
  IOSFontConfig,
  IOSKeyboardType,
  IOSReturnKeyType,
  IOSAutoCapitalizeType,
  IOSClearButtonMode,
  IOSLineBreakMode,
  IOSTextAlignment,
  IOSContentMode,
  IOSImageViewSource,
  IOSShapeType,
  IOSScrollIndicatorStyle,
  IOSContentInset,
  IOSCollectionViewItem,
  IOSWebViewSource,
} from './types/components';

export type {
  IOSNativeViewProps,
  IOSTintColors,
  IOSImageSource,
  IOSPickerItem,
  IOSAlertAction,
  IOSTabBarItem,
  IOSContextMenuItem,
  IOSToolbarItem,
  IOSNativeEvent,
  IOSValueChangeEvent,
  IOSSelectionEvent,
  IOSPressEvent,
} from './types/common';

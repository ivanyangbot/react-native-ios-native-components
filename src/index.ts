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
 *   IOSGlassEffect,
 *   // ... all 29 components
 * } from 'rn-ios-native-components';
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
  IOSGlassEffectProps,
} from './types/components';

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


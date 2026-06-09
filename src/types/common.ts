/**
 * Common types shared across all native iOS components
 */

import type { ViewProps, ColorValue } from 'react-native';

// ─── Enums ───────────────────────────────────────────────────────────────────

/** iOS system font size styles (UIFont.TextStyle) */
export enum IOSTextStyle {
  LargeTitle = 'largeTitle',
  Title1 = 'title1',
  Title2 = 'title2',
  Title3 = 'title3',
  Headline = 'headline',
  Body = 'body',
  Callout = 'callout',
  Subheadline = 'subheadline',
  Footnote = 'footnote',
  Caption1 = 'caption1',
  Caption2 = 'caption2',
}

/** iOS UIButton type */
export enum IOSButtonType {
  System = 'system',
  Custom = 'custom',
  DetailDisclosure = 'detailDisclosure',
  InfoLight = 'infoLight',
  InfoDark = 'infoDark',
  ContactAdd = 'contactAdd',
  Close = 'close',
}

/** iOS UIButton size style */
export enum IOSButtonSize {
  Mini = 'mini',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

/** iOS UIDatePicker mode */
export enum IOSDatePickerMode {
  Date = 'date',
  Time = 'time',
  DateTime = 'dateTime',
  CountDownTimer = 'countDownTimer',
}

/** iOS UIDatePicker style */
export enum IOSDatePickerStyle {
  Automatic = 'automatic',
  Wheels = 'wheels',
  Compact = 'compact',
  Inline = 'inline',
}

/** iOS UIActivityIndicatorView style */
export enum IOSActivityIndicatorStyle {
  Medium = 'medium',
  Large = 'large',
}

/** iOS UIProgressView style */
export enum IOSProgressViewStyle {
  Default = 'default',
  Bar = 'bar',
}

/** iOS UISearchBar style */
export enum IOSSearchBarStyle {
  Default = 'default',
  Prominent = 'prominent',
  Minimal = 'minimal',
}

/** iOS UISegmentedControl style */
export enum IOSSegmentedControlStyle {
  Automatic = 'automatic',
  Plain = 'plain',
  Bordered = 'bordered',
}

/** iOS UIPageControl background style */
export enum IOSPageControlBackgroundStyle {
  Automatic = 'automatic',
  Prominent = 'prominent',
  Minimal = 'minimal',
}

/** iOS UIPicker component style */
export enum IOSPickerComponentStyle {
  Default = 'default',
  Wheel = 'wheel',
}

/** iOS UIActionSheet / UIAlertController style */
export enum IOSAlertStyle {
  ActionSheet = 'actionSheet',
  Alert = 'alert',
}

/** iOS UITabBar item badge color position */
export enum IOSBadgePosition {
  TopRight = 'topRight',
  TopLeft = 'topLeft',
}

// ─── Common Event Types ──────────────────────────────────────────────────────

export interface IOSNativeEvent {
  target?: number;
}

export interface IOSValueChangeEvent<T> extends IOSNativeEvent {
  value: T;
}

export interface IOSPressEvent extends IOSNativeEvent {
  timestamp: number;
}

export interface IOSSelectionEvent<T> extends IOSNativeEvent {
  selectedIndex: number;
  selectedValue: T;
}

// ─── Common Prop Types ───────────────────────────────────────────────────────

/** Props shared by all native iOS components */
export interface IOSNativeViewProps extends ViewProps {
  /** Whether the component is enabled (interactive) */
  enabled?: boolean;
  /** Opacity when disabled, default 0.5 */
  disabledOpacity?: number;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Accessibility hint */
  accessibilityHint?: string;
  /** Test ID for testing */
  testID?: string;
}

/** Color pair for tints */
export interface IOSTintColors {
  normal?: ColorValue;
  disabled?: ColorValue;
  highlighted?: ColorValue;
}

/** Image source compatible with RN */
export interface IOSImageSource {
  uri?: string;
  bundle?: string;
  systemName?: string; // SF Symbols
}

/** Picker item */
export interface IOSPickerItem<T = string> {
  label: string;
  value: T;
  /** SF Symbol or image source */
  icon?: IOSImageSource;
}

/** Alert action */
export interface IOSAlertAction {
  title: string;
  style?: 'default' | 'cancel' | 'destructive';
  /** SF Symbol for iOS 15+ */
  icon?: IOSImageSource;
  onPress?: () => void;
}

/** Tab bar item */
export interface IOSTabBarItem {
  title: string;
  icon?: IOSImageSource;
  selectedIcon?: IOSImageSource;
  badge?: string | number | null;
  badgeColor?: ColorValue;
}

/** Navigation bar button item */
export enum IOSBarButtonSystemItem {
  Done = 'done',
  Cancel = 'cancel',
  Edit = 'edit',
  Save = 'save',
  Add = 'add',
  FlexibleSpace = 'flexibleSpace',
  FixedSpace = 'fixedSpace',
  Compose = 'compose',
  Reply = 'reply',
  Action = 'action',
  Organize = 'organize',
  Bookmarks = 'bookmarks',
  Search = 'search',
  Refresh = 'refresh',
  Stop = 'stop',
  Camera = 'camera',
  Trash = 'trash',
  Play = 'play',
  Pause = 'pause',
  Rewind = 'rewind',
  FastForward = 'fastForward',
  Undo = 'undo',
  Redo = 'redo',
  Close = 'close',
  PageCurl = 'pageCurl',
}

/** Context menu item */
export interface IOSContextMenuItem {
  title: string;
  icon?: IOSImageSource;
  destructive?: boolean;
  disabled?: boolean;
  children?: IOSContextMenuItem[];
  onPress?: () => void;
}

/** Toolbar item */
export interface IOSToolbarItem {
  title?: string;
  icon?: IOSImageSource;
  systemItem?: IOSBarButtonSystemItem;
  enabled?: boolean;
  onPress?: () => void;
}

/**
 * IOSSearchBar - iOS native UISearchBar component
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSSearchBarProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSSearchBar = requireNativeComponent<IOSSearchBarProps>('RNIOSSearchBar') ?? new Proxy(
  {},
  {
    get() { throw new Error(LINKING_ERROR); },
  },
);

/**
 * iOS native Search Bar (UISearchBar) component.
 *
 * @example
 * ```tsx
 * <IOSSearchBar
 *   placeholder="Search"
 *   barStyle="minimal"
 *   showsCancelButton
 *   onChangeText={(e) => setSearchText(e.nativeEvent.text)}
 *   onSearchButtonPress={(e) => doSearch(e.nativeEvent.text)}
 * />
 * ```
 */
const IOSSearchBar: React.FC<IOSSearchBarProps> = memo((props) => {
  const {
    onChangeText, onSearchButtonPress, onCancelButtonPress,
    onBookmarkButtonPress, onScopeChange, ...rest
  } = props;
  return (
    <RNIOSSearchBar
      {...rest}
      onChangeText={
        onChangeText ? (e) => onChangeText!(e as Parameters<NonNullable<typeof onChangeText>>[0]) : undefined
      }
      onSearchButtonPress={
        onSearchButtonPress ? (e) => onSearchButtonPress!(e as Parameters<NonNullable<typeof onSearchButtonPress>>[0]) : undefined
      }
      onCancelButtonPress={onCancelButtonPress as any}
      onBookmarkButtonPress={onBookmarkButtonPress as any}
      onScopeChange={
        onScopeChange ? (e) => onScopeChange!(e as Parameters<NonNullable<typeof onScopeChange>>[0]) : undefined
      }
    />
  );
});

IOSSearchBar.displayName = 'IOSSearchBar';
export default IOSSearchBar;

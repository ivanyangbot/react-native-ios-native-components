/**
 * IOSTabBar - iOS native UITabBar component
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSTabBarProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSTabBar = requireNativeComponent<IOSTabBarProps>('RNIOSTabBar') ?? new Proxy(
  {},
  {
    get() { throw new Error(LINKING_ERROR); },
  },
);

/**
 * iOS native Tab Bar (UITabBar) component.
 *
 * @example
 * ```tsx
 * <IOSTabBar
 *   items={[
 *     { title: 'Home', icon: { systemName: 'house' } },
 *     { title: 'Messages', icon: { systemName: 'bubble.left' }, badge: 3 },
 *     { title: 'Profile', icon: { systemName: 'person.circle' } },
 *   ]}
 *   selectedIndex={0}
 *   tintColor="#007AFF"
 *   onTabChange={(e) => navigate(e.nativeEvent.selectedIndex)}
 * />
 * ```
 */
const IOSTabBar: React.FC<IOSTabBarProps> = memo((props) => {
  const { onTabChange, ...rest } = props;
  return (
    <RNIOSTabBar
      {...rest}
      onTabChange={
        onTabChange ? (e) => onTabChange!(e as Parameters<NonNullable<typeof onTabChange>>[0]) : undefined
      }
    />
  );
});

IOSTabBar.displayName = 'IOSTabBar';
export default IOSTabBar;

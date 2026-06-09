/**
 * IOSNavigationBar - iOS native UINavigationBar component
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSNavigationBarProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSNavigationBar = requireNativeComponent<IOSNavigationBarProps>('RNIOSNavigationBar') ?? new Proxy(
  {},
  {
    get() { throw new Error(LINKING_ERROR); },
  },
);

/**
 * iOS native Navigation Bar (UINavigationBar) component.
 *
 * @example
 * ```tsx
 * <IOSNavigationBar
 *   title="Details"
 *   largeTitle="Pet Profile"
 *   prefersLargeTitles
 *   leftItems={[{ systemItem: 'back', onPress: () => goBack() }]}
 *   rightItems={[
 *     { systemItem: 'compose', onPress: () => edit() },
 *     { icon: { systemName: 'ellipsis.circle' }, onPress: () => showMore() },
 *   ]}
 *   barTintColor="#F2F2F7"
 * />
 * ```
 */
const IOSNavigationBar: React.FC<IOSNavigationBarProps> = memo((props) => {
  return <RNIOSNavigationBar {...props} />;
});

IOSNavigationBar.displayName = 'IOSNavigationBar';
export default IOSNavigationBar;

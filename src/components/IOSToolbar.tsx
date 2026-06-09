/**
 * IOSToolbar - iOS native UIToolbar component
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSToolbarProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSToolbar = requireNativeComponent<IOSToolbarProps>('RNIOSToolbar') ?? new Proxy(
  {},
  {
    get() { throw new Error(LINKING_ERROR); },
  },
);

/**
 * iOS native Toolbar (UIToolbar) component.
 *
 * @example
 * ```tsx
 * <IOSToolbar
 *   items={[
 *     { icon: { systemName: 'square.and.arrow.up' }, onPress: () => share() },
 *     { systemItem: 'flexibleSpace' },
 *     { icon: { systemName: 'trash' }, onPress: () => delete() },
 *   ]}
 *   position="bottom"
 *   barTintColor="#F2F2F7"
 * />
 * ```
 */
const IOSToolbar: React.FC<IOSToolbarProps> = memo((props) => {
  return <RNIOSToolbar {...props} />;
});

IOSToolbar.displayName = 'IOSToolbar';
export default IOSToolbar;

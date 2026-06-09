/**
 * IOSBadge - iOS native badge view component
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSBadgeProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSBadge = requireNativeComponent<IOSBadgeProps>('RNIOSBadge') ?? new Proxy(
  {},
  {
    get() { throw new Error(LINKING_ERROR); },
  },
);

/**
 * iOS native Badge component. Renders a red dot or numbered badge.
 *
 * @example
 * ```tsx
 * <IOSBadge text={unreadCount} badgeColor="#FF3B30" />
 * <IOSBadge text="!" hidden={false} />
 * ```
 */
const IOSBadge: React.FC<IOSBadgeProps> = memo((props) => {
  return <RNIOSBadge {...props} />;
});

IOSBadge.displayName = 'IOSBadge';
export default IOSBadge;

/**
 * IOSButton - iOS native UIButton component
 *
 * Renders a native UIKit UIButton with full HIG styling support.
 * Supports system, custom, and SF Symbol icons.
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSButtonProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSButton = requireNativeComponent<IOSButtonProps>('RNIOSButton') ?? new Proxy(
  {},
  {
    get() {
      throw new Error(LINKING_ERROR);
    },
  },
);

/**
 * iOS native Button component.
 * Wraps UIKit UIButton with full style and event support.
 *
 * @example
 * ```tsx
 * <IOSButton title="Confirm" tintColor="#007AFF" onPress={(e) => console.log(e.nativeEvent.timestamp)} />
 * <IOSButton title="Delete" type="destructive" sizeStyle="large" />
 * ```
 */
const IOSButton: React.FC<IOSButtonProps> = memo((props) => {
  const { onPress, ...rest } = props;
  return (
    <RNIOSButton
      {...rest}
      onPress={onPress ? (e: Parameters<NonNullable<typeof onPress>>[0]) => onPress!(e) : undefined}
    />
  );
});

IOSButton.displayName = 'IOSButton';

export default IOSButton;

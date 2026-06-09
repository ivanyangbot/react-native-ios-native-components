/**
 * IOSActivityIndicator - iOS native UIActivityIndicatorView component
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSActivityIndicatorProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSActivityIndicator = requireNativeComponent<IOSActivityIndicatorProps>('RNIOSActivityIndicator') ?? new Proxy(
  {},
  {
    get() { throw new Error(LINKING_ERROR); },
  },
);

/**
 * iOS native Activity Indicator (UIActivityIndicatorView) component.
 *
 * @example
 * ```tsx
 * <IOSActivityIndicator animating color="#007AFF" indicatorStyle="large" />
 * <IOSActivityIndicator animating={isLoading} hidesWhenStopped />
 * ```
 */
const IOSActivityIndicator: React.FC<IOSActivityIndicatorProps> = memo((props) => {
  return <RNIOSActivityIndicator {...props} />;
});

IOSActivityIndicator.displayName = 'IOSActivityIndicator';
export default IOSActivityIndicator;

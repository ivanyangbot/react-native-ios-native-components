/**
 * IOSProgressView - iOS native UIProgressView component
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSProgressViewProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSProgressView = requireNativeComponent<IOSProgressViewProps>('RNIOSProgressView') ?? new Proxy(
  {},
  {
    get() { throw new Error(LINKING_ERROR); },
  },
);

/**
 * iOS native Progress View (UIProgressView) component.
 *
 * @example
 * ```tsx
 * <IOSProgressView progress={0.7} progressTintColor="#34C759" trackTintColor="#E5E5EA" />
 * <IOSProgressView progress={uploadProgress} styleType="bar" animated />
 * ```
 */
const IOSProgressView: React.FC<IOSProgressViewProps> = memo((props) => {
  return <RNIOSProgressView {...props} />;
});

IOSProgressView.displayName = 'IOSProgressView';
export default IOSProgressView;

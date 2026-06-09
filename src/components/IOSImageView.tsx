/**
 * IOSImageView - iOS native UIImageView component
 *
 * Renders a native UIKit UIImageView with full content mode support.
 * Supports URI, SF Symbols, and bundle image sources.
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSImageViewProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSImageView = requireNativeComponent<IOSImageViewProps>('RNIOSImageView') ?? new Proxy(
  {},
  {
    get() {
      throw new Error(LINKING_ERROR);
    },
  },
);

/**
 * iOS native Image View (UIImageView) component.
 * Wraps UIKit UIImageView with full content mode and tint support.
 *
 * @example
 * ```tsx
 * <IOSImageView
 *   source={{ uri: 'https://example.com/image.png' }}
 *   contentMode="scaleAspectFit"
 *   cornerRadius={8}
 *   clipsToBounds={true}
 * />
 * ```
 */
const IOSImageView: React.FC<IOSImageViewProps> = memo((props) => {
  return <RNIOSImageView {...props} />;
});

IOSImageView.displayName = 'IOSImageView';

export default IOSImageView;

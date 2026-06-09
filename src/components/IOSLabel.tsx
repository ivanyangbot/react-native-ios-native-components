/**
 * IOSLabel - iOS native UILabel component
 *
 * Renders a native UIKit UILabel with full HIG styling support.
 * Supports dynamic type, line break modes, and shadow effects.
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSLabelProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSLabel = requireNativeComponent<IOSLabelProps>('RNIOSLabel') ?? new Proxy(
  {},
  {
    get() {
      throw new Error(LINKING_ERROR);
    },
  },
);

/**
 * iOS native Label (UILabel) component.
 * Wraps UIKit UILabel with full style support.
 *
 * @example
 * ```tsx
 * <IOSLabel
 *   text="Hello World"
 *   textColor="#000000"
 *   font={{ size: 17, weight: 'semibold' }}
 *   numberOfLines={2}
 * />
 * ```
 */
const IOSLabel: React.FC<IOSLabelProps> = memo((props) => {
  return <RNIOSLabel {...props} />;
});

IOSLabel.displayName = 'IOSLabel';

export default IOSLabel;

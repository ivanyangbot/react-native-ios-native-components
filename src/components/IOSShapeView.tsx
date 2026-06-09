/**
 * IOSShapeView - iOS native UIView shape container component
 *
 * Renders a native UIView configured as a basic shape (rectangle, rounded rect,
 * circle, or capsule). Supports fill, stroke, and shadow properties.
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSShapeViewProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSShapeView = requireNativeComponent<IOSShapeViewProps>('RNIOSShapeView') ?? new Proxy(
  {},
  {
    get() {
      throw new Error(LINKING_ERROR);
    },
  },
);

/**
 * iOS native Shape View (UIView) component.
 * Renders configurable shapes with fill, stroke, and shadow support.
 *
 * @example
 * ```tsx
 * <IOSShapeView
 *   shape="circle"
 *   fillColor="#34C759"
 *   cornerRadius={24}
 *   shadowColor="#000000"
 *   shadowOpacity={0.15}
 * />
 * ```
 */
const IOSShapeView: React.FC<IOSShapeViewProps> = memo((props) => {
  return <RNIOSShapeView {...props} />;
});

IOSShapeView.displayName = 'IOSShapeView';

export default IOSShapeView;

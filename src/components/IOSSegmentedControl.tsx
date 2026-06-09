/**
 * IOSSegmentedControl - iOS native UISegmentedControl component
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSSegmentedControlProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSSegmentedControl = requireNativeComponent<IOSSegmentedControlProps>('RNIOSSegmentedControl') ?? new Proxy(
  {},
  {
    get() { throw new Error(LINKING_ERROR); },
  },
);

/**
 * iOS native Segmented Control (UISegmentedControl) component.
 *
 * @example
 * ```tsx
 * <IOSSegmentedControl
 *   titles={['Day', 'Week', 'Month']}
 *   selectedIndex={0}
 *   selectedSegmentTintColor="#007AFF"
 *   onValueChange={(e) => setTab(e.nativeEvent.selectedIndex)}
 * />
 * ```
 */
const IOSSegmentedControl: React.FC<IOSSegmentedControlProps> = memo((props) => {
  const { onValueChange, ...rest } = props;
  return (
    <RNIOSSegmentedControl
      {...rest}
      onValueChange={
        onValueChange ? (e) => onValueChange!(e as Parameters<NonNullable<typeof onValueChange>>[0]) : undefined
      }
    />
  );
});

IOSSegmentedControl.displayName = 'IOSSegmentedControl';
export default IOSSegmentedControl;

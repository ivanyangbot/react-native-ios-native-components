/**
 * IOSPicker - iOS native UIPickerView component
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSPickerProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSPicker = requireNativeComponent<IOSPickerProps<string>>('RNIOSPicker') ?? new Proxy(
  {},
  {
    get() { throw new Error(LINKING_ERROR); },
  },
);

/**
 * iOS native Picker (UIPickerView) component.
 *
 * @example
 * ```tsx
 * <IOSPicker
 *   items={[
 *     { label: 'Beijing', value: 'beijing' },
 *     { label: 'Shanghai', value: 'shanghai' },
 *   ]}
 *   selectedIndex={0}
 *   textColor="#333"
 *   onValueChange={(e) => setSelected(e.nativeEvent.selectedValue)}
 * />
 * ```
 */
const IOSPicker: React.FC<IOSPickerProps<string>> = memo((props) => {
  const { onValueChange, ...rest } = props;
  return (
    <RNIOSPicker
      {...rest}
      onValueChange={
        onValueChange ? (e) => onValueChange!(e as Parameters<NonNullable<typeof onValueChange>>[0]) : undefined
      }
    />
  );
});

IOSPicker.displayName = 'IOSPicker';
export default IOSPicker;

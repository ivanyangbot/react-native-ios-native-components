/**
 * IOSDatePicker - iOS native UIDatePicker component
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSDatePickerProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSDatePicker = requireNativeComponent<IOSDatePickerProps>('RNIOSDatePicker') ?? new Proxy(
  {},
  {
    get() { throw new Error(LINKING_ERROR); },
  },
);

/**
 * iOS native Date Picker (UIDatePicker) component.
 * Supports date, time, dateTime, and countDownTimer modes.
 *
 * @example
 * ```tsx
 * <IOSDatePicker mode="date" value={selectedDate} locale="zh_CN"
 *   onDateChange={(e) => setSelectedDate(e.nativeEvent.date)} />
 * <IOSDatePicker mode="time" pickerStyle="wheels" minuteInterval={5} />
 * ```
 */
const IOSDatePicker: React.FC<IOSDatePickerProps> = memo((props) => {
  const { onDateChange, ...rest } = props;
  return (
    <RNIOSDatePicker
      {...rest}
      onDateChange={
        onDateChange ? (e) => onDateChange!(e as Parameters<NonNullable<typeof onDateChange>>[0]) : undefined
      }
    />
  );
});

IOSDatePicker.displayName = 'IOSDatePicker';
export default IOSDatePicker;

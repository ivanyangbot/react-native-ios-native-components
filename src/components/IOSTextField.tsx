/**
 * IOSTextField - iOS native UITextField component
 *
 * Renders a native UIKit UITextField with full HIG styling support.
 * Supports custom fonts, keyboard types, secure text entry, and more.
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSTextFieldProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSTextField = requireNativeComponent<IOSTextFieldProps>('RNIOSTextField') ?? new Proxy(
  {},
  {
    get() {
      throw new Error(LINKING_ERROR);
    },
  },
);

/**
 * iOS native Text Field (UITextField) component.
 * Wraps UIKit UITextField with full style and event support.
 *
 * @example
 * ```tsx
 * <IOSTextField
 *   placeholder="Enter text"
 *   keyboardType="emailAddress"
 *   onChangeText={(e) => console.log(e.nativeEvent.text)}
 * />
 * ```
 */
const IOSTextField: React.FC<IOSTextFieldProps> = memo((props) => {
  const { onChangeText, onSubmitEditing, onFocus, onBlur, ...rest } = props;
  return (
    <RNIOSTextField
      {...rest}
      onChangeText={
        onChangeText
          ? (e: Parameters<NonNullable<typeof onChangeText>>[0]) => onChangeText!(e)
          : undefined
      }
      onSubmitEditing={onSubmitEditing}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
});

IOSTextField.displayName = 'IOSTextField';

export default IOSTextField;

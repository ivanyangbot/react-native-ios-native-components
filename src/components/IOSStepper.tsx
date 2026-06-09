/**
 * IOSStepper - iOS native UIStepper component
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSStepperProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSStepper = requireNativeComponent<IOSStepperProps>('RNIOSStepper') ?? new Proxy(
  {},
  {
    get() { throw new Error(LINKING_ERROR); },
  },
);

/**
 * iOS native Stepper (UIStepper) component.
 *
 * @example
 * ```tsx
 * <IOSStepper value={quantity} minimumValue={0} maximumValue={99} stepValue={1}
 *   onValueChange={(e) => setQuantity(e.nativeEvent.value)} />
 * ```
 */
const IOSStepper: React.FC<IOSStepperProps> = memo((props) => {
  const { onValueChange, ...rest } = props;
  return (
    <RNIOSStepper
      {...rest}
      onValueChange={
        onValueChange ? (e) => onValueChange!(e as Parameters<NonNullable<typeof onValueChange>>[0]) : undefined
      }
    />
  );
});

IOSStepper.displayName = 'IOSStepper';
export default IOSStepper;

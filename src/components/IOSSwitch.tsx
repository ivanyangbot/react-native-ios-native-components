/**
 * IOSSwitch - iOS native UISwitch component
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSSwitchProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSSwitch = requireNativeComponent<IOSSwitchProps>('RNIOSSwitch') ?? new Proxy(
  {},
  {
    get() { throw new Error(LINKING_ERROR); },
  },
);

/**
 * iOS native Switch (UISwitch) component.
 *
 * @example
 * ```tsx
 * <IOSSwitch value={isEnabled} onTintColor="#34C759" onValueChange={(e) => setEnabled(e.nativeEvent.value)} />
 * ```
 */
const IOSSwitch: React.FC<IOSSwitchProps> = memo((props) => {
  const { onValueChange, ...rest } = props;
  return (
    <RNIOSSwitch
      {...rest}
      onValueChange={
        onValueChange ? (e: Parameters<NonNullable<typeof onValueChange>>[0]) => onValueChange!(e) : undefined
      }
    />
  );
});

IOSSwitch.displayName = 'IOSSwitch';
export default IOSSwitch;

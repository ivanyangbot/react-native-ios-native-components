/**
 * IOSColorWell - iOS native UIColorWell component
 *
 * Renders a native UIKit UIColorWell (color picker) component.
 * Supports alpha channel selection and hex color output.
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSColorWellProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSColorWell = requireNativeComponent<IOSColorWellProps>('RNIOSColorWell') ?? new Proxy(
  {},
  {
    get() {
      throw new Error(LINKING_ERROR);
    },
  },
);

/**
 * iOS native Color Well (UIColorWell) component.
 * Wraps UIKit UIColorWell for color selection.
 *
 * @example
 * ```tsx
 * <IOSColorWell
 *   selectedColor="#34C759"
 *   supportsAlpha={true}
 *   onColorChange={(e) => console.log(e.nativeEvent.color)}
 * />
 * ```
 */
const IOSColorWell: React.FC<IOSColorWellProps> = memo((props) => {
  const { onColorChange, ...rest } = props;
  return (
    <RNIOSColorWell
      {...rest}
      onColorChange={
        onColorChange
          ? (e: Parameters<NonNullable<typeof onColorChange>>[0]) => onColorChange!(e)
          : undefined
      }
    />
  );
});

IOSColorWell.displayName = 'IOSColorWell';

export default IOSColorWell;

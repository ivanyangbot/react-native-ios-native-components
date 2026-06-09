/**
 * IOSSlider - iOS native UISlider component
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSSliderProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSSlider = requireNativeComponent<IOSSliderProps>('RNIOSSlider') ?? new Proxy(
  {},
  {
    get() { throw new Error(LINKING_ERROR); },
  },
);

/**
 * iOS native Slider (UISlider) component.
 *
 * @example
 * ```tsx
 * <IOSSlider value={volume} minimumValue={0} maximumValue={100}
 *   onValueChange={(e) => setVolume(e.nativeEvent.value)}
 *   onSlidingComplete={(e) => saveVolume(e.nativeEvent.value)} />
 * ```
 */
const IOSSlider: React.FC<IOSSliderProps> = memo((props) => {
  const { onValueChange, onSlidingComplete, ...rest } = props;
  return (
    <RNIOSSlider
      {...rest}
      onValueChange={
        onValueChange ? (e) => onValueChange!(e as Parameters<NonNullable<typeof onValueChange>>[0]) : undefined
      }
      onSlidingComplete={
        onSlidingComplete ? (e) => onSlidingComplete!(e as Parameters<NonNullable<typeof onSlidingComplete>>[0]) : undefined
      }
    />
  );
});

IOSSlider.displayName = 'IOSSlider';
export default IOSSlider;

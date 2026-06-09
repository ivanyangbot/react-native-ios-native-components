/**
 * IOSPageControl - iOS native UIPageControl component
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSPageControlProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSPageControl = requireNativeComponent<IOSPageControlProps>('RNIOSPageControl') ?? new Proxy(
  {},
  {
    get() { throw new Error(LINKING_ERROR); },
  },
);

/**
 * iOS native Page Control (UIPageControl) component.
 *
 * @example
 * ```tsx
 * <IOSPageControl
 *   numberOfPages={5}
 *   currentPage={2}
 *   pageIndicatorTintColor="#C7C7CC"
 *   currentPageIndicatorTintColor="#007AFF"
 *   onPageChange={(e) => scrollToPage(e.nativeEvent.currentPage)}
 * />
 * ```
 */
const IOSPageControl: React.FC<IOSPageControlProps> = memo((props) => {
  const { onPageChange, ...rest } = props;
  return (
    <RNIOSPageControl
      {...rest}
      onPageChange={
        onPageChange ? (e) => onPageChange!(e as Parameters<NonNullable<typeof onPageChange>>[0]) : undefined
      }
    />
  );
});

IOSPageControl.displayName = 'IOSPageControl';
export default IOSPageControl;

/**
 * IOSScrollView - iOS native UIScrollView component
 *
 * Renders a native UIKit UIScrollView with full scroll behavior support.
 * Supports paging, zooming, bounces, and scroll events.
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSScrollViewProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSScrollView = requireNativeComponent<IOSScrollViewProps>('RNIOSScrollView') ?? new Proxy(
  {},
  {
    get() {
      throw new Error(LINKING_ERROR);
    },
  },
);

/**
 * iOS native Scroll View (UIScrollView) component.
 * Wraps UIKit UIScrollView with full scroll and zoom support.
 *
 * @example
 * ```tsx
 * <IOSScrollView
 *   bounces={true}
 *   pagingEnabled={false}
 *   showsVerticalScrollIndicator={true}
 *   onScrollEndDrag={() => console.log('scroll ended')}
 * />
 * ```
 */
const IOSScrollView: React.FC<IOSScrollViewProps> = memo((props) => {
  const { onScrollBeginDrag, onScrollEndDrag, onMomentumScrollBegin, onMomentumScrollEnd, ...rest } = props;
  return (
    <RNIOSScrollView
      {...rest}
      onScrollBeginDrag={onScrollBeginDrag}
      onScrollEndDrag={onScrollEndDrag}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
    />
  );
});

IOSScrollView.displayName = 'IOSScrollView';

export default IOSScrollView;

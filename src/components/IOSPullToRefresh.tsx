/**
 * IOSPullToRefresh - iOS native UIRefreshControl component
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSPullToRefreshProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSRefreshControl = requireNativeComponent<IOSPullToRefreshProps>('RNIOSRefreshControl') ?? new Proxy(
  {},
  {
    get() { throw new Error(LINKING_ERROR); },
  },
);

/**
 * iOS native Pull-to-Refresh / Refresh Control component.
 *
 * @example
 * ```tsx
 * <IOSPullToRefresh
 *   refreshing={isRefreshing}
 *   tintColor="#007AFF"
 *   title="Pull to Refresh"
 *   onRefresh={() => fetchData()}
 * />
 * ```
 */
const IOSPullToRefresh: React.FC<IOSPullToRefreshProps> = memo((props) => {
  const { onRefresh, ...rest } = props;
  return (
    <RNIOSRefreshControl
      {...rest}
      onRefresh={onRefresh ? () => onRefresh!() : undefined}
    />
  );
});

IOSPullToRefresh.displayName = 'IOSPullToRefresh';
export default IOSPullToRefresh;

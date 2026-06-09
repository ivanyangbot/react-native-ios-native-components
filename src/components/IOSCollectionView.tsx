/**
 * IOSCollectionView - iOS native UICollectionView component
 *
 * Renders a native UIKit UICollectionView for grid/list layout.
 * Supports multi-column layouts, spacing configuration, and item press events.
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSCollectionViewProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSCollectionView = requireNativeComponent<IOSCollectionViewProps>('RNIOSCollectionView') ?? new Proxy(
  {},
  {
    get() {
      throw new Error(LINKING_ERROR);
    },
  },
);

/**
 * iOS native Collection View (UICollectionView) component.
 * Wraps UIKit UICollectionView for grid or list layout rendering.
 *
 * @example
 * ```tsx
 * <IOSCollectionView
 *   items={[{ id: '1', title: 'Item 1' }, { id: '2', title: 'Item 2' }]}
 *   numColumns={2}
 *   itemSpacing={10}
 *   onItemPress={(e) => console.log(e.nativeEvent.index)}
 * />
 * ```
 */
const IOSCollectionView: React.FC<IOSCollectionViewProps> = memo((props) => {
  const { onItemPress, ...rest } = props;
  return (
    <RNIOSCollectionView
      {...rest}
      onItemPress={
        onItemPress
          ? (e: Parameters<NonNullable<typeof onItemPress>>[0]) => onItemPress!(e)
          : undefined
      }
    />
  );
});

IOSCollectionView.displayName = 'IOSCollectionView';

export default IOSCollectionView;

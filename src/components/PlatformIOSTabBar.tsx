/**
 * PlatformIOSTabBar - platform-aware wrapper for the iOS native UITabBar
 */
import React, { memo } from 'react';
import { Platform } from 'react-native';
import type { PlatformIOSTabBarProps } from '../types/components';
import IOSTabBar from './IOSTabBar';

/**
 * Renders the native IOSTabBar on iOS and an optional fallback on other platforms.
 *
 * @example
 * ```tsx
 * <PlatformIOSTabBar
 *   items={items}
 *   selectedIndex={selectedIndex}
 *   onTabChange={(e) => setSelectedIndex(e.nativeEvent.selectedIndex)}
 * />
 * ```
 */
const PlatformIOSTabBar: React.FC<PlatformIOSTabBarProps> = memo((props) => {
  const { fallback = null, ...tabBarProps } = props;

  if (Platform.OS !== 'ios') {
    return <>{fallback}</>;
  }

  return <IOSTabBar {...tabBarProps} />;
});

PlatformIOSTabBar.displayName = 'PlatformIOSTabBar';

export default PlatformIOSTabBar;

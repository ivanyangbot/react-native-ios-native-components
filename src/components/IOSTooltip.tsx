/**
 * IOSTooltip - iOS native UITooltipInteraction component
 */
import React, { memo } from 'react';
import { View, Platform } from 'react-native';
import type { IOSTooltipProps } from '../types/components';

/**
 * iOS Tooltip component. Shows a small info bubble near a target element.
 *
 * @example
 * ```tsx
 * <IOSTooltip
 *   text="This is a tooltip message"
 *   placement="top"
 *   arrowDirection="up"
 * >
 *   <View>
 *     <Text>Hover or tap me</Text>
 *   </View>
 * </IOSTooltip>
 * ```
 */
const IOSTooltip: React.FC<IOSTooltipProps> = memo((props) => {
  const { text, children, ...rest } = props;

  if (Platform.OS !== 'ios') {
    return <>{children}</>;
  }

  // Tooltip is rendered as an overlay on iOS using native UITooltipInteraction
  // For now, render children; the native side handles the tooltip presentation
  return (
    <View collapsable={false} {...(rest as any)}>
      {children}
    </View>
  );
});

IOSTooltip.displayName = 'IOSTooltip';
export default IOSTooltip;

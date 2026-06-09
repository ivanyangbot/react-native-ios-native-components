/**
 * IOSGlassEffect - iOS 26+ Liquid Glass (UIGlassEffectView) component
 *
 * Applies the Liquid Glass material effect to any view content.
 * Requires iOS 26.0+ / Xcode 26+.
 *
 * @example
 * ```tsx
 * <IOSGlassEffect glassStyle="regular" tintColor="#007AFF">
 *   <View style={styles.card}>
 *     <Text>This card has a glass material</Text>
 *   </View>
 * </IOSGlassEffect>
 *
 * // Thin glass for subtle overlay
 * <IOSGlassEffect glassStyle="ultraThin">
 *   <Image source={bgImage} />
 * </IOSGlassEffect>
 * ```
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform, View } from 'react-native';
import type { IOSGlassEffectProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSGlassEffect = requireNativeComponent<IOSGlassEffectProps>('RNIOSGlassEffect') ?? new Proxy(
  {} as Record<string, unknown>,
  {
    get() {
      throw new Error(LINKING_ERROR);
    },
  },
);

/**
 * iOS 26+ Liquid Glass (UIGlassEffectView) component.
 * Wraps any child content in a translucent glass material.
 * Falls back to a semi-transparent View on older iOS versions.
 *
 * Available styles:
 * - "regular" -- Standard glass thickness
 * - "thin" -- Thinner glass, more content visible
 * - "ultraThin" -- Minimal glass, mostly transparent
 * - "regularWithBlur" -- Regular + background blur
 * - "thinWithBlur" -- Thin + background blur
 * - "ultraThinWithBlur" -- Ultra-thin + background blur
 */
const IOSGlassEffect: React.FC<IOSGlassEffectProps> = memo((props) => {
  const { children, ...rest } = props;

  if (Platform.OS !== 'ios') {
    // Fallback: semi-transparent container on non-iOS platforms
    return (
      <View {...(rest as any)} style={[{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, overflow: 'hidden' }, (rest as any).style]}>
        {children}
      </View>
    );
  }

  return (
    <RNIOSGlassEffect {...rest}>
      {children}
    </RNIOSGlassEffect>
  );
});

IOSGlassEffect.displayName = 'IOSGlassEffect';
export default IOSGlassEffect;

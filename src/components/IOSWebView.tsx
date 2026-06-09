/**
 * IOSWebView - iOS native WKWebView component
 *
 * Renders a native WKWebView for displaying web content.
 * Supports URL loading, HTML string rendering, navigation gestures,
 * JavaScript execution, and message handling.
 */
import React, { memo } from 'react';
import { requireNativeComponent, Platform } from 'react-native';
import type { IOSWebViewProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are running the app on a simulator/device (not with React Native web)\n';

const RNIOSWebView = requireNativeComponent<IOSWebViewProps>('RNIOSWebView') ?? new Proxy(
  {},
  {
    get() {
      throw new Error(LINKING_ERROR);
    },
  },
);

/**
 * iOS native Web View (WKWebView) component.
 * Wraps WKWebView for loading and displaying web content.
 *
 * @example
 * ```tsx
 * <IOSWebView
 *   source={{ url: 'https://example.com' }}
 *   javaScriptEnabled={true}
 *   onLoadEnd={() => console.log('loaded')}
 *   onMessage={(e) => console.log(e.nativeEvent.message)}
 * />
 * ```
 */
const IOSWebView: React.FC<IOSWebViewProps> = memo((props) => {
  const { onLoadStart, onLoadEnd, onLoadError, onMessage, ...rest } = props;
  return (
    <RNIOSWebView
      {...rest}
      onLoadStart={onLoadStart}
      onLoadEnd={onLoadEnd}
      onLoadError={
        onLoadError
          ? (e: Parameters<NonNullable<typeof onLoadError>>[0]) => onLoadError!(e)
          : undefined
      }
      onMessage={
        onMessage
          ? (e: Parameters<NonNullable<typeof onMessage>>[0]) => onMessage!(e)
          : undefined
      }
    />
  );
});

IOSWebView.displayName = 'IOSWebView';

export default IOSWebView;

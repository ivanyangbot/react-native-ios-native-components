/**
 * IOSAlert - iOS native UIAlertController (Alert & ActionSheet)
 *
 * Uses NativeModule for imperative presentation.
 */
import { Platform, NativeModules } from 'react-native';
import type { IOSAlertProps } from '../types/components';

const LINKING_ERROR =
  `The package 'rn-ios-native-components' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n';

const { RNIOSAlertModule } = NativeModules as {
  RNIOSAlertModule?: {
    show: (config: Omit<IOSAlertProps, 'onDismiss'>) => Promise<{ actionIndex: number; textFieldValues?: string[] }>;
  };
};

/**
 * Show a native iOS Alert or Action Sheet.
 *
 * @example
 * ```tsx
 * // Simple alert
 * await IOSAlert.show({
 *   title: 'Notice',
 *   message: 'Operation successful',
 *   actions: [{ title: 'OK' }],
 * });
 *
 * // Action sheet
 * const result = await IOSAlert.show({
 *   style: 'actionSheet',
 *   actions: [
 *     { title: 'Camera', icon: { systemName: 'camera' } },
 *     { title: 'Photo Library', icon: { systemName: 'photo.on.rectangle' } },
 *     { title: 'Cancel', style: 'cancel' },
 *   ],
 * });
 *
 * // Alert with text input
 * const result = await IOSAlert.show({
 *   title: 'Enter Name',
 *   textFields: [{ placeholder: 'Please enter', defaultValue: '' }],
 *   actions: [
 *     { title: 'Cancel', style: 'cancel' },
 *     { title: 'Confirm', onPress: () => {} },
 *   ],
 * });
 * ```
 */
export const IOSAlert = {
  async show(config: IOSAlertProps): Promise<{ actionIndex: number; textFieldValues?: string[] }> {
    if (!RNIOSAlertModule) throw new Error(LINKING_ERROR);
    const { onDismiss, ...nativeConfig } = config;
    const result = await RNIOSAlertModule.show(nativeConfig);
    if (onDismiss) onDismiss(result.actionIndex, result.textFieldValues);
    return result;
  },
};

export default IOSAlert;

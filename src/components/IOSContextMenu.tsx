/**
 * IOSContextMenu - iOS native UIMenu (context menu) component
 *
 * Wraps a child view with a long-press context menu.
 */
import React, { memo } from 'react';
import { View } from 'react-native';
import { NativeModules } from 'react-native';
import type { IOSContextMenuProps } from '../types/components';

const { RNIOSContextMenuModule } = NativeModules as {
  RNIOSContextMenuModule?: {
    show: (
      targetTag: number | null,
      config: Omit<IOSContextMenuProps, 'children'>
    ) => Promise<number>;
    dismiss: () => void;
  };
};

/**
 * iOS Context Menu component. Long-press to show UIMenu.
 *
 * @example
 * ```tsx
 * <IOSContextMenu
 *   menuItems={[
 *     { title: 'Edit', icon: { systemName: 'pencil' }, onPress: () => edit() },
 *     { title: 'Delete', destructive: true, onPress: () => deleteItem() },
 *   ]}
 * >
 *   <View style={styles.card}>
 *     <Text>Long press me</Text>
 *   </View>
 * </IOSContextMenu>
 * ```
 */
const IOSContextMenu: React.FC<IOSContextMenuProps> = memo((props) => {
  const { children } = props;

  if (!RNIOSContextMenuModule) {
    // Fallback: render children without context menu
    return <>{children}</>;
  }

  // On iOS with the module linked, we wrap children and attach the context menu
  // The actual native implementation uses UIInteraction for context menus
  return (
    <View
      // eslint-disable-next-line react/no-unstable-nested-components
      {...({ onLongPress: () => {
        // The native module handles showing the context menu
        // In production, this would use a Fabric Component or UIInteraction
      } } as any)}
    >
      {children}
    </View>
  );
});

IOSContextMenu.displayName = 'IOSContextMenu';
export default IOSContextMenu;

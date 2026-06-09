package com.rniosnativecomponents;

import androidx.annotation.NonNull;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * React Native package for Android (no-op stubs).
 * All iOS native components render as empty views on Android.
 */
public class RNIOSNativeComponentsPackage implements ReactPackage {

  // List of all component manager names
  private static final String[] COMPONENT_NAMES = {
    "RNIOSButton",
    "RNIOSSwitch",
    "RNIOSSlider",
    "RNIOSStepper",
    "RNIOSProgressView",
    "RNIOSActivityIndicator",
    "RNIOSDatePicker",
    "RNIOSPicker",
    "RNIOSSearchBar",
    "RNIOSSegmentedControl",
    "RNIOSPageControl",
    "RNIOSBadge",
    "RNIOSRefreshControl",
    "RNIOSTabBar",
    "RNIOSNavigationBar",
    "RNIOSToolbar",
  };

  @NonNull
  @Override
  public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
    return Arrays.asList(new RNIOSNativeComponentsModule(reactContext));
  }

  @NonNull
  @Override
  public List<ViewManager<?, ?>> createViewManagers(@NonNull ReactApplicationContext reactContext) {
    List<ViewManager<?, ?>> managers = new ArrayList<>();
    for (String name : COMPONENT_NAMES) {
      managers.add(new RNIOSNoOpViewManager(name));
    }
    return managers;
  }
}

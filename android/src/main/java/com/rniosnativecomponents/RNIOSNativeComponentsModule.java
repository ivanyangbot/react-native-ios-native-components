package com.rniosnativecomponents;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.HashMap;
import java.util.Map;

/**
 * No-op module for Android.
 * This package is iOS-only; all components render as empty views on Android.
 */
public class RNIOSNativeComponentsModule extends ReactContextBaseJavaModule {

  public RNIOSNativeComponentsModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @NonNull
  @Override
  public String getName() {
    return "RNIOSAlertModule";
  }

  @ReactMethod
  public void show(Map<String, Object> config, Promise promise) {
    // No-op on Android
    Map<String, Object> result = new HashMap<>();
    result.put("actionIndex", -1);
    promise.resolve(result);
  }
}

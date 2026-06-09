package com.rniosnativecomponents;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import android.view.View;

/**
 * No-op view manager for Android.
 * Renders an empty View for each iOS native component on Android platform.
 */
public class RNIOSNoOpViewManager extends SimpleViewManager<View> {

  private final String name;

  public RNIOSNoOpViewManager(String name) {
    this.name = name;
  }

  @NonNull
  @Override
  public String getName() {
    return name;
  }

  @NonNull
  @Override
  protected View createViewInstance(@NonNull ThemedReactContext reactContext) {
    View view = new View(reactContext);
    // Make it invisible but still take up layout space (or use GONE)
    view.setVisibility(View.GONE);
    return view;
  }
}

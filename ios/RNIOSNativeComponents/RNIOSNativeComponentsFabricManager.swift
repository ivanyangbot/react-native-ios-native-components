//
//  RNIOSNativeComponentsFabricManager.swift
//  RNIOSNativeComponents
//
//  Fabric View Manager definitions for all components.
//

import Foundation
import React

// ─── IOSButton ────────────────────────────────────────────────────────────────

@objc(RNIOSButtonViewManager)
class RNIOSButtonViewManager: RCTViewManager<RNIOSButtonView> {
    override static func moduleName() -> String! { "RNIOSButton" }
    
    @objc override func view() -> RNIOSButtonView! { RNIOSButtonView(frame: .zero) }
    
    @objc
    static func requiresMainQueueSetup() -> Bool { true }
}

// ─── IOSSwitch ────────────────────────────────────────────────────────────────

@objc(RNIOSSwitchViewManager)
class RNIOSSwitchViewManager: RCTViewManager<RNIOSSwitchView> {
    override static func moduleName() -> String! { "RNIOSSwitch" }
    
    @objc override func view() -> RNIOSSwitchView! { RNIOSSwitchView(frame: .zero) }
    
    @objc
    static func requiresMainQueueSetup() -> Bool { true }
}

// ─── IOSSlider ────────────────────────────────────────────────────────────────

@objc(RNIOSSliderViewManager)
class RNIOSSliderViewManager: RCTViewManager<RNIOSSliderView> {
    override static func moduleName() -> String! { "RNIOSSlider" }
    
    @objc override func view() -> RNIOSSliderView! { RNIOSSliderView(frame: .zero) }
    
    @objc
    static func requiresMainQueueSetup() -> Bool { true }
}

// ─── IOSStepper ───────────────────────────────────────────────────────────────

@objc(RNIOSStepperViewManager)
class RNIOSStepperViewManager: RCTViewManager<RNIOSStepperView> {
    override static func moduleName() -> String! { "RNIOSStepper" }
    
    @objc override func view() -> RNIOSStepperView! { RNIOSStepperView(frame: .zero) }
    
    @objc
    static func requiresMainQueueSetup() -> Bool { true }
}

// ─── IOSProgressView ──────────────────────────────────────────────────────────

@objc(RNIOSProgressViewViewManager)
class RNIOSProgressViewViewManager: RCTViewManager<RNIOSProgressViewView> {
    override static func moduleName() -> String! { "RNIOSProgressView" }
    
    @objc override func view() -> RNIOSProgressViewView! { RNIOSProgressViewView(frame: .zero) }
    
    @objc
    static func requiresMainQueueSetup() -> Bool { true }
}

// ─── IOSActivityIndicator ────────────────────────────────────────────────────

@objc(RNIOSActivityIndicatorViewManager)
class RNIOSActivityIndicatorViewManager: RCTViewManager<RNIOSActivityIndicatorView> {
    override static func moduleName() -> String! { "RNIOSActivityIndicator" }
    
    @objc override func view() -> RNIOSActivityIndicator! { RNIOSActivityIndicatorView(frame: .zero) }
    
    @objc
    static func requiresMainQueueSetup() -> Bool { true }
}

// ─── IOSDatePicker ────────────────────────────────────────────────────────────

@objc(RNIOSDatePickerViewManager)
class RNIOSDatePickerViewManager: RCTViewManager<RNIOSDatePickerView> {
    override static func moduleName() -> String! { "RNIOSDatePicker" }
    
    @objc override func view() -> RNIOSDatePickerView! { RNIOSDatePickerView(frame: .zero) }
    
    @objc
    static func requiresMainQueueSetup() -> Bool { true }
}

// ─── IOSSegmentedControl ──────────────────────────────────────────────────────

@objc(RNIOSSegmentedControlViewManager)
class RNIOSSegmentedControlViewManager: RCTViewManager<RNIOSSegmentedControlView> {
    override static func moduleName() -> String! { "RNIOSSegmentedControl" }
    
    @objc override func view() -> RNIOSSegmentedControlView! { RNIOSSegmentedControlView(items: []) }
    
    @objc
    static func requiresMainQueueSetup() -> Bool { true }
}

// ─── IOSPageControl ───────────────────────────────────────────────────────────

@objc(RNIOSPageControlViewManager)
class RNIOSPageControlViewManager: RCTViewManager<RNIOSPageControlView> {
    override static func moduleName() -> String! { "RNIOSPageControl" }
    
    @objc override func view() -> RNIOSPageControlView! { RNIOSPageControlView(frame: .zero) }
    
    @objc
    static func requiresMainQueueSetup() -> Bool { true }
}

// ─── IOSRefreshControl ────────────────────────────────────────────────────────

@objc(RNIOSRefreshControlViewManager)
class RNIOSRefreshControlViewManager: RCTViewManager<RNIOSRefreshControlView> {
    override static func moduleName() -> String! { "RNIOSRefreshControl" }
    
    @objc override func view() -> RNIOSRefreshControlView! { RNIOSRefreshControlView() }
    
    @objc
    static func requiresMainQueueSetup() -> Bool { true }
}

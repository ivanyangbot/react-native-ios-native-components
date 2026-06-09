//
//  RNIOSNativeComponentsFabric.swift
//  RNIOSNativeComponents
//
//  New Architecture (Fabric) View Managers for all iOS native components.
//

import Foundation
import UIKit
import React

// ─── Base Fabric Component View ──────────────────────────────────────────────

@objc(RNIOSBaseComponentView)
class RNIOSBaseComponentView: UIView {
    @objc var enabled: Bool = true { didSet { isUserInteractionEnabled = enabled } }
    @objc var disabledOpacity: CGFloat = 0.5
    
    override func didUpdateReactSubviews() {
        super.didUpdateReactSubviews()
        if !enabled { alpha = disabledOpacity }
    }
}

// ─── IOSButton (Fabric) ──────────────────────────────────────────────────────

@objc(RNIOSButtonView)
class RNIOSButtonView: UIButton {
    @objc var title: String? { didSet { setTitle(title, for: .normal) } }
    @objc var tintColor_UIColor: UIColor? { didSet { self.tintColor = tintColor_UIColor ?? .label } }
    @objc var backgroundColor_UIColor: UIColor? { didSet { self.backgroundColor = backgroundColor_UIColor } }
    @objc var selected: Bool = false { didSet { isSelected = selected } }
    @objc var highlighted: Bool = false { didSet { isHighlighted = highlighted } }
    
    @objc var onPress: RCTDirectEventBlock?
    @objc var onPressIn: RCTDirectEventBlock?
    @objc var onPressOut: RCTDirectEventBlock?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        addActions()
    }
    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }
    
    private func addActions() {
        addTarget(self, action: #selector(_handlePress), for: .touchUpInside)
        addTarget(self, action: #selector(_handlePressIn), for: .touchDown)
        addTarget(self, action: #selector(_handlePressOut), for: [.touchUpInside, .touchUpOutside, .touchCancel])
    }
    
    @objc private func _handlePress() {
        onPress?(["timestamp": Date().timeIntervalSince1970])
    }
    @objc private func _handlePressIn() { onPressIn?([:]) }
    @objc private func _handlePressOut() { onPressOut?([:]) }
}

// ─── IOSSwitch (Fabric) ──────────────────────────────────────────────────────

@objc(RNIOSSwitchView)
class RNIOSSwitchView: UISwitch {
    @objc var value: Bool = false { didSet { setOn(value, animated: true) } }
    @objc var onTintColor_UIColor: UIColor? { didSet { self.onTintColor = onTintColor_UIColor } }
    @objc var thumbTintColor_UIColor: UIColor? { didSet { self.thumbTintColor = thumbTintColor_UIColor } }
    
    @objc var onValueChange: RCTDirectEventBlock?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        addTarget(self, action: #selector(_handleChange), for: .valueChanged)
    }
    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }
    
    @objc private func _handleChange() { onValueChange?(["value": isOn]) }
}

// ─── IOSSlider (Fabric) ──────────────────────────────────────────────────────

@objc(RNIOSSliderView)
class RNIOSSliderView: UISlider {
    @objc var value_value: Float = 0.0 { didSet { setValue(value_value, animated: true) } }
    @objc var minimumValue_value: Float = 0.0 { didSet { minimumValue = minimumValue_value } }
    @objc var maximumValue_value: Float = 1.0 { didSet { maximumValue = maximumValue_value } }
    @objc var minimumTrackTintColor_UIColor: UIColor? { didSet { minimumTrackTintColor = minimumTrackTintColor_UIColor } }
    @objc var maximumTrackTintColor_UIColor: UIColor? { didSet { maximumTrackTintColor = maximumTrackTintColor_UIColor } }
    @objc var thumbTintColor_UIColor: UIColor? { didSet { thumbTintColor = thumbTintColor_UIColor } }
    
    @objc var onValueChange: RCTDirectEventBlock?
    @objc var onSlidingComplete: RCTDirectEventBlock?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        addTarget(self, action: #selector(_handleValueChange), for: .valueChanged)
        addTarget(self, action: #selector(_handleSlidingComplete), for: [.touchUpInside, .touchUpOutside])
    }
    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }
    
    @objc private func _handleValueChange() { onValueChange?(["value": value]) }
    @objc private func _handleSlidingComplete() { onSlidingComplete?(["value": value]) }
}

// ─── IOSStepper (Fabric) ─────────────────────────────────────────────────────

@objc(RNIOSStepperView)
class RNIOSStepperView: UIStepper {
    @objc var value_value: Double = 0.0 { didSet { value = value_value } }
    @objc var minimumValue_value: Double = 0.0 { didSet { minimumValue = minimumValue_value } }
    @objc var maximumValue_value: Double = 100.0 { didSet { maximumValue = maximumValue_value } }
    @objc var stepValue_value: Double = 1.0 { didSet { stepValue = stepValue_value } }
    @objc var wraps: Bool = false { didSet { self.wraps = wraps } }
    @objc var tintColor_UIColor: UIColor? { didSet { self.tintColor = tintColor_UIColor } }
    @objc var backgroundColor_UIColor: UIColor? { didSet { self.backgroundColor = backgroundColor_UIColor } }
    
    @objc var onValueChange: RCTDirectEventBlock?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        addTarget(self, action: #selector(_handleChange), for: .valueChanged)
    }
    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }
    
    @objc private func _handleChange() { onValueChange?(["value": value]) }
}

// ─── IOSProgressView (Fabric) ────────────────────────────────────────────────

@objc(RNIOSProgressViewView)
class RNIOSProgressViewView: UIProgressView {
    @objc var progress_value: Float = 0.0 { didSet { setProgress(progress_value, animated: true) } }
    @objc var progressTintColor_UIColor: UIColor? { didSet { progressTintColor = progressTintColor_UIColor } }
    @objc var trackTintColor_UIColor: UIColor? { didSet { trackTintColor = trackTintColor_UIColor } }
    
    override init(frame: CGRect) {
        super.init(progressViewStyle: .default)
    }
    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }
}

// ─── IOSActivityIndicator (Fabric) ───────────────────────────────────────────

@objc(RNIOSActivityIndicatorView)
class RNIOSActivityIndicatorView: UIActivityIndicatorView {
    @objc var animating: Bool = false {
        didSet {
            if animating { startAnimating() } else { stopAnimating() }
        }
    }
    @objc var indicatorStyle_style: UIActivityIndicatorView.Style = .medium {
        didSet {
            if #available(iOS 13.0, *) { style = indicatorStyle_style }
        }
    }
    @objc var hidesWhenStopped: Bool = true { didSet { self.hidesWhenStopped = hidesWhenStopped } }
    @objc var color_UIColor: UIColor? { didSet { self.color = color_UIColor } }
    
    override init(frame: CGRect) {
        super.init(style: .medium)
    }
    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }
}

// ─── IOSDatePicker (Fabric) ──────────────────────────────────────────────────

@objc(RNIOSDatePickerView)
class RNIOSDatePickerView: UIDatePicker {
    @objc var mode_string: String = "date" {
        didSet {
            switch mode_string {
            case "time": datePickerMode = .time
            case "dateTime", "dateAndTime": datePickerMode = .dateAndTime
            case "countDownTimer": datePickerMode = .countDownTimer
            default: datePickerMode = .date
            }
        }
    }
    @objc var pickerStyle_string: String = "automatic" {
        didSet {
            if #available(iOS 13.4, *) {
                switch pickerStyle_string {
                case "wheels": preferredDatePickerStyle = .wheels
                case "compact": preferredDatePickerStyle = .compact
                case "inline": preferredDatePickerStyle = .inline
                default: preferredDatePickerStyle = .automatic
                }
            }
        }
    }
    @objc var locale_string: String? { didSet { locale = Locale(identifier: locale_string ?? "current") } }
    @objc var timeZone_string: String? { didSet { timeZone = TimeZone(identifier: timeZone_string ?? "local") } }
    @objc var countDownDuration_value: TimeInterval = 0 { didSet { self.countDownDuration = countDownDuration_value } }
    
    @objc var onDateChange: RCTDirectEventBlock?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        addTarget(self, action: #selector(_handleDateChange), for: .valueChanged)
    }
    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }
    
    @objc private func _handleDateChange() {
        let fmt = DateFormatter()
        fmt.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
        onDateChange?(["date": fmt.string(from: date), "timestamp": date.timeIntervalSince1970])
    }
}

// ─── IOSSegmentedControl (Fabric) ────────────────────────────────────────────

@objc(RNIOSSegmentedControlView)
class RNIOSSegmentedControlView: UISegmentedControl {
    @objc var titles_array: [String] = [] {
        didSet {
            removeAllSegments()
            for (i, t) in titles_array.enumerated() {
                insertSegment(withTitle: t, at: i, animated: false)
            }
        }
    }
    @objc var selectedIndex_value: Int = -1 { didSet { selectedSegmentIndex = selectedIndex_value } }
    @objc var selectedSegmentTintColor_UIColor: UIColor? {
        didSet { if #available(iOS 13.0, *) { selectedSegmentTintColor = selectedSegmentTintColor_UIColor } }
    }
    @objc var isMomentary: Bool = false { didSet { self.isMomentary = isMomentary } }
    
    @objc var onValueChange: RCTDirectEventBlock?
    
    override init(items: [String]?) {
        super.init(items: items ?? [])
        addTarget(self, action: #selector(_handleChange), for: .valueChanged)
    }
    override init(frame: CGRect) {
        super.init(frame: frame)
        addTarget(self, action: #selector(_handleChange), for: .valueChanged)
    }
    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }
    
    @objc private func _handleChange() {
        let title = selectedSegmentIndex >= 0 && selectedSegmentIndex < numberOfSegments
            ? titleForSegment(at: selectedSegmentIndex) ?? ""
            : ""
        onValueChange?(["selectedIndex": selectedSegmentIndex, "title": title])
    }
}

// ─── IOSPageControl (Fabric) ─────────────────────────────────────────────────

@objc(RNIOSPageControlView)
class RNIOSPageControlView: UIPageControl {
    @objc var numberOfPages_value: Int = 0 { didSet { self.numberOfPages = numberOfPages_value } }
    @objc var currentPage_value: Int = 0 { didSet { currentPage = currentPage_value } }
    @objc var hidesForSinglePage: Bool = false { didSet { self.hidesForSinglePage = hidesForSinglePage } }
    @objc var pageIndicatorTintColor_UIColor: UIColor? { didSet { pageIndicatorTintColor = pageIndicatorTintColor_UIColor } }
    @objc var currentPageIndicatorTintColor_UIColor: UIColor? { didSet { currentPageIndicatorTintColor = currentPageIndicatorTintColor_UIColor } }
    
    @objc var onPageChange: RCTDirectEventBlock?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        addTarget(self, action: #selector(_handlePageChange), for: .valueChanged)
    }
    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }
    
    @objc private func _handlePageChange() { onPageChange?(["currentPage": currentPage]) }
}

// ─── IOSRefreshControl (Fabric) ──────────────────────────────────────────────

@objc(RNIOSRefreshControlView)
class RNIOSRefreshControlView: UIRefreshControl {
    @objc var refreshing: Bool = false {
        didSet {
            if refreshing { beginRefreshing() } else { endRefreshing() }
        }
    }
    @objc var tintColor_UIColor: UIColor? { didSet { self.tintColor = tintColor_UIColor } }
    
    @objc var onRefresh: RCTDirectEventBlock?
    
    override init() {
        super.init()
        addTarget(self, action: #selector(_handleRefresh), for: .valueChanged)
    }
    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }
    
    @objc private func _handleRefresh() { onRefresh?([:]) }
}

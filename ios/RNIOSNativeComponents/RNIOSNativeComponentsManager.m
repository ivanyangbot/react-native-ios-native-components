/**
 * RNIOSNativeComponents - Legacy Architecture View Managers
 *
 * RCTViewManager subclasses for each iOS native component.
 */

#import <UIKit/UIKit.h>
#import <React/RCTViewManager.h>
#import <React/RCTConvert.h>
#import "RNIOSNativeComponentsViews.h"

NS_ASSUME_NONNULL_BEGIN

#pragma mark - RCTConvert Extensions

@interface RCTConvert (RNIOSComponents)
+ (UIButtonType)buttonType:(id)json;
+ (UIDatePickerMode)datePickerMode:(id)json;
+ (UIDatePickerStyle)datePickerStyle:(id)json;
+ (UIActivityIndicatorViewStyle)activityIndicatorStyle:(id)json;
+ (UIProgressViewStyle)progressViewStyle:(id)json;
+ (UISearchBarStyle)searchBarStyle:(id)json);
+ (UISegmentedControlStyle)segmentedControlStyle:(id)json;
+ (UIPageControlBackgroundStyle)pageControlBackgroundStyle:(id)json;
@end

@implementation RCTConvert (RNIOSComponents)

+ (UIButtonType)buttonType:(id)json {
  if (!json || ![json isKindOfClass:[NSString class]]) return UIButtonTypeSystem;
  NSString *s = (NSString *)json;
  if ([s isEqualToString:@"custom"]) return UIButtonTypeCustom;
  if ([s isEqualToString:@"detailDisclosure"]) return UIButtonTypeInfoLight; // mapped
  if ([s isEqualToString:@"infoLight"]) return UIButtonTypeInfoLight;
  if ([s isEqualToString:@"infoDark"]) return UIButtonTypeInfoDark;
  if ([s isEqualToString:@"contactAdd"]) return UIButtonTypeContactAdd;
  return UIButtonTypeSystem;
}

+ (UIDatePickerMode)datePickerMode:(id)json {
  if (!json || ![json isKindOfClass:[NSString class]]) return UIDatePickerModeDate;
  NSString *s = (NSString *)json;
  if ([s isEqualToString:@"time"]) return UIDatePickerModeTime;
  if ([s isEqualToString:@"dateTime"]) return UIDatePickerModeDateAndTime;
  if ([s isEqualToString:@"countDownTimer"]) return UIDatePickerModeCountDownTimer;
  return UIDatePickerModeDate;
}

+ (UIDatePickerStyle)datePickerStyle:(id)json {
  if (!json || ![json isKindOfClass:[NSString class]]) return UIDatePickerStyleAutomatic;
  NSString *s = (NSString *)json;
  if ([s isEqualToString:@"wheels"]) return UIDatePickerStyleWheels;
  if ([s isEqualToString:@"compact"]) return UIDatePickerStyleCompact;
  if ([s isEqualToString:@"inline"]) return UIDatePickerStyleInline;
  return UIDatePickerStyleAutomatic;
}

+ (UIActivityIndicatorViewStyle)activityIndicatorStyle:(id)json {
  if (!json || ![json isKindOfClass:[NSString class]]) return UIActivityIndicatorViewStyleMedium;
  NSString *s = (NSString *)json;
  if ([s isEqualToString:@"large"]) return UIActivityIndicatorViewStyleLarge;
  return UIActivityIndicatorViewStyleMedium;
}

+ (UIProgressViewStyle)progressViewStyle:(id)json {
  if (!json || ![json isKindOfClass:[NSString class]]) return UIProgressViewStyleDefault;
  NSString *s = (NSString *)json;
  if ([s isEqualToString:@"bar"]) return UIProgressViewStyleBar;
  return UIProgressViewStyleDefault;
}

+ (UISearchBarStyle)searchBarStyle:(id)json {
  if (!json || ![json isKindOfClass:[NSString class]]) return UISearchBarStyleDefault;
  NSString *s = (NSString *)json;
  if ([s isEqualToString:@"prominent"]) return UISearchBarStyleProminent;
  if ([s isEqualToString:@"minimal"]) return UISearchBarStyleMinimal;
  return UISearchBarStyleDefault;
}

+ (UISegmentedControlStyle)segmentedControlStyle:(id)json {
  if (!json || ![json isKindOfClass:[NSString class]]) return UISegmentedControlStyleAutomatic;
  NSString *s = (NSString *)json;
  if ([s isEqualToString:@"plain"]) return UISegmentedControlStylePlain;
  if ([s isEqualToString:@"bordered"]) return UISegmentedControlStyleBordered;
  return UISegmentedControlStyleAutomatic;
}

+ (UIPageControlBackgroundStyle)pageControlBackgroundStyle:(id)json {
  if (!json || ![json isKindOfClass:[NSString class]]) return UIPageControlBackgroundStyleAutomatic;
  NSString *s = (NSString *)json;
  if ([s isEqualToString:@"prominent"]) return UIPageControlBackgroundStyleProminent;
  if ([s isEqualToString:@"minimal"]) return UIPageControlBackgroundStyleMinimal;
  return UIPageControlBackgroundStyleAutomatic;
}

@end

#pragma mark - IOSButton Manager

@interface RNIOSButtonManager : RCTViewManager
@end

@implementation RNIOSButtonManager

RCT_EXPORT_MODULE(RNIOSButton)

- (UIView *)view {
  RNIOSButton *btn = [RNIOSButton buttonWithType:UIButtonTypeSystem];
  return btn;
}

RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPressIn, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPressOut, RCTBubblingEventBlock)
RCT_CUSTOM_VIEW_PROPERTY(title, NSString, RNIOSButton) {
  [view setTitle:json forState:UIControlStateNormal];
}
RCT_CUSTOM_VIEW_PROPERTY(type, UIButtonType, RNIOSButton) {
  // Type is set at creation time; this is a no-op for re-assignment
}
RCT_CUSTOM_VIEW_PROPERTY(tintColor, UIColor, RNIOSButton) {
  view.tintColor = json ? [RCTConvert UIColor:json] : defaultView.tintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(backgroundColor, UIColor, RNIOSButton) {
  view.backgroundColor = json ? [RCTConvert UIColor:json] : defaultView.backgroundColor;
}
RCT_CUSTOM_VIEW_PROPERTY(selected, BOOL, RNIOSButton) {
  view.selected = json ? [RCTConvert BOOL:json] : defaultView.selected;
}
RCT_CUSTOM_VIEW_PROPERTY(highlighted, BOOL, RNIOSButton) {
  view.highlighted = json ? [RCTConvert BOOL:json] : defaultView.highlighted;
}

@end

#pragma mark - IOSSwitch Manager

@interface RNIOSSwitchManager : RCTViewManager
@end

@implementation RNIOSSwitchManager

RCT_EXPORT_MODULE(RNIOSSwitch)

- (UIView *)view {
  RNIOSSwitch *sw = [[RNIOSSwitch alloc] init];
  [sw addTarget:sw action:@selector(_handleValueChange) forControlEvents:UIControlEventValueChanged];
  return sw;
}

RCT_EXPORT_VIEW_PROPERTY(onValueChange, RCTBubblingEventBlock)
RCT_CUSTOM_VIEW_PROPERTY(value, BOOL, RNIOSSwitch) {
  [view setOn:json ? [RCTConvert BOOL:json] : defaultView.isOn animated:YES];
}
RCT_CUSTOM_VIEW_PROPERTY(onTintColor, UIColor, RNIOSSwitch) {
  view.onTintColor = json ? [RCTConvert UIColor:json] : defaultView.onTintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(thumbTintColor, UIColor, RNIOSSwitch) {
  view.thumbTintColor = json ? [RCTConvert UIColor:json] : defaultView.thumbTintColor;
}

@end

#pragma mark - IOSSlider Manager

@interface RNIOSSliderManager : RCTViewManager
@end

@implementation RNIOSSliderManager

RCT_EXPORT_MODULE(RNIOSSlider)

- (UIView *)view {
  RNIOSSlider *slider = [[RNIOSSlider alloc] init];
  [slider addTarget:slider action:@selector(_handleValueChange) forControlEvents:UIControlEventValueChanged];
  [slider addTarget:slider action:@selector(_handleSlidingComplete) forControlEvents:UIControlEventTouchUpInside | UIControlEventTouchUpOutside];
  return slider;
}

RCT_EXPORT_VIEW_PROPERTY(onValueChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSlidingComplete, RCTBubblingEventBlock)
RCT_CUSTOM_VIEW_PROPERTY(value, CGFloat, RNIOSSlider) {
  slider.value = json ? [RCTConvert CGFloat:json] : defaultView.value;
}
RCT_CUSTOM_VIEW_PROPERTY(minimumValue, CGFloat, RNIOSSlider) {
  slider.minimumValue = json ? [RCTConvert CGFloat:json] : defaultView.minimumValue;
}
RCT_CUSTOM_VIEW_PROPERTY(maximumValue, CGFloat, RNIOSSlider) {
  slider.maximumValue = json ? [RCTConvert CGFloat:json] : defaultView.maximumValue;
}
RCT_CUSTOM_VIEW_PROPERTY(minimumTrackTintColor, UIColor, RNIOSSlider) {
  slider.minimumTrackTintColor = json ? [RCTConvert UIColor:json] : defaultView.minimumTrackTintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(maximumTrackTintColor, UIColor, RNIOSSlider) {
  slider.maximumTrackTintColor = json ? [RCTConvert UIColor:json] : defaultView.maximumTrackTintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(thumbTintColor, UIColor, RNIOSSlider) {
  slider.thumbTintColor = json ? [RCTConvert UIColor:json] : defaultView.thumbTintColor;
}

@end

#pragma mark - IOSStepper Manager

@interface RNIOSStepperManager : RCTViewManager
@end

@implementation RNIOSStepperManager

RCT_EXPORT_MODULE(RNIOSStepper)

- (UIView *)view {
  RNIOSStepper *stepper = [[RNIOSStepper alloc] init];
  [stepper addTarget:stepper action:@selector(_handleValueChange) forControlEvents:UIControlEventValueChanged];
  return stepper;
}

RCT_EXPORT_VIEW_PROPERTY(onValueChange, RCTBubblingEventBlock)
RCT_CUSTOM_VIEW_PROPERTY(value, double, RNIOSStepper) {
  stepper.value = json ? [RCTConvert double:json] : defaultView.value;
}
RCT_CUSTOM_VIEW_PROPERTY(minimumValue, double, RNIOSStepper) {
  stepper.minimumValue = json ? [RCTConvert double:json] : defaultView.minimumValue;
}
RCT_CUSTOM_VIEW_PROPERTY(maximumValue, double, RNIOSStepper) {
  stepper.maximumValue = json ? [RCTConvert double:json] : defaultView.maximumValue;
}
RCT_CUSTOM_VIEW_PROPERTY(stepValue, double, RNIOSStepper) {
  stepper.stepValue = json ? [RCTConvert double:json] : defaultView.stepValue;
}
RCT_CUSTOM_VIEW_PROPERTY(wraps, BOOL, RNIOSStepper) {
  stepper.wraps = json ? [RCTConvert BOOL:json] : defaultView.wraps;
}
RCT_CUSTOM_VIEW_PROPERTY(tintColor, UIColor, RNIOSStepper) {
  stepper.tintColor = json ? [RCTConvert UIColor:json] : defaultView.tintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(backgroundColor, UIColor, RNIOSStepper) {
  stepper.backgroundColor = json ? [RCTConvert UIColor:json] : defaultView.backgroundColor;
}

@end

#pragma mark - IOSProgressView Manager

@interface RNIOSProgressViewManager : RCTViewManager
@end

@implementation RNIOSProgressViewManager

RCT_EXPORT_MODULE(RNIOSProgressView)

- (UIView *)view {
  return [[RNIOSProgressView alloc] initWithProgressViewStyle:UIProgressViewStyleDefault];
}

RCT_CUSTOM_VIEW_PROPERTY(progress, float, RNIOSProgressView) {
  float progress = json ? [RCTConvert float:json] : 0.0f;
  view.progress = progress;
}
RCT_CUSTOM_VIEW_PROPERTY(progressTintColor, UIColor, RNIOSProgressView) {
  view.progressTintColor = json ? [RCTConvert UIColor:json] : defaultView.progressTintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(trackTintColor, UIColor, RNIOSProgressView) {
  view.trackTintColor = json ? [RCTConvert UIColor:json] : defaultView.trackTintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(styleType, UIProgressViewStyle, RNIOSProgressView) {
  // Style is set at init time
}

@end

#pragma mark - IOSActivityIndicator Manager

@interface RNIOSActivityIndicatorManager : RCTViewManager
@end

@implementation RNIOSActivityIndicatorManager

RCT_EXPORT_MODULE(RNIOSActivityIndicator)

- (UIView *)view {
  return [[RNIOSActivityIndicator alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleMedium];
}

RCT_CUSTOM_VIEW_PROPERTY(animating, BOOL, RNIOSActivityIndicator) {
  if (json && [RCTConvert BOOL:json]) { [view startAnimating]; }
  else { [view stopAnimating]; }
}
RCT_CUSTOM_VIEW_PROPERTY(indicatorStyle, UIActivityIndicatorViewStyle, RNIOSActivityIndicator) {
  if (@available(iOS 13.0, *)) {
    view.activityIndicatorViewStyle = json ? [RCTConvert activityIndicatorStyle:json] : defaultView.activityIndicatorViewStyle;
  }
}
RCT_CUSTOM_VIEW_PROPERTY(hidesWhenStopped, BOOL, RNIOSActivityIndicator) {
  view.hidesWhenStopped = json ? [RCTConvert BOOL:json] : defaultView.hidesWhenStopped;
}
RCT_CUSTOM_VIEW_PROPERTY(color, UIColor, RNIOSActivityIndicator) {
  view.color = json ? [RCTConvert UIColor:json] : defaultView.color;
}

@end

#pragma mark - IOSDatePicker Manager

@interface RNIOSDatePickerManager : RCTViewManager
@end

@implementation RNIOSDatePickerManager

RCT_EXPORT_MODULE(RNIOSDatePicker)

- (UIView *)view {
  RNIOSDatePicker *picker = [[RNIOSDatePicker alloc] init];
  [picker addTarget:picker action:@selector(_handleDateChange) forControlEvents:UIControlEventValueChanged];
  return picker;
}

RCT_EXPORT_VIEW_PROPERTY(onDateChange, RCTBubblingEventBlock)
RCT_CUSTOM_VIEW_PROPERTY(mode, UIDatePickerMode, RNIOSDatePicker) {
  picker.datePickerMode = json ? [RCTConvert datePickerMode:json] : defaultView.datePickerMode;
}
RCT_CUSTOM_VIEW_PROPERTY(pickerStyle, UIDatePickerStyle, RNIOSDatePicker) {
  if (@available(iOS 13.4, *)) {
    picker.preferredDatePickerStyle = json ? [RCTConvert datePickerStyle:json] : defaultView.preferredDatePickerStyle;
  }
}
RCT_CUSTOM_VIEW_PROPERTY(minimumDate, NSDate, RNIOSDatePicker) {
  if (json) picker.minimumDate = [RCTConvert NSDate:json];
}
RCT_CUSTOM_VIEW_PROPERTY(maximumDate, NSDate, RNIOSDatePicker) {
  if (json) picker.maximumDate = [RCTConvert NSDate:json];
}
RCT_CUSTOM_VIEW_PROPERTY(locale, NSLocale, RNIOSDatePicker) {
  if (json) picker.locale = [NSLocale localeWithLocaleIdentifier:json];
}
RCT_CUSTOM_VIEW_PROPERTY(timeZone, NSTimeZone, RNIOSDatePicker) {
  if (json) picker.timeZone = [NSTimeZone timeZoneWithName:json];
}
RCT_CUSTOM_VIEW_PROPERTY(countDownDuration, NSTimeInterval, RNIOSDatePicker) {
  picker.countDownDuration = json ? [RCTConvert NSTimeInterval:json] : defaultView.countDownDuration;
}

@end

#pragma mark - IOSPicker Manager

@interface RNIOSPickerManager : RCTViewManager
@end

@implementation RNIOSPickerManager

RCT_EXPORT_MODULE(RNIOSPicker)

- (UIView *)view {
  RNIOSPickerView *pv = [[RNIOSPickerView alloc] init];
  pv.dataSource = pv;
  pv.delegate = pv;
  return pv;
}

RCT_EXPORT_VIEW_PROPERTY(onValueChange, RCTBubblingEventBlock)
RCT_CUSTOM_VIEW_PROPERTY(items, NSArray, RNIOSPickerView) {
  pickerView.items = json ?: @[];
  [pickerView reloadAllComponents];
}
RCT_CUSTOM_VIEW_PROPERTY(selectedIndex, NSInteger, RNIOSPickerView) {
  NSInteger idx = json ? [RCTConvert NSInteger:json] : 0;
  if (idx >= 0 && idx < (NSInteger)pickerView.items.count) {
    [pickerView selectRow:idx inComponent:0 animated:YES];
    pickerView.selectedIndex = idx;
  }
}
RCT_CUSTOM_VIEW_PROPERTY(textColor, UIColor, RNIOSPickerView) {
  if (@available(iOS 13.0, *)) {
    pickerView.tintColor = json ? [RCTConvert UIColor:json] : defaultView.tintColor;
  }
}

@end

#pragma mark - IOSSearchBar Manager

@interface RNIOSSearchBarManager : RCTViewManager
@end

@implementation RNIOSSearchBarManager

RCT_EXPORT_MODULE(RNIOSSearchBar)

- (UIView *)view {
  return [[RNIOSSearchBar alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(onText, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSearchButtonPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCancelButtonPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onBookmarkButtonPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onScopeChange, RCTBubblingEventBlock)
RCT_CUSTOM_VIEW_PROPERTY(text, NSString, RNIOSSearchBar) {
  searchBar.text = json ?: @"";
}
RCT_CUSTOM_VIEW_PROPERTY(placeholder, NSString, RNIOSSearchBar) {
  searchBar.placeholder = json;
}
RCT_CUSTOM_VIEW_PROPERTY(barStyle, UISearchBarStyle, RNIOSSearchBar) {
  searchBar.searchBarStyle = json ? [RCTConvert searchBarStyle:json] : defaultView.searchBarStyle;
}
RCT_CUSTOM_VIEW_PROPERTY(showsCancelButton, BOOL, RNIOSSearchBar) {
  searchBar.showsCancelButton = json ? [RCTConvert BOOL:json] : defaultView.showsCancelButton;
}
RCT_CUSTOM_VIEW_PROPERTY(showsBookmarkButton, BOOL, RNIOSSearchBar) {
  searchBar.showsBookmarkButton = json ? [RCTConvert BOOL:json] : defaultView.showsBookmarkButton;
}
RCT_CUSTOM_VIEW_PROPERTY(barTintColor, UIColor, RNIOSSearchBar) {
  searchBar.barTintColor = json ? [RCTConvert UIColor:json] : defaultView.barTintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(tintColor, UIColor, RNIOSSearchBar) {
  searchBar.tintColor = json ? [RCTConvert UIColor:json] : defaultView.tintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(scopeButtonTitles, NSArray<NSString *>, RNIOSSearchBar) {
  searchBar.scopeButtonTitles = json;
}
RCT_CUSTOM_VIEW_PROPERTY(selectedScopeButtonIndex, NSInteger, RNIOSSearchBar) {
  searchBar.selectedScopeButtonIndex = json ? [RCTConvert NSInteger:json] : 0;
}

@end

#pragma mark - IOSSegmentedControl Manager

@interface RNIOSSegmentedControlManager : RCTViewManager
@end

@implementation RNIOSSegmentedControlManager

RCT_EXPORT_MODULE(RNIOSSegmentedControl)

- (UIView *)view {
  RNIOSSegmentedControl *sc = [[RNIOSSegmentedControl alloc] initWithItems:@[]];
  [sc addTarget:sc action:@selector(_handleValueChange) forControlEvents:UIControlEventValueChanged];
  return sc;
}

RCT_EXPORT_VIEW_PROPERTY(onValueChange, RCTBubblingEventBlock)
RCT_CUSTOM_VIEW_PROPERTY(titles, NSArray<NSString *>, RNIOSSegmentedControl) {
  // Rebuild segments
  while (segmentedControl.numberOfSegments > 0) {
    [segmentedControl removeSegmentAtIndex:0 animated:NO];
  }
  for (NSString *title in (NSArray<NSString *> *)(json ?: @[])) {
    [segmentedControl insertSegmentWithTitle:title atIndex:segmentedControl.numberOfSegments animated:NO];
  }
}
RCT_CUSTOM_VIEW_PROPERTY(selectedIndex, NSInteger, RNIOSSegmentedControl) {
  segmentedControl.selectedSegmentIndex = json ? [RCTConvert NSInteger:json] : -1;
}
RCT_CUSTOM_VIEW_PROPERTY(selectedSegmentTintColor, UIColor, RNIOSSegmentedControl) {
  if (@available(iOS 13.0, *)) {
    segmentedControl.selectedSegmentTintColor = json ? [RCTConvert UIColor:json] : defaultView.selectedSegmentTintColor;
  }
}
RCT_CUSTOM_VIEW_PROPERTY(isMomentary, BOOL, RNIOSSegmentedControl) {
  segmentedControl.isMomentary = json ? [RCTConvert BOOL:json] : defaultView.isMomentary;
}

@end

#pragma mark - IOSPageControl Manager

@interface RNIOSPageControlManager : RCTViewManager
@end

@implementation RNIOSPageControlManager

RCT_EXPORT_MODULE(RNIOSPageControl)

- (UIView *)view {
  RNIOSPageControl *pc = [[RNIOSPageControl alloc] init];
  [pc addTarget:pc action:@selector(_handlePageChange) forControlEvents:UIControlEventValueChanged];
  return pc;
}

RCT_EXPORT_VIEW_PROPERTY(onPageChange, RCTBubblingEventBlock)
RCT_CUSTOM_VIEW_PROPERTY(numberOfPages, NSInteger, RNIOSPageControl) {
  pageControl.numberOfPages = json ? [RCTConvert NSInteger:json] : 0;
}
RCT_CUSTOM_VIEW_PROPERTY(currentPage, NSInteger, RNIOSPageControl) {
  pageControl.currentPage = json ? [RCTConvert NSInteger:json] : 0;
}
RCT_CUSTOM_VIEW_PROPERTY(hidesForSinglePage, BOOL, RNIOSPageControl) {
  pageControl.hidesForSinglePage = json ? [RCTConvert BOOL:json] : defaultView.hidesForSinglePage;
}
RCT_CUSTOM_VIEW_PROPERTY(pageIndicatorTintColor, UIColor, RNIOSPageControl) {
  pageControl.pageIndicatorTintColor = json ? [RCTConvert UIColor:json] : defaultView.pageIndicatorTintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(currentPageIndicatorTintColor, UIColor, RNIOSPageControl) {
  pageControl.currentPageIndicatorTintColor = json ? [RCTConvert UIColor:json] : defaultView.currentPageIndicatorTintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(showsPageIndicator, BOOL, RNIOSPageControl) {
  if (@available(iOS 14.0, *)) {
    pageControl.showsPageIndicator = json ? [RCTConvert BOOL:json] : defaultView.showsPageIndicator;
  }
}

@end

#pragma mark - IOSBadge Manager

@interface RNIOSBadgeManager : RCTViewManager
@end

@implementation RNIOSBadgeManager

RCT_EXPORT_MODULE(RNIOSBadge)

- (UIView *)view {
  return [[RNIOSBadgeView alloc] init];
}

RCT_CUSTOM_VIEW_PROPERTY(text, id, RNIOSBadgeView) {
  badgeView.badgeLabel.text = json != nil ? [RCTConvert NSString:json] : nil;
  badgeView.hidden = (json == nil || [@"" isEqual:[RCTConvert NSString:json]]);
  [badgeView setNeedsLayout];
}
RCT_CUSTOM_VIEW_PROPERTY(badgeColor, UIColor, RNIOSBadgeView) {
  badgeView.badgeLabel.backgroundColor = json ? [RCTConvert UIColor:json] : defaultView.badgeLabel.backgroundColor;
}
RCT_CUSTOM_VIEW_PROPERTY(textColor, UIColor, RNIOSBadgeView) {
  badgeView.badgeLabel.textColor = json ? [RCTConvert UIColor:json] : defaultView.badgeLabel.textColor;
}
RCT_CUSTOM_VIEW_PROPERTY(hidden, BOOL, RNIOSBadgeView) {
  badgeView.hidden = json ? [RCTConvert BOOL:json] : defaultView.hidden;
}

@end

#pragma mark - IOSPullToRefresh / RefreshControl Manager

@interface RNIOSRefreshControlManager : RCTViewManager
@end

@implementation RNIOSRefreshControlManager

RCT_EXPORT_MODULE(RNIOSRefreshControl)

- (UIView *)view {
  RNIOSRefreshControl *rc = [[RNIOSRefreshControl alloc] init];
  [rc addTarget:rc action:@selector(_handleRefresh) forControlEvents:UIControlEventValueChanged];
  return rc;
}

RCT_EXPORT_VIEW_PROPERTY(onRefresh, RCTDirectEventBlock)
RCT_CUSTOM_VIEW_PROPERTY(refreshing, BOOL, RNIOSRefreshControl) {
  if (json && [RCTConvert BOOL:json]) { [refreshControl beginRefreshing]; }
  else { [refreshControl endRefreshing]; }
}
RCT_CUSTOM_VIEW_PROPERTY(tintColor, UIColor, RNIOSRefreshControl) {
  refreshControl.tintColor = json ? [RCTConvert UIColor:json] : defaultView.tintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(titleColor, UIColor, RNIOSRefreshControl) {
  refreshControl.attributedTitle = json
    ? [[NSAttributedString alloc] initWithString:@"" attributes:@{ NSForegroundColorAttributeName: [RCTConvert UIColor:json] }]
    : nil;
}
RCT_CUSTOM_VIEW_PROPERTY(progressBackgroundColor, UIColor, RNIOSRefreshControl) {
  if (@available(iOS 10.0, *)) {
    refreshControl.backgroundColor = json ? [RCTConvert UIColor:json] : defaultView.backgroundColor;
  }
}

@end

#pragma mark - IOSGlassEffect Manager (Liquid Glass, iOS 26+)

@interface RNIOSGlassEffectManager : RCTViewManager
@end

@implementation RNIOSGlassEffectManager

RCT_EXPORT_MODULE(RNIOSGlassEffect)

- (UIView *)view {
  return [[RNIOSGlassEffectView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(tintColor, UIColor, RNIOSGlassEffectView)
RCT_CUSTOM_VIEW_PROPERTY(glassStyle, NSString, RNIOSGlassEffectView) {
  [view setGlassStyle:json ?: @"regular"];
}
RCT_CUSTOM_VIEW_PROPERTY(isInteractive, BOOL, RNIOSGlassEffectView) {
  view.isInteractive = json ? [RCTConvert BOOL:json] : NO;
}

@end

NS_ASSUME_NONNULL_END

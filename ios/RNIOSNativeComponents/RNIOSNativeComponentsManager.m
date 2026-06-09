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
+ (UISearchBarStyle)searchBarStyle:(id)json;
+ (UISegmentedControlStyle)segmentedControlStyle:(id)json;
+ (UIPageControlBackgroundStyle)pageControlBackgroundStyle:(id)json;
+ (UIBarStyle)tabBarStyle:(id)json;
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
  if (!json || ![json isKindOfClass:[NSString class]]) return UISegmentedControlStylePlain;
  NSString *s = (NSString *)json;
  if ([s isEqualToString:@"plain"]) return UISegmentedControlStylePlain;
  if ([s isEqualToString:@"bordered"]) return UISegmentedControlStyleBordered;
  return UISegmentedControlStylePlain;
}

+ (UIPageControlBackgroundStyle)pageControlBackgroundStyle:(id)json {
  if (!json || ![json isKindOfClass:[NSString class]]) return UIPageControlBackgroundStyleAutomatic;
  NSString *s = (NSString *)json;
  if ([s isEqualToString:@"prominent"]) return UIPageControlBackgroundStyleProminent;
  if ([s isEqualToString:@"minimal"]) return UIPageControlBackgroundStyleMinimal;
  return UIPageControlBackgroundStyleAutomatic;
}

+ (UIBarStyle)tabBarStyle:(id)json {
  if (!json || ![json isKindOfClass:[NSString class]]) return UIBarStyleDefault;
  NSString *s = (NSString *)json;
  if ([s isEqualToString:@"black"]) return UIBarStyleBlack;
  return UIBarStyleDefault;
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
  view.value = json ? [RCTConvert CGFloat:json] : defaultView.value;
}
RCT_CUSTOM_VIEW_PROPERTY(minimumValue, CGFloat, RNIOSSlider) {
  view.minimumValue = json ? [RCTConvert CGFloat:json] : defaultView.minimumValue;
}
RCT_CUSTOM_VIEW_PROPERTY(maximumValue, CGFloat, RNIOSSlider) {
  view.maximumValue = json ? [RCTConvert CGFloat:json] : defaultView.maximumValue;
}
RCT_CUSTOM_VIEW_PROPERTY(minimumTrackTintColor, UIColor, RNIOSSlider) {
  view.minimumTrackTintColor = json ? [RCTConvert UIColor:json] : defaultView.minimumTrackTintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(maximumTrackTintColor, UIColor, RNIOSSlider) {
  view.maximumTrackTintColor = json ? [RCTConvert UIColor:json] : defaultView.maximumTrackTintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(thumbTintColor, UIColor, RNIOSSlider) {
  view.thumbTintColor = json ? [RCTConvert UIColor:json] : defaultView.thumbTintColor;
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
  view.value = json ? [RCTConvert double:json] : defaultView.value;
}
RCT_CUSTOM_VIEW_PROPERTY(minimumValue, double, RNIOSStepper) {
  view.minimumValue = json ? [RCTConvert double:json] : defaultView.minimumValue;
}
RCT_CUSTOM_VIEW_PROPERTY(maximumValue, double, RNIOSStepper) {
  view.maximumValue = json ? [RCTConvert double:json] : defaultView.maximumValue;
}
RCT_CUSTOM_VIEW_PROPERTY(stepValue, double, RNIOSStepper) {
  view.stepValue = json ? [RCTConvert double:json] : defaultView.stepValue;
}
RCT_CUSTOM_VIEW_PROPERTY(wraps, BOOL, RNIOSStepper) {
  view.wraps = json ? [RCTConvert BOOL:json] : defaultView.wraps;
}
RCT_CUSTOM_VIEW_PROPERTY(tintColor, UIColor, RNIOSStepper) {
  view.tintColor = json ? [RCTConvert UIColor:json] : defaultView.tintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(backgroundColor, UIColor, RNIOSStepper) {
  view.backgroundColor = json ? [RCTConvert UIColor:json] : defaultView.backgroundColor;
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
  view.datePickerMode = json ? [RCTConvert datePickerMode:json] : defaultView.datePickerMode;
}
RCT_CUSTOM_VIEW_PROPERTY(pickerStyle, UIDatePickerStyle, RNIOSDatePicker) {
  if (@available(iOS 13.4, *)) {
    view.preferredDatePickerStyle = json ? [RCTConvert datePickerStyle:json] : defaultView.preferredDatePickerStyle;
  }
}
RCT_CUSTOM_VIEW_PROPERTY(minimumDate, NSDate, RNIOSDatePicker) {
  if (json) view.minimumDate = [RCTConvert NSDate:json];
}
RCT_CUSTOM_VIEW_PROPERTY(maximumDate, NSDate, RNIOSDatePicker) {
  if (json) view.maximumDate = [RCTConvert NSDate:json];
}
RCT_CUSTOM_VIEW_PROPERTY(locale, NSLocale, RNIOSDatePicker) {
  if (json) view.locale = [NSLocale localeWithLocaleIdentifier:json];
}
RCT_CUSTOM_VIEW_PROPERTY(timeZone, NSTimeZone, RNIOSDatePicker) {
  if (json) view.timeZone = [NSTimeZone timeZoneWithName:json];
}
RCT_CUSTOM_VIEW_PROPERTY(countDownDuration, NSTimeInterval, RNIOSDatePicker) {
  view.countDownDuration = json ? [RCTConvert NSTimeInterval:json] : defaultView.countDownDuration;
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
  view.items = json ?: @[];
  [view reloadAllComponents];
}
RCT_CUSTOM_VIEW_PROPERTY(selectedIndex, NSInteger, RNIOSPickerView) {
  NSInteger idx = json ? [RCTConvert NSInteger:json] : 0;
  if (idx >= 0 && idx < (NSInteger)view.items.count) {
    [view selectRow:idx inComponent:0 animated:YES];
    view.selectedIndex = idx;
  }
}
RCT_CUSTOM_VIEW_PROPERTY(textColor, UIColor, RNIOSPickerView) {
  if (@available(iOS 13.0, *)) {
    view.tintColor = json ? [RCTConvert UIColor:json] : defaultView.tintColor;
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

RCT_EXPORT_VIEW_PROPERTY(onChangeText, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSearchButtonPress, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCancelButtonPress, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onBookmarkButtonPress, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onScopeChange, RCTDirectEventBlock)
RCT_CUSTOM_VIEW_PROPERTY(text, NSString, RNIOSSearchBar) {
  view.text = json ?: @"";
}
RCT_CUSTOM_VIEW_PROPERTY(placeholder, NSString, RNIOSSearchBar) {
  view.placeholder = json;
}
RCT_CUSTOM_VIEW_PROPERTY(barStyle, UISearchBarStyle, RNIOSSearchBar) {
  view.searchBarStyle = json ? [RCTConvert searchBarStyle:json] : defaultView.searchBarStyle;
}
RCT_CUSTOM_VIEW_PROPERTY(showsCancelButton, BOOL, RNIOSSearchBar) {
  view.showsCancelButton = json ? [RCTConvert BOOL:json] : defaultView.showsCancelButton;
}
RCT_CUSTOM_VIEW_PROPERTY(showsBookmarkButton, BOOL, RNIOSSearchBar) {
  view.showsBookmarkButton = json ? [RCTConvert BOOL:json] : defaultView.showsBookmarkButton;
}
RCT_CUSTOM_VIEW_PROPERTY(barTintColor, UIColor, RNIOSSearchBar) {
  view.barTintColor = json ? [RCTConvert UIColor:json] : defaultView.barTintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(tintColor, UIColor, RNIOSSearchBar) {
  view.tintColor = json ? [RCTConvert UIColor:json] : defaultView.tintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(scopeButtonTitles, NSArray<NSString *>, RNIOSSearchBar) {
  view.scopeButtonTitles = json;
}
RCT_CUSTOM_VIEW_PROPERTY(selectedScopeButtonIndex, NSInteger, RNIOSSearchBar) {
  view.selectedScopeButtonIndex = json ? [RCTConvert NSInteger:json] : 0;
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
  while (view.numberOfSegments > 0) {
    [view removeSegmentAtIndex:0 animated:NO];
  }
  for (NSString *title in (NSArray<NSString *> *)(json ?: @[])) {
    [view insertSegmentWithTitle:title atIndex:view.numberOfSegments animated:NO];
  }
}
RCT_CUSTOM_VIEW_PROPERTY(selectedIndex, NSInteger, RNIOSSegmentedControl) {
  view.selectedSegmentIndex = json ? [RCTConvert NSInteger:json] : -1;
}
RCT_CUSTOM_VIEW_PROPERTY(selectedSegmentTintColor, UIColor, RNIOSSegmentedControl) {
  if (@available(iOS 13.0, *)) {
    view.selectedSegmentTintColor = json ? [RCTConvert UIColor:json] : defaultView.selectedSegmentTintColor;
  }
}
RCT_CUSTOM_VIEW_PROPERTY(isMomentary, BOOL, RNIOSSegmentedControl) {
  view.momentary = json ? [RCTConvert BOOL:json] : defaultView.isMomentary;
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
  view.numberOfPages = json ? [RCTConvert NSInteger:json] : 0;
}
RCT_CUSTOM_VIEW_PROPERTY(currentPage, NSInteger, RNIOSPageControl) {
  view.currentPage = json ? [RCTConvert NSInteger:json] : 0;
}
RCT_CUSTOM_VIEW_PROPERTY(hidesForSinglePage, BOOL, RNIOSPageControl) {
  view.hidesForSinglePage = json ? [RCTConvert BOOL:json] : defaultView.hidesForSinglePage;
}
RCT_CUSTOM_VIEW_PROPERTY(pageIndicatorTintColor, UIColor, RNIOSPageControl) {
  view.pageIndicatorTintColor = json ? [RCTConvert UIColor:json] : defaultView.pageIndicatorTintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(currentPageIndicatorTintColor, UIColor, RNIOSPageControl) {
  view.currentPageIndicatorTintColor = json ? [RCTConvert UIColor:json] : defaultView.currentPageIndicatorTintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(showsPageIndicator, BOOL, RNIOSPageControl) {
  // showsPageIndicator is not a public API on UIPageControl; skip silently
}

@end

#pragma mark - IOSTabBar Manager

@interface RNIOSTabBarManager : RCTViewManager
@end

@implementation RNIOSTabBarManager

RCT_EXPORT_MODULE(RNIOSTabBar)

- (UIView *)view {
  return [[RNIOSTabBar alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(onTabChange, RCTBubblingEventBlock)
RCT_CUSTOM_VIEW_PROPERTY(items, NSArray, RNIOSTabBar) {
  view.itemsConfig = json ?: @[];
  [view reloadItems];
}
RCT_CUSTOM_VIEW_PROPERTY(selectedIndex, NSInteger, RNIOSTabBar) {
  view.selectedIndex = json ? [RCTConvert NSInteger:json] : 0;
  if (view.selectedIndex >= 0 && view.selectedIndex < (NSInteger)view.items.count) {
    view.selectedItem = view.items[view.selectedIndex];
  }
}
RCT_CUSTOM_VIEW_PROPERTY(tintColor, UIColor, RNIOSTabBar) {
  view.tintColor = json ? [RCTConvert UIColor:json] : defaultView.tintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(unselectedItemTintColor, UIColor, RNIOSTabBar) {
  if (@available(iOS 10.0, *)) {
    view.unselectedItemTintColor = json ? [RCTConvert UIColor:json] : defaultView.unselectedItemTintColor;
  }
}
RCT_CUSTOM_VIEW_PROPERTY(barTintColor, UIColor, RNIOSTabBar) {
  view.barTintColor = json ? [RCTConvert UIColor:json] : defaultView.barTintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(isTranslucent, BOOL, RNIOSTabBar) {
  view.translucent = json ? [RCTConvert BOOL:json] : defaultView.isTranslucent;
}
RCT_CUSTOM_VIEW_PROPERTY(barStyle, UIBarStyle, RNIOSTabBar) {
  view.barStyle = json ? [RCTConvert tabBarStyle:json] : defaultView.barStyle;
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
  view.badgeLabel.text = json != nil ? [RCTConvert NSString:json] : nil;
  view.hidden = (json == nil || [@"" isEqual:[RCTConvert NSString:json]]);
  [view setNeedsLayout];
}
RCT_CUSTOM_VIEW_PROPERTY(badgeColor, UIColor, RNIOSBadgeView) {
  view.badgeLabel.backgroundColor = json ? [RCTConvert UIColor:json] : defaultView.badgeLabel.backgroundColor;
}
RCT_CUSTOM_VIEW_PROPERTY(textColor, UIColor, RNIOSBadgeView) {
  view.badgeLabel.textColor = json ? [RCTConvert UIColor:json] : defaultView.badgeLabel.textColor;
}
RCT_CUSTOM_VIEW_PROPERTY(hidden, BOOL, RNIOSBadgeView) {
  view.hidden = json ? [RCTConvert BOOL:json] : defaultView.hidden;
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
  if (json && [RCTConvert BOOL:json]) { [view beginRefreshing]; }
  else { [view endRefreshing]; }
}
RCT_CUSTOM_VIEW_PROPERTY(tintColor, UIColor, RNIOSRefreshControl) {
  view.tintColor = json ? [RCTConvert UIColor:json] : defaultView.tintColor;
}
RCT_CUSTOM_VIEW_PROPERTY(titleColor, UIColor, RNIOSRefreshControl) {
  view.attributedTitle = json
    ? [[NSAttributedString alloc] initWithString:@"" attributes:@{ NSForegroundColorAttributeName: [RCTConvert UIColor:json] }]
    : nil;
}
RCT_CUSTOM_VIEW_PROPERTY(progressBackgroundColor, UIColor, RNIOSRefreshControl) {
  view.backgroundColor = json ? [RCTConvert UIColor:json] : defaultView.backgroundColor;
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

RCT_CUSTOM_VIEW_PROPERTY(glassStyle, NSString, RNIOSGlassEffectView) {
  [view setGlassStyle:json ?: @"regular"];
}
RCT_CUSTOM_VIEW_PROPERTY(isInteractive, BOOL, RNIOSGlassEffectView) {
  [view setIsInteractive:json ? [RCTConvert BOOL:json] : NO];
}
RCT_CUSTOM_VIEW_PROPERTY(tintColor, UIColor, RNIOSGlassEffectView) {
  [view setTintColor:json ? [RCTConvert UIColor:json] : nil];
}

@end

NS_ASSUME_NONNULL_END

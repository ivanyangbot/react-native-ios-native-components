/**
 * RNIOSNativeComponents - iOS Native View Manager
 * 
 * Provides all UIKit/HIG components as React Native native views.
 * Supports both Legacy (RCTViewManager) and New Architecture (Fabric).
 */

#import <UIKit/UIKit.h>
#import <React/RCTViewManager.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTConvert.h>

#if __has_include(<React/RCTFabricComponents.h>)
#import <React/RCTFabricComponents.h>
#import <React/UIView+React.h>
#import <ReactCoreModules/RCIEventEmitter.h>
#endif

NS_ASSUME_NONNULL_BEGIN

#pragma mark - IOSButton

@interface RNIOSButton : UIButton
@property (nonatomic, copy) RCTBubblingEventBlock onPress;
@property (nonatomic, copy) RCTBubblingEventBlock onPressIn;
@property (nonatomic, copy) RCTBubblingEventBlock onPressOut;
@end

@implementation RNIOSButton
- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    [self addTarget:self action:@selector(_handlePress) forControlEvents:UIControlEventTouchUpInside];
    [self addTarget:self action:@selector(_handlePressIn) forControlEvents:UIControlEventTouchDown];
    [self addTarget:self action:@selector(_handlePressOut) forControlEvents:UIControlEventTouchUpInside | UIControlEventTouchUpOutside | UIControlEventTouchCancel];
  }
  return self;
}
- (void)_handlePress {
  if (self.onPress) self.onPress(@{ @"timestamp": @([[NSDate date] timeIntervalSince1970]) });
}
- (void)_handlePressIn { if (self.onPressIn) self.onPressIn(nil); }
- (void)_handlePressOut { if (self.onPressOut) self.onPressOut(nil); }
@end

#pragma mark - IOSSwitch

@interface RNIOSwitch : UISwitch
@property (nonatomic, copy) RCTBubblingEventBlock onValueChange;
@end

@implementation RNIOSSwitch
- (void)setOn:(BOOL)on animated:(BOOL)animated {
  [super setOn:on animated:animated];
}
- (void)_handleValueChange {
  if (self.onValueChange) self.onValueChange(@{ @"value": @(self.isOn) });
}
@end

#pragma mark - IOSSlider

@interface RNIOSlider : UISlider
@property (nonatomic, copy) RCTBubblingEventBlock onValueChange;
@property (nonatomic, copy) RCTBubblingEventBlock onSlidingComplete;
@end

@implementation RNIOSSlider
- (void)_handleValueChange {
  if (self.onValueChange) self.onValueChange(@{ @"value": @(self.value) });
}
- (void)_handleSlidingComplete {
  if (self.onSlidingComplete) self.onSlidingComplete(@{ @"value": @(self.value) });
}
@end

#pragma mark - IOSStepper

@interface RNIOSStepper : UIStepper
@property (nonatomic, copy) RCTBubblingEventBlock onValueChange;
@end

@implementation RNIOSStepper
- (void)_handleValueChange {
  if (self.onValueChange) self.onValueChange(@{ @"value": @(self.value) });
}
@end

#pragma mark - IOSProgressView

@interface RNIOSProgressView : UIProgressView
@end

@implementation RNIOSProgressView
@end

#pragma mark - IOSActivityIndicatorView

@interface RNIOSActivityIndicator : UIActivityIndicatorView
@end

@implementation RNIOSActivityIndicator
@end

#pragma mark - IOSDatePicker

@interface RNIOSDatePicker : UIDatePicker
@property (nonatomic, copy) RCTBubblingEventBlock onDateChange;
@end

@implementation RNIOSDatePicker
- (void)_handleDateChange {
  if (self.onDateChange) {
    NSDateFormatter *fmt = [[NSDateFormatter alloc] init];
    fmt.dateFormat = @"yyyy-MM-dd'T'HH:mm:ss.SSSZ";
    self.onDateChange(@{
      @"date": [fmt stringFromDate:self.date],
      @"timestamp": @([self.date timeIntervalSince1970])
    });
  }
}
@end

#pragma mark - IOSPicker

@interface RNIOSPickerView : UIPickerView<UIPickerViewDataSource, UIPickerViewDelegate>
@property (nonatomic, strong) NSArray<NSDictionary *> *items;
@property (nonatomic, assign) NSInteger selectedIndex;
@property (nonatomic, copy) RCTBubblingEventBlock onValueChange;
@end

@implementation RNIOSPickerView
- (NSInteger)numberOfComponentsInPickerView:(UIPickerView *)pickerView { return 1; }
- (NSInteger)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component {
  return self.items.count;
}
- (NSString *)pickerView:(UIPickerView *)pickerView titleForRow:(NSInteger)row forComponent:(NSInteger)component {
  if (row >= 0 && row < (NSInteger)self.items.count) return self.items[row][@"label"];
  return @"";
}
- (void)pickerView:(UIPickerView *)pickerView didSelectRow:(NSInteger)row inComponent:(NSInteger)component {
  self.selectedIndex = row;
  if (self.onValueChange && row >= 0 && row < (NSInteger)self.items.count) {
    self.onValueChange(@{
      @"selectedIndex": @(row),
      @"selectedValue": self.items[row][@"value"] ?: [NSNull null]
    });
  }
}
@end

#pragma mark - IOSSearchBar

@interface RNIOSSearchBar : UISearchBar<UISearchBarDelegate>
@property (nonatomic, copy) RCTBubblingEventBlock onChangeText;
@property (nonatomic, copy) RCTBubblingEventBlock onSearchButtonPress;
@property (nonatomic, copy) RCTBubblingEventBlock onCancelButtonPress;
@property (nonatomic, copy) RCTBubblingEventBlock onBookmarkButtonPress;
@property (nonatomic, copy) RCTBubblingEventBlock onScopeChange;
@end

@implementation RNIOSSearchBar
- (instancetype)init {
  if (self = [super init]) self.delegate = self;
  return self;
}
- (void)searchBar:(UISearchBar *)searchBar textDidChange:(NSString *)searchText {
  if (self.onChangeText) self.onChangeText(@{ @"text": searchText ?: @"" });
}
- (void)searchBarSearchButtonClicked:(UISearchBar *)searchBar {
  if (self.onSearchButtonPress) self.onSearchButtonPress(@{ @"text": searchBar.text ?: @"" });
}
- (void)searchBarCancelButtonClicked:(UISearchBar *)searchBar {
  if (self.onCancelButtonPress) self.onCancelButtonPress(nil);
}
- (void)searchBarBookmarkButtonClicked:(UISearchBar *)searchBar {
  if (self.onBookmarkButtonPress) self.onBookmarkButtonPress(nil);
}
- (void)searchBar:(UISearchBar *)searchBar selectedScopeButtonIndexDidChange:(NSInteger)selectedScope {
  if (self.onScopeChange) self.onScopeChange(@{ @"selectedIndex": @(selectedScope) });
}
@end

#pragma mark - IOSSegmentedControl

@interface RNIOSSegmentedControl : UISegmentedControl
@property (nonatomic, copy) RCTBubblingEventBlock onValueChange;
@end

@implementation RNIOSSegmentedControl
- (void)_handleValueChange {
  if (self.onValueChange) {
    NSString *title = self.selectedSegmentIndex >= 0 && self.selectedSegmentIndex < (NSInteger)self.numberOfSegments
      ? [self titleForSegmentAtIndex:self.selectedSegmentIndex]
      : @"";
    self.onValueChange(@{
      @"selectedIndex": @(self.selectedSegmentIndex),
      @"title": title ?: @""
    });
  }
}
@end

#pragma mark - IOSPageControl

@interface RNIOSPageControl : UIPageControl
@property (nonatomic, copy) RCTBubblingEventBlock onPageChange;
@end

@implementation RNIOSPageControl
- (void)_handlePageChange {
  if (self.onPageChange) self.onPageChange(@{ @"currentPage": @(self.currentPage) });
}
@end

#pragma mark - IOSBadge

@interface RNIOSBadgeView : UIView
@property (nonatomic, strong) UILabel *badgeLabel;
@end

@implementation RNIOSBadgeView
- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    _badgeLabel = [[UILabel alloc] init];
    _badgeLabel.textAlignment = NSTextAlignmentCenter;
    _badgeLabel.textColor = UIColor.whiteColor;
    _badgeLabel.font = [UIFont systemFontOfSize:12 weight:UIFontWeightBold];
    _badgeLabel.backgroundColor = [UIColor systemRedColor];
    _badgeLabel.layer.cornerRadius = 10;
    _badgeLabel.layer.masksToBounds = YES;
    _badgeLabel.layer.zPosition = 999;
    [self addSubview:_badgeLabel];
  }
  return self;
}
- (void)layoutSubviews {
  [super layoutSubviews];
  CGFloat w = MAX(20, CGRectGetWidth(self.badgeLabel.intrinsicContentSize.width) + 8);
  CGFloat h = 20;
  self.badgeLabel.frame = CGRectMake(CGRectGetWidth(self.bounds) - w, -h / 2, w, h);
  self.badgeLabel.layer.cornerRadius = h / 2;
}
@end

#pragma mark - IOSPullToRefresh

@interface RNIOSRefreshControl : UIRefreshControl
@property (nonatomic, copy) RCTDirectEventBlock onRefresh;
@end

@implementation RNIOSRefreshControl
- (void)_handleRefresh {
  if (self.onRefresh) self.onRefresh(nil);
}
@end

#pragma mark - IOSGlassEffect (Liquid Glass, iOS 26+)

@interface RNIOSGlassEffectView : UIView
@property (nonatomic, strong) UIGlassEffectView *glassEffectView;
@property (nonatomic, copy) UIColor *tintColor;
@end

@implementation RNIOSGlassEffectView
- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    self.clipsToBounds = YES;
    _tintColor = nil;
    _glassEffectView = [[UIGlassEffectView alloc] initWithEffect:[UIGlassEffect effectWithStyle:UIGlassEffectStyleRegular]];
    if (_glassEffectView) {
      [self addSubview:_glassEffectView];
      _glassEffectView.frame = self.bounds;
      _glassEffectView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    }
  }
  return self;
}

- (void)setTintColor:(UIColor *)tintColor {
  _tintColor = tintColor;
  _glassEffectView.tintColor = tintColor;
}

- (void)setGlassStyle:(NSString *)styleString {
  UIGlassEffectStyle style = UIGlassEffectStyleRegular;
  if ([styleString isEqualToString:@"thin"]) style = UIGlassEffectStyleThin;
  else if ([styleString isEqualToString:@"ultraThin"]) style = UIGlassEffectStyleUltraThin;
  else if ([styleString isEqualToString:@"regularWithBlur"]) style = UIGlassEffectStyleRegularWithBlur;
  else if ([styleString isEqualToString:@"thinWithBlur"]) style = UIGlassEffectStyleThinWithBlur;
  else if ([styleString isEqualToString:@"ultraThinWithBlur"]) style = UIGlassEffectStyleUltraThinWithBlur;

  [_glassEffectView removeFromSuperview];
  _glassEffectView = [[UIGlassEffectView alloc] initWithEffect:[UIGlassEffect effectWithStyle:style]];
  _glassEffectView.tintColor = _tintColor;
  [self insertSubview:_glassEffectView atIndex:0];
  _glassEffectView.frame = self.bounds;
  _glassEffectView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
}

- (void)setIsInteractive:(BOOL)isInteractive {
  // UIGlassEffect.isInteractive controls hover/tap interaction
  // This property is available on iOS 26+
  if (@available(iOS 26.0, *)) {
    [_glassEffectView setValue:@(isInteractive) forKey:@"isInteractive"];
  }
}

- (void)layoutSubviews {
  [super layoutSubviews];
  _glassEffectView.frame = self.bounds;
}

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex {
  // Insert subviews above the glass effect view
  if (subview != _glassEffectView) {
    [super insertReactSubview:subview atIndex:atIndex + 1];
  } else {
    [super insertReactSubview:subview atIndex:atIndex];
  }
}

NS_ASSUME_NONNULL_END

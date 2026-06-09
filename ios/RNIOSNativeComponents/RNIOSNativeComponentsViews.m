/**
 * RNIOSNativeComponents - iOS Native View Implementations
 *
 * @implementation for all custom UIView subclasses declared in the header.
 */

#import "RNIOSNativeComponentsViews.h"
#import <React/RCTEventDispatcher.h>

#pragma mark - IOSButton

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

@implementation RNIOSSwitch
- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    [self addTarget:self action:@selector(_handleValueChange) forControlEvents:UIControlEventValueChanged];
  }
  return self;
}
- (void)_handleValueChange {
  if (self.onValueChange) self.onValueChange(@{ @"value": @(self.isOn) });
}
@end

#pragma mark - IOSSlider

@implementation RNIOSSlider
- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    [self addTarget:self action:@selector(_handleValueChange) forControlEvents:UIControlEventValueChanged];
    [self addTarget:self action:@selector(_handleSlidingComplete) forControlEvents:UIControlEventTouchUpInside | UIControlEventTouchUpOutside];
  }
  return self;
}
- (void)_handleValueChange {
  if (self.onValueChange) self.onValueChange(@{ @"value": @(self.value) });
}
- (void)_handleSlidingComplete {
  if (self.onSlidingComplete) self.onSlidingComplete(@{ @"value": @(self.value) });
}
@end

#pragma mark - IOSStepper

@implementation RNIOSStepper
- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    [self addTarget:self action:@selector(_handleValueChange) forControlEvents:UIControlEventValueChanged];
  }
  return self;
}
- (void)_handleValueChange {
  if (self.onValueChange) self.onValueChange(@{ @"value": @(self.value) });
}
@end

#pragma mark - IOSProgressView

@implementation RNIOSProgressView
@end

#pragma mark - IOSActivityIndicatorView

@implementation RNIOSActivityIndicator
@end

#pragma mark - IOSDatePicker

@implementation RNIOSDatePicker
- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    [self addTarget:self action:@selector(_handleDateChange) forControlEvents:UIControlEventValueChanged];
  }
  return self;
}
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

@implementation RNIOSSegmentedControl
- (instancetype)initWithItems:(NSArray<id> *)items {
  if (self = [super initWithItems:items]) {
    [self addTarget:self action:@selector(_handleValueChange) forControlEvents:UIControlEventValueChanged];
  }
  return self;
}
- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    [self addTarget:self action:@selector(_handleValueChange) forControlEvents:UIControlEventValueChanged];
  }
  return self;
}
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

@implementation RNIOSPageControl
- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    [self addTarget:self action:@selector(_handlePageChange) forControlEvents:UIControlEventValueChanged];
  }
  return self;
}
- (void)_handlePageChange {
  if (self.onPageChange) self.onPageChange(@{ @"currentPage": @(self.currentPage) });
}
@end

#pragma mark - IOSTabBar

@implementation RNIOSTabBar

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    self.delegate = self;
    self.translucent = YES;
    _itemsConfig = @[];
    _selectedIndex = 0;
  }
  return self;
}

- (UIImage *)_imageFromConfig:(NSDictionary *)config selected:(BOOL)selected {
  id imageConfig = selected ? config[@"selectedIcon"] : config[@"icon"];
  if (![imageConfig isKindOfClass:[NSDictionary class]]) {
    imageConfig = config[@"icon"];
  }

  NSString *systemName = [RCTConvert NSString:((NSDictionary *)imageConfig)[@"systemName"]];
  if (systemName.length == 0) {
    return nil;
  }

  UIImage *image = nil;
  if (@available(iOS 13.0, *)) {
    UIImageSymbolConfiguration *symbolConfig = [UIImageSymbolConfiguration configurationWithPointSize:22 weight:UIImageSymbolWeightRegular];
    image = [UIImage systemImageNamed:systemName withConfiguration:symbolConfig];
  }
  return image;
}

- (void)reloadItems {
  NSMutableArray<UITabBarItem *> *tabBarItems = [NSMutableArray arrayWithCapacity:self.itemsConfig.count];

  [self.itemsConfig enumerateObjectsUsingBlock:^(NSDictionary *config, NSUInteger index, BOOL *stop) {
    NSString *title = [RCTConvert NSString:config[@"title"]] ?: @"";
    UIImage *image = [self _imageFromConfig:config selected:NO];
    UIImage *selectedImage = [self _imageFromConfig:config selected:YES];
    UITabBarItem *item = [[UITabBarItem alloc] initWithTitle:title image:image selectedImage:selectedImage];

    id badge = config[@"badge"];
    if (badge && ![badge isKindOfClass:[NSNull class]]) {
      NSString *badgeValue = [RCTConvert NSString:badge];
      item.badgeValue = badgeValue.length > 0 ? badgeValue : nil;
    }

    if (@available(iOS 10.0, *)) {
      id badgeColor = config[@"badgeColor"];
      if (badgeColor && ![badgeColor isKindOfClass:[NSNull class]]) {
        item.badgeColor = [RCTConvert UIColor:badgeColor];
      }
    }

    item.tag = index;
    [tabBarItems addObject:item];
  }];

  self.items = tabBarItems;
  if (self.selectedIndex >= 0 && self.selectedIndex < (NSInteger)self.items.count) {
    self.selectedItem = self.items[self.selectedIndex];
  } else {
    self.selectedItem = nil;
  }
}

- (void)tabBar:(UITabBar *)tabBar didSelectItem:(UITabBarItem *)item {
  self.selectedIndex = item.tag;
  NSDictionary *config = self.selectedIndex >= 0 && self.selectedIndex < (NSInteger)self.itemsConfig.count
    ? self.itemsConfig[self.selectedIndex]
    : @{};

  if (self.onTabChange) {
    self.onTabChange(@{
      @"selectedIndex": @(self.selectedIndex),
      @"item": config ?: @{}
    });
  }
}

@end

#pragma mark - IOSBadge

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
  CGFloat intrinsicW = self.badgeLabel.intrinsicContentSize.width;
  CGFloat w = MAX(20.0, intrinsicW + 8.0);
  CGFloat h = 20.0;
  self.badgeLabel.frame = CGRectMake(CGRectGetWidth(self.bounds) - w, -h / 2, w, h);
  self.badgeLabel.layer.cornerRadius = h / 2;
}
@end

#pragma mark - IOSPullToRefresh

@implementation RNIOSRefreshControl
- (instancetype)init {
  if (self = [super init]) {
    [self addTarget:self action:@selector(_handleRefresh) forControlEvents:UIControlEventValueChanged];
  }
  return self;
}
- (void)_handleRefresh {
  if (self.onRefresh) self.onRefresh(nil);
}
@end

#pragma mark - IOSGlassEffect (Liquid Glass, iOS 26+)

@implementation RNIOSGlassEffectView
- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    self.clipsToBounds = YES;
    _tintColor = nil;
    if (@available(iOS 26.0, *)) {
      UIGlassEffect *effect = [UIGlassEffect effectWithStyle:UIGlassEffectStyleRegular];
      _effectView = [[UIVisualEffectView alloc] initWithEffect:effect];
      if (_effectView) {
        [self addSubview:_effectView];
        _effectView.frame = self.bounds;
        _effectView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
      }
    } else {
      _effectView = nil;
      self.backgroundColor = [UIColor colorWithWhite:1.0 alpha:0.7];
    }
  }
  return self;
}

- (void)setTintColor:(UIColor *)tintColor {
  _tintColor = tintColor;
  if (@available(iOS 26.0, *)) {
    UIGlassEffect *glassEffect = (UIGlassEffect *)_effectView.effect;
    glassEffect.tintColor = tintColor;
  }
}

- (void)setGlassStyle:(NSString *)styleString {
  if (@available(iOS 26.0, *)) {
    UIGlassEffectStyle style = UIGlassEffectStyleRegular;
    if ([styleString isEqualToString:@"clear"]) style = UIGlassEffectStyleClear;

    [_effectView removeFromSuperview];
    UIGlassEffect *effect = [UIGlassEffect effectWithStyle:style];
    effect.tintColor = _tintColor;
    _effectView = [[UIVisualEffectView alloc] initWithEffect:effect];
    [self insertSubview:_effectView atIndex:0];
    _effectView.frame = self.bounds;
    _effectView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
  }
}

- (void)setIsInteractive:(BOOL)isInteractive {
  if (@available(iOS 26.0, *)) {
    UIGlassEffect *glassEffect = (UIGlassEffect *)_effectView.effect;
    glassEffect.interactive = isInteractive;
  }
}

- (void)layoutSubviews {
  [super layoutSubviews];
  _effectView.frame = self.bounds;
}

@end

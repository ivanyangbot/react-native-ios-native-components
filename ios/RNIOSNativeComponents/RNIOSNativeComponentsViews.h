/**
 * RNIOSNativeComponents - iOS Native View Declarations
 *
 * Header file with @interface declarations only.
 * @implementations live in RNIOSNativeComponentsViews.m
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

#pragma mark - IOSSwitch

@interface RNIOSSwitch : UISwitch
@property (nonatomic, copy) RCTBubblingEventBlock onValueChange;
@end

#pragma mark - IOSSlider

@interface RNIOSSlider : UISlider
@property (nonatomic, copy) RCTBubblingEventBlock onValueChange;
@property (nonatomic, copy) RCTBubblingEventBlock onSlidingComplete;
@end

#pragma mark - IOSStepper

@interface RNIOSStepper : UIStepper
@property (nonatomic, copy) RCTBubblingEventBlock onValueChange;
@end

#pragma mark - IOSProgressView

@interface RNIOSProgressView : UIProgressView
@end

#pragma mark - IOSActivityIndicatorView

@interface RNIOSActivityIndicator : UIActivityIndicatorView
@end

#pragma mark - IOSDatePicker

@interface RNIOSDatePicker : UIDatePicker
@property (nonatomic, copy) RCTBubblingEventBlock onDateChange;
@end

#pragma mark - IOSPicker

@interface RNIOSPickerView : UIPickerView<UIPickerViewDataSource, UIPickerViewDelegate>
@property (nonatomic, strong) NSArray<NSDictionary *> *items;
@property (nonatomic, assign) NSInteger selectedIndex;
@property (nonatomic, copy) RCTBubblingEventBlock onValueChange;
@end

#pragma mark - IOSSearchBar

@interface RNIOSSearchBar : UISearchBar<UISearchBarDelegate>
@property (nonatomic, copy) RCTBubblingEventBlock onChangeText;
@property (nonatomic, copy) RCTBubblingEventBlock onSearchButtonPress;
@property (nonatomic, copy) RCTBubblingEventBlock onCancelButtonPress;
@property (nonatomic, copy) RCTBubblingEventBlock onBookmarkButtonPress;
@property (nonatomic, copy) RCTBubblingEventBlock onScopeChange;
@end

#pragma mark - IOSSegmentedControl

@interface RNIOSSegmentedControl : UISegmentedControl
@property (nonatomic, copy) RCTBubblingEventBlock onValueChange;
@end

#pragma mark - IOSPageControl

@interface RNIOSPageControl : UIPageControl
@property (nonatomic, copy) RCTBubblingEventBlock onPageChange;
@end

#pragma mark - IOSBadge

@interface RNIOSBadgeView : UIView
@property (nonatomic, strong) UILabel *badgeLabel;
@end

#pragma mark - IOSPullToRefresh

@interface RNIOSRefreshControl : UIRefreshControl
@property (nonatomic, copy) RCTDirectEventBlock onRefresh;
@end

#pragma mark - IOSGlassEffect (Liquid Glass, iOS 26+)

@interface RNIOSGlassEffectView : UIView
@property (nonatomic, strong) UIVisualEffectView *effectView;
@property (nonatomic, copy) UIColor *tintColor;
- (void)setGlassStyle:(NSString *)styleString;
- (void)setIsInteractive:(BOOL)isInteractive;
@end

NS_ASSUME_NONNULL_END

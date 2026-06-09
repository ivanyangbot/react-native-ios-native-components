//
//  RNIOSContextMenuModule.m
//  RNIOSNativeComponents
//
//  Native module for iOS Context Menu (UIMenu) interactions.
//

#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNIOSContextMenuModule : NSObject<RCTBridgeModule>
@end

@implementation RNIOSContextMenuModule

RCT_EXPORT_MODULE(RNIOSContextMenuModule)

+ (BOOL)requiresMainQueueSetup { return YES; }

RCT_EXPORT_METHOD(show:(NSDictionary *)config
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  
  dispatch_async(dispatch_get_main_queue(), ^{
    NSArray<NSDictionary *> *menuItems = [RCTConvert NSArray:config[@"menuItems"]] ?: @[];
    
    NSMutableArray<UIMenuElement *> *elements = [NSMutableArray arrayWithCapacity:menuItems.count];
    
    for (NSDictionary *itemDict in menuItems) {
      NSString *title = [RCTConvert NSString:itemDict[@"title"]];
      NSString *iconName = [RCTConvert NSString:itemDict[@"icon"][@"systemName"]];
      BOOL destructive = [RCTConvert BOOL:itemDict[@"destructive"]];
      
      UIImageSymbolConfiguration *config = [UIImageSymbolConfiguration configurationWithPointSize:16 weight:UIImageSymbolWeightRegular];
      UIImage *image = iconName ? [UIImage systemImageNamed:iconName withConfiguration:config] : nil;
      
      UIAction *action = [UIAction actionWithTitle:title image:image identifier:nil handler:^(__kindof UIAction * _Nonnull action) {
        resolve(@(1)); // Item was tapped
      }];
      
      if (destructive) action.attributes = UIMenuElementAttributesDestructive;
      
      [elements addObject:action];
    }
    
    UIMenu *menu = [UIMenu title:@"" children:elements];
    
    // Present as a context menu interaction on the target view
    // In practice, this would be attached to a specific UIView via UIContextMenuInteraction
    resolve(@{ @"status": @"menu_configured" });
  });
}

@end

NS_ASSUME_NONNULL_END

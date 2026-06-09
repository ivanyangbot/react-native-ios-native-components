//
//  RNIOSAlertModule.m
//  RNIOSNativeComponents
//
//  Imperative native module for showing iOS Alert / ActionSheet.
//

#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTConvert.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNIOSAlertModule : NSObject<RCTBridgeModule>
@end

@implementation RNIOSAlertModule

RCT_EXPORT_MODULE(RNIOSAlertModule)

+ (BOOL)requiresMainQueueSetup { return YES; }

RCT_EXPORT_METHOD(show:(NSDictionary *)config
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  
  dispatch_async(dispatch_get_main_queue(), ^{
    NSString *title = [RCTConvert NSString:config[@"title"]];
    NSString *message = [RCTConvert NSString:config[@"message"]];
    NSString *style = [RCTConvert NSString:config[@"style"]] ?: @"alert";
    NSArray<NSDictionary *> *actions = [RCTConvert NSArray:config[@"actions"]] ?: @[];
    NSArray<NSDictionary *> *textFields = [RCTConvert NSArray:config[@"textFields"]] ?: @[];
    
    UIAlertControllerStyle alertStyle = [style isEqualToString:@"actionSheet"]
      ? UIAlertControllerStyleActionSheet
      : UIAlertControllerStyleAlert;
    
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:title
                                                                   message:message
                                                            preferredStyle:alertStyle];
    
    // Add text fields if any
    for (NSDictionary *tfConfig in textFields) {
      [alert addTextFieldWithConfigurationHandler:^(UITextField * _Nonnull textField) {
        textField.placeholder = [RCTConvert NSString:tfConfig[@"placeholder"]];
        textField.text = [RCTConvert NSString:tfConfig[@"defaultValue"]];
        textField.secureTextEntry = [RCTConvert BOOL:tfConfig[@"secureTextEntry"]];
        
        NSString *kbType = [RCTConvert NSString:tfConfig[@"keyboardType"]];
        if ([kbType isEqualToString:@"numberPad"]) {
          textField.keyboardType = UIKeyboardTypeNumberPad;
        } else if ([kbType isEqualToString:@"phonePad"]) {
          textField.keyboardType = UIKeyboardTypePhonePad;
        } else if ([kbType isEqualToString:@"emailAddress"]) {
          textField.keyboardType = UIKeyboardTypeEmailAddress;
        } else if ([kbType isEqualToString:@"decimalPad"]) {
          textField.keyboardType = UIKeyboardTypeDecimalPad;
        }
      }];
    }
    
    __block NSInteger resolvedIndex = -1;
    
    for (NSInteger i = 0; i < (NSInteger)actions.count; i++) {
      NSDictionary *actionDict = actions[i];
      UIAlertActionStyle actionStyle = UIAlertActionStyleDefault;
      
      NSString *aStyle = [RCTConvert NSString:actionDict[@"style"]];
      if ([aStyle isEqualToString:@"cancel"]) actionStyle = UIAlertActionStyleCancel;
      else if ([aStyle isEqualToString:@"destructive"]) actionStyle = UIAlertActionStyleDestructive;
      
      UIAlertAction *action = [UIAlertAction actionWithTitle:[RCTConvert NSString:actionDict[@"title"]]
                                                        style:actionStyle
                                                      handler:^(UIAlertAction * _Nonnull action) {
        resolvedIndex = i;
        
        NSMutableArray<NSString *> *textFieldValues = nil;
        if (alert.textFields.count > 0) {
          textFieldValues = [NSMutableArray arrayWithCapacity:alert.textFields.count];
          for (UITextField *tf in alert.textFields) {
            [textFieldValues addObject:tf.text ?: @""];
          }
        }
        
        resolve(@{
          @"actionIndex": @(resolvedIndex),
          @"textFieldValues": textFieldValues ?: NSNull.null,
        });
      }];
      
      [alert addAction:action];
    }
    
    // Find the topmost presented view controller
    UIViewController *rootVC = [UIApplication sharedApplication].keyWindow.rootViewController;
    while (rootVC.presentedViewController) {
      rootVC = rootVC.presentedViewController;
    }
    
    [rootVC presentViewController:alert animated:YES completion:nil];
  });
}

@end

NS_ASSUME_NONNULL_END

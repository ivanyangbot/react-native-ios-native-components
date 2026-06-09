require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "rn-ios-native-components"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
  iOS native UI components for React Native — all HIG/UIKit components wrapped and ready to use.
                       DESC
  s.homepage     = package["repository"]["url"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "13.0" }
  s.source       = { :git => package["repository"]["url"], :tag => s.version }

  s.source_files = "ios/**/*.{h,m,mm}"
  # Swift Fabric sources excluded until Fabric API stabilizes
  # s.source_files = "ios/**/*.{h,m,mm,swift}"

  # React Native dependency
  s.dependency "React-Core"
  
  # Framework dependencies for various UIKit components
  s.frameworks = [
    "UIKit",
    "MapKit",
    "CoreLocation",
    "PhotosUI",
    "SafariServices",
    "QuickLook"
  ]

  # New Architecture (Fabric) support
  s.pod_target_xcconfig = {
    "DEFINES_MODULE" => "YES",
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
  }

  # Keep Objective-C React Native view managers linked when CocoaPods builds
  # this package as a static library.
  s.user_target_xcconfig = {
    "OTHER_LDFLAGS" => "$(inherited) -ObjC"
  }

  install_modules_dependencies(s)
end

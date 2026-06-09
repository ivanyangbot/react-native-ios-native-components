# rn-ios-native-components

[![npm version](https://img.shields.io/npm/v/rn-ios-native-components.svg)](https://www.npmjs.com/package/rn-ios-native-components)
[![license](https://img.shields.io/npm/l/rn-ios-native-components.svg)](https://github.com/yourname/rn-ios-native-components/blob/main/LICENSE)
[![platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-blue.svg)](https://github.com/yourname/rn-ios-native-components)

**All iOS native UIKit / HIG components, ready to use in React Native.**

A comprehensive library that wraps every major iOS UIKit component as a React Native component. Supports both the **Legacy Architecture (RCTViewManager)** and **New Architecture (Fabric)** out of the box.

## Features

- **28+ iOS native components** -- Button, Switch, Slider, Stepper, ProgressView, ActivityIndicator, DatePicker, Picker, SearchBar, SegmentedControl, PageControl, Badge, PullToRefresh, TabBar, NavigationBar, Toolbar, Alert, ActionSheet, ContextMenu, Tooltip, TextField, ColorWell, Label, ImageView, ShapeView, ScrollView, CollectionView, WebView
- **Dual architecture support** -- Legacy + Fabric (Swift) implementations
- **Full TypeScript** -- Strict types for all props and events, zero `any`
- **SF Symbols support** -- All icon/image props accept SF Symbol names
- **Android compatible** -- Graceful no-op fallback on Android (empty views)
- **Platform-aware wrappers** -- `PlatformIOSTabBar` renders the native tab bar on iOS and `fallback`/`null` elsewhere
- **Imperative APIs** -- `IOSAlert.show()` returns Promise for alert/action sheet

## Installation

```bash
npm install rn-ios-native-components
# or
yarn add rn-ios-native-components
```

### iOS Setup

Add to your `ios/Podfile`:

```ruby
pod 'rn-ios-native-components', :path => '../node_modules/rn-ios-native-components'
```

Then run:

```bash
cd ios && pod install && cd ..
```

## Quick Start

```tsx
import {
  IOSButton,
  IOSSwitch,
  IOSSlider,
  IOSDatePicker,
  IOSSegmentedControl,
  IOSAlert,
  // ... import any component
} from 'rn-ios-native-components';

// Declarative components
<IOSButton title="Confirm" tintColor="#007AFF" onPress={handleConfirm} />
<IOSSwitch value={isEnabled} onValueChange={(e) => setEnabled(e.nativeEvent.value)} />
<IOSSlider value={volume} onSlidingComplete={(e) => saveVolume(e.nativeEvent.value)} />
<IOSDatePicker mode="date" locale="en_US" onDateChange={(e) => setDate(e.nativeEvent.date)} />

// Imperative API
await IOSAlert.show({
  title: 'Choose Photo Source',
  style: 'actionSheet',
  actions: [
    { title: 'Camera', icon: { systemName: 'camera' } },
    { title: 'Photo Library', icon: { systemName: 'photo.on.rectangle' } },
    { title: 'Cancel', style: 'cancel' },
  ],
});
```

## Components Reference

### Controls

| Component | UIKit Class | Description |
|-----------|------------|-------------|
| `IOSButton` | `UIButton` | System/custom button with SF Symbols |
| `IOSSwitch` | `UISwitch` | Toggle switch with custom colors |
| `IOSSlider` | `UISlider` | Continuous/discrete slider control |
| `IOSStepper` | `UIStepper` | Increment/decrement stepper |
| `IOSSegmentedControl` | `UISegmentedControl` | Multi-segment selector |

### Selection & Input

| Component | UIKit Class | Description |
|-----------|------------|-------------|
| `IOSDatePicker` | `UIDatePicker` | Date/time/countdown picker |
| `IOSPicker` | `UIPickerView` | Custom wheel picker |
| `IOSTextField` | `UITextField` | Text input field |
| `IOSColorWell` | `UIColorWell` | System color picker (iOS 14+) |
| `IOSPageControl` | `UIPageControl` | Page indicator dots |

### Status & Progress

| Component | UIKit Class | Description |
|-----------|------------|-------------|
| `IOSProgressView` | `UIProgressView` | Linear progress bar |
| `IOSActivityIndicator` | `UIActivityIndicatorView` | Spinning loading indicator |
| `IOSPullToRefresh` | `UIRefreshControl` | Pull-to-refresh control |
| `IOSBadge` | Custom View | Number/text badge overlay |

### Display & Content

| Component | UIKit Class | Description |
|-----------|------------|-------------|
| `IOSLabel` | `UILabel` | Native text label |
| `IOSImageView` | `UIImageView` | Image display with content modes |
| `IOSShapeView` | `UIView` | Shape container (rect/circle/capsule) |
| `IOSWebView` | `WKWebView` | Web content renderer |

### Layout & Scroll

| Component | UIKit Class | Description |
|-----------|------------|-------------|
| `IOSScrollView` | `UIScrollView` | Scrollable container |
| `IOSCollectionView` | `UICollectionView` | Grid/list layout view |

### Navigation & Search

| Component | UIKit Class | Description |
|-----------|------------|-------------|
| `IOSNavigationBar` | `UINavigationBar` | Navigation bar with items |
| `IOSTabBar` | `UITabBar` | Tab bar with badges |
| `PlatformIOSTabBar` | `UITabBar` / fallback | Native tab bar on iOS, fallback or `null` elsewhere |
| `IOSSearchBar` | `UISearchBar` | Search input with scope buttons |
| `IOSToolbar` | `UIToolbar` | Toolbar with flexible space |

### Menus & Actions

| Component | UIKit Class | Description |
|-----------|------------|-------------|
| `IOSAlert` | `UIAlertController` | Alert dialog / action sheet (imperative) |
| `IOSContextMenu` | `UIMenu` | Long-press context menu |
| `IOSTooltip` | `UITooltipInteraction` | Tooltip popover |

## Detailed Usage Examples

### IOSButton

```tsx
<IOSButton
  title="Submit"
  type="system"
  sizeStyle="large"
  tintColor="#007AFF"
  backgroundColor="#F2F2F7"
  onPress={(e) => console.log('Pressed at', e.nativeEvent.timestamp)}
/>
```

### IOSSlider

```tsx
<IOSSlider
  value={0.6}
  minimumValue={0}
  maximumValue={1}
  step={0}                    // 0 = continuous
  minimumTrackTintColor="#007AFF"
  thumbTintColor="#FFFFFF"
  onValueChange={(e) => setPreview(e.nativeEvent.value)}
  onSlidingComplete={(e) => save(e.nativeEvent.value)}
/>
```

### IOSDatePicker

```tsx
// Date picker
<IOSDatePicker
  mode="date"
  pickerStyle="compact"      // "wheels" | "compact" | "inline"
  locale="en_US"
  minimumDate="2024-01-01T00:00:00.000Z"
  maximumDate="2025-12-31T23:59:59.999Z"
  onDateChange={(e) => setSelected(e.nativeEvent.date)}
/>

// Time picker
<IOSDatePicker
  mode="time"
  pickerStyle="wheels"
  minuteInterval={5}
/>
```

### IOSAlert (Imperative)

```tsx
// Simple alert
const result = await IOSAlert.show({
  title: 'Delete Item',
  message: 'This action cannot be undone.',
  actions: [
    { title: 'Cancel', style: 'cancel' },
    { title: 'Delete', style: 'destructive' },
  ],
});

// Action sheet with icons
await IOSAlert.show({
  style: 'actionSheet',
  actions: [
    { title: 'Camera', icon: { systemName: 'camera' }, onPress: () => openCamera() },
    { title: 'Library', icon: { systemName: 'photo.on.rectangle' }, onPress: () => openLibrary() },
    { title: 'Cancel', style: 'cancel' },
  ],
});

// Alert with text input
const result = await IOSAlert.show({
  title: 'Rename',
  textFields: [{ placeholder: 'Enter new name', defaultValue: currentName }],
  actions: [
    { title: 'Cancel', style: 'cancel' },
    { title: 'Save', onPress: () => {} },
  ],
});
console.log(result.textFieldValues?.[0]); // user-entered text
```

### IOSTabBar

```tsx
<IOSTabBar
  items={[
    { title: 'Home', icon: { systemName: 'house.fill' } },
    { title: 'Messages', icon: { systemName: 'bubble.left.fill' }, badge: 12 },
    { title: 'Profile', icon: { systemName: 'person.circle.fill' } },
  ]}
  selectedIndex={0}
  tintColor="#007AFF"
  onTabChange={(e) => navigateToTab(e.nativeEvent.selectedIndex)}
/>
```

### PlatformIOSTabBar

Use `PlatformIOSTabBar` when the same screen can render on non-iOS platforms. It renders the native `IOSTabBar` on iOS. On other platforms it returns `fallback`, or `null` when no fallback is provided.

```tsx
<PlatformIOSTabBar
  items={[
    { title: 'Home', icon: { systemName: 'house.fill' } },
    { title: 'Messages', icon: { systemName: 'bubble.left.fill' }, badge: 12 },
    { title: 'Profile', icon: { systemName: 'person.circle.fill' } },
  ]}
  selectedIndex={tabIndex}
  tintColor="#007AFF"
  onTabChange={(e) => setTabIndex(e.nativeEvent.selectedIndex)}
  fallback={<AndroidTabBar selectedIndex={tabIndex} onChange={setTabIndex} />}
/>
```

### IOSWebView

```tsx
<IOSWebView
  source={{ url: 'https://example.com' }}
  javaScriptEnabled
  showsScrollIndicator
  onLoadEnd={() => console.log('loaded')}
  onMessage={(data) => handleWebMessage(data)}
/>
```

## Architecture

```
src/
  index.ts                  # Main entry - exports all components + types
  ExampleApp.tsx            # Demo app showcasing every component
  types/
    common.ts               # Shared enums, events, base props
    components.ts           # Per-component prop interfaces
  components/
    IOSButton.tsx           # requireNativeComponent wrapper
    IOSSwitch.tsx
    ... (30 component files)
ios/
  RNIOSNativeComponents/
    RNIOSNativeComponentsViews.h     # UIView subclasses
    RNIOSNativeComponentsManager.m   # Legacy RCTViewManagers
    RNIOSNativeComponentsFabric.swift        # Fabric Views
    RNIOSNativeComponentsFabricManager.swift # Fabric Managers
    RNIOSAlertModule.m                      # Alert NativeModule
    RNIOSContextMenuModule.m                # ContextMenu NativeModule
android/
  src/main/java/com/rniosnativecomponents/  # No-op stubs for Android
```

## Requirements

- iOS 13.0+
- React Native >= 0.68
- Xcode 15+

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute.

## License

MIT

---

# rn-ios-native-components

[![npm 版本](https://img.shields.io/npm/v/rn-ios-native-components.svg)](https://www.npmjs.com/package/rn-ios-native-components)
[![许可证](https://img.shields.io/npm/l/rn-ios-native-components.svg)](https://github.com/yourname/rn-ios-native-components/blob/main/LICENSE)
[![平台](https://img.shields.io/badge/平台-iOS%20%7C%20Android-blue.svg)](https://github.com/yourname/rn-ios-native-components)

**React Native 中可用的全部 iOS 原生 UIKit/HIG 组件。**

一个全面的库，将每个主要的 iOS UIKit 组件封装为 React Native 组件。同时支持**旧架构（RCTViewManager）**和**新架构（Fabric）**。

## 特性

- **28+ 个 iOS 原生组件** -- Button、Switch、Slider、Stepper、ProgressView、ActivityIndicator、DatePicker、Picker、SearchBar、SegmentedControl、PageControl、Badge、PullToRefresh、TabBar、NavigationBar、Toolbar、Alert、ActionSheet、ContextMenu、Tooltip、TextField、ColorWell、Label、ImageView、ShapeView、ScrollView、CollectionView、WebView
- **双架构支持** -- 旧架构 + 新架构（Swift）实现
- **完整 TypeScript** -- 所有 Props 和事件都有严格类型，零 `any`
- **SF Symbols 支持** -- 所有图标/图片属性接受 SF Symbols 名称
- **Android 兼容** -- 在 Android 上优雅降级（空视图）
- **平台感知包装组件** -- `PlatformIOSTabBar` 在 iOS 上渲染原生标签栏，在其他平台渲染 `fallback` 或 `null`
- **命令式 API** -- `IOSAlert.show()` 返回 Promise，支持 Alert/ActionSheet

## 安装

```bash
npm install rn-ios-native-components
# 或
yarn add rn-ios-native-components
```

### iOS 配置

在 `ios/Podfile` 中添加：

```ruby
pod 'rn-ios-native-components', :path => '../node_modules/rn-ios-native-components'
```

然后运行：

```bash
cd ios && pod install && cd ..
```

## 快速开始

```tsx
import {
  IOSButton,
  IOSSwitch,
  IOSSlider,
  IOSDatePicker,
  IOSSegmentedControl,
  IOSAlert,
  // ... 导入任意组件
} from 'rn-ios-native-components';

// 声明式组件
<IOSButton title="确认" tintColor="#007AFF" onPress={handleConfirm} />
<IOSSwitch value={isEnabled} onValueChange={(e) => setEnabled(e.nativeEvent.value)} />
<IOSSlider value={volume} onSlidingComplete={(e) => saveVolume(e.nativeEvent.value)} />
<IOSDatePicker mode="date" locale="zh_CN" onDateChange={(e) => setDate(e.nativeEvent.date)} />

// 命令式 API
await IOSAlert.show({
  title: '选择图片来源',
  style: 'actionSheet',
  actions: [
    { title: '拍照', icon: { systemName: 'camera' } },
    { title: '相册', icon: { systemName: 'photo.on.rectangle' } },
    { title: '取消', style: 'cancel' },
  ],
});
```

## 组件列表

### 控件（Controls）

| 组件 | UIKit 类 | 说明 |
|------|---------|------|
| `IOSButton` | `UIButton` | 系统按钮，支持 SF Symbols |
| `IOSSwitch` | `UISwitch` | 开关控件，自定义颜色 |
| `IOSSlider` | `UISlider` | 滑块控件 |
| `IOSStepper` | `UIStepper` | 步进器 |
| `IOSSegmentedControl` | `UISegmentedControl` | 分段选择器 |

### 选择与输入（Selection & Input）

| 组件 | UIKit 类 | 说明 |
|------|---------|------|
| `IOSDatePicker` | `UIDatePicker` | 日期/时间选择器 |
| `IOSPicker` | `UIPickerView` | 自定义滚轮选择器 |
| `IOSTextField` | `UITextField` | 文本输入框 |
| `IOSColorWell` | `UIColorWell` | 系统颜色选择器（iOS 14+） |
| `IOSPageControl` | `UIPageControl` | 页面指示器 |

### 状态与进度（Status & Progress）

| 组件 | UIKit 类 | 说明 |
|------|---------|------|
| `IOSProgressView` | `UIProgressView` | 进度条 |
| `IOSActivityIndicator` | `UIActivityIndicatorView` | 加载指示器 |
| `IOSPullToRefresh` | `UIRefreshControl` | 下拉刷新 |
| `IOSBadge` | 自定义 View | 数字/文字角标 |

### 展示与内容（Display & Content）

| 组件 | UIKit 类 | 说明 |
|------|---------|------|
| `IOSLabel` | `UILabel` | 原生文本标签 |
| `IOSImageView` | `UIImageView` | 图片展示 |
| `IOSShapeView` | `UIView` | 形状容器（矩形/圆形/胶囊形） |
| `IOSWebView` | `WKWebView` | 网页内容渲染 |

### 布局与滚动（Layout & Scroll）

| 组件 | UIKit 类 | 说明 |
|------|---------|------|
| `IOSScrollView` | `UIScrollView` | 滚动容器 |
| `IOSCollectionView` | `UICollectionView` | 网格/列表布局 |

### 导航与搜索（Navigation & Search）

| 组件 | UIKit 类 | 说明 |
|------|---------|------|
| `IOSNavigationBar` | `UINavigationBar` | 导航栏 |
| `IOSTabBar` | `UITabBar` | 标签栏 |
| `PlatformIOSTabBar` | `UITabBar` / fallback | iOS 使用原生标签栏，其他平台使用 fallback 或 `null` |
| `IOSSearchBar` | `UISearchBar` | 搜索栏 |
| `IOSToolbar` | `UIToolbar` | 工具栏 |

### 菜单与操作（Menus & Actions）

| 组件 | UIKit 类 | 说明 |
|------|---------|------|
| `IOSAlert` | `UIAlertController` | 警告框 / 操作表（命令式） |
| `IOSContextMenu` | `UIMenu` | 长按菜单 |
| `IOSTooltip` | `UITooltipInteraction` | 提示气泡 |

## 详细用法示例

### IOSButton

```tsx
<IOSButton
  title="提交"
  type="system"
  sizeStyle="large"
  tintColor="#007AFF"
  onPress={(e) => console.log('点击时间戳:', e.nativeEvent.timestamp)}
/>
```

### IOSSlider

```tsx
<IOSSlider
  value={0.6}
  minimumValue={0}
  maximumValue={1}
  minimumTrackTintColor="#007AFF"
  thumbTintColor="#FFFFFF"
  onValueChange={(e) => setPreview(e.nativeEvent.value)}
  onSlidingComplete={(e) => save(e.nativeEvent.value)}
/>
```

### IOSDatePicker

```tsx
<IOSDatePicker
  mode="date"
  pickerStyle="wheels"
  locale="zh_CN"
  onDateChange={(e) => setSelected(e.nativeEvent.date)}
/>
```

### IOSAlert（命令式）

```tsx
// 简单提示
await IOSAlert.show({
  title: '提示',
  message: '操作成功！',
  actions: [{ title: '确定' }],
});

// 操作表（带图标）
await IOSAlert.show({
  style: 'actionSheet',
  actions: [
    { title: '拍照', icon: { systemName: 'camera' } },
    { title: '相册', icon: { systemName: 'photo.on.rectangle' } },
    { title: '取消', style: 'cancel' },
  ],
});

// 带文本输入的对话框
const result = await IOSAlert.show({
  title: '重命名',
  textFields: [{ placeholder: '请输入新名称', defaultValue: currentName }],
  actions: [
    { title: '取消', style: 'cancel' },
    { title: '保存' },
  ],
});
console.log(result.textFieldValues?.[0]); // 用户输入的文本
```

### PlatformIOSTabBar

当同一个页面需要运行在非 iOS 平台时，可以使用 `PlatformIOSTabBar`。它在 iOS 上渲染原生 `IOSTabBar`，其他平台渲染 `fallback`，未传 `fallback` 时返回 `null`。

```tsx
<PlatformIOSTabBar
  items={[
    { title: '首页', icon: { systemName: 'house.fill' } },
    { title: '消息', icon: { systemName: 'bubble.left.fill' }, badge: 12 },
    { title: '我的', icon: { systemName: 'person.circle.fill' } },
  ]}
  selectedIndex={tabIndex}
  tintColor="#007AFF"
  onTabChange={(e) => setTabIndex(e.nativeEvent.selectedIndex)}
  fallback={<AndroidTabBar selectedIndex={tabIndex} onChange={setTabIndex} />}
/>
```

## 架构说明

```
src/
  index.ts                  # 主入口 - 导出所有组件和类型
  ExampleApp.tsx            # 演示 App，展示所有组件
  types/
    common.ts               # 公共枚举、事件、基础 Props
    components.ts           # 各组件的 Props 接口
  components/
    IOSButton.tsx           # requireNativeComponent 封装
    IOSSwitch.tsx
    ... (30 个组件文件)
ios/
  RNIOSNativeComponents/
    RNIOSNativeComponentsViews.h     # UIView 子类
    RNIOSNativeComponentsManager.m   # 旧架构 RCTViewManager
    RNIOSNativeComponentsFabric.swift        # Fabric 视图
    RNIOSNativeComponentsFabricManager.swift # Fabric Manager
    RNIOSAlertModule.m                      # Alert 原生模块
    RNIOSContextMenuModule.m                # ContextMenu 原生模块
android/
  src/main/java/com/rniosnativecomponents/  # Android 空壳实现
```

## 要求

- iOS 13.0+
- React Native >= 0.68
- Xcode 15+

## 贡献

查看 [贡献指南](CONTRIBUTING.md) 了解如何参与贡献。

## 许可证

MIT

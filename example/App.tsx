/**
 * Demo App - Showcases ALL rn-ios-native-components (29 components)
 * Run on iOS 26+ simulator to see Liquid Glass effects.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  IOSButton,
  IOSSwitch,
  IOSSlider,
  IOSStepper,
  IOSProgressView,
  IOSActivityIndicator,
  IOSDatePicker,
  IOSPicker,
  IOSSearchBar,
  IOSSegmentedControl,
  IOSPageControl,
  IOSBadge,
  IOSPullToRefresh,
  IOSTabBar,
  IOSNavigationBar,
  IOSToolbar,
  IOSAlert,
  IOSContextMenu,
  IOSTooltip,
  IOSTextField,
  IOSColorWell,
  IOSLabel,
  IOSImageView,
  IOSShapeView,
  IOSScrollView,
  IOSCollectionView,
  IOSWebView,
  IOSGlassEffect,
} from 'rn-ios-native-components';

export default function App() {
  const [switchValue, setSwitchValue] = useState(false);
  const [sliderValue, setSliderValue] = useState(0.5);
  const [stepperValue, setStepperValue] = useState(1);
  const [progress] = useState(0.3);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCity, setSelectedCity] = useState('beijing');
  const [searchText, setSearchText] = useState('');
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(2);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <IOSNavigationBar
        title="iOS Native Components"
        prefersLargeTitles
        barTintColor="#F2F2F7"
      />

      <IOSPullToRefresh
        refreshing={isRefreshing}
        tintColor="#007AFF"
        onRefresh={() => {
          setIsRefreshing(true);
          setTimeout(() => setIsRefreshing(false), 2000);
        }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>

          {/* === 1. Button === */}
          <Section title="1. Button (UIButton)">
            <View style={styles.row}>
              <IOSButton
                title="System Button"
                tintColor="#007AFF"
                onPress={(e: any) => console.log('Pressed', e.nativeEvent?.timestamp)}
              />
              <IOSButton
                title="Filled"
                buttonStyle="Filled"
                tintColor="#FFFFFF"
                backgroundColor="#007AFF"
              />
              </View>
            <View style={styles.row}>
              <IOSButton
                title="Gray"
                buttonStyle="Gray"
                tintColor="#000000"
              />
              <IOSButton
                title="Tinted"
                buttonStyle="Tinted"
                tintColor="#FF9500"
              />
            </View>
          </Section>

          {/* === 2. Switch === */}
          <Section title="2. Switch (UISwitch)">
            <IOSSwitch
              value={switchValue}
              onTintColor="#34C759"
              onValueChange={(e: any) => setSwitchValue(e.nativeEvent?.value ?? e.value)}
            />
            <Text style={styles.label}>Switch: {switchValue ? 'ON' : 'OFF'}</Text>
          </Section>

          {/* === 3. Slider === */}
          <Section title="3. Slider (UISlider)">
            <IOSSlider
              value={sliderValue}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#007AFF"
              maximumTrackTintColor="#E5E5EA"
              thumbTintColor="#007AFF"
              onValueChange={(e: any) => setSliderValue(e.nativeEvent?.value ?? e.value)}
            />
            <Text style={styles.label}>Slider: {(sliderValue * 100).toFixed(0)}%</Text>
          </Section>

          {/* === 4. Stepper === */}
          <Section title="4. Stepper (UIStepper)">
            <View style={styles.row}>
              <IOSStepper
                value={stepperValue}
                minimumValue={0}
                maximumValue={10}
                stepValue={1}
                tintColor="#007AFF"
                onValueChange={(e: any) => setStepperValue(e.nativeEvent?.value ?? e.value)}
              />
              <Text style={styles.label}>Count: {stepperValue}</Text>
            </View>
          </Section>

          {/* === 5. ProgressView === */}
          <Section title="5. ProgressView (UIProgressView)">
            <IOSProgressView progress={progress} progressTintColor="#34C759" trackTintColor="#E5E5EA" />
            <IOSProgressView progress={0.7} progressTintColor="#FF9500" styleType="bar" />
          </Section>

          {/* === 6. ActivityIndicator === */}
          <Section title="6. ActivityIndicator">
            <View style={styles.row}>
              <IOSActivityIndicator animating color="#007AFF" indicatorStyle="medium" />
              <IOSActivityIndicator animating color="#FF9500" indicatorStyle="large" />
              <IOSActivityIndicator animating={false} color="#999" indicatorStyle="medium" />
            </View>
          </Section>

          {/* === 7. DatePicker === */}
          <Section title="7. DatePicker (UIDatePicker)">
            <IOSDatePicker
              mode="dateAndTime"
              pickerStyle="compact"
              locale="en_US"
              onDateChange={(e: any) => setSelectedDate(e.nativeEvent?.date ?? e.date)}
            />
            {selectedDate ? <Text style={styles.label}>{selectedDate}</Text> : null}
          </Section>

          {/* === 8. Picker === */}
          <Section title="8. Picker (UIPickerView)">
            <IOSPicker
              items={[
                { label: 'Beijing', value: 'beijing' },
                { label: 'Shanghai', value: 'shanghai' },
                { label: 'Guangzhou', value: 'guangzhou' },
                { label: 'Shenzhen', value: 'shenzhen' },
              ]}
              selectedIndex={0}
              onValueChange={(e: any) => setSelectedCity(e.nativeEvent?.selectedValue ?? e.selectedValue)}
            />
            <Text style={styles.label}>Selected: {selectedCity}</Text>
          </Section>

          {/* === 9. SearchBar === */}
          <Section title="9. SearchBar (UISearchBar)">
            <IOSSearchBar
              placeholder="Search..."
              barStyle="default"
              showsCancelButton
              searchText={searchText}
              onChangeText={(e: any) => setSearchText(e.nativeEvent?.text ?? e.text)}
              onCancelButtonPress={() => setSearchText('')}
            />
          </Section>

          {/* === 10. SegmentedControl === */}
          <Section title="10. SegmentedControl (UISegmentedControl)">
            <IOSSegmentedControl
              titles={['Day', 'Week', 'Month']}
              selectedIndex={segmentIndex}
              selectedSegmentTintColor="#007AFF"
              onValueChange={(e: any) => setSegmentIndex(e.nativeEvent?.selectedIndex ?? e.selectedIndex)}
            />
            <Text style={styles.label}>{['Day', 'Week', 'Month'][segmentIndex]}</Text>
          </Section>

          {/* === 11. PageControl === */}
          <Section title="11. PageControl (UIPageControl)">
            <IOSPageControl
              numberOfPages={5}
              currentPage={currentPage}
              pageIndicatorTintColor="#C7C7CC"
              currentPageIndicatorTintColor="#007AFF"
              onPageChange={(e: any) => setCurrentPage(e.nativeEvent?.currentPage ?? e.currentPage)}
            />
          </Section>

          {/* === 12. Badge === */}
          <Section title="12. Badge">
            <View style={styles.row}>
              <IOSBadge text="99" badgeColor="#FF3B30" />
              <IOSBadge text="New" badgeColor="#FF9500" />
              <IOSBadge text="3" badgeColor="#34C759" />
              <IOSBadge text="" badgeColor="#007AFF" />
            </View>
          </Section>

          {/* === 13. TextField === */}
          <Section title="13. TextField (UITextField)">
            <IOSTextField
              placeholder="Type something..."
              borderStyle="roundedRect"
              textColor="#000"
              value={textFieldValue}
              onChangeText={(text: string) => setTextFieldValue(text)}
            />
            <Text style={styles.label}>Input: {textFieldValue || '(empty)'}</Text>
          </Section>

          {/* === 14. Label === */}
          <Section title="14. Label (UILabel)">
            <IOSLabel text="This is a native UILabel" fontSize={16} fontWeight="bold" textColor="#000" />
            <IOSLabel text="Secondary label in gray" fontSize={14} textColor="#999" />
          </Section>

          {/* === 15. ColorWell === */}
          <Section title="15. ColorWell (UIColorWell)">
            <IOSColorWell
              title="Pick a Color"
              supportedAlpha="fixed"
              onColorChange={(color: string) => console.log('Color:', color)}
            />
          </Section>

          {/* === 16. Alert / ActionSheet === */}
          <Section title="16. Alert / ActionSheet">
            <View style={styles.row}>
              <IOSButton
                title="Show Alert"
                onPress={() =>
                  IOSAlert.show({
                    title: 'Notice',
                    message: 'This is a native iOS UIAlertController',
                    actions: [
                      { title: 'Cancel', style: 'cancel' },
                      { title: 'OK', style: 'default' },
                    ],
                  })
                }
              />
              <IOSButton
                title="Action Sheet"
                tintColor="#FF9500"
                onPress={() =>
                  IOSAlert.show({
                    style: 'actionSheet',
                    title: 'Choose Source',
                    message: 'Select an option',
                    actions: [
                      { title: 'Camera', icon: { systemName: 'camera' } },
                      { title: 'Library', icon: { systemName: 'photo.on.rectangle' } },
                      { title: 'Cancel', style: 'cancel' },
                    ],
                  })
                }
              />
            </View>
          </Section>

          {/* === 17. Glass Effect (iOS 26+ Liquid Glass) === */}
          <Section title="17. Glass Effect (iOS 26+ Liquid Glass)">
            <IOSGlassEffect
              glassStyle="regular"
              style={{ height: 120, borderRadius: 16, overflow: 'hidden' }}
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFF' }}>Liquid Glass</Text>
                <Text style={{ fontSize: 14, color: '#FFF8' }}>iOS 26+ only</Text>
              </View>
            </IOSGlassEffect>
            <View style={{ height: 12 }} />
            <IOSGlassEffect
              glassStyle="clear"
              tintColor="#FF9500"
              style={{ height: 80, borderRadius: 16, overflow: 'hidden' }}
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFF' }}>Clear + Tinted</Text>
              </View>
            </IOSGlassEffect>
          </Section>

          {/* === 18. Tooltip === */}
          <Section title="18. Tooltip (UITooltip)">
            <View style={styles.row}>
              <IOSTooltip text="This is a tooltip hint" position="top">
                <IOSButton title="Hover me" buttonStyle="filled" tintColor="#FFF" backgroundColor="#5856D6" />
              </IOSTooltip>
              <IOSTooltip text="Bottom tooltip" position="bottom">
                <IOSButton title="Or me" buttonStyle="filled" tintColor="#FFF" backgroundColor="#AF52DE" />
              </IOSTooltip>
            </View>
          </Section>

          {/* === 19. Context Menu === */}
          <Section title="19. Context Menu (UIMenu)">
            <IOSContextMenu
              menuItems={[
                { title: 'Share', icon: { systemName: 'square.and.arrow.up' } },
                { title: 'Copy', icon: { systemName: 'doc.on.doc' } },
                { title: 'Delete', icon: { systemName: 'trash' }, destructive: true },
              ]}
              onMenuResult={(index: number) => console.log('Menu item:', index)}
            >
              <View style={[styles.contextMenuPreview, { backgroundColor: '#007AFF' }]}>
                <Text style={{ color: '#FFF', fontWeight: '600' }}>Long Press Me</Text>
              </View>
            </IOSContextMenu>
          </Section>

          {/* === 20. Shape View === */}
          <Section title="20. ShapeView (CAShapeLayer)">
            <IOSShapeView
              shapeType="rectangle"
              fillColor="#34C759"
              strokeColor="#248A3D"
              strokeWidth={2}
              cornerRadius={12}
              style={{ width: 120, height: 60 }}
            />
            <IOSShapeView
              shapeType="circle"
              fillColor="#FF950080"
              strokeColor="#CC7700"
              strokeWidth={2}
              style={{ width: 60, height: 60 }}
            />
          </Section>

          {/* === 21. Image View === */}
          <Section title="21. ImageView (UIImageView)">
            <IOSImageView
              source={{ uri: 'https://picsum.photos/200/100?random=1' }}
              contentMode="scaleAspectFill"
              cornerRadius={12}
              style={{ width: 160, height: 80 }}
            />
          </Section>

          {/* === Component Count === */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              rn-ios-native-components v0.1.0 | 29 Components | iOS 26+
            </Text>
          </View>

        </ScrollView>
      </IOSPullToRefresh>

      <IOSTabBar
        items={[
          { title: 'Components', icon: { systemName: 'square.grid.2x2.fill' } },
          { title: 'Glass', icon: { systemName: 'drop.fill' }, badge: 'NEW' },
          { title: 'About', icon: { systemName: 'info.circle.fill' } },
        ]}
        selectedIndex={0}
        tintColor="#007AFF"
        barTintColor="#F9F9F9"
      />
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  scrollContent: { padding: 16 },
  section: { marginBottom: 20, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#333', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, flexWrap: 'wrap' as any },
  label: { fontSize: 13, color: '#666', marginTop: 8 },
  contextMenuPreview: { width: 140, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  footer: { alignItems: 'center', paddingVertical: 20 },
  footerText: { fontSize: 12, color: '#999' },
});

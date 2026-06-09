/**
 * Example usage of rn-ios-native-components
 *
 * This file demonstrates how to use all 20+ iOS native components
 * in a React Native application.
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
} from '../src';

export default function ExampleApp() {
  // ─── State ──────────────────────────────────────────────────────────────
  const [switchValue, setSwitchValue] = useState(false);
  const [sliderValue, setSliderValue] = useState(0.5);
  const [stepperValue, setStepperValue] = useState(1);
  const [progress, _setProgress] = useState(0.3);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCity, setSelectedCity] = useState('beijing');
  const [searchText, setSearchText] = useState('');
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(2);
  const [isRefreshing, setIsRefreshing] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <IOSNavigationBar
        title="iOS Native Components Demo"
        prefersLargeTitles
        barTintColor="#F2F2F7"
      />

      <IOSPullToRefresh
        refreshing={isRefreshing}
        tintColor="#007AFF"
        title="Pull to Refresh"
        onRefresh={() => {
          setIsRefreshing(true);
          setTimeout(() => setIsRefreshing(false), 2000);
        }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>

          {/* ─── Section: Button ─────────────────────────────────────── */}
          <Section title="Button (UIButton)">
            <View style={styles.row}>
              <IOSButton
                title="System Button"
                tintColor="#007AFF"
                onPress={(e) => console.log('Pressed at', (e as any).nativeEvent?.timestamp ?? (e as any).timestamp)}
              />
              <IOSButton
                title="Delete"
                type={"destructive" as any}
                sizeStyle="Large"
              />
            </View>
            <IOSButton
              title="With Icon"
              icon={{ systemName: 'star.fill' }}
              backgroundColor="#FF9500"
            />
          </Section>

          {/* ─── Section: Switch ─────────────────────────────────────── */}
          <Section title="Switch (UISwitch)">
            <IOSSwitch
              value={switchValue}
              onTintColor="#34C759"
              onValueChange={(e: any) => setSwitchValue(e.nativeEvent?.value ?? e.value)}
            />
            <Text style={styles.label}>Switch: {switchValue ? 'ON' : 'OFF'}</Text>
          </Section>

          {/* ─── Section: Slider ─────────────────────────────────────── */}
          <Section title="Slider (UISlider)">
            <IOSSlider
              value={sliderValue}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#007AFF"
              maximumTrackTintColor="#E5E5EA"
              thumbTintColor="#FFFFFF"
              onValueChange={(e: any) => setSliderValue(e.nativeEvent?.value ?? e.value)}
              onSlidingComplete={(e: any) => console.log('Final:', e.nativeEvent?.value ?? e.value)}
            />
            <Text style={styles.label}>Slider Value: {sliderValue.toFixed(2)}</Text>
          </Section>

          {/* ─── Section: Stepper ─────────────────────────────────────── */}
          <Section title="Stepper (UIStepper)">
            <IOSStepper
              value={stepperValue}
              minimumValue={0}
              maximumValue={10}
              stepValue={1}
              tintColor="#007AFF"
              onValueChange={(e: any) => setStepperValue(e.nativeEvent?.value ?? e.value)}
            />
            <Text style={styles.label}>Count: {stepperValue}</Text>
          </Section>

          {/* ─── Section: ProgressView ───────────────────────────────── */}
          <Section title="ProgressView (UIProgressView)">
            <IOSProgressView
              progress={progress}
              progressTintColor="#34C759"
              trackTintColor="#E5E5EA"
              animated
            />
            <IOSProgressView
              progress={0.7}
              progressTintColor="#FF9500"
              styleType="Bar"
            />
          </Section>

          {/* ─── Section: ActivityIndicator ──────────────────────────── */}
          <Section title="ActivityIndicator (UIActivityIndicatorView)">
            <IOSActivityIndicator animating color="#007AFF" indicatorStyle="Medium" />
            <IOSActivityIndicator animating color="#FF9500" indicatorStyle="Large" />
            <IOSActivityIndicator animating={false} hidesWhenStopped />
          </Section>

          {/* ─── Section: DatePicker ─────────────────────────────────── */}
          <Section title="DatePicker (UIDatePicker)">
            <IOSDatePicker
              mode="Date"
              pickerStyle="Compact"
              locale="zh_CN"
              onDateChange={(e: any) => setSelectedDate(e.nativeEvent?.date ?? e.date)}
            />
            {selectedDate ? <Text style={styles.label}>Selected Date: {selectedDate}</Text> : null}
          </Section>

          {/* ─── Section: Picker (UIPickerView) ───────────────────────── */}
          <Section title="Picker (UIPickerView)">
            <IOSPicker
              items={[
                { label: 'Beijing', value: 'beijing' },
                { label: 'Shanghai', value: 'shanghai' },
                { label: 'Guangzhou', value: 'guangzhou' },
                { label: 'Shenzhen', value: 'shenzhen' },
              ]}
              selectedIndex={0}
              textColor="#333"
              onValueChange={(e: any) => setSelectedCity(e.nativeEvent?.selectedValue ?? e.selectedValue)}
            />
            <Text style={styles.label}>Selected City: {selectedCity}</Text>
          </Section>

          {/* ─── Section: SearchBar ──────────────────────────────────── */}
          <Section title="SearchBar (UISearchBar)">
            <IOSSearchBar
              placeholder="Search..."
              barStyle="Minimal"
              showsCancelButton
              value={searchText}
              onChangeText={(e: any) => setSearchText(e.nativeEvent?.text ?? e.text)}
              onSearchButtonPress={(e: any) => console.log('Search:', e.nativeEvent?.text ?? e.text)}
              onCancelButtonPress={() => setSearchText('')}
            />
          </Section>

          {/* ─── Section: SegmentedControl ───────────────────────────── */}
          <Section title="SegmentedControl (UISegmentedControl)">
            <IOSSegmentedControl
              titles={['Day', 'Week', 'Month']}
              selectedIndex={segmentIndex}
              selectedSegmentTintColor="#007AFF"
              onValueChange={(e: any) => setSegmentIndex(e.nativeEvent?.selectedIndex ?? e.selectedIndex)}
            />
            <Text style={styles.label}>Current Selection: {['Day', 'Week', 'Month'][segmentIndex]}</Text>
          </Section>

          {/* ─── Section: PageControl ───────────────────────────────── */}
          <Section title="PageControl (UIPageControl)">
            <IOSPageControl
              numberOfPages={5}
              currentPage={currentPage}
              pageIndicatorTintColor="#C7C7CC"
              currentPageIndicatorTintColor="#007AFF"
              onPageChange={(e: any) => setCurrentPage(e.nativeEvent?.currentPage ?? e.currentPage)}
            />
          </Section>

          {/* ─── Section: Badge ──────────────────────────────────────── */}
          <Section title="Badge">
            <View style={styles.row}>
              <IOSBadge text={99} badgeColor="#FF3B30" />
              <IOSBadge text="New" badgeColor="#FF9500" />
              <IOSBadge text={3} badgeColor="#34C759" />
            </View>
          </Section>

          {/* ─── Section: Alert Demo ─────────────────────────────────── */}
          <Section title="Alert / ActionSheet">
            <View style={styles.row}>
              <IOSButton
                title="Show Alert"
                onPress={() =>
                  IOSAlert.show({
                    title: 'Notice',
                    message: 'This is a native iOS Alert',
                    actions: [
                      { title: 'Cancel', style: 'cancel' },
                      { title: 'Confirm', onPress: () => console.log('Confirmed') },
                    ],
                  })
                }
              />
              <IOSButton
                title="Show ActionSheet"
                tintColor="#FF9500"
                onPress={() =>
                  IOSAlert.show({
                    style: 'actionSheet',
                    title: 'Select Action',
                    actions: [
                      { title: 'Camera', icon: { systemName: 'camera' }, onPress: () => {} },
                      { title: 'Photo Library', icon: { systemName: 'photo.on.rectangle' }, onPress: () => {} },
                      { title: 'File', icon: { systemName: 'doc' }, onPress: () => {} },
                      { title: 'Cancel', style: 'cancel' },
                    ],
                  })
                }
              />
            </View>
          </Section>

          {/* ─── Section: Toolbar ────────────────────────────────────── */}
          <Section title="Toolbar (UIToolbar)">
            <IOSToolbar
              items={[
                { icon: { systemName: 'square.and.arrow.up' }, onPress: () => console.log('Share') },
                { systemItem: 'flexibleSpace' as any },
                { icon: { systemName: 'trash' }, onPress: () => console.log('Delete') },
              ]}
              position="bottom"
              barTintColor="#F2F2F7"
            />
          </Section>

        </ScrollView>
      </IOSPullToRefresh>

      <IOSTabBar
        items={[
          { title: 'Home', icon: { systemName: 'house.fill' } },
          { title: 'Messages', icon: { systemName: 'bubble.left.fill' }, badge: 12 },
          { title: 'Profile', icon: { systemName: 'person.circle.fill' } },
        ]}
        selectedIndex={0}
        tintColor="#007AFF"
      />
    </SafeAreaView>
  );
}

// ─── Helper Components ───────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginTop: 8,
  },
});

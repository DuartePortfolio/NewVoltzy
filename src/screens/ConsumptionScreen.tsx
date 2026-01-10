import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop, Ellipse } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/consumptionStyles';
import { PROFILE_PLACEHOLDER } from '../data/mockData';

type AnalysisPeriod = '15min' | '1hour' | 'today' | 'week';

const ConsumptionScreen: React.FC = () => {
  const [consumptionPeriod, setConsumptionPeriod] = useState<AnalysisPeriod>('15min');
  const [energyProductionPeriod, setEnergyProductionPeriod] = useState<AnalysisPeriod>('today');
  const [loadProductionPeriod, setLoadProductionPeriod] = useState<AnalysisPeriod>('today');

  const renderAnalysisPeriodButtons = (
    currentPeriod: AnalysisPeriod,
    onSelect: (period: AnalysisPeriod) => void,
    showWeek: boolean = false
  ) => (
    <View style={styles.periodButtonsContainer}>
      <TouchableOpacity
        style={[
          styles.periodButton,
          currentPeriod === '15min' && styles.periodButtonActive,
        ]}
        onPress={() => onSelect('15min')}
      >
        <Text
          style={[
            styles.periodButtonText,
            currentPeriod === '15min' && styles.periodButtonTextActive,
          ]}
        >
          15 min
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.periodButton,
          currentPeriod === '1hour' && styles.periodButtonActive,
        ]}
        onPress={() => onSelect('1hour')}
      >
        <Text
          style={[
            styles.periodButtonText,
            currentPeriod === '1hour' && styles.periodButtonTextActive,
          ]}
        >
          1 hour
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.periodButton,
          currentPeriod === 'today' && styles.periodButtonActive,
        ]}
        onPress={() => onSelect('today')}
      >
        <Text
          style={[
            styles.periodButtonText,
            currentPeriod === 'today' && styles.periodButtonTextActive,
          ]}
        >
          Today
        </Text>
      </TouchableOpacity>
      {showWeek && (
        <TouchableOpacity
          style={[
            styles.periodButton,
            currentPeriod === 'week' && styles.periodButtonActive,
          ]}
          onPress={() => onSelect('week')}
        >
          <Text
            style={[
              styles.periodButtonText,
              currentPeriod === 'week' && styles.periodButtonTextActive,
            ]}
          >
            Week
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderProgressBar = (label: string, percentage: number) => (
    <View style={styles.progressBarContainer}>
      <Text style={styles.progressBarLabel}>{label}</Text>
      <View style={styles.progressBarWrapper}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
        </View>
      </View>
    </View>
  );

  const renderHeatmapCell = (isActive: boolean, key: string) => (
    <View
      key={key}
      style={[
        styles.heatmapCell,
        isActive ? styles.heatmapCellActive : styles.heatmapCellInactive,
      ]}
    />
  );

  const heatmapData = [
    [false, true, false, true, true, true, false],
    [true, false, false, false, true, false, false],
    [false, false, true, false, true, true, false],
    [false, true, false, true, false, true, true],
    [true, false, false, true, false, false, true],
    [false, false, true, false, true, true, false],
    [false, true, false, true, false, false, true],
    [false, false, true, false, true, true, false],
    [false, true, false, true, false, true, true],
    [true, false, false, true, false, false, true],
    [false, false, true, false, true, true, false],
  ];

  return (
    <LinearGradient colors={['#78B85E', '#1E7B45']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Decorative Blobs Background */}
        <Image
          source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/85397424fb641c93034ee70c57c16c80955ae187?width=1431' }}
          style={styles.blobsBackground}
          resizeMode="cover"
        />

        {/* Glassmorphism Header */}
        <View style={styles.glassHeader}>
          <View style={styles.headerContent}>
            {/* Home Icon */}
            <Svg width={47} height={47} viewBox="0 0 47 47" fill="none">
              <Path
                d="M17.625 43.0832V23.4998H29.375V43.0832M5.875 17.6248L23.5 3.9165L41.125 17.6248V39.1665C41.125 40.2053 40.7124 41.2015 39.9778 41.936C39.2433 42.6705 38.2471 43.0832 37.2083 43.0832H9.79167C8.7529 43.0832 7.75668 42.6705 7.02216 41.936C6.28765 41.2015 5.875 40.2053 5.875 39.1665V17.6248Z"
                stroke="#F3F3F3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>

            {/* Title Section */}
            <View style={styles.titleContainer}>
              <Text style={styles.headerTitle}>Consumption</Text>
              <View style={styles.divider} />
            </View>

            {/* Profile Picture */}
            <View style={styles.profilePicture}>
              <Image source={{ uri: PROFILE_PLACEHOLDER }} style={styles.profileImage} />
            </View>
          </View>

          {/* House ID */}
          <Text style={styles.houseId}>House 1</Text>
        </View>

        {/* Today's Usage Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today 's usage</Text>
          <View style={styles.usageContent}>
            <View style={styles.usageLeft}>
              <Text style={styles.usageItem}>Lights On: 5</Text>
              <Text style={styles.usageItem}>Energy Used: 32.4kWh</Text>
              <Text style={styles.usageItemLight}>Yesterday: +2%</Text>
              <Text style={styles.usageItem}>Estimated Cost: 50$</Text>
            </View>
            <View style={styles.usageRight}>
              <Svg width={128} height={127} viewBox="0 0 128 127" fill="none">
                <Path
                  d="M8.63778 54.8237C13.4083 24.5454 41.8857 3.87747 72.2439 8.66058C102.602 13.4437 123.345 41.8666 118.575 72.1449C113.804 102.423 85.3265 123.091 54.9684 118.308C24.6102 113.525 3.86727 85.102 8.63778 54.8237ZM102.084 69.5467C105.423 48.3519 90.9033 28.4559 69.6526 25.1077C48.4019 21.7595 28.4677 36.2271 25.1283 57.4219C21.7889 78.6167 36.309 98.5127 57.5597 101.861C78.8104 105.209 98.7446 90.7415 102.084 69.5467Z"
                  fill="white"
                />
                <Path
                  d="M75.1 109.241C76.2221 113.708 73.5009 118.304 68.9157 118.739C63.4757 119.255 57.9731 118.97 52.5867 117.88C44.4645 116.236 36.8113 112.804 30.1861 107.834C23.5609 102.865 18.1308 96.4824 14.2926 89.154C10.4543 81.8255 8.30469 73.7357 8.0007 65.4755C7.69672 57.2152 9.24604 48.993 12.5355 41.4093C15.825 33.8256 20.7716 27.0718 27.0141 21.6412C33.2566 16.2107 40.6374 12.2404 48.6174 10.0203C53.9162 8.54613 59.3904 7.86838 64.8608 7.99587C69.4576 8.10299 72.4988 12.4813 71.709 17.0111C70.9193 21.5402 66.5824 24.4773 61.9886 24.664C58.9953 24.7857 56.0171 25.2518 53.114 26.0595C47.528 27.6135 42.3615 30.3927 37.9917 34.1942C33.622 37.9956 30.1594 42.7232 27.8567 48.0318C25.5541 53.3404 24.4695 59.0959 24.6823 64.8781C24.8951 70.6603 26.3999 76.3231 29.0866 81.4531C31.7734 86.583 35.5744 91.0505 40.2121 94.5294C44.8498 98.0082 50.207 100.411 55.8925 101.561C58.8506 102.16 61.8587 102.411 64.8564 102.318C69.4476 102.174 73.9809 104.786 75.1 109.241Z"
                  fill="#357850"
                />
              </Svg>
              <Text style={styles.usagePercentage}>32.4{'\n'}kWh</Text>
            </View>
          </View>
        </View>

        {/* Consumptions Section */}
        <Text style={styles.sectionTitle}>Consumptions</Text>
        <View style={styles.graphCard}>
          <Text style={styles.graphTitle}>Analysis Period</Text>
          {renderAnalysisPeriodButtons(consumptionPeriod, setConsumptionPeriod)}

          {/* Graph placeholder with axes */}
          <View style={styles.graphContainer}>
            <View style={styles.graphWrapper}>
              {/* Y-axis labels */}
              <View style={styles.yAxisLabels}>
                <Text style={styles.axisLabel}>40 -</Text>
                <Text style={styles.axisLabel}>30 -</Text>
                <Text style={styles.axisLabel}>20 -</Text>
                <Text style={styles.axisLabel}>10 -</Text>
                <Text style={styles.axisLabel}>0 -</Text>
              </View>

              {/* Graph area with line */}
              <View style={styles.graphArea}>
                <Svg width="100%" height="100%" viewBox="0 0 250 144">
                  <Defs>
                    <SvgLinearGradient id="consumptionGrad" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0" stopColor="#8CC8A2" stopOpacity="1" />
                      <Stop offset="1" stopColor="#D9D9D9" stopOpacity="0.59" />
                    </SvgLinearGradient>
                  </Defs>
                  <Path
                    d="M0 12.2938C0 10.505 2.55423 10.1898 2.98917 11.9249C5.8025 23.8498 11.7808 47.6995 17.5833 64.3944C23.3858 81.0892 32.1975 91.3239 38 84.169C43.8025 77.0141 46.9475 52.4695 52.75 35.7746C58.5525 19.0798 64.5308 9.53991 70.3333 14.3099C76.1358 19.0798 82.1142 38.1596 87.9167 59.6244C93.7192 81.0892 99.6975 104.939 105.5 100.169C111.163 95.5137 108.63 84.0434 118.73 67.6434C119.231 66.8305 119.654 65.9675 119.983 65.071C125.009 51.3602 134.761 35.2372 141.14 28.8985C143.085 26.9662 145.136 24.9979 146.723 22.7621C149.387 19.0074 152.103 17.2916 155.884 16.8286C157.437 16.6384 158.983 16.3481 160.483 15.9022C165.578 14.3878 170.772 14.9195 175.833 19.0798C181.636 23.8498 185.197 35.3803 191 49.6901C196.803 64 205.197 81.0892 208.011 90.6291L210.451 98.417V125.8H0V12.2938Z"
                    fill="url(#consumptionGrad)"
                  />
                  <Path
                    d="M0 0C0 0 7.5001 51.1922 23 81.6148C37.0901 109.27 47.0485 53.9796 48.7435 43.6926C48.9207 42.6175 49.2257 41.5803 49.671 40.5859L56.5 25.333C56.5 25.333 62.0476 14.0204 66 14.6852C69.9524 15.3499 73 22.2908 73 22.2908L77.0652 30.5358C77.3546 31.1227 77.5955 31.7322 77.7854 32.3583L95.5 90.7415C95.5 90.7415 100.64 118.629 107 91.7556C110 79.0795 140 25.8401 148 20.2626C156 14.6852 167 16.2063 171.5 19.2485C176 22.2908 194.5 60.319 194.5 60.319L209.5 101.896"
                    stroke="#37A266"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </Svg>
              </View>
            </View>
            <Text style={styles.graphFooterLabel}>Total consumption</Text>
            <Text style={styles.graphFooterValue}>15 kW/h</Text>
          </View>
        </View>

        {/* Appliance & Room Insights */}
        <Text style={styles.sectionTitle}>Appliance & Room Insights</Text>
        <View style={styles.insightsContainer}>
          {renderProgressBar('Lights', 24)}
          {renderProgressBar('Heating & Cooling', 41)}
          {renderProgressBar('Appliances', 19)}
          {renderProgressBar('Others', 46)}
        </View>

        {/* Energy Production */}
        <Text style={styles.sectionTitle}>Energy Production</Text>
        <View style={styles.graphCard}>
          <Text style={styles.graphTitle}>Analysis Period</Text>
          {renderAnalysisPeriodButtons(energyProductionPeriod, setEnergyProductionPeriod)}

          <View style={styles.energyGraphContainer}>
            <View style={styles.graphWrapper}>
              <View style={styles.yAxisLabels}>
                <Text style={styles.axisLabel}>40 -</Text>
                <Text style={styles.axisLabel}>30 -</Text>
                <Text style={styles.axisLabel}>20 -</Text>
                <Text style={styles.axisLabel}>10 -</Text>
                <Text style={styles.axisLabel}>0 -</Text>
              </View>
              <View style={styles.graphArea}>
                <Svg width="100%" height="100%" viewBox="0 0 285 144">
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M285 8.43629C285 6.20869 282.029 5.45148 280.962 7.40741C277.162 14.8148 269.087 29.6296 261.25 40C253.412 50.3704 245.337 56.2963 237.5 51.8519C229.662 47.4074 221.588 32.5926 213.75 22.2222C205.912 11.8519 197.837 5.92593 190 8.88889C182.162 11.8519 174.087 23.7037 166.25 37.037C158.412 50.3704 150.337 65.1852 142.5 62.2222C134.663 59.2593 122.915 37.037 107.382 29.6296C91.8483 22.2222 97.2512 22.2222 91.173 19.8425C85.0948 17.4628 79.0875 13.3333 71.25 11.8519C63.4125 10.3704 55.3375 8.88889 47.5 11.8519C39.6625 14.8148 31.5875 20.7407 23.75 29.6296C15.9125 38.5185 7.83749 50.3704 4.03751 56.2963L2.08301 59.1649C0.725861 61.1569 0 63.5113 0 65.9217V75.9625H285V8.43629Z"
                    fill="#86C6CF"
                    fillOpacity="0.78"
                  />
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 12.5914C0 10.2423 3.28815 9.70014 4.04229 11.9249C7.8468 23.8498 15.9314 47.6995 23.7782 64.3944C31.625 81.0892 43.5411 91.3239 51.3879 84.169C59.2347 77.0141 63.4877 52.4695 71.3345 35.7746C79.1813 19.0798 87.2659 9.53991 95.1127 14.3099C102.96 19.0798 111.044 38.1596 118.891 59.6244C126.738 81.0892 134.822 104.939 142.669 100.169C150.317 95.5197 146.91 84.0726 160.508 67.706C161.22 66.8494 161.836 65.9093 162.333 64.9127C169.434 50.6723 183.365 33.887 191.905 28.1676C194.041 26.7373 196.179 25.2006 197.911 23.3016C202.002 18.8157 206.099 17.0111 212.219 16.7336C213.4 16.68 214.576 16.5072 215.721 16.2128C223.026 14.3351 230.506 14.6571 237.782 19.0798C245.629 23.8498 250.445 35.3803 258.292 49.6901C266.139 64 277.491 81.0892 281.296 90.6291L284.387 97.9247V124.746H0V12.5914Z"
                    fill="#49A0AD"
                  />
                </Svg>
              </View>
            </View>
          </View>

          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: '#79BDC8' }]} />
              <Text style={styles.legendText}>Energy Produced</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: '#49A0AD' }]} />
              <Text style={styles.legendText}>Energy Consumed</Text>
            </View>
          </View>
        </View>

        {/* Load & Production Curve */}
        <Text style={styles.sectionTitle}>Load & Production Curve</Text>
        <View style={styles.graphCard}>
          <Text style={styles.graphTitle}>Analysis Period</Text>
          {renderAnalysisPeriodButtons(loadProductionPeriod, setLoadProductionPeriod, true)}

          <View style={styles.loadGraphContainer}>
            <View style={styles.graphWrapper}>
              <View style={styles.yAxisLabels}>
                <Text style={styles.axisLabel}>40 -</Text>
                <Text style={styles.axisLabel}>30 -</Text>
                <Text style={styles.axisLabel}>20 -</Text>
                <Text style={styles.axisLabel}>10 -</Text>
                <Text style={styles.axisLabel}>0 -</Text>
              </View>
              <View style={styles.graphArea}>
                <Svg width="100%" height="100%" viewBox="0 0 292 125">
                  <Path
                    d="M0 124.5L13.9318 121.888C30.3406 118.811 44.3407 108.183 51.7146 93.2048L87.1524 21.2217C87.6882 20.1333 88.6891 19.3469 89.8733 19.0837L123.853 11.5326C129.826 10.2054 136.053 10.6182 141.799 12.722L160.541 19.5855C165.628 21.4483 171.253 21.1678 176.13 18.8083L215 0L226.5 30.5L244.5 88L292 124.5"
                    stroke="#2828FF"
                    strokeWidth="2"
                    fill="none"
                  />
                  <Path
                    d="M0 125L31.175 131.162C38.9589 132.701 46.9891 132.473 54.6728 130.493L74.4502 125.399C75.4451 125.143 76.3032 124.514 76.8467 123.642L98.703 88.5896C101.203 84.5797 104.561 81.1733 108.534 78.6151L126.768 66.8754C134.06 62.1805 143.547 62.7204 150.26 68.2123L177.5 90.5L240 0L278.5 59L291.5 113"
                    stroke="#B800B8"
                    strokeWidth="2"
                    fill="none"
                  />
                  <Path
                    d="M0 114.5L11.8869 112.123C28.035 108.893 41.7644 98.3406 49.0399 83.567L84.9327 10.6827C85.827 8.86658 87.9372 8.00495 89.8471 8.676L105.675 14.2373C116.654 18.0946 128.864 15.613 137.465 7.77597C142.738 2.97162 150.191 1.38048 156.966 3.61237L188.5 14L202.928 47.5113C203.63 49.1411 204.753 50.5547 206.181 51.6073L242 78L289.5 114.5"
                    stroke="#C1C12B"
                    strokeWidth="2"
                    fill="none"
                  />
                </Svg>
              </View>
            </View>
          </View>

          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: '#2828FF' }]} />
              <Text style={styles.legendText}>Consumption</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: '#C1C12B' }]} />
              <Text style={styles.legendText}>Production</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: '#B800B8' }]} />
              <Text style={styles.legendText}>Net Flow (Export / Import)</Text>
            </View>
          </View>
        </View>

        {/* Consumption Heatmap */}
        <Text style={styles.sectionTitle}>Consumption Heatmap</Text>
        <View style={styles.heatmapCard}>
          <View style={styles.heatmapContainer}>
            {/* Time labels */}
            <View style={styles.heatmapTimeLabels}>
              <Text style={styles.heatmapTimeLabel}></Text>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <Text key={day} style={styles.heatmapTimeLabel}>
                  {day}
                </Text>
              ))}
            </View>

            {/* Heatmap grid */}
            {heatmapData.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.heatmapRow}>
                <Text style={styles.heatmapHourLabel}>{`${rowIndex + 6} AM`}</Text>
                {row.map((cell, cellIndex) =>
                  renderHeatmapCell(cell, `${rowIndex}-${cellIndex}`)
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Solar Panels */}
        <Text style={styles.sectionTitle}>Solar Panels</Text>
        <View style={styles.solarCard}>
          <View style={styles.solarPanelContainer}>
            <View style={styles.solarPanel}>
              <Svg width={136} height={136} viewBox="0 0 136 136" fill="none">
                <Path
                  d="M136 68C136 105.555 105.555 136 68 136C30.4446 136 0 105.555 0 68C0 30.4446 30.4446 0 68 0C105.555 0 136 30.4446 136 68ZM20.4 68C20.4 94.2887 41.7112 115.6 68 115.6C94.2887 115.6 115.6 94.2887 115.6 68C115.6 41.7112 94.2887 20.4 68 20.4C41.7112 20.4 20.4 41.7112 20.4 68Z"
                  fill="white"
                />
                <Path
                  d="M68 10.2C68 4.5667 72.5921 -0.0783916 78.1622 0.763468C90.6571 2.65195 102.451 7.99825 112.162 16.2924C124.474 26.8076 132.63 41.3708 135.163 57.3625C137.696 73.3541 134.439 89.7248 125.98 103.53C119.307 114.419 109.742 123.148 98.442 128.805C93.4047 131.327 87.602 128.329 85.8612 122.971C84.1204 117.613 87.1349 111.947 91.9998 109.107C98.7386 105.172 104.454 99.6131 108.586 92.8709C114.508 83.2074 116.787 71.7479 115.014 60.5537C113.241 49.3596 107.532 39.1653 98.9137 31.8047C92.9009 26.6692 85.7472 23.1482 78.1224 21.4887C72.618 20.2906 68 15.8333 68 10.2Z"
                  fill="#43734C"
                />
              </Svg>
              <Text style={styles.solarPercentage}>45%</Text>
              <Text style={styles.solarLabel}>Self-sufficiency</Text>
            </View>

            <View style={styles.solarPanel}>
              <Svg width={136} height={136} viewBox="0 0 136 136" fill="none">
                <Path
                  d="M136 68C136 105.555 105.555 136 68 136C30.4446 136 0 105.555 0 68C0 30.4446 30.4446 0 68 0C105.555 0 136 30.4446 136 68ZM20.4 68C20.4 94.2887 41.7112 115.6 68 115.6C94.2887 115.6 115.6 94.2887 115.6 68C115.6 41.7112 94.2887 20.4 68 20.4C41.7112 20.4 20.4 41.7112 20.4 68Z"
                  fill="white"
                />
                <Path
                  d="M68 10.2C68 4.5667 72.592 -0.0783354 78.1621 0.763536C88.8848 2.3842 99.1164 6.55474 107.969 12.9868C119.587 21.4276 128.234 33.3295 132.672 46.9868C137.109 60.6442 137.109 75.3558 132.672 89.0132C129.29 99.4205 123.464 108.809 115.742 116.422C111.73 120.377 105.285 119.319 101.974 114.761C98.6628 110.204 99.7787 103.883 103.528 99.6787C107.891 94.7851 111.222 89.0144 113.27 82.7092C116.377 73.1491 116.377 62.8509 113.27 53.2908C110.164 43.7306 104.111 35.3993 95.9786 29.4908C90.6151 25.594 84.5287 22.883 78.1223 21.4887C72.6179 20.2907 68 15.8333 68 10.2Z"
                  fill="#43734C"
                />
              </Svg>
              <Text style={styles.solarPercentage}>40%</Text>
              <Text style={styles.solarLabel}>Panel Efficiency</Text>
            </View>
          </View>
        </View>

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navButton}>
            <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
              <Path
                d="M25.0001 31.6667H15.0001C14.0001 31.6667 13.3334 31 13.3334 30V29.1667C13.3334 26.8333 12.3334 24.5 10.5001 22.6667C7.83342 20 6.50008 16.5 6.66675 12.8333C7.00008 5.83333 12.8334 0.166667 19.8334 0H20.0001C27.3334 0 33.3334 6 33.3334 13.3333C33.3334 16.8333 32.0001 20.3333 29.3334 22.8333C27.5001 24.5 26.6667 26.8333 26.6667 29.1667V30C26.6667 31 26.0001 31.6667 25.0001 31.6667ZM16.6667 28.3333H23.3334C23.5001 25.3333 24.8334 22.6667 27.0001 20.3333C29.0001 18.5 30.0001 16 30.0001 13.3333C30.0001 7.83333 25.5001 3.33333 20.0001 3.33333H19.8334C14.6667 3.5 10.1667 7.66667 10.0001 13C9.83342 15.6667 11.0001 18.3333 12.8334 20.3333C15.1667 22.6667 16.5001 25.5 16.6667 28.3333Z"
                fill="#43734C"
              />
              <Path
                d="M20.0002 39.9999C16.3335 39.9999 13.3335 36.9999 13.3335 33.3333V29.9999C13.3335 28.9999 14.0002 28.3333 15.0002 28.3333H25.0002C26.0002 28.3333 26.6668 28.9999 26.6668 29.9999V33.3333C26.6668 36.9999 23.6668 39.9999 20.0002 39.9999ZM16.6668 31.6666V33.3333C16.6668 35.1666 18.1668 36.6666 20.0002 36.6666C21.8335 36.6666 23.3335 35.1666 23.3335 33.3333V31.6666H16.6668Z"
                fill="#43734C"
              />
              <Path
                d="M15.0002 15.0001C14.0002 15.0001 13.3335 14.3334 13.3335 13.3334C13.3335 9.66675 16.3335 6.66675 20.0002 6.66675C21.0002 6.66675 21.6668 7.33341 21.6668 8.33341C21.6668 9.33341 21.0002 10.0001 20.0002 10.0001C18.1668 10.0001 16.6668 11.5001 16.6668 13.3334C16.6668 14.3334 16.0002 15.0001 15.0002 15.0001Z"
                fill="#43734C"
              />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <Svg width={39} height={40} viewBox="0 0 39 40" fill="none">
              <Path
                d="M35.6111 19.4399C34.2096 12.9415 32.1308 8.7962 28.7991 7.78604C28.1538 7.59298 27.4847 7.49667 26.8125 7.5001C24.7643 7.5001 23.1479 8.7501 19.5 8.7501C15.8522 8.7501 14.2327 7.5001 12.1875 7.5001C11.4873 7.49639 10.79 7.59262 10.1157 7.78604C6.77933 8.7962 4.71812 12.9454 3.30056 19.4399C1.85329 26.0735 2.11532 31.3149 4.94435 32.3212C6.92482 33.0243 8.69581 31.5704 10.3731 29.4306C12.2774 26.9931 14.6227 26.2431 19.5 26.2431C24.3773 26.2431 26.6312 26.9931 28.5386 29.4306C30.2144 31.572 32.0509 33.0079 33.9788 32.3337C37.1033 31.2392 37.0592 26.1517 35.6111 19.4399Z"
                stroke="#43734C"
                strokeWidth="3"
                strokeMiterlimit="10"
              />
              <Path
                d="M22.2422 19.0625C23.0836 19.0625 23.7656 18.3629 23.7656 17.5C23.7656 16.6371 23.0836 15.9375 22.2422 15.9375C21.4008 15.9375 20.7188 16.6371 20.7188 17.5C20.7188 18.3629 21.4008 19.0625 22.2422 19.0625Z"
                fill="#43734C"
              />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
              <Path
                d="M15 36.6666V19.9999H25V36.6666M5 14.9999L20 3.33325L35 14.9999V33.3333C35 34.2173 34.6488 35.0652 34.0237 35.6903C33.3986 36.3154 32.5507 36.6666 31.6667 36.6666H8.33333C7.44928 36.6666 6.60143 36.3154 5.97631 35.6903C5.35119 35.0652 5 34.2173 5 33.3333V14.9999Z"
                stroke="#43734C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
              <Path
                d="M15.0002 33.3333H10.0002C6.31826 5 3.3335 30.3485 3.3335 26.6667V11.6667C3.3335 7.98477 6.31826 5 10.0002 5H28.3335C32.0153 5 35.0002 7.98477 35.0002 11.6667V16.6667"
                stroke="#43734C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M13.3335 3.33325V6.66659"
                stroke="#43734C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M25 3.33325V6.66659"
                stroke="#43734C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M3.3335 13.3333H35.0002"
                stroke="#43734C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.navButton, styles.navButtonActive]}>
            <View style={styles.navButtonCircle}>
              <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
                <Path
                  d="M6.6665 8.33325V31.6666C6.6665 32.5871 7.4127 33.3333 8.33317 33.3333H31.6665"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M29.9998 15L21.6665 23.3332L17.4998 19.1663L11.6665 24.9997"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ConsumptionScreen;

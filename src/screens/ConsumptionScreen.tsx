import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop, Ellipse } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/consumptionStyles';
import { PROFILE_PLACEHOLDER } from '../data/mockData';
import { 
  energyService, 
  CurrentEnergyStats, 
  HourlyConsumption, 
  RoomConsumption,
  ProductionData,
  LoadCurveData,
  HeatmapData,
  SolarMetrics
} from '../services/energyService';
import { AppContext } from '../contexts/AppContext';

type AnalysisPeriod = '15min' | '1hour' | 'today' | 'week';

const ConsumptionScreen: React.FC = () => {
  const { currentHouse } = useContext(AppContext);
  
  const [consumptionPeriod, setConsumptionPeriod] = useState<AnalysisPeriod>('today');
  
  // Data state
  const [currentStats, setCurrentStats] = useState<CurrentEnergyStats | null>(null);
  const [hourlyData, setHourlyData] = useState<HourlyConsumption | null>(null);
  const [roomData, setRoomData] = useState<RoomConsumption[]>([]);
  const [productionData, setProductionData] = useState<ProductionData | null>(null);
  const [loadCurveData, setLoadCurveData] = useState<LoadCurveData | null>(null);
  const [heatmapData, setHeatmapData] = useState<HeatmapData | null>(null);
  const [solarMetrics, setSolarMetrics] = useState<SolarMetrics | null>(null);
  
  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data function
  const fetchEnergyData = useCallback(async () => {
    if (!currentHouse?.id) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const [stats, hourly, rooms, production, loadCurve, heatmap, solar] = await Promise.all([
        energyService.getCurrentStats(currentHouse.id),
        energyService.getHourlyConsumption(currentHouse.id),
        energyService.getConsumptionByRoom(currentHouse.id),
        energyService.getProductionData(currentHouse.id),
        energyService.getLoadCurveData(currentHouse.id),
        energyService.getHeatmapData(currentHouse.id),
        energyService.getSolarMetrics(currentHouse.id),
      ]);
      
      setCurrentStats(stats);
      setHourlyData(hourly);
      setRoomData(rooms);
      setProductionData(production);
      setLoadCurveData(loadCurve);
      setHeatmapData(heatmap);
      setSolarMetrics(solar);
    } catch (err) {
      console.error('Error fetching energy data:', err);
      setError('Failed to load energy data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [currentHouse?.id]);

  // Fetch data on mount and when dependencies change
  useEffect(() => {
    fetchEnergyData();
  }, [fetchEnergyData]);

  // Refresh data when screen comes into focus (for instant light updates)
  useFocusEffect(
    useCallback(() => {
      fetchEnergyData();
    }, [fetchEnergyData])
  );

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

  // Convert heatmap data to display format
  const getHeatmapDisplayData = (): boolean[][] => {
    if (!heatmapData?.heatmap) {
      // Return empty data if not available
      return Array(11).fill(null).map(() => Array(7).fill(false));
    }

    // Calculate max consumption for normalization
    const allValues = heatmapData.heatmap.flatMap(h => h.days);
    const maxConsumption = Math.max(...allValues, 1);
    const threshold = maxConsumption * 0.3; // Consider active if > 30% of max

    // Convert to boolean array (showing hours 6 AM to 4 PM)
    return heatmapData.heatmap
      .filter(h => h.hour >= 6 && h.hour <= 16) // 6 AM to 4 PM
      .map(hourData => 
        hourData.days.map(consumption => consumption > threshold)
      );
  };

  const heatmapDisplayData = getHeatmapDisplayData();

  // Helper function to generate SVG path from data points
  const generateSVGPath = (dataPoints: { x: number; y: number }[], viewportHeight: number = 144): string => {
    if (!dataPoints || dataPoints.length === 0) return '';
    
    let path = `M${dataPoints[0].x} ${viewportHeight - dataPoints[0].y}`;
    for (let i = 1; i < dataPoints.length; i++) {
      path += ` L${dataPoints[i].x} ${viewportHeight - dataPoints[i].y}`;
    }
    return path;
  };

  // Generate production graph data points
  const getProductionGraphPoints = (): { produced: { x: number; y: number }[], consumed: { x: number; y: number }[] } => {
    if (!productionData?.data || productionData.data.length === 0) {
      return { produced: [], consumed: [] };
    }

    const viewportWidth = 285;
    const viewportHeight = 144;
    const maxValue = Math.max(
      ...productionData.data.map(d => Math.max(Number(d.active_energy_export_kwh), Number(d.active_energy_import_kwh))),
      4 // Minimum scale of 4 kWh
    );

    const producedPoints = productionData.data.map((d, i) => ({
      x: (i / (productionData.data.length - 1)) * viewportWidth,
      y: (Number(d.active_energy_export_kwh) / maxValue) * (viewportHeight * 0.9)
    }));

    const consumedPoints = productionData.data.map((d, i) => ({
      x: (i / (productionData.data.length - 1)) * viewportWidth,
      y: (Number(d.active_energy_import_kwh) / maxValue) * (viewportHeight * 0.9)
    }));

    return { produced: producedPoints, consumed: consumedPoints };
  };

  // Generate load curve graph data points
  const getLoadCurvePoints = (): { consumption: { x: number; y: number }[], production: { x: number; y: number }[], netFlow: { x: number; y: number }[] } => {
    if (!loadCurveData?.data || loadCurveData.data.length === 0) {
      return { consumption: [], production: [], netFlow: [] };
    }

    const viewportWidth = 292;
    const viewportHeight = 125;
    const maxValue = Math.max(
      ...loadCurveData.data.map(d => Math.max(
        Number(d.consumption_kw),
        Number(d.production_kw),
        Math.abs(Number(d.net_flow_kw))
      )),
      3.5 // Minimum scale
    );

    const consumptionPoints = loadCurveData.data.map((d, i) => ({
      x: (i / (loadCurveData.data.length - 1)) * viewportWidth,
      y: (Number(d.consumption_kw) / maxValue) * (viewportHeight * 0.9)
    }));

    const productionPoints = loadCurveData.data.map((d, i) => ({
      x: (i / (loadCurveData.data.length - 1)) * viewportWidth,
      y: (Number(d.production_kw) / maxValue) * (viewportHeight * 0.9)
    }));

    const netFlowPoints = loadCurveData.data.map((d, i) => ({
      x: (i / (loadCurveData.data.length - 1)) * viewportWidth,
      y: ((Number(d.net_flow_kw) + maxValue) / (maxValue * 2)) * (viewportHeight * 0.9) // Center at middle
    }));

    return { consumption: consumptionPoints, production: productionPoints, netFlow: netFlowPoints };
  };

  const productionGraphPoints = getProductionGraphPoints();
  const loadCurvePoints = getLoadCurvePoints();

  // Calculate total consumption from hourly data
  const totalConsumption = hourlyData?.hourly_data.reduce((sum, item) => sum + Number(item.consumption_kwh), 0) || 0;
  
  // Calculate room percentages for progress bars
  const totalRoomConsumption = roomData.reduce((sum, room) => sum + Number(room.current_consumption_kw), 0);
  const getRoomPercentage = (consumption: number) => 
    totalRoomConsumption > 0 ? Math.round((consumption / totalRoomConsumption) * 100) : 0;

  // Show loading state
  if (loading) {
    return (
      <LinearGradient colors={['#78B85E', '#1E7B45']} style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={{ color: '#FFFFFF', marginTop: 16, fontSize: 16 }}>Loading energy data...</Text>
        </View>
      </LinearGradient>
    );
  }

  // Show error state
  if (error) {
    return (
      <LinearGradient colors={['#78B85E', '#1E7B45']} style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 18, textAlign: 'center', marginBottom: 16 }}>{error}</Text>
          <TouchableOpacity 
            style={{ backgroundColor: '#FFFFFF', padding: 12, borderRadius: 8 }}
            onPress={() => window.location.reload()}
          >
            <Text style={{ color: '#1E7B45', fontSize: 16, fontWeight: 'bold' }}>Retry</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

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
          <Text style={styles.houseId}>{currentHouse?.name || 'My Home'}</Text>
        </View>

        {/* Today's Usage Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's usage</Text>
          <View style={styles.usageContent}>
            <View style={styles.usageLeft}>
              <Text style={styles.usageItem}>Lights On: {currentStats?.lights_on_count || 0}</Text>
              <Text style={styles.usageItem}>Energy Used: {Number(currentStats?.today_consumption_kwh || 0).toFixed(1)}kWh</Text>
              <Text style={styles.usageItemLight}>Current: {Number(currentStats?.current_consumption_kwh || 0).toFixed(3)}kW</Text>
              <Text style={styles.usageItem}>Estimated Cost: ${(Number(currentStats?.today_consumption_kwh || 0) * 0.15).toFixed(2)}</Text>
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
              <Text style={styles.usagePercentage}>{Number(currentStats?.today_consumption_kwh || 0).toFixed(1)}{'\n'}kWh</Text>
            </View>
          </View>
        </View>

        {/* Consumptions Section */}
        <Text style={styles.sectionTitle}>Today's Consumption</Text>
        <View style={styles.graphCard}>
          <View style={{ height: 120, marginTop: 16, paddingHorizontal: 8 }}>
            <Svg width="100%" height="100%" viewBox="0 0 300 100">
              <Defs>
                <SvgLinearGradient id="consumptionGrad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#9fe7a8" stopOpacity="0.6" />
                  <Stop offset="1" stopColor="#9fe7a8" stopOpacity="0.05" />
                </SvgLinearGradient>
              </Defs>
              <Path d={generateAreaPath(hourlyData?.hourly_data.map(h => h.consumption_kwh) || [], 300, 100)} fill="url(#consumptionGrad)" />
              <Path d={generateLinePath(hourlyData?.hourly_data.map(h => h.consumption_kwh) || [], 300, 100)} stroke="#dfffdc" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </View>
          <Text style={styles.graphFooterLabel}>Total consumption</Text>
          <Text style={styles.graphFooterValue}>{totalConsumption.toFixed(2)} kWh</Text>
        </View>

        {/* Appliance & Room Insights */}
        <Text style={styles.sectionTitle}>Room Consumption Insights</Text>
        <View style={styles.insightsContainer}>
          {roomData.length > 0 ? (
            roomData.map((room) => (
              <View key={room.room_name}>
                {renderProgressBar(
                  `${room.room_name} (${room.lights_on}/${room.light_count} on)`,
                  getRoomPercentage(room.current_consumption_kw)
                )}
              </View>
            ))
          ) : (
            <Text style={{ color: '#FFFFFF', textAlign: 'center', padding: 20 }}>No room data available</Text>
          )}
        </View>

        {/* Energy Production */}
        {productionData && productionData.data && productionData.data.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Energy Production</Text>
            <View style={styles.graphCard}>
              <Text style={styles.graphTitle}>Today's Production</Text>

          <View style={styles.energyGraphContainer}>
            <View style={styles.graphWrapper}>
              <View style={styles.yAxisLabels}>
                <Text style={styles.axisLabel}>4.0 -</Text>
                <Text style={styles.axisLabel}>3.0 -</Text>
                <Text style={styles.axisLabel}>2.0 -</Text>
                <Text style={styles.axisLabel}>1.0 -</Text>
                <Text style={styles.axisLabel}>0.0 -</Text>
              </View>
              <View style={styles.graphArea}>
                <Svg width="100%" height="100%" viewBox="0 0 285 144">
                  {productionGraphPoints.produced.length > 0 && (
                    <>
                      {/* Produced energy line */}
                      <Path
                        d={generateSVGPath(productionGraphPoints.produced, 144)}
                        stroke="#79BDC8"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Consumed energy line */}
                      <Path
                        d={generateSVGPath(productionGraphPoints.consumed, 144)}
                        stroke="#49A0AD"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  )}
                  {productionGraphPoints.produced.length === 0 && (
                    <Text x="142" y="72" textAnchor="middle" fill="#666" fontSize="14">
                      No production data
                    </Text>
                  )}
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
          </>
        )}

        {/* Load & Production Curve */}
        {loadCurveData && loadCurveData.data && loadCurveData.data.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Load & Production Curve</Text>
            <View style={styles.graphCard}>
              <Text style={styles.graphTitle}>Today's Load Curve</Text>

          <View style={styles.loadGraphContainer}>
            <View style={styles.graphWrapper}>
              <View style={styles.yAxisLabels}>
                <Text style={styles.axisLabel}>3.5 -</Text>
                <Text style={styles.axisLabel}>2.5 -</Text>
                <Text style={styles.axisLabel}>1.5 -</Text>
                <Text style={styles.axisLabel}>0.5 -</Text>
                <Text style={styles.axisLabel}>0.0 -</Text>
              </View>
              <View style={styles.graphArea}>
                <Svg width="100%" height="100%" viewBox="0 0 292 125">
                  {loadCurvePoints.consumption.length > 0 && (
                    <>
                      {/* Consumption line (blue) */}
                      <Path
                        d={generateSVGPath(loadCurvePoints.consumption, 125)}
                        stroke="#2828FF"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Production line (yellow) */}
                      <Path
                        d={generateSVGPath(loadCurvePoints.production, 125)}
                        stroke="#C1C12B"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Net Flow line (purple) */}
                      <Path
                        d={generateSVGPath(loadCurvePoints.netFlow, 125)}
                        stroke="#B800B8"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  )}
                  {loadCurvePoints.consumption.length === 0 && (
                    <Text x="146" y="62" textAnchor="middle" fill="#666" fontSize="14">
                      No load curve data
                    </Text>
                  )}
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
          </>
        )}

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
            {heatmapDisplayData.map((row, rowIndex) => (
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
          {solarMetrics?.has_upac ? (
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
                <Text style={styles.solarPercentage}>{solarMetrics.self_sufficiency_percentage}%</Text>
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
                <Text style={styles.solarPercentage}>{solarMetrics.panel_efficiency_percentage}%</Text>
                <Text style={styles.solarLabel}>Panel Efficiency</Text>
              </View>
            </View>
          ) : (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ color: '#666', fontSize: 16, textAlign: 'center' }}>
                No solar panels installed for this house
              </Text>
            </View>
          )}
        </View>

      </ScrollView>
    </LinearGradient>
  );
};

function generateLinePath(data: number[], width: number, height: number) {
  if (!data || !Array.isArray(data) || data.length === 0) return '';
  const step = width / (data.length - 1);
  const max = Math.max.apply(null, data);
  const min = Math.min.apply(null, data);
  const range = max - min || 1;
  return data.map((d, i) => {
    const x = i * step;
    const y = height - ((d - min) / range) * (height - 10) - 5;
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');
}

function generateAreaPath(data: number[], width: number, height: number) {
  if (!data || !Array.isArray(data) || data.length === 0) return '';
  const line = generateLinePath(data, width, height);
  if (!line) return '';
  const lastX = width;
  return `${line} L ${width} ${height} L 0 ${height} Z`;
}

export default ConsumptionScreen;

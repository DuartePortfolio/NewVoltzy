import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  blobsBackground: {
    position: 'absolute',
    width: width * 1.8,
    height: '100%',
    left: -width * 0.3,
    top: -20,
    opacity: 0.3,
  },

  // Header Styles
  glassHeader: {
    marginTop: 40,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.26)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 12,
  },
  headerTitle: {
    fontFamily: 'Comfortaa',
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  divider: {
    width: 197,
    height: 2,
    backgroundColor: '#FFFFFF',
    marginTop: 4,
  },
  profilePicture: {
    width: 49,
    height: 49,
    borderRadius: 25,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  houseId: {
    fontFamily: 'Comfortaa',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 8,
  },

  // Card Styles
  card: {
    backgroundColor: 'rgba(171, 200, 171, 0.75)',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 24,
  },
  cardTitle: {
    fontFamily: 'Comfortaa',
    fontSize: 16,
    fontWeight: '700',
    color: '#2E2E2E',
    marginBottom: 16,
  },

  // Today's Usage Styles
  usageContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  usageLeft: {
    flex: 1,
    gap: 8,
  },
  usageRight: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  usageItem: {
    fontFamily: 'Comfortaa',
    fontSize: 12,
    fontWeight: '500',
    color: '#2E2E2E',
  },
  usageItemLight: {
    fontFamily: 'Comfortaa',
    fontSize: 12,
    fontWeight: '300',
    color: '#2E2E2E',
  },
  usagePercentage: {
    position: 'absolute',
    fontFamily: 'Comfortaa',
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  // Section Title
  sectionTitle: {
    fontFamily: 'Comfortaa',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },

  // Graph Card Styles
  graphCard: {
    backgroundColor: 'rgba(171, 200, 171, 0.77)',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 8,
  },
  graphTitle: {
    fontFamily: 'Comfortaa',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },

  // Period Buttons
  periodButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  periodButtonActive: {
    backgroundColor: '#357850',
  },
  periodButtonText: {
    fontFamily: 'Comfortaa',
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },

  // Graph Container
  graphContainer: {
    marginTop: 10,
  },
  graphWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  yAxisLabels: {
    justifyContent: 'space-between',
    height: 144,
    marginRight: 8,
  },
  axisLabel: {
    fontFamily: 'Comfortaa',
    fontSize: 12,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  graphArea: {
    flex: 1,
    height: 144,
  },
  graphFooterLabel: {
    fontFamily: 'Comfortaa',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 8,
  },
  graphFooterValue: {
    fontFamily: 'Comfortaa',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 4,
  },

  // Energy Production Graph
  energyGraphContainer: {
    marginTop: 10,
    marginBottom: 16,
  },

  // Load Production Graph
  loadGraphContainer: {
    marginTop: 10,
    marginBottom: 16,
  },

  // Legend
  legendContainer: {
    gap: 8,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendBox: {
    width: 16,
    height: 16,
  },
  legendText: {
    fontFamily: 'Comfortaa',
    fontSize: 12,
    fontWeight: '400',
    color: '#FFFFFF',
  },

  // Progress Bars (Appliance & Room Insights)
  insightsContainer: {
    gap: 8,
    marginHorizontal: 16,
  },
  progressBarContainer: {
    gap: 8,
  },
  progressBarLabel: {
    fontFamily: 'Comfortaa',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  progressBarWrapper: {
    height: 48,
  },
  progressBarBackground: {
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(171, 200, 171, 0.45)',
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  progressBarFill: {
    height: 16,
    borderRadius: 8,
    backgroundColor: '#41924E',
  },

  // Heatmap Styles
  heatmapCard: {
    backgroundColor: 'rgba(171, 200, 171, 0.77)',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 8,
  },
  heatmapContainer: {
    gap: 4,
  },
  heatmapTimeLabels: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 48,
  },
  heatmapTimeLabel: {
    flex: 1,
    fontFamily: 'Comfortaa',
    fontSize: 10,
    fontWeight: '400',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  heatmapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heatmapHourLabel: {
    width: 44,
    fontFamily: 'Comfortaa',
    fontSize: 10,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  heatmapCell: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 4,
  },
  heatmapCellActive: {
    backgroundColor: '#357850',
  },
  heatmapCellInactive: {
    backgroundColor: 'rgba(171, 200, 171, 0.45)',
  },

  // Solar Panels
  solarCard: {
    backgroundColor: 'rgba(171, 200, 171, 0.45)',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 8,
  },
  solarPanelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
  },
  solarPanel: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  solarPercentage: {
    position: 'absolute',
    top: 58,
    fontFamily: 'Comfortaa',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  solarLabel: {
    fontFamily: 'Comfortaa',
    fontSize: 10,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 8,
  },

});

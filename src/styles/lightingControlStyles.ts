import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#78B85E',
  },
  backgroundSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  
  // Glass Header Styles
  glassHeader: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.26)',
    shadowColor: 'rgba(255, 255, 255, 0.15)',
    shadowOffset: { width: -11, height: -10 },
    shadowOpacity: 0.15,
    shadowRadius: 48,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  divider: {
    width: 240,
    height: 2,
    backgroundColor: '#FFFFFF',
  },
  profilePicture: {
    width: 49,
    height: 48,
    borderRadius: 25,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  houseId: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  // Rooms Section Styles
  roomsSection: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  roomsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    zIndex: 100,
    position: 'relative',
  },
  roomsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    gap: 8,
    zIndex: 10,
    position: 'relative',
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
  },

  // Room Cards Grid
  roomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  roomCard: {
    width: (width - 48) / 2, // Two columns with padding
    minHeight: 112,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 12,
  },
  roomCardText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },

  // Bottom Navigation Styles
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 96,
    zIndex: 1,
    pointerEvents: 'box-none',
  },
  navBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#D9D9D9',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  activeIndicator: {
    position: 'absolute',
    left: 4,
    bottom: 19,
    width: 80,
    height: 77,
  },
  navIcons: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});

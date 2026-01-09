export interface Light {
  id: string;
  name: string;
  room: string;
  isOn: boolean;
  brightness: number;
  color: string;
}

export interface Routine {
  id: string;
  name: string;
  isActive: boolean;
  lightsState: 'on' | 'low' | 'off';
  color: string;
  startTime: { date: string; time: string };
  endTime: { date: string; time: string };
}

export const mockLights: Light[] = [
  { id: '1', name: 'Light 1', room: 'Living Room', isOn: true, brightness: 75, color: '#89E743' },
  { id: '2', name: 'Light 2', room: 'Living Room', isOn: false, brightness: 50, color: '#E7E040' },
  { id: '3', name: 'Light 3', room: 'Living Room', isOn: true, brightness: 60, color: '#3CCAE7' },
  { id: '4', name: 'Light 4', room: 'Living Room', isOn: false, brightness: 30, color: '#E8403B' },
  { id: '5', name: 'Light 5', room: 'Living Room', isOn: true, brightness: 90, color: '#B33ED5' },
];

export const mockRoutines: Routine[] = [
  {
    id: '1',
    name: 'Night',
    isActive: true,
    lightsState: 'low',
    color: '#694AE8',
    startTime: { date: 'Apr 1', time: '9:41 AM' },
    endTime: { date: 'Apr 1', time: '9:41 AM' },
  },
  {
    id: '2',
    name: 'Day',
    isActive: false,
    lightsState: 'on',
    color: '#E7E040',
    startTime: { date: 'Apr 1', time: '6:00 AM' },
    endTime: { date: 'Apr 1', time: '8:00 PM' },
  },
  {
    id: '3',
    name: 'Eco',
    isActive: false,
    lightsState: 'low',
    color: '#89E743',
    startTime: { date: 'Apr 1', time: '10:00 PM' },
    endTime: { date: 'Apr 2', time: '6:00 AM' },
  },
  {
    id: '4',
    name: 'Comfort',
    isActive: false,
    lightsState: 'on',
    color: '#EB753C',
    startTime: { date: 'Apr 1', time: '7:00 PM' },
    endTime: { date: 'Apr 1', time: '11:00 PM' },
  },
];

export const PROFILE_PLACEHOLDER = 'https://api.builder.io/api/v1/image/assets/TEMP/b91e984747ee07f07988d3e3b25238dbe77ace1c?width=98';

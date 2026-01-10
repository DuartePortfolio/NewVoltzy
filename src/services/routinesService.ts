import { apiClient } from './api';

export interface RoutineLight {
  light_id: number;
  light_name?: string;
  room_name?: string;
  target_on: boolean;
  brightness?: number;
  color_hex?: string;
}

export interface Routine {
  id: number;
  house_id: number;
  name: string;
  description?: string;
  color?: string;
  start_time: string;
  end_time: string;
  repeat_monday: boolean;
  repeat_tuesday: boolean;
  repeat_wednesday: boolean;
  repeat_thursday: boolean;
  repeat_friday: boolean;
  repeat_saturday: boolean;
  repeat_sunday: boolean;
  active: boolean;
  created_at?: string;
  lights?: RoutineLight[];
}

export interface CreateRoutineData {
  house_id: number;
  name: string;
  description?: string;
  color?: string;
  start_time: string;
  end_time: string;
  repeat_monday?: boolean;
  repeat_tuesday?: boolean;
  repeat_wednesday?: boolean;
  repeat_thursday?: boolean;
  repeat_friday?: boolean;
  repeat_saturday?: boolean;
  repeat_sunday?: boolean;
  active?: boolean;
  lights?: RoutineLight[];
}

export interface UpdateRoutineData {
  name?: string;
  description?: string;
  color?: string;
  start_time?: string;
  end_time?: string;
  repeat_monday?: boolean;
  repeat_tuesday?: boolean;
  repeat_wednesday?: boolean;
  repeat_thursday?: boolean;
  repeat_friday?: boolean;
  repeat_saturday?: boolean;
  repeat_sunday?: boolean;
  active?: boolean;
  lights?: RoutineLight[];
}

class RoutinesService {
  // Get all routines for a house
  async getRoutinesByHouse(houseId: number): Promise<Routine[]> {
    const response = await apiClient.get<{ routines: Routine[] }>(
      `/api/houses/${houseId}/routines`
    );
    return response.routines;
  }

  // Get single routine details
  async getRoutine(routineId: number): Promise<Routine> {
    const response = await apiClient.get<{ routine: Routine }>(`/api/routines/${routineId}`);
    return response.routine;
  }

  // Create a new routine
  async createRoutine(data: CreateRoutineData): Promise<Routine> {
    const response = await apiClient.post<{ routine: Routine }>('/api/routines', data);
    return response.routine;
  }

  // Update a routine
  async updateRoutine(routineId: number, data: UpdateRoutineData): Promise<void> {
    await apiClient.put(`/api/routines/${routineId}`, data);
  }

  // Delete a routine
  async deleteRoutine(routineId: number): Promise<void> {
    await apiClient.delete(`/api/routines/${routineId}`);
  }

  // Toggle routine active state
  async toggleRoutine(routineId: number): Promise<{ active: boolean }> {
    const response = await apiClient.put<{ active: boolean }>(
      `/api/routines/${routineId}/toggle`,
      {}
    );
    return response;
  }
}

export const routinesService = new RoutinesService();


import { ParkingSession, VehicleType } from '../types';

const STORAGE_KEY = 'parking_sessions';

// Helper: Get data from local storage
const getSessions = (): ParkingSession[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Helper: Save data to local storage
const saveSessions = (sessions: ParkingSession[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
};

// Helper: Calculate fee
const calculateFee = (type: VehicleType, entryTime: string | number): number => {
  const now = new Date();
  const entry = new Date(entryTime);
  const diffHours = Math.ceil((now.getTime() - entry.getTime()) / (1000 * 60 * 60));
  
  const prices = {
    'Xe máy': 5000,
    'Ô tô': 15000,
    'Xe đạp': 2000
  };

  const basePrice = prices[type] || 5000;
  
  // Free if under 10 minutes (just an example rule)
  if ((now.getTime() - entry.getTime()) < 10 * 60 * 1000) return 0;

  if (diffHours <= 2) return basePrice;
  return basePrice + Math.ceil((diffHours - 2) / 2) * (basePrice * 0.5);
};

// Check In
export const checkInVehicle = async (plateNumber: string, vehicleType: VehicleType) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const sessions = getSessions();
  const normalizedPlate = plateNumber.toUpperCase();

  // Check if already active
  const activeSession = sessions.find(s => 
    s.plateNumber === normalizedPlate && s.status === 'active'
  );

  if (activeSession) {
    throw new Error("Xe này đang ở trong bãi (Chưa check-out)!");
  }

  const newSession: ParkingSession = {
    id: Date.now().toString(), // Simple ID generation
    plateNumber: normalizedPlate,
    vehicleType,
    entryTime: new Date().toISOString(),
    status: 'active'
  };

  sessions.push(newSession);
  saveSessions(sessions);
  return true;
};

// Find Active Session
export const findActiveSession = async (plateNumber: string) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const sessions = getSessions();
  const session = sessions.find(s => 
    s.plateNumber === plateNumber.toUpperCase() && s.status === 'active'
  );

  if (!session) return null;

  return {
    ...session,
    currentFee: calculateFee(session.vehicleType, session.entryTime)
  };
};

// Check Out
export const checkOutVehicle = async (sessionId: string, fee: number) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const sessions = getSessions();
  const index = sessions.findIndex(s => s.id === sessionId);

  if (index === -1) throw new Error("Session not found");

  sessions[index] = {
    ...sessions[index],
    status: 'completed',
    exitTime: new Date().toISOString(),
    fee
  };

  saveSessions(sessions);
  return true;
};

// Get Stats for Dashboard
export const getDailyStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const sessions = getSessions();
  const startOfDay = new Date();
  startOfDay.setHours(0,0,0,0);

  const active = sessions.filter(s => s.status === 'active');
  const totalToday = sessions.filter(s => {
    const entryDate = new Date(s.entryTime);
    return entryDate >= startOfDay;
  });

  return {
    active: active.length,
    totalToday: totalToday.length,
    available: 100 - active.length // Assuming 100 spots
  };
};

// Get History
export const getHistory = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const sessions = getSessions();
  
  // Filter completed and sort by exit time desc
  const history = sessions
    .filter(s => s.status === 'completed')
    .sort((a, b) => new Date(b.exitTime).getTime() - new Date(a.exitTime).getTime())
    .slice(0, 50); // Limit to last 50

  return history.map(session => {
    const entry = new Date(session.entryTime);
    const exit = new Date(session.exitTime);
    
    const diffMs = exit.getTime() - entry.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return {
      ...session,
      formattedEntry: entry.toLocaleString('vi-VN'),
      formattedExit: exit.toLocaleString('vi-VN'),
      duration: `${hours}h ${minutes}p`
    };
  });
};

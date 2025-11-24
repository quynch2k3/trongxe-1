import React from 'react';

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass: string;
  iconBgClass: string;
}

export interface Volunteer {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  status: 'active' | 'locked';
}

export type VehicleType = 'Xe máy' | 'Ô tô' | 'Xe đạp';

export interface ParkingSession {
  id: string; // Firestore ID
  plateNumber: string;
  vehicleType: VehicleType;
  entryTime: any; // Firestore Timestamp
  exitTime?: any; // Firestore Timestamp
  status: 'active' | 'completed';
  fee?: number;
}

export interface ParkingRecord extends ParkingSession {
  duration?: string;
  formattedEntry?: string;
  formattedExit?: string;
}
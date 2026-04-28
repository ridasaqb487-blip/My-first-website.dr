/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Specialty {
  CARDIOLOGY = 'Cardiology',
  PEDIATRICS = 'Pediatrics',
  DERMATOLOGY = 'Dermatology',
  NEUROLOGY = 'Neurology',
  ORTHOPEDICS = 'Orthopedics',
  GENERAL_PRACTICE = 'General Practice',
  PSYCHIATRY = 'Psychiatry',
  OPHTHALMOLOGY = 'Ophthalmology',
}

export interface Doctor {
  id: string;
  name: string;
  specialty: Specialty;
  rating: number;
  reviews: number;
  experience: number;
  location: string;
  imageUrl: string;
  about: string;
  availability: string[]; // ISO strings of available slots
}

export interface Appointment {
  id: string;
  doctorId: string;
  userId: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

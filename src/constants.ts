/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Doctor, Specialty } from './types';

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Mitchell',
    specialty: Specialty.CARDIOLOGY,
    rating: 4.9,
    reviews: 124,
    experience: 12,
    location: 'Central Health Plaza, Downtown',
    imageUrl: 'https://picsum.photos/seed/doc1/400/400',
    about: 'I am a board-certified cardiologist with a passion for preventive heart care and advanced cardiac diagnostics. I believe in a patient-centered approach to healthcare.',
    availability: ['2026-04-29T09:00:00Z', '2026-04-29T10:30:00Z', '2026-04-30T14:00:00Z'],
  },
  {
    id: 'doc-2',
    name: 'Dr. James Wilson',
    specialty: Specialty.PEDIATRICS,
    rating: 4.8,
    reviews: 89,
    experience: 8,
    location: 'Kids Care Clinic, Northside',
    imageUrl: 'https://picsum.photos/seed/doc2/400/400',
    about: 'Dedicated to providing high-quality medical care to children from infancy through adolescence. My clinic focuses on a friendly, comforting environment for little ones.',
    availability: ['2026-04-29T11:00:00Z', '2026-05-01T09:30:00Z'],
  },
  {
    id: 'doc-3',
    name: 'Dr. Elena Rodriguez',
    specialty: Specialty.DERMATOLOGY,
    rating: 4.7,
    reviews: 156,
    experience: 15,
    location: 'Skin & Aesthetics Center, West End',
    imageUrl: 'https://picsum.photos/seed/doc3/400/400',
    about: 'Specializing in both clinical and cosmetic dermatology. I treat a wide range of skin conditions and help patients achieve their aesthetic goals with evidence-based treatments.',
    availability: ['2026-04-29T13:00:00Z', '2026-04-29T15:00:00Z', '2026-04-30T11:00:00Z'],
  },
  {
    id: 'doc-4',
    name: 'Dr. Marcus Chen',
    specialty: Specialty.NEUROLOGY,
    rating: 5.0,
    reviews: 42,
    experience: 20,
    location: 'Neurology Institute, Medical District',
    imageUrl: 'https://picsum.photos/seed/doc4/400/400',
    about: 'Expert in complex neurological disorders including epilepsy, Parkinson\'s, and sleep medicine. I am committed to cutting-edge research and personalized care plans.',
    availability: ['2026-05-02T10:00:00Z', '2026-05-02T14:00:00Z'],
  },
  {
    id: 'doc-5',
    name: 'Dr. Olivia Thorne',
    specialty: Specialty.ORTHOPEDICS,
    rating: 4.6,
    reviews: 95,
    experience: 10,
    location: 'Sports & Bone Clinic, South Park',
    imageUrl: 'https://picsum.photos/seed/doc5/400/400',
    about: 'Focused on sports medicine and joint replacement surgery. I help athletes and patients of all ages regain mobility and return to their active lifestyles.',
    availability: ['2026-04-29T08:30:00Z', '2026-05-01T15:30:00Z'],
  },
];

export const SPECIALTIES = Object.values(Specialty);

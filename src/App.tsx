/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  User, 
  Calendar, 
  Star, 
  MapPin, 
  Filter, 
  ChevronRight, 
  Clock, 
  CheckCircle2,
  Menu,
  X,
  Stethoscope,
  Heart,
  Baby,
  Smile,
  Brain,
  Bone,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Specialty, Doctor, Appointment, User as UserType } from './types';
import { DOCTORS, SPECIALTIES } from './constants';

const MOCK_USER: UserType = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatarUrl: 'https://picsum.photos/seed/user1/100/100',
};

type View = 'home' | 'search' | 'doctor' | 'profile';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            doc.about.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialty = !selectedSpecialty || doc.specialty === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    });
  }, [searchQuery, selectedSpecialty]);

  const handleBookAppointment = (doctor: Doctor, slot: string) => {
    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      doctorId: doctor.id,
      userId: MOCK_USER.id,
      date: slot.split('T')[0],
      time: slot.split('T')[1].substr(0, 5),
      status: 'upcoming',
    };
    setAppointments([...appointments, newAppointment]);
    setCurrentView('profile');
  };

  const navigateToDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setCurrentView('doctor');
  };

  const getSpecialtyIcon = (specialty: Specialty) => {
    switch (specialty) {
      case Specialty.CARDIOLOGY: return <Heart className="w-6 h-6 text-red-500" />;
      case Specialty.PEDIATRICS: return <Baby className="w-6 h-6 text-blue-500" />;
      case Specialty.DERMATOLOGY: return <Smile className="w-6 h-6 text-pink-500" />;
      case Specialty.NEUROLOGY: return <Brain className="w-6 h-6 text-purple-500" />;
      case Specialty.ORTHOPEDICS: return <Bone className="w-6 h-6 text-orange-500" />;
      case Specialty.OPHTHALMOLOGY: return <Eye className="w-6 h-6 text-cyan-500" />;
      default: return <Stethoscope className="w-6 h-6 text-emerald-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans selection:bg-[#0055FF] selection:text-white">
      {/* Navigation */}
      <nav className="h-20 border-b-4 border-black sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => { setCurrentView('home'); setSelectedSpecialty(null); }}
          >
            <div className="w-10 h-10 bg-black group-hover:bg-[#0055FF] transition-colors flex items-center justify-center text-white">
              <Stethoscope className="w-6 h-6" />
            </div>
            <span className="font-black text-2xl tracking-tighter italic uppercase group-hover:text-[#0055FF] transition-colors">MedReserve</span>
          </div>

          <div className="flex-1 max-w-sm mx-12 hidden md:block">
            <div className="relative group">
              <input 
                type="text"
                placeholder="SEARCH DOCTORS OR SPECIALTY"
                className="w-full h-10 border-b-2 border-black py-2 pr-10 focus:outline-none font-bold uppercase text-xs placeholder:text-gray-300 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setCurrentView('search')}
              />
              <Search className="absolute right-0 bottom-2.5 w-4 h-4 text-black" strokeWidth={3} />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-xs font-black uppercase leading-none">{MOCK_USER.name}</span>
              <span className="text-[10px] opacity-50 uppercase tracking-tighter">Premium Member</span>
            </div>
            <button 
              className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold hover:bg-[#0055FF] transition-colors shrink-0"
              onClick={() => setCurrentView('profile')}
            >
              {MOCK_USER.name.split(' ').map(n => n[0]).join('')}
            </button>
            <button 
              className="sm:hidden p-2 text-black"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu strokeWidth={3} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {/* Hero Section */}
              <div className="flex flex-col lg:flex-row justify-between items-end gap-12 pt-10">
                <h1 className="text-6xl md:text-[110px] leading-[0.85] font-black uppercase tracking-tighter">
                  Find Your<br/><span className="text-[#0055FF]">Specialist.</span>
                </h1>
                <div className="w-full lg:w-1/3 pb-4">
                  <p className="text-xl font-bold leading-tight mb-8">
                    Access the world's most elite medical network. Direct booking. Zero wait times.
                  </p>
                  <button 
                    onClick={() => setCurrentView('search')}
                    className="px-8 py-4 bg-black text-white font-black text-sm uppercase tracking-widest hover:bg-[#0055FF] transition-colors"
                  >
                    Browse Directory
                  </button>
                </div>
              </div>

              {/* Specialties Section */}
              <section>
                <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-2">
                  <h2 className="text-xs font-black uppercase tracking-[0.2em]">Select Specialty</h2>
                  <button className="text-xs font-black uppercase tracking-widest hover:text-[#0055FF]">View Map →</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => { setSelectedSpecialty(null); setCurrentView('search'); }}
                    className="px-6 py-2 bg-black text-white font-bold text-xs uppercase tracking-widest rounded-full"
                  >
                    All
                  </button>
                  {SPECIALTIES.map((spec) => (
                    <button
                      key={spec}
                      onClick={() => { setSelectedSpecialty(spec); setCurrentView('search'); }}
                      className="px-6 py-2 border-2 border-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-black hover:text-white transition-colors"
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </section>

              {/* Top Rated Doctors */}
              <section>
                <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-2">
                  <h2 className="text-xs font-black uppercase tracking-[0.2em]">Featured Medical Professionals</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {DOCTORS.slice(0, 3).map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} onClick={() => navigateToDoctor(doctor)} />
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {currentView === 'search' && (
            <motion.div 
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              <div className="flex flex-col md:flex-row gap-12">
                {/* Filters Sidebar */}
                <aside className="w-full md:w-64 space-y-8 shrink-0">
                  <div className="border-4 border-black p-8 bg-white">
                    <div className="flex items-center gap-2 mb-8">
                      <Filter className="w-5 h-5 text-black" strokeWidth={3} />
                      <h3 className="text-xs font-black uppercase tracking-widest">Filter By</h3>
                    </div>
                    
                    <div className="space-y-8">
                      <div>
                        <label className="text-[10px] font-black text-black uppercase mb-4 block tracking-[0.2em] opacity-40">Specialty</label>
                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => setSelectedSpecialty(null)}
                            className={`w-full text-left px-4 py-2 font-black text-xs uppercase tracking-widest transition-colors ${!selectedSpecialty ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                          >
                            All
                          </button>
                          {SPECIALTIES.map(spec => (
                            <button 
                              key={spec}
                              onClick={() => setSelectedSpecialty(spec)}
                              className={`w-full text-left px-4 py-2 font-black text-xs uppercase tracking-widest transition-colors ${selectedSpecialty === spec ? 'bg-[#0055FF] text-white' : 'hover:bg-gray-100'}`}
                            >
                              {spec}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>

                {/* Results Area */}
                <div className="flex-1 space-y-8">
                  <div className="pb-4 border-b-2 border-black">
                    <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">
                      {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Expert' : 'Experts'} Available
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredDoctors.map((doctor) => (
                      <DoctorCard key={doctor.id} doctor={doctor} onClick={() => navigateToDoctor(doctor)} />
                    ))}
                  </div>
                  {filteredDoctors.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-center border-4 border-dashed border-black">
                      <Search className="w-12 h-12 text-black mb-6" strokeWidth={3} />
                      <h3 className="text-2xl font-black uppercase tracking-tight mb-2">No results matching criteria</h3>
                      <p className="text-sm font-bold uppercase opacity-50">Please broaden your search or filter requirements.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'doctor' && selectedDoctor && (
            <motion.div 
              key="doctor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-6xl mx-auto"
            >
              <button 
                onClick={() => setCurrentView('search')}
                className="mb-12 flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-[#0055FF]"
              >
                <ChevronRight className="rotate-180 w-4 h-4" strokeWidth={3} />
                Return to Directory
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Doctor Bio */}
                <div className="lg:col-span-8 space-y-12">
                  <div className="border-4 border-black p-10 flex flex-col md:flex-row gap-10 items-start">
                    <img 
                      src={selectedDoctor.imageUrl} 
                      alt={selectedDoctor.name} 
                      className="w-48 h-48 border-4 border-black object-cover shrink-0 grayscale hover:grayscale-0 transition-all"
                    />
                    <div className="space-y-6 flex-1">
                      <div>
                        <span className="text-xs font-black uppercase bg-black text-white px-3 py-1 tracking-widest">{selectedDoctor.specialty}</span>
                        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mt-4 mb-2">{selectedDoctor.name}</h1>
                        <p className="text-sm font-bold uppercase tracking-widest opacity-60 italic">{selectedDoctor.location}</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 py-6 border-t-2 border-b-2 border-black">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-tighter opacity-40">Experience</span>
                          <p className="text-lg font-black uppercase leading-none">{selectedDoctor.experience} Yrs</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-tighter opacity-40">Clinical Rating</span>
                          <div className="flex items-center gap-1">
                            <span className="text-lg font-black uppercase leading-none">{selectedDoctor.rating}</span>
                            <Star className="w-4 h-4 text-black fill-black" strokeWidth={3} />
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-tighter opacity-40">Total Reviews</span>
                          <p className="text-lg font-black uppercase leading-none">{selectedDoctor.reviews}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Professional Profile</h3>
                    <p className="text-lg font-medium leading-relaxed max-w-3xl italic text-gray-700">
                      "{selectedDoctor.about}"
                    </p>
                  </div>
                </div>

                {/* Booking Section */}
                <div className="lg:col-span-4 translate-y-0 lg:-translate-y-12">
                  <div className="border-4 border-black p-10 bg-white sticky top-32">
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                      <Calendar className="w-6 h-6" strokeWidth={3} />
                      Slot Reservation
                    </h3>
                    <div className="space-y-4">
                      {selectedDoctor.availability.map((slot) => {
                        const date = new Date(slot);
                        return (
                          <button
                            key={slot}
                            onClick={() => handleBookAppointment(selectedDoctor, slot)}
                            className="group w-full flex items-center justify-between p-6 border-2 border-black hover:bg-[#0055FF] hover:text-white transition-all text-left"
                          >
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">
                                {date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                              </p>
                              <p className="text-2xl font-black uppercase tracking-tighter">
                                {date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" strokeWidth={4} />
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-10 pt-10 border-t-2 border-black text-xs font-bold uppercase tracking-widest leading-relaxed">
                      All appointments are subject to insurance verification upon arrival.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'profile' && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto space-y-16 pt-10"
            >
              <div className="border-4 border-black p-10 flex flex-col md:flex-row gap-10 items-center">
                <div className="w-40 h-40 bg-black flex items-center justify-center text-white text-6xl font-black border-4 border-black">
                   {MOCK_USER.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="space-y-4 flex-1 text-center md:text-left">
                  <div>
                    <span className="text-[10px] font-black uppercase bg-[#00FF00] text-black px-2 py-1 tracking-widest">Active Member</span>
                    <h1 className="text-5xl font-black uppercase tracking-tighter mt-4">{MOCK_USER.name}</h1>
                    <p className="text-sm font-bold uppercase tracking-widest opacity-50 italic">{MOCK_USER.email}</p>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="px-5 py-2 border-2 border-black text-xs font-black uppercase tracking-widest">
                      {appointments.length} Total Bookings
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center justify-between border-b-2 border-black pb-2">
                  <h2 className="text-xs font-black uppercase tracking-[0.2em]">Upcoming Schedule</h2>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {appointments.length > 0 ? (
                    appointments.map((appt) => {
                      const doctor = DOCTORS.find(d => d.id === appt.doctorId);
                      return (
                        <div key={appt.id} className="border-4 border-black p-8 flex flex-col md:flex-row items-center justify-between hover:bg-gray-50 transition-colors">
                          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                            <img src={doctor?.imageUrl} alt={doctor?.name} className="w-20 h-20 border-2 border-black object-cover" />
                            <div>
                               <span className="text-[10px] font-black uppercase bg-black text-white px-2 py-0.5 tracking-widest">{doctor?.specialty}</span>
                              <h4 className="font-black text-2xl uppercase tracking-tighter mt-2">{doctor?.name}</h4>
                              <div className="flex items-center gap-6 mt-3 font-black uppercase text-sm tracking-tighter">
                                <span className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  {appt.date}
                                </span>
                                <span className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" />
                                  {appt.time}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row md:flex-col items-center md:items-end gap-6 mt-8 md:mt-0">
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0055FF]">Confirmed</span>
                            <button className="text-xs font-black uppercase tracking-widest text-red-500 hover:underline">Revoke Access</button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-24 text-center border-4 border-dashed border-black">
                      <h3 className="text-2xl font-black uppercase tracking-tight mb-4 opacity-30 italic leading-none">Your agenda is clear</h3>
                      <button 
                        onClick={() => setCurrentView('search')}
                        className="text-xs font-black uppercase tracking-widest bg-black text-white px-6 py-3 hover:bg-[#0055FF] transition-colors"
                      >
                        Secure Appointment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-2">
             <div className="text-3xl font-black tracking-tighter italic uppercase">Vital.Net</div>
             <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 flex items-center gap-2">
               <span className="w-2 h-2 bg-[#00FF00] rounded-full"></span>
               System Online: 1,402 Experts Active
             </p>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40">© 2026 Vital Healthcare Systems — All Appointments Insured</p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
            <a href="#" className="hover:text-[#0055FF]">Legal</a>
            <a href="#" className="hover:text-[#0055FF]">Internal Policy</a>
            <a href="#" className="hover:text-[#0055FF]">Secure Channel</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface DoctorCardProps {
  doctor: Doctor;
  onClick: () => void;
  key?: string | number;
}

function DoctorCard({ doctor, onClick }: DoctorCardProps) {
  return (
    <motion.div 
      className="group relative border-4 border-black p-8 flex flex-col justify-between hover:bg-[#0055FF] hover:text-white transition-colors cursor-pointer bg-white"
      onClick={onClick}
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <span className="text-xs font-black uppercase bg-black text-white px-2 py-1 group-hover:bg-white group-hover:text-[#0055FF] tracking-widest">
            {doctor.rating >= 4.9 ? 'Top Rated' : 'Specialist'}
          </span>
          <span className="text-2xl font-black">{doctor.rating}</span>
        </div>
        <div className="flex gap-6 mb-4">
          <img 
            src={doctor.imageUrl} 
            alt={doctor.name} 
            className="w-20 h-20 border-2 border-black object-cover grayscale group-hover:grayscale-0 transition-all"
            referrerPolicy="no-referrer"
          />
          <div>
            <h2 className="text-4xl font-black uppercase leading-[0.9] mb-1">
              {doctor.name.split(' ').slice(1).join(' ')}<br/>
              <span className="opacity-50 group-hover:opacity-100">{doctor.name.split(' ')[0]}</span>
            </h2>
            <p className="text-xs font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">
              {doctor.specialty}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-12 flex justify-between items-end border-t-2 border-black pt-6 group-hover:border-white">
        <div className="text-[10px] font-black leading-tight uppercase tracking-tighter">
          Available Today<br/>
          <span className="text-lg">09:00 — 17:00</span>
        </div>
        <button className="px-5 py-2 bg-black text-white font-black text-xs uppercase tracking-widest group-hover:bg-white group-hover:text-black transition-colors">
          Book
        </button>
      </div>
    </motion.div>
  );
}

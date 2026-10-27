import LandingPage from './pages/LandingPage/LandingPage'
import Agenda from './pages/Agenda/Agenda'
import Support from './pages/Support/Support'
import Login from './pages/Auth/Login/Login'
import Signup from './pages/Auth/Signup/Signup'
import UserDashboard from './pages/UserDashboard/UserDashboard'
import OrganizerDashboard from './pages/OrganizerDashboard/OrganizerDashboard'
import EventOrganizerDashboard from './pages/EventOrganizerDashboard/EventOrganizerDashboard'
import AttendeeDashboard from './pages/AttendeeDashboard/AttendeeDashboard'
import CommunityBuilderDashboard from './pages/CommunityBuilderDashboard/CommunityBuilderDashboard'
import MusicPage from './pages/MusicPage/MusicPage'
import { useState } from 'react'

function App() {
  const [page, setPage] = useState('landing')

  if (page === 'login') return <Login onNavigate={setPage} />
  if (page === 'signup') return <Signup onNavigate={setPage} />
  if (page === 'agenda') return <Agenda onNavigate={setPage} />
  if (page === 'dashboard') return <UserDashboard onNavigate={setPage} />
  if (page === 'attendee-dashboard') return <AttendeeDashboard onNavigate={setPage} />
  if (page === 'organizer-dashboard') return <OrganizerDashboard onNavigate={setPage} />
  if (page === 'event-organizer-dashboard') return <EventOrganizerDashboard onNavigate={setPage} />
  if (page === 'community-builder-dashboard') return <CommunityBuilderDashboard onNavigate={setPage} />
  if (page === 'music') return <MusicPage onNavigate={setPage} />
  if (page === 'faq') return <Support initialPage="faq" onNavigate={setPage} />
  if (page === 'contact') return <Support initialPage="contact" onNavigate={setPage} />
  if (page === 'terms') return <Support initialPage="terms" onNavigate={setPage} />
  if (page === 'privacy') return <Support initialPage="privacy" onNavigate={setPage} />
  return <LandingPage onNavigate={setPage} />
}

export default App
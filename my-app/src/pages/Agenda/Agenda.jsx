import { useMemo, useState } from 'react'
import './Agenda.css'

const sessions = [
	{ id: 1, day: 'Day 1', date: 'Oct 18', time: '09:00 - 09:45', title: 'Building products people return to', topic: 'Tech', level: 'Intermediate', track: 'Tech Track', stage: 'Main Stage', speaker: 'Amina Wanjiku', role: 'Product leader', avatar: 'https://i.pravatar.cc/100?img=47', room: 'Main Hall' },
	{ id: 2, day: 'Day 1', date: 'Oct 18', time: '10:15 - 11:00', title: 'Designing the room for connection', topic: 'Workshop', level: 'Beginner', track: 'Experience', stage: 'Workshop Room B', speaker: 'Brian Otieno', role: 'Experience designer', avatar: 'https://i.pravatar.cc/100?img=12', room: 'Workshop Room B' },
	{ id: 3, day: 'Day 1', date: 'Oct 18', time: '14:00 - 14:45', title: 'The rhythm of a memorable live show', topic: 'Music', level: 'All levels', track: 'Creative Track', stage: 'Main Stage', speaker: 'Nia Kendi', role: 'Creative director', avatar: 'https://i.pravatar.cc/100?img=32', room: 'Main Hall' },
	{ id: 4, day: 'Day 2', date: 'Oct 19', time: '09:30 - 10:15', title: 'From idea to your first prototype', topic: 'Tech', level: 'Beginner', track: 'Tech Track', stage: 'Tech Lab', speaker: 'David Kibet', role: 'Founder, BuildLab', avatar: 'https://i.pravatar.cc/100?img=68', room: 'Tech Lab' },
	{ id: 5, day: 'Day 2', date: 'Oct 19', time: '11:00 - 12:00', title: 'Networking without the awkwardness', topic: 'Networking', level: 'All levels', track: 'Community', stage: 'Workshop Room B', speaker: 'Faith Achieng', role: 'Community strategist', avatar: 'https://i.pravatar.cc/100?img=44', room: 'Workshop Room B' },
	{ id: 6, day: 'Virtual', date: 'Oct 20', time: '18:00 - 18:45', title: 'The global creator economy', topic: 'Tech', level: 'Advanced', track: 'Virtual Stream', stage: 'Virtual Main Stage', speaker: 'Owen Kamau', role: 'Investor and educator', avatar: 'https://i.pravatar.cc/100?img=11', room: 'Online stream' },
]

const days = ['Day 1', 'Day 2', 'Virtual']
const filterOptions = {
	Topic: ['All topics', 'Tech', 'Music', 'Workshop', 'Networking'],
	Level: ['All levels', 'Beginner', 'Intermediate', 'Advanced'],
	Stage: ['All stages', 'Main Stage', 'Workshop Room B', 'Tech Lab', 'Virtual Main Stage'],
}

function Agenda({ onNavigate }) {
	const [activeDay, setActiveDay] = useState('Day 1')
	const [filters, setFilters] = useState({ Topic: 'All topics', Level: 'All levels', Stage: 'All stages' })
	const [bookmarked, setBookmarked] = useState([])
	const [calendarMessage, setCalendarMessage] = useState('')

	const visibleSessions = useMemo(() => sessions.filter((session) => session.day === activeDay && (filters.Topic === 'All topics' || session.topic === filters.Topic) && (filters.Level === 'All levels' || session.level === filters.Level) && (filters.Stage === 'All stages' || session.stage === filters.Stage)), [activeDay, filters])

	function updateFilter(name, value) {
		setFilters((current) => ({ ...current, [name]: value }))
	}

	function toggleBookmark(id) {
		setBookmarked((current) => current.includes(id) ? current.filter((sessionId) => sessionId !== id) : [...current, id])
	}

	function addToGoogleCalendar(session) {
		const start = session.day === 'Day 1' ? '20261018T090000' : session.day === 'Day 2' ? '20261019T093000' : '20261020T180000'
		const end = session.day === 'Virtual' ? '20261020T184500' : session.day === 'Day 1' ? '20261018T094500' : '20261019T101500'
		const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(session.title)}&dates=${start}/${end}&details=${encodeURIComponent(`${session.track} with ${session.speaker}`)}&location=${encodeURIComponent(session.room)}`
		window.open(url, '_blank', 'noopener,noreferrer')
	}

	function addToAppleCalendar(session) {
		const content = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', `SUMMARY:${session.title}`, `LOCATION:${session.room}`, `DESCRIPTION:${session.track} with ${session.speaker}`, 'DTSTART:20261018T090000', 'DTEND:20261018T094500', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n')
		const link = document.createElement('a')
		link.href = URL.createObjectURL(new Blob([content], { type: 'text/calendar' }))
		link.download = `${session.title.toLowerCase().replaceAll(' ', '-')}.ics`
		link.click()
		URL.revokeObjectURL(link.href)
		setCalendarMessage('Apple Calendar file downloaded.')
	}

	return (
		<main className="agenda-page">
			<header className="agenda-header"><button className="agenda-brand" onClick={() => onNavigate('landing')}><img src="/gatherly-mark.svg" alt="" />Gatherly</button><nav aria-label="Agenda navigation"><button onClick={() => onNavigate('landing')}>Discover events</button><button className="agenda-nav-active">Agenda</button><button onClick={() => onNavigate('landing')}>My schedule</button></nav><button className="agenda-back" onClick={() => onNavigate('landing')}>&larr; Dashboard</button></header>
			<section className="agenda-hero"><div><p className="agenda-kicker">Nairobi Creative Summit · Oct 18-20, 2026</p><h1>Shape your<br /><em>best day.</em></h1><p>Build a schedule that follows your curiosity. Save the sessions you want to see and never miss your next big idea.</p></div><div className="agenda-count"><strong>{bookmarked.length}</strong><span>saved sessions</span></div></section>
			<section className="agenda-content"><div className="agenda-heading"><div><p className="agenda-kicker">Your programme</p><h2>Agenda / Schedule</h2></div><span>{visibleSessions.length} sessions</span></div><div className="day-tabs" role="tablist" aria-label="Schedule days">{days.map((day) => <button key={day} className={activeDay === day ? 'active' : ''} onClick={() => setActiveDay(day)}>{day}<small>{day === 'Day 1' ? '18 Oct' : day === 'Day 2' ? '19 Oct' : '20 Oct'}</small></button>)}</div><div className="agenda-filters">{Object.entries(filterOptions).map(([name, options]) => <label key={name}>{name}<select value={filters[name]} onChange={(event) => updateFilter(name, event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>)}</div>{calendarMessage && <p className="calendar-message" role="status">{calendarMessage}</p>}<div className="session-list">{visibleSessions.map((session) => <article className="session-card" key={session.id}><div className="session-time"><strong>{session.time.split(' - ')[0]}</strong><span>{session.time.split(' - ')[1]}</span></div><div className="session-main"><div className="session-meta"><span>{session.topic}</span><span>{session.track}</span><span>{session.level}</span></div><h3>{session.title}</h3><div className="speaker"><img src={session.avatar} alt={`${session.speaker}, ${session.role}`} /><span><strong>{session.speaker}</strong><small>{session.role}</small></span></div><p className="session-room">&#9673; {session.room} · {session.stage}</p></div><div className="session-actions"><button className={bookmarked.includes(session.id) ? 'bookmark saved' : 'bookmark'} onClick={() => toggleBookmark(session.id)}>{bookmarked.includes(session.id) ? 'Saved' : 'Bookmark'} <span aria-hidden="true">{bookmarked.includes(session.id) ? '★' : '☆'}</span></button><div className="calendar-actions"><button onClick={() => addToGoogleCalendar(session)}>Google Calendar</button><button onClick={() => addToAppleCalendar(session)}>Apple Calendar</button></div></div></article>)}</div>{visibleSessions.length === 0 && <div className="agenda-empty"><h3>No sessions match these filters.</h3><button onClick={() => setFilters({ Topic: 'All topics', Level: 'All levels', Stage: 'All stages' })}>Clear filters</button></div>}</section>
			<footer className="agenda-footer"><span>Gatherly · Nairobi Creative Summit</span><button onClick={() => onNavigate('landing')}>Back to event dashboard</button></footer>
		</main>
	)
}

export default Agenda

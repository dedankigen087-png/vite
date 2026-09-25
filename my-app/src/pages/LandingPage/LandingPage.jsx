import { useMemo, useState } from 'react'
import './LandingPage.css'

const starterEvents = [
	{ id: 1, title: 'Nairobi Creative Summit', category: 'Conference', date: 'Oct 18, 2026', time: '9:00 AM', location: 'KICC, Nairobi', attendees: 248, capacity: 400, image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=85', description: 'A full day of ideas, design, and meaningful connections for creative professionals.' },
	{ id: 2, title: 'Sunset Jazz Sessions', category: 'Music', date: 'Oct 24, 2026', time: '5:30 PM', location: 'The Alchemist, Nairobi', attendees: 156, capacity: 220, image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=85', description: 'An intimate evening of live jazz, good food, and a beautiful Nairobi sunset.' },
	{ id: 3, title: 'Product Builders Meetup', category: 'Networking', date: 'Nov 02, 2026', time: '6:00 PM', location: 'iHub, Nairobi', attendees: 89, capacity: 150, image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85', description: 'Meet the people building the next generation of products across Africa.' },
	{ id: 4, title: 'Wellness In The Park', category: 'Wellness', date: 'Nov 08, 2026', time: '7:00 AM', location: 'Uhuru Gardens, Nairobi', attendees: 72, capacity: 120, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=85', description: 'Start your weekend with movement, mindfulness, and community in the open air.' },
]

const categories = ['All events', 'Conference', 'Music', 'Networking', 'Wellness']

function LandingPage() {
	const [events, setEvents] = useState(starterEvents)
	const [activeCategory, setActiveCategory] = useState('All events')
	const [search, setSearch] = useState('')
	const [registered, setRegistered] = useState([])
	const [selectedEvent, setSelectedEvent] = useState(null)
	const [isCreateOpen, setIsCreateOpen] = useState(false)
	const [form, setForm] = useState({ title: '', category: 'Conference', date: '', time: '', location: '', capacity: '100', description: '' })

	const filteredEvents = useMemo(() => events.filter((event) => {
		const matchesCategory = activeCategory === 'All events' || event.category === activeCategory
		const searchText = `${event.title} ${event.location} ${event.category}`.toLowerCase()
		return matchesCategory && searchText.includes(search.toLowerCase())
	}), [events, activeCategory, search])

	function registerForEvent(eventId) {
		setRegistered((current) => current.includes(eventId) ? current.filter((id) => id !== eventId) : [...current, eventId])
	}

	function updateForm(event) {
		setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
	}

	function createEvent(event) {
		event.preventDefault()
		const newEvent = { ...form, id: Date.now(), attendees: 0, capacity: Number(form.capacity), image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85' }
		setEvents((current) => [newEvent, ...current])
		setForm({ title: '', category: 'Conference', date: '', time: '', location: '', capacity: '100', description: '' })
		setIsCreateOpen(false)
	}

	return (
		<main className="event-app">
			<header className="event-header">
				<a className="event-brand" href="#events" aria-label="Gatherly events"><span className="event-brand-mark">G</span>Gatherly</a>
				<nav className="event-nav" aria-label="Event management navigation"><a className="active" href="#events">Discover events</a><a href="#my-events">My events</a><a href="#attendees">Attendees</a></nav>
				<button className="create-button" onClick={() => setIsCreateOpen(true)}>+ Create event</button>
			</header>

			<section className="event-welcome" id="events">
				<div><p className="event-kicker">Your event workspace</p><h1>Bring people<br /><em>together.</em></h1><p className="welcome-copy">Discover memorable experiences, manage your events, and make every gathering count.</p></div>
				<div className="welcome-stat"><span className="stat-orbit">G</span><strong>{events.length}</strong><span>upcoming events</span></div>
			</section>

			<section className="event-content" aria-label="Event discovery">
				<div className="toolbar"><div className="search-field"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search events, places, or categories" aria-label="Search events" /></div><button className="filter-button" onClick={() => setActiveCategory('All events')}>Reset filters</button></div>
				<div className="category-tabs" role="tablist" aria-label="Filter events">{categories.map((category) => <button key={category} className={activeCategory === category ? 'category-tab active' : 'category-tab'} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
				<div className="section-heading"><div><p className="event-kicker">Curated for you</p><h2>Upcoming events</h2></div><span>{filteredEvents.length} results</span></div>
				<div className="events-grid">{filteredEvents.map((event) => <article className="event-card" key={event.id}><img src={event.image} alt="" /><div className="event-card-body"><div className="event-card-top"><span className="event-category">{event.category}</span><button className="more-button" onClick={() => setSelectedEvent(event)} aria-label={`View ${event.title}`}>...</button></div><h3>{event.title}</h3><p className="event-description">{event.description}</p><div className="event-details"><span>▣ {event.date}</span><span>◷ {event.time}</span><span>⌖ {event.location}</span></div><div className="event-capacity"><div><span>{event.attendees} attending</span><span>{event.capacity} seats</span></div><div className="capacity-track"><span style={{ width: `${Math.min((event.attendees / event.capacity) * 100, 100)}%` }} /></div></div><button className={registered.includes(event.id) ? 'register-button registered' : 'register-button'} onClick={() => registerForEvent(event.id)}>{registered.includes(event.id) ? 'Registered ✓' : 'Register now'}<span aria-hidden="true">-&gt;</span></button></div></article>)}</div>
				{filteredEvents.length === 0 && <div className="empty-state"><h3>No events found</h3><p>Try another search or create a new event.</p><button className="create-button" onClick={() => setIsCreateOpen(true)}>Create an event</button></div>}
			</section>

			<footer className="event-footer"><span className="event-brand"><span className="event-brand-mark">G</span>Gatherly</span><span>Event management made memorable.</span><span>© 2026 Gatherly</span></footer>

			{selectedEvent && <div className="modal-backdrop" onClick={() => setSelectedEvent(null)}><section className="event-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedEvent(null)} aria-label="Close event details">×</button><img src={selectedEvent.image} alt="" /><div className="modal-body"><span className="event-category">{selectedEvent.category}</span><h2>{selectedEvent.title}</h2><p>{selectedEvent.description}</p><div className="modal-info"><span>▣ {selectedEvent.date}</span><span>◷ {selectedEvent.time}</span><span>⌖ {selectedEvent.location}</span></div><button className="register-button" onClick={() => registerForEvent(selectedEvent.id)}>{registered.includes(selectedEvent.id) ? 'Registered ✓' : 'Register now'}<span aria-hidden="true">-&gt;</span></button></div></section></div>}

			{isCreateOpen && <div className="modal-backdrop" onClick={() => setIsCreateOpen(false)}><form className="create-modal" onSubmit={createEvent} onClick={(event) => event.stopPropagation()}><button type="button" className="modal-close" onClick={() => setIsCreateOpen(false)} aria-label="Close create event form">×</button><p className="event-kicker">Event setup</p><h2>Create an event</h2><div className="form-grid"><label>Event name<input name="title" value={form.title} onChange={updateForm} required placeholder="e.g. Design Weekender" /></label><label>Category<select name="category" value={form.category} onChange={updateForm}>{categories.slice(1).map((category) => <option key={category}>{category}</option>)}</select></label><label>Date<input name="date" value={form.date} onChange={updateForm} required placeholder="Oct 25, 2026" /></label><label>Time<input name="time" value={form.time} onChange={updateForm} required placeholder="6:00 PM" /></label><label>Location<input name="location" value={form.location} onChange={updateForm} required placeholder="Venue or online" /></label><label>Capacity<input name="capacity" type="number" min="1" value={form.capacity} onChange={updateForm} required /></label></div><label>Description<textarea name="description" value={form.description} onChange={updateForm} required placeholder="What should guests know?" rows="3" /></label><button className="create-button form-submit" type="submit">Publish event <span aria-hidden="true">-&gt;</span></button></form></div>}
		</main>
	)
}

export default LandingPage
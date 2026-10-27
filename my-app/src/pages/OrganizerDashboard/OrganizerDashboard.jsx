import { useState } from 'react'
import './OrganizerDashboard.css'

const initialEvents = [
	{ id: 1, title: 'Nairobi Creative Summit', date: 'Oct 18, 2026', venue: 'KICC, Nairobi', category: 'Conference', status: 'Published', guests: 248 },
	{ id: 2, title: 'Sunset Jazz Sessions', date: 'Oct 24, 2026', venue: 'The Alchemist, Nairobi', category: 'Music', status: 'Published', guests: 96 },
	{ id: 3, title: 'Community Design Breakfast', date: 'Nov 08, 2026', venue: 'The Social House', category: 'Networking', status: 'Draft', guests: 0 },
]

function OrganizerDashboard({ onNavigate }) {
	const [events, setEvents] = useState(initialEvents)
	const [showForm, setShowForm] = useState(false)
	const [eventTitle, setEventTitle] = useState('')
	const [eventDate, setEventDate] = useState('')
	const [eventVenue, setEventVenue] = useState('')

	function createEvent(event) {
		event.preventDefault()
		const formattedDate = new Date(`${eventDate}T12:00:00`).toLocaleDateString('en-US', {
			month: 'short',
			day: '2-digit',
			year: 'numeric',
		})
		setEvents((current) => [
			...current,
			{ id: Date.now(), title: eventTitle, date: formattedDate, venue: eventVenue, category: 'New event', status: 'Draft', guests: 0 },
		])
		setEventTitle('')
		setEventDate('')
		setEventVenue('')
		setShowForm(false)
	}

	const guestCount = events.reduce((total, event) => total + event.guests, 0)
	const publishedCount = events.filter((event) => event.status === 'Published').length

	return (
		<main className="organizer-dashboard">
			<header className="organizer-header">
				<button className="organizer-brand" onClick={() => onNavigate('landing')} aria-label="Gatherly home">
					<img src="/gatherly-mark.svg" alt="" />Gatherly
				</button>
				<nav aria-label="Organizer dashboard navigation">
					<a className="organizer-nav-active" href="#overview">Overview</a>
					<a href="#events">My events</a>
					<a href="#audience">Audience</a>
				</nav>
				<button className="organizer-account" onClick={() => onNavigate('landing')}>
					<span className="organizer-avatar">O</span><span>Organizer</span><span aria-hidden="true">⌄</span>
				</button>
			</header>

			<div className="organizer-content" id="overview">
				<section className="organizer-welcome">
					<div><p className="organizer-eyebrow">ORGANIZER WORKSPACE</p><h1>Make it a gathering<span>.</span></h1><p>Your events, guests, and next big idea in one place.</p></div>
					<button className="organizer-create-button" type="button" onClick={() => setShowForm((visible) => !visible)}>
						<span aria-hidden="true">+</span> Create event
					</button>
				</section>

				{showForm && (
					<form className="organizer-create-form" onSubmit={createEvent}>
						<div className="organizer-form-heading"><div><p className="organizer-eyebrow">START SOMETHING NEW</p><h2>Create an event</h2></div><button type="button" aria-label="Close form" onClick={() => setShowForm(false)}>×</button></div>
						<label>Event name<input value={eventTitle} onChange={(event) => setEventTitle(event.target.value)} placeholder="e.g. Ideas After Hours" required /></label>
						<label>Date<input type="date" value={eventDate} onChange={(event) => setEventDate(event.target.value)} required /></label>
						<label>Venue<input value={eventVenue} onChange={(event) => setEventVenue(event.target.value)} placeholder="Venue or online" required /></label>
						<button className="organizer-save-button" type="submit">Save as draft <span aria-hidden="true">→</span></button>
					</form>
					)}

				<section className="organizer-metrics" aria-label="Event activity">
					<article><span className="organizer-metric-label">Total events</span><strong>{events.length.toString().padStart(2, '0')}</strong><small>Including drafts</small></article>
					<article><span className="organizer-metric-label">Published</span><strong>{publishedCount.toString().padStart(2, '0')}</strong><small>Open to your community</small></article>
					<article id="audience"><span className="organizer-metric-label">Registered guests</span><strong>{guestCount.toLocaleString()}</strong><small>Across your events</small></article>
					<article><span className="organizer-metric-label">Next event</span><strong className="organizer-next-date">OCT <b>18</b></strong><small>Nairobi Creative Summit</small></article>
				</section>

				<section className="organizer-events" id="events">
					<div className="organizer-section-heading"><div><p className="organizer-eyebrow">YOUR EVENT PORTFOLIO</p><h2>Upcoming events</h2></div><span>{events.length} events</span></div>
					<div className="organizer-event-table" role="table" aria-label="Upcoming events">
						<div className="organizer-event-row organizer-table-head" role="row"><span role="columnheader">Event</span><span role="columnheader">Date & venue</span><span role="columnheader">Guests</span><span role="columnheader">Status</span></div>
						{events.map((event) => (
							<article className="organizer-event-row" role="row" key={event.id}>
								<div className="organizer-event-name"><span className="organizer-event-icon" aria-hidden="true">✳</span><div><span>{event.category}</span><h3>{event.title}</h3></div></div>
								<div className="organizer-event-place"><strong>{event.date}</strong><span>{event.venue}</span></div>
								<strong className="organizer-guest-count">{event.guests}</strong>
								<span className={`organizer-status ${event.status === 'Published' ? 'is-published' : 'is-draft'}`}>{event.status}</span>
							</article>
						))}
					</div>
				</section>

				<aside className="organizer-note"><span aria-hidden="true">✦</span><div><p className="organizer-eyebrow">A NOTE FOR YOUR NEXT EVENT</p><p>Thoughtful details turn a good event into one people remember. Keep your event page fresh as plans come together.</p></div><button type="button" onClick={() => setShowForm(true)}>Plan another event <span aria-hidden="true">→</span></button></aside>
			</div>
			<footer className="organizer-footer"><span>Gatherly <b>/</b> Organizer workspace</span><button onClick={() => onNavigate('landing')}>Discover events <span aria-hidden="true">→</span></button></footer>
		</main>
	)
}

export default OrganizerDashboard
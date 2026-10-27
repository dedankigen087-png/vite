import { useMemo, useState } from 'react'
import './LandingPage.css'

const starterEvents = [
	{ id: 1, title: 'Nairobi Creative Summit', category: 'Conference', date: 'Oct 18, 2026', time: '9:00 AM', location: 'KICC, Nairobi', attendees: 248, capacity: 400, image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=85', description: 'A full day of ideas, design, and meaningful connections for creative professionals.' },
	{ id: 2, title: 'Sunset Jazz Sessions', category: 'Music', date: 'Oct 24, 2026', time: '5:30 PM', location: 'The Alchemist, Nairobi', attendees: 156, capacity: 220, image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=85', description: 'An intimate evening of live jazz, good food, and a beautiful Nairobi sunset.' },
	{ id: 3, title: 'Tamasha Night Eldoret', category: 'Music', date: 'Nov 02, 2026', time: '7:00 PM', location: 'Tamasha, Eldoret', attendees: 89, capacity: 150, image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=85', description: 'A high-energy night of music, dancing, and great company at Tamasha in Eldoret.' },
	{ id: 4, title: 'Forex Trading Meetup at TimberXO', category: 'Networking', date: 'Nov 08, 2026', time: '6:00 PM', location: 'TimberXO, Eldoret', attendees: 72, capacity: 120, image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=85', description: 'Connect with forex traders in Eldoret, discuss market strategies, and learn practical ways to approach the currency markets.' },
]

const categories = ['All events', 'Tech', 'Music', 'Workshop', 'Conference', 'Networking']
const sortOptions = [{ value: 'date-asc', label: 'Date: soonest first' }, { value: 'date-desc', label: 'Date: latest first' }, { value: 'title', label: 'Name: A to Z' }, { value: 'attendees', label: 'Most popular' }]

function LandingPage({ onNavigate }) {
	const [events, setEvents] = useState(starterEvents)
	const [activeCategory, setActiveCategory] = useState('All events')
	const [search, setSearch] = useState('')
	const [sortBy, setSortBy] = useState('date-asc')
	const [registered, setRegistered] = useState([])
	const [selectedEvent, setSelectedEvent] = useState(null)
	const [isCreateOpen, setIsCreateOpen] = useState(false)
	const [checkoutStep, setCheckoutStep] = useState(1)
	const [ticketType, setTicketType] = useState('General')
	const [ticketQuantity, setTicketQuantity] = useState(1)
	const [promoCode, setPromoCode] = useState('')
	const [paymentMethod, setPaymentMethod] = useState('Credit card')
	const [checkoutMessage, setCheckoutMessage] = useState('')
	const [form, setForm] = useState({ title: '', category: 'Conference', date: '', time: '', location: '', capacity: '100', description: '' })
	const [attendeeForm, setAttendeeForm] = useState({ name: '', email: '', company: '', jobTitle: '', dietary: '', shirtSize: 'M' })

	const filteredEvents = useMemo(() => events.filter((event) => {
		const matchesCategory = activeCategory === 'All events' || event.category === activeCategory
		const searchText = `${event.title} ${event.location} ${event.category}`.toLowerCase()
		return matchesCategory && searchText.includes(search.toLowerCase())
	}).sort((first, second) => {
		if (sortBy === 'title') return first.title.localeCompare(second.title)
		if (sortBy === 'attendees') return second.attendees - first.attendees
		const dateDifference = new Date(first.date) - new Date(second.date)
		return sortBy === 'date-desc' ? -dateDifference : dateDifference
	}), [events, activeCategory, search, sortBy])

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

	function updateAttendeeForm(event) {
		setAttendeeForm((current) => ({ ...current, [event.target.name]: event.target.value }))
	}

	function completeCheckout(event) {
		event.preventDefault()
		setCheckoutMessage('Registration confirmed. Your event pass is on its way to your email.')
	}

	return (
		<main className="event-app">
			<header className="event-header">
				<a className="event-brand" href="#events" aria-label="Gatherly events"><img className="event-brand-mark" src="/gatherly-mark.svg" alt="" />Gatherly</a>
				<nav className="event-nav" aria-label="Event management navigation"><a className="active" href="#events">Discover events</a><button className="event-nav-button" onClick={() => onNavigate('music')}>Music</button><button className="event-nav-button" onClick={() => onNavigate('agenda')}>Agenda / Schedule</button><button className="event-nav-button" onClick={() => onNavigate('dashboard')}>My events</button><a href="#attendees">Attendees</a></nav>
				<div className="header-actions"><button className="login-button" onClick={() => onNavigate('login')}>Log in</button><button className="account-button" onClick={() => onNavigate('signup')}>Create account</button><button className="create-button" onClick={() => setIsCreateOpen(true)}>+ Create event</button></div>
			</header>

			<section className="event-welcome" id="events">
				<div><p className="event-kicker">Your event workspace</p><h1>Bring people<br /><em>together.</em></h1><p className="welcome-copy">Discover memorable experiences, manage your events, and make every gathering count.</p></div>
				<div className="welcome-stat"><span className="stat-orbit">G</span><strong>{events.length}</strong><span>upcoming events</span></div>
			</section>

			<section className="event-content" aria-label="Event discovery">
				<div className="filter-heading"><div><p className="event-kicker">Find your next experience</p><h2>Filter, Search &amp; Sort</h2></div><span>Explore {events.length} events</span></div>
				<div className="toolbar"><div className="search-field"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search events, places, or categories" aria-label="Search events" /></div><label className="sort-field"><span>Sort by</span><select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort events">{sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label><button className="filter-button" onClick={() => { setActiveCategory('All events'); setSearch(''); setSortBy('date-asc') }}>Reset filters</button></div>
				<div className="category-tabs" role="tablist" aria-label="Filter events">{categories.map((category) => <button key={category} className={activeCategory === category ? 'category-tab active' : 'category-tab'} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
				<div className="section-heading"><div><p className="event-kicker">Curated for you</p><h2>Upcoming events</h2></div><span>{filteredEvents.length} results</span></div>
				<div className="events-grid">{filteredEvents.map((event) => <article className="event-card" key={event.id}><img src={event.image} alt="" /><div className="event-card-body"><div className="event-card-top"><span className="event-category">{event.category}</span><button className="more-button" onClick={() => setSelectedEvent(event)} aria-label={`View ${event.title}`}>...</button></div><h3>{event.title}</h3><p className="event-description">{event.description}</p><div className="event-details"><span>▣ {event.date}</span><span>◷ {event.time}</span><span>⌖ {event.location}</span></div><div className="event-capacity"><div><span>{event.attendees} attending</span><span>{event.capacity} seats</span></div><div className="capacity-track"><span style={{ width: `${Math.min((event.attendees / event.capacity) * 100, 100)}%` }} /></div></div><button className={registered.includes(event.id) ? 'register-button registered' : 'register-button'} onClick={() => registerForEvent(event.id)}>{registered.includes(event.id) ? 'Registered ✓' : 'Register now'}<span aria-hidden="true">-&gt;</span></button></div></article>)}</div>
				{filteredEvents.length === 0 && <div className="empty-state"><h3>No events found</h3><p>Try another search or create a new event.</p><button className="create-button" onClick={() => setIsCreateOpen(true)}>Create an event</button></div>}
			</section>

			<section className="checkout-section" aria-labelledby="checkout-title">
				<div className="checkout-heading"><div><p className="event-kicker">Reserve your place</p><h2 id="checkout-title">Registration &amp; Checkout</h2><p>Complete your registration in three simple steps.</p></div><span className="secure-note">&#128274; Secure checkout</span></div>
				<div className="checkout-steps" aria-label="Registration steps">{['Ticket selection', 'Attendee details', 'Payment'].map((step, index) => <button key={step} className={checkoutStep === index + 1 ? 'checkout-step active' : checkoutStep > index + 1 ? 'checkout-step complete' : 'checkout-step'} onClick={() => checkoutStep > index + 1 && setCheckoutStep(index + 1)}><span>{index + 1}</span>{step}</button>)}</div>
				<div className="checkout-card">
					{checkoutStep === 1 && <div className="checkout-panel"><h3>Choose your ticket</h3><p className="panel-copy">Select a ticket tier and reserve seats for your next event.</p><div className="ticket-options">{[{ name: 'Early Bird', price: 25, note: 'Limited availability' }, { name: 'General', price: 40, note: 'Standard access' }, { name: 'VIP', price: 90, note: 'Priority access + lounge' }, { name: 'Virtual', price: 15, note: 'Join from anywhere' }].map((ticket) => <button key={ticket.name} className={ticketType === ticket.name ? 'ticket-option selected' : 'ticket-option'} onClick={() => setTicketType(ticket.name)}><span><strong>{ticket.name}</strong><small>{ticket.note}</small></span><b>${ticket.price}</b></button>)}</div><div className="checkout-row"><label>Quantity<select value={ticketQuantity} onChange={(event) => setTicketQuantity(Number(event.target.value))}>{[1, 2, 3, 4, 5].map((quantity) => <option key={quantity}>{quantity}</option>)}</select></label><label>Discount or promo code<div className="promo-field"><input value={promoCode} onChange={(event) => setPromoCode(event.target.value)} placeholder="Enter code" /><button type="button" onClick={() => setCheckoutMessage(promoCode ? 'Promo code applied.' : 'Enter a promo code first.')}>Apply</button></div></label></div><button className="checkout-next" onClick={() => setCheckoutStep(2)}>Continue to attendee details <span aria-hidden="true">-&gt;</span></button></div>}
					{checkoutStep === 2 && <form className="checkout-panel" onSubmit={(event) => { event.preventDefault(); setCheckoutStep(3) }}><h3>Tell us about yourself</h3><p className="panel-copy">We use these details to prepare your event pass and experience.</p><div className="attendee-grid"><label>Full name<input name="name" value={attendeeForm.name} onChange={updateAttendeeForm} required placeholder="Alex Morgan" /></label><label>Email address<input name="email" type="email" value={attendeeForm.email} onChange={updateAttendeeForm} required placeholder="alex@example.com" /></label><label>Company<input name="company" value={attendeeForm.company} onChange={updateAttendeeForm} placeholder="Company name" /></label><label>Job title<input name="jobTitle" value={attendeeForm.jobTitle} onChange={updateAttendeeForm} placeholder="Your role" /></label><label>Dietary restrictions<input name="dietary" value={attendeeForm.dietary} onChange={updateAttendeeForm} placeholder="None" /></label><label>T-shirt size<select name="shirtSize" value={attendeeForm.shirtSize} onChange={updateAttendeeForm}>{['S', 'M', 'L', 'XL'].map((size) => <option key={size}>{size}</option>)}</select></label></div><div className="checkout-actions"><button type="button" className="checkout-back" onClick={() => setCheckoutStep(1)}>&larr; Back</button><button className="checkout-next" type="submit">Continue to payment <span aria-hidden="true">-&gt;</span></button></div></form>}
					{checkoutStep === 3 && <form className="checkout-panel" onSubmit={completeCheckout}><h3>Complete payment</h3><p className="panel-copy">Your payment details are encrypted and securely processed.</p><div className="payment-methods" role="radiogroup" aria-label="Payment method">{['Credit card', 'Stripe', 'PayPal', 'Apple Pay'].map((method) => <button type="button" key={method} className={paymentMethod === method ? 'payment-method selected' : 'payment-method'} onClick={() => setPaymentMethod(method)}>{method}</button>)}</div>{paymentMethod === 'Credit card' && <div className="card-fields"><label>Cardholder name<input required placeholder="Alex Morgan" /></label><label>Card number<input required inputMode="numeric" placeholder="•••• •••• •••• 4242" /></label><div><label>Expiry date<input required placeholder="MM / YY" /></label><label>CVV<input required inputMode="numeric" placeholder="123" /></label></div></div>}<div className="checkout-summary"><span>{ticketQuantity} × {ticketType} ticket</span><strong>${(ticketQuantity * ({ 'Early Bird': 25, General: 40, VIP: 90, Virtual: 15 }[ticketType])).toFixed(2)}</strong></div><div className="checkout-actions"><button type="button" className="checkout-back" onClick={() => setCheckoutStep(2)}>&larr; Back</button><button className="checkout-next" type="submit">Pay &amp; register <span aria-hidden="true">-&gt;</span></button></div></form>}
					{checkoutMessage && <p className="checkout-success" role="status">{checkoutMessage}</p>}
				</div>
			</section>

			<footer className="event-footer">
				<div className="footer-main">
					<div className="footer-intro"><a className="event-brand" href="#events" aria-label="Gatherly home"><img className="event-brand-mark" src="/gatherly-mark.svg" alt="" />Gatherly</a><p>Event management made memorable.</p><a className="footer-email" href="mailto:hello@gatherly.example">hello@gatherly.example</a></div>
					<div className="footer-column"><h3>Discover</h3><a href="#events">Upcoming events</a><a href="#events">Browse categories</a><a href="#events">Popular events</a></div>
					<div className="footer-column"><h3>Organize</h3><a href="#events">Create an event</a><a href="#my-events">Manage events</a><a href="#attendees">Attendee tools</a></div>
					<div className="footer-column"><h3>Support</h3><button className="footer-link-button" onClick={() => onNavigate('faq')}>FAQ</button><button className="footer-link-button" onClick={() => onNavigate('contact')}>Contact us</button><button className="footer-link-button" onClick={() => onNavigate('terms')}>Terms &amp; conditions</button><button className="footer-link-button" onClick={() => onNavigate('privacy')}>Privacy policy</button></div>
				</div>
				<div className="footer-bottom"><span>© 2026 Gatherly. All rights reserved.</span><div><button className="footer-link-button" onClick={() => onNavigate('privacy')}>Privacy</button><button className="footer-link-button" onClick={() => onNavigate('terms')}>Terms</button><a href="#events">Accessibility</a></div><span>Made for better gatherings.</span></div>
			</footer>

			{selectedEvent && <div className="modal-backdrop" onClick={() => setSelectedEvent(null)}><section className="event-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedEvent(null)} aria-label="Close event details">×</button><img src={selectedEvent.image} alt="" /><div className="modal-body"><span className="event-category">{selectedEvent.category}</span><h2>{selectedEvent.title}</h2><p>{selectedEvent.description}</p><div className="modal-info"><span>▣ {selectedEvent.date}</span><span>◷ {selectedEvent.time}</span><span>⌖ {selectedEvent.location}</span></div><button className="register-button" onClick={() => registerForEvent(selectedEvent.id)}>{registered.includes(selectedEvent.id) ? 'Registered ✓' : 'Register now'}<span aria-hidden="true">-&gt;</span></button></div></section></div>}

			{isCreateOpen && <div className="modal-backdrop" onClick={() => setIsCreateOpen(false)}><form className="create-modal" onSubmit={createEvent} onClick={(event) => event.stopPropagation()}><button type="button" className="modal-close" onClick={() => setIsCreateOpen(false)} aria-label="Close create event form">×</button><p className="event-kicker">Event setup</p><h2>Create an event</h2><div className="form-grid"><label>Event name<input name="title" value={form.title} onChange={updateForm} required placeholder="e.g. Design Weekender" /></label><label>Category<select name="category" value={form.category} onChange={updateForm}>{categories.slice(1).map((category) => <option key={category}>{category}</option>)}</select></label><label>Date<input name="date" value={form.date} onChange={updateForm} required placeholder="Oct 25, 2026" /></label><label>Time<input name="time" value={form.time} onChange={updateForm} required placeholder="6:00 PM" /></label><label>Location<input name="location" value={form.location} onChange={updateForm} required placeholder="Venue or online" /></label><label>Capacity<input name="capacity" type="number" min="1" value={form.capacity} onChange={updateForm} required /></label></div><label>Description<textarea name="description" value={form.description} onChange={updateForm} required placeholder="What should guests know?" rows="3" /></label><button className="create-button form-submit" type="submit">Publish event <span aria-hidden="true">-&gt;</span></button></form></div>}
		</main>
	)
}

export default LandingPage
import './UserDashboard.css'

const upcomingEvents = [
	{
		id: 1,
		date: { month: 'OCT', day: '18' },
		title: 'Nairobi Creative Summit',
		category: 'Conference',
		time: '9:00 AM',
		location: 'KICC, Nairobi',
		image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=85',
	},
	{
		id: 2,
		date: { month: 'OCT', day: '24' },
		title: 'Sunset Jazz Sessions',
		category: 'Music',
		time: '5:30 PM',
		location: 'The Alchemist, Nairobi',
		image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=85',
	},
	{
		id: 3,
		date: { month: 'NOV', day: '08' },
		title: 'Forex Trading Meetup at TimberXO',
		category: 'Networking',
		time: '6:00 PM',
		location: 'TimberXO, Eldoret',
		image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=85',
	},
]

function UserDashboard({ onNavigate }) {
	return (
		<main className="user-dashboard">
			<header className="dashboard-header">
				<button className="dashboard-brand" onClick={() => onNavigate('landing')} aria-label="Gatherly home">
					<img className="dashboard-brand-mark" src="/gatherly-mark.svg" alt="" />Gatherly
				</button>
				<nav aria-label="Dashboard navigation">
					<button className="dashboard-nav-active" onClick={() => onNavigate('dashboard')}>Overview</button>
					<button onClick={() => onNavigate('agenda')}>My schedule</button>
					<button onClick={() => onNavigate('landing')}>Discover events</button>
				</nav>
				<button className="dashboard-profile" onClick={() => onNavigate('landing')} aria-label="Account menu">
					<span className="dashboard-avatar">A</span><span>Alex Morgan</span><span aria-hidden="true">⌄</span>
				</button>
			</header>

			<div className="dashboard-body">
				<section className="dashboard-welcome">
					<div>
						<p className="dashboard-eyebrow">MONDAY, OCTOBER 12, 2026</p>
						<h1>Good morning, Alex<span>.</span></h1>
						<p>Your next great gathering is just around the corner.</p>
					</div>
					<button className="dashboard-primary-action" onClick={() => onNavigate('landing')}>Explore events <span aria-hidden="true">-&gt;</span></button>
				</section>

				<section className="dashboard-stats" aria-label="Your activity">
					<article className="dashboard-stat dashboard-stat-highlight">
						<span className="dashboard-stat-icon" aria-hidden="true">◎</span>
						<div><span>Upcoming events</span><strong>3</strong></div>
						<small>Across the next 4 weeks</small>
					</article>
					<article className="dashboard-stat">
						<span className="dashboard-stat-icon" aria-hidden="true">▤</span>
						<div><span>Saved sessions</span><strong>5</strong></div>
						<small>At Nairobi Creative Summit</small>
					</article>
					<article className="dashboard-stat">
						<span className="dashboard-stat-icon" aria-hidden="true">↗</span>
						<div><span>People you’ll meet</span><strong>24</strong></div>
						<small>Connections across your events</small>
					</article>
				</section>

				<div className="dashboard-columns">
					<section className="dashboard-events" aria-labelledby="dashboard-events-title">
						<div className="dashboard-section-heading">
							<div><p className="dashboard-eyebrow">MAKE ROOM FOR WHAT'S NEXT</p><h2 id="dashboard-events-title">Your upcoming events</h2></div>
							<button onClick={() => onNavigate('landing')}>Browse all <span aria-hidden="true">-&gt;</span></button>
						</div>
						<div className="dashboard-event-list">
							{upcomingEvents.map((event) => (
								<article className="dashboard-event" key={event.id}>
									<img src={event.image} alt="" />
									<div className="dashboard-event-date"><span>{event.date.month}</span><strong>{event.date.day}</strong></div>
									<div className="dashboard-event-info">
										<span className="dashboard-event-category">{event.category}</span>
										<h3>{event.title}</h3>
										<p>{event.time}<span aria-hidden="true"> · </span>{event.location}</p>
									</div>
									<button className="dashboard-event-open" onClick={() => onNavigate('agenda')} aria-label={`Open schedule for ${event.title}`}>&rarr;</button>
								</article>
							))}
						</div>
					</section>

					<aside className="dashboard-side-column">
						<section className="dashboard-next-event">
							<p className="dashboard-eyebrow">UP NEXT</p>
							<h2>Nairobi Creative Summit</h2>
							<p className="dashboard-next-date">Sunday, October 18 <span>·</span> 9:00 AM</p>
							<div className="dashboard-countdown"><strong>06</strong><span>days to go</span><span className="dashboard-countdown-rule" aria-hidden="true" /></div>
							<button onClick={() => onNavigate('agenda')}>View my schedule <span aria-hidden="true">-&gt;</span></button>
						</section>
						<section className="dashboard-tip">
							<span className="dashboard-tip-mark" aria-hidden="true">✳</span>
							<div><p className="dashboard-eyebrow">A GOOD THING TO KNOW</p><h2>Make the most of your day</h2><p>Your summit sessions are ready. Pick your favorites in the agenda and build a day that feels like yours.</p><button onClick={() => onNavigate('agenda')}>Plan your day <span aria-hidden="true">-&gt;</span></button></div>
						</section>
					</aside>
				</div>
			</div>
			<footer className="dashboard-footer"><span>Gatherly <span aria-hidden="true">/</span> Your event space</span><button onClick={() => onNavigate('landing')}>Discover something new <span aria-hidden="true">-&gt;</span></button></footer>
		</main>
	)
}

export default UserDashboard

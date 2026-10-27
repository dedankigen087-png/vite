import { useMemo, useState } from 'react'
import './MusicPage.css'

const tracks = [
	{ id: 1, title: 'No One', artist: 'Alicia Keys', album: 'As I Am', year: 2007, genre: 'R&B', cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=240&q=80' },
	{ id: 2, title: 'U Remind Me', artist: 'Usher', album: '8701', year: 2001, genre: 'R&B', cover: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=240&q=80' },
	{ id: 3, title: 'The Sweetest Taboo', artist: 'Sade', album: 'Promise', year: 1985, genre: 'R&B', cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=240&q=80' },
	{ id: 4, title: 'Have You Ever', artist: 'Brandy', album: 'Never Say Never', year: 1998, genre: 'R&B', cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=240&q=80' },
	{ id: 5, title: 'End of the Road', artist: 'Boyz II Men', album: 'Cooleyhighharmony', year: 1992, genre: 'R&B', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=240&q=80' },
	{ id: 6, title: 'Un-break My Heart', artist: 'Toni Braxton', album: 'Secrets', year: 1996, genre: 'R&B', cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=240&q=80' },
	{ id: 7, title: 'Furaha', artist: 'Mr. Nice', album: 'Kidali Po', year: 2001, genre: 'Old-School Bongo', cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=240&q=80' },
	{ id: 8, title: 'Nataka Kulewa', artist: 'Dully Sykes', album: 'Historia Ya Kweli', year: 2003, genre: 'Old-School Bongo', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=240&q=80' },
	{ id: 9, title: 'Zali la Mentali', artist: 'Professor Jay', album: 'Machozi, Jasho na Damu', year: 2003, genre: 'Old-School Bongo', cover: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=240&q=80' },
	{ id: 10, title: 'Cinderella', artist: 'Ali Kiba', album: 'Cinderella', year: 2007, genre: 'Old-School Bongo', cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=240&q=80' },
	{ id: 11, title: 'Mikasi', artist: 'Mwana FA', album: 'Afueni', year: 2004, genre: 'Old-School Bongo', cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=240&q=80' },
	{ id: 12, title: 'Nimechoka', artist: 'Juma Nature', album: 'Nini Chanzo', year: 2002, genre: 'Old-School Bongo', cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=240&q=80' },
]

const genres = ['R&B', 'Old-School Bongo', 'All songs']

function MusicPage({ onNavigate }) {
	const [activeGenre, setActiveGenre] = useState('All songs')
	const [search, setSearch] = useState('')
	const [savedTracks, setSavedTracks] = useState([])

	const visibleTracks = useMemo(() => tracks.filter((track) => {
		const matchesGenre = activeGenre === 'All songs' || track.genre === activeGenre
		const searchText = `${track.title} ${track.artist} ${track.album} ${track.genre}`.toLowerCase()
		return matchesGenre && searchText.includes(search.toLowerCase())
	}), [activeGenre, search])

	function browseGenre(genre) {
		setActiveGenre(genre)
		setSearch('')
		document.getElementById('music-library')?.scrollIntoView({ behavior: 'smooth' })
	}

	function toggleSaved(trackId) {
		setSavedTracks((current) => current.includes(trackId)
			? current.filter((id) => id !== trackId)
			: [...current, trackId])
	}

	return (
		<main className="music-page">
			<header className="music-header">
				<button className="music-brand" onClick={() => onNavigate('landing')} aria-label="Gatherly home">
					<img src="/gatherly-mark.svg" alt="" />Gatherly
				</button>
				<nav aria-label="Main navigation">
					<button onClick={() => onNavigate('landing')}>Discover events</button>
					<button onClick={() => onNavigate('agenda')}>Agenda</button>
					<button className="music-nav-active" aria-current="page">Music</button>
				</nav>
				<button className="music-account" onClick={() => onNavigate('dashboard')}>My events <span aria-hidden="true">-&gt;</span></button>
			</header>

			<section className="music-intro">
				<div className="music-intro-copy">
					<p className="music-eyebrow">THE GATHERLY LISTENING ROOM</p>
					<h1>Good songs.<br /><em>Good memories.</em></h1>
					<p>Browse the smoothest R&amp;B and the Bongo Flava classics that never left the rotation.</p>
				</div>
				<div className="music-intro-art" role="img" aria-label="A live music performance">
					<span className="music-art-label">THE ESSENTIALS <b>001</b></span>
					<span className="music-art-caption">A little nostalgia<br />goes a long way.</span>
				</div>
			</section>

			<section className="music-featured" aria-labelledby="music-featured-title">
				<div className="music-section-title">
					<div><p className="music-eyebrow">START HERE</p><h2 id="music-featured-title">The main rotation</h2></div>
					<span>Two eras, all-time favorites</span>
				</div>
				<div className="music-genre-grid">
					<button className="music-genre music-genre-rnb" onClick={() => browseGenre('R&B')}>
						<span className="music-genre-index">01 / THE SLOW JAMS</span>
						<strong>R&amp;B</strong>
						<span className="music-genre-bottom"><span>Silky vocals, timeless hooks</span><span aria-hidden="true">-&gt;</span></span>
					</button>
					<button className="music-genre music-genre-bongo" onClick={() => browseGenre('Old-School Bongo')}>
						<span className="music-genre-index">02 / BONGO FLAVA CLASSICS</span>
						<strong>Old-School<br />Bongo</strong>
						<span className="music-genre-bottom"><span>Dar es Salaam, back in the day</span><span aria-hidden="true">-&gt;</span></span>
					</button>
				</div>
			</section>

			<section className="music-library" id="music-library" aria-labelledby="music-library-title">
				<div className="music-section-title music-library-heading">
					<div><p className="music-eyebrow">BROWSE THE COLLECTION</p><h2 id="music-library-title">Songs for the long way home</h2></div>
					<label className="music-search"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a song or artist" aria-label="Search songs and artists" /></label>
				</div>
				<div className="music-filter-row">
					<div className="music-filters" role="tablist" aria-label="Filter by genre">
						{genres.map((genre) => <button key={genre} role="tab" aria-selected={activeGenre === genre} className={activeGenre === genre ? 'music-filter active' : 'music-filter'} onClick={() => setActiveGenre(genre)}>{genre}</button>)}
					</div>
					<span>{visibleTracks.length} tracks</span>
				</div>
				<div className="music-track-list">
					{visibleTracks.map((track, index) => (
						<article className="music-track" key={track.id}>
							<span className="music-track-number">{String(index + 1).padStart(2, '0')}</span>
							<img className="music-track-cover" src={track.cover} alt="" />
							<div className="music-track-main"><h3>{track.title}</h3><p>{track.artist}</p></div>
							<span className="music-track-album">{track.album}</span>
							<span className="music-track-genre">{track.genre}</span>
							<span className="music-track-year">{track.year}</span>
							<button className={savedTracks.includes(track.id) ? 'music-save saved' : 'music-save'} onClick={() => toggleSaved(track.id)} aria-label={`${savedTracks.includes(track.id) ? 'Remove' : 'Save'} ${track.title}`} aria-pressed={savedTracks.includes(track.id)}>{savedTracks.includes(track.id) ? '♥' : '♡'}</button>
						</article>
					))}
					{visibleTracks.length === 0 && <p className="music-empty">No tracks match that search. Try another title or artist.</p>}
				</div>
			</section>

			<footer className="music-footer"><span>GATHERLY <span aria-hidden="true">/</span> THE LISTENING ROOM</span><button onClick={() => onNavigate('landing')}>Back to events <span aria-hidden="true">-&gt;</span></button></footer>
		</main>
	)
}

export default MusicPage
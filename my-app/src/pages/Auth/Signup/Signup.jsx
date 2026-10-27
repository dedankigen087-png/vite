import { useState } from 'react'
import { signupUser } from '../../../api/authApi'
import './Signup.css'

function Signup({ onNavigate }) {
	const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Event organizer' })
	const [message, setMessage] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	function updateForm(event) {
		setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
		setMessage('')
		setError('')
	}

	async function createAccount(event) {
		event.preventDefault()
		setLoading(true)
		setError('')
		setMessage('')

		try {
			const response = await signupUser({
				name: form.name,
				email: form.email,
				password: form.password,
				role: form.role,
			})
			setMessage(response.message || `Welcome to Gatherly, ${form.name.split(' ')[0]}! Your account is ready.`)
			setTimeout(() => onNavigate('landing'), 800)
		} catch (err) {
			setError(err.message || 'Account creation failed. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<main className="signup-page">
			<section className="signup-visual" aria-label="Gatherly event community">
				<a className="signup-brand" href="#dashboard" onClick={() => onNavigate('landing')}><img className="signup-brand-mark" src="/gatherly-mark.svg" alt="" />Gatherly</a>
				<div className="signup-visual-copy"><p className="signup-kicker">Make every gathering count</p><h1>Bring your<br /><em>people together.</em></h1><p>One calm workspace for creating memorable events, welcoming guests, and growing your community.</p></div>
				<span className="signup-visual-note">Plan. Invite. Celebrate.</span>
			</section>
			<section className="signup-panel">
				<div className="signup-form-wrap">
					<button className="back-link" type="button" onClick={() => onNavigate('landing')}>&larr; Back to events</button>
					<p className="signup-kicker">Join Gatherly</p>
					<h2>Create your account</h2>
					<p className="signup-intro">Start planning events that people will remember.</p>
					<form onSubmit={createAccount}>
						<label>Full name<input name="name" value={form.name} onChange={updateForm} placeholder="Alex Morgan" required /></label>
						<label>Email address<input name="email" type="email" value={form.email} onChange={updateForm} placeholder="alex@example.com" required /></label>
						<label>Password<input name="password" type="password" value={form.password} onChange={updateForm} placeholder="At least 8 characters" minLength="8" required /></label>
						<label>What brings you here?<select name="role" value={form.role} onChange={updateForm}><option>Event organizer</option><option>Event attendee</option><option>Community builder</option></select></label>
						<button className="signup-submit" type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Create account'} <span aria-hidden="true">&rarr;</span></button>
					</form>
					{error && <p className="signup-error" role="alert">{error}</p>}
					{message && <p className="signup-success" role="status">{message} <button type="button" onClick={() => onNavigate('landing')}>Open dashboard</button></p>}
					<p className="signup-terms">By creating an account, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>
				</div>
			</section>
		</main>
	)
}

export default Signup

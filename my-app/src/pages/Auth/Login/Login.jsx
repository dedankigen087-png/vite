import { useState } from 'react'
import { signinUser } from '../../../api/authApi'
import './Login.css'
import './LoginRoles.css'

function Login({ onNavigate }) {
	const [form, setForm] = useState({ email: '', password: '', role: '', remember: false })
	const [message, setMessage] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [nextPage, setNextPage] = useState('landing')

	function updateForm(event) {
		const { name, type, checked, value } = event.target
		setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
		setMessage('')
		setError('')
	}

	async function signIn(event) {
		event.preventDefault()
		setLoading(true)
		setError('')
		setMessage('')

		try {
			const response = await signinUser({
				email: form.email,
				password: form.password,
				role: form.role,
				remember: form.remember,
			})

			const userRole = response?.user?.role
			const destination = userRole === 'attendee' || userRole === 'Event attendee'
				? 'attendee-dashboard'
				: userRole === 'organizer' || userRole === 'Event organizer'
					? 'event-organizer-dashboard'
					: userRole === 'community_builder' || userRole === 'Community builder'
						? 'community-builder-dashboard'
						: 'landing'

			setNextPage(destination)
			setMessage(response.message || 'You are signed in. Welcome back to Gatherly!')
			setTimeout(() => {
				onNavigate(destination)
			}, 800)
		} catch (err) {
			setError(err.message || 'Login failed. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<main className="login-page">
			<section className="login-visual" aria-label="Gatherly event community">
				<a className="login-brand" href="#dashboard" onClick={() => onNavigate('landing')}><img className="login-brand-mark" src="/gatherly-mark.svg" alt="" />Gatherly</a>
				<div className="login-visual-copy"><p className="login-kicker">Your events, all in one place</p><h1>Welcome<br /><em>back.</em></h1><p>Pick up where you left off and keep creating experiences your guests will remember.</p></div>
				<span className="login-visual-note">Plan. Invite. Celebrate.</span>
			</section>
			<section className="login-panel">
				<div className="login-form-wrap">
					<button className="login-back-link" type="button" onClick={() => onNavigate('landing')}>&larr; Back to events</button>
					<p className="login-kicker">Welcome back</p>
					<h2>Log in to Gatherly</h2>
					<p className="login-intro">Choose your account type to continue.</p>
					<form onSubmit={signIn}>
						<label>Log in as<select className="login-role-select" name="role" value={form.role} onChange={updateForm} required><option value="" disabled>Select an account type</option><option value="admin">Admin</option><option value="organizer">Event organiser</option><option value="attendee">Attendee</option><option value="community_builder">Community builder</option></select></label>
						<label>Email address<input name="email" type="email" value={form.email} onChange={updateForm} placeholder="alex@example.com" required /></label>
						<label>Password<input name="password" type="password" value={form.password} onChange={updateForm} placeholder="Enter your password" required /></label>
						<div className="login-options"><label className="remember-option"><input name="remember" type="checkbox" checked={form.remember} onChange={updateForm} />Remember me</label><a href="mailto:support@gatherly.example?subject=Password%20reset">Forgot password?</a></div>
						<button className="login-submit" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Log in'} <span aria-hidden="true">&rarr;</span></button>
					</form>
					{error && <p className="login-error" role="alert">{error}</p>}
					{message && <p className="login-success" role="status">{message} <button type="button" onClick={() => onNavigate(nextPage)}>Open dashboard</button></p>}
					<p className="login-signup-prompt">New to Gatherly? <button type="button" onClick={() => onNavigate('signup')}>Create an account</button></p>
				</div>
			</section>
		</main>
	)
}

export default Login

import { useState } from 'react'
import './Support.css'

const faqItems = [
	['What is the refund policy?', 'Refund requests are accepted up to 7 days before an event. Approved refunds are returned to the original payment method, less any processing fees.'],
	['Can I transfer my ticket?', 'Yes. You can transfer a ticket to another guest from your registration email up to 24 hours before the event begins.'],
	['Is there a dress code?', 'Dress codes vary by event and are shown on the event details page. When no dress code is listed, smart casual is a comfortable choice.'],
	['What should I do if I lose my badge?', 'Visit the registration desk with a valid ID. Our team can deactivate the original badge and issue a replacement.'],
]

const pageDetails = {
	terms: { label: 'Legal', title: 'Terms of service', intro: 'The ground rules for using Gatherly and attending events.', sections: [['Tickets and payments', 'Tickets are confirmed after successful payment. You are responsible for reviewing event dates, venues, ticket tiers, and attendee details before checkout.'], ['Cancellations and refunds', 'Event-specific cancellation terms are displayed before purchase. Organizers may change schedules or venues and will communicate material changes to registered attendees.'], ['Event conduct', 'Guests must follow venue rules, respect other attendees, and present valid registration details at check-in. Gatherly may restrict access when safety or community guidelines are breached.']] },
	privacy: { label: 'Legal', title: 'Privacy policy', intro: 'How Gatherly handles the information you share with us.', sections: [['Information we collect', 'We collect account details, registration information, payment status, and event preferences needed to provide the platform and support your attendance.'], ['How we use information', 'Your information helps us process registrations, send event updates, improve discovery, and provide attendee or organizer support. We do not sell personal information.'], ['Your choices', 'You may request access, correction, or deletion of your account information by contacting privacy@gatherly.example. Some records may be retained where required for financial or legal purposes.']] },
}

function Support({ initialPage = 'faq', onNavigate }) {
	const [activePage, setActivePage] = useState(initialPage)
	const [openFaq, setOpenFaq] = useState(0)
	const [form, setForm] = useState({ name: '', email: '', subject: 'Attendee support', message: '' })
	const [sent, setSent] = useState(false)

	function showPage(page) {
		setActivePage(page)
		setSent(false)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	function updateForm(event) {
		setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
	}

	function sendInquiry(event) {
		event.preventDefault()
		setSent(true)
	}

	return (
		<main className="support-page">
			<header className="support-header"><button className="support-brand" onClick={() => onNavigate('landing')}><img src="/gatherly-mark.svg" alt="" />Gatherly</button><nav aria-label="Support navigation"><button className={activePage === 'faq' ? 'active' : ''} onClick={() => showPage('faq')}>FAQ</button><button className={activePage === 'contact' ? 'active' : ''} onClick={() => showPage('contact')}>Contact us</button><button className={activePage === 'terms' ? 'active' : ''} onClick={() => showPage('terms')}>Terms</button><button className={activePage === 'privacy' ? 'active' : ''} onClick={() => showPage('privacy')}>Privacy</button></nav><button className="support-back" onClick={() => onNavigate('landing')}>&larr; Dashboard</button></header>
			<section className="support-hero"><p className="support-kicker">Gatherly support center</p><h1>Help for every<br /><em>gathering.</em></h1><p>Find quick answers, contact our team, or review the policies that keep events clear and welcoming.</p></section>
			<section className="support-content">
				{activePage === 'faq' && <div className="support-panel"><p className="support-kicker">Common questions</p><h2>Frequently asked questions</h2><div className="faq-list">{faqItems.map(([question, answer], index) => <article className={openFaq === index ? 'faq-item open' : 'faq-item'} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span><b>{openFaq === index ? '-' : '+'}</b></button>{openFaq === index && <p>{answer}</p>}</article>)}</div></div>}
+				{activePage === 'contact' && <div className="support-panel contact-panel"><p className="support-kicker">We are listening</p><h2>Contact us</h2><p className="support-intro">Need help with a ticket, event, partnership, or media request? Send us a message and our team will respond.</p><form onSubmit={sendInquiry}><div className="contact-grid"><label>Name<input name="name" value={form.name} onChange={updateForm} required placeholder="Your name" /></label><label>Email<input name="email" type="email" value={form.email} onChange={updateForm} required placeholder="you@example.com" /></label></div><label>Inquiry type<select name="subject" value={form.subject} onChange={updateForm}><option>Attendee support</option><option>Organizer support</option><option>Media inquiry</option><option>Partnership</option></select></label><label>Message<textarea name="message" value={form.message} onChange={updateForm} required rows="6" placeholder="How can we help?" /></label><button className="support-submit" type="submit">Send inquiry <span>&rarr;</span></button></form>{sent && <p className="support-success" role="status">Thanks, {form.name}. Your inquiry has been sent to the Gatherly support team.</p>}</div>}
				{(activePage === 'terms' || activePage === 'privacy') && <div className="support-panel legal-panel"><p className="support-kicker">{pageDetails[activePage].label}</p><h2>{pageDetails[activePage].title}</h2><p className="support-intro">{pageDetails[activePage].intro}</p>{pageDetails[activePage].sections.map(([heading, copy]) => <article key={heading}><h3>{heading}</h3><p>{copy}</p></article>)}<p className="last-updated">Last updated: September 25, 2026</p></div>}
			</section>
			<footer className="support-footer"><span>Gatherly support center</span><div><button onClick={() => showPage('faq')}>FAQ</button><button onClick={() => showPage('contact')}>Contact</button><button onClick={() => showPage('terms')}>Terms</button><button onClick={() => showPage('privacy')}>Privacy</button></div></footer>
		</main>
	)
}

export default Support

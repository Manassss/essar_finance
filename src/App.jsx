import { useEffect, useMemo, useState } from 'react';

const services = [
  {
    icon: 'MP',
    title: 'Mortgage of Property',
    text: 'Raise funds against eligible residential, commercial, or industrial property through a structured collateral review.',
    bestFor: 'Business expansion, working capital, major obligations, or planned capital needs.',
    points: ['Eligible property-backed funding', 'Clear collateral discussion', 'Document-led assessment']
  },
  {
    icon: 'ST',
    title: 'Short Term Loan',
    text: 'Short-tenure funding for borrowers who need liquidity for immediate personal or business commitments.',
    bestFor: 'Working capital gaps, urgent payments, inventory cycles, or time-bound commitments.',
    points: ['Defined repayment terms', 'Bank statement review', 'Fast file movement after documents']
  },
  {
    icon: 'SL',
    title: 'Security Loan',
    text: 'Borrow against eligible securities, including shares and stock, after valuation and internal assessment.',
    bestFor: 'Customers who want liquidity while using eligible securities as collateral.',
    points: ['Shares and stock considered', 'Security-backed structure', 'Transparent valuation review']
  },
  {
    icon: 'VL',
    title: 'Vehicle Loan',
    text: 'Funding support for eligible personal, business, and commercial vehicle requirements.',
    bestFor: 'Individual vehicle purchases, business vehicles, and commercial transport needs.',
    points: ['New and eligible used vehicles', 'Vehicle document review', 'Personal and business use cases']
  },
  {
    icon: 'PF',
    title: 'Project Funding',
    text: 'Funding review for viable projects with attention to business plans, cash flows, and security coverage.',
    bestFor: 'Business growth, project execution, asset creation, and expansion requirements.',
    points: ['Project feasibility review', 'Business plan assessment', 'Structured funding support']
  },
  {
    icon: 'PL',
    title: 'Personal Loan',
    text: 'Loan assistance for salaried and self-employed applicants with stable income and valid KYC records.',
    bestFor: 'Planned family needs, education expenses, medical needs, and personal commitments.',
    points: ['Income-led eligibility', 'Straightforward application support', 'KYC and bank account checks']
  }
];

const processSteps = [
  ['01', 'Apply Online', 'Share your requirement, amount range, city, and preferred loan category.'],
  ['02', 'Verify Documents', 'KYC, bank statements, income proof, and applicable asset documents are reviewed.'],
  ['03', 'Approval & Offer', 'Eligible applicants receive a clear offer with amount, tenure, and repayment terms.'],
  ['04', 'Quick Disbursal', 'After acceptance and final checks, funds are processed as per approved terms.']
];

const eligibility = [
  'Applicant age must be 21-60 years',
  'Indian citizen',
  'Valid PAN and Aadhaar',
  'Active bank account',
  'Stable source of income'
];

const documents = [
  'PAN Card',
  'Aadhaar Card',
  'Bank Statement: 3 months / 6 months / 9 months / 12 months',
  'Income Proof',
  'Property / Vehicle / Security-related documents where applicable'
];

const stats = [
  ['6', 'Loan categories'],
  ['4', 'Step review flow'],
  ['12', 'Months statement option'],
  ['100', 'Document-led process']
];

const testimonials = [
  {
    name: 'Business Owner',
    location: 'Delhi NCR',
    text: 'The team explained the property and bank statement requirements before we submitted the file. That made the process easier to plan.',
    initials: 'BO'
  },
  {
    name: 'Self-employed Professional',
    location: 'Jaipur',
    text: 'I understood what documents were needed, what would be verified, and what the next step would be. The discussion was practical.',
    initials: 'SP'
  },
  {
    name: 'Vehicle Finance Customer',
    location: 'Mumbai',
    text: 'The communication was direct. I liked that the vehicle documents and eligibility points were explained step by step.',
    initials: 'VC'
  }
];

const faqs = [
  {
    q: 'What loan services does Essar Finex Pvt. Ltd. provide?',
    a: 'We provide mortgage of property, short term loan, security loan including shares and stock, vehicle loan, project funding, and personal loan solutions.'
  },
  {
    q: 'What is the basic age eligibility?',
    a: 'Applicants should generally be between 21 and 60 years of age and must meet income, KYC, and bank account requirements.'
  },
  {
    q: 'Are documents different for every loan type?',
    a: 'Basic KYC and bank statements are required for most applications. Property, vehicle, or security-related documents are required where the loan is backed by those assets.'
  },
  {
    q: 'How quickly can the loan be disbursed?',
    a: 'Disbursal timelines depend on eligibility, document completion, verification, and approval terms.'
  }
];

function useScrollReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function useCounter(target, active) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    let frame = 0;
    let start;
    const duration = 1100;

    const tick = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(Number(target) * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active]);

  return value;
}

function App() {
  const [page, setPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  useScrollReveal();

  const pageTitle = useMemo(() => {
    const names = {
      home: 'Essar Finex Pvt. Ltd. | Property, Vehicle, Security & Personal Loans',
      about: 'About Essar Finex Pvt. Ltd.',
      services: 'Financial Services | Essar Finex Pvt. Ltd.',
      contact: 'Contact Essar Finex Pvt. Ltd.'
    };
    return names[page];
  }, [page]);

  const goTo = (nextPage) => {
    setPage(nextPage);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header page={page} goTo={goTo} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <h1 className="sr-only">{pageTitle}</h1>
        {page === 'home' && <Home goTo={goTo} />}
        {page === 'about' && <About />}
        {page === 'services' && <Services goTo={goTo} />}
        {page === 'contact' && <Contact />}
      </main>
      <Footer goTo={goTo} />
    </>
  );
}

function Header({ page, goTo, menuOpen, setMenuOpen }) {
  const navItems = [
    ['home', 'Home'],
    ['about', 'About Us'],
    ['services', 'Services'],
    ['contact', 'Contact']
  ];

  return (
    <header className="site-header">
      <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); goTo('home'); }}>
        <span className="brand-mark">EF</span>
        <span>
          <strong>Essar Finex</strong>
          <small>Pvt. Ltd.</small>
        </span>
      </a>
      <button
        className="menu-button"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Primary navigation">
        {navItems.map(([key, label]) => (
          <a
            key={key}
            href={`#${key}`}
            className={page === key ? 'active' : ''}
            onClick={(event) => { event.preventDefault(); goTo(key); }}
          >
            {label}
          </a>
        ))}
        <a className="nav-cta" href="#contact" onClick={(event) => { event.preventDefault(); goTo('contact'); }}>
          Apply Now
        </a>
      </nav>
    </header>
  );
}

function Home({ goTo }) {
  return (
    <>
      <Hero goTo={goTo} />
      <TrustBar />
      <ServicesPreview goTo={goTo} />
      <WhyChoose />
      <LoanProcess />
      <CriteriaAndDocs />
      <TrustCompliance />
      <Testimonials />
      <Faqs />
      <ContactCta goTo={goTo} />
    </>
  );
}

function Hero({ goTo }) {
  return (
    <section className="hero" data-reveal>
      <div className="hero-orb orb-one" />
      <div className="hero-orb orb-two" />
      <div className="hero-copy">
        <p className="eyebrow">Secured and personal funding</p>
        <h2>Borrow with clarity before you commit.</h2>
        <p>
          Essar Finex Pvt. Ltd. helps applicants prepare the right file for mortgage of
          property, short term loans, security-backed loans, vehicle loans, project funding,
          and personal loans.
        </p>
        <div className="hero-badges" aria-label="Verification highlights">
          <span>PAN & Aadhaar based KYC</span>
          <span>Bank statement and income review</span>
          <span>Asset documents where applicable</span>
        </div>
        <div className="hero-actions">
          <button className="button primary" onClick={() => goTo('contact')}>Apply Now</button>
          <a className="button secondary" href="#eligibility">Check Eligibility</a>
        </div>
      </div>

      <div className="hero-stage" aria-label="Loan calculator and trust preview">
        <LoanCalculatorCard />
        <div className="floating-card approval-card">
          <span>File readiness</span>
          <strong>92%</strong>
          <small>KYC + income + documents aligned</small>
        </div>
        <div className="floating-card support-card">
          <span>Assisted review</span>
          <strong>Human-led</strong>
          <small>Talk to a finance team before final submission</small>
        </div>
      </div>
    </section>
  );
}

function LoanCalculatorCard() {
  const [amount, setAmount] = useState(12);
  const [tenure, setTenure] = useState(36);
  const estimate = Math.round((amount * 100000) / tenure);

  return (
    <article className="calculator-card">
      <div className="card-topline">
        <span>Loan preview</span>
        <strong>Indicative</strong>
      </div>
      <h3>Plan your requirement</h3>
      <label>
        Required amount
        <input
          type="range"
          min="2"
          max="50"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <span className="range-value">Rs. {amount} lakh</span>
      </label>
      <label>
        Preferred tenure
        <input
          type="range"
          min="6"
          max="60"
          step="6"
          value={tenure}
          onChange={(event) => setTenure(event.target.value)}
        />
        <span className="range-value">{tenure} months</span>
      </label>
      <div className="estimate-row">
        <span>Planning benchmark</span>
        <strong>Rs. {estimate.toLocaleString('en-IN')} / month</strong>
      </div>
      <p>Final offer depends on eligibility, documents, collateral, and internal assessment.</p>
    </article>
  );
}

function TrustBar() {
  return (
    <section className="trust-bar container" data-reveal>
      <span>Transparent assessment</span>
      <span>PAN and Aadhaar KYC</span>
      <span>Asset-backed options</span>
      <span>Clear document checklist</span>
    </section>
  );
}

function ServicesPreview({ goTo }) {
  return (
    <section className="section section-soft">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title="Six focused lending categories. No clutter, no confusing positioning."
          text="Each product starts with a purpose, a document checklist, and a realistic assessment path."
          action={<button className="button secondary" onClick={() => goTo('services')}>View All Services</button>}
        />
        <ServiceGrid goTo={goTo} compact />
      </div>
    </section>
  );
}

function WhyChoose() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = document.querySelector('.stats-grid');
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        observer.disconnect();
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const features = [
    ['Clarity before submission', 'Understand the required KYC, bank statement, income, and asset documents before the file moves.'],
    ['Human finance team', 'Discuss purpose, repayment comfort, security coverage, and next steps with a real team.'],
    ['Responsible assessment', 'Eligibility, documents, collateral, and offer terms are reviewed before approval.'],
    ['Premium support flow', 'A focused process for salaried professionals, business owners, entrepreneurs, and individuals.']
  ];

  return (
    <section className="section container why-section" data-reveal>
      <SectionHeading
        eyebrow="Why choose us"
        title="A lending experience designed around trust, speed, and simplicity."
        text="The interface is polished, but the promise stays practical: prepare the right file, understand eligibility, and move with confidence."
      />
      <div className="stats-grid">
        {stats.map(([target, label]) => (
          <Stat key={label} target={target} label={label} active={active} />
        ))}
      </div>
      <div className="feature-grid premium-grid">
        {features.map(([title, text]) => (
          <article className="feature-card" key={title}>
            <span className="feature-icon" aria-hidden="true">✓</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Stat({ target, label, active }) {
  const numeric = useCounter(target, active);
  const suffix = label === 'Document-led process' ? '%' : '';
  return (
    <article className="stat-card">
      <strong>{numeric}{suffix}</strong>
      <span>{label}</span>
    </article>
  );
}

function LoanProcess() {
  return (
    <section className="section process-section" data-reveal>
      <div className="container">
        <SectionHeading
          eyebrow="Loan process"
          title="A guided four-step journey from enquiry to disbursal."
          text="The process stays simple while still respecting verification, documentation, and responsible approval."
        />
        <div className="timeline">
          {processSteps.map(([number, title, text]) => (
            <article className="timeline-step" key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CriteriaAndDocs() {
  return (
    <section id="eligibility" className="section section-dark" data-reveal>
      <div className="container split-panel">
        <InfoList title="Eligibility Criteria" items={eligibility} />
        <InfoList title="Documents Required" items={documents} />
      </div>
    </section>
  );
}

function InfoList({ title, items }) {
  return (
    <article className="info-panel">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}

function TrustCompliance() {
  return (
    <section className="section container trust-layout" data-reveal>
      <div>
        <p className="eyebrow">Trust & compliance</p>
        <h2>Responsible review before commitment.</h2>
        <p>
          Every file is reviewed for identity, income, banking history, and applicable
          collateral records. The goal is to make the approval path clear before the
          borrower accepts an offer.
        </p>
        <p className="fine-print">
          Loan amount, tenure, rate, and disbursal are subject to eligibility,
          documentation, credit assessment, and applicable internal policies.
        </p>
      </div>
      <div className="compliance-card">
        <strong>Trust signals</strong>
        <ul>
          <li>PAN and Aadhaar based KYC checks</li>
          <li>Income and bank statement review</li>
          <li>Asset documentation for secured products</li>
          <li>Clear offer terms before disbursal</li>
        </ul>
      </div>
    </section>
  );
}

function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="section testimonial-section" data-reveal>
      <div className="container">
        <SectionHeading
          eyebrow="Testimonials"
          title="Customers remember clear communication."
          text="The review cards below represent the kind of experience this website is designed to communicate."
        />
        <div className="carousel" aria-live="polite">
          {testimonials.map((testimonial, itemIndex) => (
            <figure
              className={itemIndex === index ? 'testimonial active' : 'testimonial'}
              key={testimonial.name}
            >
              <div className="avatar">{testimonial.initials}</div>
              <blockquote>{testimonial.text}</blockquote>
              <figcaption>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="carousel-dots" aria-label="Testimonials selector">
          {testimonials.map((testimonial, itemIndex) => (
            <button
              key={testimonial.name}
              className={itemIndex === index ? 'active' : ''}
              type="button"
              aria-label={`Show testimonial ${itemIndex + 1}`}
              onClick={() => setIndex(itemIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Faqs() {
  return (
    <section className="section container" data-reveal>
      <SectionHeading eyebrow="FAQs" title="Questions borrowers usually ask first." />
      <div className="faq-list">
        {faqs.map(({ q, a }) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function ContactCta({ goTo }) {
  return (
    <section className="section container" data-reveal>
      <div className="cta-panel">
        <div>
          <p className="eyebrow">Ready to apply?</p>
          <h2>Share your requirement and get the document checklist first.</h2>
          <p>Our team will review the loan category, basic eligibility, and documents needed for the next step.</p>
        </div>
        <button className="button light" onClick={() => goTo('contact')}>Contact Our Team</button>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="page-section">
      <PageHero
        eyebrow="About us"
        title="A finance partner for borrowers who value clarity and proper documentation."
        text="Essar Finex Pvt. Ltd. focuses on responsible assessment, practical file preparation, and support across secured and unsecured lending needs."
      />
      <div className="container about-grid" data-reveal>
        <article>
          <h2>Company Overview</h2>
          <p>
            Essar Finex Pvt. Ltd. serves borrowers who need structured lending support
            for property mortgage, short term funding, security-backed loans, vehicle
            finance, project funding, and personal loan requirements.
          </p>
        </article>
        <article className="highlight-box">
          <h2>Trust & Compliance</h2>
          <p>
            Every loan request is reviewed through KYC, income, bank account, and relevant
            asset documentation. Approval and disbursal remain subject to verification,
            eligibility, and internal policy.
          </p>
        </article>
        <article>
          <h2>Vision</h2>
          <p>
            To become a trusted lending partner by making document requirements,
            eligibility discussion, and offer terms easier to understand.
          </p>
        </article>
        <article>
          <h2>Mission</h2>
          <p>
            To deliver responsible lending support with professional service, transparent
            document requirements, and timely coordination from enquiry to disbursal.
          </p>
        </article>
      </div>
    </section>
  );
}

function Services({ goTo }) {
  return (
    <section className="page-section">
      <PageHero
        eyebrow="Services"
        title="Loan products designed around security, purpose, and repayment comfort."
        text="Explore lending options for property-backed funding, short-term liquidity, eligible securities, vehicles, projects, and personal requirements."
      />
      <div className="container page-grid" data-reveal>
        <ServiceGrid goTo={goTo} />
      </div>
      <CriteriaAndDocs />
    </section>
  );
}

function ServiceGrid({ compact = false, goTo }) {
  return (
    <div className={compact ? 'service-grid compact' : 'service-grid'}>
      {services.map((service) => (
        <article className="service-card" key={service.title}>
          <span className="service-icon">{service.icon}</span>
          <span className="service-tag">Loan category</span>
          <h3>{service.title}</h3>
          <p>{service.text}</p>
          <div className="best-for">
            <span>Best for</span>
            <strong>{service.bestFor}</strong>
          </div>
          <ul>
            {service.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
          <button type="button" className="service-link" onClick={() => goTo('contact')}>Enquire Now</button>
        </article>
      ))}
    </div>
  );
}

function Contact() {
  return (
    <section className="page-section">
      <PageHero
        eyebrow="Contact"
        title="Book a consultation with Essar Finex Pvt. Ltd."
        text="Send your details and our team will connect with you for eligibility guidance, documentation support, and next steps."
      />
      <div className="container contact-layout" data-reveal>
        <div className="contact-details">
          <ContactItem label="Registered Office Address" value="Registered office address placeholder" />
          <ContactItem label="Customer Support Email" value="support@essarfinex.example" />
          <ContactItem label="Customer Care Number" value="+91 XXXXX XXXXX" />
          <ContactItem label="Working Hours" value="Monday to Saturday, 10:00 AM to 6:00 PM" />
          <div className="map-card">
            <span>Office location</span>
            <strong>Map placeholder</strong>
          </div>
        </div>
        <ConsultationForm />
      </div>
    </section>
  );
}

function ConsultationForm() {
  return (
    <form className="contact-form">
      <div className="form-heading">
        <h2>Request a call back</h2>
        <p>Share the basics and our team will guide you on eligibility and documents.</p>
      </div>
      <label>
        Full Name
        <input type="text" name="name" placeholder="Enter your full name" />
      </label>
      <label>
        Mobile Number
        <input type="tel" name="phone" placeholder="+91" />
      </label>
      <label>
        City
        <input type="text" name="city" placeholder="Your city" />
      </label>
      <label>
        Loan Requirement
        <select name="service" defaultValue="">
          <option value="" disabled>Select a service</option>
          {services.map((service) => <option key={service.title}>{service.title}</option>)}
        </select>
      </label>
      <label>
        Required Amount
        <input type="text" name="amount" placeholder="Example: 5 lakh" />
      </label>
      <label>
        Message
        <textarea name="message" rows="5" placeholder="Tell us your requirement" />
      </label>
      <button className="button primary" type="submit">Submit Enquiry</button>
      <p className="form-note">Submitting this form does not guarantee approval. Our team will contact you for verification and next steps.</p>
    </form>
  );
}

function ContactItem({ label, value }) {
  return (
    <article className="contact-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function PageHero({ eyebrow, title, text }) {
  return (
    <section className="inner-hero">
      <div className="container" data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, text, action }) {
  return (
    <div className={action ? 'section-heading split' : 'section-heading'}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {action}
    </div>
  );
}

function Footer({ goTo }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <a className="brand footer-brand" href="#home" onClick={(event) => { event.preventDefault(); goTo('home'); }}>
            <span className="brand-mark">EF</span>
            <span>
              <strong>Essar Finex</strong>
              <small>Pvt. Ltd.</small>
            </span>
          </a>
          <p>
            Lending support for mortgage of property, short term loans, security loans,
            vehicle loans, project funding, and personal loans.
          </p>
        </div>
        <div>
          <h2>Important Links</h2>
          <button onClick={() => goTo('about')}>About Us</button>
          <button onClick={() => goTo('services')}>Services</button>
          <button onClick={() => goTo('contact')}>Apply Now</button>
        </div>
        <div>
          <h2>Services</h2>
          {services.slice(0, 4).map((service) => <span key={service.title}>{service.title}</span>)}
        </div>
        <div>
          <h2>Compliance Note</h2>
          <p>
            Loan approval is subject to eligibility, document verification, internal assessment,
            and applicable terms.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Essar Finex Pvt. Ltd. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default App;

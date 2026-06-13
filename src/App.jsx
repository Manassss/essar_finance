import { useEffect, useMemo, useState } from 'react';

const translations = {
  en: {
    langName: 'English',
    langShort: 'EN',
    nav: { home: 'Home', about: 'About Us', services: 'Services', contact: 'Contact', apply: 'Apply Now' },
    pageTitles: {
      home: 'ESS AAR FINEX PVT LTD | Property, Vehicle, Security & Personal Loans',
      about: 'About ESS AAR FINEX PVT LTD',
      services: 'Financial Services | ESS AAR FINEX PVT LTD',
      contact: 'Contact ESS AAR FINEX PVT LTD'
    },
    hero: {
      eyebrow: 'Secured and personal funding',
      title: 'Borrow with clarity before you commit.',
      text: 'ESS AAR FINEX PVT LTD helps applicants prepare the right file for mortgage of property, short term loans, security-backed loans, vehicle loans, project funding, and personal loans.',
      badges: ['PAN & Aadhaar based KYC', 'Bank statement and income review', 'Asset documents where applicable'],
      apply: 'Apply Now',
      eligibility: 'Check Eligibility',
      calculator: {
        top: 'Loan preview',
        status: 'Indicative',
        title: 'Plan your requirement',
        amount: 'Required amount',
        amountValue: (amount) => `Rs. ${amount} lakh`,
        tenure: 'Preferred tenure',
        tenureValue: (tenure) => `${tenure} months`,
        benchmark: 'Planning benchmark',
        month: 'month',
        note: 'Final offer depends on eligibility, documents, collateral, and internal assessment.',
        readiness: 'File readiness',
        readinessText: 'KYC + income + documents aligned',
        assisted: 'Assisted review',
        human: 'Human-led',
        humanText: 'Talk to a finance team before final submission'
      }
    },
    trustBar: ['Transparent assessment', 'PAN and Aadhaar KYC', 'Asset-backed options', 'Clear document checklist'],
    servicesSection: {
      eyebrow: 'Services',
      title: 'Six focused lending categories. No clutter, no confusing positioning.',
      text: 'Each product starts with a purpose, a document checklist, and a realistic assessment path.',
      action: 'View All Services',
      tag: 'Loan category',
      bestFor: 'Best for',
      enquire: 'Enquire Now'
    },
    services: [
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
    ],
    why: {
      eyebrow: 'Why choose us',
      title: 'A lending experience designed around trust, speed, and simplicity.',
      text: 'The interface is polished, but the promise stays practical: prepare the right file, understand eligibility, and move with confidence.',
      stats: [['6', 'Loan categories'], ['4', 'Step review flow'], ['12', 'Months statement option'], ['100', 'Document-led process']],
      features: [
        ['Clarity before submission', 'Understand the required KYC, bank statement, income, and asset documents before the file moves.'],
        ['Human finance team', 'Discuss purpose, repayment comfort, security coverage, and next steps with a real team.'],
        ['Responsible assessment', 'Eligibility, documents, collateral, and offer terms are reviewed before approval.'],
        ['Premium support flow', 'A focused process for salaried professionals, business owners, entrepreneurs, and individuals.']
      ]
    },
    process: {
      eyebrow: 'Loan process',
      title: 'A guided four-step journey from enquiry to disbursal.',
      text: 'The process stays simple while still respecting verification, documentation, and responsible approval.',
      steps: [
        ['01', 'Apply Online', 'Share your requirement, amount range, city, and preferred loan category.'],
        ['02', 'Verify Documents', 'KYC, bank statements, income proof, and applicable asset documents are reviewed.'],
        ['03', 'Approval & Offer', 'Eligible applicants receive a clear offer with amount, tenure, and repayment terms.'],
        ['04', 'Quick Disbursal', 'After acceptance and final checks, funds are processed as per approved terms.']
      ]
    },
    criteria: {
      eligibilityTitle: 'Eligibility Criteria',
      documentsTitle: 'Documents Required',
      eligibility: ['Applicant age must be 21-60 years', 'Indian citizen', 'Valid PAN and Aadhaar', 'Active bank account', 'Stable source of income'],
      documents: ['PAN Card', 'Aadhaar Card', 'Bank Statement: 3 months / 6 months / 9 months / 12 months', 'Income Proof', 'Property / Vehicle / Security-related documents where applicable']
    },
    compliance: {
      eyebrow: 'Trust & compliance',
      title: 'Responsible review before commitment.',
      text: 'Every file is reviewed for identity, income, banking history, and applicable collateral records. The goal is to make the approval path clear before the borrower accepts an offer.',
      note: 'Loan amount, tenure, rate, and disbursal are subject to eligibility, documentation, credit assessment, and applicable internal policies.',
      heading: 'Trust signals',
      points: ['PAN and Aadhaar based KYC checks', 'Income and bank statement review', 'Asset documentation for secured products', 'Clear offer terms before disbursal']
    },
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'Customers remember clear communication.',
      text: 'The review cards below represent the kind of experience this website is designed to communicate.',
      items: [
        { name: 'Business Owner', location: 'Delhi NCR', text: 'The team explained the property and bank statement requirements before we submitted the file. That made the process easier to plan.', initials: 'BO' },
        { name: 'Self-employed Professional', location: 'Jaipur', text: 'I understood what documents were needed, what would be verified, and what the next step would be. The discussion was practical.', initials: 'SP' },
        { name: 'Vehicle Finance Customer', location: 'Mumbai', text: 'The communication was direct. I liked that the vehicle documents and eligibility points were explained step by step.', initials: 'VC' }
      ]
    },
    faqs: {
      eyebrow: 'FAQs',
      title: 'Questions borrowers usually ask first.',
      items: [
        { q: 'What loan services does ESS AAR FINEX PVT LTD provide?', a: 'We provide mortgage of property, short term loan, security loan including shares and stock, vehicle loan, project funding, and personal loan solutions.' },
        { q: 'What is the basic age eligibility?', a: 'Applicants should generally be between 21 and 60 years of age and must meet income, KYC, and bank account requirements.' },
        { q: 'Are documents different for every loan type?', a: 'Basic KYC and bank statements are required for most applications. Property, vehicle, or security-related documents are required where the loan is backed by those assets.' },
        { q: 'How quickly can the loan be disbursed?', a: 'Disbursal timelines depend on eligibility, document completion, verification, and approval terms.' }
      ]
    },
    cta: {
      eyebrow: 'Ready to apply?',
      title: 'Share your requirement and get the document checklist first.',
      text: 'Our team will review the loan category, basic eligibility, and documents needed for the next step.',
      action: 'Contact Our Team'
    },
    about: {
      eyebrow: 'About us',
      title: 'A finance partner for borrowers who value clarity and proper documentation.',
      text: 'ESS AAR FINEX PVT LTD focuses on responsible assessment, practical file preparation, and support across secured and unsecured lending needs.',
      cards: [
        ['Company Overview', 'ESS AAR FINEX PVT LTD serves borrowers who need structured lending support for property mortgage, short term funding, security-backed loans, vehicle finance, project funding, and personal loan requirements.'],
        ['Trust & Compliance', 'Every loan request is reviewed through KYC, income, bank account, and relevant asset documentation. Approval and disbursal remain subject to verification, eligibility, and internal policy.'],
        ['Vision', 'To become a trusted lending partner by making document requirements, eligibility discussion, and offer terms easier to understand.'],
        ['Mission', 'To deliver responsible lending support with professional service, transparent document requirements, and timely coordination from enquiry to disbursal.']
      ]
    },
    servicesPage: {
      eyebrow: 'Services',
      title: 'Loan products designed around security, purpose, and repayment comfort.',
      text: 'Explore lending options for property-backed funding, short-term liquidity, eligible securities, vehicles, projects, and personal requirements.'
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Book a consultation with ESS AAR FINEX PVT LTD',
      text: 'Send your details and our team will connect with you for eligibility guidance, documentation support, and next steps.',
      details: [
        ['Registered Office Address', 'Registered office address placeholder'],
        ['Customer Support Email', 'support@essaarfinex.example'],
        ['Customer Care Number', '+91 XXXXX XXXXX'],
        ['Working Hours', 'Monday to Saturday, 10:00 AM to 6:00 PM']
      ],
      mapLabel: 'Office location',
      mapValue: 'Map placeholder',
      formTitle: 'Request a call back',
      formText: 'Share the basics and our team will guide you on eligibility and documents.',
      fields: {
        name: 'Full Name',
        namePlaceholder: 'Enter your full name',
        phone: 'Mobile Number',
        city: 'City',
        cityPlaceholder: 'Your city',
        requirement: 'Loan Requirement',
        select: 'Select a service',
        amount: 'Required Amount',
        amountPlaceholder: 'Example: 5 lakh',
        message: 'Message',
        messagePlaceholder: 'Tell us your requirement',
        submit: 'Submit Enquiry',
        note: 'Submitting this form does not guarantee approval. Our team will contact you for verification and next steps.'
      }
    },
    footer: {
      text: 'Lending support for mortgage of property, short term loans, security loans, vehicle loans, project funding, and personal loans.',
      links: 'Important Links',
      services: 'Services',
      compliance: 'Compliance Note',
      complianceText: 'Loan approval is subject to eligibility, document verification, internal assessment, and applicable terms.',
      rights: '© 2026 ESS AAR FINEX PVT LTD All rights reserved.'
    }
  },
  hi: {
    langName: 'हिन्दी',
    langShort: 'HI',
    nav: { home: 'होम', about: 'हमारे बारे में', services: 'सेवाएं', contact: 'संपर्क', apply: 'अभी आवेदन करें' },
    pageTitles: {
      home: 'ESS AAR FINEX PVT LTD | संपत्ति, वाहन, सिक्योरिटी और पर्सनल लोन',
      about: 'ESS AAR FINEX PVT LTD के बारे में',
      services: 'वित्तीय सेवाएं | ESS AAR FINEX PVT LTD',
      contact: 'ESS AAR FINEX PVT LTD से संपर्क करें'
    },
    hero: {
      eyebrow: 'सिक्योर्ड और पर्सनल फंडिंग',
      title: 'प्रतिबद्ध होने से पहले स्पष्टता के साथ उधार लें।',
      text: 'ESS AAR FINEX PVT LTD आवेदकों को Mortgage of Property, Short Term Loan, Security Loan, Vehicle Loan, Project Funding और Personal Loan के लिए सही दस्तावेज तैयार करने में सहायता करता है।',
      badges: ['PAN और Aadhaar आधारित KYC', 'बैंक स्टेटमेंट और आय की समीक्षा', 'जहां लागू हो वहां एसेट दस्तावेज'],
      apply: 'अभी आवेदन करें',
      eligibility: 'योग्यता जांचें',
      calculator: {
        top: 'लोन प्रीव्यू',
        status: 'अनुमानित',
        title: 'अपनी आवश्यकता प्लान करें',
        amount: 'आवश्यक राशि',
        amountValue: (amount) => `₹ ${amount} लाख`,
        tenure: 'पसंदीदा अवधि',
        tenureValue: (tenure) => `${tenure} महीने`,
        benchmark: 'प्लानिंग बेंचमार्क',
        month: 'माह',
        note: 'अंतिम ऑफर योग्यता, दस्तावेज, collateral और आंतरिक मूल्यांकन पर निर्भर करता है।',
        readiness: 'फाइल तैयारी',
        readinessText: 'KYC + आय + दस्तावेज aligned',
        assisted: 'सहायता प्राप्त समीक्षा',
        human: 'मानवीय सहायता',
        humanText: 'फाइनल सबमिशन से पहले finance team से बात करें'
      }
    },
    trustBar: ['पारदर्शी मूल्यांकन', 'PAN और Aadhaar KYC', 'एसेट-बैक्ड विकल्प', 'स्पष्ट दस्तावेज चेकलिस्ट'],
    servicesSection: {
      eyebrow: 'सेवाएं',
      title: 'छह केंद्रित lending categories. कोई भ्रम नहीं, स्पष्ट positioning.',
      text: 'हर product उद्देश्य, दस्तावेज चेकलिस्ट और वास्तविक assessment path से शुरू होता है।',
      action: 'सभी सेवाएं देखें',
      tag: 'लोन कैटेगरी',
      bestFor: 'उपयुक्त',
      enquire: 'पूछताछ करें'
    },
    services: [
      {
        icon: 'MP',
        title: 'Mortgage of Property',
        text: 'योग्य residential, commercial या industrial property के against structured collateral review के माध्यम से funds raise करें।',
        bestFor: 'Business expansion, working capital, बड़ी obligations या planned capital needs.',
        points: ['Eligible property-backed funding', 'स्पष्ट collateral discussion', 'Document-led assessment']
      },
      {
        icon: 'ST',
        title: 'Short Term Loan',
        text: 'Immediate personal या business commitments के लिए liquidity चाहने वाले borrowers के लिए short-tenure funding.',
        bestFor: 'Working capital gaps, urgent payments, inventory cycles या time-bound commitments.',
        points: ['Defined repayment terms', 'Bank statement review', 'Documents के बाद fast file movement']
      },
      {
        icon: 'SL',
        title: 'Security Loan',
        text: 'Valuation और internal assessment के बाद eligible securities, shares और stock के against borrowing.',
        bestFor: 'जो customer eligible securities को collateral की तरह use करके liquidity चाहते हैं।',
        points: ['Shares और stock considered', 'Security-backed structure', 'Transparent valuation review']
      },
      {
        icon: 'VL',
        title: 'Vehicle Loan',
        text: 'Eligible personal, business और commercial vehicle requirements के लिए funding support.',
        bestFor: 'Individual vehicle purchase, business vehicle और commercial transport needs.',
        points: ['New और eligible used vehicles', 'Vehicle document review', 'Personal और business use cases']
      },
      {
        icon: 'PF',
        title: 'Project Funding',
        text: 'Business plans, cash flows और security coverage पर ध्यान देते हुए viable projects की funding review.',
        bestFor: 'Business growth, project execution, asset creation और expansion requirements.',
        points: ['Project feasibility review', 'Business plan assessment', 'Structured funding support']
      },
      {
        icon: 'PL',
        title: 'Personal Loan',
        text: 'Stable income और valid KYC records वाले salaried और self-employed applicants के लिए loan assistance.',
        bestFor: 'Planned family needs, education expenses, medical needs और personal commitments.',
        points: ['Income-led eligibility', 'Straightforward application support', 'KYC और bank account checks']
      }
    ],
    why: {
      eyebrow: 'क्यों चुनें',
      title: 'Trust, speed और simplicity पर आधारित lending experience.',
      text: 'Design premium है, लेकिन promise practical है: सही file तैयार करें, eligibility समझें और confidence के साथ आगे बढ़ें।',
      stats: [['6', 'Loan categories'], ['4', 'Step review flow'], ['12', 'Months statement option'], ['100', 'Document-led process']],
      features: [
        ['Submission से पहले clarity', 'File move होने से पहले KYC, bank statement, income और asset documents समझें।'],
        ['Human finance team', 'Purpose, repayment comfort, security coverage और next steps real team के साथ discuss करें।'],
        ['Responsible assessment', 'Approval से पहले eligibility, documents, collateral और offer terms review होते हैं।'],
        ['Premium support flow', 'Salaried professionals, business owners, entrepreneurs और individuals के लिए focused process.']
      ]
    },
    process: {
      eyebrow: 'लोन प्रक्रिया',
      title: 'Enquiry से disbursal तक guided four-step journey.',
      text: 'Process simple रहता है, लेकिन verification, documentation और responsible approval का पूरा ध्यान रखा जाता है।',
      steps: [
        ['01', 'Online Apply करें', 'अपनी requirement, amount range, city और preferred loan category share करें।'],
        ['02', 'Documents Verify करें', 'KYC, bank statements, income proof और applicable asset documents review होते हैं।'],
        ['03', 'Approval & Offer', 'Eligible applicants को amount, tenure और repayment terms के साथ clear offer मिलता है।'],
        ['04', 'Quick Disbursal', 'Acceptance और final checks के बाद funds approved terms के अनुसार process होते हैं।']
      ]
    },
    criteria: {
      eligibilityTitle: 'योग्यता मानदंड',
      documentsTitle: 'आवश्यक दस्तावेज',
      eligibility: ['Applicant age 21-60 years होनी चाहिए', 'Indian citizen', 'Valid PAN और Aadhaar', 'Active bank account', 'Stable source of income'],
      documents: ['PAN Card', 'Aadhaar Card', 'Bank Statement: 3 months / 6 months / 9 months / 12 months', 'Income Proof', 'Property / Vehicle / Security-related documents जहां लागू हों']
    },
    compliance: {
      eyebrow: 'Trust & compliance',
      title: 'Commitment से पहले responsible review.',
      text: 'हर file identity, income, banking history और applicable collateral records के आधार पर review होती है। उद्देश्य है कि borrower offer accept करने से पहले approval path स्पष्ट समझ सके।',
      note: 'Loan amount, tenure, rate और disbursal eligibility, documentation, credit assessment और applicable internal policies पर निर्भर करते हैं।',
      heading: 'Trust signals',
      points: ['PAN और Aadhaar based KYC checks', 'Income और bank statement review', 'Secured products के लिए asset documentation', 'Disbursal से पहले clear offer terms']
    },
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'Customers को clear communication याद रहता है।',
      text: 'नीचे दिए गए review cards उसी तरह के experience को communicate करते हैं जिसके लिए यह website design की गई है।',
      items: [
        { name: 'Business Owner', location: 'Delhi NCR', text: 'File submit करने से पहले team ने property और bank statement requirements अच्छे से explain कीं। इससे planning आसान हुई।', initials: 'BO' },
        { name: 'Self-employed Professional', location: 'Jaipur', text: 'मुझे समझ आया कि कौन से documents चाहिए, क्या verify होगा और next step क्या है। Discussion practical था।', initials: 'SP' },
        { name: 'Vehicle Finance Customer', location: 'Mumbai', text: 'Communication direct था। Vehicle documents और eligibility points step by step explain किए गए।', initials: 'VC' }
      ]
    },
    faqs: {
      eyebrow: 'FAQs',
      title: 'Borrowers सबसे पहले ये सवाल पूछते हैं।',
      items: [
        { q: 'ESS AAR FINEX PVT LTD कौन-कौन सी loan services देता है?', a: 'हम mortgage of property, short term loan, shares और stock सहित security loan, vehicle loan, project funding और personal loan solutions provide करते हैं।' },
        { q: 'Basic age eligibility क्या है?', a: 'Applicants की age सामान्यतः 21 से 60 years के बीच होनी चाहिए और income, KYC तथा bank account requirements पूरी होनी चाहिए।' },
        { q: 'क्या हर loan type के documents अलग होते हैं?', a: 'Most applications में basic KYC और bank statements required होते हैं। Property, vehicle या security-backed loan में related asset documents required होते हैं।' },
        { q: 'Loan disbursal कितनी जल्दी हो सकता है?', a: 'Disbursal timeline eligibility, document completion, verification और approval terms पर निर्भर करती है।' }
      ]
    },
    cta: {
      eyebrow: 'Apply करने के लिए तैयार?',
      title: 'अपनी requirement share करें और पहले document checklist पाएं।',
      text: 'हमारी team loan category, basic eligibility और next step के लिए जरूरी documents review करेगी।',
      action: 'Team से संपर्क करें'
    },
    about: {
      eyebrow: 'हमारे बारे में',
      title: 'Clear terms और proper documentation को महत्व देने वाले borrowers के लिए finance partner.',
      text: 'ESS AAR FINEX PVT LTD responsible assessment, practical file preparation और secured तथा unsecured lending needs में support पर focus करता है।',
      cards: [
        ['Company Overview', 'ESS AAR FINEX PVT LTD property mortgage, short term funding, security-backed loans, vehicle finance, project funding और personal loan requirements के लिए structured lending support देता है।'],
        ['Trust & Compliance', 'हर loan request KYC, income, bank account और relevant asset documentation के आधार पर review होती है। Approval और disbursal verification, eligibility और internal policy पर निर्भर रहते हैं।'],
        ['Vision', 'Document requirements, eligibility discussion और offer terms को आसान बनाकर trusted lending partner बनना।'],
        ['Mission', 'Professional service, transparent document requirements और enquiry से disbursal तक timely coordination के साथ responsible lending support देना।']
      ]
    },
    servicesPage: {
      eyebrow: 'सेवाएं',
      title: 'Security, purpose और repayment comfort के आधार पर designed loan products.',
      text: 'Property-backed funding, short-term liquidity, eligible securities, vehicles, projects और personal requirements के लिए lending options देखें।'
    },
    contact: {
      eyebrow: 'संपर्क',
      title: 'ESS AAR FINEX PVT LTD के साथ consultation book करें।',
      text: 'अपनी details भेजें और हमारी team eligibility guidance, documentation support और next steps के लिए आपसे connect करेगी।',
      details: [
        ['Registered Office Address', 'Registered office address placeholder'],
        ['Customer Support Email', 'support@essaarfinex.example'],
        ['Customer Care Number', '+91 XXXXX XXXXX'],
        ['Working Hours', 'Monday to Saturday, 10:00 AM to 6:00 PM']
      ],
      mapLabel: 'Office location',
      mapValue: 'Map placeholder',
      formTitle: 'Call back request करें',
      formText: 'Basic details share करें और हमारी team eligibility तथा documents पर guide करेगी।',
      fields: {
        name: 'Full Name',
        namePlaceholder: 'अपना पूरा नाम दर्ज करें',
        phone: 'Mobile Number',
        city: 'City',
        cityPlaceholder: 'आपका शहर',
        requirement: 'Loan Requirement',
        select: 'Service चुनें',
        amount: 'Required Amount',
        amountPlaceholder: 'Example: 5 lakh',
        message: 'Message',
        messagePlaceholder: 'अपनी requirement बताएं',
        submit: 'Enquiry Submit करें',
        note: 'Form submit करने से approval guarantee नहीं होता। Verification और next steps के लिए हमारी team आपसे contact करेगी।'
      }
    },
    footer: {
      text: 'Mortgage of property, short term loans, security loans, vehicle loans, project funding और personal loans के लिए lending support.',
      links: 'Important Links',
      services: 'Services',
      compliance: 'Compliance Note',
      complianceText: 'Loan approval eligibility, document verification, internal assessment और applicable terms पर निर्भर है।',
      rights: '© 2026 ESS AAR FINEX PVT LTD All rights reserved.'
    }
  }
};

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
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  useScrollReveal();

  useEffect(() => {
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
  }, [lang]);

  const pageTitle = useMemo(() => t.pageTitles[page], [page, t]);

  const goTo = (nextPage) => {
    setPage(nextPage);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header page={page} goTo={goTo} menuOpen={menuOpen} setMenuOpen={setMenuOpen} lang={lang} setLang={setLang} t={t} />
      <main>
        <h1 className="sr-only">{pageTitle}</h1>
        {page === 'home' && <Home goTo={goTo} t={t} lang={lang} />}
        {page === 'about' && <About t={t} />}
        {page === 'services' && <Services goTo={goTo} t={t} />}
        {page === 'contact' && <Contact t={t} />}
      </main>
      <Footer goTo={goTo} t={t} />
    </>
  );
}

function Header({ page, goTo, menuOpen, setMenuOpen, lang, setLang, t }) {
  const navItems = [
    ['home', t.nav.home],
    ['about', t.nav.about],
    ['services', t.nav.services],
    ['contact', t.nav.contact]
  ];

  return (
    <header className="site-header">
      <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); goTo('home'); }}>
        <span className="brand-mark">EF</span>
        <span>
          <strong>ESS AAR FINEX</strong>
          <small>PVT LTD</small>
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
        <button className="language-switch" type="button" onClick={() => setLang(lang === 'en' ? 'hi' : 'en')} aria-label="Switch language">
          <span className={lang === 'en' ? 'active' : ''}>EN</span>
          <span className={lang === 'hi' ? 'active' : ''}>हिं</span>
        </button>
        <a className="nav-cta" href="#contact" onClick={(event) => { event.preventDefault(); goTo('contact'); }}>
          {t.nav.apply}
        </a>
      </nav>
    </header>
  );
}

function Home({ goTo, t }) {
  return (
    <>
      <Hero goTo={goTo} t={t} />
      <TrustBar t={t} />
      <ServicesPreview goTo={goTo} t={t} />
      <WhyChoose t={t} />
      <LoanProcess t={t} />
      <CriteriaAndDocs t={t} />
      <TrustCompliance t={t} />
      <Testimonials t={t} />
      <Faqs t={t} />
      <ContactCta goTo={goTo} t={t} />
    </>
  );
}

function Hero({ goTo, t }) {
  return (
    <section className="hero" id="home">
      <div className="hero-orb orb-one" />
      <div className="hero-orb orb-two" />
      <div className="hero-copy" data-reveal>
        <p className="eyebrow">{t.hero.eyebrow}</p>
        <h2>{t.hero.title}</h2>
        <p>{t.hero.text}</p>
        <div className="hero-badges" aria-label="Trust highlights">
          {t.hero.badges.map((badge) => <span key={badge}>{badge}</span>)}
        </div>
        <div className="hero-actions">
          <button className="button primary" type="button" onClick={() => goTo('contact')}>{t.hero.apply}</button>
          <button className="button secondary" type="button" onClick={() => document.getElementById('eligibility')?.scrollIntoView({ behavior: 'smooth' })}>{t.hero.eligibility}</button>
          <button className="button secondary" type="button" onClick={() => goTo('contact')}>{t.nav.contact}</button>
        </div>
      </div>
      <div className="hero-stage" data-reveal>
        <div className="floating-card approval-card">
          <span>{t.hero.calculator.readiness}</span>
          <strong>92%</strong>
          <small>{t.hero.calculator.readinessText}</small>
        </div>
        <LoanCalculatorCard t={t} />
        <div className="floating-card support-card">
          <span>{t.hero.calculator.assisted}</span>
          <strong>{t.hero.calculator.human}</strong>
          <small>{t.hero.calculator.humanText}</small>
        </div>
      </div>
    </section>
  );
}

function LoanCalculatorCard({ t }) {
  const [amount, setAmount] = useState(12);
  const [tenure, setTenure] = useState(36);
  const monthly = Math.max(1, Math.round((amount * 100000) / tenure));

  return (
    <article className="calculator-card" aria-label={t.hero.calculator.top}>
      <div className="card-topline">
        <span>{t.hero.calculator.top}</span>
        <strong>{t.hero.calculator.status}</strong>
      </div>
      <h3>{t.hero.calculator.title}</h3>
      <label>
        {t.hero.calculator.amount}
        <input type="range" min="2" max="50" value={amount} onChange={(event) => setAmount(Number(event.target.value))} />
        <span className="range-value">{t.hero.calculator.amountValue(amount)}</span>
      </label>
      <label>
        {t.hero.calculator.tenure}
        <input type="range" min="6" max="84" step="6" value={tenure} onChange={(event) => setTenure(Number(event.target.value))} />
        <span className="range-value">{t.hero.calculator.tenureValue(tenure)}</span>
      </label>
      <div className="estimate-row">
        <span>{t.hero.calculator.benchmark}</span>
        <strong>Rs. {monthly.toLocaleString('en-IN')} / {t.hero.calculator.month}</strong>
      </div>
      <p>{t.hero.calculator.note}</p>
    </article>
  );
}

function TrustBar({ t }) {
  return (
    <div className="container trust-bar" aria-label="Trust signals" data-reveal>
      {t.trustBar.map((item) => <span key={item}>{item}</span>)}
    </div>
  );
}

function ServicesPreview({ goTo, t }) {
  return (
    <section className="section section-soft" id="services">
      <div className="container">
        <SectionHeading eyebrow={t.servicesSection.eyebrow} title={t.servicesSection.title} text={t.servicesSection.text} split>
          <button className="button secondary" type="button" onClick={() => goTo('services')}>{t.servicesSection.action}</button>
        </SectionHeading>
        <ServiceGrid compact goTo={goTo} t={t} />
      </div>
    </section>
  );
}

function WhyChoose({ t }) {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} text={t.why.text} />
        <div className="stats-grid" data-reveal>
          {t.why.stats.map(([target, label]) => <Stat key={label} target={target} label={label} />)}
        </div>
        <div className="feature-grid">
          {t.why.features.map(([title, text], index) => (
            <article className="feature-card" key={title} data-reveal>
              <span className="feature-icon">{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ target, label }) {
  const [active, setActive] = useState(false);
  const value = useCounter(target, active);

  useEffect(() => {
    const node = document.querySelector(`[data-stat="${label}"]`);
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [label]);

  return (
    <article className="stat-card" data-stat={label}>
      <strong>{value}{Number(target) === 100 ? '%' : '+'}</strong>
      <span>{label}</span>
    </article>
  );
}

function LoanProcess({ t }) {
  return (
    <section className="section process-section">
      <div className="container">
        <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} text={t.process.text} />
        <div className="timeline">
          {t.process.steps.map(([number, title, text]) => (
            <article className="timeline-step" key={number} data-reveal>
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

function CriteriaAndDocs({ t }) {
  return (
    <section className="section section-dark" id="eligibility">
      <div className="container split-panel">
        <InfoList title={t.criteria.eligibilityTitle} items={t.criteria.eligibility} />
        <InfoList title={t.criteria.documentsTitle} items={t.criteria.documents} />
      </div>
    </section>
  );
}

function InfoList({ title, items }) {
  return (
    <article className="info-panel" data-reveal>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}

function TrustCompliance({ t }) {
  return (
    <section className="section">
      <div className="container trust-layout">
        <div data-reveal>
          <p className="eyebrow">{t.compliance.eyebrow}</p>
          <h2>{t.compliance.title}</h2>
          <p>{t.compliance.text}</p>
          <p className="fine-print">{t.compliance.note}</p>
        </div>
        <article className="compliance-card" data-reveal>
          <strong>{t.compliance.heading}</strong>
          <ul>
            {t.compliance.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </article>
      </div>
    </section>
  );
}

function Testimonials({ t }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % t.testimonials.items.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [t.testimonials.items.length]);

  return (
    <section className="section testimonial-section">
      <div className="container">
        <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} text={t.testimonials.text} />
        <div className="carousel" data-reveal>
          {t.testimonials.items.map((item, index) => (
            <figure className={index === active ? 'testimonial active' : 'testimonial'} key={item.name}>
              <span className="avatar">{item.initials}</span>
              <blockquote>{item.text}</blockquote>
              <figcaption>
                <strong>{item.name}</strong>
                <span>{item.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="carousel-dots" aria-label="Testimonials">
          {t.testimonials.items.map((item, index) => (
            <button
              key={item.name}
              className={index === active ? 'active' : ''}
              type="button"
              aria-label={`Show testimonial ${index + 1}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Faqs({ t }) {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow={t.faqs.eyebrow} title={t.faqs.title} />
        <div className="faq-list" data-reveal>
          {t.faqs.items.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCta({ goTo, t }) {
  return (
    <section className="section">
      <div className="container cta-panel" data-reveal>
        <div>
          <p className="eyebrow">{t.cta.eyebrow}</p>
          <h2>{t.cta.title}</h2>
          <p>{t.cta.text}</p>
        </div>
        <button className="button light" type="button" onClick={() => goTo('contact')}>{t.cta.action}</button>
      </div>
    </section>
  );
}

function About({ t }) {
  return (
    <section className="page-section">
      <PageHero eyebrow={t.about.eyebrow} title={t.about.title} text={t.about.text} />
      <div className="container about-grid">
        {t.about.cards.map(([title, text]) => (
          <article className={title === 'Vision' || title === 'Mission' ? 'highlight-box' : ''} key={title} data-reveal>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Services({ goTo, t }) {
  return (
    <section className="page-section">
      <PageHero eyebrow={t.servicesPage.eyebrow} title={t.servicesPage.title} text={t.servicesPage.text} />
      <div className="container page-grid">
        <ServiceGrid goTo={goTo} t={t} />
      </div>
    </section>
  );
}

function ServiceGrid({ compact = false, goTo, t }) {
  const services = compact ? t.services.slice(0, 6) : t.services;

  return (
    <div className="service-grid">
      {services.map((service) => (
        <article className="service-card" key={service.title} data-reveal>
          <span className="service-icon">{service.icon}</span>
          <span className="service-tag">{t.servicesSection.tag}</span>
          <h3>{service.title}</h3>
          <p>{service.text}</p>
          <div className="best-for">
            <span>{t.servicesSection.bestFor}</span>
            <strong>{service.bestFor}</strong>
          </div>
          <ul>
            {service.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
          <button className="service-link" type="button" onClick={() => goTo('contact')}>{t.servicesSection.enquire}</button>
        </article>
      ))}
    </div>
  );
}

function Contact({ t }) {
  return (
    <section className="page-section">
      <PageHero eyebrow={t.contact.eyebrow} title={t.contact.title} text={t.contact.text} />
      <div className="container contact-layout">
        <div className="contact-details">
          {t.contact.details.map(([label, value]) => <ContactItem key={label} label={label} value={value} />)}
          <article className="map-card" data-reveal>
            <span>{t.contact.mapLabel}</span>
            <strong>{t.contact.mapValue}</strong>
          </article>
        </div>
        <ConsultationForm t={t} />
      </div>
    </section>
  );
}

function ConsultationForm({ t }) {
  return (
    <form className="contact-form" data-reveal>
      <div className="form-heading">
        <h2>{t.contact.formTitle}</h2>
        <p>{t.contact.formText}</p>
      </div>
      <label>
        {t.contact.fields.name}
        <input type="text" name="name" placeholder={t.contact.fields.namePlaceholder} />
      </label>
      <label>
        {t.contact.fields.phone}
        <input type="tel" name="phone" placeholder="+91" />
      </label>
      <label>
        {t.contact.fields.city}
        <input type="text" name="city" placeholder={t.contact.fields.cityPlaceholder} />
      </label>
      <label>
        {t.contact.fields.requirement}
        <select name="requirement" defaultValue="">
          <option value="" disabled>{t.contact.fields.select}</option>
          {t.services.map((service) => <option key={service.title}>{service.title}</option>)}
        </select>
      </label>
      <label>
        {t.contact.fields.amount}
        <input type="text" name="amount" placeholder={t.contact.fields.amountPlaceholder} />
      </label>
      <label>
        {t.contact.fields.message}
        <textarea name="message" rows="4" placeholder={t.contact.fields.messagePlaceholder} />
      </label>
      <button className="button primary" type="submit">{t.contact.fields.submit}</button>
      <p className="form-note">{t.contact.fields.note}</p>
    </form>
  );
}

function ContactItem({ label, value }) {
  return (
    <article className="contact-item" data-reveal>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function PageHero({ eyebrow, title, text }) {
  return (
    <div className="inner-hero">
      <div className="container" data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text, children, split = false }) {
  return (
    <div className={split ? 'section-heading split' : 'section-heading'} data-reveal>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {children}
    </div>
  );
}

function Footer({ goTo, t }) {
  const footerLinks = [
    ['home', t.nav.home],
    ['about', t.nav.about],
    ['services', t.nav.services],
    ['contact', t.nav.contact]
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); goTo('home'); }}>
            <span className="brand-mark">EF</span>
            <span>
              <strong>ESS AAR FINEX</strong>
              <small>PVT LTD</small>
            </span>
          </a>
          <p>{t.footer.text}</p>
        </div>
        <div>
          <h2>{t.footer.links}</h2>
          {footerLinks.map(([key, label]) => (
            <button key={key} type="button" onClick={() => goTo(key)}>{label}</button>
          ))}
        </div>
        <div>
          <h2>{t.footer.services}</h2>
          {t.services.slice(0, 4).map((service) => <span key={service.title}>{service.title}</span>)}
        </div>
        <div>
          <h2>{t.footer.compliance}</h2>
          <p>{t.footer.complianceText}</p>
        </div>
      </div>
      <div className="footer-bottom">{t.footer.rights}</div>
    </footer>
  );
}

export default App;

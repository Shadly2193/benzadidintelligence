/** All page text lives in /content so the developer can move it to a CMS or i18n later. */
export const WHATSAPP_NUMBER = '8801680066637';
export const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const PROGRAM_NAME = 'Digital Residency Program';

/** Dates and early-bird price. All times are Bangladesh time (+06:00). */
export const schedule = {
  classStart: '2026-12-04T00:00:00+06:00',
  classStartLabel: 'Friday, 4 December',
  earlyBirdEnd: '2026-11-20T23:59:59+06:00',
  earlyBirdEndLabel: '20 November',
  earlyBirdAmount: 20000,
  earlyBirdNote: 'Early bird: full payment only.',
  regEnd: '2026-11-30T23:59:59+06:00',
  regEndLabel: '30 November',
  priceUpNote: 'Price goes up to 24,000 BDT on 21 November.',
  clock: {
    label: 'SEATS CLOSE SOON',
    earlyTitle: 'Early bird price ends in',
    regTitle: 'Registration closes in',
    closedTitle: 'Registration is closed.',
    closedLine: 'Message me on WhatsApp to hear about the next batch.',
    units: ['Days', 'Hours', 'Minutes', 'Seconds'],
  },
};

export const hero = {
  eyebrow: 'DIGITAL RESIDENCY PROGRAM',
  lines: ['Doctors! Your brand,', 'marketing, videos,', 'website and AI.', 'Everything in one '] as const,
  glitchWord: 'program',
  sub: 'Doctors! It is time to upgrade yourself. Build your own brand with AI. Learn marketing, videos, website and your marketing plan, all in this program.',
  chips: [
    'Live classes, 3 days a week',
    '1.5 hours each class',
    'All recordings',
    'Private community',
    'Feedback on every milestone',
    'Certificate',
  ],
  seatNote: 'Limited seats',
  videoTitle: 'Welcome video',
  videoHint: 'Your YouTube (unlisted) video goes here',
  videoTip: 'Tip: who it is for, what they get, how to join. Under 2 minutes.',
  promptDemo: {
    ask: 'Write my doctor profile intro.',
    resultName: 'Dr. Your Name',
    resultLine: 'Dental surgeon · Book your visit',
  },
};

/** Names scroll in a horizontal strip. The real site already has this logo strip: reuse it. */
export const workedWith = [
  'PRAN',
  'BRAC EPL',
  'UCB Bank',
  'gPay',
  'Shamadhan',
  'HMBD Foundation',
  'National and international NGOs',
  'CNRS',
  'North South University',
  'icddr,b',
  'McMaster University',
];

export const problem = {
  label: 'THE PROBLEM',
  big: ['You studied for years.', 'Nobody taught you the online part.', 'That is what we fix.'],
  hint: 'Tap a card to see how we fix it.',
  cards: [
    { q: 'I feel shy on camera.', a: 'Start without your face. Step up slowly, one small step at a time.' },
    { q: 'What will people say?', a: 'This feeling goes away as you practice. We help you start small, until it feels normal.' },
    { q: 'I do not know what to post.', a: 'Content pillars and a ready plan. One sitting makes a week of posts.' },
    { q: 'I do not know where to start.', a: 'Week 1: find your stage, your goal and your niche.' },
    { q: 'Too many tools. I am lost.', a: 'Relax. We give you one simple map. One job, one tool, one step at a time.' },
    { q: 'I want to look professional, not pushy.', a: 'Learn clear, bold and respectful ways to promote your chamber and your work.' },
    { q: 'I have no time.', a: 'Small tasks. Batch a week of content in one sitting.' },
    { q: 'I do not know AI or digital marketing.', a: 'We teach you step by step. Soon you can do it on your own.' },
    { q: 'I do not know how to use AI in my medical work.', a: 'Learn AI for your own field: patient education, documents, learning and research. Then use it in more parts of your work.' },
    { q: 'I do not know anything about digital technology.', a: 'Start with the basics. Then move to the advanced tools that help your work as a doctor.' },
  ],
};

export const future = {
  label: 'YOUR FUTURE',
  title: ['Before this program.', 'After this program.'],
  lead: 'Nothing digital will feel scary any more.',
  soft: 'And if you want, you can also build a side hustle: your own e-book, mini course or workshop, with a simple plan to market it.',
  rows: [
    ['I feel shy in front of a camera.', 'I speak to the camera calmly and clearly.'],
    ['I worry about what people will say.', 'I share what I know with confidence.'],
    ['One negative comment can stop me for days.', 'I stay calm, reply with respect, and keep going.'],
    ['I start, then I stop.', 'I post every week, because I have a simple routine.'],
    ['I do not know what to post.', 'I have ideas and a plan for every week.'],
    ['Nobody knows who I am online.', 'People find me online and know what I do. My name is clear.'],
    ['People do not know about my chamber or my work.', 'More people find my work, and I promote it in a respectful way.'],
    ['I cannot make videos.', 'I make and edit videos with AI, with or without my face.'],
    ['AI tools feel confusing.', 'I use AI in my own field: patient education, documents, learning and research.'],
    ['I wait for an agency, and I fear the cost.', 'I know what to spend, and when. I start small myself.'],
    ['I wait for someone to build my website.', 'I build my own website, the kind that sells for $800 to $1,000.'],
    ['I am a student. I do not know how to begin.', 'I start building my name before I graduate. I am ahead of my batch.'],
  ] as [string, string][],
};

export const demo = {
  label: 'SEE IT HAPPEN',
  title: ['This is what you will', 'learn to do.'],
  lead: 'You give AI simple commands. It does the heavy work. You stay in charge. These are examples of what you will practice.',
  tabs: ['Vibe-coded website', 'Vibe editing', 'Vibe research', 'Personal brand', 'Digital marketing', 'AI in practice'],
  footnote: 'Also inside: a guide to building a side hustle with digital products.',
  hintLive: 'Playing by itself. Click any tab to jump to it.',
  hintPaused: 'Click any tab to watch it.',
};

export const proof = {
  label: 'REAL WORK',
  title: ['This is the kind of work', 'you will learn to make.'],
  lead: 'These are websites and videos I made with AI. You will learn the same way of working.',
  note: '1,100+ students have learned AI from me. Now I teach doctors, step by step.',
  items: [
    { src: '/course/videos/dr-ehsan-website.mp4', tag: 'WEBSITE', title: 'Doctor website', sub: 'Built with AI', wide: false },
    { src: '/course/videos/dr-towhid-medicine-specialist.mp4', tag: 'WEBSITE', title: 'Medicine specialist website', sub: 'Built with AI', wide: false },
    { src: '/course/videos/dr-rayhan-hepatobiliary-surgeon.mp4', tag: 'WEBSITE', title: 'Surgeon website', sub: 'Built with AI', wide: false },
    { src: '/course/videos/black-orange-ad.mp4', tag: 'VIDEO', title: 'Video work', sub: 'Made with AI', wide: true },
    { src: '/course/videos/orange-juice-ad.mp4', tag: 'VIDEO', title: 'Video work', sub: 'Made with AI', wide: true },
  ],
};

/** Free sample class (YouTube, unlisted). The section stays hidden until a link is added in admin. */
export const freeClass = {
  label: 'FREE CLASS',
  title: ['Watch a free class', 'before you decide.'],
  lead: 'A full 1-hour class on how doctors and medical professionals can use AI. See how I teach, then decide.',
  youtube: '',
  duration: 'About 1 hour',
  points: ['How AI helps in medical work', 'Real examples, step by step', 'No signup needed'],
  play: 'Play the free class',
};

/** Public roadmap: headline topics only. Class-by-class details stay in the private module plan. */
export const roadmap = {
  label: 'THE 16 WEEKS',
  title: ['8 rotations.', 'One clear path.'],
  lead: 'Like a residency, you move from one rotation to the next. Each rotation is about 2 weeks.',
  hint: 'Swipe or drag the cards to see every rotation →',
  youMake: 'You make',
  rotations: [
    { n: 'Start', w: 'WEEKS 1-2', promise: 'Start safely as a doctor. No camera needed.', topics: ['Find your stage', 'AI is your assistant', 'Beat the fear', 'Your digital toolbox'], make: 'Your doctor profile goal and your first post' },
    { n: 'Profile', w: 'WEEKS 3-4', promise: 'Look clear and trusted as a doctor online.', topics: ['Brand basics', 'Your page', 'Content pillars', 'Respectful promotion'], make: 'Your professional page' },
    { n: 'Content', w: 'WEEKS 5-6', promise: 'Make health content fast.', topics: ['Video basics', 'AI images', 'AI video', 'Vibe editing'], make: 'Your first health education Reel' },
    { n: 'Marketing', w: 'WEEKS 7-8', promise: 'Reach the right patients, with respect.', topics: ['Marketing basics', 'Growth on social', 'Scheduling and results', 'Google and all platforms'], make: 'A 30-day plan for your chamber or practice' },
    { n: 'AI in medical practice', w: 'WEEKS 9-10', promise: 'Use AI in your own medical field.', topics: ['AI in your field', 'Patient education', 'Clinic follow-up', 'Slides, CV and updates'], make: 'Your own medical AI assistant' },
    { n: 'AI Research', w: 'WEEKS 11-12', promise: 'Do medical research faster.', topics: ['Vibe research', 'Data and charts', 'Writing and journals', 'Research agent'], make: 'A medical research summary' },
    { n: 'Build', w: 'WEEKS 13-14', promise: 'Own your doctor website.', topics: ['Vibe coding', 'Your website', 'Domain and publish', 'Agents and automation'], make: 'Your live doctor website' },
    { n: 'Hustle and finish', w: 'WEEKS 15-16', promise: 'Turn your medical knowledge into value.', topics: ['Hustle mindset', 'Your digital product', 'Launch', 'Final presentation'], make: 'A digital product from your knowledge, and your 90-day plan' },
  ],
};

export const how = {
  label: 'HOW IT WORKS',
  title: ['Learn. Build.', 'Post. Get feedback.'],
  lead: 'No exam hall. After each rotation you get 7 to 15 days to learn by yourself, make something, and post it in the private group.',
  steps: [
    ['Live class', '3 days a week, online, 1.5 hours each.'],
    ['Recording', 'Missed a class? Watch it in the private group.'],
    ['Learn alone', '7 to 15 days. Ask AI when you are stuck.'],
    ['Post it', 'Share your work in the group. This builds confidence.'],
    ['Get feedback', 'A checklist score, plus review from your peers.'],
  ] as [string, string][],
  rules: [
    ['8', 'milestones, one per rotation'],
    ['60%', 'to pass'],
    ['1', 'chance to resubmit'],
    ['100%', 'private group'],
  ] as [string, string][],
};

export const who = {
  label: 'WHO IT IS FOR',
  title: ['Pick your stage.', 'See your path.'],
  lead: 'Everyone learns the same lessons. Your homework changes with your stage.',
  verify: 'Open to medical and dental students and doctors only. We check your name, and your BMDC number or your college name and ID.',
  stages: [
    { k: 'Student', t: 'You are still studying (MBBS or BDS).', a: ['Start with student life videos.', 'Build the camera habit early.', 'Make your page before you graduate.', 'Build your name before you graduate.'] },
    { k: 'Intern', t: 'You are doing your internship.', a: ['Share your intern journey as short vlogs.', 'Learn to save time with AI.', 'Start your page and your story now.', 'Learn to find work and opportunities online.'] },
    { k: 'New doctor', t: 'You just graduated and are starting your career.', a: ['Build your page and your niche.', 'Share what you learn in simple words.', 'Choose your direction early.', 'Build trust online, respectfully.'] },
    { k: 'Practicing', t: 'You have a job or a chamber (BCS, private practice).', a: ['Use AI to save hours every week.', 'Bring patients with useful free content.', 'Document your work properly.', 'Keep in touch with your patients using AI.'] },
    { k: 'Established', t: 'You have worked for years.', a: ['Use AI and digital tools to save your time.', 'Share your experience in simple words.', 'Guide young doctors and students. Leave something for the next generation.'] },
  ],
};

export const instructor = {
  label: 'YOUR INSTRUCTOR',
  name: 'Dr. Md. Shadly Benzadid',
  micro: 'Ex-Dentist · AI Generalist · AI Builder · AI Instructor',
  lead: 'A doctor who builds websites for doctors, and teaches doctors how to use AI.',
  photoUrl: '', // set from admin (Course Page > Your instructor > Photo Url > Upload)
  photoAlt: 'Dr. Md. Shadly Benzadid',
  photo: 'Your photo here',
  photoNote: '(Black and Orange series from the site)',
  facts: [
    'Dental surgeon first. Then AI, automation, content and websites.',
    '1,100+ students trained in AI, through my course "ChatGPT Mastery: The Ultimate Guide".',
    'Work with Purple Bot (National Digital Marketing Agency).',
    'Business owner and founder, Benzadid Intelligence.',
    'Brands I worked with at Purple Bot: PRAN, BRAC EPL, UCB Bank, gPay and Shamadhan.',
    'Worked with national and international NGOs.',
    'Research institutes I worked with: CNRS, North South University, icddr,b and McMaster University.',
    'Friendly teacher. Jokes with seniors. Like a big brother to juniors.',
  ],
  stat: { value: 1100, suffix: '+', label: 'Students trained' },
};

export const price = {
  label: 'PRICE',
  title: ['One program.', 'Built only for doctors, by a doctor.'],
  badge: 'LIMITED SEATS',
  name: 'Digital Residency Program',
  amount: 24000,
  currency: 'BDT',
  payFull: 'Pay in full',
  payParts: 'Pay in 2 parts',
  includes: [
    'Live classes with every recording',
    'Vibe-coded website, vibe editing, vibe research',
    'Personal brand and digital marketing',
    'AI in your medical practice',
    'A side hustle plan, if you want one',
    'Private course community',
    'Feedback, portfolio and certificate',
  ],
  oneToOne: {
    title: '1-to-1 with me',
    amount: 60000,
    line: 'Message me first on WhatsApp. We will plan it together, around your goal.',
    cta: 'Ask about 1-to-1',
    wa: 'Hello, I want to ask about 1-to-1 training.',
  },
  note: 'After you apply, I will send the payment details to you personally on WhatsApp.',
};

export const riskFree = {
  label: 'RISK-FREE START',
  title: 'Try the first 2 classes. If it is not for you, get your money back.',
  checks: ['Attend both of the first 2 classes (live or by recording)', 'Do the two small class tasks (post your goal and niche, and your first build)', 'Ask for the refund within 96 hours after class 2 ends'],
  result: 'Money back',
  rules: [
    'Ask me on WhatsApp. I refund what you paid, the same way you paid.',
    'After a refund you leave the private course community and lose access to the course and recordings.',
    'You stay in the free Facebook group.',
    'One refund per person.',
  ],
};

export const walkaway = {
  label: 'WHAT YOU GET',
  title: 'What you walk away with.',
  lead: 'You learn skills that people usually pay others to do. And you learn them as a doctor, for doctors.',
  valueNote: 'Based on what agencies in Bangladesh usually charge. We count only the lowest price. You learn to do it yourself, for good.',
  cards: [
    { h: 'Your personal brand', t: 'A page, a story and a look that people remember.', m: 'Brand building by an agency: 50,000–80,000 BDT. You keep building it for life.', v: 50000 },
    { h: 'Digital marketing', t: 'Social media, website and Google, working together.', m: 'Marketing agencies: 40,000–60,000 BDT a month', v: 40000 },
    { h: 'A vibe-coded website', t: 'Build your own website by talking to AI.', m: 'Web agencies: 40,000–1,00,000 BDT', v: 40000 },
    { h: 'Vibe editing', t: 'Edit professional-looking videos with simple commands.', m: 'Video agencies: 8,000–20,000 BDT a video. 4 a month: 32,000+', v: 32000 },
    { h: 'Vibe research', t: 'Find, read and write research faster, in your own field.', m: 'Research help: 20,000–30,000 BDT a paper', v: 20000 },
    { h: 'AI in your medical practice', t: 'Patient education, notes, communication and staying up to date.', m: 'AI training for doctors: 15,000–20,000 BDT. Saves you hours every week.', v: 15000 },
    { h: 'Confidence', t: 'Step in front of the camera and in front of people, calmly.', m: '', v: 0 },
    { h: 'A side hustle plan', t: 'If you want: build and market your own e-book, mini course or workshop.', m: '', v: 0 },
  ] as { h: string; t: string; m: string; v: number }[],
  totalLabel: 'Hiring all this out',
  priceLabel: 'Your price',
  priceAmount: 24000,
  alsoIncluded: 'Also included',
  insideTitle: 'Everything inside',
  inside: [
    'Live classes online, 3 days a week, 1.5 hours each',
    'Every class recorded',
    'A private course community, separate from the free Facebook group',
    'Feedback on every milestone (checklist plus peer review)',
    'Your own digital portfolio',
    'Certificate when you pass',
  ],
};

export const fit = {
  title: 'Is this for you?',
  yes: 'This course is for you if',
  no: 'This course is not for you if',
  rows: [
    ['You think a doctor does not need to keep up with new technology, and today\'s way is enough.', 'You are a doctor, and you want to be smarter in digital technology and everything around it.'],
    ['You think personal branding is nonsense.', 'You know a doctor needs a stronger personal brand.'],
    ['You think AI has no value, and you do not need to save time.', 'You want to use AI to save time, and still do your medical work and build your brand.'],
    ['You think your chamber does not need marketing.', 'You know your chamber needs marketing, and you want to do it better yourself.'],
    ['You want an agency to do your marketing.', 'You want to do your own digital marketing.'],
    ['You want someone else to make and edit your videos.', 'You want to make and edit your own videos.'],
    ['You do not want to build your own website.', 'You want to build your own website.'],
    ['You are not a BMDC-registered doctor, or not enrolled in MBBS or BDS.', 'You are a BMDC-registered doctor, or enrolled in MBBS or BDS.'],
  ] as [string, string][],
};

export const join = {
  label: 'HOW TO JOIN',
  title: '3 easy steps.',
  steps: [
    ['Fill the form', 'Your name, college, session, and your BMDC number or student year.'],
    ['Talk to me on WhatsApp', 'The form opens WhatsApp. I send the payment details to you there.'],
    ['Get your group link', 'I check your details and payment myself. Then you get the private course community link.'],
  ] as [string, string][],
  fields: {
    name: 'Full name',
    fb: 'Facebook name',
    college: 'Medical college name',
    session: 'Session',
    hasBmdc: 'Do you have a BMDC number?',
    bmdc: 'BMDC number',
    year: 'Which year are you in?',
    idImg: 'BMDC card or student ID image',
  },
  years: ['1st year', '2nd year', '3rd year', '4th year', '5th year', 'Intern'],
  idNote: 'Your ID image is kept private. Only I can see it. Please also attach it in WhatsApp after the chat opens.',
  closedNote: 'Registration is closed for this batch.',
  agree: 'I have read the program details and the refund rules, and I agree.',
  submit: 'Send my request on WhatsApp',
  thanks: 'Thank you. WhatsApp should open now. Send the message and I will reply with the next step.',
};

export const faq = {
  label: 'QUESTIONS',
  title: 'Quick answers.',
  items: [
    ['Why 24,000 BDT?', 'You learn to build a website, edit videos, do research, grow your brand and use AI in your practice. Real skills that people usually pay others for. You get live classes, every recording, a private community and feedback on every milestone. It is built only for doctors, by a doctor.'],
    ['Can I pay in parts?', 'Yes. Pay 12,000 BDT to join, and the other 12,000 BDT after 1 month. The total price stays the same.'],
    ['Is there a refund?', 'Yes, for the first 2 classes. Attend both (live or by recording), do the two small class tasks, and ask within 96 hours after class 2 ends. I refund what you paid. You then leave the course and the private community, and keep the free Facebook group.'],
    ['What is the 1-to-1 option?', 'It is personal training with me, for 60,000 BDT. Message me first on WhatsApp and we will plan it around your goal.'],
    ['I am a student. Is this for me?', 'Yes. Open to medical and dental students, interns and doctors. Your homework changes with your stage, and you can start building your name before you graduate.'],
    ['Will you teach AI for my medical practice?', 'Yes. You learn to use AI for patient education, notes and documents, communication, and staying up to date. We do not use AI to make medical decisions.'],
    ['Will you teach AI for research?', 'Yes. You learn to find and read papers, make summary tables, and write drafts with references, in your own field.'],
    ['Can I build a side hustle?', 'If you want to. You get a simple guide to creating and marketing your own digital product, such as an e-book, mini course or workshop. I do not promise any income.'],
    ['I know nothing about AI. Is that okay?', 'Yes. We start from zero. The main lesson is simple: when you do not know something, ask AI.'],
    ['Which tools will I need?', 'A phone, a laptop and internet. We show you what to use, one job at a time, so you never feel lost.'],
    ['I am shy on camera. Is this for me?', 'Yes. You start without your face. Then you step in front of the camera slowly, with a private group to practice in.'],
    ['I am very busy. Can I keep up?', 'The program is made for busy doctors and students. You learn to make a week of content in one sitting, and every class is recorded.'],
    ['How is it graded?', 'No MCQ exam. After each rotation you make something and post it in the group. You need 60% to pass. If you miss it, you can resubmit once.'],
    ['Is my ID image safe?', 'Yes. It is kept private and only used to check that you are a doctor or a medical or dental student.'],
  ] as [string, string][],
};

export const final = {
  label: 'NEXT STEP',
  big: ['Limited seats.', 'Take yours.'],
  lead: '24,000 BDT, or pay in 2 parts. Refund-backed for the first 2 classes.',
  ctaMain: 'Join the program',
  ctaGhost: 'See the 16 weeks again',
};

export const sections: { id: string; name: string }[] = [
  { id: 'top', name: 'Start' },
  { id: 'problem', name: 'The problem' },
  { id: 'future', name: 'Your future' },
  { id: 'demo', name: 'See it happen' },
  { id: 'proof', name: 'Real work' },
  { id: 'free', name: 'Free class' },
  { id: 'road', name: 'The 16 weeks' },
  { id: 'how', name: 'How it works' },
  { id: 'who', name: 'Who it is for' },
  { id: 'inst', name: 'Your instructor' },
  { id: 'price', name: 'Price' },
  { id: 'clock', name: 'Countdown' },
  { id: 'value', name: 'What you get' },
  { id: 'join', name: 'How to join' },
  { id: 'faq', name: 'Questions' },
  { id: 'final', name: 'Join' },
];

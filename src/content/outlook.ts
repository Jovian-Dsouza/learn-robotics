import type { OutlookContent } from './types'

export const outlook: OutlookContent = {
  headline:
    'This roadmap will not make you a senior robotics engineer in six months. Senior in this field means five or more years deploying real-time systems on physical robots. What it will make you is someone who can build, debug, and ship working robots, who understands the stack from the electrical layer up to the learned policy, and who has the physical portfolio to prove it. That is enough to get you into the field — and the field is where the compounding happens.',
  capitalStats: [
    'Physical AI startups raised $47.4B in H1 2026 across 521 deals — more than 2022–2024 combined (Crunchbase)',
    'Narrower robotics-only funding hit $18.8B by late June 2026, against $15B for all of 2025',
    'Individual rounds: Neura Robotics $1.4B, Skild AI $1.4B, Apptronik $520M; Figure carries a $39B post-money valuation (The Robot Report, 2026 outlook)',
  ],
  hiringReality: [
    'North American robot orders grew only 2.0% in units in H1 2026 (A3); US installations fell 9% in 2024 (IFR)',
    'The BLS occupational code containing robotics engineers projects 1–2% growth, not the 10% figure often quoted with no source',
    'Robotics is a much smaller labour market than software: BLS projects 106,100 annual openings for software developers against roughly 57,200 for mechanical, electrical, and industrial engineers combined',
    'Money is arriving faster than qualified people are — the shortage is concentrated in specific specialisms, and the entry tier is unusually open to people without degrees',
    'The largest robotics job category by posting volume is Automation and Robotics Technician at 20.3% of 3,113 postings; 68% of robotics technician roles are satisfied by an associate\'s degree or a certificate (O*NET)',
  ],
  pay: [
    { id: 'pay.median', label: 'Median (O*NET/BLS)', value: '$122,930', source: 'the only official figure here' },
    { id: 'pay.entry', label: 'Entry level', value: '$80k–$100k', source: 'Payscale and Salary.com; higher at coastal, well-funded employers' },
    { id: 'pay.mid', label: 'Mid level (3–6 years)', value: '$120k–$165k', source: 'conventional employers' },
    { id: 'pay.senior', label: 'Senior', value: '$160k–$230k', source: 'mainstream' },
    { id: 'pay.frontier', label: 'Frontier physical-AI (e.g. Figure Helix, Robot Learning)', value: '$200k–$400k base', source: 'live Figure listing; perception role posts $200k–$350k' },
    { id: 'pay.foundation', label: 'Robot foundation model specialists', value: '$280k–$475k total comp', source: 'recruiter placement data, heavily equity-weighted' },
    { id: 'pay.germany', label: 'Germany', value: '~€70,000 median total', source: 'Glassdoor' },
    { id: 'pay.switzerland', label: 'Switzerland', value: '~CHF 95,000', source: 'Glassdoor' },
    { id: 'pay.uk', label: 'UK', value: '£32,000–£50,000 base', source: 'Glassdoor' },
    { id: 'pay.india', label: 'India', value: '~₹653,000', source: 'Glassdoor' },
  ],
  freelance: [
    'Robotics engineers on Upwork list $22–$70/hour, clustering $30–$50',
    'ROS project work, priced per deliverable: $500–$1,200 for a node implementation, $1,200–$2,500 for launch configuration, $4,500–$7,000 for a sensor integration pipeline, $7,000–$12,000 for a full system architecture',
    'ZipRecruiter puts ROS developers at an average $52.84/hour',
    'In a robot cell, the robot itself averages about 25% of total project cost — the other three quarters is engineering, safety, and integration. A $35k arm becomes an $80k working system, and that $45k gap is what you are selling',
  ],
  entryPoints: [
    'Teleoperation and data collection: averages $28.24/hour (most $22.12–$32.93). Figure posted a Humanoid Robot Operator role at $25–$35/hour with no degree stated; Weave Robotics posted at $25/hour',
    'Robotics technician: median $73,900 (BLS), typically entering with an associate\'s degree',
    'Be clear-eyed: the teleoperation pay band is mostly in the most expensive US metros, often on-site and physically demanding — a genuine foot in the door at frontier companies, not a comfortable living in San Francisco',
  ],
  takeaways: [
    {
      id: 'takeaway.build',
      title: 'Build the projects, do not read about them',
      body: 'Pick one build from each month and actually make it: the line follower, the balancing robot, the arm, the ROS 2 navigation stack, the trained policy. Break them, fix them, film them, push them to GitHub. Portfolio-first sourcing beats keyword search, and the projects that get people hired are the ones with logged metrics and a visible debugging history.',
    },
    {
      id: 'takeaway.write',
      title: 'Write down what broke',
      body: 'The single highest-value piece of advice here. Anyone can post a working demo. Almost nobody documents the four things that failed first and how they diagnosed each one. That write-up is the closest thing to proof that you can actually engineer, and it is why your repo survives the third follow-up question in an interview.',
    },
    {
      id: 'takeaway.start',
      title: 'Start before you feel ready',
      body: 'Apply for the technician role, take the teleoperation shift, contribute the small fix to Nav2, message the founder of the three-person robotics startup. The gap between "I am learning robotics" and "I work in robotics" is almost entirely a gap of nerve — nobody in this field will ever tell you that you have studied enough.',
    },
  ],
}

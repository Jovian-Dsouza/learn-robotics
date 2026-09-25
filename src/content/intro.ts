import type { IntroContent } from './types'

export const intro: IntroContent = {
  whyRobotics: [
    'AI engineering is crowded — everyone in your timeline can wire up a subagent, and that is exactly why it is hard to build a moat there.',
    'Robotics is structurally the opposite: the models already work, but almost nobody can put them in a body.',
    'You cannot scrape the physical world. Someone has to move a real machine to generate the data.',
    "There is no Stack Overflow answer for why your gripper keeps slipping, and a robot falling over isn't a problem you can hand to a subagent.",
    'Nobody clones your robot over a weekend — the hardware is the moat.',
  ],
  specialisms: [
    { id: 'perception', name: 'Perception and computer vision' },
    { id: 'controls', name: 'Controls and state estimation' },
    { id: 'motion', name: 'Motion planning and manipulation' },
    { id: 'learning', name: 'Robot learning' },
    { id: 'embedded', name: 'Embedded and firmware' },
    { id: 'simulation', name: 'Simulation' },
    { id: 'systems', name: 'Systems and integration' },
    { id: 'deployment', name: 'Deployment and operations' },
  ],
  jobRequirements: [
    { id: 'languages', label: 'C++ and Python, both — not one or the other' },
    { id: 'hardware', label: 'Real-hardware experience — simulation-only does not read as senior' },
    { id: 'depth', label: 'Depth in one specialism, literacy across the rest' },
    { id: 'debugging', label: 'Debugging, named as a skill in its own right' },
  ],
  commitment:
    'A specific degree never appears on that list. This roadmap is built around making things work rather than studying theory — keep whatever is paying you, treat this as two to three focused hours a day, and six months is designed to run at that pace.',
}

import type { Direction } from './types'

export const directions: Direction[] = [
  {
    id: 'd1',
    number: 1,
    name: 'Robot learning and embodied AI',
    bestFor: 'Best if you want the frontier companies and the highest ceiling.',
    focus: ['LeRobot', 'VLA fine-tuning', 'Imitation learning', 'RL', 'Simulation', 'PyTorch'],
    detail:
      'The highest-paid track and also the most competitive — a real dataset you collected yourself is worth more than any credential here.',
  },
  {
    id: 'd2',
    number: 2,
    name: 'Autonomy and mobile robotics',
    bestFor: 'Best if you want the largest number of available jobs.',
    focus: ['ROS 2', 'Nav2', 'SLAM', 'Perception', 'Sensor fusion', 'C++'],
    detail:
      'Controls engineer and field service engineer together are over 20% of all robotics postings, and this direction serves both.',
  },
  {
    id: 'd3',
    number: 3,
    name: 'Embedded, mechatronics, and integration',
    bestFor: 'Best if you want to work immediately, including as a contractor.',
    focus: ['Firmware', 'Motor control', 'Real-time systems', 'PLCs', 'Functional safety', 'System integration'],
    detail:
      'The least glamorous and the most consistently employable — this is where the technician-to-engineer path actually runs. 66% of robotics projects report delays caused by certification, so functional safety is a genuine, underserved specialism.',
  },
]

import type { PortfolioContent } from './types'

export const portfolio: PortfolioContent = {
  highSignal: [
    'GitHub repos with logged metrics and a commit history showing iterative debugging, not a finished demo dropped in one commit',
    'Evidence of real-robot deployment with reliability data, not simulation only',
    'Public datasets on the LeRobot Hub, where there are already tens of thousands of community datasets',
    'Contributions to the packages employers depend on: ROS 2 core, Nav2, MoveIt, Isaac Lab, LeRobot',
    'Systems integration work joining sensors to actuators to planning to control, with video and clear documentation',
  ],
  redFlags: [
    'Still on end-of-life ROS 1 with no migration evidence',
    'Claimed projects that cannot survive three follow-up questions',
    'A pure deep-learning background with no kinematics or embodiment understanding',
    'Tutorial completion certificates, which are weighted far below real contributions',
  ],
  readmeChecklist: [
    { id: 'readme.video', label: 'A video at the top' },
    { id: 'readme.diagram', label: 'A wiring or architecture diagram' },
    { id: 'readme.numbers', label: 'The actual numbers you measured' },
    { id: 'readme.broke', label: 'A section titled "what broke and how I fixed it"' },
  ],
  practiceTask: {
    id: 'portfolio.practice',
    summary:
      'Take your three best projects and rewrite their READMEs with a video, a diagram, real measured numbers, and a "what broke and how I fixed it" section. That last section is the highest-value thing in a self-taught portfolio, because it cannot be faked from a tutorial.',
  },
  interview: {
    topics: [
      'Inverse kinematics questions',
      'PID and feedback loops',
      'Sensor fusion and Kalman filters',
      'SLAM concepts',
      'Path planning, including RRT',
      'C++ vs Python trade-offs',
    ],
    goodCompanyExpect: [
      'A simulation-based debugging exercise: a MuJoCo or Isaac scene with a deliberately broken controller',
      'A ROS 2 architecture problem scoped to the real job',
      'A long conversation about a specific past failure and how you diagnosed it',
    ],
    practiceTask: {
      id: 'portfolio.interview.practice',
      summary:
        'Have someone interrogate you about your own repo for twenty minutes — not the concepts, your specific code. Why that gain, why that sensor, what happens if the battery sags, what did you try before this worked. If you cannot answer three levels deep, the project is not ready to be on your CV.',
    },
    glassdoorNote:
      'Glassdoor has 1,721 robotics engineer interview questions on file from 877 companies if you want to read real examples.',
  },
}

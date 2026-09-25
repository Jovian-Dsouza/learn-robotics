import type { Month } from '../types'

export const month6: Month = {
  id: 'm6',
  number: 6,
  slug: 'robot-learning-and-hireable',
  title: 'Robot learning, specialisation, and becoming hireable',
  goal: 'Pick one direction, build a portfolio piece in it, and start applying.',
  framing:
    'You now have the whole stack: electronics, embedded, mechanical, ROS 2, control, and perception. This month has two halves. The first is the frontier — teaching robots from demonstrations rather than programming them. The second is turning everything you have built into something that gets you hired.',
  subsections: [
    {
      id: 'm6.lerobot',
      title: 'LeRobot',
      intro:
        "LeRobot is Hugging Face's PyTorch library for real-world robotics — the open hub the whole low-cost robot-learning world has converged on. The workflow: teleoperate, record, train, deploy. You drive the robot by hand, demonstrations are saved as synchronised video and action data, a policy learns to imitate them, then it runs on its own.",
      resources: [
        { id: 'm6.lerobot.docs', name: 'LeRobot documentation', price: 'free', url: 'https://huggingface.co/docs/lerobot/index', note: 'The main docs, covering the full pipeline and every supported robot.' },
        { id: 'm6.lerobot.repo', name: 'LeRobot repository', price: 'free, Apache 2.0', url: 'https://github.com/huggingface/lerobot', note: 'Over 26,000 stars — read how the policies are actually implemented.' },
        { id: 'm6.lerobot.course', name: 'Hugging Face Robotics Course', price: 'free, no hardware required', url: 'https://huggingface.co/learn/robotics-course/unit0/1', note: 'Runs entirely on simulated environments and public datasets — do the whole thing before buying anything. Roughly 30–45 minutes per unit.' },
        { id: 'm6.lerobot.so101setup', name: 'SO-101 setup guide', price: 'free', url: 'https://huggingface.co/docs/lerobot/so101', note: 'The exact port-finding, motor-setup, calibration, and recording commands for the arm you built in month 3.' },
      ],
      focusPoints: [
        { id: 'm6.lerobot.focus.1', label: 'The record-train-deploy loop end to end, on your own arm' },
        { id: 'm6.lerobot.focus.2', label: 'Dataset quality — a policy trained on sloppy demonstrations is a sloppy policy' },
        { id: 'm6.lerobot.focus.3', label: 'ACT, the docs\' recommended starting policy, and why predicting action chunks beats single steps' },
        { id: 'm6.lerobot.focus.4', label: 'Diffusion Policy — a denoising process that reported a 46.9% average improvement over prior methods across twelve tasks' },
      ],
      practiceTask: {
        id: 'm6.lerobot.practice',
        summary:
          'Record 50 demonstrations of a single simple task on your SO-101 (picking up a cube, dropping it in a bin), train an ACT policy, and deploy it — it will work maybe half the time. Record 50 more demonstrations covering the failure cases and retrain. Document the success rate before and after — that measured number is the portfolio piece.',
      },
    },
    {
      id: 'm6.vla',
      title: 'Vision-language-action models',
      intro: 'These are the foundation models of robotics — knowing which ones you can actually run matters.',
      resources: [
        { id: 'm6.vla.pi0', name: 'π₀, π₀-FAST, π₀.₅ — Physical Intelligence', price: 'free, Apache 2.0, weights open', url: 'https://github.com/Physical-Intelligence/openpi', note: 'Pretrained on 10,000+ hours of robot data. The repo warns honestly that these were developed for their own robots and transfer is not guaranteed.' },
        { id: 'm6.vla.openvla', name: 'OpenVLA, 7B parameters', price: 'free, fully open', url: 'https://openvla.github.io/', note: 'Trained on 970,000 robot episodes from Open X-Embodiment — the best-documented open VLA to read the code of.' },
        { id: 'm6.vla.gr00t', name: 'GR00T N1.7 — NVIDIA', price: 'code Apache 2.0, weights under NVIDIA Open Model License', url: 'https://github.com/Nvidia/Isaac-GR00T', note: 'A licensing distinction often reported wrongly. Needs 16GB+ VRAM for inference.' },
        { id: 'm6.vla.smolvla', name: 'SmolVLA — Hugging Face', price: 'free', url: 'https://huggingface.co/lerobot/smolvla_base', note: 'Compact and designed for affordable hardware — the right one to fine-tune on an SO-101 rather than reaching for a 7B model.' },
      ],
      notes: [
        'RT-2 from Google DeepMind is historically important and has no public weights — study the paper and use one of the above for practice.',
      ],
    },
    {
      id: 'm6.rl',
      title: 'Reinforcement learning for robotics',
      resources: [
        { id: 'm6.rl.playground', name: 'MuJoCo Playground', price: 'free, Apache 2.0', url: 'https://github.com/google-deepmind/mujoco_playground', note: 'GPU-accelerated environments for locomotion, manipulation, and vision tasks with four Colab tutorials — far easier to get running than the alternatives. Start here.' },
        { id: 'm6.rl.isaaclab', name: 'NVIDIA Isaac Lab', price: 'free, BSD-3', url: 'https://github.com/isaac-sim/IsaacLab', note: 'Sixteen robot models and 30+ pre-built training environments, integrating RSL RL, skrl, RL Games, and Stable Baselines. The industry standard for legged and humanoid sim-to-real — needs the RTX hardware from month 4.' },
        { id: 'm6.rl.cs285', name: 'CS 285, Deep Reinforcement Learning — Sergey Levine, UC Berkeley', price: 'free', url: 'https://rail.eecs.berkeley.edu/deeprlcourse', note: 'The best RL course available — Levine is a robotics researcher so the framing is robotics-native, covering imitation learning, policy gradients, actor-critic, model-based, and offline RL.' },
      ],
      practiceTask: {
        id: 'm6.rl.practice',
        summary:
          'Train a quadruped locomotion policy in MuJoCo Playground from one of the Colab tutorials, then change the reward function and observe how the gait changes. No hardware needed, and no GPU beyond what Colab gives you free.',
      },
    },
  ],
  milestones: [
    { id: 'm6.milestone.1', label: 'Record a demonstration dataset and train a policy that runs on your own hardware' },
    { id: 'm6.milestone.2', label: 'Explain the difference between behaviour cloning, ACT, and diffusion policy' },
    { id: 'm6.milestone.3', label: 'Name which VLA models have open weights and which do not' },
    { id: 'm6.milestone.4', label: 'State which of the three directions you are pursuing, and why' },
    { id: 'm6.milestone.5', label: 'Show three portfolio projects with video, metrics, and a documented failure analysis' },
    { id: 'm6.milestone.6', label: 'Answer three levels of follow-up questions about any line of your own code' },
  ],
}

import type { Month } from '../types'

export const month4: Month = {
  id: 'm4',
  number: 4,
  slug: 'ros2-and-simulation',
  title: 'ROS 2, simulation, and building robots the way companies do',
  goal: 'Build a robot in ROS 2, simulate it, and make it map a room and navigate autonomously.',
  framing:
    'Everything up to now was you building robots your way. ROS 2 is how the industry builds them, and it is the single most requested skill in robotics job listings. You can do all of this on a normal laptop with no NVIDIA GPU — the belief that robotics requires expensive equipment is the main reason people never start.',
  subsections: [
    {
      id: 'm4.distro',
      title: 'Which ROS 2 to install, and the ROS 1 trap',
      intro:
        'ROS 2 releases every May. Even years are LTS with five years of support; odd years get about eighteen months. As of September 2026: Lyrical Luth (May 2026, EOL May 2031, Ubuntu 26.04) is the current LTS. Jazzy Jalisco (May 2024, EOL May 2029, Ubuntu 24.04). Kilted Kaiju (EOL 31 Dec 2026 — do not start here). Humble Hawksbill (EOL May 2027, legacy).',
      callouts: [
        {
          id: 'm4.distro.callout.start',
          kind: 'tip',
          title: 'Start on Jazzy',
          body: 'Lyrical is newer and what you would pick for a new production project, but almost every course, book, and YouTube series still targets Jazzy, and it has more than two and a half years of support left. Move to Lyrical once your tutorial stack catches up.',
        },
        {
          id: 'm4.distro.callout.ros1',
          kind: 'warning',
          title: 'ROS 1 is dead',
          body: 'Noetic reached end of life on 31 May 2025 with no successor. Enormous amounts of highly-ranked tutorial content is ROS 1 — learn to recognise it instantly: catkin_make, roscore, rosrun, rospy, or XML-only launch files mean close the tab. ROS 2 uses colcon build, has no master, and uses ros2 run with Python launch files.',
        },
      ],
    },
    {
      id: 'm4.core',
      title: 'ROS 2 core concepts',
      resources: [
        { id: 'm4.core.official', name: 'Official ROS 2 Tutorials', price: 'free', url: 'https://docs.ros.org/en/jazzy/Tutorials.html', note: 'The canonical reference — nodes, topics, services, actions, parameters, launch files, tf2, URDF. Reference-grade, so pair it with video.' },
        { id: 'm4.core.construct', name: 'The Construct', price: 'free tier, paid from €39.97/mo', url: 'https://www.theconstruct.ai/', note: 'Everything runs in a browser-based ROS environment with simulated robots — no Ubuntu dual-boot, no install weekend, no GPU. Free tier includes three complete courses.' },
        { id: 'm4.core.renard1', name: 'Edouard Renard — ROS 2 for Beginners, Level 1 (Udemy)', price: '~$10–20 on sale', url: 'https://www.udemy.com/course/ros2-for-beginners/', note: 'Thirteen hours in Python and C++: nodes, packages, topics, services, custom interfaces, parameters, launch files. Never pay list price.' },
        { id: 'm4.core.articulated', name: 'Articulated Robotics — Josh Newans', price: 'free', url: 'https://articulatedrobotics.xyz/tutorials/', note: 'The best free end-to-end narrative: design a robot, write the URDF, simulate it, add ros2_control, put it on a Raspberry Pi with a lidar, then SLAM and navigate. Uniquely good on ros2_control.' },
        { id: 'm4.core.mogi', name: 'MOGI-ROS — full university course', price: 'free, Apache 2.0', url: 'https://github.com/orgs/MOGI-ROS/repositories', note: 'A real semester-length syllabus on ROS 2 Jazzy with Gazebo Harmonic, pub/sub through URDF, sensors, navigation, and MoveIt 2 arms.' },
        { id: 'm4.core.addison', name: 'Automatic Addison', price: 'free', url: 'https://automaticaddison.com/tutorials/', note: 'Recipe-style guides by distro, already carrying Lyrical tracks alongside Jazzy — go here for "how do I write an action in Jazzy" rather than a full course.' },
      ],
      focusPoints: [
        { id: 'm4.core.focus.1', label: 'Nodes, topics, services, and actions — knowing which one a problem needs' },
        { id: 'm4.core.focus.2', label: 'Custom message and service definitions' },
        { id: 'm4.core.focus.3', label: 'Parameters and YAML config files' },
        { id: 'm4.core.focus.4', label: 'Launch files in Python: passing arguments and remapping topics' },
        { id: 'm4.core.focus.5', label: 'colcon workspaces and package layout' },
        { id: 'm4.core.focus.6', label: 'ros2 bag for recording and replaying — how you debug anything that only fails occasionally' },
      ],
      callouts: [
        {
          id: 'm4.core.callout.qos',
          kind: 'gap',
          title: 'Honest gap: DDS and QoS',
          body: 'DDS and QoS settings are covered badly by every resource. When you hit "my topic publishes but nothing receives", the answer is almost always a QoS mismatch, and you will be reading the official Concepts pages rather than a tutorial.',
        },
      ],
      practiceTask: {
        id: 'm4.core.practice',
        summary:
          'Build a multi-node system with no robot and no simulator: a sensor publisher, a processing node, a service-based configuration node, and a parameterised aggregator, with your own custom .msg and .srv, wired together in a Python launch file that takes arguments. Record with ros2 bag and replay it. Free, and it proves you understand the graph rather than that you can run turtlesim.',
      },
    },
    {
      id: 'm4.urdf',
      title: 'URDF, TF, and describing a robot',
      resources: [
        { id: 'm4.urdf.articulated-tf', name: 'Articulated Robotics — Coordinate Transforms for Robotics', price: 'free', url: 'https://articulatedrobotics.xyz/category/coordinate-transforms-for-robotics', note: 'A dedicated series on frames and transforms, the concept that blocks most people from understanding URDF.' },
        { id: 'm4.urdf.renard2', name: 'Edouard Renard — Level 2: TF, URDF, RViz, Gazebo (Udemy)', price: '~$10–20 on sale', url: 'https://www.udemy.com/course/ros2-tf-urdf-rviz-gazebo/', note: 'The single best URDF resource: xacro macros, robot_state_publisher, RViz configuration, Gazebo plugins, ending in a mobile base with an arm on it.' },
        { id: 'm4.urdf.official', name: 'Official URDF tutorial with robot_state_publisher', price: 'free', url: 'https://docs.ros.org/en/jazzy/Tutorials/Intermediate/URDF/Using-URDF-with-Robot-State-Publisher-cpp.html', note: 'The canonical walkthrough, in both C++ and Python.' },
      ],
      notes: [
        'Common issues: confusing joint_state_publisher with robot_state_publisher — the first invents joint positions, the second computes transforms from them. Missing inertial tags make your robot explode or sink through the Gazebo floor — always include mass and inertia. A missing static transform to the lidar frame causes more beginner SLAM failures than any algorithm problem. Writing 400 lines of XML by hand — use xacro macros from day one.',
      ],
      practiceTask: {
        id: 'm4.urdf.practice',
        summary:
          'Design your own robot in xacro, not TurtleBot: a differential-drive base, a sensor mast, and a two-DOF pan-tilt head, with correct inertias and separate collision/visual geometry. Drive the joints with joint_state_publisher_gui and view the full TF tree in RViz. A screenshot of your own robot in RViz is the most legible signal in a beginner portfolio.',
      },
    },
    {
      id: 'm4.simulation',
      title: 'Simulation',
      intro:
        'Gazebo naming history confuses everyone: Gazebo Classic (versions 1–11) reached end of life January 2025. It was rewritten, briefly called Ignition Gazebo, then renamed back to plain Gazebo in April 2022, with every ign command becoming gz. Current releases are named alphabetically: Fortress, Garden, Harmonic, Ionic, Jetty. Install the version paired with your ROS 2 distro: Humble↔Fortress, Jazzy↔Harmonic, Kilted↔Ionic, Lyrical↔Jetty.',
      resources: [
        { id: 'm4.simulation.gazebo', name: 'Gazebo documentation and tutorials', price: 'free', url: 'https://gazebosim.org/docs/latest/getstarted/', note: 'Building your own robot, moving it, SDF worlds, sensors, spawning a URDF.' },
        { id: 'm4.simulation.mujoco', name: 'MuJoCo', price: 'free, open source', url: 'https://mujoco.readthedocs.io/en/stable/overview.html', note: 'The fastest and most accurate contact dynamics available, CPU-first, needs no GPU — the research standard for locomotion and manipulation learning.' },
        { id: 'm4.simulation.isaac', name: 'NVIDIA Isaac Sim', price: 'free download', url: 'https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html', note: 'Photoreal simulation and synthetic data generation. Read the requirements first: minimum RTX 4080 with 16GB VRAM; A100/H100 not supported at all.' },
      ],
      decisionFramework: {
        title: 'Which simulator, when',
        options: [
          { option: 'Gazebo', detail: 'Learn first — the only simulator natively wired into ROS 2, runs on the laptop you already own.' },
          { option: 'MuJoCo', detail: 'Go here for reinforcement learning or locomotion — still needs no GPU.' },
          { option: 'Isaac Sim / Isaac Lab', detail: 'Only when you have the RTX hardware and a specific reason.' },
          { option: 'Skip: PyBullet', detail: 'No release since 2022, maintainers closed the issue tracker.' },
          { option: 'Watch, don\'t build on: Genesis', detail: 'v1.0 is fresh and has no ROS 2 integration yet.' },
        ],
      },
      practiceTask: {
        id: 'm4.simulation.practice',
        summary:
          'Put your xacro robot into Gazebo, add a lidar plugin and a camera plugin, and build a custom SDF world with obstacles for it to sit in. Confirm the sensor data appears on ROS 2 topics and renders in RViz.',
      },
    },
    {
      id: 'm4.ros2control',
      title: 'ros2_control',
      intro: 'The topic most self-taught candidates have never touched — which makes it the fastest way to differentiate yourself.',
      resources: [
        { id: 'm4.ros2control.docs', name: 'ros2_control documentation', price: 'free', url: 'https://control.ros.org/rolling/index.html', note: 'Where URDF meets actuation: hardware interfaces, controller manager, and the <ros2_control> tags in your xacro.' },
        { id: 'm4.ros2control.articulated', name: 'Articulated Robotics — ros2_control on real hardware', price: 'free', url: 'https://articulatedrobotics.xyz/tutorials/mobile-robot/applications/ros2_control-real/', note: 'The only resource that walks the simulation-to-real-hardware transition properly.' },
      ],
      practiceTask: {
        id: 'm4.ros2control.practice',
        summary:
          'Add <ros2_control> tags to your robot, configure diff_drive_controller and joint_state_broadcaster through YAML, and drive it in Gazebo with keyboard teleop. Then write an action server that drives a commanded distance and reports progress, with feedback and cancellation. Actions plus ros2_control in one project is a genuinely strong portfolio piece.',
      },
    },
    {
      id: 'm4.slam',
      title: 'SLAM and navigation',
      resources: [
        { id: 'm4.slam.nav2start', name: 'Nav2 Getting Started', price: 'free', url: 'https://docs.nav2.org/rolling/getting_started/index.html', note: 'Launches Nav2 in simulation in under five minutes, with a pre-configured VS Code dev container.' },
        { id: 'm4.slam.nav2tutorials', name: 'Nav2 Tutorials', price: 'free', url: 'https://docs.nav2.org/rolling/tutorials/', note: 'SLAM, keepout zones, speed limits, collision monitoring, docking, GPS navigation, and writing your own planner, controller, or behaviour-tree node.' },
        { id: 'm4.slam.toolbox', name: 'SLAM Toolbox', price: 'free, open source', url: 'https://github.com/SteveMacenski/slam_toolbox', note: 'The currently supported ROS 2 SLAM library — synchronous, asynchronous, lifelong, and localization-only modes, with multi-robot support.' },
        { id: 'm4.slam.rtabmap', name: 'RTAB-Map for ROS 2', price: 'free, open source', url: 'https://github.com/introlab/rtabmap_ros', note: 'Appearance-based RGB-D and stereo SLAM with loop closure — for a depth camera instead of lidar, or a 3D map.' },
      ],
      focusPoints: [
        { id: 'm4.slam.focus.1', label: 'Mapping vs localizing, and when to switch SLAM Toolbox into localization mode' },
        { id: 'm4.slam.focus.2', label: 'Odometry quality — a smeared map is almost always an odometry problem, not an algorithm problem' },
        { id: 'm4.slam.focus.3', label: 'Costmap tuning: inflation radius, obstacle layers, local vs global split' },
        { id: 'm4.slam.focus.4', label: 'Behaviour trees — how Nav2 orchestrates everything, and what beginners fail to grasp' },
      ],
      priceTiers: [
        { id: 'm4.slam.tier0', label: 'Tier 0', cost: '$0', contents: 'Gazebo with a simulated lidar — do the entire SLAM/Nav2 curriculum here first.' },
        { id: 'm4.slam.tierdiy', label: 'DIY', cost: '$250–450', contents: 'RPLIDAR C1 ($69), a Raspberry Pi 4 or 5, a differential-drive base with encoders, a motor driver, and a battery. Most learning per dollar, most yak-shaving.' },
        { id: 'm4.slam.tierready', label: 'Ready platform', cost: '$300–535', contents: 'Hiwonder MentorPi M1 (from $299.99, ROS 2 Humble on a Pi 5 with lidar and depth camera) or Waveshare UGV Rover ROS 2 kit ($534.99, Pi host + ESP32 real-time controller — how real robots are actually architected).' },
      ],
      practiceTask: {
        id: 'm4.slam.practice',
        summary:
          'Run SLAM Toolbox in your Gazebo world, teleop around it, save the map, then switch to localization mode and send Nav2 goals from RViz. Tune the costmaps until it stops clipping corners, then screen-record it. A video of a robot autonomously navigating a map it built itself is the most compelling artifact a self-taught roboticist can produce.',
      },
    },
  ],
  milestones: [
    { id: 'm4.milestone.1', label: 'Write ROS 2 nodes in Python and C++ using topics, services, and actions' },
    { id: 'm4.milestone.2', label: 'Describe your own robot in xacro with correct frames, inertias, and collision geometry' },
    { id: 'm4.milestone.3', label: 'Simulate that robot in Gazebo with working lidar and camera sensors' },
    { id: 'm4.milestone.4', label: 'Configure ros2_control and drive the robot through a controller, not raw commands' },
    { id: 'm4.milestone.5', label: 'Build a map with SLAM Toolbox and navigate autonomously with Nav2' },
    { id: 'm4.milestone.6', label: 'Diagnose a broken TF tree — the most common failure in the entire stack' },
  ],
}

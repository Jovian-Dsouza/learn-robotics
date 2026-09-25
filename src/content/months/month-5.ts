import type { Month } from '../types'

export const month5: Month = {
  id: 'm5',
  number: 5,
  slug: 'the-maths-underneath',
  title: 'The maths that makes robots actually work',
  goal: 'Understand and implement the control and perception underneath everything you have built.',
  framing:
    'Up to now you have used libraries that did the hard parts for you. This month is where you learn what they were doing — the difference between someone who can configure Nav2 and someone who can fix Nav2 when it misbehaves is exactly this material. You do not need all of it at research depth: working fluency in control, enough kinematics to reason about an arm, and enough vision to get 3D information out of a camera.',
  subsections: [
    {
      id: 'm5.pid',
      title: 'Control theory, starting with PID',
      intro: 'You already tuned a PID controller by feel in month two. Now learn why it worked.',
      resources: [
        { id: 'm5.pid.mathworks', name: 'Understanding PID Control — MATLAB Tech Talks, Brian Douglas', price: 'free', url: 'https://www.mathworks.com/videos/series/understanding-pid-control.html', note: 'Seven parts: what PID is, integrator windup, derivative filtering, tuning, manual vs automatic tuning. The fastest route to a controller that works this week.' },
        { id: 'm5.pid.briandouglas', name: 'Brian Douglas — Control System Lectures', price: 'free', url: 'https://www.youtube.com/@BrianBDouglas/playlists', note: 'Intuition-first explanations across PID, state space, robust control, and drone control — best fit with no formal controls course behind you.' },
        { id: 'm5.pid.book', name: 'The Fundamentals of Control Theory — Brian Douglas', price: 'free, Creative Commons', url: 'https://engineeringmedia.com/books', note: 'The written companion to the videos — a coherent narrative rather than scattered lessons.' },
        { id: 'm5.pid.bootcamp', name: 'Control Bootcamp — Steve Brunton', price: 'free', url: 'https://www.youtube.com/playlist?list=PLMrJAkhIeNNR20Mz-VpzgfQs5zrYi085m', note: '39 videos — the right entry point to state space, controllability, observability, LQR, and the Kalman filter.' },
        { id: 'm5.pid.feedback', name: 'Feedback Systems — Åström and Murray', price: 'free PDF', url: 'https://fbswiki.org/wiki/index.php/Feedback_Systems:_An_Introduction_for_Scientists_and_Engineers', note: 'The rigorous textbook, released free by Princeton University Press.' },
      ],
      focusPoints: [
        { id: 'm5.pid.focus.1', label: 'What each of P, I, and D physically does, and the failure mode of each' },
        { id: 'm5.pid.focus.2', label: 'Integrator windup, and why your arm slams when it comes off a limit' },
        { id: 'm5.pid.focus.3', label: 'Why the derivative term amplifies sensor noise and needs filtering' },
        { id: 'm5.pid.focus.4', label: 'Steady-state error: integrator fix vs gravity-compensation fix' },
        { id: 'm5.pid.focus.5', label: 'Feedforward — the cheapest performance improvement most people never add' },
      ],
      practiceTask: {
        id: 'm5.pid.practice',
        summary:
          'Take the balancing robot from month two and implement three controllers on the same hardware: P only, PD, then PID with feedforward. Log the step response of each to a CSV, plot all three, and write up which one you would ship and why. That plot is worth more in an interview than any certificate.',
      },
    },
    {
      id: 'm5.statespace',
      title: 'State space, LQR, and MPC',
      resources: [
        { id: 'm5.statespace.mpc', name: 'Understanding Model Predictive Control — MATLAB Tech Talks', price: 'free', url: 'https://www.mathworks.com/videos/series/understanding-model-predictive-control.html', note: 'Seven parts: why to use MPC through adaptive and nonlinear variants, and how to make it run fast enough to be real.' },
        { id: 'm5.statespace.underactuated', name: 'Underactuated Robotics — Russ Tedrake, MIT', price: 'free', url: 'https://underactuated.csail.mit.edu/index.html', note: 'Where control theory becomes robotics: pendulums, cart-poles, walking, running, humanoids, with dynamic programming, LQR, Lyapunov analysis, and trajectory optimisation. Free notes, PDF, and lecture videos.' },
      ],
      focusPoints: [
        { id: 'm5.statespace.focus.1', label: 'Representing a system as state, input, and output rather than a transfer function' },
        { id: 'm5.statespace.focus.2', label: 'Why LQR is just a principled way of choosing gains' },
        { id: 'm5.statespace.focus.3', label: 'What MPC buys you (constraints) and what it costs (compute)' },
        { id: 'm5.statespace.focus.4', label: 'Underactuation, and why fewer actuators than degrees of freedom needs different thinking' },
      ],
      practiceTask: {
        id: 'm5.statespace.practice',
        summary:
          "Implement LQR for a simulated cart-pole in Python, then implement the same thing with a hand-tuned PID and compare how each handles a disturbance. Tedrake's notes give you the model, so you are implementing rather than deriving.",
      },
    },
    {
      id: 'm5.kinematics',
      title: 'Kinematics and dynamics',
      resources: [
        { id: 'm5.kinematics.modernrobotics', name: 'Modern Robotics — Kevin Lynch, Northwestern', price: 'free book, code, and videos', url: 'http://hades.mech.northwestern.edu/index.php/Modern_Robotics', note: 'The free preprint of the standard textbook, plus companion libraries in Python, MATLAB, and Mathematica, and full video lectures. Uses screw theory and product-of-exponentials rather than DH parameters — cleaner, and now the industry norm.' },
        { id: 'm5.kinematics.coursera', name: 'Modern Robotics Specialization (Coursera)', price: 'free audit available', url: 'https://www.coursera.org/specializations/modernrobotics', note: 'The same material as a structured six-course sequence with assessment, if you need deadlines to finish things.' },
        { id: 'm5.kinematics.corke', name: 'Robotics Toolbox for Python — Peter Corke', price: 'free, MIT', url: 'https://github.com/petercorke/robotics-toolbox-python', note: 'Forward kinematics, Jacobians, numerical IK, trajectory generation, and 50+ real robot models including Franka and UR.' },
        { id: 'm5.kinematics.robotacademy', name: 'QUT Robot Academy — Peter Corke', price: 'free', url: 'https://robotacademy.net.au', note: 'Over 200 video lessons under ten minutes each, labelled by prerequisite level — the best source of short atomic explanations of DH parameters, Jacobians, and pose representation.' },
      ],
      focusPoints: [
        { id: 'm5.kinematics.focus.1', label: 'Homogeneous transforms and composing them — the language of everything' },
        { id: 'm5.kinematics.focus.2', label: 'Forward kinematics (easy) and inverse kinematics (not)' },
        { id: 'm5.kinematics.focus.3', label: 'The Jacobian, and what a singularity physically means' },
        { id: 'm5.kinematics.focus.4', label: 'Workspace limits, and joint limits vs reachability' },
        { id: 'm5.kinematics.focus.5', label: 'Trajectory generation: joint space vs Cartesian space interpolation' },
      ],
      practiceTask: {
        id: 'm5.kinematics.practice',
        summary:
          'Compute the forward kinematics of your SO-101 arm by hand from its link lengths, then verify against the Robotics Toolbox. Write a numerical IK solver that moves the end effector to a commanded XYZ, and watch what it does near a singularity — feeling the arm lose a degree of freedom is what makes the concept stick.',
      },
    },
    {
      id: 'm5.vision',
      title: 'Perception and computer vision',
      resources: [
        { id: 'm5.vision.opencv', name: 'FREE OpenCV Bootcamp (OpenCV.org official)', price: 'free', url: 'https://courses.opencv.org/courses/course-v1:OpenCV+Bootcamp+CV0/about', note: 'The official two-to-three hour course, covering image manipulation, filtering, edge detection, tracking, and the DNN module.' },
        { id: 'm5.vision.calibration', name: 'OpenCV Camera Calibration tutorial', price: 'free', url: 'https://docs.opencv.org/4.x/dc/dbb/tutorial_py_calibration.html', note: 'The canonical walkthrough with full Python code, chessboard corners through undistortion and re-projection error. Every robotics engineer must be able to do this from memory.' },
        { id: 'm5.vision.stachniss', name: 'Cyrill Stachniss lectures, University of Bonn', price: 'free', url: 'https://www.ipb.uni-bonn.de/online-training-robotics/', note: 'Full university lecture recordings on mobile sensing, photogrammetry, and SLAM — the best free source on the geometric side: projective geometry, bundle adjustment, EKF, and graph SLAM.' },
        { id: 'm5.vision.open3d', name: 'Open3D point cloud tutorials', price: 'free', url: 'https://www.open3d.org/docs/release/tutorial/geometry/pointcloud.html', note: 'Voxel downsampling, normal estimation, ICP registration, plane segmentation, and clustering, with far less friction than PCL in Python.' },
      ],
      focusPoints: [
        { id: 'm5.vision.focus.1', label: 'Camera intrinsics and distortion, and a real calibration with a printed chessboard' },
        { id: 'm5.vision.focus.2', label: 'Pinhole projection, and image coordinates vs world coordinates' },
        { id: 'm5.vision.focus.3', label: 'Depth from stereo vs structured light vs time-of-flight' },
        { id: 'm5.vision.focus.4', label: 'Point cloud basics: downsampling, plane fitting for a table, clustering for objects on it' },
        { id: 'm5.vision.focus.5', label: 'Why lighting changes break vision pipelines that worked yesterday' },
      ],
      practiceTask: {
        id: 'm5.vision.practice',
        summary:
          'Calibrate an actual camera with a printed chessboard, save the intrinsics, then write a script that detects a coloured object and estimates its position in 3D relative to the camera. Move the lighting and watch it fail, then fix it — that failure-and-fix write-up is portfolio material.',
      },
    },
    {
      id: 'm5.manipulation',
      title: 'Manipulation and MoveIt 2',
      resources: [
        { id: 'm5.manipulation.moveit', name: 'MoveIt 2 Getting Started', price: 'free, open source', url: 'https://moveit.picknik.ai/main/doc/tutorials/getting_started/getting_started.html', note: 'The official entry point — the docs recommend Jazzy on Ubuntu 24.04 for the smoothest experience.' },
        { id: 'm5.manipulation.mtc', name: 'Pick and Place with MoveIt Task Constructor', price: 'free', url: 'https://moveit.picknik.ai/main/doc/tutorials/pick_and_place_with_moveit_task_constructor/pick_and_place_with_moveit_task_constructor.html', note: 'The most useful manipulation tutorial in ROS 2 — decomposing a task into stages, grasp generation, IK, and collision management.' },
        { id: 'm5.manipulation.tedrake', name: 'Robotic Manipulation — Russ Tedrake, MIT', price: 'free', url: 'https://manipulation.csail.mit.edu/', note: 'Twelve chapters connecting hardware, kinematics, perception, grasping, planning, and control — now teaches model-based and learned approaches together, exactly how the industry works.' },
        { id: 'm5.manipulation.graspnet', name: 'Contact-GraspNet, NVIDIA', price: 'free code', url: 'https://github.com/NVlabs/contact_graspnet', note: 'Six-DOF grasp generation in cluttered scenes from a depth map — the standard baseline for learned grasping.' },
      ],
      practiceTask: {
        id: 'm5.manipulation.practice',
        summary:
          'Get MoveIt 2 planning motions for a simulated arm, add collision objects to the planning scene, and execute a pick and place. Then make it fail by placing an obstacle in the only viable path and observe how the planner behaves — understanding planner failure is more valuable than watching it succeed.',
      },
    },
  ],
  milestones: [
    { id: 'm5.milestone.1', label: 'Implement and tune a PID controller and explain every term from measured data' },
    { id: 'm5.milestone.2', label: 'Describe a system in state space and implement LQR on a simulated plant' },
    { id: 'm5.milestone.3', label: 'Compute forward kinematics by hand and solve IK numerically' },
    { id: 'm5.milestone.4', label: 'Explain what a singularity is by pointing at a robot doing it' },
    { id: 'm5.milestone.5', label: 'Calibrate a camera and turn a pixel into a 3D position' },
    { id: 'm5.milestone.6', label: 'Plan and execute a collision-free pick and place in MoveIt 2' },
  ],
}

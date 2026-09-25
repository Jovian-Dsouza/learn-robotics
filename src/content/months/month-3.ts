import type { Month } from '../types'

export const month3: Month = {
  id: 'm3',
  number: 3,
  slug: 'cad-and-manufacturing',
  title: 'Mechanical design, CAD and manufacturing your own parts',
  goal: 'Design a part in CAD, manufacture it, and have it fit.',
  framing:
    'This month separates people who assemble kits from people who build robots. Every robot you build afterward will contain parts that exist only because you designed them — going from an idea to a physical bracket in an afternoon changes what projects are possible for you.',
  subsections: [
    {
      id: 'm3.cad',
      title: 'CAD',
      intro: 'Pick one tool and go deep rather than sampling all of them.',
      decisionFramework: {
        title: 'Which CAD tool',
        options: [
          { option: 'Onshape Free', detail: "Browser-based, runs on any machine including a Chromebook, and its assembly/mate system behaves the way robot joints actually do. Catch: every document is public on the free tier." },
          { option: 'Fusion Personal', detail: 'Best if you want CAM and 3D-print integration later. Free on a renewable 3-year term for non-commercial use under $1,000/year revenue, but limited import/export file types.' },
          { option: 'FreeCAD', detail: 'Best if cloud CAD or card payment is a problem, or you object to a revocable licence. Version 1.1 landed March 2026 and it is genuinely usable now.' },
          { option: 'SOLIDWORKS for Makers', detail: '$48/year for the industry-standard tool, with the caveat that native files are watermarked and will not open in commercial SOLIDWORKS.' },
        ],
      },
      resources: [
        { id: 'm3.cad.onshape', name: 'Onshape Learning Center — Fundamentals: CAD', price: 'free with account', url: 'https://learn.onshape.com/learning-paths/onshape-fundamentals-cad', note: 'The only free structured CAD curriculum ending in a credential, with a dedicated robotics-competition track.' },
        { id: 'm3.cad.fusion', name: 'Product Design Online — Learn Autodesk Fusion in 30 Days', price: 'free', url: 'https://productdesignonline.com/learn-autodesk-fusion-360-in-30-days-official-course/', note: 'Thirty modelled objects in thirty days — the fastest route from never-opened-CAD to confident parametric sketching.' },
        { id: 'm3.cad.freecad', name: 'MangoJelly Solutions FreeCAD tutorials', price: 'free', url: 'https://www.youtube.com/@MangoJellySolutions', note: 'The best FreeCAD teacher for makers, organised as short targeted lessons.' },
        { id: 'm3.cad.dfm', name: 'Protolabs Network — Design for 3D printing', price: 'free', url: 'https://www.hubs.com/knowledge-base/design-for-3d-printing/', note: 'The design-for-manufacture half of CAD: wall thickness, orientation, tolerances, supports, snap-fits, and STL vs 3MF vs STEP.' },
      ],
      focusPoints: [
        { id: 'm3.cad.focus.1', label: "Fully constrained sketches — an under-constrained sketch moves when you edit it later" },
        { id: 'm3.cad.focus.2', label: 'Parametric design driven by variables, so one dimension change updates the whole part' },
        { id: 'm3.cad.focus.3', label: 'Assemblies and mates mirroring real joints: revolute, slider, fixed' },
        { id: 'm3.cad.focus.4', label: "Designing around hardware you actually own, from the datasheet dimensions" },
        { id: 'm3.cad.focus.5', label: 'Exporting STEP for sharing and STL for printing, and knowing the difference' },
      ],
      practiceTask: {
        id: 'm3.cad.practice',
        summary:
          "Model a bracket that holds the exact servo you bought, with correctly sized screw holes and shaft clearance, from the manufacturer's datasheet drawing rather than by eye. Print it and see if it fits — it probably won't the first time, and that failure is the lesson.",
      },
    },
    {
      id: 'm3.printing',
      title: '3D printing',
      resources: [
        { id: 'm3.printing.ender3', name: 'Creality Ender-3 V3 SE', price: '$199', url: 'https://store.creality.com/products/ender-3-v3-se-3d-printer', note: 'Budget FDM printer.' },
        { id: 'm3.printing.a1mini', name: 'Bambu Lab A1 mini', price: '$219.99', url: 'https://www.bestbuy.com/product/bambu-lab-a1-mini-3d-printer-silver/CZTZV9ZGGV', note: 'Compact, easy to run.' },
        { id: 'm3.printing.a1', name: 'Bambu Lab A1', price: '$299.99', url: 'https://www.bestbuy.com/product/bambu-lab-a1-3d-printer-silver/CZW2ZH33H4', note: '256mm bed for larger brackets.' },
        { id: 'm3.printing.k1c', name: 'Creality K1C', price: '$369', url: 'https://store.creality.com/products/k1c-3d-printer', note: 'Enclosed and hardened for carbon-fibre filaments.' },
        { id: 'm3.printing.p1s', name: 'Bambu Lab P1S', price: '$799', url: 'https://us.store.bambulab.com/products/p1s', note: 'Enclosed CoreXY for ABS and ASA.' },
        { id: 'm3.printing.orcaslicer', name: 'OrcaSlicer Calibration wiki', price: 'free', url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/Calibration', note: 'Temperature, flow, pressure advance, retraction, and tolerance calibration in a recommended order — the most useful slicing document for parts that fit.' },
        { id: 'm3.printing.teachingtech', name: 'Teaching Tech 3D Printer Calibration', price: 'free, interactive', url: 'https://teachingtechyt.github.io/calibration.html', note: 'Printer-agnostic interactive walkthrough of every calibration in sequence.' },
        { id: 'm3.printing.cnckitchen', name: 'CNC Kitchen', price: 'free', url: 'https://www.youtube.com/@CNCKitchen', note: 'Instrumented, repeatable strength tests on infill, walls, threaded inserts, and orientation — where print orientation stops being folklore and starts being data.' },
        { id: 'm3.printing.gauge', name: 'Clearance and Tolerance 3D Printer Gauge', price: 'free STL', url: 'https://www.printables.com/model/57067-clearance-and-tolerance-3d-printer-gauge', note: "Print this once and you know your machine's real clearance for press fits and sliding fits." },
      ],
      notes: [
        'Filament by use case: PLA/PLA+ for prototype brackets, jigs, and the SO-101 arm itself (PLA+, 15% infill, 0.2mm layers) — stiffest of the easy materials, but creeps under sustained load and softens around 55–60°C. PETG is the default for real robot parts: chassis plates, gearbox housings, servo mounts, anything that must survive a drop — tough, far better layer adhesion, but stringy. ABS/ASA for parts near hot motors and outdoor rovers, but they warp badly without an enclosure. Nylon for gears and cable guides — easier to order than to print. Carbon-fibre filled for stiff structural links, needs a hardened nozzle. TPU for feet, bumpers, and compliant gripper fingers.',
        'If you cannot buy a printer: Fab Labs worldwide (~2,875, searchable at fablabs.io/labs), public library makerspaces (free or near-free in much of the US), Craftcloud (compares quotes across 95 countries, craftcloud3d.com), or JLC3DP (from $1.00/part for MJF nylon and FDM, 3-day builds, jlc3dp.com).',
        "The honest economics: an SO-101 arm needs roughly 1kg of PLA+, about $20–25 of filament on your own machine against $30.99 for a ready-printed set. A printer doesn't pay for itself on one build — it pays for itself on iteration, since the tenth revision of a gripper finger costs 40 cents and 25 minutes at home against $8 and a week from a service.",
      ],
      practiceTask: {
        id: 'm3.printing.practice',
        summary:
          "Print the tolerance gauge, write down your machine's actual clearance numbers, then design and print a two-part snap-fit enclosure for your ESP32 that closes without glue. Iterate until it clicks properly — this is the loop that all mechanical design is made of.",
      },
    },
    {
      id: 'm3.actuators',
      title: 'Actuators, transmissions, and why robots are hard',
      intro:
        'Understanding gear reduction, backlash, and torque density is what separates a robot that works in a video from a robot that works repeatedly.',
      focusPoints: [
        { id: 'm3.actuators.focus.1', label: 'Gear ratios and the trade between speed and torque' },
        { id: 'm3.actuators.focus.2', label: "Backlash, and why it destroys position accuracy in a way software can't fully fix" },
        { id: 'm3.actuators.focus.3', label: 'Bearing selection and preload' },
        { id: 'm3.actuators.focus.4', label: 'Belt vs gear vs direct drive' },
        { id: 'm3.actuators.focus.5', label: "Why a cheap servo's plastic gearset is the first thing to fail on any arm" },
      ],
      practiceTask: {
        id: 'm3.actuators.practice',
        summary:
          "Design and print a simple planetary or cycloidal reducer for a NEMA17 stepper or hobby motor, and accept the first one will be bad. Measure the backlash by holding the output and rocking it, then redesign to reduce it. Reference builds: OpenCycloid on Instructables (https://www.instructables.com/OpenCycloid-3D-printed-Open-Source-Robotic-Actuato/) and Hackaday.",
      },
    },
    {
      id: 'm3.arm',
      title: 'Build a real robot arm',
      intro:
        'The capstone of the month, and the single best hardware purchase in this entire roadmap. The SO-101 is an open-source 5-DOF arm plus gripper from TheRobotStudio and Hugging Face, built as a leader/follower pair so you can hand-guide one and have the other mirror it — that teleoperation setup is what lets you record demonstrations, which month six is built on.',
      resources: [
        { id: 'm3.arm.so101-repo', name: 'SO-ARM100 official BOM and repo', price: '$229.88 pair / $121.94 single (excl. printing)', url: 'https://github.com/TheRobotStudio/SO-ARM100', note: 'Official bill of materials, verified in the repo.' },
        { id: 'm3.arm.seeed-pro', name: 'Seeed Studio SO-ARM101 Pro servo kit', price: '$277.99', url: 'https://www.seeedstudio.com/SO-ARM101-Low-Cost-AI-Arm-Kit-Pro-p-6427.html', note: 'Motors and control boards without printed parts.' },
        { id: 'm3.arm.seeed-printed', name: 'Seeed Studio printed parts set', price: '$30.99', url: 'https://www.seeedstudio.com/SO-ARM101-3D-printed-Enclosure-p-6428.html', note: 'If you have no printer.' },
        { id: 'm3.arm.robonine', name: 'Robonine SO-ARM101 complete kit', price: '$349.00', url: 'https://robonine.com/shop/so-arm101-black-robotic-arm-kit/', note: 'Ships from Delaware.' },
        { id: 'm3.arm.wowrobo', name: 'WowRobo via OpenELAB', price: '$325.99–$489.99', url: 'https://openelab.com/products/wowrobo-robotics-so-arm101-diykit', note: 'Printed parts + servos through fully assembled.' },
        { id: 'm3.arm.eezybotarm', name: 'EEZYbotARM MK2 (free STLs)', price: '$50–80 in servos', url: 'https://www.thingiverse.com/thing:1454048', note: 'Built from MG996R hobby servos and printed parts — teaches linkage kinematics rather than servo-bus protocols.' },
        { id: 'm3.arm.xarm1s', name: 'Hiwonder xArm 1S', price: '$199.99', url: 'https://www.hiwonder.com/products/xarm-1s', note: 'The cheapest arm with intelligent bus servos that report position and voltage.' },
      ],
      notes: [
        'Cheaper alternatives at every tier: $0 — the whole LeRobot stack runs in MuJoCo simulation before hardware exists. $122 — a single SO-101 follower arm if you print the parts yourself (you lose teleoperation, keep the software path).',
      ],
      practiceTask: {
        id: 'm3.arm.practice',
        summary:
          'Build the SO-101, calibrate every servo, and teleoperate the follower with the leader. Then design and print your own gripper fingers to replace the stock ones, in TPU, and test them on three objects of different shapes. The arm is the platform for months five and six, and the custom fingers prove you can design as well as assemble.',
      },
    },
  ],
  milestones: [
    { id: 'm3.milestone.1', label: 'Model a part from a datasheet in CAD with fully constrained sketches' },
    { id: 'm3.milestone.2', label: "State your printer's real clearance numbers from measurement, not guesswork" },
    { id: 'm3.milestone.3', label: 'Design a part specifically for FDM: orientation, overhangs, layer adhesion' },
    { id: 'm3.milestone.4', label: 'Choose PLA, PETG, ABS, or TPU for a given part and justify it' },
    { id: 'm3.milestone.5', label: 'Explain backlash and demonstrate it on something you built' },
    { id: 'm3.milestone.6', label: 'Show a working robot arm you assembled, calibrated, and modified with your own parts' },
  ],
}

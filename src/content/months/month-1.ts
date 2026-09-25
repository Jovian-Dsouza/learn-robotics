import type { Month } from '../types'

export const month1: Month = {
  id: 'm1',
  number: 1,
  slug: 'electronics-and-tools',
  title: 'Electronics, the bench, and the tools you build everything with',
  goal: 'Be able to read a schematic, build a circuit that works, and find the fault when it does not.',
  framing:
    "Most roadmaps skip this and start at Arduino — which is why so many people can copy a wiring diagram but can't fix anything when it breaks. Robotics is the one software field where the bug is sometimes a loose wire, a sagging battery, or a motor drawing more current than your regulator can supply. You will never diagnose those without the electrical layer underneath.",
  subsections: [
    {
      id: 'm1.electronics',
      title: 'Electronics fundamentals',
      intro:
        "Ohm's law, voltage dividers, what a capacitor does, how a transistor switches, and how to read a schematic. You do not need to design an op-amp from first principles. Start in a simulator before spending a dollar — you can wire things wrong at zero cost and actually see why. The most common beginner mistake is watching hours of video without ever building the circuit, so build every example as you go, even in the simulator.",
      resources: [
        {
          id: 'm1.electronics.falstad',
          name: 'Falstad Circuit Simulator',
          price: 'free',
          url: 'https://www.falstad.com/circuit/',
          note: 'Animated electron flow and live voltage colouring — you watch current move instead of imagining it, the fastest way to build intuition.',
        },
        {
          id: 'm1.electronics.tinkercad',
          name: 'Tinkercad Circuits',
          price: 'free with account',
          url: 'https://www.tinkercad.com/circuits',
          note: 'The only simulator with a virtual breadboard, virtual Arduino, and virtual multimeter together — catches wiring mistakes before you own any parts.',
        },
        {
          id: 'm1.electronics.allaboutcircuits',
          name: 'All About Circuits — Lessons in Electric Circuits',
          price: 'free',
          url: 'https://www.allaboutcircuits.com/textbook/',
          note: 'A complete open-licensed EE textbook in six volumes — your reference when a video hand-waves something you need to actually understand.',
        },
        {
          id: 'm1.electronics.afrotechmods',
          name: 'Afrotechmods Tutorials',
          price: 'free',
          url: 'https://afrotechmods.com/tutorials/',
          note: 'Short, fast, funny videos sorted by level — the right choice if you bounce off lecture-format teaching.',
        },
        {
          id: 'm1.electronics.makeelectronics',
          name: 'Make: Electronics, 3rd edition — Charles Platt',
          price: '$29.99',
          url: 'https://www.makershed.com/products/make-electronics-3rd-edition-print',
          note: "The best single paper book for someone who has never held a multimeter, built around deliberately destroying components to learn their limits.",
        },
      ],
      focusPoints: [
        { id: 'm1.electronics.focus.1', label: "Ohm's law and voltage dividers, until automatic" },
        { id: 'm1.electronics.focus.2', label: 'Current draw, and why a stalling motor browns out your microcontroller' },
        { id: 'm1.electronics.focus.3', label: 'Reading a schematic: resistor, capacitor, diode, transistor, ground, Vcc' },
        { id: 'm1.electronics.focus.4', label: "Pull-up and pull-down resistors — you'll use them every week" },
        { id: 'm1.electronics.focus.5', label: 'Decoupling capacitors, and why every IC needs one' },
        { id: 'm1.electronics.focus.6', label: 'Battery chemistry basics: LiPo cell counts, C ratings, and unattended-charging risk' },
      ],
      practiceTask: {
        id: 'm1.electronics.practice',
        summary:
          'Build a voltage divider in Falstad, calculate the output voltage by hand, then confirm it in the simulator. Then build a transistor switch that turns an LED on from a logic-level input — the exact circuit that later lets a 3.3V microcontroller pin control something needing more current than the pin can supply.',
      },
    },
    {
      id: 'm1.bench',
      title: 'The bench, the tools, and what everything costs',
      intro: 'The honest budget — this section decides whether you actually start.',
      priceTiers: [
        { id: 'm1.bench.tier0', label: 'Tier 0', cost: '$0', contents: 'Falstad, Tinkercad, and All About Circuits — learn Ohm\'s law and dividers before spending anything. Genuinely do this first.' },
        { id: 'm1.bench.tier1', label: 'Tier 1', cost: '$45–60', contents: 'A starter kit and a multimeter. Every kit here is solderless — no iron yet.' },
        { id: 'm1.bench.tier2', label: 'Tier 2', cost: '$110–160', contents: 'Add a soldering iron, solder, side cutters, wire strippers, helping hands, perfboard, and extra passives.' },
        { id: 'm1.bench.tier3', label: 'Tier 3', cost: '$200–300', contents: 'Add a bench power supply, better meter, desoldering pump, storage drawers, and a robot chassis kit.' },
      ],
      resources: [
        { id: 'm1.bench.elegoo-super', name: 'Elegoo UNO R3 Super Starter Kit', price: '$42.99', url: 'https://www.elegoo.com/products/elegoo-uno-r3-super-starter-kit', note: 'Best value pick and the kit most beginner courses target — pre-soldered LCD, power module, 22-lesson PDF.' },
        { id: 'm1.bench.elegoo-basic', name: 'Elegoo UNO Basic Starter Kit', price: '$19.99', url: 'https://www.elegoo.com/products/elegoo-uno-basic-starter-kit', note: 'Cheapest real entry point if money is genuinely tight — Uno clone plus basic passives.' },
        { id: 'm1.bench.sparkfun-kit', name: "SparkFun Inventor's Kit v4.1.2", price: '$99.95', url: 'https://www.sparkfun.com/sparkfun-inventor-s-kit-v4-1-2.html', note: 'Best curriculum of any kit — 16 circuits across 5 projects ending in a working robot. The free guide is worth reading even with a cheaper kit.' },
        { id: 'm1.bench.multimeter', name: 'Adafruit digital multimeter 9205B+', price: '$17.50', url: 'https://www.adafruit.com/product/2034', note: 'Volts, current to 20A, continuity, resistance, and capacitance — everything you need for years.' },
        { id: 'm1.bench.pinecil', name: 'Pinecil V2 soldering iron', price: '$25.99 community / $35.99 retail', url: 'https://pine64.com/product/pinecil-smart-mini-portable-soldering-iron/', note: 'A real temperature-controlled iron for toy-iron money. USB-C powered, takes standard TS100 and Hakko T12 tips.' },
      ],
      notes: [
        'Where to order: AliExpress is cheapest by far (3–10×) but shipping runs 2–6 weeks with no support if a board arrives dead. Amazon is mid-priced and fast — the right place for your first kit. Elegoo direct ships from regional warehouses in about a week.',
        'Adafruit and SparkFun cost more and are worth it early — every product page links a full tutorial and their support is real. Seeed Studio and DFRobot ship worldwide from China at low-to-mid prices. DigiKey and Mouser are for exact parts by spec with genuine datasheets, not kits. Pololu ships internationally and is the best source for motors and drivers.',
        'For your first order, pay the premium and buy from Amazon or Elegoo direct so you are building within days instead of sulking for a month. Once you know what a 10k resistor is for, order everything from AliExpress.',
      ],
      practiceTask: {
        id: 'm1.bench.practice',
        summary:
          'Buy a kit and a multimeter, then measure things: the voltage of a battery, the resistance of five random resistors checked against their colour bands, and use continuity mode to find a deliberately broken wire you make yourself. Trivial-sounding, and the single skill that saves you the most hours over the next six months.',
      },
    },
    {
      id: 'm1.soldering',
      title: 'Soldering',
      intro:
        "At some point a jumper wire won't be good enough, and a robot that shakes itself apart mid-demo is not a portfolio piece.",
      resources: [
        { id: 'm1.soldering.adafruit-guide', name: 'Adafruit Guide to Excellent Soldering', price: 'free', url: 'https://learn.adafruit.com/adafruit-guide-excellent-soldering', note: 'Iron selection, joint technique, photographs of every common failure, and safety — the reference everyone in the industry points to.' },
        { id: 'm1.soldering.multimeter-guide', name: 'SparkFun: How to Use a Multimeter', price: 'free', url: 'https://learn.sparkfun.com/tutorials/how-to-use-a-multimeter', note: 'Voltage, resistance, current, and continuity explained properly — including what to do when you blow the fuse, which you will.' },
      ],
      focusPoints: [
        { id: 'm1.soldering.focus.1', label: 'Tinning the tip and keeping it clean' },
        { id: 'm1.soldering.focus.2', label: 'Heating the joint, not the solder' },
        { id: 'm1.soldering.focus.3', label: 'Recognising a cold joint by sight' },
        { id: 'm1.soldering.focus.4', label: 'Through-hole first, surface-mount much later' },
        { id: 'm1.soldering.focus.5', label: 'Using flux — it fixes most problems beginners blame on the iron' },
      ],
      practiceTask: {
        id: 'm1.soldering.practice',
        summary:
          'Solder header pins onto a cheap breakout board, then test every pin with continuity mode — do the whole thing three times. Then desolder one and resolder it, because removing components badly is how most beginners destroy boards.',
      },
    },
    {
      id: 'm1.software',
      title: 'Python, the terminal, and Git',
      intro: "You'll use all three every single week from here to month six, so get them out of the way now.",
      resources: [
        { id: 'm1.software.cs50p', name: 'CS50P: Introduction to Programming with Python', price: 'free', url: 'https://cs50.harvard.edu/python/', note: 'More rigorous than most beginner courses, with problem sets and a final project — the structure is what makes people finish it.' },
        { id: 'm1.software.py4e', name: 'Python for Everybody', price: 'free to audit', url: 'https://www.coursera.org/specializations/python', note: 'The gentlest starting point if CS50P feels too steep, taught by one of the most beginner-friendly instructors online.' },
        { id: 'm1.software.missing-semester', name: 'The Missing Semester of Your CS Education (MIT)', price: 'free', url: 'https://missing.csail.mit.edu/', note: 'Shell, scripting, and the command-line fluency university courses skip — robotics runs on the command line.' },
        { id: 'm1.software.learn-git', name: 'Learn Git Branching', price: 'free, interactive', url: 'https://learngitbranching.js.org/', note: 'The best visual tool for branches and merges — the part of Git that confuses everyone.' },
      ],
      focusPoints: [
        { id: 'm1.software.focus.1', label: 'Python: functions, classes, file I/O, JSON, virtual environments, pip' },
        { id: 'm1.software.focus.2', label: 'Terminal: cd, ls, grep, running scripts, environment variables, ssh' },
        { id: 'm1.software.focus.3', label: 'Git: init, add, commit, push, branches, and a README someone can follow' },
      ],
      practiceTask: {
        id: 'm1.software.practice',
        summary:
          "From today, every project you build lives in a GitHub repo with a README that has a photo, a wiring description, and a one-paragraph account of what broke and how you fixed it. That last part is what makes a repo look like engineering instead of a tutorial.",
      },
    },
  ],
  milestones: [
    { id: 'm1.milestone.1', label: 'Read a schematic and build the circuit it describes on a breadboard' },
    { id: 'm1.milestone.2', label: 'Calculate whether a resistor value is right before you plug it in' },
    { id: 'm1.milestone.3', label: 'Find a short, a break, or a dead component with a multimeter' },
    { id: 'm1.milestone.4', label: 'Solder a clean through-hole joint and check it electrically' },
    { id: 'm1.milestone.5', label: 'Write a Python script, run it from the terminal, and push it to GitHub' },
    { id: 'm1.milestone.6', label: "Explain out loud why a stalling motor can reset your microcontroller" },
  ],
}

import type { Month } from '../types'

export const month2: Month = {
  id: 'm2',
  number: 2,
  slug: 'microcontrollers-motors-sensors',
  title: 'Microcontrollers, motors and sensors, and your first moving robot',
  goal: 'Build a robot that moves, senses its environment, and corrects itself.',
  framing:
    'This is the month robotics stops being theory — and the month where most of the fundamental skills of the whole field first appear in miniature. A line-following robot is a closed control loop with sensor input, actuator output, and a tuning problem, which is exactly what a humanoid is, only smaller and cheaper to break.',
  subsections: [
    {
      id: 'm2.arduino',
      title: 'Arduino',
      intro:
        "Start on Arduino rather than ESP32 — the ecosystem is enormous and every tutorial in existence targets it. You'll move to ESP32 within weeks, and nothing here is wasted.",
      resources: [
        { id: 'm2.arduino.mcwhorter', name: 'Paul McWhorter, Arduino Lessons', price: 'free', url: 'https://toptechboy.com/arduino-lessons/', note: 'Over 100 lessons taught slowly with homework — the best fit for a true beginner who has failed at Arduino before.' },
        { id: 'm2.arduino.examples', name: 'Arduino Built-in Examples', price: 'free', url: 'https://docs.arduino.cc/built-in-examples/', note: 'Runnable sketches already inside your IDE — the fastest route from "installed" to "something moved".' },
        { id: 'm2.arduino.docs', name: 'Arduino Official Docs, Learn section', price: 'free', url: 'https://docs.arduino.cc/learn/', note: 'The authoritative reference for digital/analog IO, PWM, I2C, SPI, and UART — best used as lookup rather than a course.' },
        { id: 'm2.arduino.projecthub', name: 'Arduino Project Hub', price: 'free', url: 'https://projecthub.arduino.cc/', note: 'Over 6,000 projects with wiring and code — where you go once tutorials end and you need something to build.' },
      ],
      focusPoints: [
        { id: 'm2.arduino.focus.1', label: 'digitalWrite, digitalRead, analogRead, analogWrite, and what PWM actually is' },
        { id: 'm2.arduino.focus.2', label: 'Interrupts, and why polling a button in a loop eventually fails you' },
        { id: 'm2.arduino.focus.3', label: 'I2C and SPI: wiring them and reading a sensor datasheet for its address' },
        { id: 'm2.arduino.focus.4', label: 'Serial debugging — your primary tool for months' },
        { id: 'm2.arduino.focus.5', label: 'Non-blocking timing with millis() instead of delay(), which will ruin every robot you build' },
      ],
      practiceTask: {
        id: 'm2.arduino.practice',
        summary:
          'Build a reaction-timer game: an LED fires after a random delay, a button stops the clock, and the time in milliseconds prints to serial. Uses interrupts, debouncing, and non-blocking timing, and it has a score — demonstrable in fifteen seconds of video.',
      },
    },
    {
      id: 'm2.esp32',
      title: 'ESP32',
      intro:
        'The ESP32 is where you go the moment you want WiFi, Bluetooth, more processing power, or two cores — and it is cheaper than an Arduino Uno. Buy an ESP32-S3 as your main board (the most capable current variant), and one classic ESP32 so older tutorial code runs unmodified.',
      resources: [
        { id: 'm2.esp32.randomnerd', name: 'Random Nerd Tutorials — Getting Started with ESP32', price: 'free', url: 'https://randomnerdtutorials.com/getting-started-with-esp32/', note: 'The highest-signal free tutorial library for this chip, with a fix for nearly every beginner failure mode and a 250+ project index.' },
        { id: 'm2.esp32.espidf', name: 'ESP-IDF Programming Guide (Espressif official)', price: 'free', url: 'https://docs.espressif.com/projects/esp-idf/en/stable/esp32/get-started/index.html', note: 'The only source of truth once you outgrow the Arduino layer — the real toolchain, menuconfig, and the build system.' },
        { id: 'm2.esp32.arduino-core', name: 'Arduino ESP32 Core documentation', price: 'free', url: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/', note: 'Espressif\'s own docs for the Arduino layer — the bridge that makes "Arduino vs ESP-IDF" a spectrum rather than a fork.' },
        { id: 'm2.esp32.dronebot', name: 'DroneBot Workshop ESP32 hub', price: 'free', url: 'https://dronebotworkshop.com/esp32-2/', note: 'Long-form, wiring-diagram-heavy tutorials mirrored in writing, covering ESP-NOW, OTA updates, and low-power modes.' },
        { id: 'm2.esp32.board-s3', name: 'ESP32-S3-DevKitC-1, 8MB flash', price: '$15.95', url: 'https://www.adafruit.com/product/5312', note: 'The main board to buy — most capable current variant.' },
        { id: 'm2.esp32.board-classic', name: 'Classic ESP32 Dev Board', price: '$15.00', url: 'https://www.adafruit.com/product/3269', note: 'Keep one so older tutorial code runs unmodified.' },
        { id: 'm2.esp32.board-xiao', name: 'Seeed XIAO ESP32-C3', price: '$4.99', url: 'https://www.seeedstudio.com/Seeed-XIAO-ESP32C3-p-5431.html', note: 'For when you need something tiny.' },
      ],
      decisionFramework: {
        title: 'Which framework, when',
        options: [
          { option: 'Arduino framework', detail: 'Fastest to a working robot, largest library ecosystem.' },
          { option: 'ESP-IDF', detail: 'When you need real control over tasks, cores, power, and timing.' },
          { option: 'MicroPython', detail: 'Fast sensor experimentation — not a balancing loop, since GC pauses wreck timing.' },
        ],
      },
      practiceTask: {
        id: 'm2.esp32.practice',
        summary:
          'Build something that could not exist on an Arduino Uno: serve a web page from the ESP32 showing live sensor readings with buttons that drive a servo, accessed from your phone on the same network. Teaches WiFi, HTTP handling, and asynchronous work at once.',
      },
    },
    {
      id: 'm2.motors',
      title: 'Motors, drivers, and actuation',
      intro:
        'This is where electronics stops being abstract — motors draw real current and behave badly. Four types matter, and you should understand all four by month end: brushed DC gearmotor (cheap, needs an H-bridge, no position feedback without an encoder — the default first rover), hobby servo (internal closed loop, ~180° travel, no feedback out), smart serial bus servo (daisy-chained, position/velocity/current feedback, 12-bit magnetic encoder — what modern low-cost arms use), and stepper (open-loop absolute positioning, high holding torque).',
      resources: [
        { id: 'm2.motors.l298n', name: 'DroneBot Workshop — Controlling DC Motors with the L298N', price: 'free', url: 'https://dronebotworkshop.com/dc-motors-l298n-h-bridge/', note: 'DC motor theory, PWM, H-bridge internals, and three complete sketches ending in a joystick-driven robot car.' },
        { id: 'm2.motors.tb6612', name: 'SparkFun TB6612FNG Hookup Guide', price: 'free', url: 'https://learn.sparkfun.com/tutorials/tb6612fng-hookup-guide/all', note: 'Pinout, wiring, and library for the driver you should actually use, with the reasoning why.' },
        { id: 'm2.motors.steppers', name: 'DroneBot Workshop — Stepper Motors with Arduino', price: 'free', url: 'https://dronebotworkshop.com/stepper-motors-with-arduino/', note: 'Unipolar vs bipolar, microstepping, NEMA sizing, and four demos across three drivers.' },
        { id: 'm2.motors.simplefoc', name: 'SimpleFOC documentation', price: 'free', url: 'https://docs.simplefoc.com/', note: 'The clearest free explanation of field-oriented control anywhere — the affordable on-ramp to brushless motors later.' },
        { id: 'm2.motors.drv8833', name: 'Adafruit DRV8833 motor driver', price: '$5.95', url: 'https://www.adafruit.com/product/3297', note: 'The cheapest good driver on the list.' },
        { id: 'm2.motors.tb6612-hw', name: 'SparkFun TB6612FNG breakout', price: '$14.77', url: 'https://www.sparkfun.com/sparkfun-motor-driver-dual-tb6612fng-1a.html', note: 'The correct default replacement for the L298N.' },
        { id: 'm2.motors.pololu-encoder', name: 'Pololu gearmotor with encoder assembly', price: '$19.95 each', url: 'https://www.pololu.com/product/3675', note: 'Encoder wiring already solved.' },
        { id: 'm2.motors.a4988', name: 'Pololu A4988 stepper driver carrier', price: '$8.95', url: 'https://www.pololu.com/product/1182', note: 'Standard stepper driver.' },
        { id: 'm2.motors.sts3215', name: 'FeeTech STS3215 smart servo, 12V, 30 kg·cm', price: '$31.71', url: 'https://www.robotshop.com/products/feetech-12v-30kgcm-magnetic-encoding-servo-sts3215', note: 'The servo used in the open-source SO-101 arm you build in month 3.' },
      ],
      callouts: [
        {
          id: 'm2.motors.callout.l298n',
          kind: 'warning',
          title: 'The L298N trap',
          body: 'It is in every tutorial and you should not use it. It is an obsolete bipolar-transistor H-bridge that drops about 2V across its output stage, gets hot, and wastes your battery. Learn it because the tutorials use it, then switch to the TB6612FNG or DRV8833.',
        },
      ],
      practiceTask: {
        id: 'm2.motors.practice',
        summary:
          'Drive one DC motor forward and backward at five different speeds using PWM, then add an encoder and write a function that turns the wheel exactly one full revolution regardless of battery voltage. The second half is your first real closed loop, and it is much harder than it sounds.',
      },
    },
    {
      id: 'm2.sensors',
      title: 'Sensors and reading the physical world',
      resources: [
        { id: 'm2.sensors.bno085-guide', name: 'Adafruit BNO085 9-DoF IMU guide', price: 'free', url: 'https://learn.adafruit.com/adafruit-9-dof-orientation-imu-fusion-breakout-bno085/overview', note: 'Covers an IMU that does sensor fusion on-chip and hands you a quaternion — the "buy your way out of the maths" option.' },
        { id: 'm2.sensors.kalman-book', name: 'Kalman and Bayesian Filters in Python — Roger Labbe', price: 'free, CC-BY', url: 'https://rlabbe.github.io/Kalman-and-Bayesian-Filters-in-Python/', note: 'Jupyter notebooks with runnable code covering g-h, discrete Bayes, KF, EKF, UKF, and particle filters — the best free filtering education that exists.' },
        { id: 'm2.sensors.mathworks-fusion', name: 'MathWorks — Understanding Sensor Fusion and Tracking', price: 'free', url: 'https://www.mathworks.com/videos/series/understanding-sensor-fusion-and-tracking.html', note: 'Six short parts, "what is sensor fusion" through fusing IMU and GPS for pose — the right conceptual overview before touching code.' },
        { id: 'm2.sensors.hcsr04', name: 'HC-SR04 ultrasonic', price: '$3.95', url: 'https://www.adafruit.com/', note: 'Cheap obstacle detection, wide cone, poor performance on soft surfaces.' },
        { id: 'm2.sensors.vl53l0x', name: 'VL53L0X time-of-flight laser', price: '$14.95', url: 'https://www.adafruit.com/', note: 'Much narrower 35° cone, no double-imaging problems.' },
        { id: 'm2.sensors.mpu6050', name: 'MPU-6050 6-DoF IMU', price: '$12.95', url: 'https://www.adafruit.com/', note: 'The cheap classic where you do the fusion yourself — which is the point.' },
        { id: 'm2.sensors.bno085', name: 'BNO085 9-DoF IMU', price: '$29.50', url: 'https://www.adafruit.com/product/4754', note: 'Fusion on-chip with a UART mode built for robotics.' },
        { id: 'm2.sensors.pololu-mag', name: 'Pololu magnetic encoder pair', price: '$8.95', url: 'https://www.pololu.com/', note: 'For adding odometry to motors that lack it.' },
        { id: 'm2.sensors.rplidar', name: 'RPLIDAR C1 360° lidar', price: '$69.00', url: 'https://www.dfrobot.com/', note: 'Newer and cheaper than the classic A1.' },
      ],
      callouts: [
        {
          id: 'm2.sensors.callout.complementary',
          kind: 'tip',
          title: 'Beginner tip: write a complementary filter first',
          body: 'For a balancing robot, write a complementary filter before a Kalman filter. It is four lines — angle = a * (angle + gyro * dt) + (1 - a) * accelAngle with a around 0.98 — and it works. Graduate to Kalman once you understand why the complementary filter fails.',
        },
      ],
      practiceTask: {
        id: 'm2.sensors.practice',
        summary:
          'Mount an IMU on a board, print the pitch angle to serial, hold the board perfectly still and watch the number drift anyway. Add a complementary filter and watch that drift disappear — the single most important lesson in state estimation, and it took twenty minutes.',
      },
    },
    {
      id: 'm2.robots',
      title: 'Your first two robots',
      intro: 'These two projects together teach more than any course will.',
      boms: [
        {
          id: 'm2.robots.line-quality',
          label: 'Line-following robot — quality build',
          totalCost: '~$105',
          lines: [
            { part: 'ESP32-S3', cost: '$15.95' },
            { part: 'Pololu Romi chassis kit', cost: '$39.95' },
            { part: 'TB6612FNG driver', cost: '$14.77' },
            { part: 'QTR-8RC reflectance array', cost: '$12.95' },
            { part: 'Batteries and holder', cost: '~$12' },
            { part: 'Wiring and headers', cost: '~$10' },
          ],
        },
        {
          id: 'm2.robots.line-budget',
          label: 'Line-following robot — budget build',
          totalCost: '~$38',
          lines: [
            { part: 'Generic ESP32', cost: '~$6' },
            { part: '2WD acrylic chassis', cost: '~$12' },
            { part: 'DRV8833', cost: '$5.95' },
            { part: 'Five TCRT5000 sensors', cost: '~$3' },
            { part: 'Batteries', cost: '~$6' },
            { part: 'Wiring', cost: '~$5' },
          ],
        },
        {
          id: 'm2.robots.balance-quality',
          label: 'Self-balancing robot — quality build',
          totalCost: '~$134',
          lines: [
            { part: 'ESP32', cost: '$15.95' },
            { part: 'Two gearmotor-with-encoder assemblies', cost: '$39.90' },
            { part: 'TB6612FNG', cost: '$14.77' },
            { part: 'MPU-6050', cost: '$12.95' },
            { part: 'Printed or laser-cut chassis', cost: '~$10' },
            { part: 'LiPo, charger, wheels', cost: '~$30' },
            { part: 'Misc', cost: '~$10' },
          ],
        },
        {
          id: 'm2.robots.balance-budget',
          label: 'Self-balancing robot — budget build',
          totalCost: '~$62',
          lines: [{ part: 'See quality build for equivalents at budget tiers', cost: '~$62 total' }],
        },
      ],
      practiceTask: {
        id: 'm2.robots.practice',
        summary:
          'Build the line follower first, tune it with a P controller, then add the D term and watch the oscillation disappear — film both versions. Then build the balancer, which will not work at all until your filter and loop timing are both correct, and that frustration is the point.',
      },
    },
  ],
  milestones: [
    { id: 'm2.milestone.1', label: 'Drive a motor at a controlled speed and know PWM duty vs actual RPM' },
    { id: 'm2.milestone.2', label: 'Read an encoder and close a position loop around it' },
    { id: 'm2.milestone.3', label: "Wire and read an I2C sensor from its datasheet, no tutorial" },
    { id: 'm2.milestone.4', label: 'Fuse accelerometer and gyroscope data into a stable angle estimate' },
    { id: 'm2.milestone.5', label: 'Explain what P, I, and D each do, from what your robot did when you changed them' },
    { id: 'm2.milestone.6', label: 'Show two working robots on GitHub with wiring, code, and what broke' },
  ],
}

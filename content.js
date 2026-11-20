/* ------------------------------------------------------------------
   All the content the site shows lives here.
   Each project has `images` + `captions` (automatic slideshow) or, for text-only projects, `stats`, `body` and `flow`. Still placeholder: the four skill badge labels.
------------------------------------------------------------------- */
window.SITE = {
  name: "Fathima Henna KC",
  first: "Henna",
  role: "Computer Science Engineer (AI/ML)",
  status: "Final-year CSE (AI/ML) student. Open to work.",
  badge: "B.Tech · CSE (AI)",
  location: "Kerala",
  title: "Fathima Henna KC — CSE (AI) Student",
  hero: {
    video: "assets/hero.mp4",
    scribble: ["Psst.", "Check", "the back"],
  },
  intro:
    "Hey!! Im henna, an aspiring ai engineer by day and a day dreaming co-founder by the night. im still day dreaming about building something on my own so. i have done several freelance projects, im a present intern at https://heapvue.com/. I build websites and web apps, from small business sites to campus tools, AI experiments and projects, and I care about how they look, feel and work",
  skills: [
    { label: "Research", color: "green", icon: "search" },
    { label: "Design", color: "red", icon: "spark" },
    { label: "Prototype", color: "blue", icon: "plane" },
    { label: "Ship", color: "yellow", icon: "gear" },
  ],
  works: [
    {
      slug: "sentra", title: "SENTRA", stampTitle: "SENTRA", denom: "1", art: "shield",
      theme: { frame: "#1d5c55", ink: "#12302d", sky: "#d9e7e0" },
      kind: "API security", badge: "NeuroHack national finalist",
      blurb: "A zero-trust API security gateway that catches authorization-bypass attacks, where a logged-in user reaches data or actions that belong to someone else. These attacks, known as BOLA and BFLA, are the number one risk on the OWASP API Security list. SENTRA learns how each caller normally behaves and blocks the requests that break the pattern.",
      stats: [["100%", "of attacks detected"], ["0.25%", "false-positive rate"], ["2.57 ms", "decision latency"]],
      meta: [["Type", "Security gateway"], ["Stack", "Python, FastAPI, scikit-learn, PyJWT, NetworkX"], ["Recognition", "Finalist, NeuroHack national hackathon"]],
      body: [
        "BOLA (broken object level authorization) is when a user changes an ID in a request and reads someone else's record. BFLA (broken function level authorization) is when an ordinary user calls an admin-only function. A valid login and token do not stop either one, so authentication alone is not enough.",
        "SENTRA treats every request as untrusted. It builds a behavioural profile of each caller, uses machine learning to judge whether a request fits that profile, and allows or blocks it in milliseconds."
      ],
      flow: [
        ["Verify who is calling", "Every request carries a JWT that is checked with PyJWT, so the gateway always knows the caller's identity."],
        ["Profile their behaviour", "It keeps a profile of the objects and functions each caller normally touches. NetworkX models those relationships as a graph."],
        ["Score the request", "A scikit-learn model scores how far the request strays from that caller's normal behaviour."],
        ["Decide in 2.57 ms", "The request is allowed or blocked fast enough to sit in the request path. In testing it caught 100% of attacks with a 0.25% false-positive rate."]
      ],
      highlights: ["BOLA and BFLA detection", "Behavioural profiling", "Machine-learning scoring", "JWT identity checks", "NeuroHack finalist"],
    },
    {
      slug: "anpr-gate", title: "Smart ANPR Barrier Gate", stampTitle: "ANPR GATE", denom: "2", art: "gate",
      theme: { frame: "#4f555c", ink: "#22262b", sky: "#ece9b9" },
      kind: "Hardware + software", badge: "Hardware + software",
      blurb: "An automatic number plate recognition system that runs a real barrier gate. A camera reads each vehicle's plate in real time, the system checks it against a database of authorised vehicles, and an Arduino lifts the barrier. An ultrasonic sensor keeps the gate open until the vehicle has driven clear.",
      stats: [["YOLO11", "finds the plate"], ["PaddleOCR", "reads the text"], ["Arduino", "drives the barrier"]],
      meta: [["Type", "Hardware + software"], ["Hardware", "Arduino barrier gate, ultrasonic sensor, laptop camera"], ["Stack", "JavaScript, Node.js, SQLite, YOLO11, ONNX Runtime, PaddleOCR, Arduino (C++), Web Serial API"], ["Code", "github.com/hennakc/ANPR"]],
      body: [
        "A plate is accepted only when several readings agree, so a single misread cannot open the gate. Each reading is checked against the Indian plate format, including state codes, and common OCR character mix-ups are corrected before the lookup."
      ],
      flow: [
        ["See", "A laptop camera streams live video of the approaching vehicle."],
        ["Detect", "YOLO11, run through ONNX Runtime, finds the number plate in each frame."],
        ["Read", "PaddleOCR turns the plate image into text."],
        ["Verify", "Multi-frame voting and Indian-plate validation (state-code checks and OCR character correction) make sure the reading is right."],
        ["Authorise", "The plate is looked up in a SQLite database of allowed vehicles."],
        ["Open", "The dashboard sends the open command to the Arduino over the Web Serial API. The gate stays open until the ultrasonic sensor shows the vehicle has moved away."]
      ],
      highlights: ["Live plate reading", "Multi-frame voting", "Indian plate validation", "Allowed-plates database", "Arduino barrier and ultrasonic sensor", "Test with a photo", "Simulate a car, no sensor needed"],
      images: ["assets/projects/anpr-gate/1.png"],
      captions: ["Gate dashboard: access granted, live camera and Arduino sensor feed"],
      aspect: "764 / 477", frameMax: "860px", frameLabel: "ANPR gate dashboard",
      repo: "https://github.com/hennakc/ANPR",
    },
    {
      slug: "gym-app", title: "Gym Management App", stampTitle: "GYM APP", denom: "5", art: "dumbbell",
      theme: { frame: "#a8141b", ink: "#1e1a1a", sky: "#dedad6" },
      kind: "Android app", badge: "Client project",
      blurb: "An Android app built for a client who runs a gym. Admins manage members, memberships, attendance, payments and trainer notes from one dashboard, and the app keeps working with no internet. When the connection returns, every device syncs with the cloud.",
      stats: [["Offline-first", "works without a connection"], ["Two-way sync", "across every device"], ["6 modules", "in one admin dashboard"]],
      meta: [["Type", "Android app"], ["Built for", "A client (gym)"], ["Stack", "Flutter, Kotlin, Firebase"], ["Modules", "Members, memberships, attendance, payments, trainer notes, analytics"]],
      body: [
        "Gyms cannot count on steady internet, so the app saves everything on the device first. A bi-directional sync engine reconciles changes in both directions with conflict resolution, and composite-key tracking stops the same member or payment from being recorded twice, so the data stays consistent across devices."
      ],
      flow: [
        ["Work offline", "Members, attendance and payments are saved on the device first, so the front desk never waits on the network."],
        ["Sync both ways", "When a connection returns, local changes go up to Firebase and cloud changes come down."],
        ["Resolve conflicts", "If two devices edited the same record, the sync engine's conflict resolution decides which version wins."],
        ["Prevent duplicates", "Composite-key tracking gives every record a stable identity, so a member or payment is never entered twice."],
        ["See the numbers", "The analytics dashboard summarises memberships, attendance and payments for the admin."]
      ],
      highlights: ["Member management", "Memberships", "Attendance", "Payments", "Trainer notes", "Analytics dashboard"],
    },
    {
      slug: "mitr-wellness", title: "Mitr Wellness", stampTitle: "MITR WELLNESS", denom: "1", art: "leaf",
      theme: { frame: "#6a4a9c", ink: "#2c2238", sky: "#efe4a6" },
      kind: "Brand website",
      blurb: "A brand website for meno mitr, an Ayurvedic, non-hormonal daily formulation for women in perimenopause and menopause. It tells the story honestly, introduces the founders and the twelve-herb formula, and links straight to the shop, a quiz and the community.",
      meta: [["Type", "Brand website"], ["Category", "Wellness · Ayurveda"], ["Sections", "Shop, quiz, community, FAQs"], ["Live at", "mitrwellness.com"]],
      highlights: ["Ayurveda-led storytelling", "Meet the founders", "Shop and quiz", "Community and retreats", "FAQs"],
      images: ["assets/projects/mitr-wellness/1.webp", "assets/projects/mitr-wellness/2.png", "assets/projects/mitr-wellness/3.png", "assets/projects/mitr-wellness/4.png"],
      captions: ["Hero", "Manifesto", "Meet meno mitr", "Take the quiz"],
      aspect: "1535 / 890",
      link: "https://mitrwellness.com/",
    },
    {
      slug: "tiny-treasures", title: "Tiny Treasures by MJ", stampTitle: "TINY TREASURES", denom: "5", art: "heart",
      theme: { frame: "#c4573b", ink: "#3a2420", sky: "#f2dfd2" },
      kind: "Business website",
      blurb: "A warm, story-led website for a handcrafted miniature clay art studio. It showcases collections, walks through the five stages of making a piece, and makes it easy to commission custom gifts or book a workshop.",
      meta: [["Type", "Business website"], ["Category", "Handmade clay art"], ["Sections", "Collections, process, gallery, workshops"], ["Live at", "tinytreasuresbymj.vercel.app"]],
      highlights: ["Featured collections", "From clay to keepsake process", "Photo gallery", "Workshop booking", "FAQs"],
      images: ["assets/projects/tiny-treasures/1.jpg", "assets/projects/tiny-treasures/2.jpg", "assets/projects/tiny-treasures/3.jpg", "assets/projects/tiny-treasures/4.jpg", "assets/projects/tiny-treasures/5.jpg", "assets/projects/tiny-treasures/6.jpg", "assets/projects/tiny-treasures/7.jpg"],
      captions: ["Hero","Featured collections","Collection gallery","Handmade miniatures","Clay flowers and decor","From clay to keepsake","Commission your own"],
      link: "https://tinytreasuresbymj.vercel.app/",
    },
    {
      slug: "scentist", title: "Scentist", stampTitle: "SCENTIST", denom: "2", art: "flask",
      theme: { frame: "#5b2b1e", ink: "#3a2216", sky: "#ebd9c3" },
      kind: "Brand website",
      blurb: "A coming-soon website for a perfume brand in Dubai built around one idea: every scent is unique, so create yours. It teases the first collection with a veiled reveal and answers the questions people will ask first.",
      meta: [["Type", "Brand website"], ["Category", "Perfume · Dubai"], ["Status", "Coming soon"], ["Live at", "scentist.ae"]],
      highlights: ["Veiled reveal hero", "Create your scent story", "FAQs", "Contact page"],
      images: ["assets/projects/scentist/1.jpg", "assets/projects/scentist/2.jpg", "assets/projects/scentist/3.jpg", "assets/projects/scentist/4.jpg", "assets/projects/scentist/5.jpg", "assets/projects/scentist/6.jpg"],
      captions: ["The veiled reveal","The unveiling","The perfume","Coming soon","About","FAQs"],
      link: "https://scentist.ae/",
    },
    {
      slug: "roamgpt", title: "RoamGPT", stampTitle: "ROAMGPT", denom: "3", art: "dome",
      theme: { frame: "#233d6e", ink: "#1d2a45", sky: "#d9e0ea" },
      kind: "AI web app",
      blurb: "An AI-powered travel companion for exploring Indian heritage. It generates curated travel plans, historical context, cultural insights and translations for any destination, with a Flask backend that brings itinerary, language and history questions into one conversational interface.",
      meta: [["Type", "AI web app"], ["Stack", "Python, Flask, OpenAI API, Render"], ["Category", "Travel · Heritage"], ["Live at", "roamgpt.onrender.com"]],
      highlights: ["Curated travel plans", "Historical context", "Cultural insights", "Translations", "Sign in to explore"],
      images: ["assets/projects/roamgpt/1.jpg", "assets/projects/roamgpt/2.jpg", "assets/projects/roamgpt/3.jpg"],
      captions: ["Landing page","Sign in","Create an account"],
      link: "https://roamgpt.onrender.com/",
    },
    {
      slug: "universe", title: "UNIverse", stampTitle: "UNIVERSE", denom: "6", art: "hive",
      theme: { frame: "#e39a1e", ink: "#4a2a6b", sky: "#f4e5b4" },
      kind: "Web app",
      blurb: "A playful college community and engagement platform where \"community buzzes together\". Students get one place for chat rooms, lost and found, an attendance calculator, event management and bus timings, built in React with real-time interactions on Firebase. It earned a Top 300 Makers spot at Tink Her Hack 4.0 by TinkerHub.",
      meta: [["Type", "Web app"], ["Stack", "React, Firebase, Vercel"], ["Recognition", "Top 300 Makers, Tink Her Hack 4.0"], ["Live at", "un-iverse-mu.vercel.app"]],
      highlights: ["Common chat room", "Lost and found", "Important events", "Attendance risk", "Bus timings"],
      images: ["assets/projects/universe/1.jpg", "assets/projects/universe/2.jpg", "assets/projects/universe/3.jpg"],
      captions: ["Landing page","Join the hive","Your campus universe"],
      link: "https://un-iverse-mu.vercel.app/",
    },
  ],
  contact: {
    email: "hennaameen5@gmail.com",
    phone: "+91 89430 45800",
    phoneLink: "+918943045800",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/fathima-henna-kc-a1a003291/" },
      { label: "GitHub", url: "https://github.com/hennakc" },
      { label: "Instagram", url: "https://www.instagram.com/faatimahenna" },
      { label: "Résumé", url: "assets/Fathima-Henna-KC-Resume.pdf" },
    ],
  },
};

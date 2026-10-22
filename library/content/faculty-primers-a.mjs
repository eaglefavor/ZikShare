// Faculty primers - engineering, law, environment and the physical sciences.
// Written as 100-level study companions. Course codes reflect the codes used in
// UNIZIK faculty handbooks; students are told to confirm the current outline.

export const FACULTY_PRIMER_PACKS_A = [
    {
        slug: "feg-101-engineering-mathematics",
        code: "FEG 101",
        title: "FEG 101: Engineering Mathematics I - Functions, Calculus and Vectors",
        subtitle: "The mathematical toolkit that every first-year engineering course assumes you already have",
        domain: "Faculty Primer",
        faculty: "Faculty of Engineering",
        department: "Engineering (Common 100L Courses)",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 60000,
        tags: ["FEG 101", "Engineering Mathematics", "Calculus", "Vectors", "Engineering", "100L"],
        description: "Engineering students fail FEG 101 for two reasons: weak algebra and rushing calculus without understanding limits. This pack rebuilds the algebra foundations, explains differentiation and integration through physical meaning, and drills vector operations with engineering-flavoured worked examples.",
        outcomes: [
            "Manipulate algebraic expressions, indices, logarithms and partial fractions without calculator dependence.",
            "Evaluate limits and differentiate standard functions, including product, quotient and chain rules.",
            "Integrate by substitution and by parts, and apply definite integrals to area and work problems.",
            "Add, resolve and take dot and cross products of vectors in two and three dimensions."
        ],
        sections: [
            {
                heading: "Repair the algebra first",
                intro: "Most 'calculus problems' are actually algebra problems wearing a disguise. Fix these and the rest of the course becomes manageable.",
                bullets: [
                    "Indices: a^m x a^n = a^(m+n); a^(m/n) is the n-th root of a^m.",
                    "Logarithms: log(ab) = log a + log b; log(a^n) = n log a. Know the change-of-base rule.",
                    "Factorise before you substitute. A common factor often cancels an apparent difficulty.",
                    "Partial fractions: split a rational expression into simpler denominators before integrating.",
                    "Quadratic formula and completing the square reappear in optimisation and in dynamics."
                ],
                callout: {
                    title: "No-calculator drill",
                    body: "Spend 15 minutes weekly evaluating simple expressions by hand. Engineering exams reward speed and accuracy, and both come from fluency, not from the calculator."
                }
            },
            {
                heading: "Limits and differentiation",
                intro: "The derivative is an instantaneous rate of change. Understand that sentence and the rules become tools rather than magic.",
                paragraphs: [
                    "The derivative of f at x is the limit of the change in f divided by the change in x as the change approaches zero. That is why velocity is the derivative of displacement and current is the derivative of charge.",
                    "Learn the standard derivatives, then the combination rules: product, quotient and chain. The chain rule is the one students under-practise, and it appears in almost every engineering application."
                ],
                bullets: [
                    "d/dx of x^n is n x^(n-1); of sin x is cos x; of cos x is -sin x; of e^x is e^x; of ln x is 1/x.",
                    "Product rule: (uv)' = u'v + uv'.",
                    "Quotient rule: (u/v)' = (u'v - uv') / v^2.",
                    "Chain rule: differentiate the outside, then multiply by the derivative of the inside.",
                    "Use the first derivative for increasing/decreasing behaviour and the second for concavity."
                ]
            },
            {
                heading: "Integration and vectors",
                intro: "Integration reverses differentiation and accumulates quantity. Vectors describe quantities with both size and direction.",
                bullets: [
                    "A definite integral gives signed area. Always sketch the curve to check whether your answer is plausible.",
                    "Substitution works when you can see the derivative of an inner function in the integrand.",
                    "Integration by parts follows the product rule; choose u so that differentiating it simplifies the expression.",
                    "Resolve a vector into components: Fx = F cos(theta), Fy = F sin(theta).",
                    "Dot product gives work and the angle between vectors; cross product gives torque and a perpendicular vector."
                ],
                callout: {
                    title: "Units are a check",
                    body: "If you are integrating a velocity in m/s over time in seconds, the answer must be in metres. If your units are wrong, your method is wrong."
                }
            }
        ],
        practice: [
            { q: "Differentiate y = (3x^2 + 1)^5.", a: "Use the chain rule: dy/dx = 5(3x^2 + 1)^4 x 6x = 30x(3x^2 + 1)^4." },
            { q: "Integrate the integral of 2x cos(x^2) dx.", a: "Let u = x^2, du = 2x dx. The integral becomes the integral of cos u du = sin(x^2) + C." },
            { q: "A force of 10 N acts at 30 degrees to the horizontal. Resolve it.", a: "Fx = 10 cos 30 = 8.66 N; Fy = 10 sin 30 = 5 N." },
            { q: "Evaluate the limit of (x^2 - 4)/(x - 2) as x approaches 2.", a: "Factorise: (x - 2)(x + 2)/(x - 2) = x + 2, so the limit is 4." },
            { q: "Why is the second derivative useful in optimisation?", a: "It distinguishes a maximum from a minimum: negative second derivative indicates a maximum, positive indicates a minimum." }
        ],
        checklist: [
            "Rewrite the indices, logarithm and partial fraction rules on one page without notes.",
            "Do 15 differentiation problems covering product, quotient and chain rules.",
            "Do 10 integration problems split evenly between substitution and parts.",
            "Resolve five force vectors into components and recombine them.",
            "Sketch two curves and estimate the area before integrating to check your answer.",
            "Attempt one past FEG 101 question under timed conditions and mark it honestly.",
            "List every topic you could not solve and take the list to your lecturer or tutorial group."
        ]
    },
    {
        slug: "law-101-nigerian-legal-system",
        code: "LAW 101",
        title: "LAW 101: The Nigerian Legal System - Sources, Courts and Legal Reasoning",
        subtitle: "How law is made, applied and argued in Nigeria, explained for first-year law students",
        domain: "Faculty Primer",
        faculty: "Faculty of Law",
        department: "Public Law",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 60000,
        tags: ["LAW 101", "Nigerian Legal System", "Legal Method", "Courts", "Precedent", "100L"],
        description: "LAW 101 is where law students learn that law is a system of sources and reasoning, not a list of rules. This pack covers the sources of Nigerian law, the court hierarchy, the doctrine of precedent, statutory interpretation and the IRAC method, with worked examples you can imitate in tutorials.",
        outcomes: [
            "Identify and rank the sources of Nigerian law, including the Constitution, legislation, case law, custom and received English law.",
            "Explain the jurisdiction and hierarchy of Nigerian courts from the Supreme Court downwards.",
            "Apply the doctrine of stare decisis and distinguish ratio decidendi from obiter dictum.",
            "Structure a legal answer using issue, rule, application and conclusion."
        ],
        sections: [
            {
                heading: "Sources of Nigerian law",
                intro: "A source of law is an authority from which legal rules derive their validity. Hierarchy matters: a rule from a lower source cannot override a higher one.",
                bullets: [
                    "The Constitution: supreme and directly enforceable; inconsistent legislation is void to the extent of inconsistency.",
                    "Legislation: Acts of the National Assembly, state laws, subsidiary legislation and bye-laws.",
                    "Judicial precedent: decisions of superior courts create binding rules within their jurisdiction.",
                    "Customary law: recognised as a source where it is not repugnant to natural justice, equity and good conscience, and is not incompatible with existing law.",
                    "Received English law: common law, doctrines of equity and statutes of general application in force in England before 1 January 1900, received subject to local circumstances.",
                    "Islamic law: applicable in the northern states and to personal matters where the parties submit to it."
                ],
                callout: {
                    title: "Exam habit",
                    body: "When asked about sources, rank them. A Constitution-first answer shows you understand supremacy; a flat list does not."
                }
            },
            {
                heading: "Courts and jurisdiction",
                intro: "Jurisdiction is the power of a court to hear a matter. A court without jurisdiction cannot validly decide anything, however correct its reasoning.",
                bullets: [
                    "Supreme Court: apex court, mainly appeals; its decisions bind all lower courts.",
                    "Court of Appeal: appeals from the Federal High Court, state High Courts, and election and other specialised tribunals.",
                    "Federal High Court: federal matters including revenue, customs, banking, company law and certain fundamental rights applications.",
                    "State High Courts: unlimited jurisdiction over civil and criminal matters within the state, subject to the Constitution.",
                    "Magistrate and district courts: limited civil and criminal jurisdiction.",
                    "Customary and Sharia courts of appeal: appeals in customary and Islamic personal law matters."
                ]
            },
            {
                heading: "Precedent and legal reasoning",
                intro: "Stare decisis means standing by decided matters. A court must follow the ratio of a superior court in the same hierarchy, but only the ratio.",
                paragraphs: [
                    "The ratio decidendi is the legal principle necessary to the decision. Obiter dicta are passing remarks that do not bind, though they may persuade.",
                    "Distinguishing a case is the advocate's main tool: show that the material facts differ so the earlier rule does not apply. Overruling is different - a higher court rejects the earlier rule itself."
                ],
                bullets: [
                    "Ratio binds; obiter persuades.",
                    "A court is bound by decisions of courts above it, not by courts of coordinate or lower rank.",
                    "Persuasive precedent includes decisions from other common-law jurisdictions and the Privy Council.",
                    "Statutory interpretation: literal rule, golden rule and mischief rule; also purposive interpretation.",
                    "IRAC structure: Issue, Rule, Application, Conclusion. Never write the conclusion before the application."
                ]
            }
        ],
        practice: [
            { q: "Why is the Constitution described as supreme?", a: "Because section 1 of the 1999 Constitution provides that its provisions prevail over any other law, and inconsistent laws are void to the extent of the inconsistency." },
            { q: "Distinguish ratio decidendi from obiter dictum.", a: "The ratio is the legal reasoning essential to the decision and binds lower courts. Obiter are incidental remarks that do not bind but may be persuasive." },
            { q: "State two requirements for a custom to be enforced as law.", a: "It must be established by evidence, not be repugnant to natural justice, equity and good conscience, and not be incompatible with existing law. Any two of these." },
            { q: "Which court binds a State High Court in Nigeria?", a: "The Court of Appeal and the Supreme Court, and the Supreme Court binds all courts in Nigeria." },
            { q: "Apply IRAC: a client was dismissed without a hearing.", a: "Issue: whether dismissal without a hearing breaches fair hearing. Rule: section 36 of the Constitution guarantees fair hearing. Application: no opportunity was given to respond. Conclusion: the dismissal is likely void for breach of fair hearing." }
        ],
        checklist: [
            "Draw the Nigerian court hierarchy from memory with one line of jurisdiction for each.",
            "List the sources of Nigerian law in order of supremacy.",
            "Read one Supreme Court case and write out its ratio in two sentences.",
            "Find and label an obiter remark in a case summary.",
            "Write one IRAC answer of 300 words on a fair-hearing scenario.",
            "Learn the three rules of statutory interpretation with one example each.",
            "Meet a senior colleague and ask which LAW 101 topics appear most in assessments."
        ]
    },
    {
        slug: "arc-101-introduction-to-architecture",
        code: "ARC 101",
        title: "ARC 101: Introduction to Architecture - Design Thinking, Drawing and Site",
        subtitle: "From the design process to scale drawings, orientation and the language of buildings",
        domain: "Faculty Primer",
        faculty: "Faculty of Environmental Sciences",
        department: "Architecture",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 55000,
        tags: ["ARC 101", "Architecture", "Design Process", "Drawing", "Site Analysis", "100L"],
        description: "Architecture freshers meet two demands at once: thinking conceptually and drawing precisely. This pack explains the design process, how to read and produce scale drawings, site and climate considerations, and the vocabulary you need to critique a building intelligently.",
        outcomes: [
            "Describe the stages of the architectural design process from brief to detail.",
            "Read and produce measured drawings using scale, plans, sections and elevations.",
            "Analyse a site for orientation, drainage, access, noise and climate.",
            "Use architectural vocabulary accurately when presenting or critiquing work."
        ],
        sections: [
            {
                heading: "The design process",
                intro: "Design is not decoration applied at the end. It is a sequence of decisions from problem to built response.",
                bullets: [
                    "Brief: what the client needs, who will use the building, what constraints exist.",
                    "Site analysis: orientation, access, topography, vegetation, noise, views and services.",
                    "Concept: the organising idea - a diagram, a spatial strategy, a response to climate or culture.",
                    "Schematic design: plans, sections and massing at small scale.",
                    "Design development: materials, structure, services and detail coordination.",
                    "Presentation: drawings, physical or digital models, and a clear verbal explanation."
                ],
                callout: {
                    title: "Concept is not decoration",
                    body: "A concept explains why the building is organised the way it is. 'I used curves because they are beautiful' is a preference, not a concept."
                }
            },
            {
                heading: "Drawing and scale",
                intro: "Architectural drawing is a precise language. Learn the conventions and your work becomes legible to every reviewer.",
                bullets: [
                    "Plan: a horizontal cut about 1.2 metres above floor level.",
                    "Section: a vertical cut showing heights and construction.",
                    "Elevation: an external face of the building, without perspective.",
                    "Scale: 1:100 or 1:50 for design drawings; 1:20 or 1:5 for details.",
                    "Line weights: thin for construction lines, heavy for cut elements, medium for visible edges.",
                    "Always include a north arrow, scale bar, title block and human figure for scale."
                ]
            },
            {
                heading: "Site, climate and comfort",
                intro: "In a hot-humid climate such as Awka, passive design is not optional. Orientation and shading decide whether a room is usable.",
                bullets: [
                    "Long axis east-west reduces direct sun on long facades.",
                    "Deep verandahs, brise-soleil and shaded openings reduce heat gain.",
                    "Cross ventilation needs inlet and outlet openings on opposite sides.",
                    "Consider prevailing winds, rainfall intensity and drainage before placing openings.",
                    "Access and circulation: separate pedestrian and vehicle entry, and respect setbacks.",
                    "Check the site's slope; it determines plinth levels and drainage strategy."
                ],
                callout: {
                    title: "Critique language",
                    body: "Say 'the circulation is legible' or 'the service core is poorly located'. Avoid 'nice' and 'ugly'. Describe the effect, then judge it."
                }
            }
        ],
        practice: [
            { q: "What is the difference between a plan and an elevation?", a: "A plan is a horizontal section cut through the building showing spaces and walls from above. An elevation is an orthographic view of an external face showing heights without perspective." },
            { q: "Why is a north arrow essential on a drawing?", a: "It shows orientation, which determines solar exposure, prevailing wind and daylight strategy." },
            { q: "Give two passive strategies for a hot-humid climate.", a: "Cross ventilation and shading with wide roof overhangs or brise-soleil. Others include light-coloured roofs and raised floors." },
            { q: "What should a site analysis cover?", a: "Access, topography, orientation, climate, vegetation, drainage, noise, views, neighbouring buildings and available services." },
            { q: "What is a concept in architecture?", a: "The organising idea that explains the design decisions and how the building responds to brief, site and use." }
        ],
        checklist: [
            "Measure your room and draw it to 1:50 with correct line weights.",
            "Draw the plan, section and one elevation of a simple building.",
            "Analyse your hostel site for sun, wind, access and drainage.",
            "Collect ten architectural terms and write a one-line definition for each.",
            "Sketch three concepts for a small campus kiosk with written justification.",
            "Visit one building on campus and critique its circulation in 150 words.",
            "Ask your studio tutor to review your drawing conventions before submission."
        ]
    },
    {
        slug: "phy-101-general-physics-mechanics",
        code: "PHY 101",
        title: "PHY 101: General Physics I - Mechanics, Matter and Waves",
        subtitle: "Build the physical intuition and problem-solving habits that General Physics rewards",
        domain: "Faculty Primer",
        faculty: "Faculty of Physical Sciences",
        department: "Physics & Industrial Physics",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 55000,
        tags: ["PHY 101", "General Physics", "Mechanics", "Waves", "100L"],
        description: "This pack treats General Physics as a small number of powerful ideas applied repeatedly. You get a structured method for solving mechanics problems, a clear treatment of simple harmonic motion and waves, and a formula sheet with the conditions under which each formula is valid.",
        outcomes: [
            "Solve kinematics and dynamics problems using a consistent sign convention and free-body diagrams.",
            "Apply conservation of energy and momentum to collisions and connected bodies.",
            "Explain simple harmonic motion and calculate period, frequency and energy.",
            "Describe wave properties including superposition, interference and standing waves."
        ],
        sections: [
            {
                heading: "Problem-solving protocol",
                intro: "Physics marks are lost in the setup, not in the algebra. Use the same five steps every time until they are automatic.",
                numbered: [
                    "Draw a diagram and label known and unknown quantities with units.",
                    "Choose a coordinate system and state which direction is positive.",
                    "Write the relevant principle - Newton's second law, energy conservation, or momentum conservation.",
                    "Substitute symbols first, then numbers. This makes errors easier to spot and earns method marks.",
                    "Check magnitude, units and whether the direction of the answer is physically sensible."
                ],
                callout: {
                    title: "Free-body diagrams are not optional",
                    body: "If two bodies are in contact or connected by a string, draw each body separately. Most 'impossible' pulley problems become simple once the tensions and weights are separated."
                }
            },
            {
                heading: "Mechanics essentials",
                intro: "Kinematics describes motion; dynamics explains it. Keep them distinct in your answers.",
                bullets: [
                    "Equations of motion apply only when acceleration is constant.",
                    "Newton's second law: net force equals mass times acceleration. Net means the vector sum.",
                    "Friction: static friction can take any value up to the limiting value; kinetic friction is roughly constant.",
                    "Work done equals force times displacement in the direction of the force.",
                    "Conservation of mechanical energy applies only when no non-conservative forces do work.",
                    "Momentum is conserved in collisions; kinetic energy is conserved only in elastic collisions."
                ]
            },
            {
                heading: "Oscillations and waves",
                intro: "Simple harmonic motion appears in springs, pendulums, molecules and circuits. Learn the defining relationship and the rest follows.",
                bullets: [
                    "Defining condition: acceleration is proportional to displacement and directed toward equilibrium.",
                    "Period of a mass-spring system: T = 2 pi times the square root of m/k.",
                    "Period of a simple pendulum for small angles: T = 2 pi times the square root of L/g.",
                    "Total energy in SHM is proportional to the square of the amplitude.",
                    "Wave speed equals frequency times wavelength.",
                    "Superposition explains interference, beats and standing waves; nodes are points of zero displacement."
                ],
                callout: {
                    title: "Angle in radians",
                    body: "The small-angle approximation sin(theta) is approximately theta only when theta is in radians. Using degrees silently corrupts the pendulum formula."
                }
            }
        ],
        practice: [
            { q: "A body starts from rest and accelerates at 2 m/s^2 for 5 s. Find its displacement.", a: "s = ut + 0.5at^2 = 0 + 0.5 x 2 x 25 = 25 m." },
            { q: "State the condition for mechanical energy to be conserved.", a: "Only conservative forces do work; no friction, air resistance or other non-conservative force removes energy from the system." },
            { q: "A spring of constant 200 N/m is stretched 0.1 m. Find the stored energy.", a: "E = 0.5 k x^2 = 0.5 x 200 x 0.01 = 1 J." },
            { q: "A wave has frequency 50 Hz and wavelength 4 m. Find its speed.", a: "v = f x wavelength = 50 x 4 = 200 m/s." },
            { q: "Why do we draw separate free-body diagrams for connected bodies?", a: "Each body has its own forces and acceleration; separating them prevents incorrectly adding tensions and weights to the same object." }
        ],
        checklist: [
            "Write the four constant-acceleration equations and state when they apply.",
            "Solve ten problems using free-body diagrams, one per problem.",
            "Derive the period of a mass-spring system in your own steps.",
            "Draw a standing wave and label nodes and antinodes.",
            "Build a one-page formula sheet with validity conditions, not just formulas.",
            "Do one timed past-question paper and mark every lost mark by cause.",
            "Explain one mechanics topic aloud to a coursemate without notes."
        ]
    },
    {
        slug: "chm-101-general-chemistry",
        code: "CHM 101",
        title: "CHM 101: General Chemistry I - Atoms, Bonding and Reactions",
        subtitle: "The structure-and-bonding foundations behind every chemistry course you will take",
        domain: "Faculty Primer",
        faculty: "Faculty of Physical Sciences",
        department: "Pure Chemistry",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 55000,
        tags: ["CHM 101", "General Chemistry", "Atomic Structure", "Bonding", "Stoichiometry", "100L"],
        description: "CHM 101 rewards students who can move between the microscopic picture and the calculation. This pack connects atomic structure, periodicity, bonding and stoichiometry, then shows how to set up mole calculations that do not collapse under exam pressure.",
        outcomes: [
            "Describe atomic structure, electronic configuration and periodic trends with correct reasoning.",
            "Predict bond type and molecular shape using electronegativity and VSEPR theory.",
            "Balance equations and solve mole, limiting-reagent and concentration problems.",
            "Explain the behaviour of acids, bases and buffers at an introductory level."
        ],
        sections: [
            {
                heading: "Atomic structure and periodicity",
                intro: "The periodic table is not a chart to memorise; it is a map of electron configuration.",
                bullets: [
                    "Atomic number is the number of protons; mass number is protons plus neutrons.",
                    "Isotopes have the same atomic number but different mass numbers.",
                    "Electrons fill orbitals in order of increasing energy, following the Aufbau principle, Pauli exclusion principle and Hund's rule.",
                    "Atomic radius decreases across a period and increases down a group.",
                    "Ionisation energy increases across a period and decreases down a group.",
                    "Electron affinity and electronegativity follow similar trends to ionisation energy."
                ],
                callout: {
                    title: "Explain, do not just state",
                    body: "A question asking why ionisation energy increases across a period wants the effective nuclear charge argument, not a restatement of the trend."
                }
            },
            {
                heading: "Bonding and molecular shape",
                intro: "Bonding is about electrons: transfer creates ions, sharing creates covalent bonds, and unequal sharing creates polarity.",
                bullets: [
                    "Ionic bonding: metal to non-metal, lattice structures, high melting points.",
                    "Covalent bonding: shared electron pairs, discrete molecules or giant networks.",
                    "Metallic bonding: delocalised electrons explain conductivity and malleability.",
                    "Intermolecular forces: London dispersion, dipole-dipole and hydrogen bonding, in increasing strength.",
                    "VSEPR: electron pairs repel and adopt the arrangement that maximises separation.",
                    "Polar bonds do not guarantee a polar molecule; symmetry can cancel the dipoles."
                ]
            },
            {
                heading: "Moles and stoichiometry",
                intro: "Almost every calculation in CHM 101 starts with converting something into moles.",
                numbered: [
                    "Write and balance the equation first.",
                    "Convert given mass, volume or concentration into moles.",
                    "Use the balanced equation ratio to find the moles of the required substance.",
                    "Identify the limiting reagent when two reactant amounts are given.",
                    "Convert moles back to the requested unit: mass, volume of gas at stated conditions, or concentration.",
                    "Check significant figures and units."
                ],
                callout: {
                    title: "The limiting reagent test",
                    body: "Divide the moles of each reactant by its coefficient. The smallest quotient identifies the limiting reagent - not the smallest mass."
                }
            }
        ],
        practice: [
            { q: "How many moles are in 18 g of water?", a: "Molar mass of water is 18 g/mol, so 18 g is 1 mole." },
            { q: "Why is the first ionisation energy of sodium lower than that of magnesium?", a: "Sodium's outer electron is in the 3s orbital and removing it gives a stable noble-gas configuration; magnesium's electron is held by a greater effective nuclear charge, so more energy is needed." },
            { q: "Predict the shape of methane and explain it.", a: "Tetrahedral, because four bonding pairs around carbon repel equally and adopt the arrangement that maximises separation with 109.5 degree angles." },
            { q: "20 g of calcium carbonate reacts with excess acid. Find the moles of carbon dioxide produced.", a: "Molar mass of CaCO3 is about 100 g/mol, so 20 g is 0.2 mol. The reaction is 1:1, so 0.2 mol of CO2 is produced." },
            { q: "Is carbon dioxide polar?", a: "No. The C=O bonds are polar but the linear geometry makes the dipoles cancel." }
        ],
        checklist: [
            "Write electron configurations for the first 20 elements from memory.",
            "Sketch the periodic trends for radius, ionisation energy and electronegativity with reasons.",
            "Draw VSEPR shapes for five common molecules and label bond angles.",
            "Solve ten stoichiometry problems including three limiting-reagent cases.",
            "Make a one-page summary distinguishing ionic, covalent and metallic bonding.",
            "Perform a titration calculation from raw readings without a template.",
            "Attempt one past CHM 101 objective paper and review every wrong answer."
        ]
    },
    {
        slug: "mth-101-elementary-mathematics",
        code: "MTH 101",
        title: "MTH 101: Elementary Mathematics I - Algebra, Trigonometry and Sequences",
        subtitle: "Close the secondary-school gaps that make first-year mathematics feel impossible",
        domain: "Faculty Primer",
        faculty: "Faculty of Physical Sciences",
        department: "Mathematics",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 50000,
        tags: ["MTH 101", "Elementary Mathematics", "Algebra", "Trigonometry", "Sequences", "100L"],
        description: "MTH 101 assumes you already own certain algebraic habits. Many freshers do not, and the course moves fast. This pack rebuilds those habits - factorisation, indices, quadratic theory, trigonometric identities and sequences - with short explanations and worked examples that model good layout.",
        outcomes: [
            "Factorise and simplify algebraic expressions including surds and partial fractions.",
            "Solve quadratic equations and use the sum and product of roots.",
            "Apply trigonometric ratios, identities and the sine and cosine rules.",
            "Work confidently with arithmetic and geometric progressions, including sums to n terms."
        ],
        sections: [
            {
                heading: "Algebraic fluency",
                intro: "Speed and accuracy in algebra decide your grade more than clever tricks do.",
                bullets: [
                    "Know the difference of two squares, perfect squares and the factor theorem.",
                    "Rationalise surds by multiplying by the conjugate.",
                    "Solve simultaneous equations by substitution when one equation is linear.",
                    "For quadratics, use factorisation first, completing the square second and the formula last.",
                    "For ax^2 + bx + c = 0, the sum of roots is -b/a and the product is c/a.",
                    "Check answers by substitution - it takes seconds and catches sign errors."
                ],
                callout: {
                    title: "Show your line of reasoning",
                    body: "Marks are awarded for correct intermediate steps. A bare answer that is wrong earns nothing; a clear method with a slip often earns most of the marks."
                }
            },
            {
                heading: "Trigonometry that stays consistent",
                intro: "Trigonometry rewards a diagram and punishes memorised ratios applied blindly.",
                bullets: [
                    "Use the unit circle to determine the sign of each ratio in each quadrant.",
                    "Sine rule: a/sin A = b/sin B = c/sin C.",
                    "Cosine rule: a^2 = b^2 + c^2 - 2bc cos A.",
                    "Area of a triangle: half ab sin C.",
                    "Core identities: sin^2 + cos^2 = 1; tan = sin/cos; double-angle formulae.",
                    "Convert between degrees and radians before using calculus formulae."
                ]
            },
            {
                heading: "Sequences and series",
                intro: "Identify the type of sequence before touching a formula.",
                bullets: [
                    "Arithmetic progression: common difference d; nth term a + (n-1)d; sum n/2(2a + (n-1)d).",
                    "Geometric progression: common ratio r; nth term ar^(n-1); sum a(1 - r^n)/(1 - r) for r not equal to 1.",
                    "Sum to infinity exists only when the absolute value of r is less than 1, and equals a/(1 - r).",
                    "For word problems, write the first three terms explicitly to confirm the pattern.",
                    "Binomial expansion: use Pascal's triangle for small powers, the general term for larger ones."
                ]
            }
        ],
        practice: [
            { q: "Solve x^2 - 5x + 6 = 0 and state the sum and product of the roots.", a: "Factorising gives (x - 2)(x - 3) = 0, so x = 2 or 3. Sum of roots is 5 and product is 6." },
            { q: "Find the 10th term of the AP 3, 7, 11, ...", a: "a = 3, d = 4, so the 10th term is 3 + 9(4) = 39." },
            { q: "Find the sum to infinity of 8, 4, 2, ...", a: "a = 8, r = 0.5, so sum = 8/(1 - 0.5) = 16." },
            { q: "In a triangle, b = 7, c = 9 and angle A = 60 degrees. Find a.", a: "a^2 = 49 + 81 - 2(7)(9)(0.5) = 130 - 63 = 67, so a is about 8.19." },
            { q: "Simplify 1/(sqrt(3) - 1) by rationalising.", a: "Multiply numerator and denominator by sqrt(3) + 1 to get (sqrt(3) + 1)/2." }
        ],
        checklist: [
            "Write out the factorisation identities and solve ten expressions using them.",
            "Derive the quadratic formula by completing the square.",
            "Draw the unit circle and mark the signs of sine, cosine and tangent in each quadrant.",
            "Solve five triangle problems using the sine and cosine rules.",
            "Work through three AP and three GP problems including sum to infinity.",
            "Do a timed 30-question arithmetic-and-algebra drill.",
            "Review every wrong answer and name the specific rule you misapplied."
        ]
    },
    {
        slug: "csc-101-introduction-to-computer-science",
        code: "CSC 101",
        title: "CSC 101: Introduction to Computer Science - Hardware, Data and Algorithms",
        subtitle: "What actually happens inside a computer, and how to think in algorithms",
        domain: "Faculty Primer",
        faculty: "Faculty of Physical Sciences",
        department: "Computer Science",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 50000,
        tags: ["CSC 101", "Computer Science", "Binary", "Algorithms", "Hardware", "100L"],
        description: "CSC 101 is often taught as a tour of parts, but the exam tests understanding. This pack explains the stored-program model, number systems, data representation, operating systems, networks and algorithmic thinking, with worked binary and flowchart exercises.",
        outcomes: [
            "Explain the stored-program architecture and the roles of CPU, memory and storage.",
            "Convert between binary, decimal and hexadecimal and perform simple binary arithmetic.",
            "Represent text, images and sound in digital form and explain the trade-offs.",
            "Design a simple algorithm as pseudocode and a flowchart, and trace it for correctness."
        ],
        sections: [
            {
                heading: "The stored-program model",
                intro: "Modern computers follow the idea that instructions and data live in the same memory and are fetched and executed in sequence.",
                bullets: [
                    "CPU: control unit fetches and decodes, arithmetic logic unit executes.",
                    "Registers: small, fast storage inside the CPU.",
                    "Main memory: volatile, holds running programs and data.",
                    "Secondary storage: persistent, slower, larger.",
                    "Input and output devices move data between the machine and the world.",
                    "The fetch-decode-execute cycle repeats for each instruction."
                ]
            },
            {
                heading: "Number systems and data representation",
                intro: "Computers store patterns of bits. Everything else is a convention layered on top.",
                bullets: [
                    "Binary to decimal: sum each bit times its place value.",
                    "Decimal to binary: divide repeatedly by 2 and read remainders upward.",
                    "Hexadecimal groups four bits and is used for compact memory addresses and colours.",
                    "One byte is eight bits; ASCII uses seven or eight bits per character, Unicode uses variable encoding.",
                    "Images are stored as pixel values; resolution and colour depth trade quality against size.",
                    "Sound is sampled at intervals; sampling rate and bit depth determine fidelity and file size."
                ],
                callout: {
                    title: "Practice conversion by hand",
                    body: "Exams rarely allow calculators for number-system questions. Convert 156 to binary and back until it takes under a minute."
                }
            },
            {
                heading: "Algorithms, pseudocode and flowcharts",
                intro: "An algorithm is a finite, unambiguous sequence of steps that solves a problem.",
                bullets: [
                    "Sequence, selection and iteration are the three control structures.",
                    "Pseudocode should be readable by a human and precise enough to implement.",
                    "Flowchart symbols: oval for start and end, parallelogram for input/output, rectangle for process, diamond for decision.",
                    "Trace a loop by writing a table of variable values for each iteration.",
                    "Test with normal, boundary and invalid inputs.",
                    "An algorithm that produces an answer but never terminates is not correct."
                ]
            }
        ],
        practice: [
            { q: "Convert 45 to binary.", a: "45 = 32 + 8 + 4 + 1 = 101101 in binary." },
            { q: "Why is hexadecimal used in computing?", a: "Because each hex digit maps exactly to four binary bits, making long binary values shorter and easier to read." },
            { q: "List the three basic control structures.", a: "Sequence, selection (decision) and iteration (loops)." },
            { q: "Write pseudocode to find the largest of three numbers.", a: "Read a, b, c. Set max = a. If b > max then max = b. If c > max then max = c. Print max." },
            { q: "What happens during the fetch-decode-execute cycle?", a: "The CPU fetches the next instruction from memory, decodes what operation it specifies, executes it, and stores any result before repeating." }
        ],
        checklist: [
            "Convert ten numbers between binary, decimal and hexadecimal without a calculator.",
            "Draw and label the components of a computer system.",
            "Write pseudocode for three simple problems and trace each with sample inputs.",
            "Draw one flowchart using correct symbols for a decision loop.",
            "Explain the difference between RAM and secondary storage in two sentences.",
            "Learn ten computing terms and define each without jargon.",
            "Practise one CSC 101 objective paper and review every error."
        ]
    },
    {
        slug: "bio-101-introduction-to-biology",
        code: "BIO 101",
        title: "BIO 101: Introduction to Biology - Cells, Genetics and Diversity",
        subtitle: "The organising ideas of life, from the cell to ecosystems",
        domain: "Faculty Primer",
        faculty: "Faculty of Bio-Sciences",
        department: "Botany",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 50000,
        tags: ["BIO 101", "Biology", "Cell Biology", "Genetics", "Ecology", "100L"],
        description: "BIO 101 covers an enormous syllabus, so the danger is memorising isolated facts. This pack organises the course around four unifying ideas - cells, information, energy and evolution - and gives you diagram-and-label practice for the questions that always appear.",
        outcomes: [
            "Compare prokaryotic and eukaryotic cells and describe the functions of major organelles.",
            "Explain the cell cycle, mitosis and meiosis and why the distinction matters.",
            "Apply Mendelian genetics to simple crosses and interpret pedigree information.",
            "Classify organisms using binomial nomenclature and explain the basis of biological diversity."
        ],
        sections: [
            {
                heading: "Cells as the unit of life",
                intro: "Every living thing is made of cells, and every cell maintains a boundary, processes energy and stores information.",
                bullets: [
                    "Prokaryotes lack a membrane-bound nucleus; eukaryotes have one.",
                    "Nucleus: stores DNA and coordinates gene expression.",
                    "Mitochondria: site of aerobic respiration and ATP production.",
                    "Chloroplasts: photosynthesis in plants and algae.",
                    "Ribosomes: protein synthesis; rough endoplasmic reticulum folds proteins.",
                    "Cell membrane: selectively permeable phospholipid bilayer controlling exchange."
                ],
                callout: {
                    title: "Label diagrams in the exam",
                    body: "Draw large, label with straight lines, and give a function beside each label. Marks are usually split between identification and function."
                }
            },
            {
                heading: "Cell division and inheritance",
                intro: "Mitosis produces identical cells for growth; meiosis produces gametes with half the chromosome number.",
                bullets: [
                    "Mitosis: one division, two diploid daughter cells, genetically identical.",
                    "Meiosis: two divisions, four haploid cells, genetic variation through crossing over and independent assortment.",
                    "Genotype is the genetic makeup; phenotype is the observable trait.",
                    "A dominant allele is expressed when present; a recessive allele is expressed only when homozygous.",
                    "Use a Punnett square for monohybrid crosses and state ratios clearly.",
                    "Pedigrees can indicate whether a trait is dominant, recessive, autosomal or sex-linked."
                ]
            },
            {
                heading: "Energy, ecology and diversity",
                intro: "Life persists by capturing energy and cycling matter through ecosystems.",
                bullets: [
                    "Photosynthesis converts light energy into chemical energy; respiration releases it.",
                    "Food chains show energy flow; only about 10 percent passes to the next trophic level.",
                    "Nutrient cycles such as carbon, nitrogen and water connect living and non-living systems.",
                    "Binomial nomenclature: genus capitalised, species lowercase, both italicised.",
                    "Classification hierarchy: domain, kingdom, phylum, class, order, family, genus, species.",
                    "Variation plus selection is the mechanism behind adaptation and speciation."
                ]
            }
        ],
        practice: [
            { q: "State one difference between mitosis and meiosis.", a: "Mitosis produces two genetically identical diploid cells; meiosis produces four genetically varied haploid cells." },
            { q: "Why are mitochondria called the powerhouse of the cell?", a: "They carry out aerobic respiration, producing most of the cell's ATP, the energy currency." },
            { q: "Cross Aa with Aa. State the expected genotype ratio.", a: "AA : Aa : aa = 1 : 2 : 1, giving a 3:1 phenotypic ratio if A is completely dominant." },
            { q: "Write the correct binomial format for the human species.", a: "Homo sapiens - genus capitalised, species lowercase, both italicised." },
            { q: "Why is energy lost between trophic levels?", a: "Organisms use much of their energy for respiration, movement, growth and waste, so only a fraction is stored as biomass available to the next level." }
        ],
        checklist: [
            "Draw and label a eukaryotic cell with functions for eight organelles.",
            "Make a comparison table of mitosis and meiosis.",
            "Solve five monohybrid crosses and one test cross.",
            "Learn the classification hierarchy and place five organisms.",
            "Draw a food web with at least six organisms and label trophic levels.",
            "Define ten biology terms precisely without examples.",
            "Answer one past BIO 101 question with diagrams under timed conditions."
        ]
    }
]

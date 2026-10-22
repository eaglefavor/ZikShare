// Faculty primers - medicine, basic medical sciences, pharmacy and allied health.

export const FACULTY_PRIMER_PACKS_B = [
    {
        slug: "ana-101-human-anatomy",
        code: "ANA 101",
        title: "ANA 101: Human Anatomy I - Cells, Tissues and the Skeletal System",
        subtitle: "Learn anatomy by systems and relationships rather than by isolated lists",
        domain: "Faculty Primer",
        faculty: "Faculty of Basic Medical Sciences",
        department: "Human Anatomy",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 65000,
        tags: ["ANA 101", "Human Anatomy", "Histology", "Skeletal System", "100L"],
        description: "Anatomy has a reputation for impossible memorisation. It becomes manageable when you learn structures by relationship, function and clinical relevance. This pack covers anatomical terminology, tissue types, bone structure and the axial and appendicular skeleton, with a revision method built around drawing and recall.",
        outcomes: [
            "Use correct anatomical position, planes, directional terms and movement terminology.",
            "Describe the four basic tissue types and identify their functions.",
            "Explain bone structure, growth and ossification, and classify bones by shape.",
            "Name and locate the major bones of the axial and appendicular skeleton."
        ],
        sections: [
            {
                heading: "The language of anatomy",
                intro: "Precise terminology prevents dangerous ambiguity. Learn it before you learn structures.",
                bullets: [
                    "Anatomical position: standing upright, palms facing forward, feet together.",
                    "Planes: sagittal (left and right), coronal (front and back), transverse (upper and lower).",
                    "Directional terms: superior and inferior, anterior and posterior, medial and lateral, proximal and distal, superficial and deep.",
                    "Movements: flexion, extension, abduction, adduction, rotation, circumduction, pronation and supination.",
                    "Body cavities: cranial, vertebral, thoracic, abdominal and pelvic.",
                    "Regions: use the correct regional term, for example brachial for arm and femoral for thigh."
                ],
                callout: {
                    title: "Name the relationship, not just the part",
                    body: "In practicals you will be asked where a structure lies relative to another. Practise saying 'the median nerve passes medial to the brachial artery' rather than only labelling a diagram."
                }
            },
            {
                heading: "The four basic tissues",
                intro: "Organs are combinations of four tissue types, each specialised for a job.",
                bullets: [
                    "Epithelial tissue: covers and lines surfaces; classified by cell shape and layer number.",
                    "Connective tissue: supports, binds and protects; includes bone, cartilage, adipose and blood.",
                    "Muscle tissue: skeletal (voluntary, striated), cardiac (involuntary, intercalated discs), smooth (involuntary, non-striated).",
                    "Nervous tissue: neurons transmit impulses; neuroglia support and protect.",
                    "Histology requires practice at identifying tissue from appearance, not from written descriptions alone.",
                    "Always relate structure to function: thin squamous epithelium suits diffusion; stratified epithelium suits protection."
                ]
            },
            {
                heading: "Bone and the skeleton",
                intro: "Bone is living tissue that remodels throughout life, responding to load and hormonal signals.",
                bullets: [
                    "Long bone structure: diaphysis, epiphyses, periosteum, medullary cavity, articular cartilage.",
                    "Compact bone forms the outer shell; spongy bone forms the inner lattice.",
                    "Ossification: intramembranous for flat bones of the skull; endochondral for most long bones.",
                    "Bone cells: osteoblasts build, osteocytes maintain and osteoclasts resorb.",
                    "Axial skeleton: skull, vertebral column, ribs and sternum.",
                    "Appendicular skeleton: pectoral girdle, upper limbs, pelvic girdle and lower limbs."
                ],
                callout: {
                    title: "Draw from memory daily",
                    body: "Ten minutes of blank-page drawing beats an hour of highlighting. Draw, label, check, correct, repeat the next day."
                }
            }
        ],
        practice: [
            { q: "Define anatomical position.", a: "Standing erect, face forward, upper limbs by the sides with palms facing forward, and feet together." },
            { q: "Which tissue type lines the inner surface of blood vessels?", a: "Simple squamous epithelium, called endothelium, suited to diffusion and a smooth flow surface." },
            { q: "Distinguish intramembranous from endochondral ossification.", a: "Intramembranous ossification forms bone directly from mesenchyme, as in skull flat bones. Endochondral ossification replaces a cartilage model, as in most long bones." },
            { q: "Name the bone cells responsible for bone resorption.", a: "Osteoclasts." },
            { q: "Which plane divides the body into equal left and right halves?", a: "The midsagittal plane." }
        ],
        checklist: [
            "Write the anatomical position and all directional terms from memory.",
            "Draw and label a long bone with six structures.",
            "Identify the four tissue types from microscope images.",
            "Name the bones of the axial skeleton without notes.",
            "Label the bones of the upper and lower limbs on a blank diagram.",
            "Explain the roles of osteoblasts, osteocytes and osteoclasts.",
            "Practise ten spotting questions with a study partner."
        ]
    },
    {
        slug: "bcs-201-introduction-to-pathology",
        code: "BCS 201",
        title: "BCS 201: Introduction to Pathology - Disease, Injury and Repair",
        subtitle: "The core concepts of disease processes for students entering the clinical sciences",
        domain: "Faculty Primer",
        faculty: "Faculty of Basic Clinical Sciences",
        department: "Chemical Pathology",
        level: "200L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 65000,
        tags: ["BCS 201", "Pathology", "Cell Injury", "Inflammation", "Neoplasia", "200L"],
        description: "Pathology explains what goes wrong and why. This pack introduces cell injury, inflammation, repair, haemodynamics and neoplasia as a connected story, with the vocabulary you need for later clinical courses and a method for describing any pathological process.",
        outcomes: [
            "Distinguish reversible from irreversible cell injury and name common causes.",
            "Describe the stages and cells of acute inflammation and its clinical signs.",
            "Explain tissue repair, regeneration and fibrosis.",
            "Define neoplasia and distinguish benign from malignant tumours."
        ],
        sections: [
            {
                heading: "Cell injury and adaptation",
                intro: "Cells respond to stress by adapting; when adaptation fails, injury follows.",
                bullets: [
                    "Adaptations: hypertrophy, hyperplasia, atrophy and metaplasia.",
                    "Reversible injury: cellular swelling and fatty change.",
                    "Irreversible injury: mitochondrial failure, membrane damage and cell death.",
                    "Necrosis is uncontrolled cell death with inflammation; apoptosis is programmed and clean.",
                    "Common causes: hypoxia, toxins, infection, physical trauma, immune reactions and genetic defects.",
                    "Free radicals and calcium overload are recurring mechanisms of damage."
                ],
                callout: {
                    title: "Link mechanism to appearance",
                    body: "Exam answers improve immediately when you connect a mechanism - such as ATP depletion - to its morphological consequence, like swelling."
                }
            },
            {
                heading: "Inflammation and repair",
                intro: "Inflammation is a protective response that can also cause harm when excessive or prolonged.",
                bullets: [
                    "Cardinal signs: redness, heat, swelling, pain and loss of function.",
                    "Acute inflammation: vasodilation, increased permeability and neutrophil recruitment.",
                    "Chemical mediators: histamine, prostaglandins, leukotrienes and cytokines.",
                    "Chronic inflammation: mononuclear cells, tissue destruction and attempted repair occurring together.",
                    "Granulation tissue forms the scaffold for healing.",
                    "Repair may be by regeneration of the same tissue or by fibrosis with scar formation."
                ]
            },
            {
                heading: "Haemodynamics and neoplasia",
                intro: "Circulatory disturbances and uncontrolled growth account for a large share of clinical disease.",
                bullets: [
                    "Oedema results from increased hydrostatic pressure, reduced oncotic pressure, lymphatic obstruction or sodium retention.",
                    "Thrombosis is clot formation in an intact vessel; embolism is material travelling in the bloodstream.",
                    "Infarction is tissue death from ischaemia.",
                    "Neoplasia is new, autonomous growth; the cell escapes normal growth control.",
                    "Benign tumours are well circumscribed and do not metastasise; malignant tumours invade and metastasise.",
                    "Grading describes differentiation; staging describes spread."
                ]
            }
        ],
        practice: [
            { q: "Name two features that distinguish necrosis from apoptosis.", a: "Necrosis involves cell swelling, membrane rupture and inflammation; apoptosis involves cell shrinkage, membrane blebbing and no inflammation." },
            { q: "Why is swelling a sign of acute inflammation?", a: "Increased vascular permeability allows fluid and proteins to leave the vessels and accumulate in the tissue." },
            { q: "What is granulation tissue?", a: "Newly formed tissue containing capillaries, fibroblasts and inflammatory cells, forming the base for repair." },
            { q: "Differentiate grading from staging in cancer.", a: "Grading describes how differentiated the tumour cells are; staging describes the extent of spread in the body." },
            { q: "Give one mechanism of oedema in heart failure.", a: "Increased hydrostatic pressure from venous congestion drives fluid into the interstitium." }
        ],
        checklist: [
            "Define hypertrophy, hyperplasia, atrophy and metaplasia with one example each.",
            "Draw the sequence of acute inflammation and label the mediators.",
            "List the cardinal signs of inflammation and explain each mechanism.",
            "Distinguish regeneration from fibrosis in a table.",
            "Write one paragraph on how a malignant tumour differs from a benign tumour.",
            "Learn ten pathology terms and use each correctly in a sentence.",
            "Review one clinical case and identify the pathological process involved."
        ]
    },
    {
        slug: "med-101-introduction-to-medicine",
        code: "MED 101",
        title: "MED 101: Introduction to Medicine - History Taking, Ethics and Professionalism",
        subtitle: "The human and professional foundations of medical training in Nigeria",
        domain: "Faculty Primer",
        faculty: "Faculty of Medicine",
        department: "Community Medicine & Primary Health Care",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 70000,
        tags: ["MED 101", "Medicine", "History Taking", "Medical Ethics", "Professionalism", "100L"],
        description: "Medical school begins with learning how to listen. This pack introduces patient history taking, communication, confidentiality, consent and the Nigerian medical code of conduct, along with a practical study routine for a course load that punishes passive reading.",
        outcomes: [
            "Take a structured patient history using a clear sequence.",
            "Apply the four principles of biomedical ethics to common clinical scenarios.",
            "Explain confidentiality, informed consent and professional boundaries.",
            "Build a sustainable study routine for high-volume medical content."
        ],
        sections: [
            {
                heading: "Structure of a history",
                intro: "A complete history is a method, not a conversation you improvise. Practice the sequence until it becomes habitual.",
                numbered: [
                    "Bio-data and presenting complaint, in the patient's own words plus duration.",
                    "History of presenting complaint using the mnemonic for the relevant symptoms.",
                    "Past medical and surgical history, drug history, allergies.",
                    "Family, social and occupational history.",
                    "Review of systems.",
                    "Summarise back to the patient and confirm that you understood correctly."
                ],
                callout: {
                    title: "Open then closed",
                    body: "Begin with open questions such as 'tell me what brought you in', then narrow with closed questions. Jumping straight to closed questions produces incomplete histories."
                }
            },
            {
                heading: "Ethics that will actually be tested",
                intro: "Ethical reasoning is a subject with principles, not a personality trait.",
                bullets: [
                    "Autonomy: respect the patient's right to decide, supported by adequate information.",
                    "Beneficence: act in the patient's best interest.",
                    "Non-maleficence: avoid avoidable harm.",
                    "Justice: treat similar cases similarly and use scarce resources fairly.",
                    "Confidentiality: information is shared only with those involved in care or as legally required.",
                    "Informed consent requires capacity, adequate disclosure, understanding and voluntariness."
                ]
            },
            {
                heading: "Professional behaviour and self-management",
                intro: "Studies show that unprofessional behaviour in training predicts later problems. Start the habits now.",
                bullets: [
                    "Arrive early, dressed appropriately, with the tools you need.",
                    "Introduce yourself to patients and ask permission before examination.",
                    "Do not discuss patients in corridors, lifts or on WhatsApp.",
                    "Document honestly and promptly. A wrong note left uncorrected can harm a patient.",
                    "Study with spaced repetition and active recall rather than rereading slides.",
                    "Protect sleep, exercise and relationships - burnout damages clinical judgement."
                ],
                callout: {
                    title: "The code of conduct",
                    body: "Read the current Nigerian Medical and Dental Council code rather than relying on hearsay. Know the sections on confidentiality, advertising and relationships with colleagues."
                }
            }
        ],
        practice: [
            { q: "What information must a patient understand before giving valid consent?", a: "The nature of the procedure, its purpose, material risks and benefits, alternatives, and that they may refuse or withdraw." },
            { q: "Apply the principle of autonomy to a patient who refuses a blood transfusion.", a: "A competent adult may refuse treatment even if refusal risks death. The team should explain consequences, explore reasons and document the informed refusal." },
            { q: "Why should open questions come before closed questions?", a: "Open questions allow the patient to reveal concerns the clinician did not anticipate, improving diagnostic accuracy and rapport." },
            { q: "List three elements of a complete drug history.", a: "Current medications including doses, adherence, allergies and adverse reactions, and over-the-counter or herbal use." },
            { q: "Give one way a student can breach confidentiality unintentionally.", a: "Discussing a patient in a public space or sharing clinical images on a personal phone or social-media group." }
        ],
        checklist: [
            "Practise a full history on two friends and time yourself under ten minutes.",
            "Write definitions of the four principles of biomedical ethics with an example each.",
            "Read the current MDCN code of conduct and list five key duties.",
            "Draft your own consultation opening and closing phrases.",
            "Explain informed consent in a three-sentence answer from memory.",
            "Set up a spaced-repetition routine for anatomy and physiology.",
            "Shadow a clinical posting and write a one-page reflection."
        ]
    },
    {
        slug: "pha-101-introduction-to-pharmacy",
        code: "PHA 101",
        title: "PHA 101: Introduction to Pharmacy - Drugs, Dosage Forms and the Pharmacist's Role",
        subtitle: "Orientation to pharmacy practice, drug nomenclature and pharmaceutical calculations",
        domain: "Faculty Primer",
        faculty: "Faculty of Pharmaceutical Sciences",
        department: "Pharmaceutics & Pharmaceutical Technology",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 60000,
        tags: ["PHA 101", "Pharmacy", "Dosage Forms", "Pharmaceutical Calculations", "100L"],
        description: "This pack orients new pharmacy students to the profession, explains drug nomenclature and dosage forms, and drills the pharmaceutical calculations that catch students out in early assessments, including percentage concentrations, dilutions and dose calculations.",
        outcomes: [
            "Explain the pharmacist's roles in dispensing, counselling, compounding and pharmacovigilance.",
            "Distinguish chemical, generic and brand names and discuss bioequivalence.",
            "Classify dosage forms and explain how the route of administration affects onset and bioavailability.",
            "Perform percentage, dilution and dose calculations accurately with correct units."
        ],
        sections: [
            {
                heading: "What pharmacy is for",
                intro: "Pharmacy is the science and practice of preparing and using medicines safely and effectively.",
                bullets: [
                    "Dispensing: verifying the prescription, preparing and labelling the medicine.",
                    "Counselling: explaining dose, frequency, duration, storage and side effects to the patient.",
                    "Compounding: extemporaneous preparation where no commercial product fits.",
                    "Pharmacovigilance: detecting, assessing and reporting adverse drug reactions.",
                    "Regulation: controlled drugs, prescription requirements and record keeping.",
                    "Medication reconciliation and adherence support reduce avoidable harm."
                ],
                callout: {
                    title: "The pharmacist's check",
                    body: "Right patient, right drug, right dose, right route, right time and right documentation. Any doubt is a reason to stop and verify, not to guess."
                }
            },
            {
                heading: "Names, dosage forms and bioavailability",
                intro: "Names and formulations are not trivia; they determine how a medicine behaves in the body.",
                bullets: [
                    "Chemical name describes structure; generic name is the internationally accepted non-proprietary name; brand name is the manufacturer's trade name.",
                    "Bioavailability is the fraction of an administered dose that reaches systemic circulation unchanged.",
                    "Bioequivalence means two products deliver the same rate and extent of absorption within accepted limits.",
                    "Oral solid forms: tablets, capsules, granules. Modified-release designs alter release rate.",
                    "Liquid forms: solutions, suspensions, emulsions; shake suspensions before measuring.",
                    "Parenteral, topical, rectal, inhaled and ophthalmic routes each have distinct advantages and risks."
                ]
            },
            {
                heading: "Calculations without panic",
                intro: "Set every calculation out in one consistent format: known, required, conversion, equation, answer with units.",
                bullets: [
                    "Percentage weight in volume and weight in weight are not interchangeable; read what the label states.",
                    "Dilution: C1 x V1 = C2 x V2, with concentrations in the same unit.",
                    "Dose by body weight: dose in mg per kg multiplied by weight in kg, then checked against the maximum adult dose.",
                    "Dose by body surface area requires the stated formula and correctly converted height and weight.",
                    "Alligation solves mixing problems between two strengths.",
                    "Always sanity-check: an answer that implies 40 tablets per dose is almost certainly wrong."
                ],
                callout: {
                    title: "Units decide safety",
                    body: "Milligrams and micrograms differ by a factor of 1000. A decimal slip can be fatal. Convert to the same unit before calculating and write the unit at every step."
                }
            }
        ],
        practice: [
            { q: "A prescription requires 250 mg and the stock is a 5 percent w/v solution. What volume is needed?", a: "Five percent w/v is 5 g per 100 mL, or 50 mg per mL. 250 mg therefore requires 5 mL." },
            { q: "Dilute 100 mL of a 20 percent solution to 500 mL. What is the final concentration?", a: "C1V1 = C2V2 gives 20 x 100 = C2 x 500, so C2 = 4 percent." },
            { q: "What is bioequivalence?", a: "The absence of a significant difference in the rate and extent to which the active ingredient becomes available at the site of action between two products." },
            { q: "Why must a suspension be shaken before use?", a: "The dispersed particles settle, so shaking redistributes them and ensures the measured dose is representative." },
            { q: "A child weighs 20 kg and the dose is 10 mg/kg per day in two divided doses. What is each dose?", a: "The daily dose is 200 mg, divided into two doses of 100 mg each." }
        ],
        checklist: [
            "List six roles of a pharmacist and one example of each.",
            "Explain chemical, generic and brand names in one sentence each.",
            "Make a table of dosage forms with two advantages and two disadvantages.",
            "Solve ten percentage and dilution calculations showing all units.",
            "Memorise the right-patient checking list.",
            "Practise weighing and measuring in the laboratory with a supervisor.",
            "Read the current NAFDAC or PCN guidance on dispensing and write five key points."
        ]
    },
    {
        slug: "nur-101-fundamentals-of-nursing",
        code: "NUR 101",
        title: "NUR 101: Fundamentals of Nursing - Care, Assessment and Safety",
        subtitle: "The first-year foundations of safe, dignified patient care",
        domain: "Faculty Primer",
        faculty: "Faculty of Health Sciences & Technology",
        department: "Nursing Sciences",
        level: "100L",
        material_type: "lab-manuals",
        subcategory: "lab-manuals",
        priceKobo: 60000,
        tags: ["NUR 101", "Nursing", "Patient Safety", "Vital Signs", "Infection Control", "100L"],
        description: "Nursing fundamentals are assessed both in written papers and in the skills laboratory. This pack explains the nursing process, vital signs, infection prevention and patient safety, and includes a skills-practice log you can bring to demonstrations.",
        outcomes: [
            "Describe the steps of the nursing process and apply them to a simple scenario.",
            "Measure and interpret temperature, pulse, respiration, blood pressure and oxygen saturation.",
            "Explain standard precautions and correct hand-hygiene technique.",
            "Identify common patient-safety risks and the nursing actions that prevent harm."
        ],
        sections: [
            {
                heading: "The nursing process",
                intro: "Assessment, diagnosis, planning, implementation and evaluation form a cycle, not a linear checklist.",
                bullets: [
                    "Assessment: collect subjective and objective data systematically.",
                    "Diagnosis: identify the patient's actual or potential health problems in nursing language.",
                    "Planning: set measurable, patient-centred goals and select interventions.",
                    "Implementation: carry out care safely and document it.",
                    "Evaluation: compare outcomes with goals and revise the plan.",
                    "Documentation is part of care; if it is not recorded, it is treated as not done."
                ]
            },
            {
                heading: "Vital signs and observation",
                intro: "Vital signs are the earliest warning system you have. Accuracy matters more than speed.",
                bullets: [
                    "Normal adult ranges: temperature about 36.1 to 37.2 C, pulse 60 to 100 beats per minute, respiration 12 to 20 per minute.",
                    "Blood pressure is recorded as systolic over diastolic; use the correct cuff size.",
                    "Count respirations for a full minute without telling the patient, to avoid altering the rate.",
                    "Report trends, not single readings: a rising pulse with falling pressure is a warning sign.",
                    "Record the time, site and position used for blood pressure measurement.",
                    "Pain is a vital sign and must be assessed with a consistent scale."
                ],
                callout: {
                    title: "Escalate early",
                    body: "A deteriorating patient rarely crashes without warning. Track early-warning scores and escalate according to your facility's protocol rather than waiting for the next round."
                }
            },
            {
                heading: "Infection control and safety",
                intro: "Most hospital-acquired infection is preventable with consistent basic practice.",
                bullets: [
                    "Standard precautions apply to every patient regardless of diagnosis.",
                    "Hand hygiene before and after patient contact, after body-fluid exposure and after removing gloves.",
                    "Use gloves, aprons, masks and eye protection according to risk; remove them correctly.",
                    "Sharps go straight into a puncture-resistant container; never recap a needle by hand.",
                    "Identify the patient using at least two identifiers before any intervention.",
                    "Prevent falls: call bell in reach, bed at correct height, brakes on, clutter cleared."
                ]
            }
        ],
        practice: [
            { q: "List the five steps of the nursing process.", a: "Assessment, diagnosis, planning, implementation and evaluation." },
            { q: "Why should respirations be counted without informing the patient?", a: "Awareness can cause the patient to alter their breathing pattern, producing an inaccurate reading." },
            { q: "What are standard precautions?", a: "Infection-control practices applied to all patients, including hand hygiene, appropriate personal protective equipment, safe sharps handling and safe waste disposal." },
            { q: "Give two nursing actions to prevent falls.", a: "Keep the call bell within reach and the bed at the lowest safe height with brakes locked. Remove clutter and ensure adequate lighting." },
            { q: "Differentiate subjective from objective data.", a: "Subjective data are what the patient reports, such as pain. Objective data are measurable findings, such as temperature or a wound appearance." }
        ],
        checklist: [
            "Write the nursing process from memory with one example per step.",
            "Practise taking all five vital signs on a partner and record them correctly.",
            "Demonstrate hand hygiene using the approved technique.",
            "List the sequence for donning and removing personal protective equipment.",
            "Identify ten fall and pressure-injury risks in a ward layout.",
            "Complete a skills-practice log entry with a supervisor's signature.",
            "Read your school's incident-reporting policy and summarise it in five lines."
        ]
    },
    {
        slug: "mls-101-introduction-to-medical-laboratory-science",
        code: "MLS 101",
        title: "MLS 101: Introduction to Medical Laboratory Science - Specimens, Safety and Accuracy",
        subtitle: "How laboratory results are produced, and why pre-analytical errors matter",
        domain: "Faculty Primer",
        faculty: "Faculty of Medical Laboratory Science",
        department: "Medical Laboratory Science",
        level: "100L",
        material_type: "lab-manuals",
        subcategory: "lab-manuals",
        priceKobo: 60000,
        tags: ["MLS 101", "Medical Laboratory Science", "Specimen Collection", "Lab Safety", "Quality Control", "100L"],
        description: "Most laboratory errors happen before the sample reaches the analyser. This pack introduces the laboratory disciplines, specimen collection and handling, biosafety, quality control and the meaning of reference ranges, with practical checklists for the teaching laboratory.",
        outcomes: [
            "Describe the major laboratory disciplines and the specimen types each handles.",
            "Explain the pre-analytical, analytical and post-analytical phases of testing.",
            "Apply biosafety and waste-disposal rules in a teaching laboratory.",
            "Interpret quality-control results and explain reference ranges."
        ],
        sections: [
            {
                heading: "The laboratory disciplines",
                intro: "Medical laboratory science is a set of specialised diagnostic disciplines, each with its own methods and quality concerns.",
                bullets: [
                    "Haematology: blood counts, haemoglobin, coagulation and blood film morphology.",
                    "Clinical chemistry: electrolytes, enzymes, glucose, renal and liver function.",
                    "Medical microbiology: culture, identification and antimicrobial susceptibility testing.",
                    "Histopathology and cytopathology: tissue and cell examination.",
                    "Immunology and serology: antibody and antigen detection.",
                    "Blood transfusion science: grouping, cross-matching and component therapy."
                ]
            },
            {
                heading: "The three phases of testing",
                intro: "A result is only as reliable as the weakest phase in the chain.",
                bullets: [
                    "Pre-analytical: patient preparation, collection timing, correct tube, adequate volume, labelling, transport and storage.",
                    "Analytical: calibration, reagent quality, instrument maintenance and technician competence.",
                    "Post-analytical: result validation, reporting, critical-value communication and record retention.",
                    "Haemolysis, delayed transport and under-filled tubes are common causes of rejected samples.",
                    "Label at the bedside, never in advance, and never relabel a specimen.",
                    "Critical results must be phoned to the clinician and documented."
                ],
                callout: {
                    title: "Rejection is a safety feature",
                    body: "Rejecting a wrongly labelled sample protects the patient from a result belonging to someone else. Never 'fix' a label."
                }
            },
            {
                heading: "Biosafety and quality control",
                intro: "The laboratory is a controlled environment with rules that exist for a reason.",
                bullets: [
                    "Treat all specimens as potentially infectious.",
                    "No eating, drinking, applying cosmetics or storing food in the laboratory.",
                    "Use a biological safety cabinet for procedures that generate aerosols.",
                    "Decontaminate surfaces before and after work; separate clean from dirty zones.",
                    "Sharps into puncture-resistant containers; chemical and biological waste segregated.",
                    "Quality control: run control materials, plot Levey-Jennings charts and stop testing when results fall outside acceptable limits."
                ]
            }
        ],
        practice: [
            { q: "Name the three phases of laboratory testing.", a: "Pre-analytical, analytical and post-analytical." },
            { q: "Give three causes of specimen rejection.", a: "Mislabelled specimen, inadequate volume, haemolysed sample, wrong container or delayed transport." },
            { q: "What is a reference range?", a: "The interval within which results from a defined healthy population usually fall, used as a guide for interpretation and not a diagnosis." },
            { q: "Why are control materials run with patient samples?", a: "To verify that the analytical system is performing within acceptable limits before patient results are reported." },
            { q: "State two biosafety rules for the laboratory.", a: "Treat all specimens as infectious and never eat, drink or store food in the laboratory. Others include using PPE and decontaminating surfaces." }
        ],
        checklist: [
            "Match each laboratory discipline to two tests it performs.",
            "Write the three phases of testing and list two errors in each.",
            "Practise correct labelling technique with a supervisor.",
            "Demonstrate hand hygiene and PPE use in the laboratory.",
            "Interpret a simple Levey-Jennings chart and state when to stop testing.",
            "Learn ten laboratory safety rules and explain the reason for each.",
            "Complete one laboratory practical report with methods, observations and sources of error."
        ]
    }
]

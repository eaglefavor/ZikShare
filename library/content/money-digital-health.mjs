// Money, career, digital-skills and wellbeing packs.

export const MONEY_DIGITAL_HEALTH_PACKS = [
    {
        slug: "student-budgeting-and-saving",
        code: null,
        title: "Student Budgeting and Saving: Make Your Allowance Last the Month",
        subtitle: "A simple budget you can keep on your phone, and rules for spending decisions",
        domain: "Money & Career",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["Budgeting", "Money", "Saving", "Financial Literacy", "100L"],
        description: "Running out of money mid-month is usually a planning problem rather than an income problem. This pack shows you how to track spending for one week, build a realistic monthly budget, separate needs from wants, and create a small emergency fund without pretending rice is optional.",
        outcomes: [
            "Track actual spending and identify waste without guilt.",
            "Build a monthly budget based on real categories and costs.",
            "Apply a rule for separating needs, wants and emergencies.",
            "Start a modest emergency fund and avoid predatory borrowing."
        ],
        sections: [
            {
                heading: "Know where the money goes",
                intro: "You cannot budget what you have not measured. Track for seven days before changing anything.",
                bullets: [
                    "Record every payment, including small transport and data top-ups.",
                    "Group spending into food, transport, data, accommodation, academic materials, social and other.",
                    "Compare planned and actual totals at the end of the week.",
                    "Find the leak categories: often snacks, unplanned outings and duplicate data bundles.",
                    "Keep tracking for a month before making big changes.",
                    "A notebook works; a spreadsheet or notes app works too."
                ]
            },
            {
                heading: "Build the budget",
                intro: "A budget is a plan for money you have, not a wish list.",
                numbered: [
                    "Estimate total monthly income: allowance, support, side income.",
                    "Put fixed costs first: rent, transport, feeding, data, academic materials.",
                    "Set a realistic food figure using actual meal costs, not wishful numbers.",
                    "Allocate a small social and discretionary amount deliberately.",
                    "Set aside a fixed amount for savings and emergencies before spending.",
                    "Adjust after the first month using real data, not optimism."
                ],
                callout: {
                    title: "Pay yourself first",
                    body: "Move the savings amount out of the spending account at the start of the month. What remains is the budget; savings are not what is left over."
                }
            },
            {
                heading: "Saving and borrowing rules",
                intro: "Small, consistent savings beat occasional large intentions.",
                bullets: [
                    "Aim for a small buffer that covers transport, food and one unexpected cost.",
                    "Use a separate account or wallet so the money is less visible.",
                    "Never borrow to fund a want; borrow only for a genuine emergency.",
                    "Avoid loan apps with short tenors and extreme fees.",
                    "Never guarantee a loan for a friend or share your account details.",
                    "Review your budget monthly and keep one record of what worked."
                ]
            }
        ],
        practice: [
            { q: "Why track spending before budgeting?", a: "Actual data reveals real costs and leaks; budgets built on guesses usually fail in week two." },
            { q: "What is 'pay yourself first'?", a: "Setting aside savings at the start of the month before discretionary spending begins." },
            { q: "Give two examples of want disguised as need.", a: "A second pair of fashionable shoes and an upgraded phone when the current one works." },
            { q: "Why are short-tenor loan apps risky?", a: "They often carry very high fees and penalties, and easy access encourages borrowing for non-essential spending." },
            { q: "What should an emergency fund cover?", a: "Unexpected costs such as medical treatment, emergency transport or replacing a lost essential item." }
        ],
        checklist: [
            "Track every expense for seven days.",
            "Categorise spending and find three leaks.",
            "Build a monthly budget with fixed and variable costs.",
            "Open a separate savings wallet or account.",
            "Set a fixed monthly savings amount.",
            "Review the month honestly and adjust one category.",
            "Write a personal rule for borrowing."
        ]
    },
    {
        slug: "side-hustles-and-freelancing",
        code: null,
        title: "Side Hustles and Freelancing: Earn Without Damaging Your Degree",
        subtitle: "Find a skill, price it fairly, and get paid without being scammed",
        domain: "Money & Career",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["Freelancing", "Side Hustle", "Income", "Clients", "100L"],
        description: "Many students want income but start with no skill and no plan. This pack helps you choose a realistic hustle, build one service people actually pay for, price it, find your first five clients and avoid the scams that target young freelancers.",
        outcomes: [
            "Choose a side hustle that fits your skills, timetable and capital.",
            "Package one clear service and price it with a simple method.",
            "Find and convert your first clients without spamming.",
            "Protect yourself with deposits, written scope and clear delivery terms."
        ],
        sections: [
            {
                heading: "Pick a realistic hustle",
                intro: "Match the hustle to your time, capital and existing skill.",
                bullets: [
                    "Service hustles need time and skill, not capital: writing, design, tutoring, virtual assistance, transcription, social media management.",
                    "Product hustles need capital and storage: reselling, food, print and design.",
                    "Skill-based hustles pay more over time because the skill compounds.",
                    "Avoid anything requiring upfront payment to 'unlock' jobs.",
                    "Avoid gambling, betting syndicates and get-rich-quick schemes presented as business.",
                    "Choose one and give it ninety days before judging it."
                ]
            },
            {
                heading: "Package and price",
                intro: "Clients buy outcomes, not effort.",
                bullets: [
                    "Describe the service as a deliverable: 'a 1,500-word SEO article with five sources'.",
                    "Set a minimum price rather than charging by hour at the start.",
                    "Calculate your cost of delivery: data, transport, software, time.",
                    "Charge a deposit for custom work, especially with new clients.",
                    "Raise your price when demand exceeds your capacity, not when you feel brave.",
                    "Put scope, revisions and deadline in writing for every job."
                ],
                callout: {
                    title: "Cheap clients are expensive",
                    body: "A client who argues about a fair price before hiring usually argues about everything after delivery."
                }
            },
            {
                heading: "Find clients and get paid safely",
                intro: "Your first clients are usually closer than you think.",
                bullets: [
                    "Start with people who already know your work: classmates, departments, small businesses nearby.",
                    "Build a simple portfolio of three samples, even if self-initiated.",
                    "Use a clear profile and one platform consistently.",
                    "Send specific messages referencing the client's actual need.",
                    "Receive payment before delivering final files, or split into deposit and balance.",
                    "Keep records of income and be transparent about it."
                ]
            }
        ],
        practice: [
            { q: "Name two service hustles with low startup capital.", a: "Tutoring and freelance writing. Virtual assistance, transcription and social media management are also low-capital." },
            { q: "Why is a written scope important?", a: "It prevents endless revisions and disagreements about what was promised." },
            { q: "How should you price your first service?", a: "Calculate delivery cost, check what comparable services charge, set a minimum acceptable price and avoid underpricing to win work." },
            { q: "What is a deposit for?", a: "It reduces the risk of a client refusing to pay after work has begun and confirms commitment." },
            { q: "Why avoid hustles that require paying to get a job?", a: "Legitimate employers pay workers; upfront fees are a common fraud pattern." }
        ],
        checklist: [
            "List three skills you already have.",
            "Choose one service and write its deliverable in one sentence.",
            "Create three sample works for your portfolio.",
            "Write a client message template that is specific, not generic.",
            "Set your minimum price and deposit policy.",
            "Pitch five potential clients this week.",
            "Record every job, payment and client contact."
        ]
    },
    {
        slug: "scholarships-grants-and-financial-aid",
        code: null,
        title: "Scholarships, Grants and Financial Aid: Apply Without Wasting Money",
        subtitle: "Find legitimate opportunities, prepare documents early and write a strong application",
        domain: "Money & Career",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["Scholarships", "Financial Aid", "Grants", "Applications", "100L"],
        description: "Scholarship information is scattered and often surrounded by fraud. This pack explains where legitimate opportunities are announced, how to prepare a reusable document pack, how to write a personal statement that does not sound generic, and how to recognise fake portals.",
        outcomes: [
            "Identify credible sources of scholarship and grant information.",
            "Prepare a reusable application document pack.",
            "Write a specific personal statement and request references properly.",
            "Recognise and avoid scholarship scams."
        ],
        sections: [
            {
                heading: "Where legitimate opportunities live",
                intro: "Reliable information comes from institutions, not from forwarded messages.",
                bullets: [
                    "University scholarship offices, faculty notice boards and official websites.",
                    "Federal and state scholarship boards, and their verified portals.",
                    "Corporate foundations and professional bodies in Nigeria.",
                    "Embassy and international development programmes.",
                    "Departmental and alumni awards, which are often under-applied for.",
                    "Verify every opportunity on an official domain before submitting anything."
                ]
            },
            {
                heading: "Prepare once, apply many times",
                intro: "Most applications ask for the same material. Build a pack.",
                bullets: [
                    "Academic transcripts or results, admission letter and student ID.",
                    "A current CV of one page.",
                    "A personal statement of 500 to 800 words that you can adapt.",
                    "Two academic references with up-to-date contact details.",
                    "Passport photographs in the required specification.",
                    "Certificates and evidence of leadership or volunteering."
                ],
                callout: {
                    title: "Legitimate schemes do not ask for payment",
                    body: "Application fees and 'processing charges' from unknown portals are a warning sign. Confirm with the institution before paying anything."
                }
            },
            {
                heading: "Write it specifically",
                intro: "Reviewers read many similar statements. Specificity is your advantage.",
                numbered: [
                    "Open with a concrete moment that explains your direction, not a quotation.",
                    "State your course and the problem you want to work on.",
                    "Give evidence: results, projects, responsibilities, measurable outcomes.",
                    "Explain why this specific scheme, not any scholarship.",
                    "Describe what you will do afterwards in concrete terms.",
                    "Edit for length, clarity and one consistent tense."
                ]
            }
        ],
        practice: [
            { q: "Name three credible sources of scholarship information.", a: "The university scholarship office, federal or state scholarship boards, and verified corporate foundation websites." },
            { q: "What is a warning sign of a scholarship scam?", a: "A request for an application or processing fee, especially through a personal account or unofficial link." },
            { q: "What should a personal statement avoid?", a: "Generic quotations, vague claims about being hardworking, and text that could apply to any applicant or scholarship." },
            { q: "How should you request a reference?", a: "Ask in advance, in person or by a clear message, provide your CV and the deadline, and follow up politely." },
            { q: "Why build a reusable document pack?", a: "It reduces the time per application and prevents missing documents when a deadline is short." }
        ],
        checklist: [
            "Write down five credible scholarship sources to monitor.",
            "Assemble your document pack in one folder.",
            "Draft a 600-word personal statement.",
            "Ask two referees and confirm their contact details.",
            "Prepare a one-page CV.",
            "Verify one opportunity through an official channel.",
            "Apply to at least one scheme this semester."
        ]
    },
    {
        slug: "cv-interviews-and-internships",
        code: null,
        title: "CV, Interviews and Internships: Get Your First Real Opportunity",
        subtitle: "Turn a thin CV into a credible application and interview well with little experience",
        domain: "Money & Career",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["CV", "Interviews", "Internships", "Career", "100L"],
        description: "Freshers often believe they have nothing to put on a CV. This pack shows how to convert coursework, volunteering and side projects into evidence of skill, structure a one-page CV, prepare for common interview questions and approach internships without waiting for third year.",
        outcomes: [
            "Build a one-page CV with clear, evidence-based bullet points.",
            "Convert coursework and activities into demonstrable skills.",
            "Prepare answers for common interview questions using a structured method.",
            "Find and approach internship opportunities professionally."
        ],
        sections: [
            {
                heading: "A CV that survives screening",
                intro: "A recruiter skims for relevance. Make the first screen easy.",
                bullets: [
                    "One page, clean layout, consistent formatting, no photograph unless requested.",
                    "Order: contact, education, skills, experience and projects, leadership, references.",
                    "Use action verbs and quantify where possible: 'organised five tutorials for 30 students'.",
                    "Tailor the top third of the CV to the opportunity.",
                    "Remove secondary-school details once you have university results.",
                    "Check spelling of names, dates and contact details."
                ],
                callout: {
                    title: "No experience is still experience",
                    body: "Course projects, volunteering, tutoring, a small business and committee roles all demonstrate reliability and skill. Describe what you did and the result."
                }
            },
            {
                heading: "Interview preparation",
                intro: "Preparation is visible. Practise in full sentences, not in your head.",
                bullets: [
                    "Prepare a two-minute introduction covering who you are, what you study and what you want.",
                    "Use the situation-action-result structure for behavioural questions.",
                    "Prepare examples for teamwork, conflict, failure and initiative.",
                    "Research the organisation enough to ask one intelligent question.",
                    "Prepare your own questions about the role and expectations.",
                    "Dress appropriately, arrive early and switch off your phone."
                ]
            },
            {
                heading: "Finding internships and attachments",
                intro: "Start earlier than the deadline and use more than one channel.",
                bullets: [
                    "Departmental industrial training coordinators and notice boards.",
                    "Faculty and alumni networks; a warm introduction beats a cold email.",
                    "Small firms and startups, which are often more accessible than large companies.",
                    "Professional associations and student chapters.",
                    "A short email stating what you study, what you can do and what you are asking for.",
                    "Follow up once after a week; persistence done politely is not harassment."
                ]
            }
        ],
        practice: [
            { q: "How should a CV bullet point be written?", a: "Start with an action verb, state what you did and include a result or scale, for example 'managed a WhatsApp group of 120 students and increased assignment submission rates'." },
            { q: "What does the situation-action-result structure mean?", a: "Describe the context, the action you took and the result achieved, so the interviewer can assess your behaviour." },
            { q: "Why tailor a CV for each application?", a: "Screening looks for relevance; tailored documents show alignment with the specific role." },
            { q: "What should you include in an internship enquiry email?", a: "Your course and level, relevant skills, the specific attachment you are requesting, dates and availability, and a polite request for consideration." },
            { q: "How should you follow up on an application?", a: "Send one concise, polite message after about a week, restating your interest and availability." }
        ],
        checklist: [
            "Write a one-page CV and have it reviewed by a senior colleague.",
            "List five skills with one concrete example each.",
            "Write your two-minute self-introduction.",
            "Prepare answers for three behavioural questions.",
            "Identify three organisations you can approach.",
            "Send one internship enquiry email.",
            "Practise a mock interview with a friend."
        ]
    },
    {
        slug: "entrepreneurship-from-idea-to-first-customer",
        code: null,
        title: "Entrepreneurship for Students: From Idea to First Paying Customer",
        subtitle: "Validate a business idea cheaply before you spend money on it",
        domain: "Money & Career",
        faculty: "General Studies (GST / CED)",
        department: "Centre for Entrepreneurship Development (CED)",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["Entrepreneurship", "Business", "Customers", "Validation", "CED", "100L"],
        description: "Most student businesses fail because nobody wanted the product, not because the owner lacked passion. This pack teaches problem-first thinking, cheap validation, unit economics and a first-sale plan, with Nigerian campus examples you can test within a week.",
        outcomes: [
            "Identify a real problem and define a specific customer.",
            "Validate demand before investing capital.",
            "Calculate simple unit economics and a break-even point.",
            "Plan and execute a first sale, then decide whether to continue."
        ],
        sections: [
            {
                heading: "Start from a problem",
                intro: "A business exists to solve a problem someone will pay to remove.",
                bullets: [
                    "Define the customer narrowly: '200-level engineering students in hostels' rather than 'students'.",
                    "Describe the problem in their words, not yours.",
                    "Check whether they currently solve it and how much that costs them.",
                    "Avoid ideas that rely on everyone adopting a new habit.",
                    "Look for frequent, painful and urgent problems.",
                    "Write one problem statement before writing a business plan."
                ]
            },
            {
                heading: "Validate cheaply",
                intro: "Do not build first and ask later.",
                numbered: [
                    "Talk to ten real potential customers without pitching.",
                    "Ask what they do now, what it costs and what frustrates them.",
                    "Offer a manual version of the service to three people for a small fee.",
                    "Record whether they pay, not whether they say it is a good idea.",
                    "Adjust the offer based on what they actually paid for.",
                    "Only buy stock or build a product after evidence of willingness to pay."
                ],
                callout: {
                    title: "Compliments are not demand",
                    body: "'That is a nice idea' costs nothing. Payment, a deposit or a pre-order is evidence."
                }
            },
            {
                heading: "Unit economics and the first sale",
                intro: "A business that loses money on every sale cannot grow out of the problem.",
                bullets: [
                    "Price minus variable cost equals contribution per unit.",
                    "Calculate break-even: fixed costs divided by contribution per unit.",
                    "Count your own time as a cost, even if you do not pay yourself yet.",
                    "Start with a narrow offer and deliver it excellently.",
                    "Collect feedback and one testimonial from the first customer.",
                    "Decide honestly after 30 days: continue, adjust or stop."
                ]
            }
        ],
        practice: [
            { q: "Why define a narrow customer segment?", a: "Narrow segments make it easier to find customers, understand their problems and tailor an offer that they will actually pay for." },
            { q: "What is the difference between validation and asking for opinions?", a: "Validation measures actual behaviour such as payment or pre-order; opinions are cheap and often polite." },
            { q: "Contribution per unit is 400 and fixed costs are 8,000. Find break-even.", a: "8,000 divided by 400 equals 20 units." },
            { q: "Why should you not buy stock before validating?", a: "Unsold stock ties up capital and turns an unproven idea into a loss." },
            { q: "What should you do after the first sale?", a: "Deliver well, collect feedback and a testimonial, and use the evidence to decide whether to continue, adjust or stop." }
        ],
        checklist: [
            "Write one problem statement in your customer's words.",
            "Interview ten potential customers without pitching.",
            "Calculate the variable cost of your offer.",
            "Set a price and calculate break-even.",
            "Run a manual version of the service for three customers.",
            "Collect one testimonial.",
            "Review results after 30 days and make a decision."
        ]
    },
    {
        slug: "word-excel-and-powerpoint-for-assignments",
        code: null,
        title: "Word, Excel and PowerPoint: Produce Assignments That Look Professional",
        subtitle: "The practical software skills behind clean reports, data work and presentations",
        domain: "Digital Skills",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["Microsoft Word", "Excel", "PowerPoint", "Digital Skills", "Assignments", "100L"],
        description: "A well-formatted report signals care; a spreadsheet that recalculates saves hours; a clear slide deck earns attention. This pack covers the specific features students actually need: styles, table of contents, page numbering, formulas, charts and presentation structure.",
        outcomes: [
            "Format a long assignment using styles, headings and automatic page numbering.",
            "Insert a table of contents, figures and captions correctly.",
            "Use core Excel formulas, absolute references and simple charts.",
            "Design and deliver a short academic presentation."
        ],
        sections: [
            {
                heading: "Word: format once, not by hand",
                intro: "Manual formatting breaks the moment you edit. Use styles.",
                bullets: [
                    "Apply Heading 1, 2 and 3 styles to structure the document.",
                    "Insert an automatic table of contents from the References tab.",
                    "Add page numbers with a different first page where required.",
                    "Use captions for figures and tables, then cross-reference them.",
                    "Set consistent line spacing, margins and justified body text.",
                    "Use track changes for group work and accept changes deliberately."
                ]
            },
            {
                heading: "Excel: formulas that survive editing",
                intro: "The point of a spreadsheet is recalculation.",
                bullets: [
                    "Start every formula with equals and use cell references, not typed numbers.",
                    "Relative references shift; dollar signs lock a row or column as absolute.",
                    "Core functions: SUM, AVERAGE, COUNT, IF, VLOOKUP or XLOOKUP.",
                    "Sort and filter before analysing; keep raw data on a separate sheet.",
                    "Create charts from a clean table and label axes with units.",
                    "Check totals independently rather than trusting the output."
                ],
                callout: {
                    title: "The absolute reference habit",
                    body: "When copying a formula down a column, lock any cell it must keep referring to with dollar signs. This single habit prevents most spreadsheet errors."
                }
            },
            {
                heading: "PowerPoint: slides support you",
                intro: "Slides are visual aids, not a script.",
                bullets: [
                    "One idea per slide, stated in the title as a sentence.",
                    "Use a readable font size and high contrast.",
                    "Prefer a simple chart or diagram over a wall of text.",
                    "Keep to a consistent template, colour and alignment.",
                    "Rehearse timing and transitions; do not read the slides.",
                    "Prepare for questions with two backup slides of evidence."
                ]
            }
        ],
        practice: [
            { q: "Why use Word styles instead of manual formatting?", a: "Styles apply consistent formatting and allow automatic tables of contents, navigation and easier edits." },
            { q: "What does a dollar sign do in an Excel reference?", a: "It locks the column or row so the reference does not change when the formula is copied." },
            { q: "Write a formula to average cells B2 to B10.", a: "=AVERAGE(B2:B10)" },
            { q: "How many ideas should a slide carry?", a: "One. Additional ideas belong on separate slides." },
            { q: "How do you verify an Excel total independently?", a: "Recalculate using a different method, such as manual addition or a separate formula, and compare the results." }
        ],
        checklist: [
            "Format a two-page document using heading styles.",
            "Insert an automatic table of contents and page numbers.",
            "Add a captioned table and cross-reference it in the text.",
            "Build a 20-row spreadsheet with at least three formulas.",
            "Create one chart with labelled axes and units.",
            "Design a five-slide presentation on a course topic.",
            "Present it to a friend and take feedback on clarity."
        ]
    },
    {
        slug: "google-workspace-and-cloud-collaboration",
        code: null,
        title: "Google Workspace and Cloud Collaboration: Work Together Without Chaos",
        subtitle: "Shared documents, files and calendars that keep group assignments on track",
        domain: "Digital Skills",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["Google Drive", "Google Docs", "Collaboration", "Cloud Storage", "Digital Skills", "100L"],
        description: "Group work fails when files are scattered across WhatsApp and nobody knows which version is final. This pack explains shared drives, document permissions, comments and suggestions, version history and offline access, plus a simple group workflow.",
        outcomes: [
            "Structure and share a Google Drive folder with correct permissions.",
            "Collaborate in Docs and Sheets using comments and suggestions.",
            "Recover earlier versions and avoid conflicting copies.",
            "Set up a group workflow with clear ownership and deadlines."
        ],
        sections: [
            {
                heading: "Organise and share",
                intro: "A predictable folder structure saves more time than any productivity app.",
                bullets: [
                    "One master folder per course or project, with subfolders for drafts, sources and final.",
                    "Name files consistently: course, topic, version, date.",
                    "Viewer for readers, commenter for reviewers, editor only for active contributors.",
                    "Share the folder rather than individual files so new files inherit access.",
                    "Use a shared calendar for deadlines and meetings.",
                    "Remove access at the end of the project."
                ]
            },
            {
                heading: "Collaborate without duplicates",
                intro: "Simultaneous editing works when you use the tools designed for it.",
                bullets: [
                    "Use comments for feedback and suggestions mode for edits you want reviewed.",
                    "Do not email multiple copies; edit the single shared document.",
                    "Use version history to see who changed what and restore an earlier state.",
                    "Assign sections to specific people with deadlines in the document.",
                    "Turn on offline access for documents you may need without data.",
                    "Keep a final PDF copy for submission so formatting does not shift."
                ],
                callout: {
                    title: "Final means final",
                    body: "Rename the submitted file 'FINAL' and move it out of the drafts folder. Weeks later, you will know exactly what you submitted."
                }
            },
            {
                heading: "Data, storage and etiquette",
                intro: "Cloud tools are convenient but not free of limits or risk.",
                bullets: [
                    "Free storage is limited; compress large images and clear old videos.",
                    "Do not upload sensitive personal documents to shared folders.",
                    "Check that a link is restricted before posting it publicly.",
                    "Use two-factor authentication on the account.",
                    "Respect bandwidth: avoid large uploads during peak hours on shared networks.",
                    "Back up critical files locally or in a second service."
                ]
            }
        ],
        practice: [
            { q: "What permission should reviewers have?", a: "Commenter access, so they can give feedback without altering the document text." },
            { q: "Why share a folder instead of separate files?", a: "New files inherit the folder's permissions, reducing missing-access problems." },
            { q: "How do you recover a deleted section in Google Docs?", a: "Use File then Version history to view and restore an earlier version." },
            { q: "Why create a PDF before submission?", a: "A PDF fixes the layout so formatting does not change on another device." },
            { q: "Give two cloud-storage safety practices.", a: "Restrict link sharing and enable two-factor authentication on the account." }
        ],
        checklist: [
            "Create a course folder structure with three subfolders.",
            "Set correct permissions for one shared document.",
            "Practise commenting and suggesting changes.",
            "Restore an earlier version in a test document.",
            "Enable offline access for one folder.",
            "Set up a shared calendar for group deadlines.",
            "Export a final PDF and check formatting."
        ]
    },
    {
        slug: "ai-tools-for-studying-ethically",
        code: null,
        title: "AI Tools for Studying: Use Them Without Cheating Yourself",
        subtitle: "Where AI genuinely helps learning, and where it quietly damages your degree",
        domain: "Digital Skills",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["AI", "Study Tools", "Academic Integrity", "Prompting", "Digital Skills", "100L"],
        description: "AI tools are useful tutors and dangerous shortcuts. This pack explains what they do well, where they confidently produce wrong answers, how to write prompts that produce checkable output, and how to stay within your department's integrity rules.",
        outcomes: [
            "Use AI for explanation, practice and feedback rather than submission.",
            "Write prompts that specify context, level and output format.",
            "Verify AI output against reliable sources and detect fabricated references.",
            "Apply your department's rules on disclosure and permitted use."
        ],
        sections: [
            {
                heading: "What AI is good at",
                intro: "Treat AI as an explainer and practice partner, not an author.",
                bullets: [
                    "Re-explaining a concept at a simpler level until you understand it.",
                    "Generating practice questions on a topic you specify.",
                    "Critiquing your own draft for structure and clarity.",
                    "Producing examples and analogies you then verify.",
                    "Summarising a document you already have, as a first pass only.",
                    "Translating and checking grammar in your own writing."
                ]
            },
            {
                heading: "What it gets wrong",
                intro: "Language models produce plausible text, not verified truth.",
                bullets: [
                    "Fabricated references, statistics and quotations.",
                    "Confident errors in calculations and niche local detail.",
                    "Outdated information on current events, policies and prices.",
                    "Bias and oversimplification on contested topics.",
                    "Generic writing that sounds like nobody in particular.",
                    "Hidden errors when you lack the knowledge to check the answer."
                ],
                callout: {
                    title: "The verification rule",
                    body: "If you cannot check a claim yourself, do not submit it. A citation you have not opened is not a source."
                }
            },
            {
                heading: "Prompting and integrity",
                intro: "Better prompts produce more checkable answers.",
                bullets: [
                    "State your level, the course, the length and the required format.",
                    "Ask for step-by-step explanation rather than the final answer.",
                    "Request sources, then verify each one independently.",
                    "Ask it to identify weaknesses in your argument, not to write the argument.",
                    "Disclose AI assistance where your department requires it.",
                    "Never use AI where it is prohibited; an acknowledgement does not make a prohibited act allowed."
                ]
            }
        ],
        practice: [
            { q: "Name three legitimate study uses of AI.", a: "Explaining a concept, generating practice questions and giving feedback on your draft." },
            { q: "Why are AI-generated references risky?", a: "Models can fabricate plausible-looking citations that do not exist or do not say what is claimed." },
            { q: "Write a useful prompt for studying a topic.", a: "For example: 'Explain photosynthesis to a 100-level biology student in 250 words with one worked example, then give me five practice questions with answers.'" },
            { q: "What should you do if your department prohibits AI use?", a: "Do not use it for that assessment; follow the policy even if you believe disclosure would be honest." },
            { q: "How can AI damage your learning?", a: "By replacing the retrieval and reasoning practice that builds durable knowledge, leaving you unable to perform in examinations." }
        ],
        checklist: [
            "Read your department's policy on AI use.",
            "Write three prompts that request explanation, not answers.",
            "Verify five AI-generated facts against a textbook or official site.",
            "Check every cited source by opening it.",
            "Use AI to critique one of your own drafts.",
            "Complete one assignment with no AI assistance to test your own ability.",
            "Record when and how you used AI for transparency."
        ]
    },
    {
        slug: "cybercrime-and-online-safety",
        code: null,
        title: "Cybersecurity and Online Safety: Protect Your Accounts, Data and Future",
        subtitle: "Practical account security, phishing defence and the legal risks of cybercrime",
        domain: "Digital Skills",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["Cybersecurity", "Phishing", "Online Safety", "Cybercrime Act", "Digital Skills", "100L"],
        description: "Students are targeted because they hold bank details, social accounts and personal data with limited security habits. This pack covers strong authentication, phishing recognition, device hygiene and the Nigerian legal consequences of offences such as identity theft and unauthorised access.",
        outcomes: [
            "Secure accounts with strong passwords and two-factor authentication.",
            "Recognise phishing messages and verify links before clicking.",
            "Apply device and data hygiene practices.",
            "Explain the legal consequences of common cybercrimes in Nigeria."
        ],
        sections: [
            {
                heading: "Account security",
                intro: "Most account compromise comes from reused passwords and social engineering, not sophisticated hacking.",
                bullets: [
                    "Use a unique passphrase for every important account.",
                    "Enable two-factor authentication, preferably an authenticator app over SMS.",
                    "Never share one-time passwords, even with someone claiming to be support.",
                    "Review connected apps and revoke access you do not recognise.",
                    "Lock your phone and laptop with a PIN or biometric, and encrypt if available.",
                    "Log out of shared computers and never save passwords on public devices."
                ]
            },
            {
                heading: "Phishing and social engineering",
                intro: "Attackers persuade; they rarely need to break in.",
                bullets: [
                    "Check the sender address, not just the display name.",
                    "Hover over links to see the real destination before clicking.",
                    "Be suspicious of urgency, threats, and requests for codes or payments.",
                    "Verify unusual requests through a second channel you initiate.",
                    "Treat attachments from unknown senders as dangerous.",
                    "Report phishing to the platform and delete it; do not forward it."
                ],
                callout: {
                    title: "The OTP rule",
                    body: "No bank, university or platform will ask for your OTP. Anyone who does is committing fraud, regardless of how official they sound."
                }
            },
            {
                heading: "Device hygiene and the law",
                intro: "Digital habits have legal and reputational consequences.",
                bullets: [
                    "Update operating systems and apps; updates patch known vulnerabilities.",
                    "Back up important files to two locations.",
                    "Avoid cracked software, which often carries malware.",
                    "Do not use another person's credentials or access systems without authorisation.",
                    "Under the Cybercrimes Act, offences include unauthorised access, identity theft, cyberstalking and phishing, with serious penalties.",
                    "Online behaviour is permanent; screenshots and logs outlive deletion."
                ]
            }
        ],
        practice: [
            { q: "Why is two-factor authentication important?", a: "It adds a second verification step, so a stolen password alone is not enough to access the account." },
            { q: "Give three signs of a phishing message.", a: "Urgency, a mismatched sender or link, and a request for credentials, codes or payment." },
            { q: "What should you do if you receive an OTP request from someone claiming to be a bank officer?", a: "Refuse, hang up, and contact the bank through its official number." },
            { q: "Name two offences under Nigerian cybercrime law.", a: "Unauthorised access to a computer system and identity theft; phishing and cyberstalking are also offences." },
            { q: "Why avoid cracked software?", a: "It frequently contains malware and has no security updates, exposing your accounts and files." }
        ],
        checklist: [
            "Set unique passwords for your email, bank and school portal.",
            "Enable two-factor authentication on email and social accounts.",
            "Review connected apps and revoke unfamiliar access.",
            "Check three links by hovering before clicking.",
            "Update your phone, laptop and key apps.",
            "Back up essential files to a second location.",
            "Read a summary of the Cybercrimes Act and note three offences."
        ]
    },
    {
        slug: "mental-health-and-stress-management",
        code: null,
        title: "Mental Health and Stress: Coping Skills That Actually Help",
        subtitle: "Understand stress, spot warning signs and know when to ask for help",
        domain: "Health & Wellbeing",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["Mental Health", "Stress", "Coping", "Wellbeing", "100L"],
        description: "First year brings new academic pressure, financial strain and social change at once. This pack explains the stress response, distinguishes normal pressure from warning signs, teaches practical coping skills and sets out how and where to seek help.",
        outcomes: [
            "Explain the stress response and differentiate acute from chronic stress.",
            "Recognise warning signs that need professional support.",
            "Apply evidence-based coping strategies for study and daily life.",
            "Know where to seek help on and off campus."
        ],
        sections: [
            {
                heading: "What stress is doing",
                intro: "Stress is a physiological response to demand. It is useful in short bursts and harmful when unrelieved.",
                bullets: [
                    "Acute stress sharpens attention briefly; chronic stress impairs memory, sleep and immunity.",
                    "Common signs: persistent worry, irritability, poor concentration, changes in sleep and appetite.",
                    "Burnout combines exhaustion, cynicism and reduced effectiveness.",
                    "Some stress is normal; being unable to function is not a character flaw.",
                    "Substance use may feel like relief but worsens anxiety and sleep.",
                    "Naming what you feel reduces its intensity and helps you act."
                ]
            },
            {
                heading: "Coping that works",
                intro: "Choose strategies that address the cause and regulate the body.",
                bullets: [
                    "Break overwhelming work into the next single action.",
                    "Use slow breathing for two minutes to reduce acute arousal.",
                    "Protect sleep, meals and movement even during exams.",
                    "Schedule worry time rather than worrying all day.",
                    "Talk to one trusted person weekly.",
                    "Reduce comparison with social media; other people's highlights are edited."
                ],
                callout: {
                    title: "When to seek help",
                    body: "Seek professional support if low mood lasts more than two weeks, if you cannot attend classes, or if you have thoughts of harming yourself. This is a medical issue, not weakness."
                }
            },
            {
                heading: "Getting support",
                intro: "Help exists, and using it early makes a difference.",
                bullets: [
                    "Campus counselling unit or guidance office.",
                    "University health centre for assessment and referral.",
                    "A trusted lecturer, level adviser or chaplain.",
                    "National mental-health helplines and teaching-hospital services.",
                    "A trusted friend or family member who can accompany you.",
                    "In an emergency, go to the nearest hospital or call emergency services."
                ]
            }
        ],
        practice: [
            { q: "Distinguish acute from chronic stress.", a: "Acute stress is short-lived and can improve performance. Chronic stress persists, exhausting resources and impairing health and cognition." },
            { q: "Name three warning signs that warrant professional support.", a: "Persistent low mood for over two weeks, inability to function academically, and thoughts of self-harm." },
            { q: "Why is sleep protective for mental health?", a: "Sleep supports emotional regulation, memory consolidation and stress-hormone balance." },
            { q: "Give one practical way to reduce overwhelm.", a: "Identify the next single action and do only that, rather than planning the entire semester at once." },
            { q: "What should you do if a friend discloses thoughts of self-harm?", a: "Take it seriously, stay with them, encourage immediate professional help and accompany them to a health facility or call emergency services." }
        ],
        checklist: [
            "Write your three main stressors this semester.",
            "Learn and practise a two-minute breathing exercise.",
            "Set a consistent sleep and wake time for two weeks.",
            "Identify one trusted person you can talk to weekly.",
            "Save the campus counselling and health-centre contacts.",
            "Schedule one recovery activity each week.",
            "Check in on a coursemate who seems withdrawn."
        ]
    },
    {
        slug: "nutrition-and-student-energy",
        code: null,
        title: "Nutrition for Students: Eat Well on a Small Budget",
        subtitle: "Affordable meals that support concentration, energy and health",
        domain: "Health & Wellbeing",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["Nutrition", "Diet", "Student Health", "Budget Meals", "100L"],
        description: "Cheap food is not automatically bad food, and expensive food is not automatically balanced. This pack explains the basics of a balanced plate, builds affordable Nigerian meal combinations, and covers hydration, food safety and the effects of caffeine and energy drinks.",
        outcomes: [
            "Explain the components of a balanced diet and their functions.",
            "Build affordable meals using locally available foods.",
            "Apply food-safety practices in hostel and shared kitchens.",
            "Make informed choices about caffeine, sugary drinks and supplements."
        ],
        sections: [
            {
                heading: "The balanced plate",
                intro: "You do not need imported foods to eat well.",
                bullets: [
                    "Carbohydrates provide energy: rice, yam, plantain, garri, maize, potatoes.",
                    "Proteins build and repair tissue: beans, fish, eggs, chicken, milk, groundnuts.",
                    "Fats in moderation support hormones and vitamin absorption: vegetable oil, nuts, avocado.",
                    "Vitamins and minerals come from vegetables and fruit; include something green or orange daily.",
                    "Fibre supports digestion and steady energy: beans, vegetables, whole grains.",
                    "Water is essential; aim for regular intake through the day, more in heat."
                ]
            },
            {
                heading: "Affordable combinations",
                intro: "Balance is about combination, not cost.",
                bullets: [
                    "Beans and plantain with vegetables gives carbohydrate, protein and fibre.",
                    "Rice with beans and a vegetable stew is cheap and filling.",
                    "Pap with milk and groundnuts adds protein to a cheap breakfast.",
                    "Eggs are one of the cheapest complete proteins.",
                    "Buy staples in bulk and share with roommates to reduce unit cost.",
                    "Reduce sugary drinks; they add cost and calories without nutrients."
                ],
                callout: {
                    title: "Do not skip breakfast before exams",
                    body: "Skipping meals reduces concentration and increases irritability. Even a small protein-containing breakfast improves exam performance compared with none."
                }
            },
            {
                heading: "Safety and stimulants",
                intro: "Food poisoning can cost you a week of lectures.",
                bullets: [
                    "Wash hands and produce; separate raw meat from cooked food.",
                    "Cook food thoroughly and refrigerate promptly where possible.",
                    "Be cautious with street food that has been sitting uncovered in heat.",
                    "Treat water carefully if the source is uncertain.",
                    "Caffeine is not a substitute for sleep; energy drinks cause crashes.",
                    "Supplements are not a shortcut to health and can interact with medication."
                ]
            }
        ],
        practice: [
            { q: "Name the three macronutrients and one function of each.", a: "Carbohydrates for energy, proteins for growth and repair, and fats for energy storage, hormone production and vitamin absorption." },
            { q: "Give an affordable balanced meal using local foods.", a: "Beans, plantain and vegetables with water; it provides carbohydrate, protein, fibre and micronutrients." },
            { q: "Why is skipping breakfast counterproductive before an exam?", a: "It reduces available energy and concentration, impairing performance." },
            { q: "State two food-safety rules.", a: "Wash hands and produce, and keep raw and cooked foods separate to prevent cross-contamination." },
            { q: "What is wrong with relying on energy drinks to study?", a: "They provide a temporary stimulant effect followed by a crash, and disrupt sleep which is necessary for memory." }
        ],
        checklist: [
            "List five affordable protein sources near you.",
            "Plan three balanced meals using local staples.",
            "Set a daily water intake target.",
            "Practise safe food handling for one week.",
            "Replace one sugary drink per day with water.",
            "Compare the cost of bulk versus single purchases.",
            "Track energy levels alongside meals for a week."
        ]
    },
    {
        slug: "sleep-fitness-and-posture",
        code: null,
        title: "Sleep, Fitness and Posture: The Physical Habits Behind Good Grades",
        subtitle: "Small daily routines that protect memory, mood and your back",
        domain: "Health & Wellbeing",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["Sleep", "Fitness", "Posture", "Student Health", "100L"],
        description: "Sleep and movement are not luxuries to be traded for study hours - they are part of how learning is consolidated. This pack covers sleep hygiene, a no-equipment exercise routine, posture for long study sessions and recovering after late nights.",
        outcomes: [
            "Explain the role of sleep in memory and mood.",
            "Apply sleep-hygiene practices in a hostel environment.",
            "Follow a simple weekly exercise routine without equipment.",
            "Correct posture during long study sessions and screen use."
        ],
        sections: [
            {
                heading: "Sleep is study time",
                intro: "Memory consolidation happens during sleep, so cutting sleep reduces what you keep.",
                bullets: [
                    "Adults need roughly seven to nine hours, with consistent timing.",
                    "Sleep supports memory consolidation, emotional regulation and immune function.",
                    "Caffeine after mid-afternoon and late-night screens delay sleep onset.",
                    "All-nighters produce short-term recall but impair understanding and accuracy.",
                    "A consistent wind-down routine signals the body to sleep.",
                    "If you must sleep late, keep the wake time stable rather than shifting both."
                ],
                callout: {
                    title: "After a late night",
                    body: "Prioritise a short recovery nap, daylight, water and a normal bedtime the next day. Sleeping all day resets your rhythm in the wrong direction."
                }
            },
            {
                heading: "Movement without a gym",
                intro: "Consistency matters more than intensity.",
                bullets: [
                    "Aim for 150 minutes of moderate activity per week, spread across days.",
                    "Bodyweight basics: squats, push-ups (wall or floor), lunges, planks, glute bridges.",
                    "Walking briskly to lectures counts as activity.",
                    "Stretch hip flexors, hamstrings and chest after long sitting.",
                    "Warm up for five minutes and progress gradually.",
                    "Stop and seek advice if you feel chest pain, dizziness or joint injury."
                ]
            },
            {
                heading: "Posture and screen habits",
                intro: "Long hours hunched over a phone affect neck, shoulders and concentration.",
                bullets: [
                    "Raise your screen to eye level and keep feet flat on the floor.",
                    "Keep the lower back supported and elbows near 90 degrees.",
                    "Follow the 20-20-20 rule: every 20 minutes, look 20 feet away for 20 seconds.",
                    "Stand and move for two minutes every 45 to 60 minutes.",
                    "Carry bags evenly or use a backpack with two straps.",
                    "Do not study lying flat with a laptop on your chest."
                ]
            }
        ],
        practice: [
            { q: "Why does sleep matter for academic performance?", a: "Sleep consolidates memory, restores attention and regulates mood, all of which directly affect learning and exam performance." },
            { q: "What is the 20-20-20 rule?", a: "Every 20 minutes, look at something about 20 feet away for 20 seconds to reduce eye strain." },
            { q: "List four bodyweight exercises that need no equipment.", a: "Squats, push-ups, lunges and planks. Glute bridges and step-ups also qualify." },
            { q: "Why is a consistent wake time important?", a: "It anchors the body clock, making sleep onset and waking more predictable." },
            { q: "Give two posture corrections for laptop study.", a: "Raise the screen to eye level and keep feet flat with the lower back supported." }
        ],
        checklist: [
            "Set a consistent sleep and wake time for two weeks.",
            "Create a 20-minute wind-down routine without screens.",
            "Plan three 30-minute activity sessions for the week.",
            "Learn a five-minute stretching routine.",
            "Adjust your study desk to eye-level screen height.",
            "Apply the 20-20-20 rule during one study session.",
            "Track sleep and energy for a week and compare."
        ]
    },
    {
        slug: "sexual-health-consent-and-relationships",
        code: null,
        title: "Sexual Health, Consent and Relationships: Decide With Information",
        subtitle: "Factual, judgement-free guidance on consent, protection and getting care",
        domain: "Health & Wellbeing",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["Sexual Health", "Consent", "Relationships", "Student Health", "100L"],
        description: "Freshers receive a lot of rumour and very little accurate information. This pack covers consent, contraception and barrier protection, common sexually transmitted infections, testing and where to get confidential care, with no moralising and no shame.",
        outcomes: [
            "Define consent and describe the conditions that make it valid.",
            "Compare contraceptive methods and explain barrier protection.",
            "Recognise common STI symptoms and know that many infections are asymptomatic.",
            "Identify confidential sources of testing, treatment and support."
        ],
        sections: [
            {
                heading: "Consent and boundaries",
                intro: "Consent is an ongoing agreement, not a single moment.",
                bullets: [
                    "Consent must be freely given, informed, specific and reversible.",
                    "A person can withdraw consent at any time, including during an act.",
                    "Silence, coercion, pressure or intoxication do not constitute consent.",
                    "Marriage or a previous relationship does not remove the need for consent.",
                    "Agreeing to one act does not imply agreement to another.",
                    "Respect a no immediately, and stop if you are unsure."
                ],
                callout: {
                    title: "Support after assault",
                    body: "Seek medical attention quickly, preserve evidence where possible, and contact a trusted person or support service. What happened is not the survivor's fault."
                }
            },
            {
                heading: "Protection and contraception",
                intro: "Different methods do different jobs: contraception prevents pregnancy, while barrier protection reduces infection risk.",
                bullets: [
                    "Male condoms reduce the risk of pregnancy and most STIs when used correctly and consistently.",
                    "Hormonal methods such as pills and injectables prevent pregnancy but do not protect against infection.",
                    "Long-acting reversible methods are highly effective and require a provider.",
                    "Emergency contraception reduces pregnancy risk after unprotected sex but is not routine contraception.",
                    "Two methods used together give better protection than one alone.",
                    "Consult a health provider before starting any method."
                ]
            },
            {
                heading: "Infections, testing and care",
                intro: "Many STIs have no symptoms, so testing matters more than appearance.",
                bullets: [
                    "Common infections include HIV, gonorrhoea, chlamydia, syphilis, herpes and HPV.",
                    "Symptoms can include discharge, sores, pain or burning on urination, but absence of symptoms is common.",
                    "Testing is confidential and available at the university health centre and public facilities.",
                    "Most bacterial STIs are curable with the right treatment; viral infections can be managed.",
                    "Complete a full course of treatment and inform partners where appropriate.",
                    "Never self-medicate with antibiotics from a chemist without testing."
                ]
            }
        ],
        practice: [
            { q: "Define valid consent.", a: "A freely given, informed, specific and reversible agreement, made without coercion and by someone with capacity." },
            { q: "Do hormonal contraceptives protect against STIs?", a: "No. They prevent pregnancy but provide no protection against sexually transmitted infections." },
            { q: "Why can you not rely on symptoms to know your STI status?", a: "Many infections are asymptomatic, so a person can be infected and transmit without any signs." },
            { q: "What should you do after unprotected sex where pregnancy is a concern?", a: "Seek advice about emergency contraception as soon as possible, and get tested for STIs after the appropriate window." },
            { q: "Where can a student get confidential testing?", a: "The university health centre or a public or private clinic; testing and treatment are meant to be confidential." }
        ],
        checklist: [
            "Learn the four elements of valid consent.",
            "Read about three contraceptive methods and their effectiveness.",
            "Locate the campus health centre and its opening hours.",
            "Know the window period for HIV and STI testing.",
            "Identify one trusted person to talk to about health concerns.",
            "Learn how to use a condom correctly.",
            "Find the contact details of a support service for assault survivors."
        ]
    }
]

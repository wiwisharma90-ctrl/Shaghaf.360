// ==========================================
// 1. تعريف المتغيرات الأساسية وذاكرة التراجع
// ==========================================
let userScores = {
    Creativity: 0, Adventure: 0, Social: 0, Focus: 0,
    Logic: 0, Nature: 0, Leadership: 0, Competition: 0,
    Patience: 0, Technology: 0, Art: 0, Fitness: 0
};

let currentQuestionIndex = 0;
let userData = { name: "", email: "" };
let answersHistory = []; // مصفوفة لتخزين تاريخ الإجابات من أجل زر الرجوع

// ==========================================
// 2. مصفوفة الأسئلة الـ 20 السيكومترية
// ==========================================
const questions = [
    {
        text: "لو عندك يوم كامل بدون أي التزامات، ماذا ستختار؟",
        options: [
            { text: "أتعلم شيئًا جديدًا.", scores: { Logic: 4, Focus: 3, Patience: 2 } },
            { text: "أخرج مع الأصدقاء.", scores: { Social: 5, Leadership: 2 } },
            { text: "أمارس رياضة.", scores: { Fitness: 5, Competition: 3 } },
            { text: "أبقى بالبيت وأرتاح.", scores: { Focus: 2, Patience: 3 } }
        ]
    },
    {
        text: "أي جملة تشبهك أكثر؟",
        options: [
            { text: "أحب تجربة كل شيء مرة.", scores: { Adventure: 5, Creativity: 3 } },
            { text: "أحب الأشياء المضمونة.", scores: { Patience: 4, Focus: 3 } },
            { text: "أحب التحديات.", scores: { Competition: 5, Leadership: 3, Adventure: 2 } },
            { text: "أحب الروتين.", scores: { Focus: 4, Patience: 4 } }
        ]
    },
    {
        text: "إذا واجهت مشكلة صعبة…",
        options: [
            { text: "أبحث كثيرًا.", scores: { Logic: 4, Focus: 4, Patience: 3 } },
            { text: "أسأل شخصًا.", scores: { Social: 4 } },
            { text: "جرب حلولًا مختلفة.", scores: { Creativity: 5, Logic: 3 } },
            { text: "أتركها مؤقتًا.", scores: { Patience: 4 } }
        ]
    },
    {
        text: "أي مكان يجذبك؟",
        options: [
            { text: "الجبال.", scores: { Nature: 5, Adventure: 4, Fitness: 3 } },
            { text: "مدينة مزدحمة.", scores: { Social: 4, Technology: 3 } },
            { text: "متحف.", scores: { Art: 5, Creativity: 3 } },
            { text: "شاطئ هادئ.", scores: { Nature: 4, Focus: 3 } }
        ]
    },
    {
        text: "ما أكثر شيء يحمسك？",
        options: [
            { text: "المنافسة.", scores: { Competition: 5, Leadership: 3 } },
            { text: "الإبداع.", scores: { Creativity: 5, Art: 4 } },
            { text: "مساعدة الآخرين.", scores: { Social: 5 } },
            { text: "اكتشاف المجهول.", scores: { Adventure: 5, Logic: 3 } }
        ]
    },
    {
        text: "في العمل الجماعي…",
        options: [
            { text: "أقود الفريق.", scores: { Leadership: 5, Competition: 3 } },
            { text: "أنفذ المطلوب.", scores: { Focus: 4, Patience: 3 } },
            { text: "أبتكر أفكارًا.", scores: { Creativity: 5, Art: 3 } },
            { text: "أراقب.", scores: { Logic: 4, Focus: 2 } }
        ]
    },
    {
        text: "أكثر شيء يضايقك؟",
        options: [
            { text: "الملل.", scores: { Adventure: 4, Creativity: 3 } },
            { text: "الفوضى.", scores: { Logic: 4, Focus: 4 } },
            { text: "الضغط.", scores: { Patience: -2, Nature: 2 } },
            { text: "الوحدة.", scores: { Social: -3 } }
        ]
    },
    {
        text: "أي هدية تفرحك؟",
        options: [
            { text: "كتاب.", scores: { Logic: 4, Focus: 4, Patience: 3 } },
            { text: "كاميرا.", scores: { Art: 4, Creativity: 4, Nature: 3 } },
            { text: "معدات رياضية.", scores: { Fitness: 5, Competition: 2 } },
            { text: "آلة موسيقية.", scores: { Art: 5, Creativity: 3, Focus: 3 } }
        ]
    },
    {
        text: "كيف تتعلم؟",
        options: [
            { text: "بالمشاهدة.", scores: { Art: 3, Focus: 3 } },
            { text: "بالتجربة.", scores: { Adventure: 4, Creativity: 4 } },
            { text: "بالقراءة.", scores: { Logic: 5, Focus: 4, Patience: 4 } },
            { text: "بالشرح.", scores: { Social: 4, Leadership: 2 } }
        ]
    },
    {
        text: "إذا ربحت 500 دولار…",
        options: [
            { text: "أشتري معدات.", scores: { Technology: 4, Art: 3 } },
            { text: "أسافر.", scores: { Adventure: 5, Nature: 4 } },
            { text: "أستثمرها.", scores: { Logic: 5, Focus: 3 } },
            { text: "أتعلم مهارة.", scores: { Creativity: 4, Focus: 4, Patience: 3 } }
        ]
    },
    {
        text: "أي نوع فيديوهات تشاهد؟",
        options: [
            { text: "وثائقيات.", scores: { Logic: 5, Nature: 3 } },
            { text: "ألعاب.", scores: { Technology: 5, Competition: 3 } },
            { text: "سفر.", scores: { Adventure: 5, Nature: 4 } },
            { text: "طبخ.", scores: { Creativity: 3, Focus: 3 } }
        ]
    },
    {
        text: "كيف تصف نفسك؟",
        options: [
            { text: "فضولي.", scores: { Logic: 5, Adventure: 3 } },
            { text: "اجتماعي.", scores: { Social: 5, Leadership: 2 } },
            { text: "هادئ.", scores: { Focus: 4, Patience: 5 } },
            { text: "مغامر.", scores: { Adventure: 5, Fitness: 3 } }
        ]
    },
    {
        text: "لو تعلمت مهارة جديدة…",
        options: [
            { text: "أصور تقدمي.", scores: { Art: 4, Technology: 3 } },
            { text: "أشارك بها بمسابقة.", scores: { Competition: 5, Leadership: 2 } },
            { text: "أمارسها وحدي.", scores: { Focus: 4, Patience: 4 } },
            { text: "أعلمها للآخرين.", scores: { Social: 5, Leadership: 3 } }
        ]
    },
    {
        text: "أكثر شيء يعطيك الطاقة؟",
        options: [
            { text: "الإنجاز.", scores: { Competition: 4, Focus: 3, Logic: 3 } },
            { text: "الناس.", scores: { Social: 5, Leadership: 2 } },
            { text: "الطبيعة.", scores: { Nature: 5, Adventure: 2 } },
            { text: "الهدوء.", scores: { Focus: 4, Patience: 5 } }
        ]
    },
    {
        text: "هل تحب العمل بيديك؟",
        options: [
            { text: "جدًا.", scores: { Creativity: 4, Art: 4, Focus: 3 } },
            { text: "أحيانًا.", scores: { Creativity: 2, Focus: 2 } },
            { text: "قليلًا.", scores: { Technology: 2 } },
            { text: "لا.", scores: { Logic: 3, Social: 2 } }
        ]
    },
    {
        text: "ما رأيك بالمخاطرة؟",
        options: [
            { text: "أحبها.", scores: { Adventure: 5, Competition: 3, Fitness: 2 } },
            { text: "حسب الوضع.", scores: { Logic: 3, Focus: 3 } },
            { text: "نادرًا.", scores: { Patience: 3, Focus: 2 } },
            { text: "أتجنبها.", scores: { Focus: 4, Patience: 4 } }
        ]
    },
    {
        text: "لو خيروك…",
        options: [
            { text: "اختراع جديد.", scores: { Technology: 5, Logic: 4, Creativity: 4 } },
            { text: "لوحة فنية.", scores: { Art: 5, Creativity: 4 } },
            { text: "بطولة رياضية.", scores: { Fitness: 5, Competition: 5 } },
            { text: "رحلة حول العالم.", scores: { Adventure: 5, Nature: 4 } }
        ]
    },
    {
        text: "كيف تقضي وقت الفراغ غالبًا؟",
        options: [
            { text: "على الكمبيوتر.", scores: { Technology: 5, Focus: 3 } },
            { text: "بالخارج.", scores: { Nature: 5, Fitness: 4 } }, // ✅ تم الإصلاح هنا وحذف التجميع المسبب للمشكلة Outdoor
            { text: "أتعلم.", scores: { Logic: 4, Focus: 4, Patience: 3 } },
            { text: "أشاهد أفلامًا.", scores: { Art: 3, Focus: 2 } }
        ]
    },
    {
        text: "أي إنجاز يسعدك؟",
        options: [
            { text: "الفوز.", scores: { Competition: 5, Leadership: 2 } },
            { text: "الإبداع.", scores: { Creativity: 5, Art: 4 } },
            { text: "الشهرة.", scores: { Social: 4, Leadership: 3 } },
            { text: "مساعدة الناس.", scores: { Social: 5, Patience: 2 } }
        ]
    },
    {
        text: "أي شخصية تتمنى أن تكون؟",
        options: [
            { text: "مستكشف.", scores: { Adventure: 5, Nature: 4, Logic: 2 } },
            { text: "فنان.", scores: { Art: 5, Creativity: 5 } },
            { text: "رائد أعمال.", scores: { Leadership: 5, Competition: 4, Logic: 3 } },
            { text: "رياضي.", scores: { Fitness: 5, Competition: 4 } }
        ]
    }
];

// ==========================================
// 3. قاعدة البيانات الجينية لـ 40 هواية
// ==========================================
const hobbiesProfiles = [
    // فنية
    { name: "الرسم", category: "فنية", desc: "تعبير بصري ساحر يعكس عمقك الإبداعي الداخلي على اللوحات.", profile: { Creativity: 95, Focus: 85, Art: 100, Patience: 80, Technology: 10, Adventure: 10, Fitness: 5, Logic: 20, Social: 15, Leadership: 10, Competition: 15, Nature: 30 } },
    { name: "الرسم الرقمي", category: "فنية", desc: "دمج الفن التقليدي مع التكنولوجيا لإنتاج تصاميم خيالية متطورة.", profile: { Creativity: 95, Focus: 80, Art: 95, Patience: 75, Technology: 90, Adventure: 10, Fitness: 5, Logic: 40, Social: 20, Leadership: 10, Competition: 20, Nature: 20 } },
    { name: "الخط العربي", category: "فنية", desc: "هندسة روحية وفن أصيل يتطلب أعلى درجات الصبر والتركيز المطلق.", profile: { Creativity: 70, Focus: 95, Art: 90, Patience: 100, Technology: 10, Adventure: 5, Fitness: 5, Logic: 50, Social: 15, Leadership: 10, Competition: 10, Nature: 15 } },
    { name: "التصوير الفوتوغرافي", category: "فنية", desc: "تجميد اللحظات الزمنية وصيد التفاصيل الإبداعية بعدسة فنية.", profile: { Creativity: 90, Focus: 70, Art: 90, Patience: 60, Technology: 60, Adventure: 50, Fitness: 30, Logic: 30, Social: 40, Leadership: 20, Competition: 25, Nature: 60 } },
    { name: "تصوير الفيديو", category: "فنية", desc: "التقاط الحركة وصناعة كادرات بصرية متكاملة تحكي الكثير بدون كلام.", profile: { Creativity: 90, Focus: 75, Art: 85, Patience: 65, Technology: 75, Adventure: 45, Fitness: 35, Logic: 40, Social: 45, Leadership: 30, Competition: 25, Nature: 40 } },
    { name: "صناعة الأفلام", category: "فنية", desc: "دمج القيادة، الفن، والتكنولوجيا لإخراج قصة بصرية تؤثر في عقول الناس.", profile: { Creativity: 95, Focus: 80, Art: 90, Patience: 80, Technology: 80, Adventure: 50, Fitness: 20, Logic: 60, Social: 70, Leadership: 90, Competition: 45, Nature: 30 } },
    { name: "التصميم الجرافيكي", category: "فنية", desc: "حل المشكلات البصرية وتنسيق الهويات الرقمية لخدمة الأفكار والمشاريع.", profile: { Creativity: 90, Focus: 80, Art: 85, Patience: 70, Technology: 95, Adventure: 10, Fitness: 5, Logic: 60, Social: 30, Leadership: 25, Competition: 40, Nature: 15 } },
    { name: "النحت", category: "فنية", desc: "تجسيد الأفكار الفنية في كتل ملموسة عبر الصبر والجهد العضلي الدقيق.", profile: { Creativity: 85, Focus: 90, Art: 95, Patience: 95, Technology: 10, Adventure: 15, Fitness: 50, Logic: 40, Social: 10, Leadership: 10, Competition: 15, Nature: 25 } },
    { name: "الأشغال اليدوية", category: "فنية", desc: "إعادة تدوير وصناعة قطع فنية فريدة ومفيدة بيديك ومن الصفر.", profile: { Creativity: 85, Focus: 85, Art: 80, Patience: 90, Technology: 15, Adventure: 10, Fitness: 30, Logic: 30, Social: 20, Leadership: 15, Competition: 10, Nature: 30 } },
    { name: "صناعة المجوهرات", category: "فنية", desc: "شغف الدقة المتناهية وتشكيل المعادن لقطع فنية صغيرة غاية في الفخامة.", profile: { Creativity: 80, Focus: 95, Art: 85, Patience: 95, Technology: 20, Adventure: 10, Fitness: 15, Logic: 40, Social: 15, Leadership: 20, Competition: 20, Nature: 15 } },

    // موسيقية
    { name: "الغناء", category: "موسيقية", desc: "استخدام أوتارك الصوتية كوسيلة فنية مباشرة للتعبير وهز مشاعر الآخرين.", profile: { Creativity: 80, Focus: 70, Art: 90, Patience: 60, Technology: 20, Adventure: 30, Fitness: 40, Logic: 20, Social: 80, Leadership: 50, Competition: 45, Nature: 20 } },
    { name: "العزف على البيانو", category: "موسيقية", desc: "تناغم حركي وذهني فائق يربط المشاعر بالنغمات الصافية العميقة.", profile: { Creativity: 85, Focus: 90, Art: 95, Patience: 90, Technology: 30, Adventure: 10, Fitness: 20, Logic: 60, Social: 30, Leadership: 20, Competition: 30, Nature: 15 } },
    { name: "الجيتار", category: "موسيقية", desc: "آلة مرنة تمنحك طاقة إبداعية عالية للتعبير الموسيقي في الجلسات الفردية والجماعية.", profile: { Creativity: 85, Focus: 80, Art: 90, Patience: 75, Technology: 30, Adventure: 25, Fitness: 20, Logic: 45, Social: 60, Leadership: 30, Competition: 25, Nature: 25 } },
    { name: "الكمان", category: "موسيقية", desc: "من أصعب الآلات وأكثرها شجناً وتطلباً للتركيز والصبر الحاد الطويل.", profile: { Creativity: 80, Focus: 95, Art: 95, Patience: 100, Technology: 20, Adventure: 15, Fitness: 25, Logic: 55, Social: 25, Leadership: 20, Competition: 30, Nature: 15 } },
    { name: "التأليف الموسيقي", category: "موسيقية", desc: "هندسة النغمات من الصفر وخلق عوالم صوتية متكاملة بناءً على الخيال والمنطق البنائي.", profile: { Creativity: 100, Focus: 90, Art: 95, Patience: 85, Technology: 65, Adventure: 20, Fitness: 5, Logic: 75, Social: 20, Leadership: 40, Competition: 30, Nature: 20 } },

    // تقنية
    { name: "البرمجة", category: "تقنية", desc: "بناء الأنظمة وحل الألغاز المنطقية المعقدة باستخدام كود برمجي خالص وصافٍ.", profile: { Creativity: 70, Focus: 90, Art: 20, Patience: 85, Technology: 100, Adventure: 10, Fitness: 5, Logic: 100, Social: 20, Leadership: 25, Competition: 40, Nature: 5 } },
    { name: "تطوير الألعاب", category: "تقنية", desc: "تجميع الفن، الصوت، القصة، والمنطق البرمجي لخلق عالم تفاعلي كامل.", profile: { Creativity: 95, Focus: 85, Art: 60, Patience: 80, Technology: 100, Adventure: 40, Fitness: 5, Logic: 85, Social: 30, Leadership: 40, Competition: 45, Nature: 10 } },
    { name: "الذكاء الاصطناعي", category: "تقنية", desc: "هندسة البيانات المتقدمة وتدريب الخوارزميات لمحاكاة التفكير البشري وصناعة المستقبل.", profile: { Creativity: 75, Focus: 95, Art: 25, Patience: 90, Technology: 100, Adventure: 20, Fitness: 5, Logic: 100, Social: 25, Leadership: 30, Competition: 50, Nature: 10 } },
    { name: "تصميم المواقع", category: "تقنية", desc: "تطوير واجهات الويب الرقمية لدمج سهولة الاستخدام البصرية مع الأكواد البرمجية المرنة.", profile: { Creativity: 85, Focus: 80, Art: 70, Patience: 75, Technology: 95, Adventure: 15, Fitness: 5, Logic: 75, Social: 40, Leadership: 30, Competition: 35, Nature: 10 } },
    { name: "الأمن السيبراني", category: "تقنية", desc: "حماية الأنظمة الرقمية واكتشاف الثغرات في معركة ذكاء منطقية ومستمرة ضد الاختراق.", profile: { Creativity: 50, Focus: 95, Art: 10, Patience: 90, Technology: 100, Adventure: 40, Fitness: 5, Logic: 95, Social: 15, Leadership: 40, Competition: 60, Nature: 5 } },
    { name: "صناعة الروبوتات", category: "تقنية", desc: "دمج هندسة الميكانيكا، الإلكترونيات، والأكواد لبناء مجسمات مادية ذكية تتحرك وتنفذ الأوامر.", profile: { Creativity: 80, Focus: 90, Art: 30, Patience: 90, Technology: 100, Adventure: 30, Fitness: 15, Logic: 95, Social: 25, Leadership: 35, Competition: 45, Nature: 15 } },
    { name: "الطباعة ثلاثية الأبعاد", category: "تقنية", desc: "تحويل النماذج الهندسية الرقمية إلى مجسمات حقيقية ملموسة باستخدام الآلات الحديثة.", profile: { Creativity: 80, Focus: 85, Art: 50, Patience: 80, Technology: 95, Adventure: 15, Fitness: 10, Logic: 75, Social: 20, Leadership: 20, Competition: 25, Nature: 15 } },

    // رياضية
    { name: "كمال الأجسام", category: "رياضية", desc: "النحت العضلي والانضباط البدني الصارم الذي يتطلب صبرًا عاليًا لمشاهدة التطور والنتائج.", profile: { Creativity: 20, Focus: 85, Art: 30, Patience: 95, Technology: 10, Adventure: 20, Fitness: 100, Logic: 40, Social: 30, Leadership: 30, Competition: 70, Nature: 10 } },
    { name: "الجري", category: "رياضية", desc: "مواجهة واضحة لكسر حدود تحملك البدني، وتصفية ذهنك بالكامل مع كل خطوة على الطريق.", profile: { Creativity: 10, Focus: 80, Art: 10, Patience: 90, Technology: 15, Adventure: 30, Fitness: 95, Logic: 30, Social: 15, Leadership: 20, Competition: 50, Nature: 50 } },
    { name: "السباحة", category: "رياضية", desc: "بناء مرونة عضلية كاملة والاندماج الانسيابي بداخل الماء لتنشيط دورتك الدموية وطاقتك الزائدة.", profile: { Creativity: 15, Focus: 80, Art: 15, Patience: 80, Technology: 10, Adventure: 25, Fitness: 95, Logic: 35, Social: 20, Leadership: 20, Competition: 60, Nature: 30 } },
    { name: "الغوص", category: "رياضية", desc: "استكشاف غامض تحت أعماق المياه يعتمد على اللياقة، حب الطبيعة، ومواجهة المخاطر بأعصاب باردة.", profile: { Creativity: 30, Focus: 80, Art: 40, Patience: 85, Technology: 30, Adventure: 100, Fitness: 90, Logic: 50, Social: 50, Leadership: 40, Competition: 25, Nature: 95 } },
    { name: "الملاكمة", category: "رياضية", desc: "قمة القتال التنافسي والسرعة الحركية التي تتطلب تركيزاً فورياً وتفريغاً آمناً للشحنات العصبية.", profile: { Creativity: 20, Focus: 90, Art: 10, Patience: 70, Technology: 10, Adventure: 80, Fitness: 100, Logic: 50, Social: 40, Leadership: 45, Competition: 100, Nature: 10 } },
    { name: "تسلق الجبال", category: "رياضية", desc: "تحدي الجاذبية والصعاب في قلب الطبيعة المفتوحة للوصول إلى قمم العالم بروح جسورة وصامدة.", profile: { Creativity: 20, Focus: 85, Art: 30, Patience: 95, Technology: 20, Adventure: 100, Fitness: 95, Logic: 45, Social: 35, Leadership: 50, Competition: 40, Nature: 100 } },
    { name: "ركوب الدراجات", category: "رياضية", desc: "قطع مسافات طويلة بسرعة مرنة لاستكشاف مسارات جديدة وتنشيط بدنك في الهواء الطلق.", profile: { Creativity: 20, Focus: 70, Art: 20, Patience: 75, Technology: 20, Adventure: 65, Fitness: 90, Logic: 30, Social: 35, Leadership: 20, Competition: 50, Nature: 75 } },
    { name: "اليوغا", category: "رياضية", desc: "تصفية الذهن، والتنفس المنظم، والتحكم بالمرونة الحركية في سكون تام لراحة جسدك وعقلك.", profile: { Creativity: 40, Focus: 95, Art: 35, Patience: 100, Technology: 5, Adventure: 15, Fitness: 80, Logic: 40, Social: 15, Leadership: 15, Competition: 5, Nature: 65 } },

    // استكشافية
    { name: "السفر", category: "استكشافية", desc: "الانغماس المباشر في ثقافات جديدة تماماً والترحال لكسر أي روتين يومي ممل وجاف.", profile: { Creativity: 70, Focus: 50, Art: 55, Patience: 60, Technology: 40, Adventure: 100, Fitness: 55, Logic: 50, Social: 80, Leadership: 60, Competition: 30, Nature: 80 } },
    { name: "التخييم", category: "استكشافية", desc: "العودة لبساطة الطبيعة، وإشعال النيران تحت النجوم، واكتساب مهارات البقاء والاعتماد على النفس.", profile: { Creativity: 50, Focus: 70, Art: 30, Patience: 85, Technology: 15, Adventure: 95, Fitness: 70, Logic: 55, Social: 60, Leadership: 55, Competition: 25, Nature: 100 } },
    { name: "مراقبة النجوم", category: "استكشافية", desc: "ملاحقة المجرات والشهب في سكون الليل والتأمل الفلكي العميق الذي يوسع مداركك العقلية.", profile: { Creativity: 60, Focus: 90, Art: 45, Patience: 95, Technology: 50, Adventure: 50, Fitness: 20, Logic: 80, Social: 20, Leadership: 10, Competition: 10, Nature: 90 } },
    { name: "مراقبة الطيور", category: "استكشافية", desc: "هواية الهدوء الفائق والتوثيق البصري الهادئ لمخلوقات الطبيعة في بيئتها الحية.", profile: { Creativity: 40, Focus: 90, Art: 40, Patience: 100, Technology: 35, Adventure: 45, Fitness: 40, Logic: 65, Social: 15, Leadership: 10, Competition: 10, Nature: 95 } },

    // فكرية
    { name: "الشطرنج", category: "فكرية", desc: "معركة حربية عقلية صامتة تعتمد بالكامل على التخطيط الاستراتيجي وقراءة عقل الخصم بدقة.", profile: { Creativity: 55, Focus: 100, Art: 10, Patience: 90, Technology: 30, Adventure: 10, Fitness: 5, Logic: 100, Social: 20, Leadership: 60, Competition: 90, Nature: 5 } },
    { name: "القراءة", category: "فكرية", desc: "مفتاح الغوص في عقول العباقرة وبناء خلفية فكرية وثقافية راسخة في عزلة إيجابية تامة.", profile: { Creativity: 75, Focus: 95, Art: 50, Patience: 90, Technology: 20, Adventure: 20, Fitness: 5, Logic: 85, Social: 15, Leadership: 30, Competition: 15, Nature: 15 } },
    { name: "كتابة القصص", category: "فكرية", desc: "بناء سيناريوهات وحوارات وخلق شخوص وعوالم متكاملة من محض خيالك وقلمك الخاص.", profile: { Creativity: 100, Focus: 90, Art: 80, Patience: 85, Technology: 30, Adventure: 30, Fitness: 5, Logic: 75, Social: 25, Leadership: 25, Competition: 20, Nature: 20 } },
    { name: "تعلم اللغات", category: "فكرية", desc: "فك شفرات التواصل البشري وفتح نوافذ عقلية جديدة تماماً لفهم أساليب تفكير الشعوب.", profile: { Creativity: 50, Focus: 85, Art: 40, Patience: 90, Technology: 40, Adventure: 45, Fitness: 5, Logic: 80, Social: 70, Leadership: 35, Competition: 30, Nature: 10 } },
    { name: "حل الألغاز", category: "فكرية", desc: "تحفيز مكثف لروابطك العصبية عبر حل التحديات الرياضية والمنطقية والبوليسية المعقدة.", profile: { Creativity: 60, Focus: 95, Art: 10, Patience: 85, Technology: 40, Adventure: 15, Fitness: 5, Logic: 100, Social: 15, Leadership: 20, Competition: 50, Nature: 5 } },

    // اجتماعية
    { name: "التطوع", category: "اجتماعية", desc: "بناء روابط مجتمعية دافئة وقيادة حملات ميدانية لترك أثر حقيقي ومساعدة من يحتاجونك.", profile: { Creativity: 40, Focus: 60, Art: 20, Patience: 85, Technology: 20, Adventure: 35, Fitness: 45, Logic: 50, Social: 100, Leadership: 75, Competition: 20, Nature: 30 } },
    { name: "صناعة المحتوى", category: "اجتماعية", desc: "صناعة فيديوهات ومقاطع بصرية تدمج فيها إبداعك ومونتاجك للتأثير في وعي جماهير السوشيال ميديا.", profile: { Creativity: 90, Focus: 75, Art: 70, Patience: 70, Technology: 85, Adventure: 40, Fitness: 25, Logic: 65, Social: 90, Leadership: 70, Competition: 60, Nature: 20 } },
    { name: "التحدث أمام الجمهور", category: "اجتماعية", desc: "فن كسر حاجز الخوف، وقيادة المنصات، وتوجيه آراء الناس باستخدام نبرات صوتك ولغة جسدك الكاريزمية.", profile: { Creativity: 65, Focus: 75, Art: 40, Patience: 65, Technology: 30, Adventure: 50, Fitness: 35, Logic: 70, Social: 100, Leadership: 100, Competition: 70, Nature: 15 } }
];

// ==========================================
// 4. انطلاق الاختبار وتسجيل المستخدم
// ==========================================
function startQuiz() {
    const nameInput = document.getElementById('userName').value.trim();
    const emailInput = document.getElementById('userEmail').value.trim();
    
    if (!nameInput || !emailInput) { 
        alert("لطفاً، املأ اسمك وبريدك الإلكتروني لتشغيل خوارزمية شغف 360!"); 
        return; 
    }
    
    userData.name = nameInput; 
    userData.email = emailInput;
    
    document.getElementById('welcomeScreen').classList.remove('active');
    document.getElementById('quizScreen').classList.add('active');
    showQuestion();
}

// ==========================================
// 5. دالة عرض الأسئلة مع زر الرجوع للخلف
// ==========================================
function showQuestion() {
    const progressPercent = (currentQuestionIndex / questions.length) * 100;
    document.getElementById('progressBar').style.width = `${progressPercent}%`;

    if (currentQuestionIndex >= questions.length) { 
        processAndShowResults(); 
        return; 
    }

    const currentQ = questions[currentQuestionIndex];
    document.getElementById('questionNumber').innerText = `تحليل شغف 360 السيكومتري - سؤال ${currentQuestionIndex + 1} من ${questions.length}`;
    document.getElementById('questionText').innerText = currentQ.text;
    
    const optionsList = document.getElementById('optionsList');
    optionsList.innerHTML = '';

    // عرض خيارات السؤال الحالية
    currentQ.options.forEach(opt => {
        const card = document.createElement('div');
        card.className = 'option-card';
        card.innerText = opt.text;
        card.onclick = () => {
            // حفظ اللقطة الحالية قبل الإضافة من أجل التراجع الموثوق
            answersHistory.push({
                questionIndex: currentQuestionIndex,
                scoresSnapshot: JSON.parse(JSON.stringify(userScores))
            });

            // إضافة نقاط الخيار الجديد
            for (let trait in opt.scores) {
                if (userScores.hasOwnProperty(trait)) {
                    userScores[trait] += opt.scores[trait];
                }
            }
            currentQuestionIndex++;
            showQuestion();
        };
        optionsList.appendChild(card);
    });

    // إضافة زر الرجوع للخلف التفاعلي
    if (currentQuestionIndex > 0) {
        const backBtn = document.createElement('button');
        backBtn.className = 'btn-back';
        backBtn.innerHTML = `<i class="fas fa-arrow-right"></i> السؤال السابق`;
        backBtn.onclick = () => {
            const previousState = answersHistory.pop();
            if (previousState) {
                currentQuestionIndex = previousState.questionIndex;
                userScores = previousState.scoresSnapshot;
                showQuestion();
            }
        };
        optionsList.appendChild(backBtn);
    }
}

// ==========================================
// 6. خوارزمية فرز وحساب التوافق الرياضي
// ==========================================
function processAndShowResults() {
    document.getElementById('quizScreen').classList.remove('active');
    document.getElementById('resultScreen').classList.add('active');
    document.getElementById('userGreeting').innerText = `أهلاً بك يا ${userData.name}. قمنا بتحليل مصفوفة إجاباتك الـ 20 ومطابقتها برادار السمات، وإليك أكثر 3 هوايات تتوافق مع تركيبتك الجينية السلوكية:`;

    let maxUserScore = Math.max(...Object.values(userScores), 1);
    let normalizedUser = {};
    for (let trait in userScores) {
        normalizedUser[trait] = (userScores[trait] / maxUserScore) * 100;
    }

    let matchResults = [];

    hobbiesProfiles.forEach(hobby => {
        let totalDifference = 0;
        let traitsCount = Object.keys(hobby.profile).length;

        for (let trait in hobby.profile) {
            let userTraitScore = normalizedUser[trait] || 0;
            totalDifference += Math.abs(hobby.profile[trait] - userTraitScore);
        }

        let averageDiff = totalDifference / traitsCount;
        let matchPercent = Math.round(100 - averageDiff);
        
        if (matchPercent > 98) matchPercent = 98;
        if (matchPercent < 40) matchPercent = 43;

        matchResults.push({ name: hobby.name, category: hobby.category, desc: hobby.desc, match: matchPercent });
    });

    matchResults.sort((a, b) => b.match - a.match);
    const topThree = matchResults.slice(0, 3);

    const resultsContainer = document.getElementById('hobbyResults');
    resultsContainer.innerHTML = '';

    const classMapper = { "فنية": "skill", "موسيقية": "indoor", "تقنية": "skill", "رياضية": "outdoor", "استكشافية": "outdoor", "فكرية": "indoor", "اجتماعية": "outdoor" };

    topThree.forEach(hobby => {
        const card = document.createElement('div');
        card.className = `hobby-card ${classMapper[hobby.category] || 'indoor'}`;
        card.innerHTML = `
            <span class="hobby-type-tag">${hobby.category} — نسبة توافق جينية: ${hobby.match}%</span>
            <h3>${hobby.name}</h3>
            <p>${hobby.desc}</p>
        `;
        resultsContainer.appendChild(card);
    });

    // ✅ التعديل هنا: تم تمرير الحالة "مجاني" كمعامل رابع، وقيمة فارغة للوثيقة كمعامل خامس
    sendDataToGoogleSheets(
        userData.name, 
        userData.email, 
        `${topThree[0].name} (${topThree[0].match}%), ${topThree[1].name} (${topThree[1].match}%), ${topThree[2].name} (${topThree[2].match}%)`,
        "مجاني",
        ""
    );
}


// ==========================================
// 7. إرسال البيانات للـ Google Sheet
// ==========================================
function sendDataToGoogleSheets(name, email, hobbies, status, fileData = null) {
    const scriptUrl = "https://script.google.com/macros/s/AKfycbwP5unUwPgB3e0gvknCazvbvyOHJC4xqFYmWeaGVobWYjO9PpVa9wv_2iNtGbZlpKv8/exec"; 
    
    let payload = {
        name: name,
        email: email,
        hobbies: hobbies,
        status: status,
        date: new Date().toLocaleString()
    };

    if (fileData) {
        payload.fileBytes = fileData.bytes;
        payload.fileName = fileData.name;
        payload.fileType = fileData.type;
    }

    // تم إزالة no-cors لضمان نجاح رفع الملفات الكبيرة وسماع استجابة السيرفر
    fetch(scriptUrl, { 
        method: 'POST', 
        headers: { 'Content-Type': 'text/plain' }, // نرسلها كنص خام ليتفادى قيود المتصفح المعقدة
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(resData => {
        console.log("تمت العملية بنجاح في جوجل شيت:", resData);
    })
    .catch(err => console.error("خطأ أثناء الرفع الحقيقي للبيانات:", err));
}




// ==========================================
// 8. بوابات الدفع وإثبات رفع صورة الوصل
// ==========================================
function triggerPayment(method) {
    closeModal();
    let modalTitle = method === 'BaridiMob' ? "الدفع عبر بريدي موب 🇩🇿" : "الدفع عبر بطاقة RedotPay / Visa 💳";
    let paymentDetails = "";

    if (method === 'BaridiMob') {
        paymentDetails = `
            <p style="font-size:0.95rem; margin: 12px 0; color:var(--text-gray); line-height:1.6;">
                قم بتحويل مبلغ <strong style="color:#ffd700;">250 دج</strong> لحساب الـ RIP التالي:
            </p>
            <div class="rip-box" style="background:#222; padding:10px; border-radius:6px; display:flex; justify-content:space-between; align-items:center; border:1px solid #333; margin-bottom:15px;">
                <span id="ripNum" style="font-family:monospace; color:#fff; font-weight:bold;">00799999000123456789</span>
                <button class="btn-copy" onclick="copyRip()" style="background:var(--primary); border:0; color:#fff; padding:5px 10px; border-radius:4px; cursor:pointer;"><i class="far fa-copy"></i> نسخ</button>
            </div>
        `;
    } else if (method === 'RedotPay') {
        paymentDetails = `
            <p style="font-size:0.95rem; margin: 12px 0; color:var(--text-gray); line-height:1.6;">
                قم بتحويل <strong style="color:#ffd700;">1 دولار</strong> مباشرة لمعرف الـ ID التالي في التطبيق:
            </p>
            <div class="rip-box" style="background:#222; padding:10px; border-radius:6px; display:flex; justify-content:space-between; align-items:center; border:1px solid #333; margin-bottom:15px;">
                <span id="ripNum" style="font-family:monospace; color:#fff; font-weight:bold;">98765432</span>
                <button class="btn-copy" onclick="copyRip()" style="background:var(--primary); border:0; color:#fff; padding:5px 10px; border-radius:4px; cursor:pointer;"><i class="far fa-copy"></i> نسخ</button>
            </div>
        `;
    }

    // نص الرسالة التلقائية للواتساب والإيميل ليعرف العميل ماذا يفعل
    const whatsappUrl = `https://wa.me/message/HPNEUQASOOFGD1?text=مرحباً، لقد أتممت اختبار شغف 360 واسمي هو: ${encodeURIComponent(userData.name)}، وهذا هو وصل الدفع الخاص بي لتفعيل الخطة المدفوعة.`;
    const emailUrl = `mailto:wsartists@gmail.com?subject=وصل دفع خطة شغف 360 - ${encodeURIComponent(userData.name)}&body=مرحباً، أرفق لكم في هذا الإيميل لقطة شاشة لوصل الدفع الخاص بي لتفعيل الخطة المدفوعة. إيميلي المسجل: ${userData.email}`;

    const modalHtml = `
        <div id="paymentModal" class="modal active" onclick="if(event.target === this) closeModal()">
            <div class="modal-content" style="max-width: 480px; text-align: center; background:#111; color:#fff; padding:25px; border-radius:12px; border:1px solid #222; position:relative; margin:10% auto;">
                <span class="close-modal" onclick="closeModal()" style="position:absolute; top:10px; left:15px; font-size:1.5rem; cursor:pointer; color:#888;">&times;</span>
                <h3 style="color:#ffd700; margin-bottom:15px;">${modalTitle}</h3>
                ${paymentDetails}
                
                <hr style="border: 0; border-top: 1px solid #222; margin: 20px 0;">
                
                <p style="font-size: 0.9rem; color: #fff; margin-bottom: 15px; line-height:1.5;" dir="rtl">
                    ⚠️ <strong>الخطوة الأخيرة المتبقية:</strong><br>
                    يرجى تصوير لقطة شاشة لوصل التحويل وإرسالها إلينا عبر الواتساب أو البريد الإلكتروني لتفعيل خطتك فوراً:
                </p>

                <div style="display: flex; gap: 10px; flex-direction: column;">
                    <a href="${whatsappUrl}" target="_blank" class="btn-primary" style="background:#25D366; color:#fff; padding:12px; border-radius:6px; font-weight:bold; text-decoration:none; display:block; border:0;" onclick="updateStatusToAwaiting()">
                        <i class="fab fa-whatsapp"></i> إرسال الوصل عبر الواتساب للأسرع
                    </a>
                    
                    <a href="${emailUrl}" target="_blank" style="background:#ea4335; color:#fff; padding:12px; border-radius:6px; font-weight:bold; text-decoration:none; display:block;" onclick="updateStatusToAwaiting()">
                        <i class="far fa-envelope"></i> إرسال الوصل عبر البريد الإلكتروني
                    </a>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// دالة تخبر السجل أن المستخدم ضغط على روابط الإرسال وتوجه للدفع
function updateStatusToAwaiting() {
    sendDataToGoogleSheets(userData.name, userData.email, "تحديث - جاري التواصل لإرسال الوصل", "في انتظار الوصل", null);
    setTimeout(() => {
        closeModal();
    }, 1000);
}





function submitReceiptConfirm(method) {
    const fileInput = document.getElementById('paymentReceipt');
    if (!fileInput.files || fileInput.files.length === 0) {
        alert("الرجاء اختيار صورة أو لقطة شاشة لوصل الدفع أولاً لتأكيد عمليتك!");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    // إظهار رسالة تحميل للمطلب أثناء المعالجة والرفع
    alert("جاري رفع إثبات الدفع وتحديث بياناتك في السجل، يرجى الانتظار ثوانٍ...");

    reader.onload = function(e) {
        // استخراج كود الصورة الصافي (Base64)
        const base64Data = e.target.result.split(',')[1]; 
        
        const fileData = {
            bytes: base64Data,
            name: `${userData.name}_${Date.now()}_receipt.png`,
            type: file.type
        };

        // إرسال التحديث للـ Google Sheet (تحديث الحالة إلى مدفوع وإرفاق كود الوصل)
        // نرسل اسم المستخدم وإيميله لكي يبحث عنه السكريبت ويحدث نفس السطر
        sendDataToGoogleSheets(userData.name, userData.email, "خطة مدفوعة المظهر", "مدفوع", fileData);

        // عرض واجهة النجاح للمستخدم بعد الرفع
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.innerHTML = `
                <div style="padding: 20px 10px; text-align: center;" dir="rtl">
                    <i class="fas fa-check-circle" style="font-size: 4rem; color: #2ecc71; margin-bottom: 15px;"></i>
                    <h3 style="color: #fff; margin-bottom: 10px;">تم إرسال طلبك بنجاح! 👍</h3>
                    <p style="font-size: 0.95rem; color: var(--text-gray); line-height: 1.6; margin-bottom: 15px;">
                        شكراً لك! لقد تم تسجيل لقطة شاشة الدفع بنجاح في أنظمتنا وتحويل حسابك إلى الخطة المدفوعة.
                    </p>
                    <p style="font-size: 1rem; color: #ffd700; font-weight: bold; background: rgba(255,215,0,0.1); padding: 10px; border-radius: 6px; border: 1px dashed #ffd700;">
                        ⚠️ سوف يتم الرد عليك خلال 24 ساعة كحد أقصى لإرسال خطتك التدريبية الكاملة على بريدك الإلكتروني: (${userData.email}).
                    </p>
                    <button class="btn-primary" onclick="closeModal()" style="margin-top: 20px; padding: 10px 25px;">مفهوم، سأراقب بريدي</button>
                </div>
            `;
        }
    };

    reader.readAsDataURL(file);
}









function updateSheetWithPaymentStatus() {
    const scriptUrl = "https://script.google.com/macros/s/AKfycbwP5unUwPgB3e0gvknCazvbvyOHJC4xqFYmWeaGVobWYjO9PpVa9wv_2iNtGbZlpKv8/exec"; 
    fetch(scriptUrl, { 
        method: 'POST', 
        mode: 'no-cors', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ email: userData.email, status: "Paid - Awaiting Receipt Review", date: new Date().toLocaleString() }) 
    });
}

function closeModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) modal.remove();
}

function copyRip() {
    const ripText = document.getElementById('ripNum').innerText;
    navigator.clipboard.writeText(ripText).then(() => {
        const copyBtn = document.querySelector('.btn-copy');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `<i class="fas fa-check"></i> تم النسخ`;
        copyBtn.style.background = "#2ecc71";
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = "var(--primary)";
        }, 2000);
    });
}

function restartQuiz() {
    currentQuestionIndex = 0;
    userScores = { Creativity: 0, Adventure: 0, Social: 0, Focus: 0, Logic: 0, Nature: 0, Leadership: 0, Competition: 0, Patience: 0, Technology: 0, Art: 0, Fitness: 0 };
    answersHistory = [];
    document.getElementById('resultScreen').classList.remove('active');
    document.getElementById('welcomeScreen').classList.add('active');
}

// ==========================================
// 9. تفعيل شاشة التحميل الافتتاحية
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        const appMain = document.getElementById('app-main');
        if(splash) splash.classList.add('fade-out');
        if(appMain) appMain.classList.remove('hidden');
    }, 2500);
});

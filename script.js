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
    { name: "الأمن السيبراني", category: "تقنية", desc: "حماي
// تفعيل التفاعل عند مرور الماوس على الجدول
document.querySelectorAll('.interactive-table tbody tr').forEach(row => {
    row.addEventListener('mouseover', () => {
        row.style.backgroundColor = '#f0f0f0';
    });
    row.addEventListener('mouseout', () => {
        row.style.backgroundColor = '';
    });
});

// إنشاء الرسم البياني العمودي لبيانات المستشفيات
const ctx = document.getElementById('hospitalsChart').getContext('2d');
const hospitalsChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['FMC', 'LMH', 'MH', 'NHS', 'RAH', 'TQEH', 'WCH'],
        datasets: [{
            label: 'Avg Wait Time (min)',
            data: [119, 140, 17, 81, 69, 62, 39],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// رسم شارت حراري (heatmap) باستخدام bubble chart لتمثيل الحالات المختلفة
const heatmapCtx = document.getElementById('heatmapChart').getContext('2d');
const heatmapChart = new Chart(heatmapCtx, {
    type: 'bubble',
    data: {
        datasets: [{
            label: 'FMC Waiting Times',
            data: [
                { x: 0, y: 0, r: 11 }, // 0-2 hours
                { x: 1, y: 1, r: 43 },  // 2-4 hours
                { x: 2, y: 2, r: 12 },  // 4-8 hours
                { x: 3, y: 3, r: 53 },  // 8-12 hours
                { x: 4, y: 4, r: 64 }   // 12-24 hours
            ],
            backgroundColor: function(context) {
                const value = context.raw.r;
                if (value > 50) return 'rgba(255, 99, 132, 0.6)'; // أحمر
                if (value > 35) return 'rgba(255, 206, 86, 0.6)';  // أصفر
                return 'rgba(75, 192, 192, 0.6)';  // أخضر
            }
        }]
    },
    options: {
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        const labels = ['0-2 hours', '2-4 hours', '4-8 hours', '8-12 hours', '12-24 hours'];
                        return labels[value];
                    }
                }
            },
            y: {
                beginAtZero: true,
                display: false  // يمكن إخفاء المحور العمودي إذا كان غير ضروري
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return 'عدد المرضى: ' + tooltipItem.raw.r;
                    }
                }
            }
        }
    }
});

// سكريبت الشرح باستخدام Intro.js
document.getElementById('startTutorial').addEventListener('click', function() {
    introJs().setOptions({
        steps: [
            {
                intro: "مرحبًا! سأشرح لك عناصر لوحة التحكم هذه."
            },
            {
                element: document.querySelector('h1'),
                intro: "هذا هو عنوان لوحة التحكم، يُظهر اسم لوحة قسم الطوارئ."
            },
            {
                element: document.querySelector('.card:nth-child(1)'),
                intro: "هذه البطاقة تُظهر حالة مستشفى الملك عبدالعزيز."
            },
            {
                element: document.querySelector('.card:nth-child(2)'),
                intro: "وهذه البطاقة تُظهر حالة مستشفى الملك فيصل."
            },
            {
                element: document.querySelector('.card:nth-child(3)'),
                intro: "أما هذه، فهي تعرض حالة مستشفى الأمير منصور."
            },
            {
                element: document.querySelector('.interactive-table'),
                intro: "هنا تجد الجدول الذي يعرض معلومات عن حالات الطوارئ مثل القبولات والحالات المكتملة."
            },
            {
                element: document.querySelector('#hospitalsChart'),
                intro: "هنا لدينا الرسم البياني الذي يوضح متوسط أوقات الانتظار في مختلف المستشفيات."
            },
            {
                element: document.querySelector('#heatmapChart'),
                intro: "وأخيرًا، هذا هو الشارت الحراري الذي يعرض أوقات انتظار مختلفة باستخدام الألوان."
            }
        ]
    }).start();
});

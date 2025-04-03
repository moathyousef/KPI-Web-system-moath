// دالة لحساب التاريخ التالي بناءً على التكرار
function getNextDate(frequency) {
    const today = new Date();
    let nextDate = new Date(today);

    if (frequency === 'Monthly') {
        nextDate.setMonth(today.getMonth() + 1); // إضافة شهر
    } else if (frequency === 'Quarterly') {
        nextDate.setMonth(today.getMonth() + 3); // إضافة 3 أشهر
    } else if (frequency === 'Semi-Annual') {
        nextDate.setMonth(today.getMonth() + 6); // إضافة 6 أشهر
    } else if (frequency === 'Annually') {
        nextDate.setFullYear(today.getFullYear() + 1); // إضافة سنة
    }

    return nextDate.toISOString().split('T')[0]; // إرجاع التاريخ بتنسيق YYYY-MM-DD
}

// دالة لإضافة KPI جديدة
document.getElementById('kpi-form').addEventListener('submit', function (e) {
    e.preventDefault();  // منع إعادة تحميل الصفحة

    const objectiveName = document.getElementById('objective-name').value;
    const kpi = document.getElementById('kpi').value;
    const kpiId = document.getElementById('kpi-id').value;
    const description = document.getElementById('description').value;
    const frequency = document.getElementById('frequency').value;
    const value = document.getElementById('value').value;
    const threshold = document.getElementById('threshold').value;
    const date = document.getElementById('date').value;
    const nextDate = getNextDate(frequency);  // حساب التاريخ التالي بناءً على التكرار

    const newKPI = {
        objectiveName,
        kpi,
        kpiId,
        description,
        frequency,
        value,
        threshold,
        date,
        nextDate
    };

    // استرجاع الـ KPIs من localStorage أو تهيئتها كمصفوفة فارغة إذا لم توجد
    const kpis = JSON.parse(localStorage.getItem('kpis')) || [];
    kpis.push(newKPI);  // إضافة الـ KPI الجديد إلى المصفوفة

    // حفظ الـ KPIs المحدثة في localStorage
    localStorage.setItem('kpis', JSON.stringify(kpis));

    // إعادة تحميل الـ KPIs في نفس الصفحة (بدون إعادة التوجيه)
    loadKPIs(); // تحميل الـ KPIs المعروضة مباشرة

    // إعادة تعيين النموذج
    document.getElementById('kpi-form').reset();
});

// دالة لتحميل الـ KPIs وعرضها في صفحة الـ Dashboard
function loadKPIs() {
    const kpis = JSON.parse(localStorage.getItem('kpis')) || []; // استرجاع الـ KPIs من localStorage
    const container = document.getElementById('kpi-container'); // الحصول على العنصر الذي سيتم إضافة الـ KPIs إليه
    container.innerHTML = '';  // مسح المحتوى القديم في الجدول

    // إذا كانت هناك بيانات، سيتم عرضها هنا
    kpis.forEach(kpi => {
        const row = document.createElement('tr');  // إنشاء صف جديد في الجدول
        row.innerHTML = `
            <td>${kpi.objectiveName}</td>
            <td>${kpi.kpi}</td>
            <td>${kpi.kpiId}</td>
            <td>${kpi.description}</td>
            <td>${kpi.frequency}</td>
            <td>${kpi.value}</td>
            <td>${kpi.threshold}</td>
            <td>${kpi.date}</td>
            <td>${kpi.nextDate}</td> 
            <td><button onclick="deleteKPI('${kpi.kpiId}')">Delete</button></td>
        `;
        container.appendChild(row);  // إضافة الصف إلى الجدول
    });
}

// دالة لحذف الـ KPI من الـ localStorage
function deleteKPI(kpiId) {
    const kpis = JSON.parse(localStorage.getItem('kpis')) || [];
    const updatedKPIs = kpis.filter(kpi => kpi.kpiId !== kpiId);  // فلترة الـ KPIs لإزالة الـ KPI المحدد
    localStorage.setItem('kpis', JSON.stringify(updatedKPIs));  // حفظ الـ KPIs المحدثة في localStorage
    loadKPIs();  // إعادة تحميل الـ KPIs بعد الحذف
}

// تحميل الـ KPIs عند فتح الصفحة
window.onload = function() {
    loadKPIs();  // استرجاع وعرض الـ KPIs عند تحميل صفحة الـ Dashboard
};
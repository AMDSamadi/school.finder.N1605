document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const resultDiv = document.getElementById('result');

    searchBtn.addEventListener('click', async () => {
        // دریافت مقادیر از فرم
        const gender = document.getElementById('gender').value;
        const grade = document.getElementById('grade').value;
        const streetName = document.getElementById('street').value.trim();
        const streetNumber = document.getElementById('number').value.trim();

        // بررسی پر بودن فیلدها
        if (!gender || !grade || !streetName || !streetNumber) {
            alert('لطفاً تمام فیلدها را تکمیل کنید.');
            return;
        }

        // تعیین دوره تحصیلی بر اساس پایه
        let period = "";
        if (['1', '2', '3'].includes(grade)) {
            period = "اول";
        } else if (['4', '5', '6'].includes(grade)) {
            period = "دوم";
        }

        // ساخت رشته جستجو (مثلاً: "نبوت 45")
        const searchString = `${streetName} ${streetNumber}`.trim();

        try {
            // خواندن فایل جیسون
            const response = await fetch('schools.json');
            if (!response.ok) throw new Error('فایل داده‌ها یافت نشد.');
            const schools = await response.json();

            // فیلتر کردن مدارس
            const matchedSchool = schools.find(school => {
                // 1. بررسی جنسیت
                const genderMatch = school['جنسیت'] === gender;
                
                // 2. بررسی دوره (اول یا دوم)
                const periodMatch = school['دوره'] === period;

                // 3. جستجو در تمام ستون‌های شماره کوچه (از 1 تا 100)
                let streetMatch = false;
                for (let i = 1; i <= 100; i++) {
                    const key = `شماره کوچه ${i}`;
                    if (school[key] && school[key].toString().trim() === searchString) {
                        streetMatch = true;
                        break;
                    }
                }

                return genderMatch && periodMatch && streetMatch;
            });

            // نمایش نتیجه
            displayResult(matchedSchool, gender);

        } catch (error) {
            console.error('Error:', error);
            resultDiv.innerHTML = `<div class="not-found">خطا در بارگذاری اطلاعات. لطفاً دوباره تلاش کنید.</div>`;
        }
    });

    function displayResult(school, gender) {
        if (!school) {
            resultDiv.innerHTML = `<div class="not-found">❌ متأسفانه مدرسه‌ای برای این محدوده و شرایط یافت نشد.</div>`;
            return;
        }

        // تعیین استایل و ایموجی بر اساس جنسیت
        const cardClass = gender === 'پسرانه' ? 'boys' : 'girls';
        const emoji = gender === 'پسرانه' ? '👦' : '🧕';

        resultDiv.innerHTML = `
            <div class="result-card ${cardClass}">
                <div style="font-size: 50px; text-align: center; margin-bottom: 10px;">${emoji}</div>
                <h3>${school['نام مدرسه']}</h3>
                <p><strong>📍 آدرس:</strong> ${school['آدرس مدرسه']}</p>
                <p><strong>☎️ تلفن:</strong> ${school['شماره تماس']}</p>
                <p><strong>🕒 نوبت:</strong> ${school['نوبت']}</p>
                <p><strong>📚 دوره:</strong> ${school['دوره']}</p>
                <p><strong>🔁 مدارس مجاور:</strong><br> ${school['مدارس مجاور'].replace(/\n/g, ' ، ')}</p>
            </div>
        `;
    }
});

let schools = [];

const genderInput = document.getElementById("gender");
const gradeInput = document.getElementById("grade");
const streetInput = document.getElementById("street");
const numberInput = document.getElementById("number");
const resultBox = document.getElementById("result");
const searchBtn = document.getElementById("searchBtn");

document.addEventListener("DOMContentLoaded", () => {
    loadSchools();
    searchBtn.addEventListener("click", searchSchool);

    // جستجو با فشردن دکمه Enter
    [genderInput, gradeInput, streetInput, numberInput].forEach(input => {
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                searchSchool();
            }
        });
    });
});

async function loadSchools() {
    try {
        resultBox.innerHTML = `<div class="not-found">در حال بارگذاری اطلاعات مدارس...</div>`;
        const response = await fetch("schools.json");
        if (!response.ok) {
            throw new Error("خطا در بارگذاری فایل JSON");
        }
        schools = await response.json();
        resultBox.innerHTML = "";
        console.log("مدارس بارگذاری شدند:", schools.length);
    } catch (error) {
        console.error("خطا در خواندن فایل:", error);
        resultBox.innerHTML = `
            <div class="not-found">
                خطا در بارگذاری اطلاعات مدارس.<br>
                لطفاً مطمئن شوید فایل <strong>schools.json</strong> به‌درستی آپلود شده باشد.
            </div>
        `;
    }
}

function normalize(text) {
    if (!text) return "";
    return toEnglishDigits(String(text))
        .replace(/ي/g, "ی")
        .replace(/ك/g, "ک")
        .replace(/\u200c/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function toEnglishDigits(value) {
    return String(value)
        .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
        .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
}

function getLevel(grade) {
    const num = Number(grade);
    if ([1, 2, 3].includes(num)) return "اول";
    if ([4, 5, 6].includes(num)) return "دوم";
    return "";
}
function searchSchool() {

    const gender = normalize(genderInput.value);
    const grade = gradeInput.value;
    const street = normalize(streetInput.value);
    const number = normalize(numberInput.value);

    if (!gender || !grade || !street) {
        resultBox.innerHTML = `
        <div class="not-found">
            لطفاً همه اطلاعات را وارد کنید.
        </div>`;
        return;
    }

    const level = getLevel(grade);
    const fullStreet = normalize(street + " " + number);

    const matchedSchools = [];

    for (const school of schools) {

        if (normalize(school.gender) !== gender)
            continue;

        // مدرسه‌ای که هم دوره اول و هم دوم دارد
        if (!normalize(school.level).includes(level))
            continue;

        let found = false;

        // جستجوی مستقیم در لیست کوچه‌ها
        if (Array.isArray(school.streets)) {

            for (const s of school.streets) {

                const value = normalize(s);

                if (number) {

                    if (value === fullStreet) {
                        found = true;
                        break;
                    }

                } else {

                    if (value.startsWith(street + " ")) {
                        found = true;
                        break;
                    }

                }

            }

        }

        // اگر در لیست کوچه‌ها پیدا نشد،
        // محدوده ثبت نام بررسی شود
        if (!found && school.region) {

            const region = normalize(school.region);

            if (region.includes(street)) {

                const n = parseInt(number);

                if (!isNaN(n)) {

                    // تمام فردها
                    if (
                        region.includes("تمام فردها") &&
                        n % 2 === 1
                    ) {
                        found = true;
                    }

                    // تمام زوج ها
                    if (
                        region.includes("تمام زوج") &&
                        n % 2 === 0
                    ) {
                        found = true;
                    }

                    // الی آخر
                    if (
                        region.includes("الی آخر")
                    ) {
                        found = true;
                    }

                }

            }

        }

        if (found) {
            matchedSchools.push(school);
        }

    }

    if (matchedSchools.length === 0) {

        resultBox.innerHTML = `
        <div class="not-found">
            مدرسه‌ای برای این محدوده یافت نشد.
        </div>`;

        return;

    }

    resultBox.innerHTML = "";

    resultBox.innerHTML += `
    <div style="
        background:#0b5ed7;
        color:white;
        padding:12px;
        border-radius:12px;
        margin-bottom:20px;
        text-align:center;
        font-weight:bold;">
        ✅ ${matchedSchools.length} مدرسه برای این محدوده یافت شد.
    </div>`;

    matchedSchools.forEach(school => {
        resultBox.innerHTML += createCard(school);
    });

}
function searchSchool() {

    const gender = normalize(genderInput.value);
    const grade = gradeInput.value;
    const street = normalize(streetInput.value);
    const number = normalize(numberInput.value);

    if (!gender || !grade || !street) {
        resultBox.innerHTML = `
        <div class="not-found">
            لطفاً همه اطلاعات را وارد کنید.
        </div>`;
        return;
    }

    const level = getLevel(grade);
    const fullStreet = normalize(street + " " + number);

    const matchedSchools = [];

    for (const school of schools) {

        if (normalize(school.gender) !== gender)
            continue;

        // مدرسه‌ای که هم دوره اول و هم دوم دارد
        if (!normalize(school.level).includes(level))
            continue;

        let found = false;

        // جستجوی مستقیم در لیست کوچه‌ها
        if (Array.isArray(school.streets)) {

            for (const s of school.streets) {

                const value = normalize(s);

                if (number) {

                    if (value === fullStreet) {
                        found = true;
                        break;
                    }

                } else {

                    if (value.startsWith(street + " ")) {
                        found = true;
                        break;
                    }

                }

            }

        }

        // اگر در لیست کوچه‌ها پیدا نشد،
        // محدوده ثبت نام بررسی شود
        if (!found && school.region) {

            const region = normalize(school.region);

            if (region.includes(street)) {

                const n = parseInt(number);

                if (!isNaN(n)) {

                    // تمام فردها
                    if (
                        region.includes("تمام فردها") &&
                        n % 2 === 1
                    ) {
                        found = true;
                    }

                    // تمام زوج ها
                    if (
                        region.includes("تمام زوج") &&
                        n % 2 === 0
                    ) {
                        found = true;
                    }

                    // الی آخر
                    if (
                        region.includes("الی آخر")
                    ) {
                        found = true;
                    }

                }

            }

        }

        if (found) {
            matchedSchools.push(school);
        }

    }

    if (matchedSchools.length === 0) {

        resultBox.innerHTML = `
        <div class="not-found">
            مدرسه‌ای برای این محدوده یافت نشد.
        </div>`;

        return;

    }

    resultBox.innerHTML = "";

    resultBox.innerHTML += `
    <div style="
        background:#0b5ed7;
        color:white;
        padding:12px;
        border-radius:12px;
        margin-bottom:20px;
        text-align:center;
        font-weight:bold;">
        ✅ ${matchedSchools.length} مدرسه برای این محدوده یافت شد.
    </div>`;

    matchedSchools.forEach(school => {
        resultBox.innerHTML += createCard(school);
    });

}

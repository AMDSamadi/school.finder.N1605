let schoolsData = [];

const genderInput = document.getElementById("gender");
const gradeInput = document.getElementById("grade");
const streetInput = document.getElementById("street");
const numberInput = document.getElementById("number");
const searchBtn = document.getElementById("searchBtn");
const resultBox = document.getElementById("result");

document.addEventListener("DOMContentLoaded", () => {
    loadSchools();

    searchBtn.addEventListener("click", findSchool);

    [genderInput, gradeInput, streetInput, numberInput].forEach(input => {
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                findSchool();
            }
        });
    });
});

async function loadSchools() {
    try {
        resultBox.innerHTML = `<div class="not-found">در حال بارگذاری اطلاعات مدارس...</div>`;

        const response = await fetch("./schools.json");

        if (!response.ok) {
            throw new Error("خطا در خواندن فایل schools.json");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
            schoolsData = data;
        } else if (typeof data === "object" && data !== null) {
            schoolsData = [data];
        } else {
            schoolsData = [];
        }

        resultBox.innerHTML = "";
    } catch (error) {
        console.error("خطا در بارگذاری JSON:", error);
        resultBox.innerHTML = `
            <div class="not-found">
                خطا در بارگذاری فایل مدارس.<br>
                لطفاً بررسی کنید فایل <strong>schools.json</strong> درست آپلود شده باشد.
            </div>
        `;
    }
}

function findSchool() {
    if (!schoolsData.length) {
        resultBox.innerHTML = `
            <div class="not-found">
                اطلاعات مدارس هنوز بارگذاری نشده است.
            </div>
        `;
        return;
    }

    const gender = normalizeText(genderInput.value);
    const grade = toEnglishDigits(String(gradeInput.value)).trim();
    const street = normalizeText(streetInput.value);
    const number = toEnglishDigits(String(numberInput.value)).trim();

    const period = getPeriodByGrade(grade);

    if (!gender) {
        showError("لطفاً جنسیت مدرسه را انتخاب کنید.");
        return;
    }

    if (!grade || !period) {
        showError("لطفاً پایه تحصیلی را انتخاب کنید.");
        return;
    }

    if (!street) {
        showError("لطفاً نام کوچه را وارد کنید.");
        return;
    }

    const matches = schoolsData.filter((school) => {
        const schoolGender = normalizeText(school["جنسیت"]);
        const schoolPeriod = normalizeText(school["دوره"]);

        if (schoolGender !== gender) return false;
        if (schoolPeriod !== period) return false;

        const streetList = getStreetList(school);

        return isStreetMatched(streetList, street, number);
    });

    if (!matches.length) {
        resultBox.innerHTML = `
            <div class="not-found">
                مدرسه‌ای برای این محدوده یافت نشد.
            </div>
        `;
        return;
    }

    renderResults(matches);
}

function getPeriodByGrade(grade) {
    const num = Number(grade);

    if ([1, 2, 3].includes(num)) return "اول";
    if ([4, 5, 6].includes(num)) return "دوم";

    return "";
}

function getStreetList(school) {
    const list = [];

    Object.keys(school).forEach((key) => {
        if (key.startsWith("شماره کوچه")) {
            const value = school[key];

            if (value !== null && value !== undefined && String(value).trim() !== "") {
                list.push(normalizeText(String(value)));
            }
        }
    });

    return [...new Set(list)];
}

function isStreetMatched(streetList, street, number) {
    const normalizedStreet = normalizeText(street);
    const fullAddress = number
        ? normalizeText(`${normalizedStreet} ${number}`)
        : normalizedStreet;

    return streetList.some((item) => {
        const value = normalizeText(item);

        if (number) {
            return value === fullAddress || value === normalizedStreet;
        }

        return value === normalizedStreet || value.startsWith(normalizedStreet + " ");
    });
}

function renderResults(matches) {
    const html = matches.map((school) => createSchoolCard(school)).join("");
    resultBox.innerHTML = html;
}

function createSchoolCard(school) {
    const gender = normalizeText(school["جنسیت"]);
    const cardClass = gender === "پسرانه" ? "boys" : "girls";
    const emoji = gender === "پسرانه" ? "👦" : "🧕";

    const schoolName = school["نام مدرسه"] || "ثبت نشده";
    const phone = school["شماره تماس"] || "ثبت نشده";
    const address = school["آدرس مدرسه"] || "ثبت نشده";
    const shift = school["نوبت"] || "ثبت نشده";
    const period = school["دوره"] || "ثبت نشده";
    const neighbors = school["مدارس مجاور"] || "ندارد";
    const area = school["محدوده ثبت نام"] || "";

    return `
        <div class="result-card ${cardClass}" style="margin-bottom:20px;">
            <h3>${emoji} ${escapeHtml(schoolName)}</h3>
            <p><strong>📚 دوره:</strong> ${escapeHtml(period)}</p>
            <p><strong>🕒 شیفت:</strong> ${escapeHtml(shift)}</p>
            <p><strong>☎ شماره تماس:</strong> ${escapeHtml(String(phone))}</p>
            <p><strong>📍 آدرس مدرسه:</strong> ${escapeHtml(address)}</p>
            <p><strong>🔁 مدارس مجاور:</strong><br>${formatMultiline(neighbors)}</p>
            ${area ? `<p><strong>🗺 محدوده ثبت نام:</strong><br>${formatMultiline(area)}</p>` : ""}
        </div>
    `;
}

function showError(message) {
    resultBox.innerHTML = `
        <div class="not-found">
            ${escapeHtml(message)}
        </div>
    `;
}

function formatMultiline(value) {
    return escapeHtml(String(value)).replace(/\n/g, "<br>");
}

function normalizeText(text) {
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

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

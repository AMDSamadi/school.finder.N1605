let schools = [];

const genderInput = document.getElementById("gender");
const gradeInput = document.getElementById("grade");
const streetInput = document.getElementById("street");
const numberInput = document.getElementById("number");
const result = document.getElementById("result");
const searchBtn = document.getElementById("searchBtn");

document.addEventListener("DOMContentLoaded", loadSchools);

async function loadSchools() {

    try {

        const response = await fetch("schools.json");

        if (!response.ok) {
            throw new Error("خطا در بارگذاری فایل JSON");
        }

        schools = await response.json();

        console.log("Schools Loaded:", schools.length);

    } catch (err) {

        console.error(err);

        result.innerHTML = `
        <div class="not-found">
        خطا در بارگذاری اطلاعات مدارس
        </div>`;

    }

}

searchBtn.addEventListener("click", searchSchool);

function normalize(text){

    return String(text)
        .replace(/ي/g,"ی")
        .replace(/ك/g,"ک")
        .replace(/[۰-۹]/g,function(d){
            return "۰۱۲۳۴۵۶۷۸۹".indexOf(d);
        })
        .replace(/[٠-٩]/g,function(d){
            return "٠١٢٣٤٥٦٧٨٩".indexOf(d);
        })
        .replace(/\u200c/g," ")
        .replace(/\s+/g," ")
        .trim();

}

function getLevel(grade){

    grade=Number(grade);

    if(grade>=1 && grade<=3)
        return "اول";

    if(grade>=4 && grade<=6)
        return "دوم";

    return "";

}

function searchSchool(){

    const gender=normalize(genderInput.value);

    const grade=gradeInput.value;

    const street=normalize(streetInput.value);

    const number=normalize(numberInput.value);

    if(!gender || !grade || !street){

        result.innerHTML=`
        <div class="not-found">
        لطفاً تمام اطلاعات را وارد کنید.
        </div>`;

        return;

    }

    const level=getLevel(grade);

    const address=normalize(street+" "+number);

    let found=null;    for (const school of schools) {

        if (normalize(school.gender) !== gender)
            continue;

        if (normalize(school.level) !== level)
            continue;

        let matched = false;

        for (const item of school.streets) {

            if (normalize(item) === address) {
                matched = true;
                break;
            }

        }

        if (matched) {
            found = school;
            break;
        }

    }

    if (found == null) {

        result.innerHTML = `
        <div class="not-found">
        مدرسه‌ای برای این محدوده یافت نشد.
        </div>`;

        return;

    }

    let cardClass = "girls";
    let emoji = "🧕";

    if (found.gender === "پسرانه") {
        cardClass = "boys";
        emoji = "👦";
    }

    result.innerHTML = `
    <div class="result-card ${cardClass}">

        <h3>${emoji} ${found.name}</h3>

        <p><strong>📚 دوره:</strong> ${found.level}</p>

        <p><strong>🕒 شیفت:</strong> ${found.shift}</p>

        <p><strong>☎ شماره تماس:</strong> ${found.phone}</p>

        <p><strong>📍 آدرس:</strong><br>${found.address}</p>

        <p><strong>🗺 محدوده ثبت‌نام:</strong><br>
        ${found.region.replace(/\n/g,"<br>")}
        </p>

        <p><strong>🏫 مدارس مجاور:</strong><br>
        ${found.adjacent.replace(/\n/g,"<br>")}
        </p>

    </div>
    `;

}

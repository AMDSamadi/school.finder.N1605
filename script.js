// ======================================
// School Finder - Version 3
// ======================================

let schools = [];

const genderInput = document.getElementById("gender");
const gradeInput = document.getElementById("grade");
const streetInput = document.getElementById("street");
const numberInput = document.getElementById("number");
const resultBox = document.getElementById("result");
const searchBtn = document.getElementById("searchBtn");

document.addEventListener("DOMContentLoaded", init);

async function init(){

    await loadSchools();

    searchBtn.addEventListener("click", searchSchool);

    [genderInput,gradeInput,streetInput,numberInput].forEach(item=>{

        item.addEventListener("keydown",e=>{

            if(e.key==="Enter")
                searchSchool();

        });

    });

}

async function loadSchools(){

    try{

        const response=await fetch("schools.json");

        if(!response.ok)
            throw new Error("خطا در بارگذاری اطلاعات مدارس");

        schools=await response.json();

        console.log("Loaded:",schools.length);

    }

    catch(err){

        console.error(err);

        resultBox.innerHTML=`
        <div class="not-found">
        خطا در بارگذاری اطلاعات مدارس
        </div>`;

    }

}

function normalize(text){

    if(text===undefined || text===null)
        return "";

    return toEnglishDigits(String(text))

        .replace(/ي/g,"ی")
        .replace(/ك/g,"ک")

        .replace(/[()]/g,"")

        .replace(/بابانظر/g,"بابا نظر")
        .replace(/ابرهیم/g,"ابراهیم")
        .replace(/صاحبدادی/g,"صاحب دادی")
        .replace(/صاحبالزمان/g,"صاحب الزمان")
        .replace(/اسماعیلپور/g,"اسماعیل پور")
        .replace(/میرزاکوچک/g,"میرزا کوچک")

        .replace(/\u200c/g," ")

        .replace(/\r/g," ")
        .replace(/\n/g," ")

        .replace(/\s+/g," ")

        .trim();

}

function toEnglishDigits(text){

    return String(text)

    .replace(/[۰-۹]/g,d=>"۰۱۲۳۴۵۶۷۸۹".indexOf(d))

    .replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d));

}

function getLevel(grade){

    grade=Number(grade);

    if(grade>=1 && grade<=3)
        return "اول";

    if(grade>=4 && grade<=6)
        return "دوم";

    return "";

}

function isInStreetList(streets,address,street){

    if(!Array.isArray(streets))
        return false;

    for(const item of streets){

        const value=normalize(item);

        if(address){

            if(value===address)
                return true;

        }else{

            if(value.startsWith(street+" "))
                return true;

        }

    }

    return false;

}

function searchSchool(){

    const gender=normalize(genderInput.value);

    const level=getLevel(gradeInput.value);

    const street=normalize(streetInput.value);

    const number=normalize(numberInput.value);

    if(!gender || !level || !street){

        resultBox.innerHTML=`
        <div class="not-found">
        لطفاً اطلاعات را کامل وارد کنید.
        </div>`;

        return;

    }

    const address=normalize(street+" "+number);

        const matchedSchools=[];

    for(const school of schools){

        if(normalize(school.gender)!==gender)
            continue;

        if(!normalize(school.level).includes(level))
            continue;

        let found=false;

        // جستجوی دقیق در لیست کوچه‌ها
        found=isInStreetList(
            school.streets,
            address,
            street
        );

        // اگر پیدا نشد، محدوده ثبت نام بررسی شود
        if(!found && school.region && number){

            found=isInRegion(
                school.region,
                street,
                Number(number)
            );

        }

        if(found){

            matchedSchools.push(school);

        }

    }

    if(matchedSchools.length===0){

        resultBox.innerHTML=`
        <div class="not-found">
            مدرسه‌ای برای این محدوده یافت نشد.
        </div>`;

        return;

    }

    resultBox.innerHTML=`
    <div style="
        background:#0d6efd;
        color:white;
        padding:12px;
        border-radius:12px;
        margin-bottom:20px;
        text-align:center;
        font-weight:bold;">
        ✅ ${matchedSchools.length} مدرسه برای این محدوده یافت شد.
    </div>
    `;

    matchedSchools.forEach(school=>{

        resultBox.innerHTML+=createCard(school);

    });

}

// ======================
// بررسی محدوده ثبت نام
// ======================

function isInRegion(region,street,number){

    region=normalize(region);
    street=normalize(street);

    const parts=region.split("/");

    for(const part of parts){

        const item=normalize(part);

        if(!item.startsWith(street))
            continue;

        // تمام فردها
        if(item.includes("تمام فرد")){

            return number%2===1;

        }

        // تمام زوج‌ها
        if(item.includes("تمام زوج")){

            return number%2===0;

        }

        // زوج X تا Y
        let m=item.match(/زوج\s*(\d+)\s*(?:تا|الی)\s*(\d+)/);

        if(m){

            const start=Number(m[1]);
            const end=Number(m[2]);

            if(number%2===0 && number>=start && number<=end)
                return true;

        }

        // فرد X تا Y
        m=item.match(/فرد\s*(\d+)\s*(?:تا|الی)\s*(\d+)/);

        if(m){

            const start=Number(m[1]);
            const end=Number(m[2]);

            if(number%2===1 && number>=start && number<=end)
                return true;

        }

        // زوج X الی آخر
        m=item.match(/زوج\s*(\d+)\s*الی\s*آخر/);

        if(m){

            const start=Number(m[1]);

            if(number%2===0 && number>=start)
                return true;

        }

        // فرد X الی آخر
        m=item.match(/فرد\s*(\d+)\s*الی\s*آخر/);

        if(m){

            const start=Number(m[1]);

            if(number%2===1 && number>=start)
                return true;

        }

    }

    return false;

}

function createCard(school){

    const cardClass =
        school.gender==="پسرانه" ? "boys" : "girls";

    const emoji =
        school.gender==="پسرانه" ? "👦" : "🧕";

    let neighborsHtml="";

    if(school.adjacent){

        const neighbors=school.adjacent
            .split("\n")
            .map(x=>x.trim())
            .filter(x=>x!=="");

        neighbors.forEach(name=>{

            neighborsHtml+=`
                <button
                    class="neighbor-btn"
                    onclick="showNeighbor(${JSON.stringify(name)})">
                    ${name}
                </button>
            `;

        });

    }

    return `

    <div class="result-card ${cardClass}">

        <h3>${emoji} ${school.name}</h3>

        <p><strong>📚 دوره:</strong> ${school.level}</p>

        <p><strong>🕒 شیفت:</strong> ${school.shift}</p>

        <p><strong>☎ تلفن:</strong> ${school.phone}</p>

        <p><strong>📍 آدرس:</strong><br>${school.address}</p>

        <p><strong>🗺 محدوده ثبت نام:</strong><br>
        ${String(school.region||"").replace(/\n/g,"<br>")}
        </p>

        <hr style="margin:15px 0;opacity:.25;">

        <p><strong>🏫 مدارس مجاور</strong></p>

        <div class="neighbors">
            ${neighborsHtml || "ندارد"}
        </div>

    </div>

    `;

}

function showNeighbor(name){

    const target = normalize(name)
        .replace(/[()]/g,"")
        .replace(/\s+/g," ")
        .trim();

    const school = schools.find(s => {

        const schoolName = normalize(s.name)
            .replace(/[()]/g,"")
            .replace(/\s+/g," ")
            .trim();

        return schoolName === target;

    });

    if(!school){

        console.log("دنبال این مدرسه گشتم:", target);

        console.log("لیست مدارس:");

        schools.forEach(s=>console.log(s.name));

        alert("اطلاعات این مدرسه در فایل پیدا نشد.");

        return;

    }

    resultBox.innerHTML = createCard(school);

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

    resultBox.innerHTML=`
        <div style="
            background:#198754;
            color:white;
            padding:12px;
            border-radius:12px;
            margin-bottom:20px;
            text-align:center;
            font-weight:bold;">
            🏫 اطلاعات مدرسه مجاور
        </div>
    `;

    resultBox.innerHTML+=createCard(school);

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

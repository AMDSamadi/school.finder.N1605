// =======================================
// School Finder
// Version 4.0
// =======================================

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
            throw new Error("خطا در بارگذاری فایل مدارس");

        schools=await response.json();

        console.log("Schools Loaded:",schools.length);

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

function isInStreetList(streets,address){

    if(!Array.isArray(streets))
        return false;

    address=normalize(address);

    return streets.some(item=>normalize(item)===address);

}

function searchSchool(){

    const gender=normalize(genderInput.value);

    const level=getLevel(gradeInput.value);

    const street=normalize(streetInput.value);

    const number=normalize(numberInput.value);

    if(!gender || !level || !street || !number){

        resultBox.innerHTML=`
        <div class="not-found">
            لطفاً تمام اطلاعات را وارد کنید.
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

        if(isInStreetList(school.streets,address)){

            found=true;

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

function createCard(school){

    const cardClass=
        school.gender==="پسرانه"
        ?"boys"
        :"girls";

    const emoji=
        school.gender==="پسرانه"
        ?"👦"
        :"🧕";

    let neighborsHtml="";

    if(Array.isArray(school.adjacent)){

        school.adjacent.forEach(item=>{

            neighborsHtml+=`
                <button
                    class="neighbor-btn"
                    onclick="showNeighbor(${item.id})">
                    ${item.name}
                </button>
            `;

        });

    }else if(typeof school.adjacent==="string"){

        school.adjacent
            .split("\n")
            .map(x=>x.trim())
            .filter(x=>x.length>0)
            .forEach(name=>{

                neighborsHtml+=`
                    <button
                        class="neighbor-btn"
                        onclick="showNeighborByName(${JSON.stringify(name)})">
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

        <p><strong>🗺 محدوده ثبت‌نام:</strong><br>
        ${String(school.region || "").replace(/\n/g,"<br>")}
        </p>

        <hr style="margin:15px 0;opacity:.25;">

        <p><strong>🏫 مدارس مجاور</strong></p>

        <div class="neighbors">

            ${neighborsHtml || "ندارد"}

        </div>

    </div>

    `;

}

function showNeighbor(id){

    const school = schools.find(s => s.id === id);

    if(!school){

        alert("اطلاعات این مدرسه پیدا نشد.");

        return;

    }

    resultBox.innerHTML = createCard(school);

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

function showNeighborByName(name){

    const target = normalize(name);

    const school = schools.find(s => {

        const schoolName = normalize(s.name);

        return schoolName === target;

    });

    if(!school){

        // اگر نام دقیق پیدا نشد، جستجوی تقریبی انجام شود

        const alternative = schools.find(s => {

            const schoolName = normalize(s.name);

            return schoolName.includes(target) ||
                   target.includes(schoolName);

        });

        if(alternative){

            resultBox.innerHTML = createCard(alternative);

            window.scrollTo({
                top:0,
                behavior:"smooth"
            });

            return;

        }

        alert("اطلاعات این مدرسه در فایل موجود نیست.");

        return;

    }

    resultBox.innerHTML = createCard(school);

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

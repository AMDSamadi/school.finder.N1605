// ======================================
// School Finder v6
// ======================================

let schools = [];
let currentSchool = null;

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

        if(!response.ok){

            throw new Error("خطا در خواندن فایل schools.json");

        }

        schools=await response.json();

        console.log("Schools:",schools.length);

    }

    catch(error){

        console.error(error);

        resultBox.innerHTML=`
        <div class="not-found">
            خطا در بارگذاری اطلاعات مدارس
        </div>`;

    }

}

function normalize(text){

    if(text===undefined || text===null)
        return "";

    return String(text)

        .replace(/[۰-۹]/g,d=>"۰۱۲۳۴۵۶۷۸۹".indexOf(d))
        .replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d))

        .replace(/ي/g,"ی")
        .replace(/ك/g,"ک")

        .replace(/بابانظر/g,"بابا نظر")
        .replace(/ابرهیم/g,"ابراهیم")
        .replace(/اسماعیلپور/g,"اسماعیل پور")
        .replace(/میرزاکوچک/g,"میرزا کوچک")
        .replace(/صاحبالزمان/g,"صاحب الزمان")

        .replace(/[()]/g,"")

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

function getStreetList(school){

    const list=[];

    Object.keys(school).forEach(key=>{

        if(key.startsWith("شماره کوچه")){

            const value=school[key];

            if(value){

                list.push(normalize(value));

            }

        }

    });

    return list;

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

        if(normalize(school["جنسیت"])!==gender)
            continue;

        const schoolLevel=normalize(school["دوره"]);

        if(
            schoolLevel!==level &&
            !schoolLevel.includes(level)
        )
            continue;

        const streets=getStreetList(school);

        const found=streets.some(item=>item===address);

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
            color:#fff;
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

    currentSchool=school;

    const cardClass=
        school["جنسیت"]==="پسرانه"
        ?"boys"
        :"girls";

    const emoji=
        school["جنسیت"]==="پسرانه"
        ?"👦"
        :"🧕";

    let neighborsHtml="";

    const adjacent=String(
        school["مدارس مجاور"] || ""
    );

    adjacent
        .split("\n")
        .map(x=>x.trim())
        .filter(x=>x!=="")
        .forEach(name=>{

            neighborsHtml+=`
                <button
                    class="neighbor-btn"
                    onclick="showNeighbor(
                        ${JSON.stringify(name)},
                        ${JSON.stringify(school["جنسیت"])}
                    )">
                    ${name}
                </button>
            `;

        });

        return `

    <div class="result-card ${cardClass}">

        <h3>${emoji} ${school["نام مدرسه"]}</h3>

        <p><strong>📚 دوره:</strong> ${school["دوره"]}</p>

        <p><strong>🕒 شیفت:</strong> ${school["نوبت"]}</p>

        <p><strong>☎ شماره تماس:</strong> ${school["شماره تماس"]}</p>

        <p><strong>📍 آدرس مدرسه:</strong><br>
            ${school["آدرس مدرسه"]}
        </p>

        <p><strong>🗺 محدوده ثبت‌نام:</strong><br>
            ${String(school["محدوده ثبت نام"] || "").replace(/\n/g,"<br>")}
        </p>

        <hr style="margin:15px 0;opacity:.25;">

        <p><strong>🏫 مدارس مجاور</strong></p>

        <div class="neighbors">

            ${neighborsHtml || "ندارد"}

        </div>

    </div>

    `;

}

function normalizeSchoolName(name){

    return normalize(name)
        .replace(/[()]/g,"")
        .replace(/\s+/g," ")
        .trim();

}

function findNeighbor(name,gender){

    const targetName=normalizeSchoolName(name);
    const targetGender=normalize(gender);

    return schools.find(item=>{

        const schoolName=normalizeSchoolName(item["نام مدرسه"]);
        const schoolGender=normalize(item["جنسیت"]);

        return (
            schoolName===targetName &&
            schoolGender===targetGender
        );

    });

}

function showNeighbor(name,gender){

    const school=findNeighbor(name,gender);

    if(!school){

        alert("اطلاعات این مدرسه یافت نشد.");

        return;

    }

    currentSchool=school;

    resultBox.innerHTML=createCard(school);

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

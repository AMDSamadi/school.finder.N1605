// =====================================
// School Finder v7
// =====================================

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

            if(e.key==="Enter"){

                searchSchool();

            }

        });

    });

}

async function loadSchools(){

    try{

        const response=await fetch("schools.json");

        if(!response.ok){

            throw new Error("خطا در بارگذاری فایل مدارس");

        }

        schools=await response.json();

        console.log("Schools Loaded:",schools.length);

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
        .replace(/\r/g," ")
        .replace(/\n/g," ")
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

    const streets=[];

    Object.keys(school).forEach(key=>{

        if(key.startsWith("شماره کوچه")){

            const value=school[key];

            if(value){

                streets.push(normalize(value));

            }

        }

    });

    return streets;

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

    // =====================================
// School Finder v7
// =====================================

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

            if(e.key==="Enter"){

                searchSchool();

            }

        });

    });

}

async function loadSchools(){

    try{

        const response=await fetch("schools.json");

        if(!response.ok){

            throw new Error("خطا در بارگذاری فایل مدارس");

        }

        schools=await response.json();

        console.log("Schools Loaded:",schools.length);

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
        .replace(/\r/g," ")
        .replace(/\n/g," ")
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

    const streets=[];

    Object.keys(school).forEach(key=>{

        if(key.startsWith("شماره کوچه")){

            const value=school[key];

            if(value){

                streets.push(normalize(value));

            }

        }

    });

    return streets;

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

    // =====================================
// School Finder v7
// =====================================

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

            if(e.key==="Enter"){

                searchSchool();

            }

        });

    });

}

async function loadSchools(){

    try{

        const response=await fetch("schools.json");

        if(!response.ok){

            throw new Error("خطا در بارگذاری فایل مدارس");

        }

        schools=await response.json();

        console.log("Schools Loaded:",schools.length);

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
        .replace(/\r/g," ")
        .replace(/\n/g," ")
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

    const streets=[];

    Object.keys(school).forEach(key=>{

        if(key.startsWith("شماره کوچه")){

            const value=school[key];

            if(value){

                streets.push(normalize(value));

            }

        }

    });

    return streets;

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

    // =====================================
// School Finder v7
// =====================================

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

            if(e.key==="Enter"){

                searchSchool();

            }

        });

    });

}

async function loadSchools(){

    try{

        const response=await fetch("schools.json");

        if(!response.ok){

            throw new Error("خطا در بارگذاری فایل مدارس");

        }

        schools=await response.json();

        console.log("Schools Loaded:",schools.length);

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
        .replace(/\r/g," ")
        .replace(/\n/g," ")
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

    const streets=[];

    Object.keys(school).forEach(key=>{

        if(key.startsWith("شماره کوچه")){

            const value=school[key];

            if(value){

                streets.push(normalize(value));

            }

        }

    });

    return streets;

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

    // =====================================
// School Finder v7
// =====================================

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

            if(e.key==="Enter"){

                searchSchool();

            }

        });

    });

}

async function loadSchools(){

    try{

        const response=await fetch("schools.json");

        if(!response.ok){

            throw new Error("خطا در بارگذاری فایل مدارس");

        }

        schools=await response.json();

        console.log("Schools Loaded:",schools.length);

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
        .replace(/\r/g," ")
        .replace(/\n/g," ")
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

    const streets=[];

    Object.keys(school).forEach(key=>{

        if(key.startsWith("شماره کوچه")){

            const value=school[key];

            if(value){

                streets.push(normalize(value));

            }

        }

    });

    return streets;

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

        const isMatched=streets.some(item=>item===address);

        if(isMatched){

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

    resultBox.innerHTML="";

    resultBox.innerHTML+=`
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

    matchedSchools.forEach(item=>{

        resultBox.innerHTML+=createCard(item);

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

    const neighbors=String(
        school["مدارس مجاور"] || ""
    )
    .split("\n")
    .map(x=>x.trim())
    .filter(x=>x!=="")

    neighbors.forEach(item=>{

        neighborsHtml+=`
            <button
                class="neighbor-btn"
                onclick="showNeighbor(${JSON.stringify(item)})">
                ${item}
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
        .replace(/\(س\)/g,"")
        .replace(/\(ع\)/g,"")
        .replace(/\(عج\)/g,"")
        .replace(/\(ره\)/g,"")
        .replace(/\s+/g,"")
        .trim();

}

function findSchoolByName(name,gender){

    const targetName=normalizeSchoolName(name);
    const targetGender=normalize(gender);

    let school=schools.find(item=>{

        return normalizeSchoolName(item["نام مدرسه"])===targetName &&
               normalize(item["جنسیت"])===targetGender;

    });

    if(school){

        return school;

    }

    school=schools.find(item=>{

        const schoolName=normalizeSchoolName(item["نام مدرسه"]);

        return (
            schoolName.includes(targetName) ||
            targetName.includes(schoolName)
        ) &&
        normalize(item["جنسیت"])===targetGender;

    });

    return school || null;

}

function showNeighbor(name){

        const school=findSchoolByName(
        name,
        currentSchool["جنسیت"]
    );

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

function getSchoolByRow(row){

    return schools.find(item=>
        Number(item["ردیف"])===Number(row)
    );

}

function clearResult(){

    resultBox.innerHTML="";

}

function showSchools(list){

    clearResult();

    resultBox.innerHTML+=`
        <div style="
            background:#0d6efd;
            color:#fff;
            padding:12px;
            border-radius:12px;
            margin-bottom:20px;
            text-align:center;
            font-weight:bold;">
            ✅ ${list.length} مدرسه برای این محدوده یافت شد.
        </div>
    `;

    list.forEach(item=>{

        resultBox.innerHTML+=createCard(item);

    });

}

function formatPhone(phone){

    if(phone===undefined || phone===null)
        return "";

    return String(phone);

}

function formatText(text){

    return String(text || "")
        .replace(/\n/g,"<br>");

}

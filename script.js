// ===============================
// School Finder
// Version 2.0
// ===============================

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
            throw new Error("خطا در خواندن فایل مدارس");

        schools=await response.json();

        console.log("Schools:",schools.length);

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

    .replace(/بابانظر/g,"بابا نظر")
    .replace(/ابرهیم/g,"ابراهیم")
    .replace(/صاحبدادی/g,"صاحب دادی")
    .replace(/صاحبالزمان/g,"صاحب الزمان")
    .replace(/اسماعیلپور/g,"اسماعیل پور")
    .replace(/میرزاکوچک/g,"میرزا کوچک")

    .replace(/\u200c/g," ")

    .replace(/\s+/g," ")

    .trim();

}

function toEnglishDigits(text){

    return text

    .replace(/[۰-۹]/g,d=>"۰۱۲۳۴۵۶۷۸۹".indexOf(d))

    .replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d));

}

function getLevel(grade){

    grade=Number(grade);

    if([1,2,3].includes(grade))
        return "اول";

    if([4,5,6].includes(grade))
        return "دوم";

    return "";

}

function searchSchool(){

    const gender=normalize(genderInput.value);

    const level=getLevel(gradeInput.value);

    const street=normalize(streetInput.value);

    const number=normalize(numberInput.value);

    if(!gender || !level || !street){

        resultBox.innerHTML=`
        <div class="not-found">
        لطفاً همه اطلاعات را وارد کنید.
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

        if(Array.isArray(school.streets)){

            for(const s of school.streets){

                const item=normalize(s);

                if(number){

                    if(item===address){

                        found=true;
                        break;

                    }

                }else{

                    if(item.startsWith(street+" ")){

                        found=true;
                        break;

                    }

                }

            }

        }

        if(!found && school.region){

            const region=normalize(school.region);

            if(region.includes(street)){

                const n=parseInt(number);

                if(!isNaN(n)){

                    if(region.includes("تمام فردها") && n%2===1)
                        found=true;

                    if(region.includes("تمام زوج") && n%2===0)
                        found=true;

                    if(region.includes("الی آخر"))
                        found=true;

                    const rangeRegex=/(\d+)\s*(?:تا|الی)\s*(\d+)/g;

                    let match;

                    while((match=rangeRegex.exec(region))!==null){

                        const start=parseInt(match[1]);
                        const end=parseInt(match[2]);

                        if(n>=start && n<=end){

                            found=true;
                            break;

                        }

                    }

                }

            }

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

    const cardClass =
        school.gender==="پسرانه" ? "boys" : "girls";

    const emoji =
        school.gender==="پسرانه" ? "👦" : "🧕";

    let neighborsHtml="";

    if(school.adjacent){

        const neighbors=school.adjacent
            .split("\n")
            .map(x=>x.trim())
            .filter(x=>x.length>0);

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

        <hr style="margin:15px 0;opacity:.3;">

        <p><strong>🏫 مدارس مجاور</strong></p>

        <div class="neighbors">
            ${neighborsHtml || "ندارد"}
        </div>

    </div>

    `;

}

function showNeighbor(name){

    const school=schools.find(s=>
        normalize(s.name)===normalize(name)
    );

    if(!school){

        alert("اطلاعات این مدرسه در فایل موجود نیست.");

        return;

    }

    resultBox.innerHTML=createCard(school);

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}
.neighbor-btn{
    margin:4px;
    padding:8px 12px;
    border:none;
    border-radius:8px;
    background:#fff;
    color:#0B1F4D;
    font-weight:bold;
    cursor:pointer;
    transition:.2s;
}

.neighbor-btn:hover{
    background:#D4AF37;
    color:#081C3A;
}

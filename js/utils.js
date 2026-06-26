// ===============================
// utils.js
// توابع کمکی
// ===============================

let schools = [];
let currentSchool = null;

function normalize(text){

    if(text===undefined || text===null)
        return "";

    return String(text)

        .replace(/[۰-۹]/g,d=>"۰۱۲۳۴۵۶۷۸۹".indexOf(d))
        .replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d))

        .replace(/ي/g,"ی")
        .replace(/ك/g,"ک")

        .replace(/[()]/g,"")

        .replace(/بابانظر/g,"بابا نظر")
        .replace(/ابرهیم/g,"ابراهیم")
        .replace(/اسماعیلپور/g,"اسماعیل پور")
        .replace(/میرزاکوچک/g,"میرزا کوچک")
        .replace(/صاحبالزمان/g,"صاحب الزمان")

        .replace(/\u200c/g," ")
        .replace(/\r/g," ")
        .replace(/\n/g," ")

        .replace(/\s+/g," ")

        .trim();

}

function getLevel(grade){

    grade = Number(grade);

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

                streets.push(
                    normalize(value)
                );

            }

        }

    });

    return streets;

}

function getSchoolByRow(row){

    row = Number(row);

    return schools.find(item=>
        Number(item["ردیف"])===row
    );

}

function splitNeighbors(text){

    if(!text)
        return [];

    return String(text)

        .split("\n")

        .map(x=>x.trim())

        .filter(x=>x!=="")

        .map(Number);

}

function clearResult(){

    document.getElementById("result").innerHTML="";

}

function showMessage(message,color="#0d6efd"){

    document.getElementById("result").innerHTML=`

    <div style="
        background:${color};
        color:white;
        padding:15px;
        border-radius:12px;
        margin-bottom:20px;
        text-align:center;
        font-weight:bold;
    ">

        ${message}

    </div>

    `;

}

let schools = [];

fetch("schools.json")
.then(res => res.json())
.then(data => {
    schools = data;
})
.catch(err => {
    document.getElementById("result").innerHTML =
    `<div class="not-found">
        خطا در بارگذاری اطلاعات مدارس
    </div>`;
    console.error(err);
});

document.getElementById("searchBtn").addEventListener("click", searchSchool);

function searchSchool(){

    const gender = document.getElementById("gender").value.trim();

    const grade = Number(document.getElementById("grade").value);

    const street = document.getElementById("street").value.trim();

    const number = document.getElementById("number").value.trim();

    const result = document.getElementById("result");

    if(gender=="" || grade=="" || street==""){
        result.innerHTML=`<div class="not-found">
        لطفاً همه اطلاعات را وارد کنید.
        </div>`;
        return;
    }

    let level="";

    if(grade<=3)
        level="اول";
    else
        level="دوم";

    const address=(street+" "+number).trim();

    const school=schools.find(item=>{

        if(item.gender!==gender)
            return false;

        if(item.level!==level)
            return false;

        return item.streets.some(s=>
            s.trim()==address
        );

    });

    if(!school){

        result.innerHTML=`
        <div class="not-found">
        مدرسه‌ای برای این محدوده پیدا نشد.
        </div>`;

        return;

    }

    let color="girls";
    let emoji="🧕";

    if(school.gender=="پسرانه"){
        color="boys";
        emoji="👦";
    }

    result.innerHTML=`

    <div class="result-card ${color}">

    <h3>${emoji} ${school.name}</h3>

    <p><b>📚 دوره:</b> ${school.level}</p>

    <p><b>🕒 شیفت:</b> ${school.shift}</p>

    <p><b>☎ تلفن:</b> ${school.phone}</p>

    <p><b>📍 آدرس:</b> ${school.address}</p>

    <p><b>🗺 محدوده ثبت نام:</b><br>${school.region.replace(/\n/g,"<br>")}</p>

    <p><b>🏫 مدارس مجاور:</b><br>${school.adjacent.replace(/\n/g,"<br>")}</p>

    </div>

    `;

}

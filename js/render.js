// ===============================
// render.js
// نمایش اطلاعات مدارس
// ===============================

function createCard(school){

    currentSchool = school;

    const isBoy =
        school["جنسیت"] === "پسرانه";

    const cardClass =
        isBoy ? "boys" : "girls";

    const emoji =
        isBoy ? "👦" : "🧕";

    let neighborsHtml = "";

    const neighbors = splitNeighbors(
        school["مدارس مجاور"]
    );

    if(neighbors.length){

        neighbors.forEach(id=>{

            const item = getSchoolByRow(id);

            if(!item)
                return;

            neighborsHtml += `

                <button
                    class="neighbor-btn"
                    onclick="showNeighbor(${id})">

                    🏫 ${item["نام مدرسه"]}

                </button>

            `;

        });

    }
    else{

        neighborsHtml = "ندارد";

    }

    return `

    <div class="result-card ${cardClass}">

        <h3>

            ${emoji}
            ${school["نام مدرسه"]}

        </h3>

        <div class="info-box">

            <strong>📚 دوره</strong>

            <br>

            ${school["دوره"]}

        </div>

        <div class="info-box">

            <strong>🕒 نوبت</strong>

            <br>

            ${school["نوبت"]}

        </div>

        <div class="info-box">

            <strong>☎ شماره تماس</strong>

            <br>

            ${String(school["شماره تماس"] || "").replace(/\n/g," - ")}

        </div>

        <div class="info-box">

            <strong>📍 آدرس مدرسه</strong>

            <br>

            ${school["آدرس مدرسه"]}

        </div>

        ${
            school["لینک نشان"] ? `

        <div class="info-box">

            <strong>🗺️ موقعیت مدرسه</strong>

            <br><br>

            <a
                href="${school["لینک نشان"]}"
                target="_blank"
                rel="noopener noreferrer"
                class="neshan-link">

                📍 مشاهده روی نشان

            </a>

        </div>

        ` : ""
        }

        <div class="info-box">

            <strong>🗺 محدوده ثبت نام</strong>

            <br>

            ${String(
                school["محدوده ثبت نام"] || ""
            ).replace(/\n/g,"<br>")}

        </div>

        <div class="info-box">

            <strong>🏫 مدارس مجاور</strong>

            <br><br>

            <div class="neighbors">

                ${neighborsHtml}

            </div>

        </div>

    </div>

    `;

}

function showSchools(list){

    clearResult();

    showMessage(

        `✅ ${list.length} مدرسه برای این محدوده یافت شد.`

    );

    list.forEach(item=>{

        document
            .getElementById("result")
            .innerHTML += createCard(item);

    });

}

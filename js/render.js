// ===============================
// render.js
// نمایش اطلاعات مدارس
// ===============================

function createCard(school){

    currentSchool = school;

    const isBoy =
        school["جنسیت"]==="پسرانه";

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

            const item =
                getSchoolByRow(id);

            if(!item)
                return;

            neighborsHtml += `

                <button
                    class="neighbor-btn"
                    onclick="showNeighbor(${id})">

                    ${item["نام مدرسه"]}

                </button>

            `;

        });

    }

    return `

    <div class="result-card ${cardClass}">

        <h3>

            ${emoji}
            ${school["نام مدرسه"]}

        </h3>

        <p>

            <strong>📚 دوره:</strong>

            ${school["دوره"]}

        </p>

        <p>

            <strong>🕒 شیفت:</strong>

            ${school["نوبت"]}

        </p>

        <p>

            <strong>☎ شماره تماس:</strong>

            ${school["شماره تماس"]}

        </p>

        <p>

            <strong>📍 آدرس مدرسه:</strong><br>

            ${school["آدرس مدرسه"]}

        </p>

        <p>

            <strong>🗺 محدوده ثبت نام:</strong><br>

            ${String(
                school["محدوده ثبت نام"] || ""
            ).replace(/\n/g,"<br>")}

        </p>

        <hr
            style="
                margin:18px 0;
                opacity:.25;
            ">

        <strong>

            🏫 مدارس مجاور

        </strong>

        <div class="neighbors">

            ${neighborsHtml || "ندارد"}

        </div>

    </div>

    `;

}

function showSchools(list){

    clearResult();

    showMessage(

        `✅ ${list.length} مدرسه یافت شد.`

    );

    list.forEach(item=>{

        document
            .getElementById("result")
            .innerHTML += createCard(item);

    });

}

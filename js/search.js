// ===============================
// search.js
// جستجوی مدارس
// ===============================

function searchSchool(){

    const gender =
        normalize(
            document.getElementById("gender").value
        );

    const level =
        getLevel(
            document.getElementById("grade").value
        );

    const street =
        normalize(
            document.getElementById("street").value
        );

    const number =
        normalize(
            document.getElementById("number").value
        );

    if(
        !gender ||
        !level ||
        !street ||
        !number
    ){

        showMessage(
            "لطفاً تمام اطلاعات را وارد کنید.",
            "#c62828"
        );

        return;

    }

    const address =
        normalize(
            street + " " + number
        );

    const result = [];

    schools.forEach(school=>{

        if(
            normalize(school["جنسیت"])
            !== gender
        )
            return;

        const schoolLevel =
            normalize(
                school["دوره"]
            );

        if(
            schoolLevel!==level &&
            !schoolLevel.includes(level)
        )
            return;

        const streets =
            getStreetList(school);

        const found =
            streets.some(item=>
                item===address
            );

        if(found){

            result.push(school);

        }

    });

    if(result.length===0){

        showMessage(

            "مدرسه‌ای برای این محدوده یافت نشد.",

            "#c62828"

        );

        return;

    }

    showSchools(result);

}

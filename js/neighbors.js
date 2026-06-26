// ===============================
// neighbors.js
// مدیریت مدارس مجاور
// ===============================

function showNeighbor(row){

    const school = getSchoolByRow(row);

    if(!school){

        alert("اطلاعات مدرسه یافت نشد.");

        return;

    }

    currentSchool = school;

    const result =
        document.getElementById("result");

    result.innerHTML = createCard(school);

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

function showSchool(row){

    showNeighbor(row);

}

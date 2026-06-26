// ===============================
// neighbors.js
// نمایش مدارس مجاور در Modal
// ===============================

function showNeighbor(row){

    const school = getSchoolByRow(row);

    if(!school){

        alert("اطلاعات این مدرسه پیدا نشد.");

        return;

    }

    const html = createCard(school);

    document
        .getElementById("modal-content")
        .innerHTML = html;

    document
        .getElementById("modal")
        .classList.add("active");

}

function closeModal(){

    document
        .getElementById("modal")
        .classList.remove("active");

}

document.addEventListener("click", function(e){

    const modal = document.getElementById("modal");

    if(e.target === modal){

        closeModal();

    }

});

document.addEventListener("keydown", function(e){

    if(e.key === "Escape"){

        closeModal();

    }

});

// ===============================
// app.js
// راه‌اندازی برنامه
// ===============================

document.addEventListener("DOMContentLoaded", init);

async function init(){

    try{

        const response = await fetch("schools.json");

        if(!response.ok){

            throw new Error("خطا در بارگذاری فایل مدارس");

        }

        const data = await response.json();

        // اگر JSON به صورت آرایه باشد
        if(Array.isArray(data)){

            schools = data;

        }
        // اگر JSON به صورت
        // { "دخترانه":[...], "پسرانه":[...] }
        else{

            schools = [];

            if(Array.isArray(data["دخترانه"])){

                schools.push(...data["دخترانه"]);

            }

            if(Array.isArray(data["پسرانه"])){

                schools.push(...data["پسرانه"]);

            }

        }

        console.log("Schools Loaded :", schools.length);

    }

    catch(error){

        console.error(error);

        showMessage(
            "خطا در بارگذاری اطلاعات مدارس",
            "#c62828"
        );

        return;

    }

    document
        .getElementById("searchBtn")
        .addEventListener(
            "click",
            searchSchool
        );

    [
        "gender",
        "grade",
        "street",
        "number"
    ].forEach(id=>{

        document
            .getElementById(id)
            .addEventListener(
                "keydown",
                e=>{

                    if(e.key==="Enter"){

                        searchSchool();

                    }

                }
            );

    });

}

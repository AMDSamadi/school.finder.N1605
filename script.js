let schools = [];

fetch("schools.json")
  .then(res => res.json())
  .then(data => schools = data)
  .catch(() => {
    document.getElementById("result").innerHTML =
      `<div class="not-found">خطا در بارگذاری اطلاعات مدارس</div>`;
  });

document.getElementById("searchBtn").addEventListener("click", searchSchool);

function normalize(text) {
  return String(text)
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getLevel(grade) {
  const num = Number(grade);
  if (num >= 1 && num <= 3) return "اول";
  if (num >= 4 && num <= 6) return "دوم";
  return "";
}

function searchSchool() {
  const gender = normalize(document.getElementById("gender").value);
  const grade = document.getElementById("grade").value;
  const street = normalize(document.getElementById("street").value);
  const number = normalize(document.getElementById("number").value);
  const result = document.getElementById("result");

  if (!gender || !grade || !street) {
    result.innerHTML = `<div class="not-found">لطفاً تمام اطلاعات را وارد کنید.</div>`;
    return;
  }

  const level = getLevel(grade);
  const searchText = number ? street + " " + number : street;

  const found = schools.find(school => {
    if (normalize(school.gender) !== gender) return false;

    const schoolLevel = normalize(school.level);
    if (!schoolLevel.includes(level)) return false;

    return school.streets.some(item => {
      const itemNorm = normalize(item);
      return itemNorm === searchText || itemNorm.startsWith(searchText);
    });
  });

  if (!found) {
    result.innerHTML = `<div class="not-found">مدرسه‌ای برای این محدوده یافت نشد.</div>`;
    return;
  }

  const isBoy = found.gender === "پسرانه";
  const emoji = isBoy ? "👦" : "🧕";
  const cardClass = isBoy ? "boys" : "girls";

  result.innerHTML = `
    <div class="result-card ${cardClass}">
      <h3>${emoji} ${found.name}</h3>
      <p><strong>📚 دوره:</strong> ${found.level}</p>
      <p><strong>🕒 شیفت:</strong> ${found.shift}</p>
      <p><strong>☎ تلفن:</strong> ${found.phone}</p>
      <p><strong>📍 آدرس:</strong> ${found.address}</p>
      <p><strong>🗺 محدوده ثبت‌نام:</strong><br>${found.region.replace(/\n/g, "<br>")}</p>
      <p><strong>🏫 مدارس مجاور:</strong><br>${found.adjacent.replace(/\n/g, "<br>")}</p>
    </div>
  `;
}

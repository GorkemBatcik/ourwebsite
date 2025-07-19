function tarihFarki(baslangic) {
  const simdi = new Date();
  let yillar = simdi.getFullYear() - baslangic.getFullYear();
  let aylar = simdi.getMonth() - baslangic.getMonth();
  let gunler = simdi.getDate() - baslangic.getDate();

  if (gunler < 0) {
    aylar -= 1;
    gunler += new Date(simdi.getFullYear(), simdi.getMonth(), 0).getDate();
  }

  if (aylar < 0) {
    yillar -= 1;
    aylar += 12;
  }

  return { yillar, aylar, gunler };
}

function sayaçGuncelle() {
  const baslangicTarihi = new Date("2024-10-22T18:00:00");
  const fark = tarihFarki(baslangicTarihi);
  const metin = `${fark.yillar} yıl, ${fark.aylar} ay, ${fark.gunler} gün geçti`;
  document.getElementById("sayac").textContent = metin;
}

sayaçGuncelle();

// Not defteri fonksiyonu
const notDefteri = document.getElementById("notDefteri");
const notKaydet = document.getElementById("notKaydet");

// Sayfa açıldığında kaydedilmiş notu göster
if (localStorage.getItem("kullaniciNotu")) {
  notDefteri.value = localStorage.getItem("kullaniciNotu");
}

// Kaydet butonuna tıklanınca notu sakla
notKaydet.addEventListener("click", function () {
  localStorage.setItem("kullaniciNotu", notDefteri.value);
  notKaydet.textContent = "Kaydedildi!";
  setTimeout(() => { notKaydet.textContent = "Kaydet"; }, 1200);
});

// Şiirleri yükle (sayfa açıldığında çalışır)
const baslangicSiirleri = [];

window.onload = function () {
  if (!localStorage.getItem("siirListesi")) {
    localStorage.setItem("siirListesi", JSON.stringify(baslangicSiirleri));
  }
  siirleriYenidenYaz();
};

function formuGoster() {
  const form = document.getElementById("siirFormu");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

async function siirEkle() {
  const baslik = document.getElementById("siirBaslik").value.trim();
  const icerik = document.getElementById("siirIcerik").value.trim();

  if (!baslik || !icerik) {
    alert("Lütfen şiir başlığı ve içeriğini doldur 🥺");
    return;
  }

  await fetch('/.netlify/functions/siir-ekle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ baslik, icerik })
  });

  siirleriYenidenYaz();
}

async function siirleriYenidenYaz() {
  const response = await fetch('/.netlify/functions/siirleri-getir');
  const siirler = await response.json();
  const grid = document.getElementById("siirGrid");
  grid.innerHTML = "";

  siirler.forEach((siir, index) => {
    const yeniDiv = document.createElement("div");
    yeniDiv.className = "poem";

    const h3 = document.createElement("h3");
    h3.innerText = siir.baslik;

    const p = document.createElement("p");
    p.innerHTML = siir.icerik.replace(/\n/g, "<br>");

    yeniDiv.appendChild(h3);
    yeniDiv.appendChild(p);
    grid.appendChild(yeniDiv);
  });
}
// Fotoğraf bölümlerini scroll ile görünce animasyon ekle
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".animated-image");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.3
  });

  images.forEach(img => {
    observer.observe(img);
  });
});

// Kullanıcının yüklediği fotoğrafları tam ekran göstermek için:
document.addEventListener("DOMContentLoaded", () => {
  const photoInput = document.getElementById("photoUpload");

  // Yeni fonksiyon: silme butonu ekler
  function addDeleteButtonToImageSection(section, imageUrl) {
    section.style.position = "relative"; // Silme butonu için gerekli

    const silBtn = document.createElement("button");
    silBtn.innerText = "×";
    silBtn.title = "Fotoğrafı sil";
    silBtn.style.position = "absolute";
    silBtn.style.top = "8px";
    silBtn.style.right = "8px";
    silBtn.style.backgroundColor = "rgba(0,0,0,0.5)";
    silBtn.style.color = "white";
    silBtn.style.border = "none";
    silBtn.style.borderRadius = "50%";
    silBtn.style.width = "24px";
    silBtn.style.height = "24px";
    silBtn.style.fontSize = "18px";
    silBtn.style.cursor = "pointer";
    silBtn.style.opacity = "0";
    silBtn.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    section.addEventListener("mouseenter", () => {
      silBtn.style.opacity = "1";
      silBtn.style.transform = "scale(1.3)";
    });
    section.addEventListener("mouseleave", () => {
      silBtn.style.opacity = "0";
      silBtn.style.transform = "scale(1)";
    });

    silBtn.addEventListener("click", e => {
      e.stopPropagation();
      if (confirm("Bu fotoğrafı silmek istediğine emin misin?☹️")) {
        // localStorage'dan çıkar
        let stored = JSON.parse(localStorage.getItem("uploadedPhotos")) || [];
        stored = stored.filter(url => url !== imageUrl);
        localStorage.setItem("uploadedPhotos", JSON.stringify(stored));
        // DOM'dan kaldır
        section.remove();
      }
    });

    section.appendChild(silBtn);
  }

  // Yüklü fotoğrafları localStorage'tan getir ve göster
  const storedPhotos = JSON.parse(localStorage.getItem("uploadedPhotos")) || [];
  storedPhotos.forEach(imageUrl => {
    createAnimatedImageSection(imageUrl);
    // En son eklenen section öğesini seç (son child)
    const lastSection = document.body.querySelector("section.animated-image:last-of-type");
    addDeleteButtonToImageSection(lastSection, imageUrl);
  });

  if (photoInput) {
    photoInput.addEventListener("change", function (event) {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      const stored = JSON.parse(localStorage.getItem("uploadedPhotos")) || [];

      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
          const imageUrl = e.target.result;

          createAnimatedImageSection(imageUrl);
          const lastSection = document.body.querySelector("section.animated-image:last-of-type");
          addDeleteButtonToImageSection(lastSection, imageUrl);

          // Fotoğrafı kaydet
          stored.push(imageUrl);
          localStorage.setItem("uploadedPhotos", JSON.stringify(stored));
        };
        reader.readAsDataURL(file);
      });

      event.target.value = "";
    });
  }

  function createAnimatedImageSection(imageUrl) {
    const newSection = document.createElement("section");
    newSection.className = "animated-image";
    newSection.style.backgroundImage = `url('${imageUrl}')`;
    newSection.style.height = "100vh";
    newSection.style.width = "100vw";
    newSection.style.backgroundSize = "cover";
    newSection.style.backgroundPosition = "center";
    newSection.style.backgroundRepeat = "no-repeat";
    newSection.style.opacity = "0";
    newSection.style.transform = "scale(1.05)";
    newSection.style.filter = "blur(8px)";
    newSection.style.transition = "opacity 1.4s ease, transform 1.4s ease, filter 1.4s ease";

    document.body.appendChild(newSection);

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.3 });

    observer.observe(newSection);
  }
});
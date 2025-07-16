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

function siirEkle() {
  const baslik = document.getElementById("siirBaslik").value.trim();
  const icerik = document.getElementById("siirIcerik").value.trim();

  if (!baslik || !icerik) {
    alert("Lütfen şiir başlığı ve içeriğini doldur 🥺");
    return;
  }

  const yeniSiir = { baslik, icerik };
  const siirler = JSON.parse(localStorage.getItem("siirListesi")) || [];

  siirler.push(yeniSiir);
  localStorage.setItem("siirListesi", JSON.stringify(siirler));

  siirleriYenidenYaz();
  document.getElementById("siirBaslik").value = "";
  document.getElementById("siirIcerik").value = "";
  document.getElementById("siirFormu").style.display = "none";
}

function siirleriYenidenYaz() {
  const siirler = JSON.parse(localStorage.getItem("siirListesi")) || [];
  const grid = document.getElementById("siirGrid");
  grid.innerHTML = "";

  siirler.forEach((siir, index) => {
    const yeniDiv = document.createElement("div");
    yeniDiv.className = "poem";

    const h3 = document.createElement("h3");
    h3.innerText = siir.baslik;

    const p = document.createElement("p");
    p.innerHTML = siir.icerik.replace(/\n/g, "<br>");

    const silBtn = document.createElement("button");
    silBtn.innerText = "Sil";
    silBtn.className = "silButonu";
    silBtn.onclick = () => {
      if (confirm("Bu şiiri silmek istediğine emin misin?😔")) {
        siirler.splice(index, 1);
        localStorage.setItem("siirListesi", JSON.stringify(siirler));
        siirleriYenidenYaz();
      }
    };

    const duzenleBtn = document.createElement("button");
    duzenleBtn.innerText = "Düzenle";
    duzenleBtn.className = "duzenleButonu";
    duzenleBtn.onclick = () => {
      const yeniBaslik = prompt("Yeni başlık:", siir.baslik);
      const yeniIcerik = prompt("Yeni şiir:", siir.icerik);
      if (yeniBaslik && yeniIcerik) {
        siirler[index].baslik = yeniBaslik;
        siirler[index].icerik = yeniIcerik;
        localStorage.setItem("siirListesi", JSON.stringify(siirler));
        siirleriYenidenYaz();
      }
    };

    yeniDiv.appendChild(h3);
    yeniDiv.appendChild(p);
    yeniDiv.appendChild(silBtn);
    yeniDiv.appendChild(duzenleBtn);

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

  // Yüklü fotoğrafları localStorage'tan getir ve göster
  const storedPhotos = JSON.parse(localStorage.getItem("uploadedPhotos")) || [];
  storedPhotos.forEach(imageUrl => {
    createAnimatedImageSection(imageUrl);
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
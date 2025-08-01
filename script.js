// Yatay mod zorlaması ve algılama
function checkOrientation() {
  if (window.innerHeight > window.innerWidth) {
    // Portrait modda
    document.body.classList.add('portrait-mode');
    showOrientationWarning();
  } else {
    // Landscape modda
    document.body.classList.remove('portrait-mode');
    hideOrientationWarning();
  }
}

function showOrientationWarning() {
  let warning = document.getElementById('orientation-warning');
  if (!warning) {
    warning = document.createElement('div');
    warning.id = 'orientation-warning';
    warning.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, #ff69b4, #ff1493);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        color: white;
        text-align: center;
        font-family: 'Playfair Display', serif;
      ">
        <div style="font-size: 5rem; margin-bottom: 30px;">📱</div>
        <h2 style="font-size: 2.8rem; margin-bottom: 20px; font-weight: bold;">Telefonunu Yatay Tut aşkım</h2>
        <p style="font-size: 1.6rem; opacity: 0.9; margin-bottom: 30px;">En iyi deneyim için telefonunuzu yatay konuma getirin</p>
        <div style="
          width: 100px;
          height: 100px;
          border: 5px solid white;
          border-radius: 20px;
          animation: rotate 2s infinite;
          margin-top: 20px;
        "></div>
        <p style="font-size: 1.4rem; margin-top: 30px; opacity: 0.8;">⬅️ Yatay çevir bitanem ➡️</p>
        <p style="font-size: 1.2rem; margin-top: 15px; opacity: 0.7;">💕 Seni çok seviyorum 💕</p>
      </div>
    `;
    
    // CSS animasyonu ekle
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(90deg); }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(warning);
  }
}

function hideOrientationWarning() {
  const warning = document.getElementById('orientation-warning');
  if (warning) {
    warning.remove();
  }
}

// Cihaz bilgisini göster
function showDeviceInfo() {
  const deviceInfo = document.getElementById('device-info');
  if (deviceInfo) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const orientation = width > height ? 'Landscape' : 'Portrait';
    
    let category = '';
    let fontSize = '';
    
    if (width >= 1200) {
      category = 'BÜYÜK EKRAN';
      fontSize = '7rem';
    } else if (width >= 768 && width < 1200) {
      category = 'ORTA EKRAN';
      fontSize = '3.5rem';
    } else if (width >= 480 && width < 768) {
      category = 'KÜÇÜK EKRAN';
      fontSize = '3.5rem';
    } else if (width >= 320 && width < 480) {
      category = 'ÇOK KÜÇÜK EKRAN';
      fontSize = '3.5rem';
    } else {
      category = 'MİNİ EKRAN';
      fontSize = '3.5rem';
    }
    
    deviceInfo.innerHTML = `
      📱 Cihaz: ${category}<br>
      📐 Boyut: ${width}px x ${height}px<br>
      🔄 Yön: ${orientation}<br>
      📝 Font: ${fontSize}
    `;
  }
}

// Sayfa yüklendiğinde ve yön değiştiğinde kontrol et
window.addEventListener('load', function() {
  checkOrientation();
  showDeviceInfo();
});
window.addEventListener('resize', function() {
  checkOrientation();
  showDeviceInfo();
});
window.addEventListener('orientationchange', function() {
  setTimeout(function() {
    checkOrientation();
    showDeviceInfo();
  }, 100);
});

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
  checkOrientation(); // Sayfa yüklendiğinde yön kontrolü
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

  // Yeni şiiri localStorage'a ekle
  const siirListesi = JSON.parse(localStorage.getItem("siirListesi")) || [];
  siirListesi.push({ baslik, icerik });
  localStorage.setItem("siirListesi", JSON.stringify(siirListesi));

  document.getElementById("siirBaslik").value = "";
  document.getElementById("siirIcerik").value = "";

  siirleriYenidenYaz();
}

function siirleriYenidenYaz() {
  const siirler = JSON.parse(localStorage.getItem("siirListesi")) || [];
  const grid = document.getElementById("siirGrid");
  grid.innerHTML = "";

  siirler.forEach((siir, index) => {
    const yeniDiv = document.createElement("div");
    yeniDiv.className = "poem";
    yeniDiv.style.position = "relative";

    const h3 = document.createElement("h3");
    h3.innerText = siir.baslik;

    const p = document.createElement("p");
    p.innerHTML = siir.icerik.replace(/\n/g, "<br>");

    yeniDiv.appendChild(h3);
    yeniDiv.appendChild(p);

    const silBtn = document.createElement("button");
    silBtn.textContent = "Sil";
    silBtn.style.marginRight = "8px";
    silBtn.style.padding = "2px 6px";
    silBtn.style.fontSize = "12px";
    silBtn.style.borderRadius = "4px";
    silBtn.style.border = "none";
    silBtn.style.cursor = "pointer";
    silBtn.addEventListener("click", () => {
      if (confirm("Bu şiiri silmek istediğine emin misin?")) {
        const siirListesi = JSON.parse(localStorage.getItem("siirListesi")) || [];
        siirListesi.splice(index, 1);
        localStorage.setItem("siirListesi", JSON.stringify(siirListesi));
        siirleriYenidenYaz();
      }
    });

    const duzenleBtn = document.createElement("button");
    duzenleBtn.textContent = "Düzenle";
    duzenleBtn.style.padding = "2px 6px";
    duzenleBtn.style.fontSize = "12px";
    duzenleBtn.style.borderRadius = "4px";
    duzenleBtn.style.border = "none";
    duzenleBtn.style.cursor = "pointer";
    duzenleBtn.addEventListener("click", () => {
      document.getElementById("siirBaslik").value = siir.baslik;
      document.getElementById("siirIcerik").value = siir.icerik;

      const guncelleBtn = document.createElement("button");
      guncelleBtn.textContent = "Güncelle";
      guncelleBtn.id = "guncelleBtn";
      const form = document.getElementById("siirFormu");
      form.appendChild(guncelleBtn);

      guncelleBtn.onclick = () => {
        const yeniBaslik = document.getElementById("siirBaslik").value.trim();
        const yeniIcerik = document.getElementById("siirIcerik").value.trim();

        if (!yeniBaslik || !yeniIcerik) {
          alert("Lütfen şiir başlığı ve içeriğini doldur 🥺");
          return;
        }

        const siirListesi = JSON.parse(localStorage.getItem("siirListesi")) || [];
        siirListesi[index] = { baslik: yeniBaslik, icerik: yeniIcerik };
        localStorage.setItem("siirListesi", JSON.stringify(siirListesi));

        document.getElementById("siirBaslik").value = "";
        document.getElementById("siirIcerik").value = "";
        guncelleBtn.remove();
        siirleriYenidenYaz();
      };
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.style.position = "absolute";
    buttonContainer.style.top = "8px";
    buttonContainer.style.right = "8px";
    buttonContainer.style.display = "flex";
    buttonContainer.style.gap = "4px";

    buttonContainer.appendChild(silBtn);
    buttonContainer.appendChild(duzenleBtn);
    yeniDiv.appendChild(buttonContainer);

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
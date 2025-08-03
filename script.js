// ===== DOĞUM GÜNÜ GİRİŞ EKRANI =====

// Zıplayan kalpler oluşturma fonksiyonu
function createHearts() {
  const heartsContainer = document.getElementById('hearts-container');
  
  // Farklı kalp emojileri
  const heartEmojis = ['💞', '🩷', '💗', '💖', '💘', '❤️'];
  
  // Ekran boyutuna göre kalp sayısını ayarla (2 kat artırıldı)
  let heartCount = 30; // Varsayılan büyük ekranlar için (15 * 2)
  
  if (window.innerWidth <= 479) {
    heartCount = 16; // Çok küçük ekranlar (8 * 2)
  } else if (window.innerWidth <= 767) {
    heartCount = 20; // Küçük ekranlar (10 * 2)
  } else if (window.innerWidth <= 1199) {
    heartCount = 24; // Orta ekranlar (12 * 2)
  }
  
  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    // Rastgele kalp emoji seç
    heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 3 + 's';
    heart.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
    
    heartsContainer.appendChild(heart);
  }
}

// Giriş ekranını kontrol et
function checkBirthdayIntro() {
  const birthdayIntro = document.getElementById('birthday-intro');
  const mainContent = document.getElementById('main-content');
  
  // Eğer yatay modda ise ve daha önce giriş yapılmamışsa giriş ekranını göster
  if (window.innerWidth > window.innerHeight) {
    const hasEntered = sessionStorage.getItem('birthdayEntered');
    
    if (!hasEntered) {
      birthdayIntro.style.display = 'flex';
      mainContent.style.display = 'none';
      createHearts();
      
      // 2 saniye sonra otomatik kapan
      setTimeout(() => {
        enterWebsite();
      }, 2000);
    } else {
      // Daha önce giriş yapılmışsa direkt ana içeriği göster
      birthdayIntro.style.display = 'none';
      mainContent.style.display = 'block';
    }
  } else {
    // Portrait modda giriş ekranını gizle
    birthdayIntro.style.display = 'none';
    mainContent.style.display = 'block';
  }
}

// Giriş fonksiyonu (otomatik veya manuel)
function enterWebsite() {
  const birthdayIntro = document.getElementById('birthday-intro');
  const mainContent = document.getElementById('main-content');
  
  // Giriş yapıldığını sessionStorage'a kaydet
  sessionStorage.setItem('birthdayEntered', 'true');
  
  // Giriş ekranını gizle ve ana içeriği göster
  birthdayIntro.style.display = 'none';
  mainContent.style.display = 'block';
  
  // Sayfa yüklendiğinde çalışacak fonksiyonları çağır
  if (typeof window.onload === 'function') {
    window.onload();
  }
}

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



// Sayfa yüklendiğinde ve yön değiştiğinde kontrol et
window.addEventListener('load', function() {
  checkBirthdayIntro();
  checkOrientation();
});

window.addEventListener('resize', function() {
  checkBirthdayIntro();
  checkOrientation();
});

window.addEventListener('orientationchange', function() {
  setTimeout(function() {
    checkBirthdayIntro();
    checkOrientation();
  }, 100);
});

// Sayfa yüklendiğinde giriş ekranını kontrol et
document.addEventListener('DOMContentLoaded', function() {
  // Sayfa yenilendiğinde (F5) sessionStorage'ı temizle
  if (performance.navigation.type === 1) {
    sessionStorage.removeItem('birthdayEntered');
  }
  
  // Giriş ekranını kontrol et
  checkBirthdayIntro();
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

// Not defteri fonksiyonu - Firebase entegrasyonu
const notDefteri = document.getElementById("notDefteri");
const notKaydet = document.getElementById("notKaydet");

// Seçili alıcı (varsayılan: gorkem)
let selectedRecipient = 'gorkem';

// Alıcı seçimi fonksiyonu
function selectRecipient(recipient) {
  selectedRecipient = recipient;
  
  // Butonları güncelle
  document.getElementById('gorkemBtn').classList.remove('active');
  document.getElementById('berilBtn').classList.remove('active');
  
  if (recipient === 'gorkem') {
    document.getElementById('gorkemBtn').classList.add('active');
  } else {
    document.getElementById('berilBtn').classList.add('active');
  }
}

// Firebase'den notları yükle - tarihe göre sıralı
async function notlariFirebaseYukle() {
  try {
    const { collection, getDocs, query, orderBy } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
    const notlarRef = collection(window.db, "notlar");
    
    // Tarihe göre en yeni en üstte olacak şekilde sırala
    const q = query(notlarRef, orderBy("tarih", "desc"));
    const querySnapshot = await getDocs(q);
    
    const notlar = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      notlar.push({
        id: doc.id,
        ...data,
        // Tarih bilgisini düzgün formatla
        formattedTarih: data.tarih ? new Date(data.tarih.toDate()).toLocaleString('tr-TR') : 'Tarih bilgisi yok'
      });
    });
    
    console.log(`${notlar.length} not Firebase'den yüklendi`);
    return notlar;
  } catch (error) {
    console.error("Notlar yüklenirken hata:", error);
    return [];
  }
}

// Firebase'e not kaydet
async function notuFirebaseKaydet(notMetni) {
  try {
    const { collection, addDoc, doc, setDoc, serverTimestamp, getDocs, query, where } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
    const notlarRef = collection(window.db, "notlar");
    
    // Alıcı adını belirle
    const aliciAdi = selectedRecipient === 'gorkem' ? 'Görkeme' : 'Berile';
    const gonderenAdi = selectedRecipient === 'gorkem' ? 'Beril' : 'Görkem';
    const gonderenId = selectedRecipient === 'gorkem' ? 'beril' : 'gorkem';
    
    // Gönderenin kaçıncı notu olduğunu bul
    const gonderenNotlariQuery = query(notlarRef, where("gonderenId", "==", gonderenId));
    const gonderenNotlariSnapshot = await getDocs(gonderenNotlariQuery);
    const notSayisi = gonderenNotlariSnapshot.size + 1;
    
    // Özel ID oluştur: gonderenAdi + sayı
    const ozelId = `${gonderenAdi}${notSayisi}`;
    
    const yeniNot = {
      metin: notMetni,
      tarih: serverTimestamp(),
      ozet: notMetni.length > 100 ? notMetni.substring(0, 100) + '...' : notMetni,
      alici: aliciAdi,
      gonderen: gonderenAdi,
      aliciId: selectedRecipient,
      gonderenId: gonderenId,
      notSayisi: notSayisi
    };
    
    // Özel ID ile kaydet
    const notDocRef = doc(notlarRef, ozelId);
    await setDoc(notDocRef, yeniNot);
    
    return ozelId;
  } catch (error) {
    console.error("Not kaydedilirken hata:", error);
    throw error;
  }
}

// Firebase'den not sil
async function notuFirebaseSil(notId) {
  try {
    const { doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
    const notRef = doc(window.db, "notlar", notId);
    await deleteDoc(notRef);
  } catch (error) {
    console.error("Not silinirken hata:", error);
    throw error;
  }
}

// Sayfa yüklendiğinde textarea'yı temiz tut ve notları hazırla
document.addEventListener('DOMContentLoaded', function() {
  // Textarea'yı her zaman temiz tut
  notDefteri.value = "";
  
  // Firebase'den notları önceden yükle (arka planda)
  notlariFirebaseYukle().then(notlar => {
    console.log(`${notlar.length} not arka planda yüklendi`);
  }).catch(error => {
    console.error("Arka plan not yükleme hatası:", error);
  });
});

// Kaydet butonuna tıklanınca notu Firebase'e kaydet
notKaydet.addEventListener("click", async function () {
  const notMetni = notDefteri.value.trim();
  
  if (!notMetni) {
    alert("Lütfen bir not yaz bana aşkım 🥺");
    return;
  }
  
  try {
    // Butonu devre dışı bırak
    notKaydet.disabled = true;
    notKaydet.textContent = "Kaydediliyor...";
    
    // Firebase'e kaydet
    await notuFirebaseKaydet(notMetni);
    
    // Textarea'yı temizle
    notDefteri.value = "";
    
    // Başarı mesajı
    notKaydet.textContent = "Kaydedildi! 💌";
    setTimeout(() => { 
      notKaydet.textContent = "💌 Kaydet"; 
      notKaydet.disabled = false;
    }, 1200);
    
    // Notlarım listesini otomatik güncelle (açıksa)
    const notlarimListesi = document.getElementById("notlarimListesi");
    if (notlarimListesi && notlarimListesi.style.display !== "none") {
      await notlarimiListele();
    }
  } catch (error) {
    alert("Not kaydedilirken bir hata oluştu: " + error.message);
    notKaydet.textContent = "💌 Kaydet";
    notKaydet.disabled = false;
  }
});

// Notlarım listesini göster/gizle
async function notlarimiGoster() {
  const notlarimListesi = document.getElementById("notlarimListesi");
  const notlarimBtn = document.getElementById("notlarimBtn");
  
  if (notlarimListesi.style.display === "none") {
    notlarimListesi.style.display = "block";
    notlarimBtn.textContent = "📝 Gizle";
    await notlarimiListele();
  } else {
    notlarimListesi.style.display = "none";
    notlarimBtn.textContent = "📝 Notlarım";
  }
}

// Notları Firebase'den listele
async function notlarimiListele() {
  const notlarimIcerik = document.getElementById("notlarimIcerik");
  
  try {
    // Yükleniyor mesajı
    notlarimIcerik.innerHTML = '<div class="notlarim-bos">Notlar yükleniyor... ⏳</div>';
    
    const notlar = await notlariFirebaseYukle();
    
    if (notlar.length === 0) {
      notlarimIcerik.innerHTML = '<div class="notlarim-bos">Henüz hiç not kaydetmemişsin 💕</div>';
      return;
    }
    
    notlarimIcerik.innerHTML = notlar.map(not => {
      const aliciBilgisi = not.alici ? `👤 ${not.gonderen} → ${not.alici}` : '';
      
      return `
        <div class="not-item" onclick="notAcKapat(this, '${not.id}')">
          <button class="not-sil-btn" onclick="notSil(event, '${not.id}')" title="Notu sil">×</button>
          <div class="not-tarih">📅 ${not.formattedTarih}</div>
          ${aliciBilgisi ? `<div class="not-alici">${aliciBilgisi}</div>` : ''}
          <div class="not-ozet">${not.ozet}</div>
          <div class="not-tam-metin">${not.metin}</div>
        </div>
      `;
    }).join('');
  } catch (error) {
    notlarimIcerik.innerHTML = '<div class="notlarim-bos">Notlar yüklenirken hata oluştu 😔</div>';
    console.error("Notlar listelenirken hata:", error);
  }
}

// Notu aç/kapat
function notAcKapat(notElement, notId) {
  // Diğer tüm notları kapat
  document.querySelectorAll('.not-item').forEach(item => {
    if (item !== notElement) {
      item.classList.remove('expanded');
    }
  });
  
  // Bu notu aç/kapat
  notElement.classList.toggle('expanded');
}

// Notu Firebase'den sil
async function notSil(event, notId) {
  event.stopPropagation(); // Not açılmasını engelle
  
  if (confirm("Bu notu silmek istediğine emin misin? ☹️")) {
    try {
      await notuFirebaseSil(notId);
      
      // Listeyi güncelle
      await notlarimiListele();
      
      // Textarea'yı her zaman temiz tut
      notDefteri.value = "";
    } catch (error) {
      alert("Not silinirken hata oluştu: " + error.message);
    }
  }
}

// Şiirleri yükle (sayfa açıldığında çalışır)
const baslangicSiirleri = [];

window.onload = function () {
  if (!localStorage.getItem("siirListesi")) {
    localStorage.setItem("siirListesi", JSON.stringify(baslangicSiirleri));
  }
  siirleriYenidenYaz();
  checkOrientation(); // Sayfa yüklendiğinde yön kontrolü
  sayaçGuncelle(); // Sayaç güncelle
  
  // Textarea'yı temiz tut
  if (notDefteri) {
    notDefteri.value = "";
  }
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

  // Yüklü fotoğrafları localStorage'tan getir ve göster
  const storedPhotos = JSON.parse(localStorage.getItem("uploadedPhotos")) || [];
  storedPhotos.forEach((photoData, index) => {
    createAnimatedImageSection(photoData.url, photoData.id, index);
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
          const photoId = Date.now() + Math.random(); // Benzersiz ID oluştur

          createAnimatedImageSection(imageUrl, photoId, stored.length);

          // Fotoğrafı kaydet
          stored.push({ url: imageUrl, id: photoId });
          localStorage.setItem("uploadedPhotos", JSON.stringify(stored));
        };
        reader.readAsDataURL(file);
      });

      event.target.value = "";
    });
  }

  function createAnimatedImageSection(imageUrl, photoId, index) {
    const newSection = document.createElement("section");
    newSection.className = "animated-image";
    newSection.dataset.photoId = photoId;
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
    newSection.style.position = "relative";

    // Silme butonu ekle - başlangıçta gizli
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "🗑️";
    deleteButton.className = "photo-delete-btn";
    deleteButton.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(255, 0, 0, 0.3);
      color: white;
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      font-size: 24px;
      cursor: pointer;
      z-index: 999999999;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      opacity: 0;
      transform: scale(0.8);
    `;

    // Fotoğraf üzerine gelince silme butonunu göster
    newSection.addEventListener("mouseenter", function() {
      deleteButton.style.setProperty("opacity", "1", "important");
      deleteButton.style.setProperty("transform", "scale(1)", "important");
      deleteButton.style.setProperty("background", "transparent", "important");
    });

    newSection.addEventListener("mouseleave", function() {
      deleteButton.style.setProperty("opacity", "0", "important");
      deleteButton.style.setProperty("transform", "scale(0.8)", "important");
      deleteButton.style.setProperty("background", "transparent", "important");
    });

    // Silme butonu hover efektleri
    deleteButton.addEventListener("mouseenter", function() {
      this.style.setProperty("background", "transparent", "important");
      this.style.setProperty("transform", "scale(1.1)", "important");
      this.style.setProperty("box-shadow", "0 4px 12px rgba(0, 0, 0, 0.4)", "important");
    });

    deleteButton.addEventListener("mouseleave", function() {
      this.style.setProperty("background", "transparent", "important");
      this.style.setProperty("transform", "scale(1)", "important");
      this.style.setProperty("box-shadow", "0 2px 8px rgba(0, 0, 0, 0.2)", "important");
    });

    // Silme fonksiyonu - küçülerek kaybolma efekti
    deleteButton.addEventListener("click", function() {
      if (confirm("Bu fotoğrafı silmek istediğine emin misin? ☹️")) {
        // Küçülerek kaybolma animasyonu
        newSection.style.transition = "all 0.5s ease";
        newSection.style.transform = "scale(0.1)";
        newSection.style.opacity = "0";
        newSection.style.filter = "blur(20px)";
        
        // Animasyon bitince DOM'dan kaldır
        setTimeout(() => {
          // localStorage'dan fotoğrafı kaldır
          const stored = JSON.parse(localStorage.getItem("uploadedPhotos")) || [];
          const updatedStored = stored.filter(photo => photo.id !== photoId);
          localStorage.setItem("uploadedPhotos", JSON.stringify(updatedStored));
          
          // DOM'dan fotoğrafı ve butonunu kaldır
          newSection.remove();
        }, 500);
      }
    });

    // Silme butonunu fotoğraf section'ının içine ekle
    newSection.appendChild(deleteButton);
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
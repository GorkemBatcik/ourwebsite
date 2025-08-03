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
      
      // 10 saniye sonra otomatik kapan
      setTimeout(() => {
        enterWebsite();
      }, 10000);
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

// Şiir sistemi - Firebase entegrasyonu
let siirFormuGosteriliyor = false;

window.onload = function () {
  checkOrientation(); // Sayfa yüklendiğinde yön kontrolü
  sayaçGuncelle(); // Sayaç güncelle
  
  // Textarea'yı temiz tut
  if (notDefteri) {
    notDefteri.value = "";
  }
  
  // Firebase'den şiirleri yükle
  siirleriFirebaseYukle();
};

// Firebase'den şiirleri yükle
async function siirleriFirebaseYukle() {
  try {
    const { collection, getDocs, query, orderBy } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
    const siirlerRef = collection(window.db, "siirler");
    
    // Tarihe göre en yeni en üstte olacak şekilde sırala
    const q = query(siirlerRef, orderBy("tarih", "desc"));
    const querySnapshot = await getDocs(q);
    
    const siirler = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      siirler.push({
        id: doc.id,
        ...data,
        // Tarih bilgisini düzgün formatla
        formattedTarih: data.tarih ? new Date(data.tarih.toDate()).toLocaleString('tr-TR') : 'Tarih bilgisi yok'
      });
    });
    
    console.log(`${siirler.length} şiir Firebase'den yüklendi`);
    siirleriEkrandaGoster(siirler);
    return siirler;
  } catch (error) {
    console.error("Şiirler yüklenirken hata:", error);
    return [];
  }
}

// Şiirleri ekranda göster
function siirleriEkrandaGoster(siirler) {
  const grid = document.getElementById("siirGrid");
  if (!grid) return;
  
  grid.innerHTML = "";
  
  if (siirler.length === 0) {
    grid.innerHTML = '<div style="text-align: center; color: #888; font-style: italic; margin-top: 20px; font-size: 1.1rem;">Henüz hiç şiir eklenmemiş 😔</div>';
    return;
  }
  
  siirler.forEach((siir) => {
    const yeniDiv = document.createElement("div");
    yeniDiv.className = "poem";
    yeniDiv.style.position = "relative";
    
    const h3 = document.createElement("h3");
    h3.innerText = siir.baslik;
    
    const p = document.createElement("p");
    p.innerHTML = siir.icerik.replace(/\n/g, "<br>");
    
    // Tarih bilgisi ekle
    const tarihDiv = document.createElement("div");
    tarihDiv.style.cssText = "font-size: 0.8rem; color: #888; margin-bottom: 10px; font-style: italic;";
    tarihDiv.innerHTML = `📅 ${siir.formattedTarih}`;
    
    yeniDiv.appendChild(tarihDiv);
    yeniDiv.appendChild(h3);
    yeniDiv.appendChild(p);
    
    // Düzenleme butonu
    const duzenleBtn = document.createElement("button");
    duzenleBtn.textContent = "Düzenle";
    duzenleBtn.className = "duzenleButonu";
    duzenleBtn.addEventListener("click", () => {
      siiriDuzenle(siir);
    });
    
    // Silme butonu
    const silBtn = document.createElement("button");
    silBtn.textContent = "Sil";
    silBtn.className = "silButonu";
    silBtn.addEventListener("click", () => {
      if (confirm("Bu şiiri silmek istediğine emin misin?")) {
        siiriFirebaseSil(siir.id);
      }
    });
    
    yeniDiv.appendChild(duzenleBtn);
    yeniDiv.appendChild(silBtn);
    
    grid.appendChild(yeniDiv);
  });
}

function formuGoster() {
  const form = document.getElementById("siirFormu");
  siirFormuGosteriliyor = !siirFormuGosteriliyor;
  form.style.display = siirFormuGosteriliyor ? "block" : "none";
  
  // Form açılırsa inputları temizle
  if (siirFormuGosteriliyor) {
    document.getElementById("siirBaslik").value = "";
    document.getElementById("siirIcerik").value = "";
  }
}

// Firebase'e şiir kaydet
async function siirEkle() {
  const baslik = document.getElementById("siirBaslik").value.trim();
  const icerik = document.getElementById("siirIcerik").value.trim();

  if (!baslik || !icerik) {
    alert("Lütfen şiir başlığı ve içeriğini doldur 🥺");
    return;
  }

  try {
    const { collection, addDoc, serverTimestamp } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
    const siirlerRef = collection(window.db, "siirler");
    
    const yeniSiir = {
      baslik: baslik,
      icerik: icerik,
      tarih: serverTimestamp()
    };
    
    await addDoc(siirlerRef, yeniSiir);
    
    // Formu temizle ve gizle
    document.getElementById("siirBaslik").value = "";
    document.getElementById("siirIcerik").value = "";
    formuGoster(); // Formu gizle
    
    // Şiirleri yeniden yükle
    await siirleriFirebaseYukle();
    
    // Başarı mesajı
    const kaydetBtn = document.querySelector('.kaydet-btn');
    if (kaydetBtn) {
      const originalText = kaydetBtn.textContent;
      kaydetBtn.textContent = "Kaydedildi! ✨";
      setTimeout(() => {
        kaydetBtn.textContent = originalText;
      }, 1500);
    }
    
  } catch (error) {
    console.error("Şiir kaydedilirken hata:", error);
    alert("Şiir kaydedilirken bir hata oluştu: " + error.message);
  }
}

// Firebase'den şiir sil
async function siiriFirebaseSil(siirId) {
  try {
    const { doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
    const siirRef = doc(window.db, "siirler", siirId);
    await deleteDoc(siirRef);
    
    // Şiirleri yeniden yükle
    await siirleriFirebaseYukle();
    
  } catch (error) {
    console.error("Şiir silinirken hata:", error);
    alert("Şiir silinirken bir hata oluştu: " + error.message);
  }
}

// Şiiri düzenleme moduna al
function siiriDuzenle(siir) {
  // Formu göster
  formuGoster();
  
  // Şiir bilgilerini forma doldur
  document.getElementById("siirBaslik").value = siir.baslik;
  document.getElementById("siirIcerik").value = siir.icerik;
  
  // Kaydet butonunu güncelle butonuna çevir
  const kaydetBtn = document.querySelector('.kaydet-btn');
  if (kaydetBtn) {
    kaydetBtn.textContent = "Güncelle";
    kaydetBtn.onclick = () => siiriGuncelle(siir.id);
  }
}

// Firebase'de şiiri güncelle
async function siiriGuncelle(siirId) {
  const baslik = document.getElementById("siirBaslik").value.trim();
  const icerik = document.getElementById("siirIcerik").value.trim();

  if (!baslik || !icerik) {
    alert("Lütfen şiir başlığı ve içeriğini doldur 🥺");
    return;
  }

  try {
    const { doc, updateDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
    const siirRef = doc(window.db, "siirler", siirId);
    
    await updateDoc(siirRef, {
      baslik: baslik,
      icerik: icerik
    });
    
    // Formu temizle ve gizle
    document.getElementById("siirBaslik").value = "";
    document.getElementById("siirIcerik").value = "";
    formuGoster(); // Formu gizle
    
    // Kaydet butonunu normale çevir
    const kaydetBtn = document.querySelector('.kaydet-btn');
    if (kaydetBtn) {
      kaydetBtn.textContent = "Kaydet";
      kaydetBtn.onclick = siirEkle;
    }
    
    // Şiirleri yeniden yükle
    await siirleriFirebaseYukle();
    
    // Başarı mesajı
    if (kaydetBtn) {
      kaydetBtn.textContent = "Güncellendi! ✨";
      setTimeout(() => {
        kaydetBtn.textContent = "Kaydet";
      }, 1500);
    }
    
  } catch (error) {
    console.error("Şiir güncellenirken hata:", error);
    alert("Şiir güncellenirken bir hata oluştu: " + error.message);
  }
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

// Firebase'den fotoğrafları yükle
async function fotograflariFirebaseYukle() {
  try {
    const { collection, getDocs, query, orderBy } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
    const fotograflarRef = collection(window.db, "fotograflar");
    
    // Tarihe göre en yeni en üstte olacak şekilde sırala
    const q = query(fotograflarRef, orderBy("tarih", "desc"));
    const querySnapshot = await getDocs(q);
    
    const fotograflar = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      fotograflar.push({
        id: doc.id,
        ...data
      });
    });
    
    console.log(`${fotograflar.length} fotoğraf Firebase'den yüklendi`);
    return fotograflar;
  } catch (error) {
    console.error("Fotoğraflar yüklenirken hata:", error);
    return [];
  }
}

// Firebase'e fotoğraf kaydet
async function fotografFirebaseKaydet(imageUrl, fileName) {
  try {
    const { collection, addDoc, serverTimestamp } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
    const fotograflarRef = collection(window.db, "fotograflar");
    
    const yeniFotograf = {
      url: imageUrl,
      dosyaAdi: fileName,
      tarih: serverTimestamp()
    };
    
    const docRef = await addDoc(fotograflarRef, yeniFotograf);
    return docRef.id;
  } catch (error) {
    console.error("Fotoğraf kaydedilirken hata:", error);
    throw error;
  }
}

// Firebase'den fotoğraf sil
async function fotografFirebaseSil(fotografId) {
  try {
    const { doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
    const fotografRef = doc(window.db, "fotograflar", fotografId);
    await deleteDoc(fotografRef);
  } catch (error) {
    console.error("Fotoğraf silinirken hata:", error);
    throw error;
  }
}

// Mevcut bölüme silme butonu ekle
function addDeleteButtonToSection(section, photoId) {
  // Eğer zaten silme butonu varsa ekleme
  if (section.querySelector('.photo-delete-btn')) return;
  
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
  section.addEventListener("mouseenter", function() {
    deleteButton.style.setProperty("opacity", "1", "important");
    deleteButton.style.setProperty("transform", "scale(1)", "important");
    deleteButton.style.setProperty("background", "transparent", "important");
  });

  section.addEventListener("mouseleave", function() {
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

  // Silme fonksiyonu
  deleteButton.addEventListener("click", async function() {
    if (confirm("Bu fotoğrafı silmek istediğine emin misin? ☹️")) {
      try {
        // Küçülerek kaybolma animasyonu
        section.style.transition = "all 0.5s ease";
        section.style.transform = "scale(0.1)";
        section.style.opacity = "0";
        section.style.filter = "blur(20px)";
        
        // Animasyon bitince Firebase'den sil
        setTimeout(async () => {
          try {
            await fotografFirebaseSil(photoId);
            // Varsayılan fotoğrafa geri dön
            section.style.backgroundImage = section.id === 'foto3-section' ? 
              "url('fotolar/foto3.jpeg')" : "url('fotolar/foto4.jpeg')";
            section.style.transform = "scale(1)";
            section.style.opacity = "1";
            section.style.filter = "blur(0)";
            section.removeAttribute('data-photo-id');
            deleteButton.remove();
          } catch (error) {
            alert("Fotoğraf silinirken hata oluştu: " + error.message);
          }
        }, 500);
      } catch (error) {
        alert("Fotoğraf silinirken hata oluştu: " + error.message);
      }
    }
  });

  section.appendChild(deleteButton);
}

// Kullanıcının yüklediği fotoğrafları Firebase'den yükle ve göster
document.addEventListener("DOMContentLoaded", async () => {
  const photoInput = document.getElementById("photoUpload");

  // Firebase'den fotoğrafları yükle ve göster
  try {
    const fotograflar = await fotograflariFirebaseYukle();
    
    // İlk 2 fotoğrafı 3. ve 4. bölümlere yerleştir (varsa)
    if (fotograflar.length >= 1) {
      const foto3Section = document.getElementById('foto3-section');
      if (foto3Section) {
        foto3Section.style.backgroundImage = `url('${fotograflar[0].url}')`;
        foto3Section.dataset.photoId = fotograflar[0].id;
        // Silme butonu ekle
        addDeleteButtonToSection(foto3Section, fotograflar[0].id);
      }
    }
    
    if (fotograflar.length >= 2) {
      const foto4Section = document.getElementById('foto4-section');
      if (foto4Section) {
        foto4Section.style.backgroundImage = `url('${fotograflar[1].url}')`;
        foto4Section.dataset.photoId = fotograflar[1].id;
        // Silme butonu ekle
        addDeleteButtonToSection(foto4Section, fotograflar[1].id);
      }
    }
    
    // Kalan fotoğrafları yeni bölümler olarak ekle
    fotograflar.slice(2).forEach((fotograf, index) => {
      createAnimatedImageSection(fotograf.url, fotograf.id, index + 2);
    });
  } catch (error) {
    console.error("Fotoğraflar yüklenirken hata:", error);
  }

  if (photoInput) {
    photoInput.addEventListener("change", async function (event) {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      Array.from(files).forEach(async file => {
        const reader = new FileReader();
        reader.onload = async function (e) {
          const imageUrl = e.target.result;
          
          try {
            // Firebase'e kaydet
            const fotografId = await fotografFirebaseKaydet(imageUrl, file.name);
            
            // Mevcut fotoğrafları kontrol et ve 3. veya 4. bölüme yerleştir
            const fotograflar = await fotograflariFirebaseYukle();
            
            if (fotograflar.length === 1) {
              // İlk fotoğraf - 3. bölüme yerleştir
              const foto3Section = document.getElementById('foto3-section');
              if (foto3Section) {
                foto3Section.style.backgroundImage = `url('${imageUrl}')`;
                foto3Section.dataset.photoId = fotografId;
                addDeleteButtonToSection(foto3Section, fotografId);
              }
            } else if (fotograflar.length === 2) {
              // İkinci fotoğraf - 4. bölüme yerleştir
              const foto4Section = document.getElementById('foto4-section');
              if (foto4Section) {
                foto4Section.style.backgroundImage = `url('${imageUrl}')`;
                foto4Section.dataset.photoId = fotografId;
                addDeleteButtonToSection(foto4Section, fotografId);
              }
            } else {
              // 3. ve sonraki fotoğraflar - yeni bölüm olarak ekle
              createAnimatedImageSection(imageUrl, fotografId, fotograflar.length - 1);
            }
            
          } catch (error) {
            alert("Fotoğraf yüklenirken bir hata oluştu: " + error.message);
          }
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

    // Silme fonksiyonu - Firebase'den sil
    deleteButton.addEventListener("click", async function() {
      if (confirm("Bu fotoğrafı silmek istediğine emin misin? ☹️")) {
        try {
          // Küçülerek kaybolma animasyonu
          newSection.style.transition = "all 0.5s ease";
          newSection.style.transform = "scale(0.1)";
          newSection.style.opacity = "0";
          newSection.style.filter = "blur(20px)";
          
          // Animasyon bitince DOM'dan kaldır
          setTimeout(async () => {
            try {
              // Firebase'den fotoğrafı sil
              await fotografFirebaseSil(photoId);
              
              // DOM'dan fotoğrafı ve butonunu kaldır
              newSection.remove();
            } catch (error) {
              alert("Fotoğraf silinirken hata oluştu: " + error.message);
            }
          }, 500);
        } catch (error) {
          alert("Fotoğraf silinirken hata oluştu: " + error.message);
        }
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
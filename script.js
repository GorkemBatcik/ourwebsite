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
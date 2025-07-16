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
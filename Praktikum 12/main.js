```javascript
// Menjalankan kode setelah halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function () {

    // Menampilkan pesan pada console browser
    console.log("Portal Berita TechNews ID berhasil dimuat.");

    // Mengambil semua link navigasi
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    // Mengubah status aktif saat link navigasi diklik
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {

            // Menghapus class active dari semua link
            navLinks.forEach(function (navLink) {
                navLink.classList.remove("active");
            });

            // Menambahkan class active ke link yang dipilih
            this.classList.add("active");
        });
    });

});
```
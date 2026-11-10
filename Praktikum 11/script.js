$(function () {

    // 1. Navigasi mobile menggunakan event click dan efek slideToggle.
    $('.mobile-menu').on('click', function () {
        $('.nav-list')
            .stop(true, true)
            .slideToggle(180)
            .toggleClass('open');
    });

    // Menutup navigasi mobile setelah link dipilih.
    $('.nav-list a').on('click', function () {
        if (window.matchMedia('(max-width: 760px)').matches) {
            $('.nav-list')
                .stop(true, true)
                .slideUp(180)
                .removeClass('open');
        }
    });

    // 2. Tab kategori produk menggunakan click dan efek fade.
    $('.tab-panel').hide();
    $('.tab-panel').first().show();

    $('.tab').on('click', function () {
        const target = $(this).data('target');

        $('.tab').removeClass('active');
        $(this).addClass('active');

        $('.tab-panel:visible')
            .stop(true, true)
            .fadeOut(120, function () {
                $(target).stop(true, true).fadeIn(220);
            });
    });

    // 3. Efek animate pada kartu produk saat pointer diarahkan.
    $('.product-card')
        .on('mouseenter', function () {
            $(this).stop(true, true).animate({
                marginTop: '-5px'
            }, 150);
        })
        .on('mouseleave', function () {
            $(this).stop(true, true).animate({
                marginTop: '0px'
            }, 150);
        });

    // Notifikasi menggunakan fadeIn, delay, dan fadeOut.
    function showToast(message, isError) {
        $('#toast')
            .stop(true, true)
            .text(message)
            .toggleClass('error-toast', Boolean(isError))
            .fadeIn(180)
            .delay(2200)
            .fadeOut(300);
    }

    // Tombol produk memberikan notifikasi dan menuju form member.
    $('.add-btn').on('click', function () {
        const productName = $(this).data('product');

        showToast(
            productName + ' dipilih. Lanjutkan pendaftaran member.'
        );

        $('html, body').animate({
            scrollTop: $('#member').offset().top - 70
        }, 450);
    });

    // 4. Tombol kembali ke atas muncul ketika halaman digulir.
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $('#backToTop').stop(true, true).fadeIn(180);
        } else {
            $('#backToTop').stop(true, true).fadeOut(180);
        }
    });

    $('#backToTop').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 450);
    });

    // 5. Custom rule nomor HP harus terdiri dari 10 sampai 12 digit.
    $.validator.addMethod('nomorHp', function (value, element) {
        return this.optional(element) ||
            /^[0-9]{10,12}$/.test(value);
    }, 'Nomor HP harus terdiri dari 10–12 digit angka.');

    // Custom rule password harus mengandung huruf dan angka.
    $.validator.addMethod('hurufAngka', function (value, element) {
        return this.optional(element) ||
            (/[A-Za-z]/.test(value) && /[0-9]/.test(value));
    }, 'Password harus mengandung huruf dan angka.');

    // 6. Validasi form menggunakan jQuery Validation Plugin.
    $('#formMember').validate({
        rules: {
            nama: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            hp: {
                required: true,
                nomorHp: true
            },
            usia: {
                required: true,
                digits: true,
                min: 17
            },
            kategoriKulit: {
                required: true
            },
            produkFavorit: {
                required: true
            },
            password: {
                required: true,
                minlength: 8,
                hurufAngka: true
            },
            konfirmasi: {
                required: true,
                equalTo: '#password'
            }
        },

        messages: {
            nama: {
                required: 'Nama lengkap wajib diisi.',
                minlength: 'Nama minimal 3 karakter.'
            },
            email: {
                required: 'Email wajib diisi.',
                email: 'Masukkan format email yang valid.'
            },
            hp: {
                required: 'Nomor HP wajib diisi.'
            },
            usia: {
                required: 'Usia wajib diisi.',
                digits: 'Usia harus berupa angka.',
                min: 'Usia minimal 17 tahun.'
            },
            kategoriKulit: {
                required: 'Silakan pilih jenis kulit.'
            },
            produkFavorit: {
                required: 'Silakan pilih kategori produk favorit.'
            },
            password: {
                required: 'Password wajib diisi.',
                minlength: 'Password minimal 8 karakter.'
            },
            konfirmasi: {
                required: 'Konfirmasi password wajib diisi.',
                equalTo: 'Konfirmasi password belum sama.'
            }
        },

        errorElement: 'label',
        errorClass: 'error',

        highlight: function (element) {
            $(element).addClass('error').removeClass('valid');
        },

        unhighlight: function (element) {
            $(element).removeClass('error').addClass('valid');
        },

        submitHandler: function (form) {
            const nama = $('#nama').val().trim();

            $('#successMessage')
                .stop(true, true)
                .hide()
                .slideDown(250);

            showToast(
                'Pendaftaran berhasil. Selamat datang, ' + nama + '!'
            );

            form.reset();

            $('#formMember input, #formMember select')
                .removeClass('valid error');

            setTimeout(function () {
                $('#successMessage').slideUp(250);
            }, 4500);

            return false;
        }
    });

    // Smooth scroll untuk link navigasi ke bagian halaman.
    $('a[href^="#"]').on('click', function (event) {
        const target = $(this).attr('href');

        if (target.length > 1 && $(target).length) {
            event.preventDefault();

            $('html, body').stop().animate({
                scrollTop: $(target).offset().top - 65
            }, 450);
        }
    });

});

$('#subUrl').click(() => {
    let url = $('#url').val()
    let isurl = new RegExp(/http:|www.|https:/g, 'i')

    if (!url || !isurl.test(url)) {
        $('#url').val('')
        swal('Gagal', 'Masukkan url video dengan benar', 'error')
    }

    let api
    if (/tiktok/.test(url)) api = { url: '/api/downloader/tiktok', type: 'tiktok' }
    if (/twitter/.test(url)) api = { url: '/api/downloader/twitter', type: 'twitter' }
    if (/instagram/.test(url)) api = { url: '/api/downloader/instagram', type: 'instagram' }
    if (/youtube/.test(url) || /youtu.be/.test(url)) api = { url: '/api/downloader/youtube', type: 'youtube' }
    if (/facebook/.test(url) || /fb.watch/.test(url)) api = { url: '/api/downloader/facebook', type: 'facebook' }

    if (!api) return swal('Gagal', 'Url tidak didukung', 'error')
    $.ajax({
        url: api.url,
        type: 'get',
        data: { url },
        dataType: 'json',
        beforeSend: () => {
            $('#result1').html('')
            $('#result2').html('')
            $('#loading').html('<small class="text-muted text-center mt-5">Tunggu sebentar...</small>')
        },
        success: (a, b) => {
            $('#url').val('')
            $('#loading').html('')
            $('#result2').html('')

            if (!a || !a.status) return swal('Gagal', 'Gagal menampilkan data', 'error')
            if (api.type === 'twitter' || api.type === 'instagram') {
                $('#result1').html('<img src="' + a.result.thumbnail + '" class="img-fluid my-2">')
                $.each(a.result.video, (c, d) => {
                    $('#result2').append(`<div class="col-6 my-2"><a href="${d.url}" class="btn btn-primary w-100">${d.q_text}</a></div>`)
                })
            } else if (api.type === 'tiktok') {
                $('#result1').html('<img src="' + a.result.thumbnail + '" class="img-fluid my-2">')
                $.each(a.result.video, (c, d) => {
                    $('#result2').append(`<div class="col-6 my-2"><a href="${d.url}" class="btn btn-primary w-100">${d.fileType.toUpperCase()} [ ${d.quality} ]</a></div>`)
                })
                $.each(a.result.audio, (c, d) => {
                    $('#result2').append(`<div class="col-6 my-2"><a href="${d.url}" class="btn btn-primary w-100">${d.fileType.toUpperCase()} [ ${d.quality} ]</a></div>`)
                })
            } else if (api.type === 'youtube') {
                $('#result1').html('<img src="' + a.result.thumbnail + '" class="img-fluid my-2">')
                $.each(a.result.media, (c, d) => {
                    $('#result2').append(`<div class="col-6 my-2"><a href="${d.url}" class="btn btn-primary w-100">${d.filetype.toUpperCase()} [ ${d.quality} ]</a></div>`)
                })
            } else if (api.type === 'facebook') {
                $('#result1').html('<img src="' + a.result.thumbnail + '" class="img-fluid my-2">')
                $.each(a.result.media, (c, d) => {
                    $('#result2').append(`<div class="col-12 my-2"><a href="${d}" class="btn btn-primary w-100">Download</a></div>`)
                })
            } else return swal('Gagal', 'Url tidak didukung', 'error')
        },
        error: () => {
            $('#url').val('')
            $('#loading').html('')

            swal('Gagal', 'Gagal menampilkan data', 'error')
        }
    })
})
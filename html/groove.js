var musicList = [];
$(function(){
    $.ajax({
        type: 'POST',
        url: './groove_music_name.json?2017022001',
        cache: true,
        dataType: 'json'
    }).done(function(response) {
        musicList = response;
        $.each(response, function(index, musics) {
            var indexHtml= $('<div>')
                .html(
                    $('<a>')
                        .attr('href', 'javascript:void(0);')
                        .html(index)
                        .data('index', index)
                        .on('click', openList)
            );
            if ($.inArray(index, [
                'あ','か','さ','た','な',
                'は','ま','や','ら','わ'
            ]) !== -1) {
                indexHtml.css('clear', 'left');
            }
            $('#names').append(indexHtml);
        });
    }).fail(function(){
        alert('データを取得できませんでした。');
    });
    function openList() {
        $('#musicList').empty();
        $('#musicList').append(
            $('<div>')
                .html(
                    $('<a>')
                        .attr('id', 'closeLink')
                        .attr('href', 'javascript:void(0);')
                        .html('[× 閉じる]')
                        .on('click', function(){
                            $('#musicList').hide();
                        })
                )
        );
        var index = $(this).data('index');
        $.each(musicList[index], function(id, name) {
            id = id.replace(/^_/, '');
            var musicHtml = $('<div>')
                .html(
                    $('<a>')
                        .attr('href', 'https://mypage.groovecoaster.jp/sp/#/mc/'+id)
                        .attr('target', '_blank')
                        .html(name)
            );
            $('#musicList').append(musicHtml);
        });
        $('#musicList').fadeIn('fast');
        return false;
    }

});

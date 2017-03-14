<?php
$options = array(
    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
); 
$db = new PDO("mysql:host=localhost; dbname=groove","","", $options);

$musics = array();

$query = 'SELECT * FROM `music_lists` WHERE `deleted_at` = 0 ORDER BY `music_index` ASC, `music_name` ASC';

$sth = $db->prepare($query);
$r = $sth->execute();
$musicLists = $sth->fetchAll(PDO::FETCH_ASSOC);

foreach ($musicLists as $musicList) {
    $index = strtoupper($musicList['music_index']);
    if (!preg_match('/[A-Z0-9]./', $index)) {
        $index = mb_convert_kana($index, 'h', 'UTF-8');
        echo $index;
        $index = mb_convert_kana($index, 'H', 'UTF-8');
        echo $index;

        $index = mb_substr($index, 0, 1, 'UTF-8');
        if ($index == 'っ') $index = 'つ';
    }
    echo "$index\n";
    $id = $musicList['id'];
    $musics[$index]['_'.$id] = $musicList['music_name'];
}

file_put_contents('groove_music_name.json', json_encode($musics));
exit;

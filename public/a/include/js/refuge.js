let m_main_conf = {
    lang: 'KOR',
    name: 'refuge',
    curr_cnt: 0,
    curr_screen: 1,
    screen_ptime: 0,
    screen_last: 0,
    style_cnt: 0,
    curr_page: -1,
};

let m_img_list = [
    {
        url: 'images/test/01.png',
    },
];

function setInit() {
    console.log(m_main_conf.name, 'setInit');
}

function setMainLang(_lang) {}

function setMainStart() {
    setContentsApi();
}

function setBtnBack() {
    window.parent.setMainReset();
}

function setContentsApi() {
    var t_url = 'https://beta.msds.svr.kr/api/contentdata';

    $.ajax({
        url: t_url,
        type: 'POST',
        dataType: 'json',
        data: {
            mainIdx: 3,
            subIdx: 10,
        },
        success: function (data) {
            console.log(data);
            setImage(data);
        },
        error: function (xhr, status, error) {
            console.error('피난 컨텐츠 에러 발생:', status, error);
        },
    });
}

function setImage(_data) {
    $('#id_img').attr('src', _data.data[0].file_path);
}

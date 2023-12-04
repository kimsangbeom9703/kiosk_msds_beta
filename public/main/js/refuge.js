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
        url: '/main/images/test/33292_22295_3611.jpg',
    },
];

function setInit() {
    console.log(m_main_conf.name, 'setInit');
    $('#id_img').attr('src', m_img_list[0].url);
}

function setMainLang(_lang) {}

function setMainStart() {}

function setBtnBack() {
    window.parent.setMainReset();
}

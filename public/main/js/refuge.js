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

// let m_img_list = [
//     {
//         url: '/main/images/test/01.png',
//     },
// ];

function setInit() {
    console.log(m_main_conf.name, 'setInit');
    $('#id_img').attr('src', m_img_list[0].file_path);
}

function setMainLang(_lang) {}

function setMainStart() {}

function setBtnBack() {
    window.parent.setMainReset();
}

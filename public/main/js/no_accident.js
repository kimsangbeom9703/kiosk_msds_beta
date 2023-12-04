let m_main_conf = {
    lang: 'KOR',
    name: 'no_accident',
    curr_cnt: 0,
    curr_screen: 1,
    screen_ptime: 0,
    screen_last: 0,
    style_cnt: 0,
    curr_page: -1,
};

let m_target_date = '20220823';
let m_target_num = '1000';

function setInit() {
    new WOW().init();
    console.log(m_main_conf.name, 'setInit');
    setMainInterval();
    setInterval(setMainInterval, 30000);
}

function setNoAccidentDate() {
    let today = new Date();

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 날짜
    let day = today.getDay(); // 요일
    let rour = today.getHours();
    let hour = 0;
    let min = today.getMinutes();
    let ampm = '';
    if (rour > 12) {
        hour = rour - 12;
        ampm = 'PM';
    } else {
        hour = rour;
        ampm = 'AM';
    }

    $('#id_start').html(
        m_target_date.substr(0, 4) + '. ' + m_target_date.substr(4, 2) + '. ' + m_target_date.substr(6, 2)
    );
    $('#id_today').html(year + '. ' + month.toString().padStart(2, '0') + '. ' + date.toString().padStart(2, '0'));
    $('#id_num_0').html(m_target_num);

    const startDate = new Date(
        m_target_date.substr(0, 4) + '-' + m_target_date.substr(4, 2) + '-' + m_target_date.substr(6, 2)
    );
    const timeDiff = today - startDate;
    const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    let t_pp = ((daysPassed / parseInt(m_target_num)) * 100).toFixed(2);
    $('#id_num_1').html(daysPassed.toString());
    $('#id_pp').html(t_pp.toString());
    $('#id_hh').html(rour.toString().padStart(2, '0'));
    $('#id_mm').html(min.toString().padStart(2, '0'));
}

function setMainInterval() {
    setNoAccidentDate();
}

function setMainLang(_lang) {}

function setMainStart() {}

function setBtnBack() {
    window.parent.setMainReset();
}

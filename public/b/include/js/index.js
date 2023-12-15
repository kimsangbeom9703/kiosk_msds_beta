let m_main_conf = {
    lang: 'KOR',
    name: 'index',
    curr_cnt: -1,
    curr_page: '-1',
    curr_screen: 1,
    screen_ptime: 0,
    screen_last: 0,
    style_cnt: 0,
    time_last: 0,
    curr_notice: 1,
    curr_notice_type: '',
};
let m_lang_temp = 'KOR';
let m_lang_click = 0;
let gl_jsop_lang_data = new Object();
let setTimeoutID = null;
let m_proxy_url = ''; //'https://cors.bridged.cc/';
let m_pdf_swiper;
let m_pdf_container_height = 0;
let m_notice_list = [
    {
        title: '컨텐츠 1',
        desc: null,
        sort: '1',
        org_file_name: 'TV_CAM_20160404_kbs.mp4',
        file_path: '/uploads/main/contents/1702430685_4a52cf889e7f07ac2ec9.mp4',
        file_type: 'video/mp4',
        file_duration: '292.058433',
    },
    {
        title: '컨텐츠 2',
        desc: null,
        sort: '2',
        org_file_name: 'TV_CAM_20160411_kbs.mp4',
        file_path: '/uploads/main/contents/1702430580_750f5324ed3932d30803.mp4',
        file_type: 'video/mp4',
        file_duration: '325.625300',
    },
];

let m_ticker_list = [
    {
        title: '산업재해예방시설 융자금 지원사업 및 보조금 지급 사업 산업재해예방시설 융자금 지원사업 및 보조금 지급 사업...',
    },
    {
        title: '산업재해예방시설 융자금 지원사업 및 보조금 지급 사업 산업재해예방시설 융자금 지원사업 및 보조금 지급 사업...',
    },
    {
        title: '산업재해예방시설 융자금 지원사업 및 보조금 지급 사업 산업재해예방시설 융자금 지원사업 및 보조금 지급 사업...',
    },
    {
        title: '산업재해예방시설 융자금 지원사업 및 보조금 지급 사업 산업재해예방시설 융자금 지원사업 및 보조금 지급 사업...',
    },
    {
        title: '산업재해예방시설 융자금 지원사업 및 보조금 지급 사업 산업재해예방시설 융자금 지원사업 및 보조금 지급 사업...',
    },
];

let m_weather_json = {
    data: {
        sky: '3',
        temp: '5',
        tempMax: '15.7',
        tempMin: '4.6',
        humidity: '34',
    },
};

let m_dust_json = {
    status: 'success',
    statusCode: 200,
    data: {
        left_data: {
            dustStationName: 'T2',
            fcstRealDate: '2023-11-16 08:00:00',
            fcstDate: '2023-11-16',
            fcstTime: '08:00:00',
            callDate: '2023-11-16T10:00:58',
            locationId: 'T2',
            type: 'IN',
            co: '0.5',
            co2: '521',
            no2: '0.031',
            o3: null,
            so2: null,
            pm10: '27.9',
            pm2_5: '15.6',
        },
        right_data: {
            dustStationName: '자유무역지역',
            fcstRealDate: '2023-11-16 07:00:00',
            fcstDate: '2023-11-16',
            fcstTime: '07:00:00',
            callDate: '2023-11-16T09:01:19',
            locationId: '자유무역지역',
            type: 'OUT',
            co: '1.0',
            co2: null,
            no2: '0.0240',
            o3: '0.0221',
            so2: '0.0041',
            pm10: '38',
            pm2_5: '22',
        },
    },
};

function setInitSettingLang(p_load_data) {
    gl_jsop_lang_data = p_load_data;

    //var str_attr = "";
    //var str_lang = m_main_conf.lang.toLowerCase();
    //str_attr = $(".lang_code_names").eq(i).attr("lang_code");
    //gl_jsop_lang_data[m_main_conf.name][str_attr][str_lang]
}

function setMainLang(p_lang) {
    var i = 0;
    var str_code = '';
    m_main_conf.lang = p_lang;
    var str_attr = '';
    var str_lang = m_main_conf.lang.toLowerCase();
    console.log(str_lang);
    $('.lang_code_names').each(function (i) {
        str_attr = $('.lang_code_names').eq(i).attr('lang_code');

        try {
            $(this).html(gl_jsop_lang_data[m_main_conf.name][str_attr][str_lang]);
        } catch (err) {
            console.log('ERROR LANG INDEX : ' + str_attr);
        }
    });

    document['frame_refuge'].setMainLang(p_lang);
    document['frame_call'].setMainLang(p_lang);
    document['frame_no_accident'].setMainLang(p_lang);
    document['frame_safety_pop'].setMainLang(p_lang);

    m_lang_click = 0;

    //$('.gnb-btn-1').removeClass('active');

    $('#kr2').removeClass('active');
    $('#en2').removeClass('active');
    $('#ch2').removeClass('active');
    if (p_lang == 'KOR') {
        $('#kr').prop('checked', true);
        $('#kr2').addClass('active');
    } else if (p_lang == 'ENG') {
        $('#en').prop('checked', true);
        $('#en2').addClass('active');
    } else if (p_lang == 'CHN') {
        $('#ch').prop('checked', true);
        $('#ch2').addClass('active');
    }
}

function setInit() {
    gsap.to($('#langList'), { opacity: 0, right: '70px', duration: 0.0 });
    $('#langList').hide();
    new WOW().init();
    console.log('index setInit');
    setTimeout(setMainInterval, 100);
    setInterval(setMainInterval, 10000);
    setLoadLanguage('/b/include/kiosk_lang.json');
    setNoticeDrawInfo();

    $('.main-btn-wrap').mousedown(function () {
        onClickMainPop(this);
    });

    $('.gnb-btn').mousedown(function () {
        onClickMainMenu(this);
    });

    $('.btn_pop_close').mousedown(function () {
        onClickPopup(this);
    });

    $('.btn_close').mousedown(function () {
        onClickPopup(this);
    });

    $('.video_wrap').mousedown(function () {
        onClickNull();
    });

    $('.gnb-btn-1').mousedown(function () {
        onClickMainMenu_1(this);
    });

    $('#id_btn_back').mousedown(function () {
        onClickBtnBack(this);
    });
    $('#id_link_home').mousedown(function () {
        onClickHome(this);
    });

    $('.btn_close').mousedown(function () {
        onClickBtnCloseLang();
    });

    $('#kr2').mousedown(function () {
        setLangBtn2(this);
    });

    $('#en2').mousedown(function () {
        setLangBtn2(this);
    });

    $('#ch2').mousedown(function () {
        setLangBtn2(this);
    });

    $('#kr').on('click', function () {
        m_lang_temp = 'KOR';
    });

    $('#en').on('click', function () {
        m_lang_temp = 'ENG';
    });

    $('#ch').on('click', function () {
        m_lang_temp = 'CHN';
    });

    $('#langBtn').mousedown(function () {
        $('#langBtn').toggleClass('active');
        if ($('#langBtn').hasClass('active')) {
            $('#langList').show();
            gsap.to($('#langList'), { opacity: 1, right: '270px', duration: 0.5 });
        } else {
            gsap.to($('#langList'), {
                opacity: 0,
                right: '70px',
                duration: 0.5,
                onComplete: function () {
                    $('#langList').hide();
                },
            });
        }
        /*
        $('#langBtn').toggleClass('active');
        setTimeout(setLangBtnChk, 500);
        if ($('#langBtn').hasClass('active')) {
            $('#langList').show();
        }
        */
    });

    $('.btn_apply').mousedown(function () {
        setLangApply();
    });

    $('html').mousedown(function (evt) {
        m_main_conf.time_last = new Date().getTime();
    });
    $('html').bind('touchstart', function (e) {
        m_main_conf.time_last = new Date().getTime();
    });

    var str_iframe = $('iframe').contents();

    //IFRAME 클릭 감지
    $(str_iframe).mousedown(function (evt) {
        m_main_conf.time_last = new Date().getTime();
        //console.log("BODY FRAME CLICK");
    });
    $(str_iframe).bind('touchstart', function (e) {
        m_main_conf.time_last = new Date().getTime();
        //console.log("BODY FRAME TOUCH");
    });
    setContentsApi();
    setDustApi();
    setWeatherApi();
    setTickerListUp();

    /*
    $('#id_btn_prev').mousedown(function () {
        onPrevPage();
    });
    $('#id_btn_next').mousedown(function () {
        onNextPage();
    });
    $('#id_btn_close').mousedown(function () {
        onPdfClose();
    });

    document.getElementById('id_viewer_area').addEventListener(
        'mousedown',
        function (evt) {
            onMouseDownList(this, evt);
        },
        true
    );
    document.getElementById('id_viewer_area').addEventListener(
        'mouseup',
        function (evt) {
            onMouseUpList(this, evt);
        },
        true
    );
    document.addEventListener(
        'mousemove',
        function (evt) {
            onMouseMoveList(evt);
        },
        false
    );

    var ret_offset = $('#id_viewer_area').offset();
    var ret_width = $('#id_viewer_area').width();

    m_move_conf.parent_x = ret_offset.left;
    m_move_conf.parent_w = ret_width + m_move_conf.parent_x;

    //setTimeout(setTestLoad, 100);
    */
    // Swiper 초기화
    m_pdf_swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto', // 한 번에 보여질 슬라이드 개수
        spaceBetween: 200,
        centeredSlides: true,
        // slideWidth: 2160,
        pagination: {},
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            init: function () {},
            slideChange: function () {
                refreshPageNum();
            },
        },
    });

    $('#id_gnb_1').hide();
    setHideBtnBack();
    $('.sub_page_main').hide();
    $('.quick_menu').hide();
    $('#id_pop_img').hide();
    $('#id_pop_pdf').hide();
    $('#id_pop_video').hide();
}

function setLangBtn2(_obj) {
    $('#kr2').removeClass('active');
    $('#en2').removeClass('active');
    $('#ch2').removeClass('active');
    $(_obj).addClass('active');

    if ($(_obj).attr('id') == 'kr2') {
        setMainLang('KOR');
    } else if ($(_obj).attr('id') == 'en2') {
        setMainLang('ENG');
    } else if ($(_obj).attr('id') == 'ch2') {
        setMainLang('CHN');
    }
    $('#langBtn').removeClass('active');
    gsap.to($('#langList'), {
        opacity: 0,
        right: '70px',
        duration: 0.5,
        onComplete: function () {
            $('#langList').hide();
        },
    });
}

function onClickNull() {
    //console.log('null');
}
function onClickPopup() {
    if ($('#id_pop_pdf').is(':visible') == true) {
        onPdfClose();
        return;
    }
    if ($('#id_pop_video').is(':visible') == true) {
        onVideoClose();
        return;
    }
    if ($('#id_pop_img').is(':visible') == true) {
        onImgClose();
        return;
    }
}

function onImgClose() {
    $('#id_pop_img').fadeOut();
}
function onPdfClose() {
    $('#id_pop_pdf').fadeOut();
}
function onVideoClose() {
    $('#id_pop_video').fadeOut();
    $('#id_pop_video_area').children('video')[0].pause();
}

function onClickBtnLang(_obj) {
    //console.log($(_obj).text());
    setMainLang($(_obj).attr('code'));
}

function setShowLangPopMain() {
    const blurBg1 = document.getElementsByClassName('blur')[0];
    blurBg1.classList.toggle('active');
}

function onClickBtnCloseLang() {
    const blurBg1 = document.getElementsByClassName('blur')[0];
    blurBg1.classList.remove('active');
}
function setLangApply() {
    setMainLang(m_lang_temp);
    onClickBtnCloseLang();
}

function setShowLangPop() {}

function onClickHome(_obj) {
    setMainReset();
}
function onClickBtnBack(_obj) {
    if (m_main_conf.curr_page == -1) {
    } else if (m_main_conf.curr_page == 0) {
        document['frame_refuge'].setBtnBack();
    } else if (m_main_conf.curr_page == 1) {
        document['frame_call'].setBtnBack();
    } else if (m_main_conf.curr_page == 2) {
        document['frame_no_accident'].setBtnBack();
    } else if (m_main_conf.curr_page == 3) {
        if ($('#id_pop_pdf').is(':visible') == true) {
            onPdfClose();
            document['frame_safety_pop'].onPdfClose();
            return;
        }
        if ($('#id_pop_video').is(':visible') == true) {
            onVideoClose();
            document['frame_safety_pop'].onVideoClose();
            return;
        }
        if ($('#id_pop_img').is(':visible') == true) {
            onImgClose();
            document['frame_safety_pop'].onImgClose();
            return;
        }
        document['frame_safety_pop'].setBtnBack();
    }
}

function setMainReset() {
    console.log('setMainReset');
    gsap.to($('#langList'), { opacity: 0, right: '70px', duration: 0.0 });
    $('#langList').hide();
    $('.main-title-wrap').css('opacity', 1);
    $('.screen_main').css('opacity', 1);
    $('.main-gnb').css('opacity', 1);
    $('.main-btn-wrap').css('opacity', 1);
    $('#id_today').css('opacity', 1);
    $('#id_ticker_area').css('opacity', 1);
    $('.main').css('opacity', 1);
    $('#id_gnb_1').hide();
    setHideBtnBack();
    $('.sub_page_main').hide();
    $('.quick_menu').hide();
    $('#id_pop_img').hide();
    $('#id_pop_pdf').hide();
    $('#id_pop_video').hide();
    $('#id_pop_video_area').children('video')[0].pause();
    $('#langBtn').removeClass('active');
    Swal.close();

    const blurBg1 = document.getElementsByClassName('blur')[0];
    blurBg1.classList.remove('active');

    m_lang_click = 0;

    if (m_main_conf.curr_page != -1) {
        m_main_conf.curr_page = -1;
        setScreenAuto();
    }

    $('.gnb-btn-1').removeClass('active');

    setHtitle(0, null);
}

function setContentsApi() {
    var t_url = 'https://beta.msds.svr.kr/api/contentdata';

    $.ajax({
        url: t_url,
        type: 'POST',
        dataType: 'json',
        data: {
            mainIdx: 1,
            subIdx: 1,
        },
        success: function (data) {
            console.log(data);
            m_notice_list = data.data;
            //setWeather(data);
        },
        error: function (xhr, status, error) {
            //setWeather(m_weather_json.data);
            console.error('컨텐츠 에러 발생:', status, error);
        },
    });
}

function setWeatherApi() {
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 날짜
    let rour = today.getHours();
    let min = today.getMinutes();

    var t_url = 'http://100';

    $.ajax({
        url: t_url,
        type: 'GET',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('', '');
        },
        success: function (data) {
            console.log(data);
            setWeather(data);
        },
        error: function (xhr, status, error) {
            setWeather(m_weather_json.data);
            console.error('날씨 에러 발생:', status, error);
        },
    });
}

function setWeather(_json) {
    let today = new Date();
    let rour = today.getHours();
    let t_sky = '';
    let t_url = '/b/images/weather/DB01_B.svg';
    if (_json.sky == '1') {
        //맑음
        if (parseInt(rour) > 18 || parseInt(rour) < 6) {
            t_url = '/b/images/weather/DB01_N_B.svg';
        } else {
            t_url = '/b/images/weather/DB01_B.svg';
        }
        t_sky = '맑음';
    } else if (_json.sky == '2') {
        //구름많음
        if (parseInt(rour) > 18 || parseInt(rour) < 6) {
            t_url = '/b/images/weather/DB03_N_B.svg';
        } else {
            t_url = '/b/images/weather/DB03_B.svg';
        }
        t_sky = '구름많음';
    } else if (_json.sky == '3') {
        //흐림
        t_url = '/b/images/weather/DB04_B.svg';
        t_sky = '흐림';
    } else if (_json.sky == '4') {
        //비
        t_url = '/b/images/weather/DB05_B.svg';
        t_sky = '비';
    } else if (_json.sky == '4') {
        //비/눈
        t_url = '/b/images/weather/DB06_N_B.svg';
        t_sky = '비/눈';
    } else if (_json.sky == '4') {
        //눈
        t_url = '/b/images/weather/DB08_B.svg';
        t_sky = '눈';
    } else if (_json.sky == '4') {
        //소나기
        t_url = '/b/images/weather/DB07_B.svg';
        t_sky = '소나기';
    }
    $('#id_weather_img').attr('src', t_url);
    $('#id_sky').html(t_sky);
    $('#id_tmp').html(_json.temp + '˚');
    $('#id_tmx').html(_json.tempMax + '℃');
    $('#id_tmn').html(_json.tempMin + '℃');
    $('#id_reh').html(_json.humidity + '%');
}

function setDustApi() {
    var requestData = {
        serviceTypeId: 2,
        serviceType: 'INCHEON',
    };

    $.ajax({
        url: 'https://weather.sysmate.net/api/incheon-airport?left_station_id=2&right_station_id=4',
        type: 'GET',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('API-KEY', 'f7f4c68e-e739-42d5-8a70-75c30df7d427');
            xhr.setRequestHeader('accept', 'application/json');
        },
        success: function (data) {
            //console.log(data);
            setDust(data);
        },
        error: function (xhr, status, error) {
            setDust(m_dust_json);
            console.error('에러 발생:', status, error);
        },
    });
}

function setDust(_json) {
    $('#id_lv2').html(getGrade10(_json.data.left_data.pm10));
    $('#id_lv1').html(getGrade25(_json.data.left_data.pm2_5));
}

function getGrade25(_num) {
    if (_num == null || _num == undefined || _num == '') {
        return '-';
    } else {
        let t_num = parseFloat(_num);
        if (t_num < 16) {
            return "<font style='color:#4ba0fe'>좋음";
        } else if (t_num < 51) {
            return "<font style='color:#36c846'>보통";
        } else if (t_num < 101) {
            return "<font style='color:#fd9b5a'>나쁨";
        } else {
            return "<font style='color:#ff5959'>매우나쁨";
        }
    }
}

function getGrade10(_num) {
    if (_num == null || _num == undefined || _num == '') {
        return '-';
    } else {
        let t_num = parseFloat(_num);
        if (t_num < 31) {
            return "<font style='color:#4ba0fe'>좋음";
        } else if (t_num < 81) {
            return "<font style='color:#36c846'>보통";
        } else if (t_num < 151) {
            return "<font style='color:#fd9b5a'>나쁨";
        } else {
            return "<font style='color:#ff5959'>매우나쁨";
        }
    }
}

function setTickerListUp() {
    let str_html = '';
    for (var i = 0; i < m_ticker_list.length; i += 1) {
        //str_html += '<li>' + m_ticker_list[i].title + '</li>';
        str_html += '<li>' + '<span>중요</span> ' + m_ticker_list[i].title + '</li>';
    }
    $('#id_ticker_box_ul').html(str_html);
    if ($('#id_ticker_box').find('li').length > 2) {
        $('#id_ticker_box').easyTicker({
            direction: 'up',
            easing: 'swing',
            speed: 'slow',
            interval: 1000,
            height: '300px',
            visible: 0,
            mousePause: 1,
            controls: {
                up: '',
                down: '',
                toggle: '',
                playText: 'Play',
                stopText: 'Stop',
            },
            // callbacks
            callbacks: {
                before: function (ul, li) {
                    // do something
                },
                after: function (ul, li) {
                    // do something
                },
            },
        });
    }
}

function setHtitle(_num, _array) {
    if (_num == 0) {
        $('#id_h1').show();
        $('#id_h2').show();
        $('#id_h3').hide();
        $('#id_h4').hide();
    } else {
        $('#id_h1').hide();
        $('#id_h2').hide();
        $('#id_h3').show();
        $('#id_h4').show();
    }
    if (_array != null) {
        $('#id_h3').html(_array[0]);
        $('#id_h4').html(_array[1]);
    }
}

function onClickMainPop(_obj) {
    $('.main_btn').removeClass('active');
    setShowFrame('3');
    $('.gnb-btn-1').removeClass('active');
    $('#id_gnb_btn_1_0').addClass('active');
}

function onClickMainMenu(_obj) {
    $('.gnb-btn-1').removeClass('active');
    let t_code = $(_obj).attr('code');
    switch (t_code) {
        case '0':
            $('#id_gnb_btn_1_1').addClass('active');
            setShowFrame(t_code);
            m_lang_click = 0;
            break;
        case '1':
            $('#id_gnb_btn_1_2').addClass('active');
            setShowFrame(t_code);
            m_lang_click = 0;
            break;
        case '2':
            $('#id_gnb_btn_1_3').addClass('active');
            setShowFrame(t_code);
            m_lang_click = 0;
            break;
        case '3':
            $('#id_gnb_btn_1_4').addClass('active');
            setShowLangPopMain();
            break;
    }
}

function onClickMainMenu_1(_obj) {
    console.log('onClickMainMenu', _obj);

    $('.gnb-btn-1').removeClass('active');

    $('#id_pop_img').hide();
    $('#id_pop_pdf').hide();
    $('#id_pop_video').hide();

    let t_code = $(_obj).attr('code');
    switch (t_code) {
        case '0':
            $(_obj).addClass('active');
            setShowFrame(t_code);
            m_lang_click = 0;
            break;
        case '1':
            $(_obj).addClass('active');
            setShowFrame(t_code);
            m_lang_click = 0;
            break;
        case '2':
            $(_obj).addClass('active');
            setShowFrame(t_code);
            m_lang_click = 0;
            break;
        case '3':
            $(_obj).addClass('active');
            setShowLangPop();
            break;
        case '4':
            t_code = '3';
            $(_obj).addClass('active');
            setShowFrame(t_code);
            m_lang_click = 0;
            break;
    }
}

function setShowFrame(_str) {
    if (m_main_conf.curr_page === _str) {
        //return;
    } else {
        m_main_conf.curr_page = _str;
    }
    //$(".screen_main").fadeOut();
    //$(".middle_menu").fadeOut();
    //$(".info_area").fadeOut();

    $('.main-title-wrap').css('opacity', 0);
    $('.screen_main').css('opacity', 0);
    $('.main-gnb').css('opacity', 0);
    $('.main-btn-wrap').css('opacity', 0);
    $('.main').css('opacity', 0);
    $('#id_gnb_1').fadeIn();
    $('.quick_menu').fadeIn();
    $('.sub_page_main').fadeIn();
    switch (_str) {
        case '0':
            setHtitle(1, ['공정명', '피난 안내도']);
            $('#id_main_frame_refuge').fadeIn();
            $('#id_main_frame_call').hide();
            $('#id_main_frame_no_accident').hide();
            $('#id_main_frame_safety_pop').hide();
            document['frame_refuge'].setMainStart();
            setShowBtnBack();
            break;
        case '1':
            setHtitle(1, ['공정명', '비상 전화']);
            $('#id_main_frame_refuge').hide();
            $('#id_main_frame_call').fadeIn();
            $('#id_main_frame_no_accident').hide();
            $('#id_main_frame_safety_pop').hide();
            document['frame_call'].setMainStart();
            setShowBtnBack();
            break;
        case '2':
            setHtitle(1, ['공정명', '사업장 무재해 현황']);
            $('#id_main_frame_refuge').hide();
            $('#id_main_frame_call').hide();
            $('#id_main_frame_no_accident').fadeIn();
            $('#id_main_frame_safety_pop').hide();
            document['frame_no_accident'].setMainStart();
            setShowBtnBack();
            break;
        case '3':
            setHtitle(1, ['공정명', '안전보건 정보 확인하기']);
            $('#id_main_frame_refuge').hide();
            $('#id_main_frame_call').hide();
            $('#id_main_frame_no_accident').hide();
            $('#id_main_frame_safety_pop').fadeIn();
            document['frame_safety_pop'].setMainStart();
            setShowBtnBack();
            break;
    }

    $('#id_pop_video_area').children('video')[0].pause();
    try {
        $('#id_notice_box_01').children('video')[0].pause();
    } catch (err) {}
    try {
        $('#id_notice_box_02').children('video')[0].pause();
    } catch (err) {}
    clearTimeout(setTimeoutID);

    m_lang_click = 0;
}

function setShowBtnBack() {
    $('#id_btn_back').show();
    $('#id_link_home').show();
}

function setHideBtnBack() {
    $('#id_btn_back').hide();
    $('#id_link_home').hide();
}

function onGoToHome() {}

function setScreenAuto() {
    //    console.log("setScreenAuto");
    clearTimeout(setTimeoutID);
    setNoticeDrawInfo();
}

function setNoticeDrawInfo() {
    var str_type = '';
    var str_show = '',
        str_hide = '';

    if (m_notice_list.length == 0) return;

    m_main_conf.curr_cnt++;
    if (m_main_conf.curr_cnt >= m_notice_list.length) m_main_conf.curr_cnt = 0;

    var obj = m_notice_list[m_main_conf.curr_cnt];

    if (m_main_conf.curr_notice == 1) {
        m_main_conf.curr_notice = 2;

        str_show = 'id_notice_box_02';
        str_hide = 'id_notice_box_01';

        $('#id_notice_box_01').css('zIndex', 10);
        $('#id_notice_box_02').css('zIndex', 9);
    } else {
        m_main_conf.curr_notice = 1;

        str_show = 'id_notice_box_01';
        str_hide = 'id_notice_box_02';

        $('#id_notice_box_01').css('zIndex', 10);
        $('#id_notice_box_02').css('zIndex', 9);
    }

    m_main_conf.curr_notice_type = obj.file_type;
    if (obj.file_type == 'image/png') {
        $('#' + str_show + ' > img').attr('src', obj.file_path);
        $('#' + str_show + ' > video').hide();
        $('#' + str_show)
            .children('video')[0]
            .pause();
        $('#' + str_show + ' > img').show();
    } else if (obj.file_type == 'video/mp4') {
        $('#' + str_show + ' > video').attr('src', obj.file_path);
        $('#' + str_show + ' > video').show();
        $('#' + str_show + ' > img').hide();
        $('#' + str_show)
            .children('video')[0]
            .play();
    }

    m_main_conf.notice_ptime = obj.file_duration;
    if (m_main_conf.notice_ptime < 5) m_main_conf.notice_ptime = 5;

    m_main_conf.notice_ptime = m_main_conf.notice_ptime * 1000;

    setTimeoutID = setTimeout(setMainTimeOut, m_main_conf.notice_ptime);
    //$("#" + str_show).children("video")[0].addEventListener("ended", setMainTimeOut);
    setTimeout(setNoticeDrawInfoEnd, 10);
}

function setNoticeDrawInfoEnd() {
    if (m_notice_list.length == 1) {
        if (m_main_conf.curr_notice == 1) {
            $('#id_notice_box_01').show();
            $('#id_notice_box_02').hide();
        } else {
            $('#id_notice_box_01').hide();
            $('#id_notice_box_02').show();
        }
    } else {
        if (m_main_conf.curr_notice == 1) {
            $('#id_notice_box_01').fadeIn();
            $('#id_notice_box_02').fadeOut();
        } else {
            $('#id_notice_box_01').fadeOut();
            $('#id_notice_box_02').fadeIn();
        }
    }
}

function setMainTimeOut() {
    if ($('#id_main_screen_0').css('display') == 'none') {
        return;
    } else {
        setNoticeDrawInfo();
    }
}

function setMainInterval() {
    //
    var time_gap = 0;
    var time_curr = new Date().getTime();

    m_main_conf.debug_count = 0;
    time_gap = time_curr - m_main_conf.time_last;
    time_gap = Math.floor(time_gap / 1000);

    // 인트로 체크
    if (time_gap > 180) {
        m_main_conf.time_last = time_curr;
        setMainLang('KOR');
        setMainReset();
    }

    setDateTime();
}

function setDateTime() {
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

    $('#id_date_zone').html(
        year.toString() + '.' + month.toString().padStart(2, '0') + '.' + date.toString().padStart(2, '0')
    );
    $('#id_time_zone').html(
        //<span><em>PM</em>05:09</span>
        //'<span>' + ampm + '</span>' + hour.toString().padStart(2, '0') + ':' + min.toString().padStart(2, '0')
        '<b>' + hour.toString().padStart(2, '0') + ':' + min.toString().padStart(2, '0') + '<em>' + ampm + '</em>'
    );
}

function onClickItem(_obj) {
    console.log(_obj.file_type);
    if (_obj.file_type == 'application/pdf') {
        m_pdf_url = _obj.file_path;
        setLoadPdf(m_pdf_url);
    } else if (_obj.file_type == 'video/mp4') {
        m_vod_url = _obj.file_path;
        setLoadVideo(m_vod_url, _obj.title);
        $('#id_pop_video').fadeIn();
    } else {
        m_img_url = _obj.file_path;
        setLoadImg(m_img_url);
        $('#id_pop_img').fadeIn();
    }
}

let m_vod_url = '';
function setLoadVideo(_url, _title) {
    $('#id_video_tit').html(_title);
    $('#id_pop_video_area > video').attr('src', _url);
    $('#id_pop_video_area').children('video')[0].play();
}
function setLoadImg(_url, _title) {
    $('#id_image_tit').html(_title);
    $('#id_pop_img_area > img').attr('src', _url);
    /*
    var container = document.getElementById('id_img_container');
    container.innerHTML = '';
    let t_html = '';
    for (let i = 0; i < page_cnt; i += 1) {
        t_html += "<div id='id_result_slide_" + i + "' class='swiper-slide'>";
        t_html += "    <div class='swiper-slide-container'>";
        t_html += "        <ul id='id_result_wrap_" + i + "' class='list_wrap'>";
        t_html += '        </ul>';
        t_html += '    </div>';
        t_html += '</div>';
    }
	
    container.append(t_html);
    */
}
//////////////////////
//----pdf viewer----//
//////////////////////
let m_pdf_url = 'commonfiles/pdfs/temp5.pdf';

var pdfDoc = null,
    pageNum = 0,
    pageRendering = false,
    pageNumPending = null,
    scale = 3,
    canvas = null,
    context = null;

var m_move_conf = {
    drag_status: 0, // 드래그 여부 0 : 선택안함, 1: 선택함
    parent_x: 0,
    parent_w: 0,
    start_left: 0, // 드래그 스타트 X
    end_left: 0,
    orig_left: 0, // 드래그 원래위치 X
};

let m_curr_x = 0;
let m_page_width = 2160;
let m_width = 0;
let m_height = 0;

function onMouseDownList(p_obj, evt) {
    m_move_conf.drag_status = 1;

    //var ret_pos = getPosTransform(document.getElementById("id_pdf_container"));
    var t_translateX = getTranslateXValue(document.getElementById('id_pdf_container'));
    m_move_conf.orig_left = t_translateX;
    //console.log(t_translateX);
    //console.log(m_move_conf.orig_left);
    if (evt.type == 'touchstart') {
        m_move_conf.start_left = evt.targetTouches[0].pageX;
    } else {
        m_move_conf.start_left = evt.pageX;
    }
}

function getTranslateXValue(_obj) {
    var element = _obj;
    var style = window.getComputedStyle(element);
    var transformValue = style.getPropertyValue('transform');

    // transform 속성에서 translateX 값 추출
    var matrix = new DOMMatrixReadOnly(transformValue);
    var translateXValue = matrix.m41; // m41은 X축의 translation 값

    return translateXValue;
}

function onMouseUpList(p_obj, evt) {
    var pos_x = 0;

    if (evt.type == 'touchend') {
        pos_x = evt.changedTouches[0].pageX;
    } else {
        pos_x = evt.pageX;
    }

    pos_x = pos_x - m_move_conf.start_left;

    if (pos_x < -120) {
        setContentsDir('NEXT');
    } else if (pos_x > 120) {
        setContentsDir('PREV');
    } else {
        setContentsDir('CURR');
    }

    m_move_conf.drag_status = 0;
}

function onMouseMoveList(evt) {
    if (m_move_conf.drag_status == 1) {
        var obj = evt.touches;

        if (obj != undefined) {
            pos_x = evt.touches[0].clientX;
        } else {
            pos_x = evt.pageX;
        }

        if (pos_x < m_move_conf.parent_x || pos_x > m_move_conf.parent_w) {
            m_move_conf.drag_status = 0;
            setContentsDir('CURR');
            return;
        }
        pos_x = pos_x - m_move_conf.start_left + m_move_conf.orig_left;
        //console.log(m_move_conf.start_left, m_move_conf.orig_left, pos_x);
        $('#id_pdf_container').css('transform', 'translate(' + pos_x + 'px,0px)');
        m_curr_x = getTranslateXValue(document.getElementById('id_pdf_container'));
    }
}

function setLoadPdf(_url) {
    pageNum = 0;
    m_curr_x = 0;
    m_page_width = 2160;
    m_width = 0;
    m_height = 0;

    var container = document.getElementById('id_pdf_container');
    container.innerHTML = '';
    var url = _url;

    pdfjsLib.GlobalWorkerOptions.workerSrc = '/b/include/js/lib/pdf.worker.js';

    let loadingTask = pdfjsLib.getDocument({
        url: url,
        cMapUrl: '/b/include/js/lib/cmaps/',
        //cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
        enableXfa: true,
        disableFontFace: false,
    });

    loadingTask.promise
        .then(function (pdfDoc_) {
            pdfDoc = pdfDoc_;
            //document.getElementById('page_count').textContent = pdfDoc.numPages;
            for (var i = 1; i <= pdfDoc.numPages; i += 1) {
                var temp_canvas = document.createElement('canvas');
                temp_canvas.setAttribute('id', 'id_canvas_' + i);
                temp_canvas.setAttribute('class', 'swiper-slide');
                //temp_canvas.setAttribute('class', 'pdf_canvas'); // 각 캔버스에 클래스 부여
                // temp_canvas.style.position = 'absolute';
                // temp_canvas.style.zIndex = '999';
                //console.log(temp_canvas.width, temp_canvas.height);
                container.appendChild(temp_canvas);
                renderPage(i);
            }
            refreshPageNum();
            $('#id_pop_pdf').fadeIn();
        })
        .catch(function (error) {
            // PDF를 불러오는데 실패한 경우
            console.error('PDF 로드 에러:', error);

            Swal.fire({
                icon: 'error',
                title: '파일을 찾을 수 없습니다.',
                customClass: {
                    popup: 'alert',
                },
            });
            //alert('PDF를 불러오는 데 문제가 발생했습니다.');
            // 에러 처리를 위한 작업을 추가하세요.
            // 예를 들어, 사용자에게 알림창을 띄우거나 기본적인 페이지를 표시할 수 있습니다.
        });
    m_pdf_swiper.slideTo(0); // 첫 번째 슬라이드로 이동
    setTimeout(setSwiperReset,500);
    //$('#id_pdf_container').css('transform', 'translate(' + m_curr_x + 'px,0px)');

    //container.style.top = 200 + (2300 - numericHeight) / 2;
}
function setSwiperReset(_swiper){
    m_pdf_swiper.update(); // 스와이퍼 업데이트
}

function refreshPageNum() {
    let f_num = 0;
    if (m_pdf_swiper != undefined) {
        f_num = m_pdf_swiper.activeIndex;
    }
    $('#id_pdf_num').html('[' + (f_num + 1) + '/' + pdfDoc.numPages + ']');
}

function renderPage(num) {
    var canvas = document.getElementById('id_canvas_' + num);
    var container = document.getElementById('id_pdf_container');
    var t_view_width = 1600;
    var t_view_height = 2260;
    var context = canvas.getContext('2d');
    pdfDoc
        .getPage(num)
        .then(function (page) {
            var viewport = page.getViewport({
                scale: 1,
            });
            var t_scale = t_view_width / viewport.width;
            if (canvas.height > t_view_height) {
                t_scale = t_scale * (t_view_height / canvas.height);
            }
            viewport = page.getViewport({
                scale: t_scale,
            });
            // console.log(t_scale);
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            canvas.style.top = (t_view_height - canvas.height) / 2 + 20 + 'px';
            canvas.style.left = (t_view_width - canvas.width) / 2 + 10 + 'px';
            canvas.style.width = t_view_width + 'px';

            var renderContext = {
                canvasContext: context,
                viewport: viewport,
            };
            page.render(renderContext);
        })
        .catch(function (error) {
            console.error('페이지 렌더링 오류:', error);
        });
}

function queueRenderPage(num) {
    console.log(pageRendering);
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

function onPrevPage() {
    setContentsDir('PREV');
}

function onNextPage() {
    setContentsDir('NEXT');
}

function getPosTransform(p_obj) {
    var i = 0;
    var ret_obj = {
        left: 0,
        top: 0,
        scale: 1,
        rotate: 0,
    };
    var str_tmp = '';
    var arr_tmp = [];
    var arr_match = [];

    var str_trans = p_obj.style.transform;
    var regex = /(\w+)\((.+?)\)/g;
    var p1 = /px/gi;
    var p2 = /deg/gi;

    while ((arr_match = regex.exec(str_trans))) {
        if (arr_match.length == 3) {
            if (arr_match[1] == 'translate') {
                arr_tmp = arr_match[2].split(',');
                if (arr_tmp.length == 2) {
                    str_tmp = arr_tmp[0].replace(p1, '');
                    ret_obj.left = parseFloat(str_tmp);
                    console.log(str_tmp);
                    str_tmp = arr_tmp[1].replace(p1, '');
                    ret_obj.top = parseFloat(str_tmp);
                }
            }
        }
        i++;
        if (i >= 10) break;
    }

    return ret_obj;
}

function setContentsDir(p_dir) {
    //console.log('setContentsDir', p_dir);
    if (p_dir == 'NEXT') {
        if (pageNum >= pdfDoc.numPages - 1) {
            pageNum = pdfDoc.numPages - 1;
        } else {
            pageNum++;
        }
    } else if (p_dir == 'PREV') {
        if (pageNum < 1) {
            pageNum = 0;
        } else {
            pageNum--;
        }
    } else if (p_dir == 'HOME') {
        pageNum = 0;
    } else if (p_dir == 'CURR') {
    }
    m_curr_x = getTranslateXValue(document.getElementById('id_pdf_container'));
    //$("#id_pdf_container").css("transform", 'translate(' + (-pageNum * m_page_width) + 'px,0px)');

    //$("#id_pdf_container").css("transform", "translate(" + -pageNum * m_page_width + "px,0px)");

    /*
    gsap.to("#id_pdf_container", {
        duration: 0.5,
        x: -pageNum * m_page_width
    });
    */
    animateElement();
}

function animateElement() {
    const element = document.getElementById('id_pdf_container');
    const startPosition = m_curr_x; /* 현재 위치 */
    const targetPosition = -pageNum * m_page_width;
    const duration = 250; // 애니메이션 지속 시간
    const startTime = performance.now();

    function updatePosition(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // 애니메이션 진행률
        const newPosition = startPosition + (targetPosition - startPosition) * progress;

        element.style.transform = `translateX(${newPosition}px)`;

        if (progress < 1) {
            requestAnimationFrame(updatePosition);
        }
    }

    requestAnimationFrame(updatePosition);
}

function searchInDocument(pageNum, query) {
    pdfDoc.getPage(pageNum).then(function (page) {
        page.getTextContent().then(function (textContent) {
            textContent.items.forEach(function (textItem) {
                if (textItem.str.includes(query)) {
                    // 검색된 문자열 처리
                    console.log('검색된 문자열:', textItem.str);
                }
            });
        });
    });
}

//setTimeout(searchInDocument, 1000, 1, '물질');

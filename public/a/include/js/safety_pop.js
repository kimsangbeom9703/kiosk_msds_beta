let m_main_conf = {
    lang: 'KOR',
    name: 'safety_pop',
    curr_cnt: 0,
    curr_screen: 1,
    screen_ptime: 0,
    screen_last: 0,
    style_cnt: 0,
    curr_page: -1,
    shift: false,
};

let galleryTop;
let searchBox0;
let searchResult;
let contentsList;

let charlist = [];
let text = '';
let text_input = null;

let m_temp_list = [];

let m_often_result_list = [];
let m_search_result_list = [
    {
        desc: null,
        file_duration: null,
        file_path: '/uploads/msds/reference/1700804015_a32ee35170680467f199.pdf',
        file_type: 'application/pdf',
        org_file_name: 'A_SingleMsds.pdf',
        sort: '1',
        title: '1',
    },
];

let m_search_contents_list = [
    {
        desc: null,
        file_duration: null,
        file_path: '/uploads/msds/video/1700804089_7ea0c4a3273b6c404ce7.mp4',
        file_type: 'video/mp4',
        org_file_name: 'TV_CAM_20160404_kbs.mp4',
        sort: '1',
        title: '1',
    },
];

function setInit() {
    console.log(m_main_conf.name, 'setInit');
    new WOW().init();

    searchBox0 = new Swiper('.search_box_0', {
        spaceBetween: 100, //슬라이드 간격
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {},
        on: {
            slideChange: function () {
                //var currentPage = searchBox0.realIndex + 1; // 현재 페이지 번호 계산
                //setPagenation(currentPage);
            },
            init: function () {
                //setPagenation(1);
                //galleryTop.slideTo(2);
            },
        },
    });

    searchResult = new Swiper('.search_result', {
        spaceBetween: 100, //슬라이드 간격
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {},
        on: {
            slideChange: function () {
                //var currentPage = searchBox0.realIndex + 1; // 현재 페이지 번호 계산
                //setPagenation(currentPage);
            },
            init: function () {
                //setPagenation(1);
                //galleryTop.slideTo(2);
            },
        },
    });

    contentsList = new Swiper('.picture-list', {
        spaceBetween: 100, //슬라이드 간격
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {},
        on: {
            slideChange: function () {},
            init: function () {},
        },
    });

    $('#id_search_textbox').focusin(function () {
        onFocusInSerchBox(this);
    });

    //document["frame_keyboard"].setInitSetting($("#id_search_textbox"));

    text_input = $('#id_search_textbox');

    $('.btn_back').mousedown(function () {
        //onClickBtnBack(this);
    });

    $('.item').mousedown(function () {
        onClickBtnMenu(this);
    });

    $('.btn_key_real').click(function () {
        onClickKeyCode(this);
    });
    $('.btn_key_shift').click(function () {
        onClickKeyCode(this);
    });
    $('.btn_key_back').click(function () {
        onClickKeyCode(this);
    });
    $('.btn_key_han').click(function () {
        onClickKeyCode(this);
    });
    $('.btn_key_space').click(function () {
        onClickKeyCode(this);
    });
    $('#id_keyboard_bg').click(function () {
        onClickKeyboardArea(this);
    });
    $('#id_search_icon').click(function () {
        setSearchKeyword();
    });
}

function setContentsApi(_n0, _n1) {
    var t_url = 'https://beta.msds.svr.kr/api/contentdata';

    $.ajax({
        url: t_url,
        type: 'POST',
        dataType: 'json',
        data: {
            mainIdx: _n0,
            subIdx: _n1,
        },
        success: function (data) {
            console.log(data);
            m_temp_list = data.data;
            if (_n0 == 2 && _n1 == 2) {
                //물질안전 보건자료
                setSearchBox0();
            } else if (_n0 == 2 && _n1 == 3) {
                //작업공정별 관리요령 검색
                setOftenList();
            } else if (_n0 == 2 && _n1 == 47) {
                //공정 개요
                setContentsList();
            } else if (_n0 == 2 && _n1 == 5) {
                //안전보건 수칙
                setContentsList();
            } else if (_n0 == 2 && _n1 == 6) {
                //안전 동영상
                setContentsList();
            } else if (_n0 == 2 && _n1 == 7) {
                //응급처치요령
                setContentsList();
            } else if (_n0 == 2 && _n1 == 8) {
                //보호구 사용법
                setContentsList();
            } else if (_n0 == 2 && _n1 == 9) {
                //안전장비 자가진단
                setContentsList();
            }
        },
        error: function (xhr, status, error) {
            console.error('자료 컨텐츠 에러 발생:', status, error);
        },
    });
}

function onClickKeyboardArea(_obj) {
    $('#id_keyboard_area').fadeOut();
}

function setSearchKeyword() {
    let t_keyword = text_input.val();

    if (t_keyword == '') {
        Swal.fire({
            icon: 'error',
            title: '검색어를 입력해주세요.',
            customClass: {
                popup: 'alert',
            },
        });
        return;
    }

    $('#id_search_result_wrapper').html('');
    $('#id_search_box_1').hide();
    $('#id_keyboard_area').fadeOut();
    $('#id_search_result_page').fadeIn();
    $('#id_search_result_box').html('<span>“' + t_keyword + '”</span>의 검색결과 입니다.');

    let t_html = '';
    let r_html = '';
    let page_cnt = Math.floor(m_search_result_list.length / 11) + 1;
    for (let i = 0; i < page_cnt; i += 1) {
        t_html += "<div id='id_result_slide_" + i + "' class='swiper-slide'>";
        t_html += "    <div class='swiper-slide-container'>";
        t_html += "        <ul id='id_result_wrap_" + i + "' class='list_wrap'>";
        t_html += '        </ul>';
        t_html += '    </div>';
        t_html += '</div>';
    }
    $('#id_search_result_wrapper').append(t_html);

    for (let i = 0; i < m_search_result_list.length; i += 1) {
        let t_id = Math.floor(i / 11);

        r_html = '<li>';
        r_html += ' <a>';
        r_html +=
            "     <div class='info'><span>" +
            convStr(m_search_result_list[i].title) +
            '</span>' +
            convStr(m_search_result_list[i].desc) +
            '</div>';
        r_html += "     <div class='btn' onClick='javascript:onClickItem(" + i + ");'>보기</div>";
        r_html += ' </a>';
        r_html += '</li>';

        $('#id_result_wrap_' + t_id).append(r_html);
    }

    $('#id_search_result_wrapper').css({
        transform: 'translate3d(0px, 0px, 0px)',
    });
    searchResult.update(); // 스와이퍼 업데이트
    searchResult.slideTo(0); // 첫 번째 슬라이드로 이동
}

function setContentsList() {
    m_search_contents_list = m_temp_list;
    $('#id_contents_list_wrapper').html('');
    let t_html = '';
    let r_html = '';
    let page_cnt = Math.floor(m_search_contents_list.length / 9) + 1;
    for (let i = 0; i < page_cnt; i += 1) {
        t_html += "<div id='id_contents_list_slide_" + i + "' class='swiper-slide'>";
        t_html += "    <ul id='id_contents_list_wrap_" + i + "' class='swiper-slide-container'>";
        t_html += '    </ul>';
        t_html += '</div>';
    }
    $('#id_contents_list_wrapper').append(t_html);

    for (let i = 0; i < m_search_contents_list.length; i += 1) {
        let t_id = Math.floor(i / 9);
        r_html =
            "<li class='wow animate__bounceIn' data-wow-duration='0.5s' onClick='javascript:onClickContents(" +
            i +
            ");'>";
        r_html += "     <div class='list-img'>";
        if (m_search_contents_list[i].file_type == 'video/mp4') {
            r_html +=
                '          <img id="id_img_' +
                i +
                '" src="' +
                getVideoThum(m_search_contents_list[i].file_path, i) +
                '"/>';
        } else {
            //r_html += '          <img id="id_img_' + i + '" src="' + m_search_contents_list[i].thumnail + '"/>';
            r_html += '          <img id="id_img_' + i + '" src="' + '/a/images/test/img_picture.png' + '"/>';
        }
        if (m_search_contents_list[i].file_type == 'video/mp4') {
            r_html += '          <em class="ico_play"></em>';
        }
        r_html += '      </div>';
        r_html += '      <p class="tit">' + convStr(m_search_contents_list[i].title) + '</p>';
        r_html += '</li>';

        $('#id_contents_list_wrap_' + t_id).append(r_html);
    }

    contentsList.update(); // 스와이퍼 업데이트
    contentsList.slideTo(0); // 첫 번째 슬라이드로 이동
}

function getVideoThum(_url, _i) {
    var video = document.createElement('video');
    var thumbnail = new Image();
    video.src = _url;
    //video.src = 'commonfiles/mov01.mp4';
    video.muted = true;
    video.preload = 'metadata'; //이게 auto여야지 canvas에서 이미지를 그릴 수 있습니다
    //video.style.display = 'none'; // 비디오를 화면에 보이지 않도록 설정
    console.log(_url);
    var hasCapturedThumbnail = 0; // 섬네일을 캡처했는지 확인하기 위한 플래그

    // 비디오가 로드되었을 때 이벤트 리스너 추가
    video.addEventListener('canplay', function () {
        if (hasCapturedThumbnail<5) {
            hasCapturedThumbnail += 1; // 플래그를 true로 설정하여 중복 실행을 막음
           
            // 비디오 시간을 가져와 섬네일로 사용할 시간(예: 5초) 설정
            video.currentTime = 3;
            video.width = 960; // 비디오의 가로 길이를 지정해줘야 캔버스에 그려집니다.
            video.height = 540; // 비디오의 세로 길이를 지정해줘야 캔버스에 그려집니다.

            // 캔버스 생성하고 현재 프레임을 캡처하여 섬네일로 표시
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            canvas.width = video.width;
            canvas.height = video.height;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            console.log(video.width, video.height);

            // 섬네일을 이미지로 변환하여 화면에 추가
            thumbnail.src = canvas.toDataURL('image/jpeg');

            // 비디오 요소 제거 (메모리 해제)
            video.remove();

            // 콜백 함수를 사용하여 섬네일 URL을 전달
            console.log(thumbnail.src);
            $('#id_img_' + _i).attr('src', thumbnail.src);
        }
    });
}


function setMainLang(_lang) {}

function setMainStart() {
    m_main_conf.curr_page = -1;
    $('#id_security_list').show();
    $('#id_search_box_0').hide();
    $('#id_search_box_1').hide();
    $('#id_search_result_page').hide();
    $('#id_contents_list').hide();
    $('#id_keyboard_area').hide();
    setReset();
    Swal.close();
}

function setBtnBack() {
    if ($('#id_search_box_0').is(':visible') == true) {
        $('#id_security_list').fadeIn();
        $('#id_search_box_0').hide();
        $('#id_sub_desc').html('# 공정명 노출 안전보건 정보입니다.');
    } else if ($('#id_search_box_1').is(':visible') == true) {
        if ($('#id_keyboard_area').is(':visible') == true) {
            setHideKeyboard();
        } else {
            $('#id_security_list').fadeIn();
            $('#id_search_box_1').hide();
        $('#id_sub_desc').html('# 공정명 노출 안전보건 정보입니다.');
        }
    } else if ($('#id_search_result_page').is(':visible') == true) {
        $('#id_search_box_1').fadeIn();
        $('#id_search_result_page').hide();
        setReset();
    } else if ($('#id_contents_list').is(':visible') == true) {
        $('#id_security_list').fadeIn();
        $('#id_contents_list').hide();
        $('#id_sub_desc').html('# 공정명 노출 안전보건 정보입니다.');
        setReset();
    } else {
        window.parent.setMainReset();
    }
}

function setSearchBox0() {
    m_search_result_list = m_temp_list;
    $('#id_search_box_0_wrapper').html('');
    let t_html = '';
    let r_html = '';
    let page_cnt = Math.floor(m_search_result_list.length / 8) + 1;
    for (let i = 0; i < page_cnt; i += 1) {
        t_html += "<div id='id_search_0_slide_" + i + "' class='swiper-slide'>";
        t_html += "    <ul id='id_search_0_wrap_" + i + "' class='swiper-slide-container'>";
        t_html += '    </ul>';
        t_html += '</div>';
    }
    $('#id_search_box_0_wrapper').append(t_html);

    for (let i = 0; i < m_search_result_list.length; i += 1) {
        let t_id = Math.floor(i / 8);
        r_html =
            "<li class='wow animate__bounceIn' data-wow-duration='0.5s' onClick='javascript:onClickItem(" + i + ");'>";
        r_html += ' <a>';
        r_html += "     <div class='inner'>";
        r_html += "         <div class='img'>";
        //r_html += "             <img src='" + m_search_result_list[i].thumnail + "'>";
        r_html += "             <img src='" + '/a/images/test/img_picture.png' + "'>";
        r_html += '         </div>';
        r_html += "         <div class='txt'>";
        r_html +=
            '             <p><span>' +
            convStr(m_search_result_list[i].title) +
            '</span>' +
            convStr(m_search_result_list[i].desc) +
            '</p>';
        r_html += '          </div>';
        r_html += '      </div>';
        r_html += ' </a>';
        r_html += '</li>';

        $('#id_search_0_wrap_' + t_id).append(r_html);
    }
    searchBox0.update(); // 스와이퍼 업데이트
    searchBox0.slideTo(0);
}

function convStr(_str) {
    if (_str.length > 45) {
        return _str.substring(0, 42) + '...'; // 27은 30글자에서 ...을 고려하여 빼준 값입니다.
    } else {
        return _str;
    }
}
function setOftenList() {
    m_often_result_list = m_temp_list;
    $('#id_con_daga_list_2_container').html('');
    let t_html = '';

    for (let i = 0; i < m_often_result_list.length; i += 1) {
        if (i < 6) {
            //console.log(i);
            t_html = '<li>';
            t_html += ' <a>';
            t_html +=
                "     <div class='inner wow animate__bounceIn' data-wow-duration='0.5s' onClick='javascript:onClickOftenItem(" +
                i +
                ");'>";
            t_html += "         <div class='img'>";
            //t_html += "             <img src='" + m_often_result_list[i].thumnail + "'>";
            t_html += "             <img src='" + '/a/images/test/img_picture.png' + "'>";
            t_html += '         </div>';
            t_html += "         <div class='txt'>";
            t_html +=
                '             <p><span>' +
                convStr(m_search_result_list[i].title) +
                '</span>' +
                convStr(m_search_result_list[i].desc) +
                '</p>';
            t_html += '          </div>';
            t_html += '      </div>';
            t_html += ' </a>';
            t_html += '</li>';

            $('#id_con_daga_list_2_container').append(t_html);
        }
    }
}

function onClickOftenItem(_num) {
    let _obj = m_search_result_list[_num];
    parent.onClickItem(_obj);
}

function onClickContents(_num) {
    let _obj = m_search_contents_list[_num];
    parent.onClickItem(_obj);
}

function onClickItem(_num) {
    let _obj = m_search_result_list[_num];
    parent.onClickItem(_obj);
}

function onClickBtnMenu(_obj) {
    let t_code = $(_obj).attr('code');
    m_main_conf.curr_page = parseInt(t_code);
    //console.log(t_code);
    switch (t_code) {
        case '0': //물질 안전 보건 자료 검색
            $('#id_sub_desc').html('# 물질 안전 보건 자료 정보입니다.');
            $('#id_security_list').hide();
            setContentsApi(2, 2);
            //setSearchBox0();
            $('#id_search_box_0').fadeIn();
            searchBox0.update(); // 스와이퍼 업데이트
            searchBox0.slideTo(0);
            break;
        case '1': //작업 공정별 관리요령 검색
            $('#id_sub_desc').html('# 작업 공정별 관리요령 정보입니다.');
            $('#id_security_list').hide();
            setContentsApi(2, 3);
            //setOftenList();
            $('#id_search_box_1').fadeIn();
            break;
        case '2': //공정 개요
            $('#id_sub_desc').html('# 공정 개요입니다.');
            $('#id_security_list').hide();
            setContentsApi(2, 47);
            //setContentsList();
            $('#id_contents_list').fadeIn();
            break;
        case '3': //안전보건수칙
            $('#id_sub_desc').html('# 안전보건수칙입니다.');
            $('#id_security_list').hide();
            setContentsApi(2, 5);
            //setContentsList();
            $('#id_contents_list').fadeIn();
            break;
        case '4': //안전동영상
            $('#id_sub_desc').html('# 안전 동영상입니다.');
            $('#id_security_list').hide();
            setContentsApi(2, 6);
            //setContentsList();
            $('#id_contents_list').fadeIn();
            break;
        case '5': //응급처치요령
            $('#id_sub_desc').html('# 응급 처치 요령입니다.');
            $('#id_security_list').hide();
            setContentsApi(2, 7);
            //setContentsList();
            $('#id_contents_list').fadeIn();
            break;
        case '6': //보호구 사용법
            $('#id_sub_desc').html('# 보호구 사용법입니다.');
            $('#id_security_list').hide();
            setContentsApi(2, 8);
            //setContentsList();
            $('#id_contents_list').fadeIn();
            break;
        case '7': //안전장비 자가진단
            $('#id_sub_desc').html('# 안전장비 자가진단입니다.');
            $('#id_security_list').hide();
            setContentsApi(2, 9);
            //setContentsList();
            $('#id_contents_list').fadeIn();
            break;
    }
}

// function onClickBtnBack(_obj) {
//     console.log(m_main_conf.curr_page);
//     switch (m_main_conf.curr_page) {
//         case -1:
//             window.parent.setMainReset();
//             break;
//         case 0:
//             m_main_conf.curr_page = -1;
//             $('#id_security_list').fadeIn();
//             $('#id_search_box_0').hide();
//             break;
//         case 1:
//             m_main_conf.curr_page = -1;
//             $('#id_security_list').fadeIn();
//             $('#id_search_box_1').hide();
//             break;
//         case 2:
//             break;
//         case 3:
//             break;
//         case 4:
//             m_main_conf.curr_page = -1;
//             $('#id_security_list').fadeIn();
//             $('#id_contents_list').hide();
//             break;
//         case 5:
//             break;
//         case 6:
//             break;
//         case 7:
//             break;
//     }
// }

function onFocusInSerchBox(_obj) {
    setShowKeyboard();
}

function setHideKeyboard() {
    $('#id_keyboard_area').fadeOut();
    $('#id_keyboard').fadeOut();
}

function setShowKeyboard() {
    //document["frame_keyboard"].setReset();
    $('#id_keyboard_area').show();
    $('#id_keyboard').show();
}

function setPagenation(_num) {
    let t_num = _num - 1;
    let t_list = $('.swiper-pagination-bullet');
    let t_num2 = Math.floor(t_num / 5) + 1;

    for (var i = 0; i < t_list.length; i += 1) {
        let t_num3 = parseInt($(t_list[i]).text());
        if (t_num3 > t_num2 * 5 || t_num3 <= (t_num2 - 1) * 5) {
            $(t_list[i]).css('display', 'none');
        } else {
            $(t_list[i]).css('display', '');
        }
    }
}

function getText() {
    return Hangul.assemble(charlist);
}

function setText() {
    if (text_input != null) {
        text_input.val(Hangul.assemble(charlist));
    }
}

function setReset() {
    charlist = [];
    if (text_input != null) {
        text_input.val(charlist);
    }
}

function setResetKey() {
    m_main_conf.shift = false;
    $('.btn_key_shift .center_txt').removeClass('active');
    setShiftKey();
}

function onClickKeyCode(p_obj) {
    var nor_or_shi = '0';
    var set_key_code = '';
    var key_code = $(p_obj).attr('key_code');

    if (key_code == 'HAN') {
        setResetKey();
        m_main_conf.shift = false;
        if (m_main_conf.lang == 'KOR') {
            m_main_conf.lang = 'ENG';
            for (i = 1; i <= 3; i++) {
                $('#id_key_list_eng0' + i + ' .btn_key_real').each(function (i_num) {
                    str_attr = $('#id_key_list_eng0' + i + ' .btn_key_real')
                        .eq(i_num)
                        .attr('key_code');
                    $('#id_key_list_eng0' + i + ' .btn_key_real')
                        .eq(i_num)
                        .find('span')
                        .html(str_attr);
                });
            }
        } else {
            m_main_conf.lang = 'KOR';
            for (i = 1; i <= 3; i++) {
                $('#id_key_list_eng0' + i + ' .btn_key_real').each(function (i_num) {
                    str_attr = $('#id_key_list_eng0' + i + ' .btn_key_real')
                        .eq(i_num)
                        .attr('key_code_k');
                    $('#id_key_list_eng0' + i + ' .btn_key_real')
                        .eq(i_num)
                        .find('span')
                        .html(str_attr);
                });
            }
        }
    } else if (key_code == ' ') {
        charlist.push(key_code);
        setText();
    } else if (key_code == 'SHIFT') {
        if (m_main_conf.shift == false) {
            m_main_conf.shift = true;
            $('.btn_key_shift .center_txt').addClass('active');
        } else {
            m_main_conf.shift = false;
            $('.btn_key_shift .center_txt').removeClass('active');
        }
        setShiftKey();
    } else if (key_code == 'BACK') {
        charlist.splice(charlist.length - 1, 1);
        setText();
    } else if (key_code == 'ENTER') {
        setSearchKeyword();
    } else if (key_code == 'HOME') {
        charlist = [];
        text_input.val(charlist);
        window.parent.setHideKeyboard();

        /*
        charlist = [];
        setText();
        m_main_conf.shift = false;
        $(".btn_key_shift .center_txt").removeClass("active");
        setShiftKey();
        */
    } else {
        if (m_main_conf.shift == false) {
            nor_or_shi = '0';
            if (m_main_conf.lang == 'KOR') {
                set_key_code = $(p_obj).attr('key_code_k');
            } else {
                set_key_code = $(p_obj).attr('key_code');
            }

            set_key_code = $(p_obj).find('span').html();
            charlist.push(set_key_code);
            setText();
        } else {
            nor_or_shi = '1';
            if (m_main_conf.lang == 'KOR') {
                set_key_code = $(p_obj).attr('key_code_k');
            } else {
                set_key_code = $(p_obj).attr('key_code');
            }

            set_key_code = $(p_obj).find('span').html();
            charlist.push(set_key_code);
            setText();
        }
    }
}

function getKeyHangulShift(p_code) {
    var str_code = '';
    if (p_code == 'ㅂ') {
        str_code = 'ㅃ';
    } else if (p_code == 'ㅈ') {
        str_code = 'ㅉ';
    } else if (p_code == 'ㄷ') {
        str_code = 'ㄸ';
    } else if (p_code == 'ㄱ') {
        str_code = 'ㄲ';
    } else if (p_code == 'ㅅ') {
        str_code = 'ㅆ';
    } else if (p_code == 'ㅐ') {
        str_code = 'ㅒ';
    } else if (p_code == 'ㅔ') {
        str_code = 'ㅖ';
    } else {
        str_code = p_code;
    }
    return str_code;
}

function setShiftKey() {
    var i = 0;
    var str_attr = '',
        str_han = '';
    var obj_list;

    if (m_main_conf.shift == false) {
        if (m_main_conf.lang == 'KOR') {
            for (i = 1; i <= 3; i++) {
                $('#id_key_list_eng0' + i + ' .btn_key_real').each(function (i_num) {
                    str_attr = $('#id_key_list_eng0' + i + ' .btn_key_real')
                        .eq(i_num)
                        .attr('key_code_k');
                    $('#id_key_list_eng0' + i + ' .btn_key_real')
                        .eq(i_num)
                        .find('span')
                        .html(str_attr);
                });
            }
        } else {
            for (i = 1; i <= 3; i++) {
                $('#id_key_list_eng0' + i + ' .btn_key_real').each(function (i_num) {
                    str_attr = $('#id_key_list_eng0' + i + ' .btn_key_real')
                        .eq(i_num)
                        .attr('key_code');
                    str_attr = str_attr.toLowerCase();
                    $('#id_key_list_eng0' + i + ' .btn_key_real')
                        .eq(i_num)
                        .find('span')
                        .html(str_attr);
                });
            }
        }
    } else {
        if (m_main_conf.lang == 'KOR') {
            for (i = 1; i <= 3; i++) {
                $('#id_key_list_eng0' + i + ' .btn_key_real').each(function (i_num) {
                    str_attr = $('#id_key_list_eng0' + i + ' .btn_key_real')
                        .eq(i_num)
                        .attr('key_code_k');
                    str_han = getKeyHangulShift(str_attr);
                    $('#id_key_list_eng0' + i + ' .btn_key_real')
                        .eq(i_num)
                        .find('span')
                        .html(str_han);
                });
            }
        } else {
            for (i = 1; i <= 3; i++) {
                $('#id_key_list_eng0' + i + ' .btn_key_real').each(function (i_num) {
                    str_attr = $('#id_key_list_eng0' + i + ' .btn_key_real')
                        .eq(i_num)
                        .attr('key_code');
                    str_attr = str_attr.toUpperCase();
                    $('#id_key_list_eng0' + i + ' .btn_key_real')
                        .eq(i_num)
                        .find('span')
                        .html(str_attr);
                });
            }
        }
    }
}

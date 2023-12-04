

function setLoadLanguage(p_url){
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState != 4){
            return;
        }
        //데이터가 확실하게 들어왔을 때 데이터 바인딩 시작
        if(xhr.status == 200) {

            var xml_doc = JSON.parse(this.response);
            if(typeof gl_jsop_lang_data !== 'undefined'){
                console.log("setLoadLanguage OK");
                var json_obj = xml_doc;

                if( typeof(setInitSettingLang) == 'function'){
                    setInitSettingLang(json_obj);
                }
            }
        }else{
            console.log("fail");
        }
    }
    xhr.open("GET", p_url,true);
    xhr.send();
}
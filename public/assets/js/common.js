$(document).ready(function () {
    const fileTarget = $('#contentsFile');
    fileTarget.on('change', function () {
        let filename;
        if (window.FileReader) {
            filename = $(this)[0].files[0].name;
        } else {
            filename = $(this).val().split('/').pop().split('\\').pop();
        }
        const changeFiles = $(this)[0].files[0];
        const changoUrl = URL.createObjectURL(changeFiles);
        if (changeFiles.type == 'video/mp4') {
            $('#preview_box').html(`
                <video id="preview" width="1100" height="600" style="max-width: 100%;" controls autoplay>
                    <source src="${changoUrl}" type="${changeFiles.type}">
                </video>
            `)
        } else if (changeFiles.type == 'application/pdf') {
            $('#preview_box').html(`
               <div id="preview" class="pdf_container sub_con"></div>
            `)
            doc_open('preview', `${changoUrl}`)
        } else {
            $('#preview_box').html(`
                <img id="preview" width="1100" height="600" style="max-width: 100%;" src="${changoUrl}">
            `)
        }
        $('#custom-file-label').html(filename);
    });
    $('select[name=sub_list_sort]').change(function () {
        const sort_val = $(this).val();
        const content_idx = $(this).attr('data-idx');
        const url = '/admin/api/list_sorting'

        const post_array = {
            sort_val   : sort_val,
            content_idx: content_idx,
        };
        Swal.fire({
            title              : '컨텐츠 순서를 변경하시겠습니까?',
            icon               : 'warning',
            showCancelButton   : true,
            confirmButtonColor : '#3085d6',
            cancelButtonColor  : '#d33',
            confirmButtonText  : '확인',
            cancelButtonText   : '취소',
            showLoaderOnConfirm: true,
            preConfirm         : (data) => {
                return fetch(url, {
                    method: 'PUT',
                    body  : JSON.stringify(post_array),
                })
                    .then(response => {
                        console.log(response)
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick  : () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value.status == 'success') {
                    Swal.fire({
                        position         : 'top-end',
                        icon             : 'success',
                        title            : '성공하였습니다.',
                        showConfirmButton: false,
                        timer            : 1000,
                        onClose          : () => {
                            location.reload();
                        }
                    })
                } else {
                    Swal.fire({
                        position         : 'top-end',
                        icon             : 'error',
                        title            : '실패되었습니다',
                        showConfirmButton: false,
                        timer            : 1000,
                        onClose          : () => {
                            location.reload();
                        }
                    })
                }
            }
        });
    });
    $('select[name=main_list_sort]').change(function () {
        const sort_val = $(this).val();
        const content_idx = $(this).attr('data-idx');
        const url = '/admin/api/main_list_sorting'

        const post_array = {
            sort_val   : sort_val,
            content_idx: content_idx,
        };
        Swal.fire({
            title              : '컨텐츠 순서를 변경하시겠습니까?',
            icon               : 'warning',
            showCancelButton   : true,
            confirmButtonColor : '#3085d6',
            cancelButtonColor  : '#d33',
            confirmButtonText  : '확인',
            cancelButtonText   : '취소',
            showLoaderOnConfirm: true,
            preConfirm         : (data) => {
                return fetch(url, {
                    method: 'PUT',
                    body  : JSON.stringify(post_array),
                })
                    .then(response => {
                        console.log(response)
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick  : () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value.status == 'success') {
                    Swal.fire({
                        position         : 'top-end',
                        icon             : 'success',
                        title            : '성공하였습니다.',
                        showConfirmButton: false,
                        timer            : 1000,
                        onClose          : () => {
                            location.reload();
                        }
                    })
                } else {
                    Swal.fire({
                        position         : 'top-end',
                        icon             : 'error',
                        title            : '실패되었습니다',
                        showConfirmButton: false,
                        timer            : 1000,
                        onClose          : () => {
                            location.reload();
                        }
                    })
                }
            }
        });
    });
    $('.custom-control-input').on('change', function () {
        const isChecked = $(this).is(':checked');
        console.log(document.cookie)
        const id = $(this).data('id');
        const url = '/admin/api/used_update'
        const post_array = {
            'id'  : id,
            'used': isChecked,
        }
        console.log(post_array)
        Swal.fire({
            title              : '상태를 변경하시겠습니까??',
            icon               : 'warning',
            showCancelButton   : true,
            confirmButtonColor : '#3085d6',
            cancelButtonColor  : '#d33',
            confirmButtonText  : '확인',
            cancelButtonText   : '취소',
            showLoaderOnConfirm: true,
            preConfirm         : (data) => {
                return fetch(url, {
                    method: 'PUT',
                    body  : JSON.stringify(post_array),
                })
                    .then(response => {
                        console.log(response)
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick  : () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value.status == 'success') {
                    Swal.fire({
                        position         : 'top-end',
                        icon             : 'success',
                        title            : '성공하였습니다.',
                        showConfirmButton: false,
                        timer            : 1000,
                        onClose          : () => {
                            location.reload();
                        }
                    })
                } else {
                    Swal.fire({
                        position         : 'top-end',
                        icon             : 'error',
                        title            : '실패되었습니다',
                        showConfirmButton: false,
                        timer            : 1000,
                        onClose          : () => {
                            location.reload();
                        }
                    })
                }
            }
        });
    });
});

function doc_open(id, src) {
    let viewer_options = {
        id           : "pdf_viewer",
        width        : "1000px",
        height       : "600px",
        pdfOpenParams: {
            page     : 1,
            view     : "FitH",
            scrollbar: 0,
            toolbar  : 0,
            statusbar: 0,
            messages : 0,
            navpanes : 0
        }
    };
    PDFObject.embed(src, `#${id}`, viewer_options);
}

function contents_popup(file_type, file_path) {
    const type = file_type;
    const src = file_path;
    let html;
    if (type == 'video/mp4') {
        html = `
        <video width="1100" height="600" style="max-width: 100%;" controls autoplay >
            <source src="${src}" type="${type}">
        </video>
        `;
    } else if (type == 'application/pdf') {
        html = `
        <div id="pdf_container" class="pdf_container sub_con"></div>
        `;
    } else {
        html = `
        <img width="1100" height="600" style="max-width: 100%;"  src="${src}">
        `;
    }
    Swal.fire({
        html             : html,
        width            : 1100,
        height           : 600,
        showCloseButton  : false,
        showConfirmButton: true,
        customClass      : {
            closeButton: 'close-button-class_new',
        },
        onOpen           : function (ele) {
            if (type == 'application/pdf') {
                doc_open('pdf_container', file_path)
            }
        },
        confirmButtonText: '닫기',
    })
}

function content_delete(id) {
    const url = '/admin/api/contents_delete'
    const post_array = {
        'id': id
    };
    Swal.fire({
        title              : '해당 컨텐츠를 삭제하시겠습니까?',
        icon               : 'warning',
        showCancelButton   : true,
        confirmButtonColor : '#3085d6',
        cancelButtonColor  : '#d33',
        confirmButtonText  : '확인',
        cancelButtonText   : '취소',
        showLoaderOnConfirm: true,
        preConfirm         : (data) => {
            return fetch(url, {
                method: 'DELETE',
                body  : JSON.stringify(post_array),
            })
                .then(response => {
                    console.log(response)
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.json()
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    )
                })
        },
        allowOutsideClick  : () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            if (result.value.status == 'success') {
                Swal.fire({
                    position         : 'top-end',
                    icon             : 'success',
                    title            : '성공하였습니다.',
                    showConfirmButton: false,
                    timer            : 1000,
                    onClose          : () => {
                        location.reload();
                    }
                })
            } else {
                Swal.fire({
                    position         : 'top-end',
                    icon             : 'error',
                    title            : '실패되었습니다',
                    showConfirmButton: false,
                    timer            : 1000,
                    onClose          : () => {
                        location.reload();
                    }
                })
            }
        }
    });
}

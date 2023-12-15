<?php
namespace App\Libraries\File;

use FFMpeg\FFMpeg;
use FFMpeg\FFProbe;


class FileService
{
    
    private $fileChecker;
    private $block = ['php', 'phps', 'php3', 'php4', 'php5', 'php7', 'pht', 'phtml', 'htaccess', 'html', 'htm', 'inc', 'js', 'sh', 'bat'];
    
    public function __construct()
    {
        //        $this->fileChecker = new FileChecker();
    }
    
    public function moveChecker($file, $folderNameMain, $folderNameSub)
    {
        if (!$file->isValid()) {
            // 파일이 유효하지 않은 경우
            $errorMessage = $file->getErrorString() . ' (' . $file->getError() . ')';
            // 오류 메시지를 세션에 저장
            $session = \Config\Services::session();
            $session->setFlashdata('error_message', $errorMessage);
            return false; // 이 부분에서 메서드를 종료
        }
        
        if ($file->isValid() && !$file->hasMoved()) {
            $orgFileName = $file->getName();
            $newName = $file->getRandomName();
            $fileSize = $file->getSizeByUnit('mb');
            $fileExt = $file->getExtension();
            $mimeType = $file->getMimeType();
            $newPath = $file->move(WRITEPATH . 'uploads/' . $folderNameMain . '/' . $folderNameSub, $newName);
            
            if ($newPath) {
                // 파일 업로드 성공
                $fileUploadPath = WRITEPATH . 'uploads/' . $folderNameMain . '/' . $folderNameSub . '/' . $newName;
                $returnArray = [
                    'orgName'        => $orgFileName,
                    'uploadPath'     => '/uploads/' . $folderNameMain . '/' . $folderNameSub . '/' . $newName,
                    'realUploadPath' => $fileUploadPath,
                    'newName'        => $newName,
                    'ext'            => $fileExt,
                    'mimeType'       => $mimeType,
                    'size'           => $fileSize,
                    'file_duration'  => strpos($mimeType, 'video') !== false ? $this->fileDuration($fileUploadPath) : 10,
                ];
                return $returnArray;
            } else {
                // 파일 이동 실패
                $message = array('status' => 'false', 'message' => '파일 이동 중 오류가 발생했습니다.', 'class' => 'errors alert alert-danger alert-dismissible');
                session()->setFlashdata('message', $message);
                return false; // 이 부분에서 메서드를 종료
            }
        } else {
            $message = array('status' => 'false', 'message' => '파일 이동 중 오류가 발생했습니다.', 'class' => 'errors alert alert-danger alert-dismissible');
            session()->setFlashdata('message', $message);
            return false; // 이 부분에서 메서드를 종료
        }
    }
    
    public function fileDuration($filepath)
    {
        $ffmpeg = FFMpeg::create([
            'ffmpeg.binaries'  => '/usr/bin/ffmpeg', // 실제 FFmpeg 실행 파일의 경로
            'ffprobe.binaries' => '/usr/bin/ffprode', // 실제 FFProbe 실행 파일의 경로
        ]);
        $video = $ffmpeg->open($filepath);
        $streams = $video->getStreams();
        $duration = null;
        
        foreach ($streams as $stream) {
            var_dump($stream->get('codec_type'));
            // 비디오 스트림인 경우 (codec_type이 'video'인 경우) 재생시간(duration) 추출
            if ($stream->get('codec_type') === 'video') {
                $duration = $stream->get('duration');
                break; // 첫 번째 비디오 스트림에서 재생시간을 찾으면 루프 종료
            } else {
                $duration = 10;
            }
        }
        return $duration;
    }
    
    public function fileDelete(array $fileData)
    {
        $file = WRITEPATH . $fileData['file_path'];
        if (is_readable($file) && unlink($file)) {
            $message = array('status' => 'success');
            return $message;
        } else {
            $message = array('status' => 'fail', 'error_str' => '파일이 삭제되지 않았습니다.');
            session()->setFlashdata('message', $message);
            return false; // 이 부분에서 메서드를 종료
        }
    }
    
    public function fileEditSave($files, $folderNameMain)
    {
        foreach ($files as $file) {
            if (!$file->isValid()) {
                // 파일이 유효하지 않은 경우
                $errorMessage = $file->getErrorString() . ' (' . $file->getError() . ')';
                // 오류 메시지를 세션에 저장
                $session = \Config\Services::session();
                $session->setFlashdata('error_message', $errorMessage);
                return false; // 이 부분에서 메서드를 종료
            }
            if ($file->isValid() && !$file->hasMoved()) {
                $orgFileName = $file->getName();
                $newName = $file->getRandomName();
                $fileSize = $file->getSizeByUnit('mb');
                $fileExt = $file->getExtension();
                $mimeType = $file->getMimeType();
                $newPath = $file->move(WRITEPATH . 'uploads/' . $folderNameMain, $newName);
                
                if ($newPath) {
                    // 파일 업로드 성공
                    $fileUploadPath = WRITEPATH . 'uploads/' . $folderNameMain . '/' . $newName;
                    $returnArray = [
                        'orgName'        => $orgFileName,
                        'uploadPath'     => '/uploads/' . $folderNameMain . '/' . $newName,
                        'realUploadPath' => $fileUploadPath,
                        'newName'        => $newName,
                        'ext'            => $fileExt,
                        'mimeType'       => $mimeType,
                        'size'           => $fileSize,
                        //                    'file_duration'  => $this->fileDuration($fileUploadPath)
                    ];
                    $message = array('status' => 'success', 'data' => '/uploads/' . $folderNameMain . '/' . $newName);
                    session()->setFlashdata('message', $message);
                    return $message;
                } else {
                    // 파일 이동 실패
                    $message = array('status' => 'false', 'message' => '파일 이동 중 오류가 발생했습니다.', 'class' => 'errors alert alert-danger alert-dismissible');
                    session()->setFlashdata('message', $message);
                    return false; // 이 부분에서 메서드를 종료
                }
            } else {
                $message = array('status' => 'false', 'message' => '파일 이동 중 오류가 발생했습니다.', 'class' => 'errors alert alert-danger alert-dismissible');
                session()->setFlashdata('message', $message);
                return false; // 이 부분에서 메서드를 종료
            }
        }
    }
    
    public function qrcodeMake($number)
    {
        $fileName = "number.svg";
        $fileSavePath = WRITEPATH . 'uploads/' . 'qrcode' . '/' . $fileName;
        $returnPath = '/uploads/' . 'qrcode' . '/' . $fileName;
        $number = 'tel:' . $number;
        $qrcode = \QRcode::svg($number, false, $fileSavePath, null, '400');
        if ($qrcode) {
            $return = array('status' => 'success', 'data' => $returnPath);
        } else {
            $return = array('status' => 'fail');
        }
        return $return;
    }
    
    //    public function fileUpdate($file, $categoryId){
    //
    //    }
}

?>

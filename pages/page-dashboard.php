<?php
if (!is_user_logged_in()) {
    $fullUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

    wp_redirect(wp_login_url() . '?redirectTo=' . $fullUrl);
    exit;
}

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

get_header();

include THFW_USERS . 'includes/part-dashboard.php';

get_footer();

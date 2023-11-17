<?php

$errors = false;

if ((isset($_POST['email'])) && (!empty($_POST["email"]))) {
	$result['email'] = 'is-valid';
} else {
	$result['email'] = 'is-invalid';
	$errors = true;
}

if ($_POST['id'] == 'callback') {
	if ((isset($_POST['username'])) && (!empty($_POST["username"]))) {
		$result['username'] = 'is-valid';
	} else {
		$result['username'] = 'is-invalid';
		$errors = true;
	}
	if ((isset($_POST['whatsapp'])) && (!empty($_POST["whatsapp"])) && (strlen($_POST['whatsapp']) > 6)) {
		$result['whatsapp'] = 'is-valid';
	} else {
		$result['whatsapp'] = 'is-invalid';
		$errors = true;
	}
	if ((isset($_POST['telegram'])) && (!empty($_POST["telegram"]))) {
		$result['telegram'] = 'is-valid';
	} else {
		$result['telegram'] = 'is-invalid';
		$errors = true;
	}
	if (isset($_POST['accept']) && $_POST['accept'] == '1') {
		$result['accept'] = 'is-valid';
	} else {
		$result['accept'] = 'is-invalid';
		$errors = true;
	}
}

if ($errors) {
	$result['success'] = 0;
	echo json_encode($result);
	die();
} else {
	$result['success'] = 1;
	echo json_encode($result);
}

if ($_POST['name'] != '') die('spam');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/PHPMailer/Exception.php';
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';


$mail = new PHPMailer();
$mail->CharSet = 'UTF-8';

$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPDebug = 0;

if (file_exists("/mail.php"))
	include "/mail.php";
$mail->SMTPAutoTLS = false;
//$mail->SMTPAutoTLS = true;
//$mail->SMTPSecure = "tls";
$mail->SMTPAuth = true;


//$mail->setFrom('www@bitbrain.me', 'BITBRAIN');<------>
$mail->setFrom('no-reply@bitbrain.me', 'BITBRAIN');
//$mail->AddAddress('support@bitbrain.me');
$mail->AddAddress('orenlr56@yandex.ru');
$mail->AddAddress('hova.ekaterina@yandex.ru');

$mail->Subject = 'Заявка с сайта PRO BITBRAIN';

foreach ($_POST as $key => $value) {
	if ($value != "") {
		$name = '';
		switch ($key) {
			case "email":
				$name = "E-mail";
				break;
			default:
				$name = $key;
				break;
		}
		if ($key != 'mail-group') {
			$message .= "
				" . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
				<td style='padding: 10px; border: #e9e9e9 1px solid;width: 40%;'><b>$name</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;width: 60%;'>$value</td>
			</tr>
			";
		}
	}
}

$body = "<table style='width: 100%;'>$message</table>";
$mail->msgHTML($body);

if ($mail->send()) {
	$result = "success";
} else {
	$result = "error";
}

/* unisender */

$api_key = '6rhfdo8myeiengg94xz7yt56fe37qtci3c7yuche';
$list_ids = '144';
if ($_POST['id'] == 'callback') {
	$list_ids = '143';
}
$tags = '';
$double_optin = 3;
$overload = 0;
$email_fo = $_POST["email"];
$name_un = $_POST["username"];
$form_name = $_POST["form-name"];
$whatsapp = $_POST["whatsapp"];
$telegram = $_POST["telegram"];

$subscribe = array(
	'api_key' => $api_key,
	'list_ids' => $list_ids,
	'double_optin' => $double_optin,
	'fields[tags]' => $tags,
	'fields[email]' => $email_fo,
	'fields[phone]' => $whatsapp,
	'fields[Name]' => $name_un,
	'fields[formid]' => $form_name,
	'fields[overload]' => $overload,
	'fields[input]' => $whatsapp,
	'fields[input_2]' => $telegram,
);

// Устанавливаем соединение
$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $subscribe);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt(
	$ch,
	CURLOPT_URL,
	'https://api.unisender.com/ru/api/subscribe?format=json'
);
$results = curl_exec($ch);

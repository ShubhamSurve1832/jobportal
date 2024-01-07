<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");

?>

<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';


//$db['db_host'] = "localhost";
//$db['db_user'] = "root";
//$db['db_pass'] = "73c3UlHc3*+PhKh";
//$db['db_user'] = "simandha_root";
//$db['db_pass'] = "@Simandhar123";
//$db['db_name'] = "simandha_ea";
$db['db_host'] = "localhost";
$db['db_user'] = "simandha_root";
$db['db_pass'] = "@Simandhar123";
$db['db_name'] = "simandha_ea";


foreach ($db as $key => $value)
{
    define(strtoupper($key) , $value);
}

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if (!$connection)
{
    echo "you are not connected";
}

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

$mail->SMTPDebug = true;

if (($_POST['name']) && ($_POST['email']))
{

    
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile_primary = $_POST['phone'];
    $address1 = $_POST['address_line1'];
	$address2 = $_POST['address_line2'];
    $state = $_POST['state'];
    $city = $_POST['city'];
    $pincode = $_POST['pincode'];
    $course = $_POST['course'];
    //$sign = $_POST['sign'];
	$cname = $_POST['cname'];
	$profession = $_POST['profession'];
	$profession_company= $_POST['profession_company'];
	$hearus = $_POST['hearus'];
	$enpaymode = $_POST['enpaymode'];   
	$hearusother = $_POST['hear-us-other'];

	 if (true)
        {
            
            echo $sql = "INSERT INTO student_registrations (first_name,last_name,payment_mode,	mobile_primary,mobile_secondary,email,course,address_line1,address_line2,state,city,pincode,profession,profession_company,cname,hearus,hearus_description,payment_choosen)
VALUES ('$name',' ','online','$mobile_primary','$phone','$email','$course','$address1','$address2','$state','$city','$pincode','$profession','$profession_company','$cname','$hearus','$hearusother','$enpaymode')";
		 
		 
		  
            //echo $sql = "INSERT INTO student_registrations (first_name,last_name,payment_mode,	mobile_primary,mobile_secondary,email,course,address_line1,address_line2,state,city,pincode,signature,cname) VALUES ('$name',' ','online','$phone','$phone','$email','$course','$address1','$address2','$state','$city','$pincode','$sign','$cname')";

            if ($connection->query($sql) === true)
            {
                echo "New record created successfully";
            }
            else
            {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }

            // $connection->close();
        }
	
    // $student_location = $_POST['country'];
    try
    {
        //Server settings
        $mail->SMTPDebug = 0; // Enable verbose debug output
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = 'smtp.office365.com'; // Specify main and backup SMTP servers
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = 'srikanth@simandhareducation.com'; // SMTP username
        $mail->Password = 'Saz17488'; // SMTP password
        $mail->SMTPSecure = 'starttls'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587; // TCP port to connect to
        //Recipients
        $mail->setFrom('srikanth@simandhareducation.com');

        //$mail->addAddress('simandharcpareview@gmail.com'); // Name is optional
          $mail->addAddress('accounts@simandhareducation.com');
        // $mail->addCC('simandharcpareview@gmail.com');
        // $mail->addBCC('bcc@example.com');
        // Attachments
        // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
        // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
        

        $message = '<html><body>';
        $message .= '<h1>Student - Registrations</h1>';
        $message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
		$message .= "<tr style='background: #eee;'><td><strong>Counsellor Name:</strong> </td><td>" . $cname . "</td></tr>";
        $message .= "<tr style='background: #eee;'><td><strong>Student Name:</strong> </td><td>" . $first_name . "</td></tr>";
        $message .= "<tr style='background: #eee;'><td><strong>Student Email:</strong> </td><td>" . $email . "</td></tr>";
        $message .= "<tr style='background: #eee;'><td><strong>Student Phone:</strong> </td><td>" . $phone . "</td></tr>";
        $message .= "<tr style='background: #eee;'><td><strong>Student Address Line1:</strong> </td><td>" . $address1 . "</td></tr>";
		 $message .= "<tr style='background: #eee;'><td><strong>Student Address Line2:</strong> </td><td>" . $address2 . "</td></tr>";
        $message .= "<tr style='background: #eee;'><td><strong>Student City:</strong> </td><td>" . $city . "</td></tr>";
        $message .= "<tr style='background: #eee;'><td><strong>Student State:</strong> </td><td>" . $state . "</td></tr>";
        $message .= "<tr style='background: #eee;'><td><strong>Student Course:</strong> </td><td>" . $course . "</td></tr>";
        $message .= "<tr style='background: #eee;'><td><strong>Student Pincode:</strong> </td><td>" . $pincode . "</td></tr>";

		      
        $message .= "</table>";
        $message .= '</body></html>';

        // Content
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = 'student-data';
        $mail->Body = $message;
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail1 = $mail->send();

       

    }
    catch(Exception $e)
    {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

}
if (($_POST['verify_email']))
{
	try{
		$email_id = $_POST['verify_email'];
		$result ='';
		$rows = array();
    // echo $select_sql = "SELECT * FROM c_2";
       $select_sql = "SELECT * FROM student_registrations WHERE email = '{$email_id}'";
		  $result = $connection->query($select_sql);
		    
            if ($result -> num_rows>0)
            {
               
				while($row = $result->fetch_assoc()) {
					    $rows[] = $row;
                                 
                       }
				echo json_encode($rows);
				
            }
            else
            {
				
			 echo '{}';
            }

            $connection->close();
	    
	}catch(Exception $e){ 
        echo "Message could not be sent. Mailer Error: {$e}";
	}
    
       
}

?>

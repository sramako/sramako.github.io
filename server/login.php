<?php
	extract($_POST);
	if( ($user=="emp1")&&($pwd=="1234") ) {
		echo true;
	}
	else {
		echo false;
	}
?>

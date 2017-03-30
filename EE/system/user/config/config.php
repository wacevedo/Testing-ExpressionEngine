<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$config['is_system_on'] = 'y';
$config['multiple_sites_enabled'] = 'n';
// ExpressionEngine Config Items
// Find more configs and overrides at
// https://docs.expressionengine.com/latest/general/system_configuration_overrides.html

$config['app_version'] = '3.5.3';
$config['encryption_key'] = '6ec534161aecd22108c032720c497b96d6418dda';
$config['database'] = array(
	'expressionengine' => array(
		'hostname' => 'localhost',
		'database' => 'ee',
		'username' => 'root',
		'password' => '',
		'dbprefix' => 'exp_',
		'port'     => ''
	),
);

// EOF
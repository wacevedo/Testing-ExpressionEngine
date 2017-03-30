<?php
/**
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2016, EllisLab, Inc.
 * @license		https://expressionengine.com/license
 * @link		https://ellislab.com
 * @since		Version 2.0
 * @filesource
 */

// ------------------------------------------------------------------------

/**
 * ExpressionEngine Country Codes
 *
 * @package		ExpressionEngine
 * @subpackage	Config
 * @category	Config
 * @author		EllisLab Dev Team
 * @link		https://ellislab.com
 */
ee()->load->library('logger');
ee()->logger->deprecated('3.4.0', 'ee()->config->loadFile("countries") to load this config file', TRUE, 604800);

$conf = ee()->config->loadFile('countries');

$countries = $conf['countries'];
$timezones = $conf['timezones'];

// EOF

<?php
/**
 * $Id: RootFileImpl.php 455 2010-10-18 08:52:16Z scadec $
 *
 * @package MCFileManager.filesystems
 * @author Moxiecode
 * @copyright Copyright � 2005, Moxiecode Systems AB, All rights reserved.
 */

require_once(MCMANAGER_ABSPATH . "FileSystems/BaseFileImpl.php");

/**
 * Implementation of the root file system. The root file system lists the available roots the user can access.
 */
class Moxiecode_RootFileImpl extends Moxiecode_BaseFileImpl {
	// Private fields
	var $_manager;

	function canRead() {
		return true;
	}

	function canWrite() {
		return false;
	}

	function isDirectory() {
		return true;
	}

	function exists() {
		return true;
	}

	function getParent() {
		return null;
	}

	function &getParentFile() {
		return null;
	}

	/**
	 * Returns an array of MCE_File instances based on the specified filter instance.
	 *
	 * @param MCE_FileFilter &$filter MCE_FileFilter instance to filter files by.
	 * @return Array array of MCE_File instances based on the specified filter instance.
	 */
	function &listFilesFiltered(&$filter) {
		$man = $this->_manager;
		$files = array();
		$roots = $man->getRootPaths();

		foreach ($roots as $root) {
			$file = $man->getFile($root);

			// Configured root doesn't exists
			if (!$file->exists()) {
				error("Configured root: " . $root . " could not be found.");
				continue;
			}

			if ($filter->accept($file))
				$files[] = $file;
		}

		return $files;
	}
}

?>
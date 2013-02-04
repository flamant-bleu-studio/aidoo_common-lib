<?php
	require_once(MCMANAGER_ABSPATH . "FileManager/FileManagerPlugin.php");
	session_start();
	
	// * * * * FileManager config

	// General options
	$mcFileManagerConfig['general.theme'] = "fm";
	$mcFileManagerConfig['general.user_friendly_paths'] = true;
	$mcFileManagerConfig['general.tools'] = "createdir,createdoc,refresh,zip,upload,edit,rename,cut,copy,paste,delete,selectall,unselectall,view,download,insert,addfavorite,removefavorite,imagemanager";
	$mcFileManagerConfig['general.disabled_tools'] = "";
	$mcFileManagerConfig['general.error_log'] = "";
	$mcFileManagerConfig['general.language'] = "fr"; // en, sv
	$mcFileManagerConfig['general.plugins'] = "History,Favorites"; // comma seperated
	$mcFileManagerConfig['general.demo'] = false;
	$mcFileManagerConfig['general.debug'] = false;
	$mcFileManagerConfig['general.encrypt_paths'] = true;
	$mcFileManagerConfig['general.remember_last_path'] = false;
	$mcFileManagerConfig['general.allow_override'] = "*";
	$mcFileManagerConfig['general.allow_export'] = "demo,tools,disabled_tools,debug";

	// Preview options
	$mcFileManagerConfig['preview.wwwroot'] = $_SESSION['tinymce_public_path']; // absolute or relative from this script path (c:/Inetpub/wwwroot).
	$mcFileManagerConfig['preview.urlprefix'] = ""; // domain name
	$mcFileManagerConfig['preview.urlsuffix'] = "";
	$mcFileManagerConfig['preview.include_file_pattern'] = '';
	$mcFileManagerConfig['preview.exclude_file_pattern'] = '';
	$mcFileManagerConfig['preview.extensions'] = "*";
	$mcFileManagerConfig['preview.allow_export'] = "urlprefix,urlsuffix";
	$mcFileManagerConfig['preview.allow_override'] = "*";

	// General file system options
	$mcFileManagerConfig['filesystem'] = "Moxiecode_LocalFileImpl";
	$mcFileManagerConfig['filesystem.path'] = $_SESSION['tinymce_ressource_folder']; // absolute or relative from this script path.
	$mcFileManagerConfig['filesystem.rootpath'] = $_SESSION['tinymce_ressource_folder']; // absolute or relative from this script path.
	$mcFileManagerConfig['filesystem.datefmt'] = "Y-m-d H:i";
	$mcFileManagerConfig['filesystem.include_directory_pattern'] = '';
	$mcFileManagerConfig['filesystem.exclude_directory_pattern'] = '/^mcith$/i';
	$mcFileManagerConfig['filesystem.invalid_directory_name_msg'] = "";
	$mcFileManagerConfig['filesystem.include_file_pattern'] = '';
	$mcFileManagerConfig['filesystem.exclude_file_pattern'] = '/^\.|mcic_/i';
	$mcFileManagerConfig['filesystem.invalid_file_name_msg'] = "";
	$mcFileManagerConfig['filesystem.extensions'] = "gif,jpg,htm,html,pdf,zip,txt,php,png,swf,dcr,mov,qt,ram,rm,avi,mpg,mpeg,asf,flv";
	$mcFileManagerConfig['filesystem.file_templates'] = 'templates/document.htm,templates/another_document.htm';
	$mcFileManagerConfig['filesystem.directory_templates'] = '${rootpath}/templates/directory,${rootpath}/templates/another_directory';
	$mcFileManagerConfig['filesystem.readable'] = true;
	$mcFileManagerConfig['filesystem.writable'] = true;
	$mcFileManagerConfig['filesystem.delete_recursive'] = true;
	$mcFileManagerConfig['filesystem.force_directory_template'] = false;
	$mcFileManagerConfig['filesystem.clean_names'] = true;
	$mcFileManagerConfig['filesystem.allow_export'] = "extensions,readable,writable,file_templates,directory_templates,force_directory_template,clean_names";
	$mcFileManagerConfig['filesystem.allow_override'] = "*";

	// Upload options
	$mcFileManagerConfig['upload.maxsize'] = "10MB";
	$mcFileManagerConfig['upload.overwrite'] = false;
	$mcFileManagerConfig['upload.include_file_pattern'] = '';
	$mcFileManagerConfig['upload.exclude_file_pattern'] = '';
	$mcFileManagerConfig['upload.invalid_file_name_msg'] = "";
	$mcFileManagerConfig['upload.extensions'] = "gif,jpg,png,pdf,zip,swf";
	$mcFileManagerConfig['upload.multiple_upload'] = true;
	$mcFileManagerConfig['upload.chunk_size'] = '1mb';
	$mcFileManagerConfig['upload.allow_export'] = "maxsize,multiple_upload,chunk_size,overwrite,extensions";
	$mcFileManagerConfig['upload.allow_override'] = "*";

	// Download options
	$mcFileManagerConfig['download.include_file_pattern'] = "";
	$mcFileManagerConfig['download.exclude_file_pattern'] = "";
	$mcFileManagerConfig['download.extensions'] = "gif,jpg,htm,html,pdf,txt,zip";
	$mcFileManagerConfig['download.allow_override'] = "*";

	// Create document options
	$mcFileManagerConfig['createdoc.fields'] = "Document title=title";
	$mcFileManagerConfig['createdoc.include_file_pattern'] = '';
	$mcFileManagerConfig['createdoc.exclude_file_pattern'] = '';
	$mcFileManagerConfig['createdoc.invalid_file_name_msg'] = "";
	$mcFileManagerConfig['createdoc.allow_export'] = "fields";
	$mcFileManagerConfig['createdoc.allow_override'] = "*";

	// Create directory options
	$mcFileManagerConfig['createdir.include_directory_pattern'] = '';
	$mcFileManagerConfig['createdir.exclude_directory_pattern'] = '/[^a-z0-9_\.]/i';
	$mcFileManagerConfig['createdir.invalid_directory_name_msg'] = "";
	$mcFileManagerConfig['createdir.allow_override'] = "*";

	// Rename options
	$mcFileManagerConfig['rename.include_file_pattern'] = '';
	$mcFileManagerConfig['rename.exclude_file_pattern'] = '';
	$mcFileManagerConfig['rename.invalid_file_name_msg'] = "";
	$mcFileManagerConfig['rename.include_directory_pattern'] = '';
	$mcFileManagerConfig['rename.exclude_directory_pattern'] = '';
	$mcFileManagerConfig['rename.invalid_directory_name_msg'] = "";
	$mcFileManagerConfig['rename.allow_override'] = "*";

	// Edit file options
	$mcFileManagerConfig['edit.include_file_pattern'] = '';
	$mcFileManagerConfig['edit.exclude_file_pattern'] = '';
	$mcFileManagerConfig['edit.extensions'] = "html,htm,txt";
	$mcFileManagerConfig['edit.allow_override'] = "*";

	// Zip file(s) options
	$mcFileManagerConfig['zip.include_file_pattern'] = '';
	$mcFileManagerConfig['zip.exclude_file_pattern'] = '';
	$mcFileManagerConfig['zip.extensions'] = "*";
	$mcFileManagerConfig['zip.allow_override'] = "*";

	// Unzip file(s) file options
	$mcFileManagerConfig['unzip.include_file_pattern'] = '';
	$mcFileManagerConfig['unzip.exclude_file_pattern'] = '';
	$mcFileManagerConfig['unzip.extensions'] = "*";
	$mcFileManagerConfig['unzip.allow_override'] = "*";

	// Authenication
	$mcFileManagerConfig['authenticator'] = "SessionAuthenticator";
	$mcFileManagerConfig['authenticator.login_page'] = "../../../administration/login/";
	$mcFileManagerConfig['authenticator.allow_override'] = "*";

	// SessionAuthenticator
	$mcFileManagerConfig['SessionAuthenticator.logged_in_key'] = "isLoggedIn";
	$mcFileManagerConfig['SessionAuthenticator.groups_key'] = "groups";
	$mcFileManagerConfig['SessionAuthenticator.user_key'] = "user";
	$mcFileManagerConfig['SessionAuthenticator.path_key'] = "mc_path";
	$mcFileManagerConfig['SessionAuthenticator.rootpath_key'] = "mc_rootpath";
	$mcFileManagerConfig['SessionAuthenticator.config_prefix'] = "filemanager";

	// ExternalAuthenticator config
	$mcFileManagerConfig['ExternalAuthenticator.external_auth_url'] = "auth_example.jsp";
	$mcFileManagerConfig['ExternalAuthenticator.secret_key'] = "someSecretKey";

	// Local filesystem options
	$mcFileManagerConfig['filesystem.local.access_file_name'] = "mc_access";
	$mcFileManagerConfig['filesystem.local.allow_override'] = "access_file_name";
	$mcFileManagerConfig['filesystem.local.file_mask'] = "";
	$mcFileManagerConfig['filesystem.local.directory_mask'] = "";
	$mcFileManagerConfig['filesystem.allow_override'] = "*";

	// Stream options
	$mcFileManagerConfig['stream.mimefile'] = "mime.types";
	$mcFileManagerConfig['stream.include_file_pattern'] = '';
	$mcFileManagerConfig['stream.exclude_file_pattern'] = '/\.php$|\.shtm$/i';
	$mcFileManagerConfig['stream.extensions'] = "*";
	$mcFileManagerConfig['stream.allow_override'] = "*";

	// Logging options
	$mcFileManagerConfig['log.enabled'] = false;
	$mcFileManagerConfig['log.level'] = "error"; // debug, warn, error
	$mcFileManagerConfig['log.path'] = "logs";
	$mcFileManagerConfig['log.filename'] = "{level}.log";
	$mcFileManagerConfig['log.format'] = "[{time}] [{level}] {message}";
	$mcFileManagerConfig['log.max_size'] = "100k";
	$mcFileManagerConfig['log.max_files'] = "10";

	// Image manager options
	$mcFileManagerConfig['imagemanager.urlprefix'] = "../../../imagemanager/?type=im";  // need to add "imagemanager" button to tools as well.
	$mcFileManagerConfig['imagemanager.allow_override'] = "*";
	$mcFileManagerConfig['imagemanager.allow_export'] = "urlprefix";
?>
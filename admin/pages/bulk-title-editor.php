<?php
/**
 * @package Admin
 */

if ( ! defined( 'WPSEO_VERSION' ) ) {
	header( 'HTTP/1.0 403 Forbidden' );
	die;
}
global $wpseo_admin_pages;

$options = get_option( 'wpseo' );

if( ! class_exists( 'WPSEO_Bulk_Title_Editor_List_Table' ) ) {
	require_once( WPSEO_PATH . 'admin/class-bulk-title-editor-list-table.php' );
}

$wpseo_bulk_title_editor_list_table = new WPSEO_Bulk_Title_Editor_List_Table();

if ( ! empty( $_REQUEST['_wp_http_referer'] ) ) {
	wp_redirect( remove_query_arg( array( '_wp_http_referer', '_wpnonce' ), stripslashes( $_SERVER['REQUEST_URI'] ) ) );
	exit;
}

$wpseo_bulk_title_editor_list_table->prepare_items();
?>

<div class="wrap wpseo_table_page">

	<a href="http://yoast.com/">
	<?php screen_icon(); ?>
	</a>
	<h2 id="wpseo-title"><?php echo get_admin_page_title(); ?></h2>

	<?php $wpseo_bulk_title_editor_list_table->views(); ?>
	<?php $wpseo_bulk_title_editor_list_table->display(); ?>

</div>
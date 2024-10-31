jQuery(document).ready(function(){
    
    jQuery(document).on('submit', '.rys-widget form', function(){
        var $this = jQuery(this), 
            $parent = $this.closest('.rys-widget');
        
        if (!$this.data('uid')) {
            return false;
        }
        
        var ajaxurl = $parent.data('ajaxurl');
        var data = $this.serialize() + '&action=rysnlw_subscribe&uid='+$this.data('uid');
        
        jQuery('.message', $parent).text('Please wait...');
        jQuery.post(ajaxurl, data, function(json) {
            jQuery('.message', $parent).text(json.message);
            if (json.result == 'success') {
                jQuery('input[type=text], textarea', $parent).val('').blur();
            }
        }, 'json');
        
        return false;
    });
    
});
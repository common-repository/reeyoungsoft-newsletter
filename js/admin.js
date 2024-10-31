jQuery(document).ready(function(){
    
    jQuery(document).on('click', '.rys-fetch-available-lists', function(){
        var parent = jQuery(this).closest('form');

        var data = {
            action: 'rysnlw_fetch_lists',
            api_url: jQuery('.rys-api-url', parent).val(),
            public_key: jQuery('.rys-public-key', parent).val(),
            private_key: jQuery('.rys-private-key', parent).val()
        };
        
        jQuery('.rys-spinner').addClass("is-active").show();
        
        jQuery.post(ajaxurl, data, function(json) {
            jQuery('.rys-spinner').removeClass("is-active").hide();
            
            if (json.result == 'error' && json.errors) {
                var error = '';
                for (i in json.errors) {
                    error += json.errors[i] + "\n";
                }
                jQuery('.lists-container', parent).hide();
                alert(error);
            } else if (json.result == 'success' && json.lists) {
                var select = jQuery('.rys-mail-lists-dropdown', parent);
                select.empty();
                for (i in json.lists) {
                    var opt = new Option();
                    opt.value = json.lists[i].list_uid;
                    opt.text = json.lists[i].name;
                    opt.selected = json.lists[i].list_uid == select.data('listuid');
                    select.append(opt);
                }
                jQuery('.lists-container', parent).show();
            }
        }, 'json');
        
        return false;
    
    }).on('change', '.rys-mail-lists-dropdown', function(){
        
        var $this = jQuery(this), parent = $this.closest('form');
        
        var data = {
            action: 'rysnlw_fetch_list_fields',
            api_url: jQuery('.rys-api-url', parent).val(),
            public_key: jQuery('.rys-public-key', parent).val(),
            private_key: jQuery('.rys-private-key', parent).val(),
            field_name: $this.data('fieldname'),
            list_uid: $this.val()
        };
        
        jQuery('.rys-spinner').addClass("is-active").show();
        
        jQuery('.fields-container, .generated-form-container', parent).hide();
        jQuery('.generated-form-container textarea', parent).val('');
        
        jQuery.post(ajaxurl, data, function(html) {
            jQuery('.rys-spinner').removeClass("is-active").hide();
            jQuery('.table-container', parent).html(html);
            
            if ($this.val() != '') {
                jQuery('.fields-container, .generated-form-container', parent).show();
            }
        });
        
    });
    
});
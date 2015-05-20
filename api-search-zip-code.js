Module.ComponentWrapper( 'SearchZipCode', function(SearchZipCode) {

	SearchZipCode.fn.init = function() {
		this.addEventListener();
	};

	SearchZipCode.fn.addEventListener = function() {
		this.addEvent( 'focusout', 'search' );
	};

	SearchZipCode.fn.isValidZipCode = function(value) {
		var objER = /^[0-9]{2}[0-9]{3}[0-9]{3}$/;
		return objER.test( value.replace( /[^0-9]/g,'') ) ? true : false;
	};

	SearchZipCode.fn._onFocusoutSearch = function() {
		var value = this.elements.zipCode.val();

		if ( !this.isValidZipCode( value ) ) {
			return;
		}

		jQuery.ajax( {
			url: 'http://api.postmon.com.br/v1/cep/' + value,
		} ).then( this._onThenAPI.bind( this ) );
	};

	SearchZipCode.fn._onThenAPI = function(data) {
		this.elements.bairro.val( data.bairro || '' );
		this.elements.cidade.val( data.cidade || '' );
		this.elements.logradouro.val( data.logradouro || '' );
		this.elements.siglauf.val( data.estado || '' );
		this.elements.uf.val( data.estado_info.nome || '' );
	};

} );

Module.factory.create( $( 'body' ) );

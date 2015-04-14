Module( "Search.CEP", function(CEP) {
	CEP.fn.initialize = function(container, object) {
		this.container       = container;
		this.inputBairro     = container.find( object.bairro );
		this.inputCEP        = container.find( object.cep );
		this.inputCidade     = container.find( object.cidade );
		this.inputLogradouro = container.find( object.logradouro );
		this.inputSiglaUF    = container.find( object.siglauf );
		this.inputUF         = container.find( object.uf );

		this.addEventListener();
	};

	CEP.fn.addEventListener = function() {
		this.inputCEP
			.on( 'focusout', this._onFocusOut.bind( this ) )
		;
	};

	CEP.fn._isValidCEP = function(value) {
		var objER = /^[0-9]{2}[0-9]{3}[0-9]{3}$/;

		value = jQuery.trim(value);

		value = value.replace(/[^0-9]/g,'');

		return objER.test(value) ? true : false;
	};

	CEP.fn._onFocusOut = function(event) {
		var value = this.inputCEP.val();

		if ( ! this._isValidCEP( value ) ) { return; }

		jQuery.ajax({
			url: "http://api.postmon.com.br/v1/cep/" + value,
		}).then( this._onThenAPI.bind( this ) );
	};

	CEP.fn._onThenAPI = function(data) {
		var bairro     = (typeof data.bairro != 'undefined') ? data.bairro : '';
		var cidade     = (typeof data.cidade != 'undefined') ? data.cidade : '';
		var logradouro = (typeof data.logradouro != 'undefined') ? data.logradouro : '';
		var siglaUF    = (typeof data.siglaUF != 'undefined') ? data.siglaUF : '';
		var UF         = (typeof data.estado_info.nome != 'undefined') ? data.estado_info.nome : '';

		this.inputBairro.val( bairro );
		this.inputCidade.val( cidade );
		this.inputLogradouro.val( logradouro );
		this.inputSiglaUF.val( siglaUF );
		this.inputUF.val( UF );
	};

} );

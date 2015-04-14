Module( "Search.CEP", function(CEP) {
	CEP.fn.initialize = function(container) {
		this.container       = container;
		this.inputBairro     = container.find( '.input-bairro' );
		this.inputCEP        = container.find( '.input-cep' );
		this.inputCidade     = container.find( '.input-cidade' );
		this.inputLogradouro = container.find( '.input-logradouro' );
		this.inputSiglaUF    = container.find( '.input-sigla-uf' );
		this.inputUF         = container.find( '.input-uf' );

		this.addEventListener();
	};

	CEP.fn.addEventListener = function() {
		this.container
			.on( 'click', '[data-action=search]', this._onClick.bind( this ) )
		;
	};

	CEP.fn._onClick = function(event) {
		var value = this.inputCEP.val();

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
		this.inputSiglaUF.val( estado );
		this.inputUF.val( UF );
	};

} );
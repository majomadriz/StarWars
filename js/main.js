
// A $( document ).ready() block.
$( document ).ready(function() {

	var charactersImageUrl = {
		'Luke_Skywalker' : 'http://www.freakingnews.com/pictures/70000/Luke-Skywalker-Missing-a-Hand--70450.jpg',
		'C-3PO' : 'https://pbs.twimg.com/profile_images/813864149881012224/_y0pDPyl_400x400.jpg',
		'R2-D2' : 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/H/LH/HLHZ2/HLHZ2?wid=1000&hei=1000&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1502925951728',
		'Darth_Vader' : 'https://pbs.twimg.com/profile_images/3103894633/e0d179fc5739a20308331b432e4f3a51_400x400.jpeg',
		'Leia_Organa' : 'http://centromujer.republica.com/files/2008/10/carrie-fisher.jpg',
		'Owen_Lars' : 'https://vignette.wikia.nocookie.net/starwars/images/8/81/Owen-OP.jpg/revision/latest?cb=20070626181249',
		'Beru_Whitesun_lars' : 'https://vignette.wikia.nocookie.net/disney/images/8/84/BeruWhitesunLars.jpg/revision/latest?cb=20121227005055',
		'R5-D4' : 'https://images-na.ssl-images-amazon.com/images/I/91CTs1kIfVL._SX466_.jpg',
		'Biggs_Darklighter' : 'https://vignette.wikia.nocookie.net/worldsgreatestheroes/images/9/97/Biggs_Darklighter.jpg/revision/latest?cb=20140501151546',
		'Obi-Wan_Kenobi' : 'http://www.diarioelpueblo.com.uy/wp-content/uploads/2018/05/obi-wan-kenobi.jpg',
	};

    $('#btn-show-characters').click((event)=>{
    	getCall("https://swapi.co/api/people",createCards);
	});

	$('.characters-list').on( 'click', '.show-more', function( event ) {
		event.preventDefault();
		var url = $(this).attr('data-url');
		getCall(url,showModal);
	});

	function showModal(character) {
		var modal = $("#showMoreModal");
	   	modal.find('.name').text(character.name);
	   	modal.find('.card-info .vehicles').text('');
	   	modal.find('.card-info .films').text('');
	   	modal.find('.card-info .planets').text('');
	   	modal.find('.card-info .vehicles-title').addClass('hidden');
	   	modal.find('.info-wrapper img').attr('src', charactersImageUrl[character.name.replace(' ', '_')]);
	   	for (var i = 0; i < character.vehicles.length; i++) {
	   		var url = character.vehicles[i]
	   		$.get(url)
			.done((data)=>{
				renderVehicles(modal, data);
			});
	   	}

	   	for (var i = 0; i < character.films.length; i++) {
	   		var url = character.films[i]
	   		$.get(url)
			.done((data)=>{
				console.log(data);
				renderFilms(modal, data);
			});
	   	}

	   	
   		var urlHomeworld = character.homeworld;
   		$.get(urlHomeworld)
		.done((data)=>{
			console.log(data);
			renderHomeworld(modal, data);
		});
	   	
		$('#showMoreModal').modal('show');
	}
	function renderVehicles(element, vehicle) {
		element.find('.card-info .vehicles').append('<h4>'+ vehicle.name +'</h4>');
		element.find('.card-info .vehicles-title').removeClass('hidden');
		element.find('.card-info .vehicles').removeClass('hidden');
	}

	function renderFilms(element, film) {
		element.find('.card-info .films').append('<h4>'+ film.title +'</h4>');
			element.find('.card-info .film-title').removeClass('hidden');
			element.find('.card-info .films').removeClass('hidden'); 
	}

	function renderHomeworld(element, homeworld) {
		console.log('homeworld: ' , homeworld);
		element.find('.card-info .homeworld').append('<h4>'+ homeworld.name +'</h4>');
			element.find('.card-info .homeworld-title').removeClass('hidden');
			element.find('.card-info .homeworld').removeClass('hidden'); 
	}

    function createCards(data) {
    	var characters = data.results;
    	for (var i = 0; i < characters.length; i++) {
	    	var card = $("#card-base").clone();
		   	card.attr('id', i+1);
		   	card.find('.name').text(characters[i].name);
		   	card.find('.info-wrapper img').attr('src',charactersImageUrl[characters[i].name.replace(' ', '_')]);
		   	card.find('.show-more').attr('data-url',characters[i].url);
		   	card.removeClass('hidden');
			$(".characters-list").append(card);
	    }
    }



    function getCall(url,callback) {
    	$.get(url)
			.done((data)=>{
				console.log(data);
				callback(data);
			});
    }
});
$(document).ready(function () {

	//follow plugin
	$('#cart').jfollow('#followbox', 20);


	//shopping cart functionality
	//hide the empty cart button
	//and checkout button 
	emptyBtn.hide();
	emptyCheckoutBtn.hide();

	//make the product class div part of the draggable ui

	$('.product').draggable({
		appendTo: 'body',
		helper: 'clone'
	});

	//make the dropzone class div a part of the droppable ui
	$('.dropzone').droppable({
		tolerance: 'touch',
		activeClass: 'ui-state-default',
		hoverClass: 'ui-state-hover',
		accept: '.product',
		drop: function (event, ui) {

			var item = $(ui.draggable).find('.product-title').text();
			var itemid = $(ui.draggable).find('.id').text();
			var price = $(ui.draggable).find('.price').text();
			var html = '<div class="cart-item" data-productid="' + itemid + '" >';
			html = html + '<div class="div-remove">';
			html = html + '<a onclick = "remove(this)" class="remove ' + itemid + '">&times;</a>' + '</div>';
			html = html + '<p class="item-name">' + item + '</p>';
			html = html + '<p class="item-price">' + price + '</p>';
			html = html + '<p class="input">' + '<input type="text" maxlength="2" name="quantity" value="' + quantity + '" />';
			html = html + '</p>' + '</div>'

			var cartitem = $('".cart-item[data-productid="' + itemid + '"]"');

			if (cartitem.length > 0) {
				var int = parseInt(cartitem.find('input').val());
				int++;
				cartitem.find('input').val(int);
			} else {
				var content = $('.cart-content');
				content.append(html);
				emptyText.hide();
			}
			//update the total items
			total_items++;
			if (total_items > 0) {
				emptyBtn.fadeIn('1000');
				emptyCheckoutBtn.fadeIn('1000');
			}
			//Clear Cart has been pressed:			
			emptyBtn.click(function () {
				$('#dialog-confirm').dialog({
					resizable: false,
					modal: true,
					buttons: [{
						text: "Cancel",
						click: function () {
							$(this).dialog('close');
						}
					},
						{
							text: "Clear Cart",
							click: function () {
								var content = $('.cart-item');
								content.remove();
								$('cart-content').find('.placeholder').show();
								$(this).dialog('close');
								emptyBtn.fadeOut('500');
								emptyCheckoutBtn.fadeOut('500');
								emptyText.fadeIn('500');

							}
						}
					]
				})
				return false;
			});

			// Checkout Button was pressed
			emptyCheckoutBtn.click(function () {
				$('#dialog-checkout-confirm').dialog({
					resizable: false,
					modal: true,
					buttons: [{
						text: "Cancel",
						click: function () {
							$(this).dialog('close');
						}
					},
						{
							text: "Checkout Cart",
							click: function () {

								var cartItemArr = $('.cart-item'),
									itemCount,
									itemName,
									colour;

								//alert("Number of items in cart: " + cartItemArr.length);

								cartItemArr.each(function () {

									itemCount = $(this).find('input').val();

									if (itemCount > 0) {

										itemName = $(this).find('.item-name').text();

										// For this demo we assume that the first word of the name will
										// always be the Colour!
										colour = itemName.substr(0, itemName.indexOf(' ')).toUpperCase();
										switch (colour) {

											case "BLUE":
												//alert("Item [" + colour + "] mentioned [" + itemCount + "] times");
												postColor(colour);
												break;

											case "PINK":
												//alert("Item [" + colour + "] mentioned [" + itemCount + "] times");
												postColor(colour);
												break;

											case "YELLOW":
												//alert("Item [" + colour + "] mentioned [" + itemCount + "] times");
												postColor(colour);
												break;

											case "GREEN":
												//alert("Item [" + colour + "] mentioned [" + itemCount + "] times");
												postColor(colour);
												break;

											case "RED":
												//alert("Item [" + colour + "] mentioned [" + itemCount + "] times");
												postColor(colour);
												break;

											default:
												alert("Unknown Colour. Please choose a colour as the first word in your Item name");
										}

									} else {
										alert("It's cero!");
									}

								});




								// Then let's clcean cart to start over:
								var content = $('.cart-item');
								content.remove();
								$('cart-content').find('.placeholder').show();
								$(this).dialog('close');
								emptyBtn.fadeOut('500');
								emptyCheckoutBtn.fadeOut('500');
								emptyText.fadeIn('500');
							}
						}
					]
				})
				return false;
			});


		} //end drop function
	});

}); //end document ready

function remove(el) {
	$(el).hide();
	$(el).parent().parent().fadeOut('1000');
	setTimeout(function () {
		$(el).parent().parent().remove();
	}, 1100);

	// update total item
	total_items--;
	if (total_items === 0) {
		emptyText.delay('1000').fadeIn('500');
		emptyBtn.fadeOut('500');
		emptyCheckoutBtn.fadeOut('500');
	}
}

function postColor(color) {

	if (color == null) {
		alert("Invalid color!");
		return;
	}

	var uri = "http://" + globalIPAddress + ":" + globalPort + "/sphero/color/" + color;// Sphero set colour API!

	//alert("URI is [" + uri + "]");

	// Initiating XMLHttpRequest Object:
	var http_request = initiateXMLHttpObject();
	
	sendRequest(http_request, "POST", uri, true);
}


function sendRequest(http_request, verb, uri, async) {

	//alert("Debugging on: Sending [" + uri + "] under verb [" + verb + "]");

    http_request.open(verb, uri, async);
	http_request.setRequestHeader("Accept", "application/json");
    http_request.send();

	//alert("Your message was sent successfully.");
}

function initiateXMLHttpObject() {

	// Initiating XMLHttpRequest Object:
	var http_request;

    try {
		// Opera 8.0+, Firefox, Chrome, Safari
		http_request = new XMLHttpRequest();
    } catch (e) {
		// Internet Explorer Browsers
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				// Something went wrong
				alert("Your browser broke!");
				return false;
			}
		}
    }

	return http_request;
}

var total_items = 0;

var emptyText = $('.cart-content').find('.placeholder');
var emptyBtn = $('.empty').button();
var emptyCheckoutBtn = $('.checkoutBtn').button();
var quantity = 1;

//var globalIPAddress = "10.0.0.97";
var globalIPAddress = "192.168.1.76";
var globalPort = "3001";





var domain = 'https://www.pictureroom.shop/';
var html_fragment = '.html';
var staff_ids = [457079, 457080, 457081, 457083, 457084, 457085]

var template = `
<div class="product-grid">
  <div class="row product-row flex-row">
    <% products.forEach(function(product){ %>
      <div class="product_cell col-sm-6" style="margin-bottom:36px;">
        <div class="product_cell_graphic">
          <a href="<%= domain + product.url + html_fragment %>">
            <div class="product-grid-carousel" data-alt="<%= product.title %>">
              <div class="product-carousel">
                <div class="carousel-inner" role="listbox">
                  <% product.images.forEach(function(img, index){ %>
                    <% if (index === 0){ %>
					  <div class="item active"><img src="<%= img %>" alt="<%= product.title %>"/></div>
			        <% } else { %>
                      <div class="item"><img src="<%= img %>" alt="<%= product.title %>"/></div>
                    <% } %>
			      <% }); %>
                </div>
              </div>
            </div>
          </a>
        </div>
      <div class="product_cell_label">
        <a href="<%= domain + product.url + html_fragment %>">
		<% if (product['brand-title']) { %>
        <%= product['brand-title'] %>
		  <br>
        <% } %>
          <%= product.title %>
        </a> —
        <span class="product_cell_price">
          <% if (product['price-range'].length > 1) { %>
         	 $<%= product['price-range'][0] %> - $<%= product['price-range'][1] %>
		  <% } else { %>
		    $<%= product['price-range'][0] %>
		  <% } %>
        </span>
      </div>
    </div>
    <% }); %>
    </div>
</div>
`;

var request = staff_ids.map(function(staff_id) {
  return $.getJSON(`https://mmmanyfold-api.herokuapp.com/api/lightspeed-ecom/products/tagged?tag-id=${staff_id}`);
});

$.when.apply(this, request)
  .done(function(sandeep, milah, jessica, carson, claire, christine) {
  	console.log(sandeep[0])
  	var sandeepHTML = ejs.render(template, {products: sandeep[0]});
  	var milahHTML = ejs.render(template, {products: milah[0]});
  	var jessicaHTML = ejs.render(template, {products: jessica[0]});
  	var carsonHTML = ejs.render(template, {products: carson[0]});
	  var claireHTML = ejs.render(template, {products: claire[0]});
  	var christineHTML = ejs.render(template, {products: christine[0]});
  	$('#sandeep').html(sandeepHTML);
    $('#milah').html(milahHTML);
    $('#jessica').html(jessicaHTML);
  	$('#carson').html(carsonHTML);
  	$('#claire').html(claireHTML);
  	$('#christine').html(christineHTML);
  	$('.product-carousel').each(function (index, carousel) {
			$(carousel).on('mouseenter', function() {
      	$(carousel).carousel({ interval: 750, ride: 'carousel', pause: false }).carousel('next');
			}).on('mouseleave', function () {
      	$(carousel).carousel('pause');
			});
		});
  })
  .fail(function(err) {
    console.log(err);
  });

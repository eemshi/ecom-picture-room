var domain = 'https://www.pictureroom.shop/';
var html_fragment = '.html';

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

$.getJSON('https://mmmanyfold-api.herokuapp.com/api/lightspeed-ecom/products/tagged?tag-id=447957')
  .then(function(json) {
  	var html = ejs.render(template, {products: json});
	  // compile template
  	$('#featured-works').html(html);
  // cycle on :hover
	$('.product-carousel').each(function (index, carousel) {
		$(carousel).on('mouseenter', function() {
      $(carousel).carousel({ interval: 750, ride: 'carousel', pause: false }).carousel('next');
		}).on('mouseleave', function () {
      $(carousel).carousel('pause');
		});
	});
});

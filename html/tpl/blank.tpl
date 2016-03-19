<div class="blank">
	<% if(data.img){ %>
		<img class="blank-img" src="<%=data.img %>"/>
	<% }if(data.desc){ %>
		<div class="blank-desc"><%=data.desc %></div>
	<% }if(data.detail){ %>
		<div class="blank-detail"><%=data.detail %></div>
	<% }if(data.btnTitle){ %>
		<div class="blank-btn"><%=data.btnTitle %></div>
	<% } %>
</div>
<nav class="scroller">
    <div class="scroller-pulldown">
        <span class="pulldown-label">Pull down to refresh...</span>
    </div>
    <ul class="item-list">
        <% _.each(data,function(item){ %>
            <li>
                <a href="#announcement/detail/<%- item.id %>">
                    <img class="lazy" src="../../img/grey.gif" data-original="<%- item.pic %>">
                    <span class="item-info">
                        <span class="item-info-top">
                            <span class="type">[公告类型]</span>
                            <span class="title"><%- item.name %></span>
                        </span>
                        <span class="item-info-bottom">
                            <span>发布者</span>
                            <span>2016-01-20</span>
                        </span>
                    </span>
                    <span class="item-del">垃圾桶</span>
                </a>
            </li>
        <% }) %>
    </ul>
    <div class="scroller-pullup">
        <span class="pullup-label">Pull up to refresh...</span>
    </div>
</nav>
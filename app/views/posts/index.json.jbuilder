json.posts @posts do |post|
  json.partial! "posts/post", post: post
end

json.pagination do
  json.current_page @posts.current_page
  json.total_pages @posts.total_pages
  json.total_count @posts.total_count
  json.per_page @posts.limit_value
  json.has_next_page @posts.next_page.present?
  json.has_prev_page @posts.prev_page.present?
end

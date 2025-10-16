wouter  = User.find_or_create_by!(email: "wouter@example.com") { |u| u.name = "Wouter" }
jordy = User.find_or_create_by!(email: "jordy@example.com")   { |u| u.name = "Jordy" }
joost = User.find_or_create_by!(email: "joost@example.com")   { |u| u.name = "Joost" }

first_post = Post.find_or_create_by!(user: joost, description: "I think you should hire me.")
_second_post = Post.find_or_create_by!(user: wouter, description: "I am going to win the next mario kart tournament.")

comment1 = Comment.find_or_create_by!(post: first_post, user: wouter, body: "idk yet")
comment2 = Comment.find_or_create_by!(post: first_post,  user: jordy, body: "just send me the assignment.")

first_post.likes.find_or_create_by!(user: wouter)
first_post.likes.find_or_create_by!(user: jordy)

comment1.likes.find_or_create_by!(user: wouter)
comment2.likes.find_or_create_by!(user: jordy)

require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  test "#index returns all posts" do
    create_list(:post, 3)
    get "/posts"
    assert_response :success
    assert_equal 3, json_response["posts"].count
  end

  test "#index pagination works" do
    create_list(:post, 15)

    get "/posts"
    assert_response :success
    assert_equal 10, json_response["posts"].count
    assert_equal 1, json_response["pagination"]["current_page"]
    assert_equal 2, json_response["pagination"]["total_pages"]
    assert_equal 15, json_response["pagination"]["total_count"]
    assert_equal 10, json_response["pagination"]["per_page"]
    assert json_response["pagination"]["has_next_page"]
    assert_not json_response["pagination"]["has_prev_page"]

    get "/posts?page=2"
    assert_response :success
    assert_equal 5, json_response["posts"].count
    assert_equal 2, json_response["pagination"]["current_page"]
    assert_equal 2, json_response["pagination"]["total_pages"]
    assert_equal 15, json_response["pagination"]["total_count"]
    assert_equal 10, json_response["pagination"]["per_page"]
    assert_not json_response["pagination"]["has_next_page"]
    assert json_response["pagination"]["has_prev_page"]

    get "/posts?per_page=5"
    assert_response :success
    assert_equal 5, json_response["posts"].count
    assert_equal 1, json_response["pagination"]["current_page"]
    assert_equal 3, json_response["pagination"]["total_pages"]
    assert_equal 15, json_response["pagination"]["total_count"]
    assert_equal 5, json_response["pagination"]["per_page"]
  end

  test "#index sorting works" do
    post1 = create(:post, created_at: 3.days.ago)
    create(:post, created_at: 2.days.ago)
    post3 = create(:post, created_at: 1.day.ago)

    get "/posts"
    assert_response :success
    assert_equal post3.id, json_response["posts"].first["id"]
    assert_equal post1.id, json_response["posts"].last["id"]

    get "/posts?sort=asc"
    assert_response :success
    assert_equal post1.id, json_response["posts"].first["id"]
    assert_equal post3.id, json_response["posts"].last["id"]

    get "/posts?sort=desc"
    assert_response :success
    assert_equal post3.id, json_response["posts"].first["id"]
    assert_equal post1.id, json_response["posts"].last["id"]
  end

  test "#index pagination and sorting work together" do
    posts = []
    15.times do |i|
      posts << create(:post, created_at: (15 - i).days.ago)
    end

    get "/posts?sort=asc&per_page=5"
    assert_response :success
    assert_equal 5, json_response["posts"].count
    assert_equal 1, json_response["pagination"]["current_page"]
    assert_equal 3, json_response["pagination"]["total_pages"]
    assert_equal posts.first.id, json_response["posts"].first["id"]
    assert_equal posts[4].id, json_response["posts"].last["id"]

    get "/posts?sort=asc&per_page=5&page=2"
    assert_response :success
    assert_equal 5, json_response["posts"].count
    assert_equal 2, json_response["pagination"]["current_page"]
    assert_equal posts[5].id, json_response["posts"].first["id"]
    assert_equal posts[9].id, json_response["posts"].last["id"]

    get "/posts?per_page=5"
    assert_response :success
    assert_equal 5, json_response["posts"].count
    assert_equal 1, json_response["pagination"]["current_page"]
    assert_equal posts.last.id, json_response["posts"].first["id"]
    assert_equal posts[10].id, json_response["posts"].last["id"]
  end

  test "#show returns a post" do
    post = create(:post)
    get "/posts/#{post.id}"
    assert_response :success
    assert_equal post.description, json_response["post"]["description"]
  end

  test "#show returns a post not found" do
    get "/posts/0"
    assert_response :not_found
  end

  test "#create creates a post with valid params" do
    user = create(:user)
    post "/posts", params: { description: "Hello world", user_id: user.id }
    assert_response :success
    assert_equal "Hello world", json_response["post"]["description"]
    assert_equal user.id, json_response["post"]["user"]["id"]
  end

  test "#create returns errors when description is blank" do
    post "/posts", params: { description: "" }
    assert_response :unprocessable_entity
    assert_equal "can't be blank", json_response["errors"]["description"].first
  end

  test "#create returns errors when user is not found" do
    post "/posts", params: { description: "Hello world", user_id: 0 }
    assert_response :unprocessable_entity
    assert_equal "must exist", json_response["errors"]["user"].first
  end

  test "#create returns errors when user is not present" do
    post "/posts", params: { description: "Hello world" }
    assert_response :unprocessable_entity
    assert_equal "must exist", json_response["errors"]["user"].first
  end

  test "#create creates a post with attachments" do
    user = create(:user)
    file = Rack::Test::UploadedFile.new(Rails.root.join("test/fixtures/files/test.txt"), "text/plain")
    post "/posts", params: {
      description: "Hello world with attachment",
      user_id: user.id,
      attachments: [ file ]
    }
    assert_response :success
    assert_equal "Hello world with attachment", json_response["post"]["description"]
    assert_equal 1, json_response["post"]["attachments"].count
    assert_equal "test.txt", json_response["post"]["attachments"].first["filename"]
  end

  test "#update updates a post with valid params" do
    post = create(:post)
    put "/posts/#{post.id}", params: { description: "Hello world" }
    assert_response :success
    assert_equal "Hello world", json_response["post"]["description"]
  end

  test "#update updates a post with attachments" do
    post = create(:post)
    file = Rack::Test::UploadedFile.new(Rails.root.join("test/fixtures/files/test.txt"), "text/plain")
    put "/posts/#{post.id}", params: {
      description: "Hello world with attachment",
      attachments: [ file ]
    }
    assert_response :success
    assert_equal "Hello world with attachment", json_response["post"]["description"]
    assert_equal 1, json_response["post"]["attachments"].count
    assert_equal "test.txt", json_response["post"]["attachments"].first["filename"]
  end

  test "#update returns errors when description is blank" do
    post = create(:post)
    put "/posts/#{post.id}", params: { description: "" }
    assert_response :unprocessable_entity
    assert_equal "can't be blank", json_response["errors"]["description"].first
  end

  test "#update returns errors when post is not found" do
    put "/posts/0", params: { description: "Hello world" }
    assert_response :not_found
  end

  test "#destroy destroys a post" do
    post = create(:post)
    delete "/posts/#{post.id}"
    assert_response :no_content
  end

  test "#destroy returns errors when post is not found" do
    delete "/posts/0"
    assert_response :not_found
  end
end

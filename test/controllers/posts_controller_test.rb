require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  test "#index returns all posts" do
    create_list(:post, 3)
    get "/posts"
    assert_response :success
    assert_equal 3, json_response["posts"].count
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

  test "#update updates a post with valid params" do
    post = create(:post)
    put "/posts/#{post.id}", params: { description: "Hello world" }
    assert_response :success
    assert_equal "Hello world", json_response["post"]["description"]
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

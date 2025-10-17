require "test_helper"

class CommentsControllerTest < ActionDispatch::IntegrationTest
  test "#create creates a comment with valid params" do
    user = create(:user)
    post = create(:post)
    post "/comments", params: { body: "Great post!", user_id: user.id, post_id: post.id }
    assert_response :success
    assert_equal "Great post!", json_response["comment"]["body"]
    assert_equal user.id, json_response["comment"]["user"]["id"]
    assert_equal post.id, json_response["comment"]["post"]["id"]
  end

  test "#create returns errors when body is blank" do
    post "/comments", params: { body: "" }
    assert_response :unprocessable_entity
    assert_equal "can't be blank", json_response["errors"]["body"].first
  end

  test "#create returns errors when user is not found" do
    post = create(:post)
    post "/comments", params: { body: "Great post!", user_id: 0, post_id: post.id }
    assert_response :unprocessable_entity
    assert_equal "must exist", json_response["errors"]["user"].first
  end

  test "#create returns errors when user is not present" do
    post = create(:post)
    post "/comments", params: { body: "Great post!", post_id: post.id }
    assert_response :unprocessable_entity
    assert_equal "must exist", json_response["errors"]["user"].first
  end

  test "#create returns errors when post is not found" do
    user = create(:user)
    post "/comments", params: { body: "Great post!", user_id: user.id, post_id: 0 }
    assert_response :unprocessable_entity
    assert_equal "must exist", json_response["errors"]["post"].first
  end

  test "#create returns errors when post is not present" do
    user = create(:user)
    post "/comments", params: { body: "Great post!", user_id: user.id }
    assert_response :unprocessable_entity
    assert_equal "must exist", json_response["errors"]["post"].first
  end
end

require "test_helper"

class LikesControllerTest < ActionDispatch::IntegrationTest
  test "#create creates a like for a post with valid params" do
    user = create(:user)
    post = create(:post)
    post "/likes", params: { user_id: user.id, likeable_type: "Post", likeable_id: post.id }
    assert_response :success
    assert_equal user.id, json_response["like"]["user"]["id"]
    assert_equal "Post", json_response["like"]["likeable_type"]
    assert_equal post.id, json_response["like"]["likeable_id"]
  end

  test "#create creates a like for a comment with valid params" do
    user = create(:user)
    comment = create(:comment)
    post "/likes", params: { user_id: user.id, likeable_type: "Comment", likeable_id: comment.id }
    assert_response :success
    assert_equal user.id, json_response["like"]["user"]["id"]
    assert_equal "Comment", json_response["like"]["likeable_type"]
    assert_equal comment.id, json_response["like"]["likeable_id"]
  end

  test "#create returns errors when user is not found" do
    post = create(:post)
    post "/likes", params: { user_id: 0, likeable_type: "Post", likeable_id: post.id }
    assert_response :unprocessable_entity
    assert_equal "must exist", json_response["errors"]["user"].first
  end

  test "#create returns errors when user is not present" do
    post = create(:post)
    post "/likes", params: { likeable_type: "Post", likeable_id: post.id }
    assert_response :unprocessable_entity
    assert_equal "must exist", json_response["errors"]["user"].first
  end

  test "#create returns errors when likeable is not found" do
    user = create(:user)
    post "/likes", params: { user_id: user.id, likeable_type: "Post", likeable_id: 0 }
    assert_response :unprocessable_entity
    assert_equal "must exist", json_response["errors"]["likeable"].first
  end

  test "#create returns errors when likeable is not present" do
    user = create(:user)
    post "/likes", params: { user_id: user.id }
    assert_response :unprocessable_entity
    assert_equal "must exist", json_response["errors"]["likeable"].first
  end


  test "#create returns errors when user tries to like the same post twice" do
    user = create(:user)
    post = create(:post)
    create(:like, user: user, likeable: post)

    post "/likes", params: { user_id: user.id, likeable_type: "Post", likeable_id: post.id }
    assert_response :unprocessable_entity
    assert_equal "has already liked this item", json_response["errors"]["user_id"].first
  end

  test "#create returns errors when user tries to like the same comment twice" do
    user = create(:user)
    comment = create(:comment)
    create(:like, user: user, likeable: comment)

    post "/likes", params: { user_id: user.id, likeable_type: "Comment", likeable_id: comment.id }
    assert_response :unprocessable_entity
    assert_equal "has already liked this item", json_response["errors"]["user_id"].first
  end

  test "#destroy removes a like for a post" do
    user = create(:user)
    post = create(:post)
    like = create(:like, user: user, likeable: post)

    delete "/likes/#{like.id}"
    assert_response :no_content
    assert_not Like.exists?(like.id)
  end

  test "#destroy removes a like for a comment" do
    user = create(:user)
    comment = create(:comment)
    like = create(:like, user: user, likeable: comment)

    delete "/likes/#{like.id}"
    assert_response :no_content
    assert_not Like.exists?(like.id)
  end

  test "#destroy returns no content when like doesn't exist" do
    delete "/likes/999"
    assert_response :no_content
  end
end

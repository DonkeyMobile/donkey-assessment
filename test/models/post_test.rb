require "test_helper"

class PostTest < ActiveSupport::TestCase
  test "post without user or description is invalid" do
    post = build(:post, user: nil, description: nil)
    assert_not post.valid?
    assert_includes post.errors.attribute_names, :user
    assert_includes post.errors.attribute_names, :description
  end

  test "post is likable" do
    post = create(:post)
    create(:like, likeable: post)
    assert_equal 1, post.likes.count
  end

  test "post can have multiple comments" do
    post = create(:post)
    create_list(:comment, 3, post: post)
    assert_equal 3, post.comments.count
  end
end

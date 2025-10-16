require "test_helper"

class CommentTest < ActiveSupport::TestCase
  test "comment without user, post, or body is invalid" do
    comment = build(:comment, user: nil, post: nil, body: nil)
    assert_not comment.valid?
    assert_includes comment.errors.attribute_names, :user
    assert_includes comment.errors.attribute_names, :post
    assert_includes comment.errors.attribute_names, :body
  end

  test "comment is likable" do
    comment = create(:comment)
    create(:like, likeable: comment)
    assert_equal 1, comment.likes.count
  end
end

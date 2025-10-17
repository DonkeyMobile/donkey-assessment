require "test_helper"

class LikeTest < ActiveSupport::TestCase
  test "like without user or likeable is invalid" do
    like = build(:like, user: nil, likeable: nil)
    assert_not like.valid?
    assert_includes like.errors.attribute_names, :user
    assert_includes like.errors.attribute_names, :likeable
  end

  test "like is unique per user and likeable" do
    post = create(:post)
    user = create(:user)

    create(:like, user: user, likeable: post)
    duplicate_like = build(:like, user: user, likeable: post)
    assert_not duplicate_like.valid?
  end

  test "user cannot like their own post" do
    user = create(:user)
    post = create(:post, user: user)

    like = build(:like, user: user, likeable: post)
    assert_not like.valid?
    assert_equal "cannot like their own content", like.errors[:user].first
  end

  test "user cannot like their own comment" do
    user = create(:user)
    post = create(:post)
    comment = create(:comment, user: user, post: post)

    like = build(:like, user: user, likeable: comment)
    assert_not like.valid?
    assert_equal "cannot like their own content", like.errors[:user].first
  end

  test "user can like other users' posts" do
    user1 = create(:user)
    user2 = create(:user)
    post = create(:post, user: user1)

    like = build(:like, user: user2, likeable: post)
    assert like.valid?
  end

  test "user can like other users' comments" do
    user1 = create(:user)
    user2 = create(:user)
    post = create(:post)
    comment = create(:comment, user: user1, post: post)

    like = build(:like, user: user2, likeable: comment)
    assert like.valid?
  end
end

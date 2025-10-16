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
end

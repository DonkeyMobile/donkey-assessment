require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "user without email is invalid" do
    user = build(:user, email: nil)
    assert_not user.valid?
    assert_includes user.errors.attribute_names, :email
  end

  test "user email is unique" do
    create(:user, email: "dup@example.com")
    user = build(:user, email: "dup@example.com")
    assert_not user.valid?
    assert_includes user.errors.attribute_names, :email
  end
end

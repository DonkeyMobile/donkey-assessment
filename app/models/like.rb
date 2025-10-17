class Like < ApplicationRecord
  belongs_to :user
  belongs_to :likeable, polymorphic: true

  validates :user_id, uniqueness: { 
    scope: %i[likeable_type likeable_id], 
    message: "has already liked this item" 
  }
  validate :user_cannot_like_own_content

  private

  def user_cannot_like_own_content
    return unless user && likeable

    if likeable.respond_to?(:user) && likeable.user == user
      errors.add(:user, "cannot like their own content")
    end
  end
end

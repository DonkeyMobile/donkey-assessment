FactoryBot.define do
  factory :comment do
    association :post
    association :user
    body { "A sample comment" }
  end
end

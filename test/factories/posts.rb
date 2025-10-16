FactoryBot.define do
  factory :post do
    association :user
    description { "A sample post" }
  end
end

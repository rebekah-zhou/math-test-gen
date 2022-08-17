require 'rails_helper'

# RSpec.describe Question, type: :model do
#   # pending "add some examples to (or delete) #{__FILE__}"
#   it 'rand_operation returns a valid operation' do
#     expect {Question.create_onestep_equation.rand_operation}.to 
#   end
# end

RSpec.describe Question, type: :model do
    question = Question.new(standard_id: 1, section_id: 1)
    equation_obj = question.create_onestep_equation
  it "should have a valid operation" do
    expect(equation_obj[:operation]).to be_in(['+', '-', '*', '/'])
  end
  it "should have a random letter as a variable in the equation" do
    expect(equation_obj[:equation][0]).to be_in(('a'..'z'))
  end
  it "should have the correct answer" do
    if equation_obj[:operation] == "/"
      expect(equation_obj[:num] / equation_obj[:int1]).to eq(equation_obj[:int2])
    elsif equation_obj[:operation] == "+"
      expect(equation_obj[:int1] + equation_obj[:int2]).to eq(equation_obj[:num])
    elsif equation_obj[:operation] == "*"
      expect(equation_obj[:int1] * equation_obj[:int2]).to eq(equation_obj[:num])
    elsif equation_obj[:operation] == "-"
      expect(equation_obj[:int1] - equation_obj[:int2]).to eq(equation_obj[:num])
    end
  end

end

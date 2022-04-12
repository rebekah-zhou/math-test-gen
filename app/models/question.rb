class Question < ApplicationRecord
  belongs_to :section
  belongs_to :standard
  has_many :answers

  def letter=(rand_letter) 
    @letter=rand_letter
  end

  def letter
    @letter
  end

  def create_onestep_equation
    @letter = rand_letter
    @operation = rand_operation
    @int1 = rand_int_easy
    @int2 = rand_int_easy
    
    @num = case @operation
    when "+"
      add(@int1, @int2)
    when "-"
      subtract(@int1, @int2)
    else
      multiply(@int1, @int2)
    end



    if @operation == '/'
      return {num: @num, operation: @operation, int1: @int1, int2: @int2,
      equation: "#{@letter} #{@operation} #{@int1} = #{@int2}"}
    else
      return {num: @num, operation: @operation, int1: @int1, int2: @int2,
      equation: "#{@letter} #{@operation} #{@int2} = #{@num}"}
    end

  end

  def rand_operation
    ['+', '-', '*', '/'].sample
  end

  def rand_letter
    ('a'..'z').to_a.sample
  end

  def rand_int_easy
    rand 1..12
  end

  def add(x, y)
    x+y
  end

  def subtract(x, y)
    x-y
  end

  def multiply(x, y)
    x*y
  end
end

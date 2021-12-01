defmodule AOC do
  def start do
    IO.puts "Elixir"
    if System.get_env("part") == "part1" do
      readlines() |> getSolutionPart1() |> IO.puts
    else
      readlines() |> getSolutionPart2() |> IO.puts
    end
  end

  def getSolutionPart1(list) do
    Enum.with_index(list)
      |> Enum.filter(fn {n, _index} -> prime?(n) end)
      |> Enum.map(fn {n, index} -> n * index end)
      |> Enum.sum
  end

  def getSolutionPart2(list) do
    Enum.with_index(list)
      |> Enum.reject(fn {n, _index} -> prime?(n) end)
      |> Enum.map(fn {n, index} -> if rem(index, 2) == 0, do: n, else: -n end)
      |> Enum.sum
  end

  def readlines do
    File.read!("./input.txt")
      |> String.split
      |> Enum.map(&String.to_integer/1)
  end

  def prime?(x) do
    if x < 2 do
      false
    else
      divisor_of_x? = fn a -> rem(x, a) == 0 end
      (2..x |> Enum.filter(divisor_of_x?) |> length) == 1
    end
  end
end

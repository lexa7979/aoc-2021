defmodule AOC do
  def start() do
    if System.get_env("part") == "part1", do: getSolutionPart1(), else: getSolutionPart2()
  end

  defp getSolutionPart1() do
    readlines()
      |> Enum.with_index
      |> Enum.filter(fn {n, _index} -> prime?(n) end)
      |> Enum.map(fn {n, index} -> n * index end)
      |> Enum.sum
  end

  defp getSolutionPart2() do
    readlines()
      |> Enum.with_index
      |> Enum.filter(fn {n, _index} -> !prime?(n) end)
      |> Enum.map(fn {n, index} -> if rem(index, 2) == 0, do: n, else: -n end)
      |> Enum.sum
  end

  defp readlines() do
    File.read!("./input.txt")
      |> String.split
      |> Enum.map(&String.to_integer/1)
  end

  defp prime?(x) do
    if x < 2 do
      false
    else
      divisor_of_x? = fn a -> rem(x, a) == 0 end
      (2..x |> Enum.filter(divisor_of_x?) |> length) == 1
    end
  end
end

IO.puts "Elixir"
IO.puts AOC.start

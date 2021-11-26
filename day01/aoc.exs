defmodule AOC do
  def start(), do: if System.get_env("part") == "part1", do: getSolutionPart1(), else: getSolutionPart2()
  defp getSolutionPart1(), do: readlines() |> Enum.with_index |> Enum.filter(fn {n, _index} -> prime?(n) end) |> Enum.map(fn {n, index} -> n * index end) |> Enum.sum
  defp getSolutionPart2(), do: readlines() |> Enum.with_index |> Enum.reject(fn {n, _index} -> prime?(n) end) |> Enum.map(fn {n, index} -> if rem(index, 2) == 0, do: n, else: -n end) |> Enum.sum
  defp readlines(), do: File.read!("./input.txt") |> String.split |> Enum.map(&String.to_integer/1)
  defp prime?(x), do: if x < 2, do: false, else: (2..x |> Enum.filter(fn a -> rem(x, a) == 0 end) |> length) == 1
end
IO.puts ["Elixir", AOC.start] |> Enum.join("\n")

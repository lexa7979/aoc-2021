ExUnit.start(trace: true)

defmodule AOCTest do
  use ExUnit.Case, async: true

  def assert_is(received, expected), do: assert received == expected

  def getTestInput(target \\ nil) do
    case target do
      "three primes" -> [3, 5, 7]
      "three non-primes" -> [4, 6, 9]
      "one to ten" -> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      _ -> [814, 868, 139, 729, 968, 92, 251, 137, 646, 919, 766, 934, 762, 158, 479, 81]
    end
  end

  describe "getSolutionPart1" do
    test "works as expected on test-data" do
      getTestInput("three primes") |> AOC.getSolutionPart1 |> assert_is(19)
      getTestInput("three non-primes") |> AOC.getSolutionPart1 |> assert_is(0)
      getTestInput("one to ten") |> AOC.getSolutionPart1 |> assert_is(70)
    end
    test "works as expected on input.txt" do
      AOC.readlines |> AOC.getSolutionPart1 |> assert_is(3590905)
    end
  end

  describe "getSolutionPart2" do
    test "works as expected on test-data" do
      getTestInput("three primes") |> AOC.getSolutionPart2 |> assert_is(0)
      getTestInput("three non-primes") |> AOC.getSolutionPart2 |> assert_is(7)
      getTestInput("one to ten") |> AOC.getSolutionPart2 |> assert_is(-18)
    end
    test "works as expected on input.txt" do
      AOC.readlines |> AOC.getSolutionPart2 |> assert_is(1047)
    end
  end
end

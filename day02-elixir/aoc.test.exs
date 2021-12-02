ExUnit.start(trace: true)

defmodule AOCTest do
  use ExUnit.Case, async: true

  def assert_is(received, expected), do: assert received == expected

  def getTestInput(_target \\ nil) do
    [
      "forward 5",
      "down 5",
      "forward 8",
      "up 3",
      "down 8",
      "forward 2",
    ]
  end

  describe "getSolutionPart1" do
    test "works as expected on test-data" do
      getTestInput() |> AOC.getSolutionPart1 |> assert_is(150)
    end
    test "works as expected on input.txt" do
      AOC.readlines |> AOC.getSolutionPart1 |> assert_is(2150351)
    end
  end

  describe "getSolutionPart2" do
    test "works as expected on test-data" do
      getTestInput() |> AOC.getSolutionPart2 |> assert_is(900)
    end
    test "works as expected on input.txt" do
      AOC.readlines |> AOC.getSolutionPart2 |> assert_is(1842742223)
    end
  end
end

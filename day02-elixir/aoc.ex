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
    parsed = parseCommands(list)
    getHorizontal(parsed) * getDepth(parsed)
  end

  def getSolutionPart2(list) do
    parsed = parseCommands(list)
    getProductOfPositionsWithAiming(parsed)
  end

  def parseCommands(list) do
    list
      |> Enum.map(fn text -> Regex.split(~r{ }, text) end)
      |> Enum.map(fn [command, valueText] -> [command, String.to_integer(valueText)] end)
  end

  def getHorizontal(parsed) do
    parsed
      |> Enum.filter(fn [command, _value] -> command == "forward" end)
      |> Enum.map(fn [_command, value] -> value end)
      |> Enum.sum
  end

  def getDepth(parsed) do
    downTotal = parsed
      |> Enum.filter(fn [command, _value] -> command == "down" end)
      |> Enum.map(fn [_command, value] -> value end)
      |> Enum.sum
    upTotal = parsed
      |> Enum.filter(fn [command, _value] -> command == "up" end)
      |> Enum.map(fn [_command, value] -> value end)
      |> Enum.sum
    downTotal - upTotal
  end

  def getProductOfPositionsWithAiming(parsed) do
    [horizontal, depth, _aim] = parsed
      |> Enum.reduce(
        [0, 0, 0],
        fn [command, value], [horizontal, depth, aim] ->
          case command do
            "down" -> [horizontal, depth, aim + value]
            "up" -> [horizontal, depth, aim - value]
            "forward" -> [horizontal + value, depth + value * aim, aim]
          end
        end
      )
    horizontal * depth
  end

  def readlines do
    File.read!("./input.txt")
      |> String.split("\n")
      # |> Enum.map(&String.to_integer/1)
  end
end

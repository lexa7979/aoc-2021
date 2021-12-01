package aoc;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Collectors;

public class App {
  public static void main(String[] args) throws IOException {
    System.out.println("Java");

    List <Integer> input = parseInput("input.txt");
    String part = System.getenv("part").equals("part1") ? "part1" : "part2";

    if (part.equals("part1")) {
      System.out.println(new App(input).getSolutionPart1());
    } else {
      System.out.println(new App(input).getSolutionPart2());
    }
  }

  private final List<Integer> input;

  public App(List<Integer> input) {
    this.input = input;
  }

  private static List<Integer> parseInput(String filename) throws IOException {
    return Files.lines(Path.of(filename))
      .map(Integer::parseInt)
      .collect(Collectors.toList());
  }

  public Integer getSolutionPart1() {
    return sumOfProductsPrimesWithIndex(input);
    // return input.stream().mapToInt(Integer::intValue).sum();
  }

  public Integer getSolutionPart2() {
    return sumOfNonPrimesWithAlternatingSigns(input);
    // return input.stream().mapToInt(Integer::intValue).reduce(1, Math::multiplyExact);
  }

  public static Integer sumOfProductsPrimesWithIndex(List<Integer> numbers) {
    int result = 0;
    for (int index = 0; index < numbers.size(); index++) {
      if (isPrime(numbers.get(index))) {
        result += numbers.get(index) * index;
      }
    }
    return result;
  }

  public static Integer sumOfNonPrimesWithAlternatingSigns(List<Integer> numbers) {
    int result = 0;
    for (int index = 0; index < numbers.size(); index++) {
      if (!isPrime(numbers.get(index))) {
        if (index % 2 == 0) {
          result += numbers.get(index);
        } else {
          result -= numbers.get(index);
        }
      }
    }
    return result;
  }

  public static boolean isPrime(Integer number) {
    if (number < 3) {
      return number == 2;
    }

    Integer lastDivisorTest = (int) Math.floor(Math.sqrt(number));

    for (Integer divisor = 2; divisor <= lastDivisorTest; divisor++) {
      if (number % divisor == 0) {
        return false;
      }
    }

    return true;
  }
}

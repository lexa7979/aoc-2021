package aoc;
import aoc.App;

import java.util.List;
import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertArrayEquals;

@DisplayName("aoc.app has a method sumOfProductsPrimesWithIndex() which")
class AppTestsAboutSumOfProductsPrimesWithIndex {
  @Test
  @DisplayName("works as expected")
  void worksAsExpected() {
    assertEquals(App.sumOfProductsPrimesWithIndex(new ArrayList<Integer>(List.of(1, 2, 3, 4))), 2 * 1 + 3 * 2);
    assertEquals(App.sumOfProductsPrimesWithIndex(new ArrayList<Integer>(List.of(3, 6, 9, 11, 13))), 11 * 3 + 13 * 4);
  }
}

@DisplayName("aoc.app has a method sumOfNonPrimesWithAlternatingSigns() which")
class AppTestsAboutSumOfNonPrimesWithAlternatingSigns {
  @Test
  @DisplayName("works as expected")
  void worksAsExpected() {
    int result1 = App.sumOfNonPrimesWithAlternatingSigns(new ArrayList<Integer>(List.of(1, 2, 3, 4)));
    assertEquals(result1, 1 - 4);

    int result2 = App.sumOfNonPrimesWithAlternatingSigns(new ArrayList<Integer>(List.of(3, 6, 9, 11, 13)));
    assertEquals(result2, -6 + 9);
  }
}

@DisplayName("aoc.App has a method isPrime() which")
class AppTestsAboutIsPrime {
  @Test
  @DisplayName("can be used to collect all primes up till 200")
  void collectPrimes() {
    List<String> receivedPrimes = new ArrayList<String>();
    String expectedPrimes = "2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199";
    for (int i = 0; i <= 200; i++) {
      if (App.isPrime(i)) {
        receivedPrimes.add(Integer.toString(i));
      }
    }
    assertEquals(String.join(",", receivedPrimes), expectedPrimes);
  }
}

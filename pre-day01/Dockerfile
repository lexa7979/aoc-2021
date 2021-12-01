FROM elixir:1.12-alpine
COPY ["./aoc.ex", "./input.txt", "./"]
RUN elixirc aoc.ex
CMD elixir -e AOC.start

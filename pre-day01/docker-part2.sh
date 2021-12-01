#!/bin/bash

docker build -t aoc2021-day01-elixir . && time docker run -e part=part2 aoc2021-day01-elixir

#!/bin/bash

elixirc --ignore-module-conflict aoc.ex && elixir aoc.test.exs

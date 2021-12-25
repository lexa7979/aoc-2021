
inp w
w = A
x = 0
y = 0
z = 0

x = 1
y = A + 12
z = A + 12

# mul x 0
# add x z
# mod x 26
# div z 1
# add x 14
# eql x w
# eql x 0
# mul y 0
# add y 25
# mul y x
# add y 1
# mul z y
# mul y 0
# add y w
# add y 12
# mul y x
# add z y

#############################

inp w

w = B
x = 1
y = 8 + B
z = 320 + 26 * A + B

# mul x 0
# add x z
# mod x 26
# div z 1
# add x 11
# eql x w
# eql x 0
# mul y 0
# add y 25
# mul y x
# add y 1
# mul z y
# mul y 0
# add y w
# add y 8
# mul y x
# add z y

#############################

inp w

w = C
x = 1
y = C + 7
z = 8327 + 676 * A + 26 * B + C

# mul x 0
# add x z
# mod x 26
# div z 1
# add x 11
# eql x w
# eql x 0
# mul y 0
# add y 25
# mul y x
# add y 1
# mul z y
# mul y 0
# add y w
# add y 7
# mul y x
# add z y

##########################

inp w

w = D
x = 1
y = D + 4
z = 26 * 26 * 320 + 26 * 7 + 26 * 26 * 26 * A + 26 * 26 * B + 26 * C + D + 4

# mul x 0
# add x z
# mod x 26
# div z 1
# add x 14
# eql x w
# eql x 0
# mul y 0
# add y 25
# mul y x
# add y 1
# mul z y
# mul y 0
# add y w
# add y 4
# mul y x
# add z y

##########################

inp w

(E + 7 = D) ?
  w = E
  x = 0
  y = 0
  z = 26 * 320 + 7 + 26 * 26 * A + 26 * B + C

(E + 7 != D) ?
  w = E
  x = 1
  y = E + 4
  z = 26 * 26 * 320 + 26 * 7 + 4 + 26 * 26 * 26 * A + 26 * 26 * B + 26 * C + E

# mul x 0
# add x z
# mod x 26
# div z 26
# add x -11
# > eql x w
# eql x 0
# mul y 0
# add y 25
# mul y x
# add y 1
# mul z y
# mul y 0
# add y w
# add y 4
# mul y x
# add z y

##############################

inp w

(E + 7 = D) ?
  w = F
  x = 1
  y = F + 1
  z = 26 * 26 * 320 + 26 * 7 + 26 * 26 * 26 * A + 26 * 26 * B + 26 * C + F + 1

# mul x 0
# add x z
# mod x 26
# div z 1
# add x 12
# eql x w
# eql x 0
# mul y 0
# add y 25
# mul y x
# add y 1
# mul z y
# mul y 0
# add y w
# add y 1
# mul y x
# add z y

####################################

inp w

(E + 7 = D, F = G) ?
  w = G
  x = 0
  y = 0
  z = 26 * 320 + 7 + 26 * 26 * A + 26 * B + C

(E + 7 = D, F != G) ?
  w = G
  x = 1
  y = G + 10
  z = 26 * 26 * 320 + 26 * 7 + 26 * 26 * 26 * A + 26 * 26 * B + 26 * C + G + 10

# mul x 0
# add x z
# mod x 26
# div z 26
# add x -1
# eql x w
# eql x 0
# mul y 0
# add y 25
# mul y x
# add y 1
# mul z y
# mul y 0
# add y w
# add y 10
# mul y x
# add z y

#####################################

inp w

(E + 7 = D, F = G) ?
  w = H
  x = 1
  y = H + 8
  z = 26 * 26 * 320 + 26 * 7 + 26 * 26 * 26 * A + 26 * 26 * B + 26 * C + H + 8

# mul x 0
# add x z
# mod x 26
# div z 1
# add x 10
# eql x w
# eql x 0
# mul y 0
# add y 25
# mul y x
# add y 1
# mul z y
# mul y 0
# add y w
# add y 8
# mul y x
# add z y

#######################################

inp w

(E + 7 == D, F == G, H + 5 == I) ?
  w = I
  x = 0
  y = 0
  z = 26 * 320 + 7 + 26 * 26 * A + 26 * B + C

(E + 7 == D, F == G, H + 5 != I) ?
  w = I
  x = 1
  y = I + 12
  z = 26 * 26 * 320 + 26 * 7 + 26 * 26 * 26 * A + 26 * 26 * B + 26 * C + I + 12

# mul x 0
# add x z
# mod x 26
# div z 26
# add x -3
# eql x w
# eql x 0
# mul y 0
# add y 25
# mul y x
# add y 1
# mul z y
# mul y 0
# add y w
# add y 12
# mul y x
# add z y

##########################################

inp w

(E + 7 == D, F == G, H + 5 == I, C + 3 == J) ?
  w = J
  x = 0
  y = 0
  z = 320 + 26 * A + B

(E + 7 == D, F == G, H + 5 == I, C + 3 != J) ?
  w = J
  x = 1
  y = J + 10
  z = 26 * 320 + 26 * 26 * A + 26 * B + J + 10

# mul x 0
# add x z
# mod x 26
# div z 26
# add x -4
# eql x w
# eql x 0
# mul y 0
# add y 25
# mul y x
# add y 1
# mul z y
# mul y 0
# add y w
# add y 10
# mul y x
# add z y

#########################################

inp w

(E + 7 == D, F == G, H + 5 == I, C + 3 == J, B - 5 == K) ?
  w = K
  x = 0
  y = 0
  z = A + 12

(E + 7 == D, F == G, H + 5 == I, C + 3 == J, B - 5 != K) ?
  w = K
  x = 1
  y = K + 15
  z = 26 * A + K + 26 * 12 + 15

# mul x 0
# add x z
# mod x 26
# div z 26
# add x -13
# eql x w
# eql x 0
# mul y 0
# add y 25
# mul y x
# add y 1
# mul z y
# mul y 0
# add y w
# add y 15
# mul y x
# add z y

##############################################

inp w

(E + 7 == D, F == G, H + 5 == I, C + 3 == J, B - 5 == K, A + 4 == L) ?
  w = L
  x = 0
  y = 0
  z = 0

(E + 7 == D, F == G, H + 5 == I, C + 3 == J, B - 5 == K, A + 4 != L) ?
  w = L
  x = 1
  y = L + 4
  z = L + 4

(E + 7 == D, F == G, H + 5 == I, C + 3 == J, B - 5 != K) ?
  w = L
  x = 1
  y = L + 4
  z = 26 * A + L + 26 * 12 + 4

# mul x 0
# add x z
# mod x 26
# div z 26
# add x -8
# eql x w
# eql x 0
# mul y 0
# add y 25
# mul y x
# add y 1
# mul z y
# mul y 0
# add y w
# add y 4
# mul y x
# add z y

##################################################

inp w

(E + 7 == D, F == G, H + 5 == I, C + 3 == J, B - 5 == K, A + 4 == L) ?
  w = M
  x = 1
  y = M + 10
  z = M + 10

# mul x 0
# add x z
# mod x 26
# div z 1
# add x 13
# eql x w
# eql x 0
# mul y 0
# add y 25
# mul y x
# add y 1
# mul z y
# mul y 0
# add y w
# add y 10
# mul y x
# add z y

#################################################

inp w

(E + 7 == D, F == G, H + 5 == I, C + 3 == J, B - 5 == K, A + 4 == L, M - 1 == N) ?
  w = N
  x = 0
  y = 0
  z = 0

(E + 7 == D, F == G, H + 5 == I, C + 3 == J, B - 5 == K, A + 4 == L, M - 1 != N) ?
  w = N
  x = 1
  y = N + 9
  z = N + 9

# mul x 0
# add x z
# mod x 26
# div z 26
# add x -11
# eql x w
# eql x 0
# mul y 0
# add y 25
# mul y x
# add y 1
# mul z y
# mul y 0
# add y w
# add y 9
# mul y x
# add z y

class Cuboid {
  constructor(startX, endX, startY, endY, startZ, endZ) {
    this.startX = startX;
    this.endX = endX;
    this.startY = startY;
    this.endY = endY;
    this.startZ = startZ;
    this.endZ = endZ;
  }

  listPoints() {
    const points = [];
    for (let x = this.startX; x <= this.endX; x++) {
      for (let y = this.startY; y <= this.endY; y++) {
        for (let z = this.startZ; z <= this.endZ; z++) {
          points.push(`${x},${y},${z}`);
        }
      }
    }
    return points;
  }

  getSize() {
    return (this.endX - this.startX + 1) * (this.endY - this.startY + 1) * (this.endZ - this.startZ + 1);
  }

  getResultsAfterSubtraction(cuboidToSubtract) {
    if (cuboidToSubtract.endX < this.startX || cuboidToSubtract.startX > this.endX) {
      if (cuboidToSubtract.endY < this.startY || cuboidToSubtract.startY > this.endY) {
        if (cuboidToSubtract.endZ < this.startZ || cuboidToSubtract.startZ > this.endZ) {
          return null;
        }
      }
    }

    const _getInsideRange = (start, end) => tuple => {
      const result = [Math.max(tuple[0], start), Math.min(tuple[1], end)];
      return result[0] > result[1] ? null : result;
    };
    const _getInsideRangeX = _getInsideRange(this.startX, this.endX);
    const _getInsideRangeY = _getInsideRange(this.startY, this.endY);
    const _getInsideRangeZ = _getInsideRange(this.startZ, this.endZ);

    const xRanges = {
      before: _getInsideRangeX([this.startX, cuboidToSubtract.startX - 1]),
      removed: _getInsideRangeX([cuboidToSubtract.startX, cuboidToSubtract.endX]),
      after: _getInsideRangeX([cuboidToSubtract.endX + 1, this.endX]),
    };
    const yRanges = {
      before: _getInsideRangeY([this.startY, cuboidToSubtract.startY - 1]),
      removed: _getInsideRangeY([cuboidToSubtract.startY, cuboidToSubtract.endY]),
      after: _getInsideRangeY([cuboidToSubtract.endY + 1, this.endY]),
    };
    const zRanges = {
      before: _getInsideRangeZ([this.startZ, cuboidToSubtract.startZ - 1]),
      removed: _getInsideRangeZ([cuboidToSubtract.startZ, cuboidToSubtract.endZ]),
      after: _getInsideRangeZ([cuboidToSubtract.endZ + 1, this.endZ]),
    };

    const results = [];

    if (xRanges.before) {
      results.push(new Cuboid(xRanges.before[0], xRanges.before[1], this.startY, this.endY, this.startZ, this.endZ));
    }
    if (xRanges.removed && yRanges.before) {
      results.push(
        new Cuboid(xRanges.removed[0], xRanges.removed[1], yRanges.before[0], yRanges.before[1], this.startZ, this.endZ)
      );
    }
    if (xRanges.removed && yRanges.removed && zRanges.before) {
      results.push(
        new Cuboid(
          xRanges.removed[0],
          xRanges.removed[1],
          yRanges.removed[0],
          yRanges.removed[1],
          zRanges.before[0],
          zRanges.before[1]
        )
      );
    }
    if (xRanges.removed && yRanges.removed && zRanges.after) {
      results.push(
        new Cuboid(
          xRanges.removed[0],
          xRanges.removed[1],
          yRanges.removed[0],
          yRanges.removed[1],
          zRanges.after[0],
          zRanges.after[1]
        )
      );
    }
    if (yRanges.after && xRanges.removed) {
      results.push(
        new Cuboid(xRanges.removed[0], xRanges.removed[1], yRanges.after[0], yRanges.after[1], this.startZ, this.endZ)
      );
    }
    if (xRanges.after) {
      results.push(new Cuboid(xRanges.after[0], xRanges.after[1], this.startY, this.endY, this.startZ, this.endZ));
    }

    return results;
  }
}

module.exports = Cuboid;

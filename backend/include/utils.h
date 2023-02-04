#pragma once
#include <cmath>

int randInt(const int minV = 0, const int maxV = 10) {
  return (int)rand() % (maxV + 1) + minV;
}

double randReal(const double minV = 0.0, const double maxV = 1.0) {
  return minV + ((double)rand() / RAND_MAX) * (maxV - minV);
}

void printGrid(std::vector<std::vector<int>> &spins) {
  for (int i = 0; i < spins.size(); i++) {
    for (int j = 0; j < spins[i].size(); j++)
      std::cout << spins[i][j] << " ";
    std::cout << std::endl;
  }
}
bool save_grid(std::vector<std::vector<int>> &spins) {

  std::ofstream spins_file;
  spins_file.open("output/spins.txt", std::ofstream::app);

  for (int r = 0; r < spins.size(); r++) {
    for (int c = 0; c < spins.size(); c++) {
      if (spins[r][c] == -1) {
        spins_file << "0";
      } else {
        spins_file << spins[r][c];
      }
    }
  }
  spins_file << std::endl;

  spins_file.close();
  return true;
}

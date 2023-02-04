#pragma once
#include "isingModel.h"

/**
 * @brief Class represeting square lattice in Ising Model
 *
 */
class SquareGridModel : public isingModel {
public:
  std::vector<std::vector<double>> spins;

 

  SquareGridModel(double grid_size, int iterations, double JA, double JAD,
                  double spins_con)
      : isingModel(grid_size, iterations, JA, JAD, spins_con) {
    std::cout << JA << std::endl;
    std::cout << _JA << std::endl;
  }

  ~SquareGridModel() {}

  void generateSpins() override;

  double avgMagnetism() override;

  void randomMoves(double T, double iter) override;

  double avgEnergy() override;

  double totalEnergy() override;

  void metropolisConst(double const_temp) override;

  void metropolisMutable(double T1, double T2, double temp_step) override;

  double spinEnergy(int x, int y);

  void saveGrid();
};
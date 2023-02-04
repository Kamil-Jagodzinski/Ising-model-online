#pragma once
#include "isingModel.h"

class HexGridModel : public isingModel {
public:
  class Entity {
  public:
    Entity() = default;
    Entity(int spins_config) {
      if (spins_config == 1) {
        double rands = ((double)rand() / RAND_MAX);
        if (rands < 0.5) {
          spinA = 1;
          spinB = 1;
        } else {
          spinA = -1;
          spinB = -1;
        }

      } else if (spins_config == 2) {

        srand(time(NULL));
        std::mt19937 generator(std::random_device{}());
        std::uniform_int_distribution<std::size_t> distribution(
            0, a_list.size() - 1);
        std::size_t number = distribution(generator);
        spinA = a_list[number];

        std::mt19937 generator2(std::random_device{}());
        std::uniform_int_distribution<std::size_t> distribution2(
            0, s_list.size() - 1);
        std::size_t number2 = distribution2(generator2);
        spinB = s_list[number2];

        // std::cout << spinA << std::endl;
        // std::cout << spinB << std::endl;
      }
    }
    double spinA;
    double spinB;
    std::vector<double> s_list{-2.5, -1.5, -0.5, 0.5, 1.5, 2.5};
    std::vector<double> a_list{-2, -1, 0, 1, 2};
  };

  std::vector<std::vector<std::vector<Entity>>> spins;

  HexGridModel(double grid_size, double grid_deep, int iterations, double JAA,
               double JBB, double JAB, double JDA, double JDB, double spins_con)
      : isingModel(grid_size, grid_deep, iterations, JAA, JBB, JAB, JDA, JDB,
                   spins_con) {}

  ~HexGridModel() {}

  void generateSpins() override;

  double avgMagnetism() override;

  void randomMoves(double T, double iter) override;

  double avgEnergy() override;

  double totalEnergy() override;

  void metropolisConst(double const_temp) override;

  void metropolisMutable(double T1, double T2, double temp_step) override;

  double spinEnergy(int x, int y, int l, int which_atom);

  void saveGrid();
};

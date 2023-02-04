#pragma once
#include <cmath>
#include <fstream>
#include <iostream>
#include <random>
#include <string>
#include <vector>

class isingModel {
public:
  double _grid_size;
  int _spins_config;
  double _JA;
  double _JAD;
  double _iterations;
  double _grid_deep;

  double _JAA;
  double _JBB;
  double _JAB;

  double _JDA;
  double _JDB;

  std::vector<double> _magnetization;
  std::vector<double> _avg_energy;
  std::vector<double> _iter_number;
  std::vector<double> _grid_spins;

  std::vector<double> _mutable_energy;
  std::vector<double> _mutable_magnetization;
  std::vector<double> _mutable_specificHeat;
  std::vector<double> _mutable_magneticSusceptibility;
  std::vector<double> _mutable_temperature;
  /**
   * @brief Construct a new ising Model object. Constructor for square lattice
   *
   * @param grid_size
   * @param iterations
   * @param JA
   * @param JAD
   * @param spins_con
   */
  isingModel(double grid_size, int iterations, double JA, double JAD,
             double spins_con)
      : _grid_size(grid_size), _iterations(iterations), _JA(JA), _JAD(JAD),
        _spins_config(spins_con) {}
  /**
   * @brief Construct a new ising Model object. Constructor for hex lattice
   *
   * @param grid_size
   * @param grid_deep
   * @param iterations
   * @param JAA
   * @param JBB
   * @param JAB
   * @param JDA
   * @param JDB
   * @param spins_con
   */
  isingModel(double grid_size, double grid_deep, int iterations, double JAA,
             double JBB, double JAB, double JDA, double JDB, double spins_con)
      : _grid_size(grid_size), _grid_deep(grid_deep), _iterations(iterations),
        _JAA(JAA), _JBB(JBB), _JAB(JAB), _JDA(JDA), _JDB(JDB),
        _spins_config(spins_con) {}

  virtual ~isingModel() {}

  /**
   * @brief Generates lattice of spins with given configuration, saved as
   * "spins" variable in object.
   *
   */
  virtual void generateSpins() = 0;

  /**
   * @brief Calculates average lattice magnetization
   *
   * @return double
   */
  virtual double avgMagnetism() = 0;

  /**
   * @brief Performs "iter" times flipping and checking if energy
   * changes algorithm
   *
   * @param T
   * @param iter
   */
  virtual void randomMoves(double T, double iter) = 0;

  /**
   * @brief Calculates average energy of whole lattice
   *
   * @return double
   */
  virtual double avgEnergy() = 0;

  /**
   * @brief Calculates whole energy of lattice. NOT diveded by number of
   * lattice's elements
   *
   * @return double
   */
  virtual double totalEnergy() = 0;

  /**
   * @brief Performs metropolis algorithm for const "const_temp" temperature
   *
   * @param const_temp
   */
  virtual void metropolisConst(double const_temp) = 0;

  /**
   * @brief Performs metropolis algorithm for change temperature from T2 to T1
   * with step temp_step
   *
   * @param T1
   * @param T2
   * @param temp_step
   */
  virtual void metropolisMutable(double T1, double T2, double temp_step) = 0;

  /**
   * @brief Calculates mean of an array
   *
   * @param array
   * @return double
   */
  inline double mean(const std::vector<double> &array) {
    double s = 0;
    for (int i = 0; i < array.size(); ++i)
      s = s + array[i];

    return s / float(array.size());
  }

  /**
   * @brief Calculates standardDeviation of an array
   *
   * @param array
   * @return double
   */
  inline double standardDeviation(const std::vector<double> &array) {
    double mu = mean(array);
    double s = 0;
    int length = array.size();
    for (int i = 0; i < length; ++i)
      s = s + (array[i] - mu) * (array[i] - mu);
    s = s / float(length);
    return sqrt(s);
  }

  /**
   * @brief Return random integer number in given range
   *
   * @param minV
   * @param maxV
   * @return int
   */
  inline int randInt(const int minV = 0, const int maxV = 10) {
    return (int)rand() % (maxV + 1) + minV;
  }

  /**
   * @brief Return random double number in given range
   *
   * @param minV
   * @param maxV
   * @return double
   */
  inline double randReal(const double minV = 0.0, const double maxV = 1.0) {
    return minV + ((double)rand() / RAND_MAX) * (maxV - minV);
  }
};

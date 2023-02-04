#include "hexModel.h"

void HexGridModel::generateSpins() {
  srand(time(NULL));

  for (int i = 0; i < _grid_size; i++) {
    std::vector<std::vector<Entity>> temp_vec_2;
    for (int j = 0; j < _grid_size; j++) {
      std::vector<Entity> temp_vec_1;
      for (int l = 0; l < _grid_deep; l++) {
        temp_vec_1.push_back(Entity(2));
      }
      temp_vec_2.push_back(temp_vec_1);
    }
    spins.push_back(temp_vec_2);
  }
}

double HexGridModel::avgMagnetism() {
  double magnetism = 0;
  for (int i = 0; i < spins.size(); i++) {
    for (int j = 0; j < spins.size(); j++) {
      for (int l = 0; l < _grid_deep; l++) {
        magnetism += spins[i][j][l].spinA + spins[i][j][l].spinB;
      }
    }
  }
  // std::cout << magnetism << std::endl;
  return (magnetism) / (_grid_size * _grid_size * _grid_deep * 2);
}

double HexGridModel::spinEnergy(int x, int y, int l, int which_atom) {
  double energyAA = 0;
  double energyBB = 0;
  double energyAB = 0;
  double energyDA = 0;
  double energyDB = 0;

  if (which_atom == 0) {
    energyAB += _JAB * spins[x][y][l].spinA *
                spins[x][y][l].spinB; // z atomem w tej samej komórce elem.
    if (x - 1 < 0) {
      energyAB +=
          _JAB * spins[x][y][l].spinA * spins[_grid_size - 1][y][l].spinB;

    } else {
      energyAB += _JAB * spins[x][y][l].spinA * spins[x - 1][y][l].spinB;
    }
    if (y - 1 < 0) {
      energyAB +=
          _JAB * spins[x][y][l].spinA * spins[x][_grid_size - 1][l].spinB;

    } else {
      energyAB += _JAB * spins[x][y][l].spinA * spins[x][y - 1][l].spinB;
    }

    if (l - 1 < 0) {
      energyAA +=
          _JAA * spins[x][y][l].spinA * spins[x][y][_grid_deep - 1].spinA;
    } else {
      energyAA += _JAA * spins[x][y][l].spinA * spins[x][y][l - 1].spinA;
    }

    if (l + 1 > _grid_size) {
      energyAA += _JAA * spins[x][y][l].spinA * spins[x][y][0].spinA;
    } else {
      energyAA += _JAA * spins[x][y][l].spinA * spins[x][y][l + 1].spinA;
    }
    energyDA = _JDA * spins[x][y][l].spinA * spins[x][y][l].spinA;
    return -(energyAB + energyAA + energyDA);
  }
  // energia tylko dla atomu B
  else if (which_atom == 1) {
    energyAB += _JAB * spins[x][y][l].spinA * spins[x][y][l].spinB;
    // z atomem w tej samej komórce elem.
    if (x + 1 >= _grid_size) {
      energyAB += _JAB * spins[x][y][l].spinB * spins[0][y][l].spinA;

    } else {
      energyAB += _JAB * spins[x][y][l].spinB * spins[x + 1][y][l].spinA;
    }
    if (y + 1 >= _grid_size) {
      energyAB += _JAB * spins[x][y][l].spinB * spins[x][0][l].spinA;

    } else {
      energyAB += _JAB * spins[x][y][l].spinB * spins[x][y + 1][l].spinA;
    }

    if (l - 1 < 0) {
      energyBB +=
          _JBB * spins[x][y][l].spinB * spins[x][y][_grid_deep - 1].spinB;
    } else {
      energyBB += _JBB * spins[x][y][l].spinB * spins[x][y][l - 1].spinB;
    }

    if (l + 1 > _grid_size) {
      energyBB += _JBB * spins[x][y][l].spinB * spins[x][y][0].spinB;
    } else {
      energyBB += _JBB * spins[x][y][l].spinB * spins[x][y][l + 1].spinB;
    }
    energyDB = _JDB * spins[x][y][l].spinB * spins[x][y][l].spinB;
    return -(energyAB + energyDB + energyBB);
  }

  return energyAB;
}

double HexGridModel::totalEnergy() {
  double energy = 0;
  for (int i = 0; i < spins.size(); i++) {
    for (int j = 0; j < spins.size(); j++) {
      for (int l = 0; l < _grid_deep; l++) {
        energy += spinEnergy(i, j, l, 0);
        energy += spinEnergy(i, j, l, 1);
      }
    }
  }
  return energy;
}

double HexGridModel::avgEnergy() {
  double energy = totalEnergy();
  return (0.5 * energy) / (float(spins.size() * spins.size() *
                                 2)); // sprawdzic czy na pewno razy -1/2?
}

void HexGridModel::randomMoves(double T, double iter) {
  srand(time(NULL));
  std::vector<double> ran_list{-2.5, -1.5, -0.5, 0.5, 1.5, 2.5};
  std::vector<double> a_list{-2, -1, 0, 1, 2};
  for (int itr = 0; itr < iter; itr++) {
    for (int a = 0; a < _grid_size; a++) {
      for (int b = 0; b < _grid_size; b++) {
        for (int l = 0; l < _grid_deep; l++) {
          for (int c = 0; c < 2;
               c++) { // iteracja po obu atomach w komórce elementarnej
            if (c == 0) {

              std::mt19937 generator(std::random_device{}());
              std::uniform_int_distribution<std::size_t> distribution(
                  0, a_list.size() - 1);
              std::size_t number = distribution(generator);

              double energy_before_change = spinEnergy(a, b, l, c);
              // double energy_before_change = avgEnergy();
              double temp = spins[a][b][l].spinA;
              spins[a][b][l].spinA = a_list[number];
              double energy_after_change = spinEnergy(a, b, l, c);
              // double energy_after_change = avgEnergy();
              double energy_diff = energy_after_change - energy_before_change;
              double rand_num = randReal(0, 1);
              if ((energy_diff < 0) || ((exp(-T * energy_diff) > rand_num))) {
                spins[a][b][l].spinA = spins[a][b][l].spinA;
              } else {
                spins[a][b][l].spinA = temp;
              }
            } else if (c == 1) {

              std::mt19937 generator(std::random_device{}());
              std::uniform_int_distribution<std::size_t> distribution(
                  0, ran_list.size() - 1);
              std::size_t number = distribution(generator);

              double energy_before_change = spinEnergy(a, b, l, c);
              // double energy_before_change = avgEnergy();
              double temp = spins[a][b][l].spinB;
              spins[a][b][l].spinB = ran_list[number];
              double energy_after_change = spinEnergy(a, b, l, c);
              // double energy_after_change = avgEnergy();
              double energy_diff = energy_after_change - energy_before_change;
              double rand_num = randReal(0, 1);

              if ((energy_diff < 0) || ((exp(-T * energy_diff) > rand_num))) {
                spins[a][b][l].spinB = spins[a][b][l].spinB;
              } else {
                spins[a][b][l].spinB = temp;
              }
            }
          }
        }
      }
    }
  }
}

void HexGridModel::metropolisConst(double const_temp) {

  std::vector<double> magnetizationTemp;
  std::vector<double> avg_energy;
  std::vector<double> iter_temp;
  double condition = 1.0 / const_temp;
  for (int j = 0; j < _iterations; j++) {
    randomMoves(condition, 1);

    if (j % 10 == 0) {
      magnetizationTemp.push_back(avgMagnetism());
      avg_energy.push_back(avgEnergy());
      iter_temp.push_back(j);
    }
    saveGrid();
    
  }
  _magnetization = magnetizationTemp;
  _avg_energy = avg_energy;
  _iter_number = iter_temp;
}

void HexGridModel::metropolisMutable(double T1, double T2, double temp_step) {

  std::vector<double> energy;
  std::vector<double> magnetization;
  std::vector<double> specificHeat;
  std::vector<double> magneticSusceptibility;
  std::vector<double> temperature;

  // warming up grid
  randomMoves((1 / T2), 10);

  double deltaT = (T2 - T1) / float(temp_step);

  for (int i = 0; i < temp_step+1; i++) {

    double T = T2 - i * deltaT;

    std::cout << "Temp= " << T << std::endl;
    temperature.push_back(T);
    double condition = 1.0 / T;

    std::vector<double> energyTemp;
    for (int h = 0; h < 10; h++) {
      randomMoves(condition, 1);
    }
    double srednia_przed = avgMagnetism();
    double srednia_po = srednia_przed + 100;

    std::vector<double> mag_iters_after;

    while (1) {

      for (int h = 0; h < 10; h++) {
        randomMoves(condition, 1);
        mag_iters_after.push_back(avgMagnetism());
        energyTemp.push_back(avgEnergy());
      }
      srednia_po = mean(mag_iters_after);
      std::cout << "mag diff = "
                << fabs((srednia_po - srednia_przed) / srednia_przed)
                << std::endl;

      if (fabs((srednia_po - srednia_przed) / srednia_przed) < 0.5) {
        break;
      }
      energyTemp.clear();
      mag_iters_after.clear();
      srednia_przed = srednia_po;
    }

    // std::cout << "Final mag =" << srednia_po << std::endl;
    saveGrid();
    
    energy.push_back(mean(energyTemp)); // srednia z ostatniego tysiąca

    magnetization.push_back(
        mean(mag_iters_after)); //  srednia z ostatniego tysiaca
    
    specificHeat.push_back(standardDeviation(
        energyTemp)); // energyTemp == średnia z ostatniego 1000
    
    magneticSusceptibility.push_back(standardDeviation(
        mag_iters_after)); // mag_iters_after == średnia z ostatniego 1000
  }


  _mutable_energy = energy;
  _mutable_magnetization = magnetization;
  _mutable_specificHeat = specificHeat;
  _mutable_magneticSusceptibility = magneticSusceptibility;
  _mutable_temperature = temperature;
}

void HexGridModel::saveGrid() {
  for (int a = 0; a < _grid_size; a++)
    for (int b = 0; b < _grid_size; b++)
      for (int c = 0; c < _grid_deep; c++) {
        _grid_spins.push_back(spins[a][b][c].spinA);
        _grid_spins.push_back(spins[a][b][c].spinB * 2);
      }
}
#include "squareModel.h"

void SquareGridModel::generateSpins() {
  srand(time(NULL));

  if (_spins_config == 1) {
    double probability = 0.5;
    for (int i = 0; i < _grid_size; i++) {

      std::vector<double> temp;
      for (int j = 0; j < _grid_size; j++) {
        double rand = randReal();
        if (rand < probability) {
          temp.push_back(1);
        } else {
          temp.push_back(-1);
        }
      }

      spins.push_back(temp);
    }

  } else if (_spins_config == 2) {
    for (int i = 0; i < _grid_size; i++) {
      std::vector<double> temp;
      for (int j = 0; j < _grid_size; j++) {
        int rand = randInt(0, 4) - 2;
        temp.push_back(rand);
      }

      spins.push_back(temp);
    }
  } else if (_spins_config == 3) {
    double probability = 0.5;
    for (int i = 0; i < _grid_size; i++) {
      std::vector<double> temp;
      for (int j = 0; j < _grid_size; j++) {
        double rand = randReal();
        if (rand < probability) {
          temp.push_back(0.5);

        } else {
          temp.push_back(-0.5);
        }
      }
      spins.push_back(temp);
    }
  }
}

double SquareGridModel::avgMagnetism() {
  double magnetism = 0;
  for (int i = 0; i < spins.size(); i++) {
    for (int j = 0; j < spins.size(); j++) {
      magnetism += spins[i][j];
    }
  }

  return (magnetism / (spins.size() * spins.size()));
}

double SquareGridModel::spinEnergy(int x, int y) {

  double energyNeigh = 0;

  // periodyczne warunki brzegowe
  if (x - 1 < 0) {
    energyNeigh += spins[_grid_size - 1][y];
  } else {
    energyNeigh += spins[x - 1][y];
  }
  if (y - 1 < 0) {
    energyNeigh += spins[x][_grid_size - 1];
  } else {
    energyNeigh += spins[x][y - 1];
  }
  if (x + 1 >= _grid_size) {
    energyNeigh += spins[0][y];
  } else {
    energyNeigh += spins[x + 1][y];
  }
  if (y + 1 >= _grid_size) {
    energyNeigh += spins[x][0];
  } else {
    energyNeigh += spins[x][y + 1];
  }

  return (_JA * spins[x][y] * energyNeigh +
          _JAD * spins[x][x] * spins[x][y]); //+ anizotropia 2 składnik
}

double SquareGridModel::totalEnergy() {
  double energy = 0;
  for (int i = 0; i < spins.size(); i++) {
    for (int j = 0; j < spins.size(); j++) {
      energy += spinEnergy(i, j);
    }
  }
  return energy;
}

double SquareGridModel::avgEnergy() {
  double energy = totalEnergy();
  return (-0.5 * energy) /
         (float(spins.size() * spins.size())); // dowiedziec sie czy dzielenie
                                               // przez 2 tutaj jest konieczne
}

void SquareGridModel::randomMoves(double T, double iter) {

  srand(time(NULL));

  for (int itr = 0; itr < iter; itr++) {
    for (int a = 0; a < _grid_size; a++) {
      for (int b = 0; b < _grid_size; b++) {

        if (_spins_config == 1) {

          double energy_before_change = spinEnergy(a, b);
          spins[a][b] = -spins[a][b];
          double energy_after_change = spinEnergy(a, b);
          double energy_diff = (energy_before_change - energy_after_change);
          double rand_num = randReal(0, 1);
          if ((energy_diff < 0) || ((exp(-T * energy_diff) > rand_num))) {
            spins[a][b] = spins[a][b];
          } else {
            spins[a][b] = -spins[a][b];
          }
        } else if (_spins_config == 2) {

          double energy_before_change = spinEnergy(a, b);

          int rand = randInt(0, 4) - 2;
          int temp = spins[a][b];
          spins[a][b] = rand;
          double energy_after_change = spinEnergy(a, b);
          double energy_diff = (energy_before_change - energy_after_change);
          double rand_num = randReal(0, 1);
          if ((energy_diff < 0) || ((exp(-T * energy_diff) > rand_num))) {

            spins[a][b] = spins[a][b];
          } else {
            spins[a][b] = temp;
          }
        } else if (_spins_config == 3) {
          double energy_before_change = spinEnergy(a, b);
          double rand = -spins[a][b];
          double temp = spins[a][b];
          spins[a][b] = rand;
          double energy_after_change = spinEnergy(a, b);
          double energy_diff = (energy_before_change - energy_after_change);
          double rand_num = randReal(0, 1);
          if ((energy_diff < 0) || ((exp(-T * energy_diff) > rand_num))) {

            spins[a][b] = spins[a][b];
          } else {
            spins[a][b] = temp;
          }
        }
      }
    }
  }
}

void SquareGridModel::metropolisConst(double const_temp) {
  std::ofstream ofile;

  std::vector<double> magnetizationTemp;
  std::vector<double> avg_energy;
  std::vector<double> iter_temp;
  double condition = 1.0 / const_temp;
  for (int j = 0; j <= _iterations; j++) {
    randomMoves(condition, 100);
    if (j % 10 == 0) {
      magnetizationTemp.push_back(avgMagnetism());
      avg_energy.push_back(avgEnergy());
      iter_temp.push_back(j);
      saveGrid();
    }
  }
  _magnetization = magnetizationTemp;
  _avg_energy = avg_energy;
  _iter_number = iter_temp;
}

void SquareGridModel::metropolisMutable(double T1, double T2,
                                        double temp_step) {
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
    for (int h = 0; h < 1000; h++) {
      randomMoves(condition, 2);
    }
    double srednia_przed = avgMagnetism();
    double srednia_po = srednia_przed + 100;

    std::vector<double> mag_iters_after;

    while (1) {

      for (int h = 0; h < 2500; h++) {
        randomMoves(condition, 1);
        mag_iters_after.push_back(avgMagnetism());
        energyTemp.push_back(avgEnergy());
      }
      srednia_po = mean(mag_iters_after);
      std::cout << "mag diff = "
                << fabs((srednia_po - srednia_przed) / srednia_przed)
                << std::endl;

      if (fabs((srednia_po - srednia_przed) / srednia_przed) < 0.1) {
        break;
      }
      energyTemp.clear();
      mag_iters_after.clear();
      srednia_przed = srednia_po;
    }

    // std::cout << "Final mag =" << srednia_po << std::endl;
    
    energy.push_back(mean(energyTemp)); // srednia z ostatniego tysiąca

    magnetization.push_back(
        mean(mag_iters_after)); //  srednia z ostatniego tysiaca
    
    specificHeat.push_back(standardDeviation(
        energyTemp)); // energyTemp == średnia z ostatniego 1000
    
    magneticSusceptibility.push_back(standardDeviation(
        mag_iters_after)); // mag_iters_after == średnia z ostatniego 1000

    saveGrid();
  }


  _mutable_energy = energy;
  _mutable_magnetization = magnetization;
  _mutable_specificHeat = specificHeat;
  _mutable_magneticSusceptibility = magneticSusceptibility;
  _mutable_temperature = temperature;
}



void SquareGridModel::saveGrid() {
  for (int r = 0; r < spins.size(); r++)
    for (int c = 0; c < spins.size(); c++)
      _grid_spins.push_back(spins[r][c]);
}
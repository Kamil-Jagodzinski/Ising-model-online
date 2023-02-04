#include "ResourceFactory.h"

ResourceFactory::ResourceFactory() {
  _resource = make_shared<Resource>();
  _resource->set_path("/{iter: [+]?[0-9]*}"
                      "/{steps: [+]?[0-9]*}"
                      "/{temp: [0-1]}"
                      "/{free: [1-2]}"
                      "/{start: [+]?[0-9]*\\.?[0-9]*}"
                      "/{target: [+]?[0-9]*\\.?[0-9]*}"
                      "/{grid: [0-9]*}"
                      "/{J: [+-]?[0-9]*\\.?[0-9]*}"
                      "/{JD: [+-]?[0-9]*\\.?[0-9]*}"
                      "/{JAB: [+-]?[0-9]*\\.?[0-9]*}"
                      "/{JA: [+-]?[0-9]*\\.?[0-9]*}"
                      "/{JB: [+-]?[0-9]*\\.?[0-9]*}"
                      "/{JDA: [+-]?[0-9]*\\.?[0-9]*}"
                      "/{JDB: [+-]?[0-9]*\\.?[0-9]*}"
                      "/{cell: [0-1]}");

  _resource->set_method_handler(
      "GET", [&](const auto session) { get_handler(session); });
}

shared_ptr<Resource> ResourceFactory::get_resource() { return _resource; }

//
Date ResourceFactory::calculate(int iter, int temp, int free, float start,
                                float target, int grid, int temp_steps,
                                float Jj, float Jd, float Jab, float Ja,
                                float Jb, float Jda, float Jdb, int cell) {

  double gridSize = (double)grid;
  double gridDeep = (double)grid;
  double J = (double)Jj;
  double JD = (double)Jd;
  double JAA = (double)Ja;
  double JBB = (double)Jb; //najwazniejsze
  double JAB = (double)Jab;   //
  double JDA = (double)Jda;  //anizotropia 
  double JDB = (double)Jdb; //anizotropia
  double T1 = (double)start;
  double T2 = (double)target;
  double constTemp = (double)start;
  int iterations = iter;
  int spinsConf = free;
  int steps = temp_steps;
  Date res;

  if (cell == 0) {
    isingModel *ising_square =
        new SquareGridModel(gridSize, iterations, J, JD, spinsConf);
    ising_square->generateSpins();
    // std::cout << ising_square->avgMagnetism();
    // ising_square->metropolisMutable(T1, T2, steps);

    if (temp == 0) {
      ising_square->metropolisConst(constTemp);
      res.mag = ising_square->_magnetization;
      res.grid = ising_square->_grid_spins;
      res.energy = ising_square->_avg_energy;
      return res;
    } else {
      ising_square->metropolisMutable(T2, T1, steps);
      res.mag = ising_square->_mutable_magnetization;
      res.energy = ising_square->_mutable_energy;
      res.grid = ising_square->_grid_spins;
      res.sh = ising_square->_mutable_specificHeat;
      res.sus = ising_square->_mutable_magneticSusceptibility;
      res.temp = ising_square->_mutable_temperature;
      return res;
    }
  } 
  else {
    isingModel *ising_hex = new HexGridModel(
        gridSize, gridDeep, iterations, JAA, JBB, JAB, JDA, JDB, spinsConf);
    ising_hex->generateSpins();
    // std::cout << ising_square->avgMagnetism();
    // ising_square->metropolisMutable(T1, T2, steps);

    if (temp == 0) {
      ising_hex->metropolisConst(constTemp);
      res.mag = ising_hex->_magnetization;
      res.grid = ising_hex->_grid_spins;
      res.energy = ising_hex->_avg_energy;
      return res;
    } else {
      ising_hex->metropolisMutable(T2, T1, steps);
      res.mag = ising_hex->_mutable_magnetization;
      res.energy = ising_hex->_mutable_energy;
      res.grid = ising_hex->_grid_spins;
      res.sh = ising_hex->_mutable_specificHeat;
      res.sus = ising_hex->_mutable_magneticSusceptibility;
      res.temp = ising_hex->_mutable_temperature;
      return res;
    }
  }
}

tuple<int, int, int, float, float, int, int, float, float, float, float, float, float, float, int>
ResourceFactory::get_parameters(const shared_ptr<Session> session) {
  const auto request = session->get_request();
  int iter = atoi(request->get_path_parameter("iter").c_str());
  int temp = atoi(request->get_path_parameter("temp").c_str());
  int free = atoi(request->get_path_parameter("free").c_str());
  float start = atof(request->get_path_parameter("start").c_str());
  float target = atof(request->get_path_parameter("target").c_str());
  float J = atof(request->get_path_parameter("J").c_str());
  float JD = atof(request->get_path_parameter("JD").c_str());
  float JAB = atof(request->get_path_parameter("JAB").c_str());
  float JA = atof(request->get_path_parameter("JA").c_str());
  float JB = atof(request->get_path_parameter("JB").c_str());
  float JDA = atof(request->get_path_parameter("JDA").c_str());
  float JDB = atof(request->get_path_parameter("JDB").c_str());
  int steps = atof(request->get_path_parameter("steps").c_str());
  int grid = atoi(request->get_path_parameter("grid").c_str());
  int cell = atoi(request->get_path_parameter("cell").c_str());

  return make_tuple(iter, temp, free, start, target, grid, steps, 
                    J, JD, JAB, JA, JB, JDA, JDB, cell);
}

string ResourceFactory::parse_to_json(Date res, int temp_type) {
  ostringstream str_grid, str_mag, str_eng, str_sh, str_sus, str_temp;

  for (auto x : res.grid) {
    str_grid << x << ',';
  }  
  
  for (int i = 0; i < res.mag.size() - 1; i++) {
    str_mag << abs(res.mag[i]) << ',';
    str_eng << abs(res.energy[i]) << ',';
  }

  str_mag << abs(res.mag[res.mag.size() - 1]);
  str_eng << abs(res.energy[res.energy.size() - 1]);

  if (temp_type) {
    for (int i = 0; i < res.sh.size() - 1; i++) {
      str_sh << abs(res.sh[i]) << ',';
      str_sus << abs(res.sus[i]) << ',';
      str_temp << abs(res.temp[i]) << ',';
    }
    str_sh << abs(res.sh[res.sh.size() - 1]);
    str_sus << abs(res.sus[res.sus.size() - 1]);
    str_temp << abs(res.temp[res.temp.size() - 1]);
  } else {
    str_sh << 0;
    str_sus << 0;
    str_temp << 0;
  }

  nlohmann::json json_result = {{"grids", str_grid.str()},
                                {"mag", str_mag.str()},
                                {"sh", str_sh.str()},
                                {"sus", str_sus.str()},
                                {"temperature", str_temp.str()},
                                {"energy", str_eng.str()}};
  return json_result.dump();
}

void ResourceFactory::get_handler(const shared_ptr<Session> session) {
  const auto [iter, temp, free, start, target, grid, temp_steps, 
              J, JD, JAB, JA, JB, JDA, JDB, cell] = get_parameters(session);

  const auto response = calculate(iter, temp, free, start, target, grid,
                                  temp_steps, J, JD, JAB, JA, JB, JDA, JDB, cell);
  
  const auto json_response = parse_to_json(response, temp);
  session->close(OK, json_response,
                 {{"Content-Length", std::to_string(json_response.size())}});
}

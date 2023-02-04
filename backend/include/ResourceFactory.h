#pragma once
#include "json.hpp"
#include "hexModel.h"
#include "squareModel.h"
#include <iomanip>
#include <iostream>
#include <memory>
#include <restbed>
#include <sstream>
#include <string>
#include <tuple>
#include <vector>

using namespace std;
using namespace restbed;

struct Date {
public:
  std::vector<double> grid;
  std::vector<double> energy;
  std::vector<double> mag;
  std::vector<double> temp;
  std::vector<double> sh;
  std::vector<double> sus;
};

struct MutableDate {
public:
};

class ResourceFactory {
public:
  ResourceFactory();
  
  shared_ptr<Resource> get_resource();

private:
  shared_ptr<Resource> _resource;

  string parse_to_json(Date res, int temp_type);

  void get_handler(const shared_ptr<Session> session);

  tuple<int, int, int, float, float, int, int, float, float, float, float, float, float, float, int>
  get_parameters(const shared_ptr<Session> session);

  Date calculate(int type, int temp, int free, float start, float final,
                 int grid, int temp_steps, float Jj, float Jd, float Jab, 
                 float Ja, float Jb, float Jda, float Jdb, int cell);
};
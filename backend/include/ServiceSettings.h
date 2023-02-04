#pragma once 

#include<memory>
#include<restbed>


using namespace std;
using namespace restbed;


class ServiceSettings{
    public:
        ServiceSettings();
        shared_ptr<Settings> get_settings();
    
    private:
        shared_ptr<Settings> _settings;
};
#pragma once 

#include "ResourceFactory.h"
#include "ServiceSettings.h"

class WebServiceManager{
    public:
    WebServiceManager(
        shared_ptr<ResourceFactory> resource_factory,
        shared_ptr<ServiceSettings> service_settings
    );

    void init();
    
    private:
    Service _service;
    shared_ptr<ServiceSettings> _settings;

};
#include "WebServiceManager.h"

WebServiceManager::WebServiceManager(
    shared_ptr<ResourceFactory> resource_factory,
    shared_ptr<ServiceSettings> service_settings) {

  _settings = service_settings;
  _service.publish(resource_factory->get_resource());
}

void WebServiceManager::init() {
  std::cout << "Server is initialized" << std::endl;
  _service.start(_settings->get_settings());
}
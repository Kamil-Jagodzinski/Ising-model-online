#include "ResourceFactory.h"
#include "ServiceSettings.h"
#include "WebServiceManager.h"


int main(){
    auto resource = std::make_shared<ResourceFactory>();
    auto settings = std::make_shared<ServiceSettings>();
    WebServiceManager ws {resource, settings};
    ws.init();
}


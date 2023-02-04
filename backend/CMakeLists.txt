cmake_minimum_required(VERSION 3.5)

project(BackendAPI LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

#include_directories(/usr/local/include)
#link_directories(/usr/local/library)
include_directories(/home/jamil/cpplibs/restbed/build/restbed/distribution/include)
link_directories(/home/jamil/cpplibs/restbed/build/restbed/distribution/library)

add_executable(BackendAPI
    src/main.cpp
    src/WebServiceManager.cpp
    src/ServiceSettings.cpp
    src/ResourceFactory.cpp
    src/hexModel.cpp
    src/squareModel.cpp)

target_include_directories(BackendAPI PUBLIC ${CMAKE_SOURCE_DIR}/include)
target_link_libraries(BackendAPI restbed)

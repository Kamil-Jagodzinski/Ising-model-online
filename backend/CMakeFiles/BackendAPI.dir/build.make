# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.22

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/jamil/INZ/ChartsOnline/backend

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/jamil/INZ/ChartsOnline/backend

# Include any dependencies generated for this target.
include CMakeFiles/BackendAPI.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include CMakeFiles/BackendAPI.dir/compiler_depend.make

# Include the progress variables for this target.
include CMakeFiles/BackendAPI.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/BackendAPI.dir/flags.make

CMakeFiles/BackendAPI.dir/src/main.cpp.o: CMakeFiles/BackendAPI.dir/flags.make
CMakeFiles/BackendAPI.dir/src/main.cpp.o: src/main.cpp
CMakeFiles/BackendAPI.dir/src/main.cpp.o: CMakeFiles/BackendAPI.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/jamil/INZ/ChartsOnline/backend/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/BackendAPI.dir/src/main.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/BackendAPI.dir/src/main.cpp.o -MF CMakeFiles/BackendAPI.dir/src/main.cpp.o.d -o CMakeFiles/BackendAPI.dir/src/main.cpp.o -c /home/jamil/INZ/ChartsOnline/backend/src/main.cpp

CMakeFiles/BackendAPI.dir/src/main.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/BackendAPI.dir/src/main.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/jamil/INZ/ChartsOnline/backend/src/main.cpp > CMakeFiles/BackendAPI.dir/src/main.cpp.i

CMakeFiles/BackendAPI.dir/src/main.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/BackendAPI.dir/src/main.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/jamil/INZ/ChartsOnline/backend/src/main.cpp -o CMakeFiles/BackendAPI.dir/src/main.cpp.s

CMakeFiles/BackendAPI.dir/src/WebServiceManager.cpp.o: CMakeFiles/BackendAPI.dir/flags.make
CMakeFiles/BackendAPI.dir/src/WebServiceManager.cpp.o: src/WebServiceManager.cpp
CMakeFiles/BackendAPI.dir/src/WebServiceManager.cpp.o: CMakeFiles/BackendAPI.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/jamil/INZ/ChartsOnline/backend/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Building CXX object CMakeFiles/BackendAPI.dir/src/WebServiceManager.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/BackendAPI.dir/src/WebServiceManager.cpp.o -MF CMakeFiles/BackendAPI.dir/src/WebServiceManager.cpp.o.d -o CMakeFiles/BackendAPI.dir/src/WebServiceManager.cpp.o -c /home/jamil/INZ/ChartsOnline/backend/src/WebServiceManager.cpp

CMakeFiles/BackendAPI.dir/src/WebServiceManager.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/BackendAPI.dir/src/WebServiceManager.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/jamil/INZ/ChartsOnline/backend/src/WebServiceManager.cpp > CMakeFiles/BackendAPI.dir/src/WebServiceManager.cpp.i

CMakeFiles/BackendAPI.dir/src/WebServiceManager.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/BackendAPI.dir/src/WebServiceManager.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/jamil/INZ/ChartsOnline/backend/src/WebServiceManager.cpp -o CMakeFiles/BackendAPI.dir/src/WebServiceManager.cpp.s

CMakeFiles/BackendAPI.dir/src/ServiceSettings.cpp.o: CMakeFiles/BackendAPI.dir/flags.make
CMakeFiles/BackendAPI.dir/src/ServiceSettings.cpp.o: src/ServiceSettings.cpp
CMakeFiles/BackendAPI.dir/src/ServiceSettings.cpp.o: CMakeFiles/BackendAPI.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/jamil/INZ/ChartsOnline/backend/CMakeFiles --progress-num=$(CMAKE_PROGRESS_3) "Building CXX object CMakeFiles/BackendAPI.dir/src/ServiceSettings.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/BackendAPI.dir/src/ServiceSettings.cpp.o -MF CMakeFiles/BackendAPI.dir/src/ServiceSettings.cpp.o.d -o CMakeFiles/BackendAPI.dir/src/ServiceSettings.cpp.o -c /home/jamil/INZ/ChartsOnline/backend/src/ServiceSettings.cpp

CMakeFiles/BackendAPI.dir/src/ServiceSettings.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/BackendAPI.dir/src/ServiceSettings.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/jamil/INZ/ChartsOnline/backend/src/ServiceSettings.cpp > CMakeFiles/BackendAPI.dir/src/ServiceSettings.cpp.i

CMakeFiles/BackendAPI.dir/src/ServiceSettings.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/BackendAPI.dir/src/ServiceSettings.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/jamil/INZ/ChartsOnline/backend/src/ServiceSettings.cpp -o CMakeFiles/BackendAPI.dir/src/ServiceSettings.cpp.s

CMakeFiles/BackendAPI.dir/src/ResourceFactory.cpp.o: CMakeFiles/BackendAPI.dir/flags.make
CMakeFiles/BackendAPI.dir/src/ResourceFactory.cpp.o: src/ResourceFactory.cpp
CMakeFiles/BackendAPI.dir/src/ResourceFactory.cpp.o: CMakeFiles/BackendAPI.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/jamil/INZ/ChartsOnline/backend/CMakeFiles --progress-num=$(CMAKE_PROGRESS_4) "Building CXX object CMakeFiles/BackendAPI.dir/src/ResourceFactory.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/BackendAPI.dir/src/ResourceFactory.cpp.o -MF CMakeFiles/BackendAPI.dir/src/ResourceFactory.cpp.o.d -o CMakeFiles/BackendAPI.dir/src/ResourceFactory.cpp.o -c /home/jamil/INZ/ChartsOnline/backend/src/ResourceFactory.cpp

CMakeFiles/BackendAPI.dir/src/ResourceFactory.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/BackendAPI.dir/src/ResourceFactory.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/jamil/INZ/ChartsOnline/backend/src/ResourceFactory.cpp > CMakeFiles/BackendAPI.dir/src/ResourceFactory.cpp.i

CMakeFiles/BackendAPI.dir/src/ResourceFactory.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/BackendAPI.dir/src/ResourceFactory.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/jamil/INZ/ChartsOnline/backend/src/ResourceFactory.cpp -o CMakeFiles/BackendAPI.dir/src/ResourceFactory.cpp.s

CMakeFiles/BackendAPI.dir/src/hexModel.cpp.o: CMakeFiles/BackendAPI.dir/flags.make
CMakeFiles/BackendAPI.dir/src/hexModel.cpp.o: src/hexModel.cpp
CMakeFiles/BackendAPI.dir/src/hexModel.cpp.o: CMakeFiles/BackendAPI.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/jamil/INZ/ChartsOnline/backend/CMakeFiles --progress-num=$(CMAKE_PROGRESS_5) "Building CXX object CMakeFiles/BackendAPI.dir/src/hexModel.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/BackendAPI.dir/src/hexModel.cpp.o -MF CMakeFiles/BackendAPI.dir/src/hexModel.cpp.o.d -o CMakeFiles/BackendAPI.dir/src/hexModel.cpp.o -c /home/jamil/INZ/ChartsOnline/backend/src/hexModel.cpp

CMakeFiles/BackendAPI.dir/src/hexModel.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/BackendAPI.dir/src/hexModel.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/jamil/INZ/ChartsOnline/backend/src/hexModel.cpp > CMakeFiles/BackendAPI.dir/src/hexModel.cpp.i

CMakeFiles/BackendAPI.dir/src/hexModel.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/BackendAPI.dir/src/hexModel.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/jamil/INZ/ChartsOnline/backend/src/hexModel.cpp -o CMakeFiles/BackendAPI.dir/src/hexModel.cpp.s

CMakeFiles/BackendAPI.dir/src/squareModel.cpp.o: CMakeFiles/BackendAPI.dir/flags.make
CMakeFiles/BackendAPI.dir/src/squareModel.cpp.o: src/squareModel.cpp
CMakeFiles/BackendAPI.dir/src/squareModel.cpp.o: CMakeFiles/BackendAPI.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/jamil/INZ/ChartsOnline/backend/CMakeFiles --progress-num=$(CMAKE_PROGRESS_6) "Building CXX object CMakeFiles/BackendAPI.dir/src/squareModel.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/BackendAPI.dir/src/squareModel.cpp.o -MF CMakeFiles/BackendAPI.dir/src/squareModel.cpp.o.d -o CMakeFiles/BackendAPI.dir/src/squareModel.cpp.o -c /home/jamil/INZ/ChartsOnline/backend/src/squareModel.cpp

CMakeFiles/BackendAPI.dir/src/squareModel.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/BackendAPI.dir/src/squareModel.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/jamil/INZ/ChartsOnline/backend/src/squareModel.cpp > CMakeFiles/BackendAPI.dir/src/squareModel.cpp.i

CMakeFiles/BackendAPI.dir/src/squareModel.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/BackendAPI.dir/src/squareModel.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/jamil/INZ/ChartsOnline/backend/src/squareModel.cpp -o CMakeFiles/BackendAPI.dir/src/squareModel.cpp.s

# Object files for target BackendAPI
BackendAPI_OBJECTS = \
"CMakeFiles/BackendAPI.dir/src/main.cpp.o" \
"CMakeFiles/BackendAPI.dir/src/WebServiceManager.cpp.o" \
"CMakeFiles/BackendAPI.dir/src/ServiceSettings.cpp.o" \
"CMakeFiles/BackendAPI.dir/src/ResourceFactory.cpp.o" \
"CMakeFiles/BackendAPI.dir/src/hexModel.cpp.o" \
"CMakeFiles/BackendAPI.dir/src/squareModel.cpp.o"

# External object files for target BackendAPI
BackendAPI_EXTERNAL_OBJECTS =

BackendAPI: CMakeFiles/BackendAPI.dir/src/main.cpp.o
BackendAPI: CMakeFiles/BackendAPI.dir/src/WebServiceManager.cpp.o
BackendAPI: CMakeFiles/BackendAPI.dir/src/ServiceSettings.cpp.o
BackendAPI: CMakeFiles/BackendAPI.dir/src/ResourceFactory.cpp.o
BackendAPI: CMakeFiles/BackendAPI.dir/src/hexModel.cpp.o
BackendAPI: CMakeFiles/BackendAPI.dir/src/squareModel.cpp.o
BackendAPI: CMakeFiles/BackendAPI.dir/build.make
BackendAPI: CMakeFiles/BackendAPI.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/jamil/INZ/ChartsOnline/backend/CMakeFiles --progress-num=$(CMAKE_PROGRESS_7) "Linking CXX executable BackendAPI"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/BackendAPI.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/BackendAPI.dir/build: BackendAPI
.PHONY : CMakeFiles/BackendAPI.dir/build

CMakeFiles/BackendAPI.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/BackendAPI.dir/cmake_clean.cmake
.PHONY : CMakeFiles/BackendAPI.dir/clean

CMakeFiles/BackendAPI.dir/depend:
	cd /home/jamil/INZ/ChartsOnline/backend && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/jamil/INZ/ChartsOnline/backend /home/jamil/INZ/ChartsOnline/backend /home/jamil/INZ/ChartsOnline/backend /home/jamil/INZ/ChartsOnline/backend /home/jamil/INZ/ChartsOnline/backend/CMakeFiles/BackendAPI.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/BackendAPI.dir/depend


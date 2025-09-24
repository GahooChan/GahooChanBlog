---
icon: book-open
title: CMake基础教程
tags: [编程工具]
category: 编程学习
date: 2025-09-16
---
# CMake基础教程

CMake是一个跨平台的构建系统生成器，它可以使用简单的平台无关的配置文件来控制软件的编译过程，并生成可在多种编译器环境中使用的构建文件。CMake支持多种编程语言，尤其在C/C++项目中应用广泛。

## 一、CMake概述

### 1.1 什么是CMake？

CMake是一个开源的、跨平台的构建系统生成器工具，它不直接构建软件，而是生成标准的构建文件（如Unix的Makefile、Windows的Visual Studio项目文件等），然后用户可以使用各自平台上的构建工具来编译代码。

### 1.2 CMake的特点

- **跨平台**：支持Windows、Linux、macOS等多种操作系统
- **生成多种构建系统**：可生成Makefiles、Visual Studio项目、Xcode项目等
- **简单易学的语法**：使用类似于脚本的CMakeLists.txt文件进行配置
- **良好的扩展性**：支持模块化和第三方库的集成
- **大型项目支持**：适合管理大型复杂的软件项目

## 二、CMake安装

### 2.1 Windows安装

1. 访问[CMake官方网站](https://cmake.org/download/)下载Windows安装程序
2. 运行安装程序，选择"Add CMake to the system PATH for all users"选项
3. 完成安装后，可以在命令提示符中使用`cmake --version`验证安装

### 2.2 Linux安装

在大多数Linux发行版中，可以使用包管理器安装CMake：

#### Ubuntu/Debian
```bash
sudo apt-get update
sudo apt-get install cmake
```

#### CentOS/RHEL
```bash
sudo yum install cmake
```

#### Arch Linux
```bash
sudo pacman -S cmake
```

### 2.3 macOS安装

可以使用Homebrew安装CMake：

```bash
brew install cmake
```

也可以从官方网站下载安装包进行安装。

## 三、CMake基础语法

### 3.1 CMakeLists.txt文件

CMake使用名为CMakeLists.txt的配置文件来描述项目的构建过程。这个文件需要放置在源代码目录的根目录中。

### 3.2 基本命令

#### 指定CMake最低版本
```cmake
cmake_minimum_required(VERSION 3.10)
```

#### 设置项目名称
```cmake
project(MyProject VERSION 1.0 LANGUAGES CXX)
```

#### 添加可执行文件
```cmake
add_executable(MyExecutable main.cpp file1.cpp file2.cpp)
```

#### 添加库
```cmake
# 静态库
add_library(MyStaticLib STATIC src/library.cpp)

# 动态库
add_library(MySharedLib SHARED src/library.cpp)
```

#### 指定编译选项
```cmake
target_compile_options(MyExecutable PRIVATE -Wall -Wextra)
```

#### 设置包含目录
```cmake
target_include_directories(MyExecutable PRIVATE ${PROJECT_SOURCE_DIR}/include)
```

#### 链接库
```cmake
target_link_libraries(MyExecutable PRIVATE MyStaticLib)
```

#### 条件语句
```cmake
if(CMAKE_BUILD_TYPE STREQUAL "Debug")
    message("Building in Debug mode")
else()
    message("Building in Release mode")
endif()
```

## 四、基本CMake项目结构

### 4.1 简单项目结构

一个简单的CMake项目通常包含以下文件结构：

```
MyProject/
├── CMakeLists.txt
├── main.cpp
└── include/
    └── myheader.h
```

对应的CMakeLists.txt内容：

```cmake
cmake_minimum_required(VERSION 3.10)
project(MyProject VERSION 1.0 LANGUAGES CXX)

# 指定C++标准
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 添加可执行文件
add_executable(MyProject main.cpp)

# 设置包含目录
target_include_directories(MyProject PRIVATE ${PROJECT_SOURCE_DIR}/include)
```

### 4.2 多目录项目结构

对于更复杂的项目，可以使用子目录和多个CMakeLists.txt文件：

```
MyProject/
├── CMakeLists.txt
├── src/
│   ├── CMakeLists.txt
│   ├── main.cpp
│   └── core/
│       ├── CMakeLists.txt
│       ├── core.cpp
│       └── include/
│           └── core.h
├── include/
│   └── myproject/
│       └── version.h
└── tests/
    ├── CMakeLists.txt
    └── test_core.cpp
```

根目录下的CMakeLists.txt：

```cmake
cmake_minimum_required(VERSION 3.10)
project(MyProject VERSION 1.0 LANGUAGES CXX)

# 指定C++标准
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 添加子目录
add_subdirectory(src)
add_subdirectory(tests)
```

src目录下的CMakeLists.txt：

```cmake
# 添加子目录
add_subdirectory(core)

# 添加可执行文件
add_executable(MyProject main.cpp)

# 设置包含目录
target_include_directories(MyProject PRIVATE 
    ${PROJECT_SOURCE_DIR}/include
    ${CMAKE_CURRENT_SOURCE_DIR}/core/include
)

# 链接库
target_link_libraries(MyProject PRIVATE CoreLib)
```

## 五、CMake构建过程

### 5.1 基本构建流程

CMake使用外部构建（out-of-source build）的方式，即在源代码目录外创建一个构建目录。这样做的好处是不会污染源代码目录，并且可以在同一台机器上使用不同的构建配置。

基本构建流程如下：

1. 创建构建目录
```bash
mkdir build && cd build
```

2. 运行CMake配置
```bash
cmake ..  # 指定源代码目录
```

3. 执行构建
```bash
# Unix/Linux/macOS\cmake

# Windows (使用Visual Studio)
cmake --build . --config Release
```

### 5.2 常见构建选项

在运行CMake配置时，可以指定各种选项来控制构建过程：

```bash
# 指定构建类型
cmake .. -DCMAKE_BUILD_TYPE=Release

# 指定安装路径
cmake .. -DCMAKE_INSTALL_PREFIX=/usr/local

# 启用或禁用某些功能
cmake .. -DBUILD_TESTING=ON -DENABLE_FEATURE_X=OFF

# 指定编译器
cmake .. -DCMAKE_C_COMPILER=gcc -DCMAKE_CXX_COMPILER=g++
```

## 六、CMake模块化

### 6.1 使用find_package查找第三方库

CMake提供了`find_package`命令来查找系统中已安装的第三方库：

```cmake
# 查找第三方库
find_package(OpenCV REQUIRED)

# 如果找到库，设置包含目录和链接库
if(OpenCV_FOUND)
    target_include_directories(MyProject PRIVATE ${OpenCV_INCLUDE_DIRS})
    target_link_libraries(MyProject PRIVATE ${OpenCV_LIBS})
endif()
```

### 6.2 自定义模块

对于没有内置查找模块的库，可以创建自定义的CMake模块：

1. 在项目中创建一个cmake目录
2. 将自定义的FindXXX.cmake文件放入该目录
3. 在CMakeLists.txt中添加：

```cmake
list(APPEND CMAKE_MODULE_PATH ${CMAKE_CURRENT_SOURCE_DIR}/cmake)
```

## 七、CMake实战示例

### 7.1 简单C++项目

下面是一个简单的C++项目的完整CMakeLists.txt示例：

```cmake
# 指定CMake最低版本
cmake_minimum_required(VERSION 3.10)

# 设置项目信息
project(HelloWorld VERSION 1.0.0 LANGUAGES CXX)

# 指定C++标准
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 添加可执行文件
add_executable(hello_world main.cpp)

# 设置安装路径
install(TARGETS hello_world DESTINATION bin)
```

### 7.2 使用外部库的项目

下面是一个使用外部库（如Boost）的项目的CMakeLists.txt示例：

```cmake
cmake_minimum_required(VERSION 3.10)
project(BoostExample VERSION 1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 查找Boost库
find_package(Boost 1.65 REQUIRED COMPONENTS filesystem system)

# 添加可执行文件
add_executable(boost_example main.cpp)

# 设置包含目录
target_include_directories(boost_example PRIVATE ${Boost_INCLUDE_DIRS})

# 链接Boost库
target_link_libraries(boost_example PRIVATE Boost::filesystem Boost::system)
```

## 八、CMake高级技巧

### 8.1 使用生成器表达式

生成器表达式允许在构建时根据条件设置编译选项、包含目录等：

```cmake
target_compile_options(MyProject PRIVATE 
    $<$<CXX_COMPILER_ID:GNU>:-Wall -Wextra>
    $<$<CXX_COMPILER_ID:MSVC>:/W4 /WX>
)
```

### 8.2 配置头文件

CMake可以生成配置头文件，将CMake变量传递到源代码中：

```cmake
# 配置头文件
configure_file(
    ${CMAKE_CURRENT_SOURCE_DIR}/include/config.h.in
    ${CMAKE_CURRENT_BINARY_DIR}/include/config.h
)

# 添加生成的头文件目录
target_include_directories(MyProject PRIVATE ${CMAKE_CURRENT_BINARY_DIR}/include)
```

对应的config.h.in文件：

```cpp
#define PROJECT_VERSION "@PROJECT_VERSION@"
#define CMAKE_BUILD_TYPE "@CMAKE_BUILD_TYPE@"
```

### 8.3 构建类型和编译选项

根据不同的构建类型设置不同的编译选项：

```cmake
# 调试模式编译选项
target_compile_options(MyProject PRIVATE 
    $<$<CONFIG:Debug>:-g -O0>
    $<$<CONFIG:Release>:-O3 -DNDEBUG>
)
```

## 九、CMake最佳实践

1. **使用外部构建**：始终在源代码目录外创建构建目录
2. **指定C++标准**：明确指定项目所需的C++标准
3. **模块化组织**：对于大型项目，使用子目录和多个CMakeLists.txt文件
4. **避免硬编码**：使用CMake变量和生成器表达式，避免硬编码路径和选项
5. **使用target_*命令**：优先使用target_include_directories、target_link_libraries等命令，而不是全局命令
6. **提供安装规则**：使用install命令设置项目的安装规则
7. **添加测试**：集成CTest框架，为项目添加单元测试

## 十、总结

CMake是一个功能强大的跨平台构建系统生成器，它极大地简化了跨平台项目的构建过程。通过本文的介绍，我们了解了CMake的基础概念、语法和使用方法，以及一些高级技巧和最佳实践。掌握CMake对于开发跨平台C/C++项目非常重要，希望本文能够帮助你快速上手CMake并应用到实际项目中。
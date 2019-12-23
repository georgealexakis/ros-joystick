# ROS Joystick

ROS Joystick is a Hybrid Application, for remote controling and monitoring of a robot that runs ROS. (This implementation has tested only with ROS Kinetic version) 

## Table of Contents

[Getting Started](#getting-started)

[Executing](#executing)

[Screenshots](#screenshots)

[Demo](#demo)

[License](#license)

## Getting Started

### Download the Source of Project

Download repository code from:

``` https://github.com/georgealexakis/ros-joystick.git (master branch) ```

Or get a copy of the source from:

``` $ git clone https://github.com/georgealexakis/ros-joystick.git (master branch) ```

### Install Package

To connect ROS Joystick with ROS robot, it is necessary to install rosbridge. Run the command below:

``` $ sudo apt-get install ros-<version>-rosbridge-server ```

## Executing

Connect to the same network with the ROS implemented robot. Run rosbridge with:

``` $ roslaunch rosbridge_server rosbridge_websocket.launch ```

Copy the IP that rosbridge package provides via websockects and then:

* Run desktop.html to start the desktop web application to a web browser.

Or

* Use the Android Application in [/build](https://github.com/georgealexakis/ros-joystick/tree/master/build) folder, that runs only on Android Devices.

Or

* Build the Application for different devices using Apache Cordova or Adode Phonegab with the files in [/hybrid](https://github.com/georgealexakis/ros-joystick/tree/master/hybrid) folder.

## Screenshots

### Desktop Controller

![desktop1](screenshots/desktop1.png)

![desktop2](screenshots/desktop2.png)

![desktop3](screenshots/desktop3.png)

### Smartphone Controller

![smartphone1](screenshots/smartphone1.png)

![smartphone2](screenshots/smartphone2.png)

![smartphone3](screenshots/smartphone3.png)

## Demo

[ROS Joystick Demo.](https://1drv.ms/v/s!Amy4EDOPS0vXuCfv7OUddIGczeXt?e=wpxqIQ)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.


